# Job-Lander v4.0 - Technology Stack

## Programming Languages & Versions
- **TypeScript**: Primary language for type-safe development
- **JavaScript**: Legacy components and Node.js runtime
- **HTML**: Template system with 47+ professional templates
- **CSS**: Styling with Tailwind CSS framework
- **SQL**: PostgreSQL database queries and migrations
- **Solidity**: Ethereum smart contracts for blockchain verification

## Runtime Requirements
- **Node.js**: >=18.0.0 (specified in package.json engines)
- **npm**: >=9.0.0 (package manager)
- **Target**: ES2022 with modern browser support

## Frontend Technology Stack

### Core Framework
- **React**: ^18.2.0 - Component-based UI library
- **TypeScript**: ^5.2.2 - Type safety and developer experience
- **Vite**: ^4.5.0 - Fast build tool and development server

### UI Components & Styling
- **Radix UI**: Comprehensive accessible component library
  - Accordion, Alert Dialog, Avatar, Button, Card, Dialog
  - Dropdown Menu, Form, Input, Label, Progress, Select
  - Separator, Slider, Switch, Tabs, Textarea, Toast, Tooltip
- **Tailwind CSS**: ^3.3.5 - Utility-first CSS framework
- **Framer Motion**: ^10.16.4 - Animation library
- **Lucide React**: ^0.292.0 - Icon library

### State Management & Forms
- **React Hook Form**: ^7.47.0 - Form handling and validation
- **TanStack React Query**: ^5.8.4 - Server state management
- **Zod**: ^3.22.4 - Schema validation
- **Hookform Resolvers**: ^3.3.2 - Form validation integration

### Routing & Navigation
- **Wouter**: ^2.12.1 - Lightweight client-side routing

### Utilities
- **Class Variance Authority**: ^0.7.0 - Component variant management
- **clsx**: ^2.0.0 - Conditional className utility
- **Tailwind Merge**: ^2.0.0 - Tailwind class merging

## Backend Technology Stack

### AWS Services
- **AWS Lambda**: Serverless compute for API endpoints
- **API Gateway**: HTTP API routing and management
- **RDS PostgreSQL**: Primary database with Multi-AZ deployment
- **S3**: Static asset storage and document storage
- **CloudFront**: CDN for global content delivery
- **AWS Cognito**: Authentication and user management
- **AWS Bedrock**: AI/ML services for content enhancement

### Database & ORM
- **PostgreSQL**: Primary relational database
- **Drizzle ORM**: Type-safe database queries and migrations

### External Integrations
- **Stripe**: Payment processing for subscription tiers
- **Job Search APIs**: Real-time job opportunity integration
- **Ethereum**: Blockchain verification smart contracts

## Development Tools & Testing

### Code Quality
- **ESLint**: ^8.53.0 - Code linting and style enforcement
- **TypeScript ESLint**: ^6.10.0 - TypeScript-specific linting
- **Prettier**: Code formatting (via ESLint integration)

### Testing Framework
- **Vitest**: ^0.34.6 - Unit testing framework
- **Playwright**: ^1.40.0 - End-to-end testing
- **Testing Library**: Component testing utilities

### Build & Bundling
- **Vite**: Development server and production bundler
- **Rollup**: Bundling with visualization plugin
- **PostCSS**: ^8.4.31 - CSS processing
- **Autoprefixer**: ^10.4.16 - CSS vendor prefixing

### Progressive Web App
- **Vite Plugin PWA**: ^0.17.0 - Service worker and PWA features

## Infrastructure as Code
- **AWS CDK**: TypeScript-based infrastructure definitions
- **AWS Amplify**: Full-stack deployment and hosting

## Development Commands

### Local Development
```bash
npm run dev          # Start Vite development server
npm run build        # Production build
npm run preview      # Preview production build
npm run type-check   # TypeScript type checking
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
```

### Testing
```bash
npm run test         # Run unit tests with Vitest
npm run test:e2e     # Run Playwright end-to-end tests
```

### Deployment
```bash
npm run deploy:frontend  # Deploy frontend to S3
npm run deploy:lambda    # Deploy Lambda functions
npm run deploy:full      # Full deployment pipeline
npm run invalidate-cache # CloudFront cache invalidation
```

### Setup
```bash
npm run setup        # Install all dependencies (root + lambda)
```

## Configuration Files
- **tsconfig.json**: TypeScript compiler configuration with strict settings
- **vite.config.ts**: Vite build configuration with React plugin
- **tailwind.config.ts**: Tailwind CSS customization
- **playwright.config.ts**: E2E testing configuration
- **vitest.config.ts**: Unit testing configuration
- **drizzle.config.ts**: Database ORM configuration