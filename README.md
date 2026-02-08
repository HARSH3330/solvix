# Solvix Corporate Website

A professional, modern, and fully responsive static website for **Solvix Business Solutions** - a multi-service business support firm.

**Status**: ✅ Production Ready  
**Last Updated**: February 2026

---

## 📋 Project Overview

This is a **pure static website** with no backend dependencies or databases.

**Tech Stack**:
- **HTML5** - Semantic markup
- **CSS3** - Modern responsive design with CSS variables
- **Vanilla JavaScript** - No frameworks
- **Google Analytics 4** - Visitor analytics
- **EmailJS** - Form submission handling

**Key Metrics**:
- 7 comprehensive pages
- 100% mobile responsive
- Lightweight & fast-loading
- Zero runtime dependencies
- Production-ready deployment

---

## 🌟 Features

### Pages
1. **Home** - Hero section with call-to-action
2. **About Us** - Company information
3. **Services** - 8 service offerings
4. **Why Solvix** - Competitive advantages & accountability model
5. **Founder's Message** - Personal introduction
6. **Careers** - Career opportunities & application form
7. **Contact** - Contact form & office locations

### Functionality
- **Responsive Design** - Mobile-first, all screen sizes
- **Form Validation** - Real-time client-side validation
- **Email Integration** - Contact & career forms via EmailJS
- **Analytics Tracking** - Google Analytics 4 integration
- **Animations** - Smooth scroll-based fade-in effects
- **Mobile Menu** - Hamburger navigation for small screens
- **SEO Optimized** - Meta tags, semantic HTML, proper hierarchy

---

## 🗂️ Project Structure

```
solvix-website/
├── index.html                 # Homepage
├── about.html                 # About Us page
├── services.html              # Services page
├── why-solvix.html            # Why Solvix page
├── founder.html               # Founder's message page
├── careers.html               # Careers & application page
├── contact.html               # Contact form & locations page
├── css/
│   ├── main.css               # Core styles & variables
│   └── components.css         # Component-specific styles
├── js/
│   ├── main.js                # Navigation & core functionality
│   ├── animations.js          # Scroll animations & effects
│   └── forms.js               # Form validation & EmailJS integration
├── config/
│   └── analytics-config.js    # GA4 & EmailJS configuration
├── public/
│   └── assets/                # Images, media, fonts (empty placeholder)
├── .env.example               # Environment variable template
├── .gitignore                 # Git ignore rules
├── package.json               # Project metadata
├── netlify.toml               # Netlify deployment config
└── QUICK_START.md             # Setup & deployment guide
```

---

## 🚀 Local Development

### Quick Start
```bash
# Option 1: Python (macOS/Linux)
python3 -m http.server 8000

# Option 2: Node.js
npx serve -p 8000

# Visit: http://localhost:8000
```

### Prerequisites
- No build tools required
- Any modern web browser
- Optional: Python 3 or Node.js for local server

---

## ⚙️ Configuration

### Google Analytics
- Edit `config/analytics-config.js`
- Replace `GA_MEASUREMENT_ID` with your GA4 ID
- Get ID from: https://analytics.google.com

### EmailJS
- Edit `config/analytics-config.js`
- Add your EmailJS credentials:
  - `serviceId` - From EmailJS Account > Services
  - `contactTemplateId` - Contact form template
  - `careerTemplateId` - Career form template
  - `publicKey` - From EmailJS Account > API
- Sign up at: https://www.emailjs.com (free tier: 200 emails/month)

### Environment Variables
- Copy `.env.example` to `.env` for local development
- `.env` is ignored by git (see `.gitignore`)
- Used by build/deployment processes

---

## 📝 Form Integration

### Contact Form
- Located on `/contact.html`
- Sends to: `info@wesolvix.in`
- Collects: Name, Email, Phone, Message

### Career Application Form
- Located on `/careers.html`
- Sends to: `info@wesolvix.in`
- Collects: Name, Email, Phone, Position, Cover Letter
- Supports file uploads (resume/CV)

Both forms include real-time validation and error feedback.

---

## 🔐 Security & Privacy

- **Credentials**: Keep `.env` and `config/analytics-config.js` in private repositories
- **Public Key**: EmailJS public key is intentionally exposed (safe for client-side use)
- **HTTPS**: Enable via Netlify or your hosting provider
- **Analytics**: GA4 can be disabled by removing script tags
- **No Data Storage**: Forms are sent via email only, no database

---

## 🌐 Deployment

### Netlify (Recommended)
- Auto-deployment from GitHub
- Free HTTPS & custom domain support
- Configured via `netlify.toml`

### Other Platforms
- **Vercel**: Supports static sites
- **GitHub Pages**: Direct static hosting
- **Traditional Web Server**: Upload HTML/CSS/JS files

See `QUICK_START.md` for step-by-step deployment instructions.

---

## 🔧 Common Tasks

### Add a New Page
1. Create new HTML file in root
2. Add navigation link in `<nav>` on all pages
3. Include script tags at end of body:
   ```html
   <script src="js/main.js"></script>
   <script src="js/animations.js"></script>
   <script src="config/analytics-config.js"></script>
   <script src="js/forms.js"></script>
   ```

### Update Styles
- Global variables: Edit `css/main.css`
- Component styles: Edit `css/components.css`
- Mobile responsive: Uses CSS media queries

### Modify Forms
- Validation rules: Edit `js/forms.js`
- Template data: Edit `submitViaEmailJS()` in `js/forms.js`
- Email templates: Update in EmailJS dashboard

---

## 📞 Support & Resources

- **Netlify Docs**: https://docs.netlify.com/
- **EmailJS Docs**: https://www.emailjs.com/docs/
- **Google Analytics**: https://support.google.com/analytics
- **GitHub Docs**: https://docs.github.com/

---

## 📄 License

Proprietary - Created for Solvix Business Solutions

---

## 🎯 Next Steps

1. Configure Google Analytics (see Configuration section)
2. Setup EmailJS credentials (see Configuration section)
3. Deploy to Netlify (see `QUICK_START.md`)
4. Point custom domain to Netlify
5. Test all forms and analytics

See `QUICK_START.md` for detailed step-by-step deployment guide.

---

**Built with HTML5, CSS3, and Vanilla JavaScript**  
**Status**: ✅ Production Ready  
**Last Updated**: February 2026
