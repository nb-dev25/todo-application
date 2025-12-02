# 🎨 Shona Prince Technologies - Brand Implementation Guide

<div align="center">

**Professional Branding Guidelines for To-Do Application**

*Monochromatic Design • Starlink-Inspired • Modern Minimalism*

</div>

---

## 📑 Table of Contents

- [Company Information](#company-information)
- [Color Palette](#color-palette)
- [Logo Usage](#logo-usage)
- [Typography](#typography)
- [Design Principles](#design-principles)
- [Component Styling](#component-styling)
- [Spacing & Layout](#spacing--layout)
- [Animations & Transitions](#animations--transitions)
- [Responsive Design](#responsive-design)
- [Accessibility](#accessibility)
- [Brand Assets](#brand-assets)
- [Implementation Checklist](#implementation-checklist)
- [Brand Guidelines](#brand-guidelines)

---

## 🏢 Company Information

### Company Details
- **Company Name**: Shona Prince Technologies
- **Abbreviation**: SPT
- **Website**: https://shonatech.africa/
- **Industry**: Technology Solutions
- **Design Philosophy**: Professional, minimalist, monochromatic (inspired by Starlink)

### Brand Identity
- **Personality**: Professional, Modern, Clean, Minimalist
- **Target Audience**: Business professionals, tech-savvy users
- **Visual Style**: High contrast, sharp edges, subtle depth
- **Emotional Tone**: Trustworthy, efficient, sophisticated

---

## 🎨 Color Palette

### Primary Colors

| Color | Hex Code | Usage | Contrast Ratio |
|-------|----------|-------|----------------|
| **Black** | `#000000` | Primary brand color, buttons, text | 21:1 (AAA) |
| **White** | `#FFFFFF` | Backgrounds, cards, contrast | - |
| **Dark Grey** | `#1a1a1a` | Gradients, depth, shadows | 10.4:1 (AAA) |
| **Medium Grey** | `#4a4a4a` | Secondary elements, borders | 4.8:1 (AA) |
| **Light Grey** | `#f5f5f5` | Backgrounds, subtle areas | - |

### Text Colors

| Color | Hex Code | Usage | WCAG Rating |
|-------|----------|-------|-------------|
| **Primary Text** | `#000000` | Headings, important text | AAA |
| **Secondary Text** | `#666666` | Body text, descriptions | AA |
| **Tertiary Text** | `#999999` | Subtle text, placeholders | AA |
| **White Text** | `#FFFFFF` | Text on dark backgrounds | AAA |

### Border Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Border Light** | `#f0f0f0` | Subtle borders, dividers |
| **Border Medium** | `#e0e0e0` | Standard borders |
| **Border Dark** | `#cccccc` | Emphasized borders, hover states |

### Shadow System

| Shadow Type | Opacity | Usage |
|-------------|---------|-------|
| **Shadow SM** | 0.08 | Subtle elevation |
| **Shadow** | 0.12 | Standard cards |
| **Shadow MD** | 0.15 | Elevated elements |
| **Shadow LG** | 0.18 | Modals, dialogs |
| **Shadow XL** | 0.30 | Maximum elevation |

### Toast Notification Colors

| Color | Hex Code | Usage | Variant |
|-------|----------|-------|---------|
| **Success Green** | `#22c55e` | Success toasts, complete actions | Success, Complete |
| **Error Red** | `#ef4444` | Incomplete/error toasts | Incomplete |
| **Success Background** | `rgba(34, 197, 94, 0.1)` | Icon background for success | - |
| **Error Background** | `rgba(239, 68, 68, 0.1)` | Icon background for errors | - |

**Note:** While the brand is primarily monochromatic, toast notifications use green and red for clear user feedback on success/error states, which is a standard UX pattern.

### CSS Variables

All colors are defined as CSS variables in `src/index.css`:

```css
--primary-color: #000000;
--text-color: #000000;
--text-light: #666666;
--bg-primary: #ffffff;
--bg-secondary: #f8f8f8;
--border-color: #e0e0e0;
```

---

## 🖼️ Logo Usage

### Logo Specifications

- **File Location**: `/frontend/public/spt-logo.png`
- **Format**: PNG with transparency
- **Colors**: Black and white (monochromatic)
- **Recommended Height**: 60px (header), 40px (scrolled header)
- **Aspect Ratio**: Maintain original proportions

### Logo Placement

#### Header Logo
- **Position**: Centered above title text
- **Size**: 60px height (default), 40px (when scrolled)
- **Spacing**: Minimal gap (0.1rem) between logo and text
- **Effect**: White glow on hover (`drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))`)

#### Favicon
- **Usage**: Browser tab icon
- **File**: `/frontend/public/icon.png`
- **Size**: Browser scales automatically (recommended: 32x32px or larger)
- **Format**: PNG

#### Meta Tags
- **Open Graph Image**: SPT logo
- **Theme Color**: `#000000` (black)

### Logo Guidelines

✅ **Do's:**
- Always use the provided logo file
- Maintain aspect ratio
- Use on white or light backgrounds
- Apply subtle glow effects for visibility

❌ **Don'ts:**
- Don't modify logo colors
- Don't stretch or distort
- Don't use on dark backgrounds without glow
- Don't reduce below 40px height

---

## 📝 Typography

### Font Family

**Primary Font**: Inter (Google Fonts)
- **Source**: https://fonts.googleapis.com/css2?family=Inter
- **Style**: Sans-serif, modern, highly readable
- **Fallback**: System fonts (sans-serif)

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| **Regular** | 400 | Body text, descriptions |
| **Medium** | 500 | Labels, secondary text |
| **Semibold** | 600 | Subtitles, emphasis |
| **Bold** | 700 | Headings, important text |
| **Extra Bold** | 800 | Main titles, hero text |

### Typography Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| **H1 (Page Title)** | 1.25rem | 400 | 1.2 | 0.05em |
| **H2 (Section Title)** | 1.75rem | 700 | 1.4 | -0.02em |
| **H3 (Card Title)** | 1.25rem | 700 | 1.4 | -0.01em |
| **Body Text** | 15px | 400 | 1.6 | 0.01em |
| **Small Text** | 14px | 400 | 1.5 | 0.025em |
| **Button Text** | 15px | 600 | 1.5 | 0.05em |

### Text Colors

- **Headings**: `var(--text-color)` (#000000)
- **Body**: `var(--text-color)` (#000000)
- **Secondary**: `var(--text-light)` (#666666)
- **Subtle**: `var(--text-lighter)` (#999999)
- **White Text**: `rgba(255, 255, 255, 0.7-0.8)` (on dark backgrounds)

---

## 🎯 Design Principles

### 1. Minimalism

**Core Tenets:**
- Clean, uncluttered interfaces
- Focus on functionality over decoration
- Ample white space (breathing room)
- Remove unnecessary elements

**Implementation:**
- Maximum 2-3 elements per visual group
- Generous padding and margins
- Clear visual hierarchy
- No decorative graphics

### 2. Professional Aesthetics

**Characteristics:**
- Monochromatic color scheme
- Sharp, clean borders (2px standard)
- Subtle shadows for depth
- High contrast for readability

**Visual Style:**
- Black and white primary
- Grey for depth and hierarchy
- No bright colors or gradients (except subtle greys)
- Professional, business-appropriate

### 3. Modern Typography

**Standards:**
- Inter font family throughout
- Consistent font weights
- Proper line heights for readability
- Appropriate letter spacing

**Hierarchy:**
- Clear distinction between heading levels
- Consistent body text styling
- Emphasis through weight, not color

### 4. Consistent Spacing

**Spacing Scale:**
- **0.25rem** (4px) - Tight spacing
- **0.5rem** (8px) - Small gaps
- **1rem** (16px) - Standard spacing
- **1.5rem** (24px) - Medium spacing
- **2rem** (32px) - Large spacing
- **2.5rem** (40px) - Section spacing

**Border Radius:**
- **8px** - Standard elements (buttons, inputs)
- **12px** - Cards, containers
- **16px** - Modals, large containers

---

## 🎨 Component Styling

### Cards & Containers

```css
Background: #ffffff (white)
Border: 2px solid #e0e0e0 (light grey)
Border Radius: 12px (standard), 16px (large)
Shadow: Layered black shadows (0.08 - 0.18 opacity)
Padding: 1.5rem - 2.5rem
```

**Hover States:**
- Lift effect: `translateY(-4px)`
- Shadow increase: `box-shadow` enhancement
- Border darkening: `#cccccc`

### Buttons

#### Primary Button
```css
Background: #000000 (black)
Color: #FFFFFF (white)
Border: 2px solid #000000
Border Radius: 8px
Hover: #333333 background
```

#### Secondary Button
```css
Background: #FFFFFF (white)
Color: #000000 (black)
Border: 2px solid #cccccc
Border Radius: 8px
Hover: #f8f8f8 background, darker border
```

#### Edit Button
```css
Background: Linear gradient (#4a4a4a to #2a2a2a)
Color: #FFFFFF (white)
Hover: Darker gradient
```

#### Delete Button
```css
Background: #FFFFFF (white)
Color: #000000 (black)
Border: 2px solid #cccccc
Hover: #000000 background, white text
```

### Input Fields

```css
Background: #FFFFFF (white)
Border: 2px solid #e0e0e0
Border Radius: 8px
Padding: 14px 16px
Focus: Border #000000, subtle shadow
```

### Modals & Dialogs

#### Add Todo Modal
```css
Background: #FFFFFF (white)
Max Width: 900px (spacious layout)
Border Radius: 16px
Shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3)
Overlay: rgba(0, 0, 0, 0.75) with blur(15px)
Padding: 2.5rem
Scrollbars: Hidden but scrollable
```

#### Edit Modal
```css
Background: #FFFFFF (white)
Max Width: 800px
Border Radius: 16px
Shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3)
Overlay: rgba(0, 0, 0, 0.75) with blur(15px)
Scrollbars: Hidden but scrollable
```

**Modal Features:**
- Spacious layouts for comfortable form interaction
- Hidden scrollbars for clean appearance
- Smooth slide-up animations
- Responsive (full-screen on mobile)
- Escape key and overlay click to close

### Toast Notifications

Toast notifications appear in the top right corner with color-coded variants:

#### Success Toast (Green)
```css
Background: #FFFFFF (white)
Border Left: 5px solid #22c55e (green)
Icon: ✓ (green checkmark)
Icon Background: rgba(34, 197, 94, 0.1)
Border Radius: 12px
Position: Fixed, top-right
Animation: Slide in from right
Auto-dismiss: 3 seconds
```

**Usage:**
- Successfully added todo
- Task edited successfully
- Task deleted successfully
- Task marked as complete

#### Incomplete Toast (Red)
```css
Background: #FFFFFF (white)
Border Left: 5px solid #ef4444 (red)
Icon: × (red X)
Icon Background: rgba(239, 68, 68, 0.1)
Border Radius: 12px
Position: Fixed, top-right
Animation: Slide in from right
Auto-dismiss: 3 seconds
```

**Usage:**
- Task marked as incomplete

**Toast Features:**
- Auto-dismiss after 3 seconds
- Manual dismiss with × button
- Smooth slide-in animation from right
- Responsive positioning (full-width on mobile)
- High z-index (1000) for visibility

### Percentage Completion Indicator

Todo cards with subtasks display a completion percentage badge:

#### Default Percentage Badge
```css
Background: var(--bg-secondary) (#f8f8f8)
Color: var(--text-color) (#000000)
Border: 1px solid var(--border-color)
Border Radius: 12px
Font Size: 0.875rem
Font Weight: 600
Padding: 0.25rem 0.75rem
```

#### 100% Completion Badge (Green)
```css
Background: rgba(34, 197, 94, 0.15) (15% opacity green)
Color: #22c55e (green text)
Border: rgba(34, 197, 94, 0.3) (30% opacity green)
Border Radius: 12px
Transition: Smooth color change
```

**Features:**
- Real-time percentage calculation based on subtask completion
- Positioned inline with todo title
- Green badge with transparency when 100% complete
- Smooth transition when reaching 100%

### Floating Add Todo Button

```css
Position: Fixed, top-right
Background: var(--primary-color) (#000000)
Color: white
Border: 2px solid var(--primary-color)
Border Radius: 8px
Z-index: 101 (above header)
Transition: Smooth position adjustment on scroll
```

**Scroll Behavior:**
- Default position: Below full header (with title visible)
- Scrolled position: Adjusts when header becomes smaller
- Smooth transition matching header animation timing
- Always visible and accessible

---

## 📐 Spacing & Layout

### Grid System

- **Container Max Width**: 1200px (centered)
- **Padding**: 2rem on desktop, 1rem on mobile
- **Gap Between Elements**: 1rem - 2rem

### Component Spacing

| Component | Padding | Margin |
|-----------|---------|--------|
| **Header** | 0.5rem - 1.5rem | 0 |
| **Cards** | 1.75rem | 1rem bottom |
| **Forms** | 2.5rem | 2rem bottom |
| **Buttons** | 0.75rem 1.5rem | 0.5rem gap |
| **Modals** | 2rem | Auto (centered) |

### Border Standards

- **Standard Border**: 2px solid
- **Light Border**: `#f0f0f0`
- **Medium Border**: `#e0e0e0`
- **Dark Border**: `#cccccc` (hover states)

---

## ✨ Animations & Transitions

### Timing Functions

| Function | Usage | Duration |
|----------|-------|----------|
| **Standard** | `cubic-bezier(0.4, 0, 0.2, 1)` | 0.3s |
| **Fast** | `cubic-bezier(0.4, 0, 0.2, 1)` | 0.15s |
| **Smooth** | `cubic-bezier(0.16, 1, 0.3, 1)` | 0.4s |
| **Ease Out** | `ease-out` | 0.3s |

### Key Animations

#### Fade In
```css
from: opacity: 0
to: opacity: 1
Duration: 0.3s
```

#### Slide Down
```css
from: translateY(-30px), opacity: 0
to: translateY(0), opacity: 1
Duration: 0.5s
```

#### Scale Up
```css
from: scale(0.95), opacity: 0
to: scale(1), opacity: 1
Duration: 0.4s
```

#### Lift Effect
```css
from: translateY(0)
to: translateY(-4px)
Duration: 0.3s
```

### Micro-interactions

- **Button Hover**: Lift + shadow increase
- **Card Hover**: Lift + border darkening
- **Input Focus**: Border color change + shadow
- **Checkbox Toggle**: Scale animation
- **Modal Open**: Scale + fade
- **Scroll Header**: Smooth padding transition
- **Toast Notification**: Slide in from right (400px → 0) with fade, icon pop animation
- **Toast Dismiss**: Auto-dismiss after 3 seconds, manual dismiss with × button

---

## 📱 Responsive Design

### Breakpoints

| Device | Width | Layout Changes |
|--------|-------|----------------|
| **Desktop** | > 768px | Full layout, side-by-side |
| **Tablet** | 481px - 768px | Adjusted spacing, stacked forms |
| **Mobile** | ≤ 480px | Stacked layout, full-width buttons |

### Mobile Optimizations

- **Touch Targets**: Minimum 44x44px
- **Font Sizes**: Slightly reduced (13-14px)
- **Spacing**: Reduced padding (1rem)
- **Buttons**: Full-width on mobile
- **Modals**: Full-screen on small devices

### Responsive Typography

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **H1** | 1.25rem | 1.1rem | 1rem |
| **H2** | 1.75rem | 1.5rem | 1.3rem |
| **Body** | 15px | 14px | 13px |

---

## ♿ Accessibility

### Contrast Ratios

All text meets WCAG AA standards:

- **Black on White**: 21:1 (AAA) ✅
- **Dark Grey on White**: 10.4:1 (AAA) ✅
- **Medium Grey on White**: 4.8:1 (AA) ✅
- **White on Black**: 21:1 (AAA) ✅

### ARIA Labels

All interactive elements include:
- `aria-label` for buttons
- `role` attributes where needed
- Semantic HTML structure
- Keyboard navigation support

### Keyboard Navigation

- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons
- **Escape**: Close modals
- **Focus Indicators**: Visible borders and shadows

### Screen Reader Support

- Semantic HTML (`<header>`, `<main>`, `<footer>`)
- Alt text for images
- Descriptive button labels
- Form label associations

---

## 📦 Brand Assets

### Included Files

| File | Location | Usage |
|------|----------|-------|
| **SPT Logo** | `/frontend/public/spt-logo.png` | Header, Open Graph image |
| **Icon** | `/frontend/public/icon.png` | Favicon, Apple touch icon |
| **HTML Meta** | `/frontend/index.html` | SEO and social sharing |
| **CSS Variables** | `/frontend/src/index.css` | Color system |
| **Component Styles** | `/frontend/src/components/*.css` | Individual component styling |

### Meta Tags Implementation

```html
<title>To-Do Application | Shona Prince Technologies</title>
<meta name="description" content="Professional To-Do Application by Shona Prince Technologies">
<meta name="theme-color" content="#000000">
<meta property="og:image" content="/spt-logo.png">
```

### Favicon

- **File**: `/frontend/public/icon.png`
- **Referenced in**: `index.html`
- **Browser Display**: Tab icon
- **Apple Touch Icon**: Same file used for iOS home screen icon

---

## ✅ Implementation Checklist

### Color System
- ✅ Monochromatic palette (black, white, grey)
- ✅ CSS variables defined
- ✅ Consistent usage throughout
- ✅ WCAG AA compliance

### Logo Integration
- ✅ SPT logo in header
- ✅ Responsive sizing
- ✅ Hover effects
- ✅ Custom icon.png as favicon
- ✅ Apple touch icon configured

### Typography
- ✅ Inter font family loaded
- ✅ Consistent font weights
- ✅ Proper hierarchy
- ✅ Responsive sizing

### Components
- ✅ Cards styled consistently
- ✅ Buttons follow brand guidelines
- ✅ Inputs match design system
- ✅ Modals use brand colors
- ✅ Toast notifications with color-coded variants
- ✅ Floating ADD TODO button with scroll-adaptive positioning
- ✅ Percentage completion indicators on todo cards
- ✅ Green completion badge at 100% with transparency

### Animations
- ✅ Smooth transitions
- ✅ Professional timing functions
- ✅ Micro-interactions
- ✅ Performance optimized

### Responsive Design
- ✅ Mobile breakpoints
- ✅ Tablet optimization
- ✅ Touch-friendly targets
- ✅ Adaptive layouts

### Accessibility
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Screen reader support

---

## 📋 Brand Guidelines

### ✅ Do's

**Colors:**
- ✅ Use monochromatic colors only (black, white, grey)
- ✅ Maintain high contrast ratios
- ✅ Use CSS variables for consistency

**Typography:**
- ✅ Use Inter font family exclusively
- ✅ Maintain consistent font weights
- ✅ Follow typography scale

**Layout:**
- ✅ Keep clean, minimal design
- ✅ Use generous white space
- ✅ Maintain consistent spacing

**Logo:**
- ✅ Include SPT logo prominently
- ✅ Maintain aspect ratio
- ✅ Use appropriate sizing

**Components:**
- ✅ Follow component styling guidelines
- ✅ Use consistent border radius
- ✅ Apply standard shadows
- ✅ Use color-coded toast notifications (green for success, red for incomplete)
- ✅ Display percentage completion on todo cards with subtasks
- ✅ Show green badge with transparency at 100% completion
- ✅ Hide scrollbars while maintaining scroll functionality

### ❌ Don'ts

**Colors:**
- ❌ Don't use bright or colorful accents
- ❌ Don't deviate from monochromatic scheme
- ❌ Don't use low contrast combinations

**Typography:**
- ❌ Don't use decorative fonts
- ❌ Don't mix font families
- ❌ Don't use excessive font sizes

**Layout:**
- ❌ Don't clutter the interface
- ❌ Don't use inconsistent spacing
- ❌ Don't compromise readability

**Logo:**
- ❌ Don't modify logo colors
- ❌ Don't stretch or distort logo
- ❌ Don't hide the SPT logo

**Components:**
- ❌ Don't over-animate
- ❌ Don't use excessive shadows
- ❌ Don't break design consistency
- ❌ Don't use non-brand colors in toasts (only green #22c55e and red #ef4444)
- ❌ Don't show scrollbars (hide them while keeping scroll functionality)
- ❌ Don't use solid green for 100% badge (use transparent rgba for subtlety)

---

## 🎓 Usage Examples

### Correct Usage

```css
/* ✅ Good: Using brand colors */
.button {
  background: var(--primary-color); /* #000000 */
  color: white;
  border: 2px solid var(--border-dark);
}

/* ✅ Good: Consistent spacing */
.card {
  padding: 2rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
}
```

### Incorrect Usage

```css
/* ❌ Bad: Using non-brand colors */
.button {
  background: #ff0000; /* Red - not in brand */
  color: yellow;
}

/* ❌ Bad: Inconsistent spacing */
.card {
  padding: 1.2rem; /* Not following scale */
  margin: 0.7rem; /* Inconsistent */
}
```

---

## 🔄 Brand Consistency

### Visual Identity

The application maintains brand consistency through:

1. **Color Harmony**: Strict monochromatic palette
2. **Typography Unity**: Single font family (Inter)
3. **Spacing Rhythm**: Consistent spacing scale
4. **Component Cohesion**: Unified styling patterns
5. **Animation Language**: Consistent timing and effects

### Brand Voice

- **Professional**: Business-appropriate language
- **Clear**: Direct, concise communication
- **Modern**: Contemporary design patterns
- **Trustworthy**: Reliable, polished interface

---

## 📞 Brand Resources

### External References

- **Company Website**: https://shonatech.africa/
- **Logo Source**: Provided by Shona Prince Technologies
- **Font Source**: Google Fonts (Inter)

### Internal Documentation

- **Color Variables**: `frontend/src/index.css`
- **Component Styles**: Individual component CSS files
- **Type Definitions**: `frontend/src/types/todo.ts`

---

<div align="center">

**This branding implementation reflects Shona Prince Technologies' professional, modern, and minimalist identity.**

*Last Updated: December 2025*

</div>
