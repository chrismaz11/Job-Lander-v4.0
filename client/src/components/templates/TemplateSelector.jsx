import React, { useState } from 'react';
import { templateData, templateCategories, getTemplatesByCategory } from '../../lib/templateData';
import { getTemplateImage } from '../../lib/templateImages';
import ModernResumeTemplate from './ModernResumeTemplate';
import MinimalistResumeTemplate from './MinimalistResumeTemplate';
import ExecutiveResumeTemplate from './ExecutiveResumeTemplate';
import CreativeResumeTemplate from './CreativeResumeTemplate';
import TechResumeTemplate from './TechResumeTemplate';
import SalesResumeTemplate from './SalesResumeTemplate';
import AcademicResumeTemplate from './AcademicResumeTemplate';
import CoverLetterTemplate from './CoverLetterTemplate';
import PDFExporter from '../PDFExporter';
import './TemplateSelector.css';

const TemplateSelector = ({ parsedData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern-professional');
  const [selectedCategory, setSelectedCategory] = useState('Modern');
  const [documentType, setDocumentType] = useState('resume');

  const componentMap = {
    ModernResumeTemplate,
    MinimalistResumeTemplate,
    ExecutiveResumeTemplate,
    CreativeResumeTemplate,
    TechResumeTemplate,
    SalesResumeTemplate,
    AcademicResumeTemplate
  };

  const getTemplateComponent = (componentName) => {
    return componentMap[componentName] || ModernResumeTemplate;
  };

  const currentTemplate = templateData.find(t => t.id === selectedTemplate);
  const TemplateComponent = currentTemplate ? getTemplateComponent(currentTemplate.component) : ModernResumeTemplate;

  return (
    <div className="template-selector">
      <div className="template-controls">
        <div className="document-type-selector">
          <button 
            className={documentType === 'resume' ? 'active' : ''}
            onClick={() => setDocumentType('resume')}
          >
            📄 Resume Templates
          </button>
          <button 
            className={documentType === 'coverLetter' ? 'active' : ''}
            onClick={() => setDocumentType('coverLetter')}
          >
            📝 Cover Letter Templates
          </button>
        </div>

        {documentType === 'resume' && (
          <>
            <div className="category-selector">
              {templateCategories.map(category => (
                <button
                  key={category}
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="template-grid">
              {getTemplatesByCategory(selectedCategory).map(template => (
                <div
                  key={template.id}
                  className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="template-preview">
                    <img 
                      src={getTemplateImage(template.imageId)} 
                      alt={template.name}
                      onError={(e) => {
                        e.target.src = getTemplateImage('modern_resume_template_e5991aaf');
                      }}
                    />
                    {template.tier === 'premium' && (
                      <div className="premium-badge">✨ Premium</div>
                    )}
                  </div>
                  <div className="template-info">
                    <h3>{template.name}</h3>
                    <p>{template.description}</p>
                    <div className="template-features">
                      {template.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {documentType === 'coverLetter' && (
          <div className="template-grid">
            <div className="template-card selected">
              <div className="template-preview">
                <img src={getTemplateImage('professional_busines_36348409')} alt="Professional Cover Letter" />
              </div>
              <div className="template-info">
                <h3>Professional Cover Letter</h3>
                <p>Clean, professional cover letter template</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="template-preview-section">
        <div className="preview-header">
          <h2>Preview: {currentTemplate?.name || 'Template'}</h2>
          <PDFExporter 
            data={parsedData} 
            templateType={documentType === 'resume' ? selectedTemplate : 'professional'}
            documentType={documentType}
          />
        </div>
        
        <div className="template-preview-container">
          {documentType === 'resume' ? (
            <TemplateComponent data={parsedData} />
          ) : (
            <CoverLetterTemplate data={parsedData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
