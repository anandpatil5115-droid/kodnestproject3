# KodNest Premium Build System - Design System Documentation

## Overview

KodNest Premium Build System is a production-ready design system for serious B2C SaaS products. It embodies a calm, intentional, coherent, and confident design philosophy.

---

## Design Philosophy

### Core Principles
- **Calm** - No noise, no unnecessary animations, no visual chaos
- **Intentional** - Every choice has a purpose
- **Coherent** - Single design mind across all components
- **Confident** - Premium feel without being flashy

### What We Avoid
- ❌ Gradients
- ❌ Glassmorphism
- ❌ Neon colors
- ❌ Animation noise
- ❌ Playful, hackathon-style elements
- ❌ Random spacing or font sizes

---

## Color System

**Maximum 4 colors** across the entire system:

```css
--color-background: #F7F6F3   /* Off-white */
--color-text-primary: #111111  /* Near black */
--color-accent: #8B0000        /* Deep red */
--color-success: #4A6741       /* Muted green */
--color-warning: #B8860B       /* Muted amber */
```

### Usage Guidelines
- **Background**: Use for page backgrounds and card surfaces
- **Primary Text**: All body text and headings
- **Accent**: Primary buttons, links, focus states, important UI elements
- **Success**: Confirmation states, shipped badges
- **Warning**: Caution states, alerts

---

## Typography

### Font Families
```css
--font-serif: 'Playfair Display', Georgia, serif
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
```

### Headings
- Font: **Serif** (Playfair Display)
- Sizes: H1 (48px), H2 (32px), H3 (24px)
- Line height: 1.2
- Weight: 600
- Generous spacing below

### Body Text
- Font: **Sans-serif** (Inter)
- Size: 17px
- Line height: 1.7
- Max width: 720px for readability
- Natural, comfortable reading experience

### Small Text
- Size: 14px
- Use for labels, captions, metadata

### Rules
- Never use decorative fonts
- Never use random sizes
- Maintain consistent hierarchy

---

## Spacing System

**Strict 8px-based scale**. Never deviate.

```css
--space-xs: 8px
--space-sm: 16px
--space-md: 24px
--space-lg: 40px
--space-xl: 64px
```

### Application
- Component padding: `--space-sm` to `--space-md`
- Section gaps: `--space-lg`
- Major layout spacing: `--space-xl`
- Micro-spacing: `--space-xs`

**Whitespace is part of design.** Use it generously and consistently.

---

## Global Layout Structure

Every page follows this structure:

```
[Top Bar]
    ↓
[Context Header]
    ↓
[Primary Workspace (70%) + Secondary Panel (30%)]
    ↓
[Proof Footer]
```

### Top Bar
- **Left**: Project name
- **Center**: Progress indicator (Step X / Y)
- **Right**: Status badge (Not Started / In Progress / Shipped)
- Always present, always consistent

### Context Header
- Large serif headline
- 1-line subtitle explaining purpose
- No hype language, just clarity

### Primary Workspace (70% width)
- Main product interaction area
- Clean cards and components
- No crowding - generous spacing

### Secondary Panel (30% width)
- Step explanations (short)
- Copyable prompt boxes
- Action buttons
- Calm, helpful styling

### Proof Footer
- Persistent bottom section
- Checklist format
- Requires user proof input
- □ UI Built □ Logic Working □ Test Passed □ Deployed

---

## Components

### Buttons

**Primary Button**
```html
<button class="kn-button kn-button--primary">Action</button>
```
- Solid deep red background
- White text
- Use for primary actions

**Secondary Button**
```html
<button class="kn-button kn-button--secondary">Action</button>
```
- Outlined style
- Use for secondary actions

**Small Variant**
```html
<button class="kn-button kn-button--primary kn-button--small">Small</button>
```

### Input Fields

```html
<input type="text" class="kn-input" placeholder="Enter text">
<textarea class="kn-textarea" placeholder="Multiline text"></textarea>
```
- Clean borders, no heavy shadows
- Clear focus state (accent color border)
- Comfortable padding

### Cards

```html
<div class="kn-card">
  <h2 class="kn-card__title">Card Title</h2>
  <div class="kn-card__content">
    <p>Card content goes here</p>
  </div>
</div>
```
- Subtle border
- No drop shadows
- Balanced padding (24px)

### Status Badges

```html
<span class="kn-badge kn-badge--not-started">Not Started</span>
<span class="kn-badge kn-badge--in-progress">In Progress</span>
<span class="kn-badge kn-badge--shipped">Shipped</span>
```

### Checkboxes

```html
<label class="kn-checkbox">
  <input type="checkbox" class="kn-checkbox__input">
  <span class="kn-checkbox__label">Task description</span>
</label>
```

### Prompt Box

```html
<div class="kn-prompt-box">
  <pre class="kn-prompt-box__content">Copyable prompt text</pre>
</div>
```

---

## Interaction Rules

### Transitions
- Duration: **150-200ms**
- Timing: **ease-in-out**
- No bounce, no parallax
- Subtle and refined

### Hover States
- Buttons: Background color change
- Links: Underline
- Consistent across all components

### Focus States
- Clear visual indicator
- Accent color border
- No browser default outlines

---

## Error & Empty States

### Error States
```html
<div class="kn-error-state">
  <p class="kn-error-state__title">What Went Wrong</p>
  <p class="kn-error-state__message">How to fix it. Never blame the user.</p>
</div>
```

### Empty States
```html
<div class="kn-empty-state">
  <p class="kn-empty-state__title">No Items Yet</p>
  <p>Provide clear next action.</p>
  <div class="kn-empty-state__action">
    <button class="kn-button kn-button--primary">Create First Item</button>
  </div>
</div>
```

---

## Implementation Guide

### Getting Started

1. **Include the CSS**
```html
<link rel="stylesheet" href="kodnest-design-system.css">
```

2. **Include Required Fonts**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
```

3. **Follow the Layout Structure**
- Start with Top Bar
- Add Context Header
- Create Main Container with Workspace + Panel
- Add Proof Footer

### CSS Custom Properties

All design tokens are available as CSS variables:
```css
var(--color-accent)
var(--space-md)
var(--font-serif)
var(--transition-speed)
```

Use these throughout your custom components to maintain consistency.

---

## Quality Checklist

Before shipping any page, verify:

- [ ] Only 4 colors used (background, text, accent, success/warning)
- [ ] All spacing uses the scale (8, 16, 24, 40, 64px)
- [ ] Headings use serif, body uses sans-serif
- [ ] Layout follows Top Bar → Header → Workspace+Panel → Footer
- [ ] All transitions are 150-200ms, ease-in-out
- [ ] No gradients, no glassmorphism, no neon
- [ ] Error states explain what went wrong + how to fix
- [ ] Empty states provide clear next actions
- [ ] Everything feels like one mind designed it

---

## Files

- **kodnest-design-system.css** - Complete design system
- **index.html** - Component showcase and examples
- **README.md** - This documentation

---

## Philosophy in Practice

This is not a student project. This is not a hackathon demo. This is a professional design system for a serious product company.

Every component, every spacing decision, every color choice reinforces our core values: calm, intentional, coherent, confident.

No visual drift. No exceptions.
