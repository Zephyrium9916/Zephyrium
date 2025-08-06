# Zephyrium Design System - Implementation Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

### 2. Setup Tailwind Config

Update your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./design-system/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          secondary: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    }
  }
}
```

### 3. Create Utility Function

Create `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## 📋 Design Tokens Usage

### Colors

```typescript
// Primary brand colors
bg-brand-primary-600
text-brand-primary-700
border-brand-primary-500

// Semantic colors
bg-success
text-warning
border-error
```

### Typography

```typescript
// Font sizes
text-sm
text-base
text-lg
text-xl
text-2xl
text-3xl
text-4xl

// Font weights
font-normal
font-medium
font-semibold
font-bold
```

### Spacing

```typescript
// Using 8-point grid system
p-2    // 0.5rem (8px)
p-4    // 1rem (16px)
p-6    // 1.5rem (24px)
p-8    // 2rem (32px)
```

## 🎯 Next Steps

1. **Component Library**: Build reusable React components
2. **Documentation**: Create Storybook stories
3. **Testing**: Add visual regression tests
4. **Deployment**: Publish to npm registry
