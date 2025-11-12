# Deployment Guide

This guide covers various deployment options for the Gmail Signature Manager.

## Prerequisites

Before deploying, make sure you have:
1. Created a Google Cloud Project
2. Enabled the Gmail API
3. Created OAuth 2.0 credentials
4. Updated `index.html` with your Client ID

## Deployment Options

### Option 1: GitHub Pages (Recommended for Easy Deployment)

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select the branch (e.g., `main`) and root folder
4. Save and wait for deployment
5. Your site will be available at `https://yourusername.github.io/repository-name/`
6. Update OAuth credentials to include this URL in "Authorized JavaScript origins"

### Option 2: Local Web Server (For Testing)

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Option 3: Static Hosting Services

#### Netlify
1. Drag and drop your project folder to https://app.netlify.com/drop
2. Your site will be deployed instantly
3. Update OAuth credentials with the Netlify URL

#### Vercel
```bash
npm i -g vercel
cd /path/to/gmailSignature
vercel
```

#### Cloudflare Pages
1. Push code to GitHub/GitLab
2. Connect repository to Cloudflare Pages
3. Deploy automatically on every push

#### AWS S3 Static Website Hosting
1. Create an S3 bucket
2. Enable static website hosting
3. Upload `index.html`
4. Configure bucket policy for public read access
5. Update CORS configuration if needed

### Option 4: Traditional Web Hosting

Upload `index.html` to your web server via:
- FTP/SFTP
- cPanel File Manager
- SSH/SCP

Access via your domain (e.g., `https://yourdomain.com/index.html`)

## Post-Deployment Steps

1. **Test Authentication**
   - Open the deployed URL
   - Click "Sign in with Google"
   - Verify OAuth flow works

2. **Test Signature Creation**
   - Fill in signature fields
   - Click "Generate Signature"
   - Verify preview displays correctly

3. **Test API Integration**
   - Click "Update Gmail Signature"
   - Check your Gmail settings to verify the signature was saved

## Updating OAuth Configuration

After deployment, update your OAuth 2.0 Client in Google Cloud Console:

1. Go to [Credentials](https://console.cloud.google.com/apis/credentials)
2. Click on your OAuth 2.0 Client ID
3. Add your deployed URL to "Authorized JavaScript origins"
   - Example: `https://yourusername.github.io`
   - Example: `https://yourdomain.com`
4. Save changes

**Note**: Changes to OAuth configuration may take a few minutes to propagate.

## Troubleshooting

### "Origin not allowed" Error
- Ensure your deployment URL is added to Authorized JavaScript origins
- Check for typos in the URL (no trailing slashes)
- Wait a few minutes after adding the origin

### "Please configure your Google OAuth Client ID" Error
- Verify you've replaced `YOUR_CLIENT_ID_HERE` in `index.html`
- The Client ID should end with `.apps.googleusercontent.com`

### OAuth Popup Blocked
- Ensure pop-ups are not blocked by your browser
- Google Identity Services usually works without popups, but check browser settings

## Security Notes

- Always use HTTPS in production (most static hosting services provide this)
- Never commit your actual Client ID to public repositories if it's sensitive
- Consider using environment-specific configuration for different deployments
- The Client ID is safe to expose in client-side code (it's not a secret)

## Custom Domain

To use a custom domain:

1. Configure DNS records to point to your hosting service
2. Set up SSL/TLS certificate (usually automatic with modern hosting)
3. Update OAuth credentials with your custom domain
4. Test thoroughly after DNS propagation

## CDN and Performance

For better performance, consider:
- Using a CDN (most static hosts include this)
- Enabling compression (gzip/brotli)
- Caching headers are automatically set by most static hosts

## Maintenance

- Keep Google Identity Services library up to date (auto-updates from CDN)
- Monitor Gmail API changes and deprecations
- Test regularly to ensure OAuth flow still works
- Check Google Cloud Console for any security alerts
