# Gmail Signature Manager

A client-side web application for Google Workspace environments to update Gmail signatures using the Gmail API v1. This tool allows users to search for their pre-formatted signature and apply it to their Gmail account.

## Features

- ✅ **Client-side only** - No server required, runs entirely in the browser
- ✅ **OAuth2 Authentication** - Secure Google sign-in
- ✅ **Search-based Selection** - Users search for their signature by name or extension
- ✅ **Pre-formatted Signatures** - Signatures are stored with company formatting and branding
- ✅ **Live Preview** - See your signature before applying it
- ✅ **Google Workspace Ready** - Designed for centralized IT management
- ✅ **Modern UI** - Clean, responsive Bootstrap-based design

## Migration from Deprecated API

This application replaces the old Gmail signature tool that used deprecated APIs. The new implementation uses:

- **Gmail API v1** - Current stable API for managing signatures
- **Google Identity Services** - Modern OAuth2 authentication (replaces deprecated gapi.auth2)
- **SendAs Settings Endpoint** - Proper API endpoint for signature management

## Setup Instructions

### For IT Administrators

This tool is designed for Google Workspace environments where IT manages the Google Cloud Project centrally.

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project for your organization
3. Enable the **Gmail API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click "Enable"

### 2. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "Internal" (for Google Workspace organizations)
3. Fill in the required information:
   - App name: "Gmail Signature Manager"
   - User support email: IT support email
   - Developer contact email: IT contact email
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
     - Your production domain (e.g., `https://signatures.yourcompany.com`)
   - Authorized redirect URIs are not needed for this application
5. Click "Create"
6. Copy the **Client ID**

### 4. Configure the Application

1. Open `index.html` in a text editor
2. Replace `YOUR_CLIENT_ID_HERE` with your OAuth 2.0 Client ID (around line 24)
3. Update the `employeeData` array (starting around line 37) with your organization's employee data:

```javascript
const employeeData = [
    {
        name: "Employee Name",
        title: "Job Title",
        email: "email@yourcompany.com",
        phone: "1234567890",
        extension: "1001",
        fax: "",
        designations: "Professional certifications",
        disclaimer: "<p>Your company disclaimer text</p>"
    },
    // Add more employees...
];
```

**Note:** For larger organizations, consider loading employee data from an external JSON file or API endpoint instead of hardcoding in the HTML.

### 5. Customize Signature Formatting

Edit the `generateSignatureHTML()` function (around line 79) to match your company's signature format, including:
- Colors and fonts
- Company logo (can be added as base64 or external URL)
- Layout and styling
- Disclaimer text

### 6. Deploy the Application

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

### For End Users

1. **Open the Application** - Navigate to the deployed URL provided by your IT department
2. **Search for Your Signature**:
   - Enter your name or phone extension in the search box
   - Your signature details will appear with a preview
3. **Authenticate**:
   - Click "Step 1: Authenticate with Google"
   - Sign in with your Google Workspace account
   - Grant the necessary permissions
4. **Apply Signature**:
   - Click "Step 2: Apply Signature"
   - The signature will be updated in your Gmail account
5. **Verify** - Check your Gmail settings to confirm the signature was applied

### Important Notes

- You must be signed in with the Google Workspace account that matches the email in the search results
- The signature will replace your current Gmail signature
- You only need to authenticate once per session
- If authentication expires, simply click "Step 1" again

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