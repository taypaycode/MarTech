# Credentials Directory

This directory is used to store credentials files that should not be committed to version control.

## Required Files

### Google Cloud Platform

For BigQuery integration, you need to add:

- `google-credentials.json` - Service account credentials for GCP

To generate these credentials:

1. Go to the Google Cloud Console
2. Navigate to IAM & Admin > Service Accounts
3. Create a new service account with BigQuery permissions 
4. Create a key (JSON type)
5. Download and save it as `google-credentials.json` in this directory

## Security Warning

Never commit credential files to version control!

This directory is included in `.gitignore` to prevent accidental commits. 