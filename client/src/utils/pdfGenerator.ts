// Simple PDF generation utility for browser
export const generatePDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    console.log('🔄 Starting PDF generation...');
    
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // For now, we'll use the browser's print functionality
    // In production, you'd use jsPDF + html2canvas
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Could not open print window');
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${filename}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.6;
            }
            .resume-header { 
              text-align: center; 
              border-bottom: 2px solid #333; 
              padding-bottom: 10px; 
              margin-bottom: 20px; 
            }
            .section-title { 
              color: #2563eb; 
              font-size: 18px; 
              font-weight: bold; 
              margin: 20px 0 10px 0; 
            }
            .skill-badge { 
              display: inline-block; 
              background: #e5e7eb; 
              padding: 4px 8px; 
              margin: 2px; 
              border-radius: 4px; 
              font-size: 12px; 
            }
            .experience-item { 
              border-left: 3px solid #2563eb; 
              padding-left: 15px; 
              margin-bottom: 15px; 
            }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Auto-print after a short delay
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);

    console.log('✅ PDF generation initiated');
    return true;

  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    throw error;
  }
};

// Alternative: Download as HTML file
export const downloadAsHTML = (elementId: string, filename: string = 'resume.html') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 20px; 
              line-height: 1.6;
            }
            .resume-header { 
              text-align: center; 
              border-bottom: 2px solid #333; 
              padding-bottom: 10px; 
              margin-bottom: 20px; 
            }
            .section-title { 
              color: #2563eb; 
              font-size: 18px; 
              font-weight: bold; 
              margin: 20px 0 10px 0; 
            }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
    
    console.log('✅ HTML file downloaded');
    return true;

  } catch (error) {
    console.error('❌ HTML download failed:', error);
    throw error;
  }
};
