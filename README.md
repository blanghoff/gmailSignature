# Gmail Signature Manager

A client-side web application to update Gmail signatures using the Gmail API v1. This tool allows users to create formatted HTML signature blocks and set them as default in their Gmail settings.

## Features

- ✅ **Client-side only** - No server required, runs entirely in the browser
- ✅ **OAuth2 Authentication** - Secure Google sign-in
- ✅ **Custom Signature Builder** - Create professional signatures with name, title, phone, company, and website
- ✅ **Live Preview** - See your signature before applying it
- ✅ **Automatic Default Setting** - Sets signature as default for all emails
- ✅ **Modern UI** - Clean, responsive design

## Migration from Deprecated API

This application replaces the old Gmail signature tool that used deprecated APIs. The new implementation uses:

- **Gmail API v1** - Current stable API for managing signatures
- **Google Identity Services** - Modern OAuth2 authentication (replaces deprecated Google Sign-In)
- **SendAs Settings Endpoint** - Proper API endpoint for signature management

## Setup Instructions

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Gmail API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click "Enable"

### 2. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "Internal" (for Google Workspace) or "External" (for general use)
3. Fill in the required information:
   - App name: "Gmail Signature Manager"
   - User support email: Your email
   - Developer contact email: Your email
4. Add scopes:
   - `https://www.googleapis.com/auth/gmail.settings.basic`
   - `https://www.googleapis.com/auth/gmail.settings.sharing`
5. Save and continue

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Configure:
   - Name: "Gmail Signature Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:8000` (for local testing)
     - Your production domain (e.g., `https://yourdomain.com`)
   - Authorized redirect URIs are not needed for this application
5. Click "Create"
6. Copy the **Client ID**

### 4. Configure the Application

1. Open `index.html` in a text editor
2. Replace `YOUR_CLIENT_ID_HERE` with your OAuth 2.0 Client ID (line 272)
3. (Optional) If you want to use an API Key for additional quotas, replace `YOUR_API_KEY_HERE` on line 273
   - API Key is optional for this application as OAuth provides sufficient access

Example:
```javascript
const CLIENT_ID = '123456789-abcdefghijklmnop.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA-your-api-key-here'; // Optional
```

### 5. Deploy the Application

#### Option A: Local Testing
1. Open a terminal in the project directory
2. Start a local web server:
   ```bash
   python3 -m http.server 8000
   # OR
   python -m SimpleHTTPServer 8000
   # OR
   npx serve
   ```
3. Open your browser and navigate to `http://localhost:8000`

#### Option B: Deploy to Web Server
1. Upload `index.html` to your web server
2. Ensure the domain is added to "Authorized JavaScript origins" in your OAuth configuration
3. Access the file via your domain

#### Option C: Use as a File
1. Some browsers may block OAuth when opening `index.html` directly from the file system
2. It's recommended to use a local server (Option A) or deploy to a web server (Option B)

## Usage

1. **Open the Application** - Navigate to the hosted URL or local server
2. **Sign In** - Click "Sign in with Google" and authorize the application
3. **Create Signature**:
   - Fill in your details (Name is required)
   - Click "Generate Signature" to see a preview
4. **Update Gmail** - Click "Update Gmail Signature" to save the signature to your Gmail account
5. The signature will be automatically set as default for all emails

## Security Notes

- This application only requests minimal Gmail permissions needed for signature management
- No data is stored on any server - everything runs in your browser
- The access token is only stored in memory and is cleared when you sign out or close the browser
- Source code is fully transparent and can be audited

## Troubleshooting

### "Please configure your Google OAuth Client ID"
- You need to replace `YOUR_CLIENT_ID_HERE` in the code with your actual Client ID

### "Error 403: access_denied"
- Make sure you've enabled the Gmail API in Google Cloud Console
- Verify that the OAuth consent screen is configured correctly
- Check that the required scopes are added

### "Origin not allowed"
- Add your domain/URL to "Authorized JavaScript origins" in the OAuth client configuration
- For local testing, ensure `http://localhost:8000` is added

### "Session expired. Please sign in again"
- Access tokens expire after 1 hour
- Simply click "Sign in with Google" again

## API Endpoints Used

- **User Info**: `GET https://www.googleapis.com/oauth2/v2/userinfo`
- **Get Signature**: `GET https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs/{email}`
- **Update Signature**: `PATCH https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs/{email}`

## Browser Support

- Chrome 89+
- Firefox 87+
- Safari 14+
- Edge 89+

Older browsers may not support Google Identity Services.

## License

MIT License - Feel free to use and modify as needed.

## Support

For issues or questions, please open an issue on GitHub.