# Job-Lander - AI Resume Builder

## Project Overview
Job-Lander is a full-stack web application that helps users create professional AI-generated resumes, cover letters, and find jobs using:
- **Gemini AI** for content generation and resume parsing
- **Canva Connect API** for professional templates
- **Blockchain (Polygon Mumbai)** for resume verification
- **JSearch API** for job search

## Tech Stack
- **Frontend**: React, Vite, TypeScript, TailwindCSS, Wouter, React Query, Shadcn UI
- **Backend**: Node.js, Express, Gemini AI, ethers.js, Multer
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect)
- **Storage**: DatabaseStorage (PostgreSQL)
- **Blockchain**: Polygon Mumbai Testnet

## Architecture

### Frontend Pages
1. **Home (/)** - Landing page with hero, features, how-it-works, CTA
2. **Create Resume (/create)** - Multi-step form with AI parsing and live preview
3. **Templates (/templates)** - Gallery of Canva templates with filters
4. **Dashboard (/dashboard)** - User's resume history with delete/download (protected)
5. **Verify (/verify)** - Blockchain verification interface
6. **Jobs (/jobs)** - Job search with AI matching

### Backend API Endpoints
**Authentication (Replit Auth)**
- `GET /api/login` - Start authentication flow
- `GET /api/logout` - End session
- `GET /api/callback` - OAuth callback
- `GET /api/auth/user` - Get current user (protected)

**Resumes**
- `POST /api/parse-resume` - Parse PDF/DOCX with AI
- `POST /api/generate-resume` - Generate enhanced resume (protected)
- `GET /api/resumes` - Get user's resumes (protected)
- `GET /api/resumes/:id` - Get single resume
- `PATCH /api/resumes/:id` - Update resume (protected)
- `DELETE /api/resumes/:id` - Delete resume (protected)

**Cover Letters & Jobs**
- `POST /api/generate-coverletter` - Create AI cover letter
- `GET /api/find-jobs` - Search jobs with JSearch API

**Blockchain & Templates**
- `POST /api/verify-on-chain` - Blockchain verification
- `POST /api/verify-resume` - Check verification status
- `GET /api/canva/templates` - Get templates
- `POST /api/canva/create-template` - Create design
- `POST /api/canva/export-pdf` - Export PDF

### Data Models (shared/schema.ts)
- **User**: ID, email, name, profile image (Replit Auth)
- **Resume**: User ID, personal info, experience, education, skills, template, blockchain hash
- **CoverLetter**: Resume link, company, position, AI-generated content
- **Job**: Title, company, location, description, salary, AI match score
- **Session**: Authentication session storage

## Key Features

### AI-Powered Resume Creation
1. User uploads existing resume (PDF/DOCX)
2. **Hybrid Parsing Pipeline**:
   - Library extraction (pdf-parse for text-based PDFs)
   - OCR detection for scanned images (Tesseract.js)
   - AI post-processing with Gemini Pro for text cleanup and error correction
3. Gemini AI parses and extracts structured data
4. User reviews/edits information in multi-step form
5. AI enhances content with professional writing
6. Select Canva template for design
7. Download professional PDF resume

### Blockchain Verification
1. Generate SHA-256 hash of resume
2. Store hash on Polygon Mumbai testnet
3. Return transaction hash for verification
4. Anyone can verify resume authenticity by checking hash

### Job Search
1. Search jobs using JSearch API
2. AI calculates match score based on resume
3. Display jobs with match percentages
4. Direct application links

## Environment Variables
- `GEMINI_API_KEY` - AI content generation
- `CANVA_CLIENT_ID`, `CANVA_CLIENT_SECRET` - Template management
- `WEB3_RPC_URL` - Blockchain connection
- `JSEARCH_API_KEY` - Job search
- `SESSION_SECRET` - Session management

## User Preferences
- **Design**: Canva-inspired clean UI with dark mode default
- **Color Scheme**: Purple-blue primary (#8B85FF), professional and modern
- **Font**: Inter for all text
- **Spacing**: Generous padding and spacing for readability
- **Interactions**: Smooth transitions and hover effects

## Recent Changes
- 2025-10-12: Enhanced PDF Parsing with OCR + AI
  - Implemented hybrid parsing: library extraction + OCR + AI correction
  - Added Tesseract.js for OCR on scanned documents
  - Multi-page OCR support: processes all pages, not just the first
  - Integrated Gemini Pro for AI post-processing and text cleanup
  - Smart detection: uses OCR only when text extraction yields <200 chars
  - Proper temp file cleanup with finally blocks for resource safety
  - Enhanced resume parsing accuracy for both text-based and scanned PDFs
- 2025-10-12: Database & Authentication Implementation
  - Migrated from MemStorage to PostgreSQL with Drizzle ORM
  - Integrated Replit Auth for user management
  - Added user authentication with protected routes
  - Created Dashboard page for resume history management
  - Implemented user-specific resume storage with CRUD operations
  - Added login/logout UI in header with user dropdown
- 2025-01: Initial MVP Implementation
  - Complete frontend with 5 pages
  - Full backend API with AI, blockchain, and job search
  - Dark mode with theme toggle
  - Responsive design across all pages

## Development Notes
- Using PostgreSQL database for persistent storage
- Replit Auth handles all authentication flows (Google, GitHub, email)
- Protected routes require authentication via middleware
- User sessions stored in database for persistence
- Blockchain verification simulated for MVP (no actual contract deployment needed)
- Canva integration uses mock data (requires OAuth setup for full integration)
- All AI features powered by Gemini 2.5 Flash/Pro models

## Running the App
```bash
npm run dev  # Starts both frontend and backend on port 5000
```

## Next Steps (In Progress)
- ✅ Add persistent PostgreSQL database
- ✅ Implement user authentication
- ✅ Add resume history dashboard
- 🔄 Advanced AI features (job tailoring, skill gap analysis, interview prep)
- 🔄 Collaborative sharing features for teams
- 🔄 Batch processing for multiple job applications
- 🔄 Analytics dashboard with charts
- ⏳ Deploy smart contract to Polygon Mumbai
- ⏳ Complete Canva OAuth integration
