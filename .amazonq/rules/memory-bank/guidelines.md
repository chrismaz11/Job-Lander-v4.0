# Job-Lander v4.0 - Development Guidelines

## Code Quality Standards

### TypeScript Configuration
- **Strict Mode**: All TypeScript files use strict type checking with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`
- **Path Mapping**: Consistent use of path aliases (`@/*`, `@/components/*`, `@/utils/*`, `@shared/*`)
- **Type Safety**: Explicit typing for all function parameters, return values, and complex objects
- **Interface Definitions**: Comprehensive interfaces for all data structures (e.g., `LLMResponse<T>`, `PortfolioOptions`, `JobSearchFilters`)

### Import Organization
```typescript
// External libraries first
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";

// Internal modules by hierarchy
import { llmConfig } from "../config/llm.config";
import { llmCache } from "./llmCache";
import { storage } from "./storage";

// Type-only imports when appropriate
import type { Express } from "express";
import type { Resume } from "../../shared/schema.js";
```

### Error Handling Patterns
- **Standardized Response Format**: All service functions return consistent response objects with `success`, `data`, `error` fields
- **Try-Catch Blocks**: Comprehensive error handling with specific error messages and proper HTTP status codes
- **Graceful Degradation**: Services continue operating with reduced functionality when dependencies fail

## Architectural Patterns

### Service Layer Architecture
- **Adapter Pattern**: LLM services use abstract base class with provider-specific implementations
- **Factory Pattern**: `LLMFactory` creates and manages adapter instances with caching
- **Middleware Pattern**: Request processing through composable middleware functions (authentication, tier enforcement)

### API Design Patterns
```typescript
// Consistent route structure
app.post("/api/generate-resume", isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    // Business logic
    res.json(result);
  } catch (error: any) {
    console.error("Generate resume error:", error);
    res.status(500).json({ error: error.message });
  }
});
```

### Data Access Patterns
- **Repository Pattern**: Storage abstraction through `storage` service
- **Schema Validation**: Zod schemas for runtime type validation
- **Database Migrations**: Structured SQL migrations with rollback support

## Frontend Development Standards

### Component Architecture
- **Radix UI Foundation**: All UI components built on Radix primitives for accessibility
- **Variant-Based Styling**: Class Variance Authority for component variants
- **Composition Pattern**: Components accept `asChild` prop for flexible composition

### Testing Standards
```typescript
// Comprehensive test coverage
describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    // Test all variants systematically
  });

  it('handles accessibility attributes', () => {
    // Ensure WCAG compliance
  });
});
```

### State Management
- **React Hook Form**: Form state management with Zod validation
- **TanStack Query**: Server state caching and synchronization
- **Local State**: React hooks for component-specific state

## Backend Development Standards

### Service Implementation
```typescript
// Abstract base class pattern
export abstract class LLMAdapter {
  protected model: string;
  protected provider: string;
  
  abstract generateText(prompt: string, config?: LLMRequestConfig): Promise<LLMResponse<string>>;
  
  protected async wrapWithMiddleware<T>(
    operation: () => Promise<T>,
    cacheKey?: string,
    cacheTTL?: number
  ): Promise<LLMResponse<T>> {
    // Consistent middleware wrapping
  }
}
```

### Configuration Management
- **Environment Variables**: All secrets and configuration through environment variables
- **Type-Safe Config**: Configuration objects with TypeScript interfaces
- **Validation**: Runtime validation of configuration values

### Caching Strategy
- **LLM Response Caching**: Intelligent caching with TTL and pattern-based invalidation
- **Metrics Collection**: Comprehensive performance and usage metrics
- **Cache Key Generation**: Deterministic key generation based on input parameters

## Security Standards

### Authentication & Authorization
- **AWS Cognito Integration**: Centralized authentication with JWT tokens
- **Tier-Based Access Control**: Middleware enforcement of subscription limits
- **Route Protection**: Consistent authentication checks on protected endpoints

### Data Validation
```typescript
// Input validation on all endpoints
if (!resumeId || !companyName || !position) {
  return res.status(400).json({ error: "Missing required fields" });
}

// File upload restrictions
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
```

### Security Headers
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Content Security Policy**: Security headers in Vercel configuration
- **Input Sanitization**: Validation and sanitization of all user inputs

## Performance Standards

### Optimization Patterns
- **Lazy Loading**: Dynamic imports for large dependencies
- **Connection Pooling**: Efficient database connection management
- **Response Compression**: Gzip compression for API responses

### Monitoring & Metrics
```typescript
// Performance tracking
const startTime = Date.now();
// ... operation
const latency = Date.now() - startTime;
llmMetrics.recordRequest(provider, model, operation, latency, success, cached);
```

### Caching Strategy
- **Multi-Level Caching**: Application-level and CDN caching
- **Cache Invalidation**: Pattern-based cache clearing
- **Performance Monitoring**: Real-time metrics collection

## Code Style Guidelines

### Naming Conventions
- **Functions**: camelCase with descriptive verbs (`generateResumeContent`, `parseResumeWithAI`)
- **Constants**: UPPER_SNAKE_CASE for configuration values
- **Interfaces**: PascalCase with descriptive names (`PortfolioOptions`, `LLMResponse`)
- **Files**: kebab-case for components, camelCase for services

### Documentation Standards
```typescript
/**
 * Generate portfolio HTML with customizable themes and layouts
 * @param resume - Resume data structure
 * @param options - Portfolio customization options
 * @returns Complete HTML string ready for deployment
 */
export function generatePortfolioHTML(
  resume: Resume,
  options: PortfolioOptions = { theme: "professionalBlue", font: "Inter", layout: "centered" }
): string {
  // Implementation
}
```

### Comment Guidelines
- **JSDoc Comments**: Comprehensive documentation for public APIs
- **Inline Comments**: Explain complex business logic and algorithms
- **TODO Comments**: Track technical debt with specific action items

## Testing Standards

### Unit Testing
- **Vitest Framework**: Fast unit testing with TypeScript support
- **Testing Library**: Component testing with accessibility focus
- **Mock Strategies**: Comprehensive mocking for external dependencies

### Integration Testing
- **API Testing**: End-to-end API workflow testing
- **Database Testing**: Transaction-based test isolation
- **Service Integration**: Cross-service communication testing

### E2E Testing
- **Playwright**: Browser automation for user workflow testing
- **Accessibility Testing**: WCAG compliance verification
- **Performance Testing**: Core Web Vitals monitoring

## Deployment Standards

### Infrastructure as Code
- **AWS CDK**: TypeScript-based infrastructure definitions
- **Environment Separation**: Clear dev/staging/production boundaries
- **Automated Deployments**: CI/CD pipeline with proper testing gates

### Monitoring & Alerting
- **CloudWatch Integration**: Comprehensive logging and metrics
- **Error Tracking**: Structured error reporting and alerting
- **Performance Monitoring**: Real-time application performance insights