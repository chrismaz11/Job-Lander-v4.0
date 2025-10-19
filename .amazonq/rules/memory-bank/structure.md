# Job-Lander v4.0 - Project Structure

## Directory Organization

### Frontend Application (`src/`)
- **components/**: React components including templates, file uploaders, PDF exporters
- **utils/**: Utility functions for accessibility, analytics, caching, validation
- Core client-side functionality for the resume builder interface

### Backend Services (`lambda-full/`)
- **services/**: Core business logic (AI services, job search, PDF generation, blockchain)
- **middleware/**: Request processing and tier enforcement
- **config/**: LLM and service configurations
- **shared/**: Common utilities, pricing, and subscription logic
- **types/**: TypeScript type definitions
- Main Lambda handler and routing logic

### Infrastructure & Deployment
- **infrastructure/**: AWS CDK infrastructure as code
- **amplify/**: AWS Amplify configuration for auth, data, storage, functions
- **aws-deployment/**: Direct AWS deployment scripts and configurations
- **deployment/**: Migration scripts and rollback procedures

### Templates & Assets
- **templates/**: 47+ HTML templates (27 resume + 20 cover letter templates)
  - Industry-specific templates (tech, finance, medical, legal, education, art)
  - General-purpose templates for various use cases
- **public/**: Static assets and headers configuration

### Testing & Quality
- **tests/**: Comprehensive test suite
  - **unit/**: Component and function unit tests
  - **integration/**: API and service integration tests
  - **e2e/**: End-to-end Playwright tests
  - **performance/**: Load testing and web vitals
  - **security/**: Security audit tests
  - **smoke/**: Basic functionality tests

### Development & Tooling
- **scripts/**: Database setup, deployment, and migration scripts
- **monitoring/**: CloudWatch dashboards and alerting configuration
- **migrations/**: Database schema migrations
- **shared/**: Cross-project utilities and schemas

### Blockchain Integration
- **contracts/**: Ethereum smart contracts for verification
- **blockchain/**: Blockchain service configuration and deployment

## Core Components & Relationships

### Frontend Architecture
```
src/components/
├── ResumeBuilder.jsx          # Main resume editing interface
├── EnhancedTemplateSelector.jsx # Template selection and preview
├── FileUploader.jsx           # Document upload and parsing
├── PDFExporter.jsx           # PDF generation and export
└── TemplateCustomizer.jsx    # Template styling and customization
```

### Backend Services Architecture
```
lambda-full/services/
├── llmAdapter.ts             # AI service integration (AWS Bedrock)
├── portfolioGenerator.ts     # Portfolio creation service
├── jobs.ts                   # Job search API integration
├── blockchain.ts             # Ethereum verification service
├── htmlGenerator.ts          # Template rendering service
└── vercelExport.ts          # Export and deployment service
```

### Data Flow
1. **User Input**: Resume data entry through React components
2. **AI Enhancement**: Content optimization via AWS Bedrock through llmAdapter
3. **Template Application**: HTML generation using template system
4. **PDF Generation**: Document creation with blockchain verification
5. **Job Matching**: Opportunity discovery through job search APIs

## Architectural Patterns

### Serverless Architecture
- AWS Lambda functions for backend processing
- API Gateway for HTTP routing
- RDS PostgreSQL for data persistence
- S3 + CloudFront for static asset delivery

### Frontend Patterns
- React with TypeScript for type safety
- Radix UI components for accessibility
- Tailwind CSS for styling
- React Hook Form for form management
- Wouter for client-side routing

### Backend Patterns
- Service-oriented architecture with clear separation of concerns
- Middleware pattern for request processing
- Adapter pattern for external service integration
- Repository pattern for data access

### Security Architecture
- AWS Cognito for authentication and authorization
- Tier-based access control with middleware enforcement
- Blockchain verification for document authenticity
- Secure API endpoints with proper validation