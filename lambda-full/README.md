# Lambda Function Structure

## Directory Organization

### Core Files
- `lambda-handler.js` - Main Lambda handler with API endpoints
- `index.js` - Entry point for Lambda
- `package.json` - Dependencies and configuration
- `deploy.sh` - Deployment script

### Directories

#### `/handlers/`
- `lambda-handler.js` - Main handler (copy)
- `handler.js` - Alternative handler
- `handler-minimal.js` - Minimal handler
- `index.ts` - TypeScript main entry
- `routes.ts` - TypeScript routes

#### `/services/`
- Core business logic services
- AI/LLM adapters and utilities
- Job search, portfolio generation, etc.

#### `/utils/`
- `auth.ts` - Authentication utilities
- `db.ts` - Database connection
- `storage.ts` - Storage utilities
- `vite.ts` - Development server utilities

#### `/config/`
- Configuration files for services

#### `/middleware/`
- Request processing middleware

#### `/shared/`
- Shared utilities and schemas

#### `/types/`
- TypeScript type definitions

#### `/legacy/`
- Old handler files and deployment archives
- Backup files

#### `/data/`
- Sample data and fixtures

#### `/blockchain/`
- Blockchain-related services

## Deployment

```bash
# Deploy current handler
./deploy.sh

# Or manually
zip -r deployment.zip . -x "*.ts" "handlers/*" "legacy/*" "*.map"
aws lambda update-function-code --function-name joblander-api --zip-file fileb://deployment.zip
```