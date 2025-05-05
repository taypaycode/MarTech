#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Attribution Model Script

This script demonstrates the implementation of various attribution models
using customer journey data from BigQuery.
"""

import os
import json
import argparse
import pandas as pd
import numpy as np
from google.cloud import bigquery
from dotenv import load_dotenv
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import seaborn as sns

# Load environment variables
load_dotenv()

# Configure BigQuery client
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

# Define attribution models
class AttributionModels:
    @staticmethod
    def first_touch(journey_df):
        """
        First Touch Attribution - assigns 100% credit to the first touchpoint
        """
        # Group by journey_id and get the first touchpoint
        first_touch_df = journey_df.sort_values(['journey_id', 'timestamp']).groupby('journey_id').first().reset_index()
        
        # Calculate attribution by channel
        attribution = first_touch_df.groupby('channel')['conversion_value'].sum().reset_index()
        attribution['model'] = 'first_touch'
        attribution['percentage'] = attribution['conversion_value'] / attribution['conversion_value'].sum() * 100
        
        return attribution

    @staticmethod
    def last_touch(journey_df):
        """
        Last Touch Attribution - assigns 100% credit to the last touchpoint
        """
        # Group by journey_id and get the last touchpoint
        last_touch_df = journey_df.sort_values(['journey_id', 'timestamp']).groupby('journey_id').last().reset_index()
        
        # Calculate attribution by channel
        attribution = last_touch_df.groupby('channel')['conversion_value'].sum().reset_index()
        attribution['model'] = 'last_touch'
        attribution['percentage'] = attribution['conversion_value'] / attribution['conversion_value'].sum() * 100
        
        return attribution

    @staticmethod
    def linear(journey_df):
        """
        Linear Attribution - assigns equal credit to all touchpoints in the journey
        """
        # Get unique journey_ids with conversions
        converted_journeys = journey_df[journey_df['conversion'] == True]['journey_id'].unique()
        
        # Filter for only converted journeys
        converted_df = journey_df[journey_df['journey_id'].isin(converted_journeys)]
        
        # Count touchpoints per journey
        journey_counts = converted_df.groupby('journey_id')['channel'].count().reset_index()
        journey_counts.columns = ['journey_id', 'touchpoint_count']
        
        # Merge counts back to touchpoints
        touchpoints_with_counts = pd.merge(converted_df, journey_counts, on='journey_id')
        
        # Calculate fractional value
        touchpoints_with_counts['attributed_value'] = touchpoints_with_counts['conversion_value'] / touchpoints_with_counts['touchpoint_count']
        
        # Calculate attribution by channel
        attribution = touchpoints_with_counts.groupby('channel')['attributed_value'].sum().reset_index()
        attribution['model'] = 'linear'
        attribution['percentage'] = attribution['attributed_value'] / attribution['attributed_value'].sum() * 100
        attribution.rename(columns={'attributed_value': 'conversion_value'}, inplace=True)
        
        return attribution

    @staticmethod
    def time_decay(journey_df, half_life=7):
        """
        Time Decay Attribution - assigns more credit to touchpoints closer to conversion
        
        Args:
            journey_df: DataFrame with customer journey data
            half_life: Number of days for half-life decay (default: 7)
        """
        # Get unique journey_ids with conversions
        converted_journeys = journey_df[journey_df['conversion'] == True]['journey_id'].unique()
        
        # Filter for only converted journeys
        converted_df = journey_df[journey_df['journey_id'].isin(converted_journeys)]
        
        # Process each journey separately
        results = []
        
        for journey_id in converted_journeys:
            journey = converted_df[converted_df['journey_id'] == journey_id].sort_values('timestamp')
            
            if len(journey) == 0:
                continue
                
            # Get conversion value
            conversion_value = journey['conversion_value'].max()
            
            # Get conversion timestamp (last touchpoint)
            conversion_time = journey['timestamp'].max()
            
            # Calculate days before conversion for each touchpoint
            journey['days_before_conversion'] = (conversion_time - journey['timestamp']).dt.total_seconds() / (60 * 60 * 24)
            
            # Calculate decay weight: 2^(-t/half_life)
            journey['decay_weight'] = 2 ** (-journey['days_before_conversion'] / half_life)
            
            # Normalize weights to sum to 1
            total_weight = journey['decay_weight'].sum()
            journey['normalized_weight'] = journey['decay_weight'] / total_weight
            
            # Calculate attributed value
            journey['attributed_value'] = journey['normalized_weight'] * conversion_value
            
            results.append(journey)
        
        if not results:
            return pd.DataFrame(columns=['channel', 'conversion_value', 'model', 'percentage'])
            
        # Combine results
        result_df = pd.concat(results)
        
        # Calculate attribution by channel
        attribution = result_df.groupby('channel')['attributed_value'].sum().reset_index()
        attribution['model'] = 'time_decay'
        attribution['percentage'] = attribution['attributed_value'] / attribution['attributed_value'].sum() * 100
        attribution.rename(columns={'attributed_value': 'conversion_value'}, inplace=True)
        
        return attribution

    @staticmethod
    def position_based(journey_df, first=0.4, middle=0.2, last=0.4):
        """
        Position Based Attribution - assigns credit based on position (e.g., 40/20/40)
        
        Args:
            journey_df: DataFrame with customer journey data
            first: Weight for first touchpoint (default: 0.4)
            middle: Weight for middle touchpoints (default: 0.2)
            last: Weight for last touchpoint (default: 0.4)
        """
        # Get unique journey_ids with conversions
        converted_journeys = journey_df[journey_df['conversion'] == True]['journey_id'].unique()
        
        # Filter for only converted journeys
        converted_df = journey_df[journey_df['journey_id'].isin(converted_journeys)]
        
        # Process each journey separately
        results = []
        
        for journey_id in converted_journeys:
            journey = converted_df[converted_df['journey_id'] == journey_id].sort_values('timestamp')
            
            if len(journey) == 0:
                continue
                
            # Get conversion value
            conversion_value = journey['conversion_value'].max()
            
            # Clone the journey data
            journey_positions = journey.copy()
            
            # Add position indicator
            journey_count = len(journey_positions)
            
            if journey_count == 1:
                # If only one touchpoint, it gets all credit
                journey_positions['position_weight'] = 1.0
            elif journey_count == 2:
                # If two touchpoints, split between first and last
                journey_positions['position_weight'] = [first, last]
            else:
                # Assign weights by position
                weights = []
                weights.append(first)  # First touchpoint
                
                # Middle touchpoints split the middle weight
                middle_count = journey_count - 2
                if middle_count > 0:
                    middle_weight_each = middle / middle_count
                    weights.extend([middle_weight_each] * middle_count)
                
                weights.append(last)  # Last touchpoint
                journey_positions['position_weight'] = weights
            
            # Calculate attributed value
            journey_positions['attributed_value'] = journey_positions['position_weight'] * conversion_value
            
            results.append(journey_positions)
        
        if not results:
            return pd.DataFrame(columns=['channel', 'conversion_value', 'model', 'percentage'])
            
        # Combine results
        result_df = pd.concat(results)
        
        # Calculate attribution by channel
        attribution = result_df.groupby('channel')['attributed_value'].sum().reset_index()
        attribution['model'] = 'position_based'
        attribution['percentage'] = attribution['attributed_value'] / attribution['attributed_value'].sum() * 100
        attribution.rename(columns={'attributed_value': 'conversion_value'}, inplace=True)
        
        return attribution

def fetch_journey_data(client, project_id, dataset_id, start_date=None, end_date=None):
    """
    Fetch customer journey data from BigQuery
    
    Args:
        client: BigQuery client
        project_id: GCP project ID
        dataset_id: BigQuery dataset ID
        start_date: Start date for data filter
        end_date: End date for data filter
    
    Returns:
        DataFrame with customer journey data
    """
    # Define the query
    query = f"""
    SELECT
        journey_id,
        customer_id,
        touchpoint_id,
        timestamp,
        channel,
        campaign,
        source,
        medium,
        conversion,
        conversion_value
    FROM
        `{project_id}.{dataset_id}.customer_journeys`
    WHERE
        TRUE
    """
    
    # Add date filters if provided
    if start_date:
        query += f"\nAND timestamp >= '{start_date}'"
    if end_date:
        query += f"\nAND timestamp <= '{end_date}'"
    
    # Order by journey_id and timestamp
    query += "\nORDER BY journey_id, timestamp"
    
    # For demonstration, we'll create mock data instead of running the query
    # In a real implementation, you would uncomment the following lines
    # query_job = client.query(query)
    # journey_df = query_job.to_dataframe()
    
    # Create mock data
    mock_data = create_mock_journey_data()
    
    return mock_data

def create_mock_journey_data():
    """
    Create mock customer journey data for demonstration
    
    Returns:
        DataFrame with mock customer journey data
    """
    # Set a seed for reproducibility
    np.random.seed(42)
    
    # Define channels and campaigns
    channels = ['organic_search', 'paid_search', 'social', 'email', 'direct', 'referral']
    campaigns = ['summer_sale', 'product_launch', 'brand_awareness', 'retargeting', None]
    
    # Create mock data
    data = []
    
    # Generate 1000 customer journeys
    for journey_id in range(1, 1001):
        customer_id = f"cust_{journey_id % 500 + 1}"
        
        # Determine if this journey led to conversion (30% conversion rate)
        conversion = np.random.random() < 0.3
        
        # Generate 1-8 touchpoints for this journey
        touchpoint_count = np.random.randint(1, 9)
        
        # Set base date and generate timestamps
        base_date = datetime(2023, 1, 1) + timedelta(days=np.random.randint(0, 180))
        
        for i in range(touchpoint_count):
            touchpoint_id = f"tp_{journey_id}_{i+1}"
            
            # Generate timestamp with increasing time
            timestamp = base_date + timedelta(hours=np.random.randint(1, 24 * 7))
            base_date = timestamp
            
            # Select channel and campaign
            channel = np.random.choice(channels)
            campaign = np.random.choice(campaigns)
            
            # Generate source and medium based on channel
            if channel == 'organic_search':
                source = np.random.choice(['google', 'bing', 'yahoo'])
                medium = 'organic'
            elif channel == 'paid_search':
                source = np.random.choice(['google', 'bing', 'yahoo'])
                medium = 'cpc'
            elif channel == 'social':
                source = np.random.choice(['facebook', 'instagram', 'twitter', 'linkedin'])
                medium = np.random.choice(['organic', 'paid'])
            elif channel == 'email':
                source = 'email'
                medium = np.random.choice(['newsletter', 'promotion', 'transactional'])
            elif channel == 'direct':
                source = '(direct)'
                medium = '(none)'
            else:  # referral
                source = np.random.choice(['partner_site', 'blog', 'news', 'review_site'])
                medium = 'referral'
            
            # Set conversion flag and value
            # Only the last touchpoint can have conversion=True
            is_last = (i == touchpoint_count - 1)
            tp_conversion = conversion and is_last
            
            # Generate conversion value between $50 and $500 if converted
            conversion_value = np.random.randint(50, 501) if tp_conversion else 0
            
            data.append({
                'journey_id': f"journey_{journey_id}",
                'customer_id': customer_id,
                'touchpoint_id': touchpoint_id,
                'timestamp': timestamp,
                'channel': channel,
                'campaign': campaign,
                'source': source,
                'medium': medium,
                'conversion': tp_conversion,
                'conversion_value': conversion_value
            })
    
    # Create DataFrame
    journey_df = pd.DataFrame(data)
    
    return journey_df

def run_attribution_models(journey_df):
    """
    Run various attribution models on the journey data
    
    Args:
        journey_df: DataFrame with customer journey data
    
    Returns:
        DataFrame with attribution results from different models
    """
    # Run attribution models
    models = AttributionModels()
    
    first_touch = models.first_touch(journey_df)
    last_touch = models.last_touch(journey_df)
    linear = models.linear(journey_df)
    time_decay = models.time_decay(journey_df)
    position_based = models.position_based(journey_df)
    
    # Combine results
    attribution_results = pd.concat([first_touch, last_touch, linear, time_decay, position_based])
    
    return attribution_results

def main():
    """Main function to execute the attribution analysis"""
    parser = argparse.ArgumentParser(description='Run attribution models on customer journey data')
    
    parser.add_argument('--project', type=str, help='GCP project ID')
    parser.add_argument('--dataset', type=str, help='BigQuery dataset ID')
    parser.add_argument('--start-date', type=str, help='Start date (YYYY-MM-DD)')
    parser.add_argument('--end-date', type=str, help='End date (YYYY-MM-DD)')
    parser.add_argument('--output', type=str, help='Output file path')
    parser.add_argument('--visualize', action='store_true', help='Generate visualizations')
    
    args = parser.parse_args()
    
    # Use environment variables as defaults
    project_id = args.project or os.getenv('GCP_PROJECT_ID')
    dataset_id = args.dataset or os.getenv('BIGQUERY_DATASET_ID')
    
    # Initialize BigQuery client
    client = bigquery.Client()
    
    # Fetch journey data
    print("Fetching customer journey data...")
    journey_df = fetch_journey_data(client, project_id, dataset_id, args.start_date, args.end_date)
    
    print(f"Retrieved {len(journey_df)} touchpoints for analysis")
    
    # Run attribution models
    print("Running attribution models...")
    attribution_results = run_attribution_models(journey_df)
    
    # Save results
    if args.output:
        output_path = args.output
    else:
        output_path = f"attribution_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    
    attribution_results.to_csv(output_path, index=False)
    print(f"Results saved to {output_path}")
    
    # Visualize results
    if args.visualize:
        print("Generating visualizations...")
        visualize_attribution(attribution_results)
        
    return attribution_results

def visualize_attribution(attribution_results):
    """
    Generate visualizations for attribution results
    
    Args:
        attribution_results: DataFrame with attribution results
    """
    # Set the style
    sns.set(style="whitegrid")
    
    # Create a pivot table for easier visualization
    pivot_df = attribution_results.pivot(index='channel', columns='model', values='percentage')
    
    # Create a bar chart
    plt.figure(figsize=(12, 8))
    pivot_df.plot(kind='bar', figsize=(12, 8))
    plt.title('Channel Attribution by Model', fontsize=16)
    plt.xlabel('Channel', fontsize=14)
    plt.ylabel('Attribution (%)', fontsize=14)
    plt.xticks(rotation=45)
    plt.legend(title='Attribution Model')
    
    # Save the figure
    plt.tight_layout()
    plt.savefig('attribution_comparison.png')
    plt.close()
    
    # Create a heatmap for more detailed visualization
    plt.figure(figsize=(12, 8))
    sns.heatmap(pivot_df, annot=True, cmap='YlGnBu', fmt='.1f')
    plt.title('Attribution Heatmap', fontsize=16)
    
    # Save the figure
    plt.tight_layout()
    plt.savefig('attribution_heatmap.png')
    plt.close()
    
    print("Visualizations saved to 'attribution_comparison.png' and 'attribution_heatmap.png'")

if __name__ == "__main__":
    main() 