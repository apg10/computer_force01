# Computer Force (Static Website)

A responsive, multi-page static website for **Computer Force**, designed as a clean and reliable online computer store experience. The project focuses on modern layout, consistent UI components, and accessibility validation aligned with **WCAG 2.0 Level AA** checks.

## Live Demo
- (Add your GitHub Pages link here)

## Pages
- **Home** — Hero section, value propositions (“Why choose us”), category grid, and cart summary panel.
- **Products** — Product listing layout using reusable card components.
- **About** — Company overview in a modern, readable layout.
- **Developer** — Developer profile/summary page.
- **Register** — Registration form layout with consistent form styling.

## Key Features
- **Responsive design**
  - Desktop layout: main content + aside cart panel
  - Mobile layout: burger menu with a dedicated mobile panel
- **Reusable UI system**
  - Shared button styles (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-muted`)
  - Consistent cards, grids, and spacing
- **Accessible forms and navigation**
  - Visually-hidden labels (`.sr-only`) for search inputs and forms
  - Keyboard focus styles (`:focus-visible`)
- **Accessibility validation**
  - Accessibility checks performed using **WAVE (WebAIM)** to align with **WCAG 2.0 AA**
  - Improvements applied to form labeling and contrast-sensitive elements

## Tech Stack
- **HTML5**
- **CSS3**
- (Optional) Minimal JavaScript for mobile menu/cart drawer toggles

## Project Structure
```txt
computer_force01/
├─ index.html
├─ products.html
├─ about.html
├─ developer.html
├─ register.html
├─ styles.css
└─ assets/
   ├─ images/
   └─ icons/
