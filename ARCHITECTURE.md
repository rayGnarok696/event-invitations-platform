# Project Structure

```
event-invitations-platform/
├── app/
│   ├── api/
│   │   ├── events/
│   │   │   ├── route.ts              # GET all events, POST new event
│   │   │   └── [id]/
│   │   │       └── route.ts          # GET, PUT, DELETE event by ID
│   │   ├── sections/
│   │   │   ├── route.ts              # POST new section
│   │   │   └── [id]/
│   │   │       └── route.ts          # PUT, DELETE section by ID
│   │   └── templates/
│   │       ├── route.ts              # GET all templates
│   │       └── categories/
│   │           └── route.ts          # GET template categories
│   ├── events/
│   │   ├── new/
│   │   │   ├── page.tsx              # Create event form
│   │   │   └── layout.tsx            # Layout for new event
│   │   └── [id]/
│   │       └── edit/
│   │           ├── page.tsx          # Edit event page
│   │           └── layout.tsx        # Layout for edit
│   ├── preview/
│   │   └── [id]/
│   │       └── page.tsx              # Public preview page
│   ├── page.tsx                 # Dashboard (main page)
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── favicon.ico              # Site icon
├── components/
│   ├── EventEditor.tsx          # Main event editor component
│   ├── SectionEditor.tsx        # Section management component
│   ├── TemplateSelector.tsx     # Template selection component
│   ├── InvitationPreview.tsx   # Live preview component
│   ├── ExportMenu.tsx           # Export options menu
│   ├── InvitationStats.tsx     # Event statistics display
│   └── EventCard.tsx            # Event card for dashboard
├── lib/
│   ├── db.ts                    # Prisma client instance
│   └── templates.ts             # Predefined template definitions
├── prisma/
│   └── schema.prisma            # Database schema
├── public/                   # Static assets
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── .eslintrc.json            # ESLint configuration
├── .env.local.example        # Environment variables template
├── .gitignore                # Git ignore rules
├── README.md                 # Main documentation
├── QUICKSTART.md             # Quick setup guide
├── TROUBLESHOOTING.md        # Troubleshooting guide
├── API_DOCUMENTATION.md      # API reference
├── ROADMAP.md                # Feature roadmap
├── ARCHITECTURE.md           # This file
├── setup.sh                  # Linux/Mac setup script
└── setup.bat                 # Windows setup script
```

## Database Schema

### Event Table
- `id` (String, Primary Key): Unique identifier (CUID format)
- `title` (String): Event name
- `description` (String, Optional): Event details
- `date` (DateTime, Optional): Event date and time
- `location` (String, Optional): Event venue
- `theme` (String): Visual theme selection
- `createdAt` (DateTime): Creation timestamp
- `updatedAt` (DateTime): Last update timestamp
- Relations: One-to-Many with Section

### Section Table
- `id` (String, Primary Key): Unique identifier
- `eventId` (String, Foreign Key): Reference to Event
- `templateId` (String): Selected template ID
- `title` (String): Section title
- `content` (String, Optional): Customized content
- `order` (Int): Display order in invitation
- `customData` (String, Optional): Extra data as JSON
- `createdAt` (DateTime): Creation timestamp
- `updatedAt` (DateTime): Last update timestamp
- Relations: Many-to-One with Event

### Template Table
- `id` (String, Primary Key): Template identifier
- `name` (String): Display name
- `description` (String, Optional): Template description
- `category` (String): Template category (header, details, footer, content)
- `icon` (String, Optional): Emoji icon
- `htmlTemplate` (String): HTML template with placeholders
- `cssPreset` (String, Optional): Predefined CSS styles
- `createdAt` (DateTime): Creation timestamp

## API Routes

### Events API
- `GET /api/events` - List all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Sections API
- `POST /api/sections` - Create new section
- `PUT /api/sections/:id` - Update section
- `DELETE /api/sections/:id` - Delete section

### Templates API
- `GET /api/templates` - Get all templates
- `GET /api/templates?category=X` - Get templates by category
- `GET /api/templates/categories` - Get available categories

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **State Management**: React Hooks
- **Forms**: React Hook Form + Zod validation

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **Database**: SQLite
- **ORM**: Prisma
- **Validation**: Zod

### Development Tools
- **Language**: TypeScript
- **Linting**: ESLint
- **Package Manager**: npm

## Component Architecture

### Dashboard (page.tsx)
- Displays all events in a grid
- Filter by date (all/recent)
- Quick access to create new event

### Event Creation (events/new/page.tsx)
- Form for basic event information
- Theme selection
- Form validation with Zod

### Event Editor (components/EventEditor.tsx)
- Main editor interface
- Edit event details
- Add/remove/reorder sections
- Save status indicator
- Export menu access
- Event deletion

### Section Editor (components/SectionEditor.tsx)
- Add sections from templates
- Filter templates by category
- Edit section titles
- Reorder sections (up/down buttons)
- Delete sections

### Template Selector (components/TemplateSelector.tsx)
- Display available templates
- Filter by category
- Visual template representation

### Invitation Preview (components/InvitationPreview.tsx)
- Real-time HTML rendering
- CSS styling from templates
- Responsive display
- Print-friendly styles

### Export Menu (components/ExportMenu.tsx)
- Copy shareable link
- Download HTML
- Print/Save as PDF

## Data Flow

1. **Event Creation**
   ```
   Form -> POST /api/events -> Database -> Redirect to Edit
   ```

2. **Editing Event**
   ```
   GET /api/events/:id -> Load in Editor -> User edits -> PUT /api/events/:id
   ```

3. **Adding Section**
   ```
   Select Template -> POST /api/sections -> State Update -> Preview Updates
   ```

4. **Saving Changes**
   ```
   User types -> Unsaved state -> Blur/Focus -> PUT request -> Saved state
   ```

## Styling Strategy

### Tailwind CSS
- Utility-first approach
- Global styles in `app/globals.css`
- Component-specific utilities in JSX

### Template Styling
- CSS presets in `lib/templates.ts`
- Injected into preview dynamically
- Print-friendly media queries

## Performance Considerations

1. **Database**
   - Indexes on frequently queried fields
   - Cascade delete for sections

2. **Frontend**
   - Lazy loading components
   - Memoization of Preview component
   - Debounced save operations

3. **API**
   - Validation on backend
   - Proper error handling
   - RESTful design

## Security

1. **Input Validation**
   - Zod schemas on all routes
   - Type safety with TypeScript

2. **Database**
   - Parameterized queries (Prisma)
   - No direct SQL execution

3. **API**
   - No sensitive data in logs
   - Proper error messages

## Testing Considerations

Potential areas for testing:
- API endpoint validation
- Component rendering
- Form submission flows
- Database operations
- Template rendering

## Future Enhancements

- User authentication
- PDF export
- Email sending
- Collaboration features
- Analytics
- Template marketplace
