# Silicon Synapse Theme

This is a reusable CSS theme based on the Silicon Synapse project that you can use for other projects. It features a modern design with gradients, glass effects, and subtle animations.

## How to Use This Theme in Other Projects

### Method 1: Direct Import

1. Copy the `silicon-synapse-theme.css` file to your new project
2. Import it in your HTML file:

```html
<link rel="stylesheet" href="path/to/silicon-synapse-theme.css">
```

Or in your CSS/JS file:

```css
@import 'path/to/silicon-synapse-theme.css';
```

### Method 2: NPM Package (for React projects)

1. Create a new folder in your project (e.g., `src/theme`)
2. Copy the CSS file there and import it in your main component:

```javascript
import './theme/silicon-synapse-theme.css';
```

## Theme Features

### Color System

The theme uses a comprehensive color system with CSS variables:

```css
:root {
  --primary: #3b82f6;        /* Blue */
  --secondary: #10b981;      /* Green */
  --dark-bg: #0f172a;        /* Dark background */
  --light-text: #f8fafc;     /* Light text */
  /* ...and more */
}
```

### Components

The theme includes several pre-styled components:

1. **Cards**:
   - `.card` - Basic card
   - `.glass-card` - Modern glass card with blur effect
   - `.service-card` - Special card for services

2. **Buttons**:
   - `.btn` - Base button
   - `.btn-primary` - Primary gradient button
   - `.btn-outline` - Outlined button

3. **Layout**:
   - `.container` - Responsive container
   - `.row` and `.col-*` - Simple grid system

4. **Effects**:
   - `.gradient-text` - Text with gradient
   - `.icon-gradient` - Icon with gradient
   - `.fade-in` - Fade-in animation
   - `.float` - Floating animation

### Utility Classes

The theme includes helpful utility classes for spacing, alignment, etc.:

- `.text-center` - Center text
- `.mb-1` through `.mb-5` - Margin bottom
- `.mt-1` through `.mt-5` - Margin top
- `.py-1` through `.py-5` - Padding top and bottom

## Example Usage

```html
<div class="container">
  <section class="section">
    <h2 class="gradient-text text-center mb-4">Our Services</h2>
    
    <div class="row">
      <div class="col-4">
        <div class="service-card">
          <div class="service-icon-wrapper">
            <i class="fas fa-code service-icon"></i>
          </div>
          <h3 class="h5 mt-4 mb-3">Web Development</h3>
          <p class="service-description">Create stunning, responsive websites and web applications.</p>
          <button class="btn btn-primary">Learn More</button>
        </div>
      </div>
      
      <!-- Add more service cards here -->
    </div>
  </section>
</div>
```

## Customizing the Theme

You can easily customize the theme by modifying the CSS variables at the top of the file. For example, to change the primary color:

```css
:root {
  --primary: #ff6b6b; /* New primary color (red) */
  /* other variables remain the same */
}
```

## Requirements

- This theme works best with Font Awesome for icons
- For the glass effect to work, use a browser that supports `backdrop-filter`
- The theme is designed to be responsive and works well on all device sizes
