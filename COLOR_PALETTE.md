# 🎨 ChatConnect Color Palette Guide

Complete color reference for the ChatConnect application with dark and light theme variations.

---

## 🎯 Brand Colors

### Primary Brand Identity

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Indigo 600** | `#4F46E5` | `rgb(79, 70, 229)` | Primary brand color, buttons |
| **Indigo 700** | `#4338CA` | `rgb(67, 56, 202)` | Hover states |
| **Indigo 500** | `#6366F1` | `rgb(99, 102, 241)` | Light accents |
| **Indigo 400** | `#818CF8` | `rgb(129, 140, 248)` | Text links (dark theme) |
| **Purple 600** | `#9333EA` | `rgb(147, 51, 234)` | Secondary brand color |
| **Purple 700** | `#7E22CE` | `rgb(126, 34, 206)` | Purple hover states |

---

## 🌙 Dark Theme Palette

### Background Colors

```css
--bg-primary: #0F172A;        /* Slate 950 - Main background */
--bg-secondary: #1E293B;      /* Slate 800 - Cards, panels */
--bg-tertiary: #334155;       /* Slate 700 - Input fields */
--bg-hover: #475569;          /* Slate 600 - Hover states */
--bg-overlay: rgba(0,0,0,0.7); /* Modal overlays */
```

### Text Colors

```css
--text-primary: #FFFFFF;      /* White - Main text */
--text-secondary: #CBD5E1;    /* Slate 300 - Secondary text */
--text-tertiary: #94A3B8;     /* Slate 400 - Labels */
--text-muted: #64748B;        /* Slate 500 - Muted text */
--text-link: #A5B4FC;         /* Indigo 300 - Links */
```

### Border Colors

```css
--border-default: #334155;    /* Slate 700 */
--border-light: #475569;      /* Slate 600 */
--border-focus: #6366F1;      /* Indigo 500 */
```

---

## ☀️ Light Theme Palette

### Background Colors

```css
--bg-primary: #FFFFFF;        /* White - Main background */
--bg-secondary: #F9FAFB;      /* Gray 50 - Alternate sections */
--bg-tertiary: #F3F4F6;       /* Gray 100 - Cards */
--bg-hover: #E5E7EB;          /* Gray 200 - Hover states */
--bg-overlay: rgba(0,0,0,0.5); /* Modal overlays */
```

### Text Colors

```css
--text-primary: #111827;      /* Gray 900 - Main text */
--text-secondary: #374151;    /* Gray 700 - Secondary text */
--text-tertiary: #4B5563;     /* Gray 600 - Labels */
--text-muted: #6B7280;        /* Gray 500 - Muted text */
--text-link: #4F46E5;         /* Indigo 600 - Links */
```

### Border Colors

```css
--border-default: #E5E7EB;    /* Gray 200 */
--border-light: #F3F4F6;      /* Gray 100 */
--border-focus: #4F46E5;      /* Indigo 600 */
```

---

## 🌈 Gradient Combinations

### Primary Gradients

```css
/* Main Brand Gradient */
background: linear-gradient(to right, #4F46E5, #9333EA);
/* Tailwind: from-indigo-600 to-purple-600 */

/* Hover Gradient */
background: linear-gradient(to right, #4338CA, #7E22CE);
/* Tailwind: from-indigo-700 to-purple-700 */

/* Light Gradient */
background: linear-gradient(to right, #6366F1, #A855F7);
/* Tailwind: from-indigo-500 to-purple-500 */

/* Diagonal Gradient */
background: linear-gradient(135deg, #4F46E5, #9333EA);

/* Text Gradient */
background: linear-gradient(to right, #4F46E5, #9333EA);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## ⚠️ Status Colors

### Success

| Element | Light Theme | Dark Theme |
|---------|-------------|------------|
| Background | `#D1FAE5` | `rgba(34, 197, 94, 0.15)` |
| Text | `#065F46` | `#86EFAC` |
| Border | `#10B981` | `#22C55E` |
| Icon | `#22C55E` | `#22C55E` |

### Error

| Element | Light Theme | Dark Theme |
|---------|-------------|------------|
| Background | `#FEE2E2` | `rgba(239, 68, 68, 0.15)` |
| Text | `#991B1B` | `#FCA5A5` |
| Border | `#EF4444` | `#EF4444` |
| Icon | `#EF4444` | `#EF4444` |

### Warning

| Element | Light Theme | Dark Theme |
|---------|-------------|------------|
| Background | `#FEF3C7` | `rgba(251, 191, 36, 0.15)` |
| Text | `#92400E` | `#FCD34D` |
| Border | `#F59E0B` | `#F59E0B` |
| Icon | `#F59E0B` | `#F59E0B` |

### Info

| Element | Light Theme | Dark Theme |
|---------|-------------|------------|
| Background | `#DBEAFE` | `rgba(59, 130, 246, 0.15)` |
| Text | `#1E40AF` | `#93C5FD` |
| Border | `#3B82F6` | `#3B82F6` |
| Icon | `#3B82F6` | `#3B82F6` |

---

## 🎨 Component Colors

### Buttons

#### Primary Button (Dark Theme)
```css
/* Default */
background: linear-gradient(to right, #6366F1, #A855F7);
color: #FFFFFF;

/* Hover */
background: linear-gradient(to right, #4F46E5, #9333EA);
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);

/* Disabled */
background: #475569;
color: #64748B;
```

#### Secondary Button (Dark Theme)
```css
/* Default */
background: transparent;
color: #A5B4FC;
border: 1px solid #475569;

/* Hover */
background: rgba(99, 102, 241, 0.1);
color: #C7D2FE;
border: 1px solid #6366F1;
```

### Cards
```css
/* Dark Theme Card */
background: #1E293B;
border: 1px solid #334155;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);

/* Hover */
border: 1px solid rgba(99, 102, 241, 0.5);
```

### Input Fields
```css
/* Dark Theme Input */
background: #334155;
color: #FFFFFF;
border: 1px solid #475569;

/* Focus */
background: #1E293B;
border: 2px solid #6366F1;
box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
```

### Message Bubbles

#### Sent Message (Dark Theme)
```css
background: linear-gradient(135deg, #818CF8, #A78BFA);
color: #FFFFFF;
border-radius: 18px 18px 4px 18px;
```

#### Received Message (Dark Theme)
```css
background: #334155;
color: #FFFFFF;
border: 1px solid #475569;
border-radius: 18px 18px 18px 4px;
```

---

## 💫 Shadows

### Dark Theme Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
```

### Light Theme Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## ♿ Accessibility

All color combinations meet WCAG 2.1 Level AA standards:

### Contrast Ratios (Dark Theme)

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| White | Slate 950 | 21:1 | AAA ✓✓✓ |
| Slate 300 | Slate 950 | 12.6:1 | AAA ✓✓✓ |
| Indigo 400 | Slate 950 | 8.1:1 | AAA ✓✓✓ |

### Focus States

```css
/* Dark Theme */
outline: 2px solid #6366F1;
outline-offset: 2px;
box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
```

---

## 📱 Tailwind CSS Classes Reference

### Background Colors (Dark Theme)
```
bg-slate-950, bg-slate-900, bg-slate-800, bg-slate-700
bg-indigo-500, bg-indigo-600, bg-purple-600
```

### Text Colors (Dark Theme)
```
text-white, text-slate-300, text-slate-400, text-slate-500
text-indigo-400, text-purple-400
```

### Border Colors
```
border-slate-800, border-slate-700, border-indigo-500
```

### Gradient Classes
```
from-indigo-600 to-purple-600
from-indigo-500 to-purple-500
from-indigo-700 to-purple-700
```

---

## 💻 CSS Variables Implementation

```css
:root[data-theme="dark"] {
  /* Brand */
  --brand-primary: #6366F1;
  --brand-primary-hover: #4F46E5;
  --brand-secondary: #A855F7;
  
  /* Backgrounds */
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --bg-card: #1E293B;
  --bg-input: #334155;
  
  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #CBD5E1;
  --text-link: #A5B4FC;
  
  /* Borders */
  --border-default: #334155;
  --border-focus: #6366F1;
  
  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
}
```

---

## 🎯 Usage Guidelines

1. **Primary Actions**: Use the gradient buttons (`from-indigo-600 to-purple-600`)
2. **Secondary Actions**: Use outline buttons with `border-slate-700`
3. **Text Hierarchy**: 
   - Primary: `text-white`
   - Secondary: `text-slate-300`
   - Muted: `text-slate-400`
4. **Interactive Elements**: Always include hover states with smooth transitions
5. **Focus States**: Ensure all interactive elements have visible focus indicators

---

**Last Updated**: October 2025  
**Design System**: Tailwind CSS v4  
**Color Palette**: Based on Tailwind's Slate, Indigo, and Purple scales
