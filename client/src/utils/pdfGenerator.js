import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class PDFGenerator {
  static async generateFromElement(element, filename = 'resume.pdf', options = {}) {
    const defaultOptions = {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      ...options
    };

    try {
      console.log('🔄 Starting PDF generation...');
      
      // Create canvas from HTML element
      const canvas = await html2canvas(element, defaultOptions);
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      console.log('✅ PDF generated successfully');
      return pdf;
      
    } catch (error) {
      console.error('❌ PDF generation failed:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  static async downloadPDF(element, filename = 'resume.pdf') {
    try {
      const pdf = await this.generateFromElement(element, filename);
      pdf.save(filename);
      console.log(`📥 PDF downloaded: ${filename}`);
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  static async previewPDF(element) {
    try {
      const pdf = await this.generateFromElement(element);
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Open in new window
      window.open(pdfUrl, '_blank');
      console.log('👁️ PDF preview opened');
      
      return pdfUrl;
    } catch (error) {
      console.error('Preview failed:', error);
      throw error;
    }
  }

  static async generateMultipleFormats(element, baseName = 'resume') {
    try {
      const formats = [];
      
      // Generate PDF
      const pdf = await this.generateFromElement(element);
      formats.push({
        type: 'pdf',
        blob: pdf.output('blob'),
        filename: `${baseName}.pdf`
      });
      
      // Generate PNG
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      canvas.toBlob((blob) => {
        formats.push({
          type: 'png',
          blob: blob,
          filename: `${baseName}.png`
        });
      }, 'image/png');
      
      return formats;
    } catch (error) {
      console.error('Multi-format generation failed:', error);
      throw error;
    }
  }
}

// Advanced PDF options for different templates
export const PDFTemplateConfigs = {
  modern: {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
    allowTaint: true
  },
  executive: {
    scale: 2.5,
    backgroundColor: '#ffffff',
    useCORS: true,
    allowTaint: true,
    width: 850,
    height: 1100
  },
  creative: {
    scale: 3,
    backgroundColor: '#ffffff',
    useCORS: true,
    allowTaint: true,
    foreignObjectRendering: true
  },
  tech: {
    scale: 2,
    backgroundColor: '#0d1117',
    useCORS: true,
    allowTaint: true,
    foreignObjectRendering: true
  }
};