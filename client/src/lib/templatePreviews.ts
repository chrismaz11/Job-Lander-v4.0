// Generate SVG template previews
export function generateTemplatePreview(templateId: string, category: string): string {
  const baseStyles = {
    Modern: { primaryColor: '#2563eb', secondaryColor: '#64748b', accent: '#3b82f6' },
    Classic: { primaryColor: '#1f2937', secondaryColor: '#6b7280', accent: '#374151' },
    Creative: { primaryColor: '#7c3aed', secondaryColor: '#a855f7', accent: '#8b5cf6' },
    Professional: { primaryColor: '#059669', secondaryColor: '#10b981', accent: '#047857' },
    Minimalist: { primaryColor: '#000000', secondaryColor: '#666666', accent: '#333333' }
  };

  const style = baseStyles[category as keyof typeof baseStyles] || baseStyles.Modern;

  return `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="280" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="280" fill="white" stroke="#e5e7eb" stroke-width="1"/>
      
      <!-- Header -->
      <rect x="10" y="10" width="180" height="40" fill="${style.primaryColor}" rx="4"/>
      <rect x="20" y="20" width="80" height="8" fill="white" rx="2"/>
      <rect x="20" y="32" width="60" height="6" fill="white" opacity="0.8" rx="2"/>
      
      <!-- Contact Info -->
      <rect x="10" y="60" width="180" height="20" fill="${style.secondaryColor}" opacity="0.1" rx="2"/>
      <rect x="20" y="65" width="40" height="4" fill="${style.secondaryColor}" rx="1"/>
      <rect x="70" y="65" width="50" height="4" fill="${style.secondaryColor}" rx="1"/>
      <rect x="130" y="65" width="45" height="4" fill="${style.secondaryColor}" rx="1"/>
      
      <!-- Experience Section -->
      <rect x="20" y="95" width="60" height="6" fill="${style.primaryColor}" rx="2"/>
      <rect x="20" y="110" width="160" height="4" fill="${style.secondaryColor}" opacity="0.6" rx="1"/>
      <rect x="20" y="118" width="140" height="3" fill="${style.secondaryColor}" opacity="0.4" rx="1"/>
      <rect x="20" y="125" width="120" height="3" fill="${style.secondaryColor}" opacity="0.4" rx="1"/>
      
      <rect x="20" y="140" width="160" height="4" fill="${style.secondaryColor}" opacity="0.6" rx="1"/>
      <rect x="20" y="148" width="130" height="3" fill="${style.secondaryColor}" opacity="0.4" rx="1"/>
      <rect x="20" y="155" width="110" height="3" fill="${style.secondaryColor}" opacity="0.4" rx="1"/>
      
      <!-- Education Section -->
      <rect x="20" y="175" width="50" height="6" fill="${style.primaryColor}" rx="2"/>
      <rect x="20" y="190" width="140" height="4" fill="${style.secondaryColor}" opacity="0.6" rx="1"/>
      <rect x="20" y="198" width="100" height="3" fill="${style.secondaryColor}" opacity="0.4" rx="1"/>
      
      <!-- Skills Section -->
      <rect x="20" y="215" width="35" height="6" fill="${style.primaryColor}" rx="2"/>
      <rect x="20" y="230" width="30" height="12" fill="${style.accent}" opacity="0.2" rx="6"/>
      <rect x="55" y="230" width="40" height="12" fill="${style.accent}" opacity="0.2" rx="6"/>
      <rect x="100" y="230" width="35" height="12" fill="${style.accent}" opacity="0.2" rx="6"/>
      <rect x="20" y="247" width="45" height="12" fill="${style.accent}" opacity="0.2" rx="6"/>
      <rect x="70" y="247" width="25" height="12" fill="${style.accent}" opacity="0.2" rx="6"/>
      
      <!-- Template ID indicator -->
      <text x="10" y="275" font-family="Arial, sans-serif" font-size="8" fill="${style.secondaryColor}" opacity="0.5">${templateId}</text>
    </svg>
  `)}`
}
