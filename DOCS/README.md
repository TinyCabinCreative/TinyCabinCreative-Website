# Tiny Cabin Creative - Portfolio Website

A modern, mobile-first portfolio website built with vanilla HTML, CSS, and Vue.js 3. Features a warm, organic aesthetic inspired by cabin life with earthy tones and thoughtful design.

## Features

- **Mobile-First Design**: Fully responsive from 320px to 4K displays
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Interactive Portfolio**: Expandable project cards with detailed case studies
- **Contact Form**: Comprehensive intake form with validation
- **Calendly Integration**: Multiple CTAs for scheduling discovery calls
- **Performance Optimized**: Fast loading times with lazy loading and minimal dependencies
- **Accessible**: WCAG compliant with keyboard navigation support

## Pages

1. **Landing Page** (`index.html`)
   - Hero section with dual CTAs
   - Services overview
   - Process timeline
   - Multiple Calendly booking links

2. **Portfolio** (`portfolio.html`)
   - 5 featured projects
   - Expandable project cards
   - Detailed case studies with results

3. **About** (`about.html`)
   - Company story
   - Philosophy and approach
   - Team information
   - Core values

4. **Contact** (`contact.html`)
   - Project intake form
   - Calendly integration
   - Budget and timeline selectors

## Quick Start

1. **Update Calendly Link**
   - Open `script.js`
   - Find the `CONFIG` object at the top
   - Replace `calendlyUrl` with your actual Calendly link

2. **Configure Form Submission**
   - Open `script.js`
   - Update `formEndpoint` with your form handler (Formspree, Netlify Forms, etc.)

3. **Customize Colors**
   - Open `styles.css`
   - Edit CSS variables in the `:root` section
   - Primary colors, accents, and neutrals are all easily editable

4. **Replace Placeholder Images**
   - On the About page, replace the placeholder divs with actual images
   - Use the existing structure and add `<img>` tags or background images

## Customization Guide

### Editing Colors
All colors are defined as CSS variables in `styles.css`:

```css
:root {
  --color-primary: #8B7355;        /* Main brand color */
  --color-accent: #6B8E23;          /* Accent color */
  --color-cream: #FAF7F2;           /* Background color */
  /* ... more colors */
}
```

### Editing Fonts
Fonts are defined in the CSS variables and imported from Google Fonts:

```css
--font-display: 'Cormorant Garamond', serif;
--font-body: 'Work Sans', sans-serif;
```

To change fonts:
1. Update the Google Fonts link in each HTML file's `<head>`
2. Update the CSS variables in `styles.css`

### Editing Content
All content is directly in the HTML files for easy editing:
- Company name: Search for "Tiny Cabin Creative" and replace
- Taglines and descriptions: Edit directly in the HTML
- Project information: Update in `portfolio.html`

### Adding Projects
To add a new project to the portfolio:
1. Copy an existing `.project` div in `portfolio.html`
2. Update the project details
3. Change the background gradient color in the `.project__image` style
4. The expanding/collapsing functionality will work automatically

### Form Integration Options

**Option 1: Formspree (Easiest)**
```javascript
formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID'
```

**Option 2: Netlify Forms**
1. Add `netlify` attribute to form in `contact.html`
2. Deploy to Netlify
3. Forms will work automatically

**Option 3: Custom Backend**
Update the fetch request in `script.js` to point to your API endpoint

## Calendly Integration

The site uses Calendly links that open in a new tab. For a better experience:

1. **Install Calendly Widget** (Optional)
   Add to your HTML `<head>`:
   ```html
   <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
   <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
   ```

2. **Update the openCalendly method** in `script.js`:
   ```javascript
   openCalendly() {
     Calendly.initPopupWidget({ url: CONFIG.calendlyUrl });
   }
   ```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Dependencies

- **Vue.js 3**: Loaded from CDN for interactive components
- **Google Fonts**: Cormorant Garamond and Work Sans

Both are loaded from CDN, no build process required!

## File Structure

```
tiny-cabin-creative/
├── index.html          # Landing page
├── portfolio.html      # Portfolio page
├── about.html          # About page
├── contact.html        # Contact page
├── styles.css          # All styles (mobile-first)
├── script.js           # Vue.js app and vanilla JS
└── README.md           # This file
```

## Performance Tips

1. **Optimize Images**: Use WebP format and proper sizing
2. **Enable Compression**: Use gzip/brotli on your server
3. **CDN**: Consider using a CDN for static assets
4. **Caching**: Set appropriate cache headers

## Deployment

This is a static site and can be deployed to:
- **Netlify**: Drag and drop the folder
- **Vercel**: Import from GitHub
- **GitHub Pages**: Push to a repository
- **Any web host**: Upload via FTP

## Accessibility

The site includes:
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Skip to main content link

## SEO Optimization

To improve SEO:
1. Add meta descriptions to each page
2. Include Open Graph tags for social sharing
3. Add a sitemap.xml file
4. Implement schema.org structured data
5. Optimize image alt tags

## License

This template is free to use for your portfolio. Feel free to customize it to match your brand!

## Support

For questions about customization, refer to the inline comments in the code or create an issue in the repository.

---

Built with ❤️ by Tiny Cabin Creative
