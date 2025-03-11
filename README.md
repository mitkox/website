# mitko x Corporate Website

A modern, professional website for mitko x, showcasing enterprise technology and AI solutions.

## Project Structure

- `index.html` - Main HTML file with all content sections
- `css/styles.css` - Styling for the entire website
- `js/main.js` - JavaScript for website interactivity

## Features

- Responsive design for all devices
- Modern UI with gradient accents
- Interactive navigation
- Service showcase section
- Contact form
- Mobile-friendly layout

## Deployment to Cloudflare Pages

This website is optimized for deployment on Cloudflare Pages. Here's how to deploy it:

1. Create a GitHub repository and push this code to it
2. Log in to your Cloudflare dashboard
3. Navigate to Pages > Create a project
4. Connect your GitHub account and select your repository
5. Configure your build settings:
   - Build command: (leave empty as this is a static site)
   - Build output directory: / (root directory)
6. Click on "Save and Deploy"

Once deployed, your site will be available at `[project-name].pages.dev`. You can also set up a custom domain in the Cloudflare Pages settings.

## Local Development

To test this website locally, you can use any simple HTTP server. For example:

1. Using Python:
   ```
   python -m http.server
   ```

2. Using Node.js (with the `http-server` package):
   ```
   npx http-server
   ```

Then open your browser to `http://localhost:8000` (or the port specified by your server).

## Customization

Feel free to modify the content, colors, and styling to match your specific branding requirements. The main color scheme is defined in the `:root` section of the CSS file.

## Contact Form

The contact form currently has a simple JavaScript handler that displays an alert on submission. For production, you'll need to connect it to a form handling service or serverless function to process submissions.

Cloudflare offers Workers and Pages Functions that can be used to handle form submissions without a traditional backend server.
