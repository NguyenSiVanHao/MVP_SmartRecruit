# SmartRecruit - AI-Powered Recruitment Platform MVP

A complete frontend-only recruitment platform featuring role-based navigation for candidates, recruiters, and admins with AI-powered matching and analytics.

## Features

### Candidate Portal
- **Dashboard** - View ATS score, applications, and quick stats
- **CV Management** - Upload and manage CV with ATS scoring
- **Job Search** - Browse and filter jobs with search functionality
- **Applications Tracking** - Monitor application status across jobs
- **Job Details** - Apply to jobs with CV selection

### Recruiter Portal
- **Job Management** - Post new jobs and manage listings
- **Candidate Pipeline** - Kanban-style pipeline board (Applied → Screening → Interview → Offer → Hired)
- **Candidate Ranking** - AI-powered ranking with skill breakdown and match scores
- **Analytics** - Platform growth tracking and metrics visualization
- **Export Reports** - Generate candidate and performance reports

### Admin Portal
- **System Overview** - Key metrics and platform statistics
- **User Management** - Toggle user active/inactive status
- **Platform Configuration** - Set system parameters and rules
- **AI Monitoring** - Track matching engine performance and accuracy
- **Growth Analytics** - Monitor users, jobs, and applications over time

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: TailwindCSS v4 + shadcn/ui
- **Charts**: Recharts (RadarChart, BarChart, LineChart)
- **Data**: Mock data with TypeScript interfaces
- **No Backend**: Fully frontend with local state management

## Project Structure

\`\`\`
app/
├── page.tsx                    # Landing page with role selection
├── layout.tsx                  # Root layout with metadata
├── globals.css                 # Theme and design tokens
├── candidate/
│   ├── dashboard/              # Candidate dashboard
│   ├── cv/                      # CV management
│   └── applications/            # Application tracking
├── recruiter/
│   ├── dashboard/               # Recruiter overview
│   ├── jobs/
│   │   ├── page.tsx            # Job listings
│   │   ├── new/                # Create new job
│   │   └── [id]/
│   │       ├── pipeline/        # Hiring pipeline
│   │       └── ranking/         # Candidate ranking
│   └── layout.tsx
├── admin/
│   ├── dashboard/               # Admin overview
│   └── layout.tsx
├── jobs/
│   ├── page.tsx                 # Public job listing
│   └── [id]/                    # Job details
└── lib/
    └── mock-data.ts            # Mock data and types

components/
└── shared/
    ├── role-navbar.tsx         # Top navigation
    └── role-sidebar.tsx        # Sidebar navigation
\`\`\`

## Mock Data

All data is stored in `lib/mock-data.ts`:
- **mockCandidates** - 3 candidate profiles with CVs
- **mockJobs** - 4 sample job postings
- **mockApplications** - 3 sample applications
- **mockUsers** - 5 admin system users
- **mockRanking** - Candidate rankings with skill breakdowns
- **mockAdminMetrics** - Platform growth data

## Getting Started

1. **Install dependencies**: The project uses auto-detected npm modules
2. **Run development server**: `npm run dev` or `pnpm dev`
3. **Open in browser**: Navigate to `http://localhost:3000`

## Navigation

- **Landing Page** (`/`) - Choose your role
- **Candidate Path** - `/candidate/dashboard`
- **Recruiter Path** - `/recruiter/dashboard`
- **Admin Path** - `/admin/dashboard`

## Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Trust and professionalism
- **Accent Cyan**: `#0891b2` - Interactive elements and highlights
- **Neutral Grays**: Light backgrounds and borders
- **Success Green**: `#16a34a` - Positive actions
- **Error Red**: `#dc2626` - Warnings and errors

### Components
- Built with shadcn/ui components
- Cards, Badges, Buttons, Tables, Dialogs
- Semantic HTML with ARIA attributes
- Mobile-responsive design

## Features Demo

- **ATS Scoring** - Simulated CV parsing with ATS scores
- **Match Scoring** - AI mock matching algorithm (40-98%)
- **Radar Charts** - Skill breakdown visualization
- **Pipeline Tracking** - Kanban board for candidate stages
- **Search & Pagination** - Job search with filtering
- **User Toggle** - Admin user activation control

## Deployment

Deploy to Vercel with one click:
- No environment variables required
- All data is frontend-only
- Works instantly without setup

## Future Enhancements

- Real authentication with Supabase
- Database backend (PostgreSQL/Neon)
- Real file uploads with CV parsing
- WebSocket for real-time pipeline updates
- Email notifications
- Advanced analytics and reporting
