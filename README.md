# Modern React Template

A modern React development template based on the latest technology stack, supporting rapid component development.

## Technology Stack

- ⚡️ [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org/) + [Vite 5](https://vitejs.dev/)
- 🎨 [TailwindCSS](https://tailwindcss.com/) - Atomic CSS Framework
- 📦 [shadcn/ui](https://ui.shadcn.com/) - Customizable Component Library
- 🎯 [Radix UI](https://www.radix-ui.com/) - Accessible UI Primitives
- 🛠️ [React Router DOM](https://reactrouter.com/) - Routing Management
- 📱 Responsive Design + Dark Mode

## Features

- 🎉 Modern components ready to use
- 🌓 Built-in dark mode support
- 📱 Complete responsive design
- ♿️ ARIA-compliant accessibility design
- 🔧 Complete TypeScript type support
- 📝 ESLint + Prettier code standards

## Directory Structure

```
src/
├── components/   # Components directory
│   ├── ui/       # shadcn/ui base components
│   ├── theme/    # Theme-related components
│   └── business/ # Business components
├── layouts/      # Layout components
├── pages/        # Page components
├── hooks/        # Custom hooks
├── lib/          # Utility functions
├── types/        # TypeScript types
├── styles/       # Global styles
└── main.tsx      # Application entry
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for test environment
pnpm build

# Build for production environment
pnpm build:prod
```

## Component Development Guidelines

### Style Guide

Using shadcn/ui design tokens:

```tsx
// Theme colors
bg-background text-foreground    // Background and text
bg-card text-card-foreground    // Card
bg-popover text-popover-foreground    // Popover
bg-primary text-primary-foreground    // Primary elements
bg-secondary text-secondary-foreground // Secondary elements
bg-muted text-muted-foreground    // Disabled state
bg-accent text-accent-foreground    // Accent

// State styles
hover:bg-accent/90              // Hover effect
focus-visible:ring-ring        // Focus ring
disabled:opacity-50            // Disabled state
```

### Component Development

- Use functional components
- Complete TypeScript type definitions
- Props must have clear interface definitions
- Support keyboard navigation and accessibility

## Built-in Components

### Base Components (src/components/ui/)
- `Button` - Multi-style button
- `Input` - Input control
- `Select` - Selector

### Theme Components
- `ThemeProvider` - Theme management
- `ThemeToggle` - Theme switcher

## Environment Configuration

Development Environment (.env.development):
```
VITE_APP_TITLE=React Template Dev
VITE_APP_API_BASE_URL=http://localhost:3000
VITE_APP_ENV=development
```

Production Environment (.env.production):
```
VITE_APP_TITLE=React Template
VITE_APP_API_BASE_URL=https://api.example.com
VITE_APP_ENV=production
```
