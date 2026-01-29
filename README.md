# Solvix Corporate Website

A professional, modern corporate website for Solvix Business Solutions - a multi-service business support firm.

## 🌟 Features

- **7 Comprehensive Pages**: Home, About Us, Services, Why Solvix, Founder's Message, Careers, Contact
- **Modern Design**: Clean corporate aesthetic with premium typography and subtle animations
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Interactive Elements**: Scroll animations, hover effects, expandable service cards
- **SEO Optimized**: Semantic HTML, meta tags, and proper heading hierarchy
- **Form Validation**: Real-time client-side validation for contact and career forms
- **Professional UI/UX**: Trust-building design focused on conversion

## 📁 Project Structure

```
solvix-website/
├── index.html              # Home page
├── about.html              # About Us
├── services.html           # Services showcase
├── why-solvix.html         # Why Hire Solvix
├── founder.html            # Founder's Message
├── careers.html            # Careers page
├── contact.html            # Contact Us
├── css/
│   ├── main.css           # Design system & global styles
│   └── components.css     # Reusable components
├── js/
│   ├── main.js            # Core functionality
│   ├── animations.js      # Scroll animations & effects
│   └── forms.js           # Form validation & handling
├── assets/
│   └── images/            # Images and icons
└── README.md              # This file
```

## 🚀 Getting Started

### Option 1: Simple Setup (No Build Process)

1. **Open the website**: Simply open `index.html` in your web browser
2. **Local Server (Recommended)**: For better performance and to avoid CORS issues:
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx serve
   ```
   
   Then visit `http://localhost:8000`

### Option 2: Deploy to Web Hosting

Upload all files to your web hosting service via FTP or hosting control panel.

## 🎨 Customization Guide

### 1. Update Brand Colors

Edit `css/main.css` and modify the CSS custom properties:

```css
:root {
  --color-primary: #1e3a8a;        /* Your primary brand color */
  --color-primary-light: #3b82f6;  /* Lighter variant */
  --color-primary-dark: #1e40af;   /* Darker variant */
}
```

### 2. Update Content

- **Company Information**: Search for "Solvix" and replace with your company name
- **Contact Details**: Update email, phone, and address in all pages
- **Services**: Modify service descriptions in `services.html`
- **Founder Message**: Customize the message in `founder.html`

### 3. Add Your Logo

Replace the emoji logo in the navigation:

```html
<!-- Current -->
<a href="index.html" class="navbar-logo">Solvix</a>

<!-- Replace with -->
<a href="index.html" class="navbar-logo">
  <img src="assets/images/logo.png" alt="Your Company" height="40">
</a>
```

### 4. Add Google Maps

In `contact.html`, replace the map placeholder with your Google Maps embed:

```html
<iframe 
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE" 
  width="100%" 
  height="450" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy">
</iframe>
```

## 📧 Form Integration

The contact and career forms currently use client-side validation only. To make them functional:

### Option 1: EmailJS (No Backend Required)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Add this to your HTML before closing `</body>`:
   ```html
   <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
   ```
3. Update `js/forms.js` to send emails via EmailJS

### Option 2: FormSpree

1. Sign up at [FormSpree](https://formspree.io/)
2. Update form action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 3: Custom Backend

Integrate with your own backend API by modifying the form submission handler in `js/forms.js`.

## 🎯 SEO Optimization

### Update Meta Tags

In each HTML file, customize:

```html
<meta name="description" content="Your custom description">
<meta name="keywords" content="your, keywords, here">
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your description">
```

### Add Google Analytics

Before closing `</head>` tag, add:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 991px
- Desktop: 992px - 1199px
- Large Desktop: ≥ 1200px

## ⚡ Performance Tips

1. **Optimize Images**: Compress images before uploading
2. **Enable Caching**: Configure server caching headers
3. **Minify CSS/JS**: Use minification tools for production
4. **CDN**: Consider using a CDN for faster global delivery

## 🐛 Troubleshooting

### Forms Not Working

- Check browser console for JavaScript errors
- Ensure form validation attributes are correct
- Verify EmailJS or FormSpree integration

### Animations Not Smooth

- Check if browser supports Intersection Observer API
- Reduce animation complexity on lower-end devices
- Disable animations for users who prefer reduced motion

### Mobile Menu Not Opening

- Verify JavaScript is loaded correctly
- Check for console errors
- Ensure navbar-toggle class is present

## 📄 License

This website template is provided as-is for Solvix Business Solutions.

## 🤝 Support

For customization support or questions:
- Email: info@solvix.com
- Phone: +91 123 456 7890

## 🔄 Future Enhancements

Consider adding:
- Blog section for content marketing
- Client testimonials slider
- Case studies page
- Live chat integration
- Multi-language support
- Dark mode toggle

---

**Built with ❤️ for Solvix Business Solutions**
