# Nexus CRM - Modern Customer Relationship Management

A stunning, production-ready CRM application built with React, Vite, and Tailwind CSS. Features a fully functional contacts module with glass-morphism design, smooth animations, and a professional purple-blue gradient aesthetic.

## Features

- **Contacts Management**: Complete CRUD operations with search, sort, and detailed views
- **Glass-morphism Design**: Modern UI with sophisticated depth effects and gradient overlays
- **Responsive Layout**: Seamless experience across desktop, tablet, and mobile devices
- **Real-time Validation**: Instant form validation with clear error messaging
- **Smooth Animations**: Professional micro-interactions and transitions throughout
- **Toast Notifications**: Elegant feedback system for user actions

## Tech Stack

- React 18 + Vite
- Tailwind CSS with custom glass-morphism utilities
- React Router for navigation
- Framer Motion for animations
- Lucide React for icons
- React Toastify for notifications
- date-fns for date formatting

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic UI components
│   ├── molecules/      # Composite components
│   ├── organisms/      # Complex features
│   ├── pages/          # Route pages
│   ├── ui/             # State components
│   └── ApperIcon.jsx   # Icon component
├── services/
│   ├── api/            # Service layer
│   └── mockData/       # Sample data
├── utils/              # Utility functions
├── App.jsx
├── main.jsx
└── index.css
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Roadmap

- ✅ Contacts Module (Fully Functional)
- 🔜 Companies Management
- 🔜 Deals Pipeline
- 🔜 Analytics Dashboard
- 🔜 Activity Timeline

## License

MIT