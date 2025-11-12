// Configuration Example
// Copy this section and replace the values in index.html

// STEP 1: Get your OAuth 2.0 Client ID from Google Cloud Console
// https://console.cloud.google.com/apis/credentials
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com';

// STEP 2: (Optional) Get your API Key from Google Cloud Console
// This is optional - OAuth provides sufficient access for this application
const API_KEY = 'YOUR_API_KEY_HERE';

// Required OAuth Scopes (already configured in the app):
// - https://www.googleapis.com/auth/gmail.settings.basic
// - https://www.googleapis.com/auth/gmail.settings.sharing

// Instructions:
// 1. Create a project in Google Cloud Console
// 2. Enable Gmail API
// 3. Create OAuth 2.0 credentials
// 4. Add authorized JavaScript origins (e.g., http://localhost:8000)
// 5. Copy your Client ID and paste it in index.html
