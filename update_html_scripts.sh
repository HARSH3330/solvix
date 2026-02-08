#!/bin/bash

# GA and EmailJS scripts to inject
GA_AND_EMAILJS='  <!-- Google Analytics 4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G_XXXXXXXXXXXXX"><\/script>
  
  <!-- Configuration & Analytics -->
  <script src="config\/analytics-config.js"><\/script>
  
  <!-- EmailJS SDK for form submissions -->
  <script type="text\/javascript" src="https:\/\/cdn.jsdelivr.net\/npm\/@emailjs\/browser@3\/dist\/index.min.js"><\/script>'

# Forms.js script tag (add before closing body)
FORMS_SCRIPT='  <script src="js/forms.js"><\/script>'

HTML_FILES=(index.html about.html services.html why-solvix.html founder.html careers.html contact.html)

for file in "${HTML_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."
    
    # Check if GA script already exists
    if ! grep -q "Google Analytics 4" "$file"; then
      # Add GA and EmailJS scripts before closing </head>
      sed -i '' "/<\/head>/i\\
$GA_AND_EMAILJS
" "$file"
    fi
    
    # Check if forms.js script already exists
    if ! grep -q 'src="js/forms.js"' "$file"; then
      # Add forms.js before closing </body>
      sed -i '' "/<\/body>/i\\
$FORMS_SCRIPT
" "$file"
    fi
  fi
done

echo "✓ All HTML files updated with GA and EmailJS scripts"
