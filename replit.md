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
- **Storage**: In-memory (MemStorage)
- **Blockchain**: Polygon Mumbai Testnet

## Architecture

### Frontend Pages
1. **Home (/)** - Landing page with hero, features, how-it-works, CTA
2. **Create Resume (/create)** - Multi-step form with AI parsing and live preview
3. **Templates (/templates)** - Gallery of Canva templates with filters
4. **Verify (/verify)** - Blockchain verification interface
5. **Jobs (/jobs)** - Job search with AI matching

### Backend API Endpoints
- `POST /api/parse-resume` - Parse PDF/DOCX with AI
- `POST /api/generate-resume` - Generate enhanced resume
- `POST /api/generate-coverletter` - Create AI cover letter
- `POST /api/verify-on-chain` - Blockchain verification
- `POST /api/verify-resume` - Check verification status
- `GET /api/find-jobs` - Search jobs
- `GET /api/canva/templates` - Get templates
- `POST /api/canva/create-template` - Create design
- `POST /api/canva/export-pdf` - Export PDF

### Data Models (shared/schema.ts)
- **Resume**: Personal info, experience, education, skills, template, blockchain hash
- **CoverLetter**: Resume link, company, position, AI-generated content
- **Job**: Title, company, location, description, salary, AI match score

## Key Features

### AI-Powered Resume Creation
1. User uploads existing resume (PDF/DOCX)
2. Gemini AI parses and extracts structured data
3. User reviews/edits information in multi-step form
4. AI enhances content with professional writing
5. Select Canva template for design
6. Download professional PDF resume

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
- 2025-01: Initial MVP implementation
- Complete frontend with 5 pages
- Full backend API with AI, blockchain, and job search
- In-memory storage for rapid development
- Dark mode with theme toggle
- Responsive design across all pages

## Development Notes
- Using in-memory storage (MemStorage) - data resets on server restart
- Blockchain verification simulated for MVP (no actual contract deployment needed)
- Canva integration uses mock data (requires OAuth setup for full integration)
- All AI features powered by Gemini 2.5 Flash/Pro models

## Running the App
```bash
npm run dev  # Starts both frontend and backend on port 5000
```

## Next Steps
- Add persistent PostgreSQL database
- Implement user authentication
- Deploy smart contract to Polygon Mumbai
- Complete Canva OAuth integration
- Add resume history dashboard
