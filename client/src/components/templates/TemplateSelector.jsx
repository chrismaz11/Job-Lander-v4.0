import React, { useState } from 'react';
import { templateData, templateCategories, getTemplatesByCategory } from '../../lib/templateData';
import { generateTemplatePreview } from '../../lib/templatePreviews';
import { TemplateCustomizer } from '../TemplateCustomizer';
import { TierGate } from '../TierGate';
import ModernResumeTemplate from './ModernResumeTemplate';
import MinimalistResumeTemplate from './MinimalistResumeTemplate';
import ExecutiveResumeTemplate from './ExecutiveResumeTemplate';
import CreativeResumeTemplate from './CreativeResumeTemplate';
import TechResumeTemplate from './TechResumeTemplate';
import SalesResumeTemplate from './SalesResumeTemplate';
import AcademicResumeTemplate from './AcademicResumeTemplate';
import CoverLetterTemplate from './CoverLetterTemplate';
import PDFExporter from '../PDFExporter';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import './TemplateSelector.css';

const TemplateSelector = ({ parsedData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern-professional');
  const [selectedCategory, setSelectedCategory] = useState('Modern');
  const [documentType, setDocumentType] = useState('resume');
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [customization, setCustomization] = useState(null);

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

  const handleCustomizationChange = (newCustomization) => {
    setCustomization(newCustomization);
  };

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
                  className={`template-card ${selectedTemplate === template.id ? 'selected' : ''} ${template.tier === 'premium' ? 'premium' : ''}`}
                  onClick={() => {
                    if (template.tier === 'premium') {
                      // Check if user has access to premium templates
                      return;
                    }
                    setSelectedTemplate(template.id);
                  }}
                >
                  {template.tier === 'premium' ? (
                    <TierGate
                      feature="premium-templates"
                      requiredTier="pro"
                      fallback={
                        <div className="template-preview locked">
                          <img 
                            src={generateTemplatePreview(template.id, template.category)} 
                            alt={template.name}
                            className="opacity-50"
                          />
                          <div className="premium-overlay">
                            <div className="premium-badge">✨ Premium</div>
                            <div className="upgrade-text">Upgrade Required</div>
                          </div>
                        </div>
                      }
                    >
                      <div className="template-preview">
                        <img 
                          src={generateTemplatePreview(template.id, template.category)} 
                          alt={template.name}
                        />
                        <div className="premium-badge">✨ Premium</div>
                      </div>
                    </TierGate>
                  ) : (
                    <div className="template-preview">
                      <img 
                        src={generateTemplatePreview(template.id, template.category)} 
                        alt={template.name}
                      />
                    </div>
                  )}
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
          <div className="preview-controls">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomizer(!showCustomizer)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Customize
            </Button>
            <PDFExporter 
              data={parsedData} 
              templateType={documentType === 'resume' ? selectedTemplate : 'professional'}
              documentType={documentType}
              customization={customization}
            />
          </div>
        </div>
        
        <div className="preview-content">
          {showCustomizer && (
            <div className="customizer-panel">
              <TemplateCustomizer onCustomizationChange={handleCustomizationChange} />
            </div>
          )}
          
          <div className="template-preview-container">
            {documentType === 'resume' ? (
              <TemplateComponent 
                data={parsedData} 
                customization={customization}
              />
            ) : (
              <CoverLetterTemplate 
                data={parsedData}
                customization={customization}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
