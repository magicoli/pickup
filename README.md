# Pick-Up

![Version 2.0.0-dev-4](https://badgen.net/badge/Version/2.0.0-dev-4/FFaa00)
![Stable 1.3.4](https://badgen.net/badge/1.3.4/None/00aa00)
![License AGPLv3](https://badgen.net/badge/License/AGPLv3/552b55)

A wonderful digital sign for airport pick-ups and meeting people.

## Overview

Pick-Up is a progressive web application (PWA) designed to create digital signs for airport pick-ups, ride-sharing, and any situation where you need to display someone's name prominently. The app automatically adjusts text size to make names as large as possible on the screen, ensuring maximum visibility from a distance.

The basic usage is straightforward. You can use Pickup, free of charge, and/or install it on your device from:

> **https://pickup.contact/**

Or read more below to install it on your own servers.

## Features

- **Auto-scaling text**: Names automatically resize to fill the available screen space
- **Editable display**: Click on any text to edit it directly
- **URL parameters**: Pre-fill information using URL query parameters
- **Customizable appearance**: 
  - Choose from preset logos
  - Custom background colors and images
  - Configurable title and branding
- **Progressive Web App**: Can be installed on mobile devices and used offline
- **Full-screen mode**: Toggle fullscreen for maximum visibility
- **Responsive design**: Works on all screen sizes and orientations
- **Service Worker**: Offline functionality with caching

## Quick Start

### Using the Web App

1. **Basic usage**: Open `index.html` in a web browser
2. **Edit names**: Click on the displayed name to edit it
3. **Customize**: Click the logo to access settings for colors, background, and branding
4. **Install**: Use the install button to add to your home screen on mobile devices

### URL Parameters

You can pre-fill the display using URL parameters:

```
https://pickup.contact/?f=John&l=Doe&c=Welcome!
```

Available parameters:
- `f`: First name
- `l`: Last name  
- `n`: Full name (overrides first/last name)
- `c`: Comment/message

Examples:
```
/?f=John&l=Smith
/?n=Jane Doe&c=Flight AA123
/?f=Maria&c=Taxi to downtown
```

## Installation

### As a PWA

1. Open the app in a mobile browser
2. Click the "Install" button when it appears
3. The app will be added to your home screen and can run offline

### Self-hosted

1. Clone or download this repository
2. Serve the files from a web server (required for service worker functionality)
3. Open in a web browser

## File Structure

```
├── index.html          # Main application
├── form.html          # Form component (embedded)
├── manifest.json      # PWA manifest
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   ├── pickup.js      # Main application logic
│   └── service-workers.js # PWA service worker
├── images/            # Logo assets
│   ├── pickup-logo-*.png
│   └── [preset logos]
└── fonts/             # Gotham font family
```

## Customization

### Logos

The app can includes several preset logos: add your own logos to the `images/` directory and update the logo selector in the settings.

### Styling

The main styles are in `css/style.css`. Key customizable elements:
- Font family and sizing
- Colors and backgrounds
- Layout and spacing
- Responsive breakpoints

### Configuration

Settings are stored in browser localStorage:
- `title`: Custom page title
- `logo`: Selected logo image
- `bgColor`: Background color
- `bgImage`: Background image

## Browser Support

- Modern browsers with ES6 support
- Service Worker support for offline functionality
- Canvas API for text measurement
- CSS Grid for layout

## Development

### Local Development

1. Serve files from a local web server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx http-server
   ```

2. Open `http://localhost:8000` in your browser

### Version Management

The app uses version strings throughout for cache busting:
- Update version in `index.html`, `js/service-workers.js`, and `manifest.json`
- Use the `dev/bump-version` script to automate version updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different devices and browsers
5. Submit a pull request

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPLv3). See the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## Support

For issues and feature requests, please use the project's issue tracker.

---

**Perfect for:**
- Airport pickups
- Ride-sharing meetups  
- Event registration
- Hotel shuttles
- Conference attendee pickup
- Any situation where you need a clear, visible name display
