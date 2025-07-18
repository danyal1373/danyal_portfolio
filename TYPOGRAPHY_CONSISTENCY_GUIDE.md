# Typography Consistency Guide

## 🎯 Goal
Every piece of text in the application should read its typography values from the theme, with only situational color exceptions.

## 📋 Theme-Based Typography Rules

### ✅ DO: Use Theme Values
```javascript
// ✅ Correct - Reading from theme
<Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
  {text}
</Typography>

// ✅ Correct - SVG text using theme values
.attr('font-size', theme.typography.h6.fontSize)
.attr('font-weight', theme.typography.h6.fontWeight)
.attr('font-family', theme.typography.fontFamily)

// ✅ Correct - Custom styling that references theme
sx={{ 
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  color: theme.palette.text.primary 
}}
```

### ❌ DON'T: Use Hardcoded Values
```javascript
// ❌ Wrong - Hardcoded values
<Typography sx={{ fontSize: '18px', fontWeight: 500 }}>
  {text}
</Typography>

// ❌ Wrong - Hardcoded SVG attributes
.attr('font-size', '18px')
.attr('font-weight', 500)

// ❌ Wrong - Hardcoded CSS values
sx={{ fontSize: '1.125rem', fontWeight: 500 }}
```

## 🎨 Available Typography Variants

### Headings
- `h1`: 3.5rem, weight 100 (for large titles)
- `h2`: 2.5rem, weight 600 (for section titles)
- `h3`: 2rem, weight 500 (for subsection titles)
- `h4`: 1.75rem, weight 500 (for card titles)
- `h5`: 1.5rem, weight 500 (for medium titles)
- `h6`: 1.125rem, weight 500 (for labels, secondary text)

### Body Text
- `body1`: 1rem, weight 400 (for main content)
- `body2`: 0.875rem, weight 400 (for smaller content)

### Subtitle
- `subtitle1`: 1rem, weight 400 (for subtitles)
- `subtitle2`: 0.875rem, weight 400 (for small subtitles)

### Special
- `caption`: 0.75rem, weight 400 (for captions)
- `overline`: 0.75rem, weight 600, uppercase (for labels)

## 🔧 Implementation Examples

### Material-UI Components
```javascript
// ✅ Use variant prop
<Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
  Label Text
</Typography>

// ✅ Use variant with custom color only
<Typography variant="body1" sx={{ color: theme.palette.error.main }}>
  Error message
</Typography>
```

### SVG/D3.js Text
```javascript
// ✅ Read all values from theme
g.selectAll('text')
  .attr('font-family', theme.typography.fontFamily)
  .attr('font-size', theme.typography.h6.fontSize)
  .attr('font-weight', theme.typography.h6.fontWeight)
  .attr('fill', theme.palette.text.primary)
```

### Custom Styling
```javascript
// ✅ Reference theme values
sx={{
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  lineHeight: theme.typography.h6.lineHeight,
  color: theme.palette.text.primary,
}}
```

## 🚨 Common Pitfalls to Avoid

### 1. Hardcoded Font Sizes
```javascript
// ❌ Don't do this
fontSize: '18px'
fontSize: '1.125rem'
fontSize: { xs: 18, md: 22 }

// ✅ Do this instead
variant="h6"
// or
fontSize: theme.typography.h6.fontSize
```

### 2. Hardcoded Font Weights
```javascript
// ❌ Don't do this
fontWeight: 500
fontWeight: 600

// ✅ Do this instead
variant="h6"
// or
fontWeight: theme.typography.h6.fontWeight
```

### 3. Hardcoded Font Families
```javascript
// ❌ Don't do this
fontFamily: '"Libre Franklin", sans-serif'

// ✅ Do this instead
fontFamily: theme.typography.fontFamily
```

## 🔍 Code Review Checklist

When reviewing code, check for:

- [ ] No hardcoded `fontSize` values
- [ ] No hardcoded `fontWeight` values  
- [ ] No hardcoded `fontFamily` values
- [ ] SVG text uses `theme.typography.*` values
- [ ] Only color values are situational (when needed)
- [ ] All Typography components use `variant` prop
- [ ] Custom styling references theme values

## 🛠️ Migration Strategy

### For Existing Components:
1. Replace hardcoded values with theme references
2. Use `variant` prop for Typography components
3. Update SVG text to use theme values
4. Test visual consistency

### For New Components:
1. Always use theme values from the start
2. Use `variant` prop for Typography
3. Reference theme for custom styling
4. Only add situational colors when necessary

## 📊 Benefits

- **Consistency**: All text follows the same design system
- **Maintainability**: Change typography in one place (theme)
- **Scalability**: Easy to add new variants or modify existing ones
- **Accessibility**: Consistent font sizes and weights
- **Performance**: No duplicate hardcoded values

## 🎯 Success Metrics

- 0 hardcoded font sizes in the codebase
- 0 hardcoded font weights in the codebase
- 0 hardcoded font families in the codebase
- All text styling reads from theme
- Only situational colors are custom-defined 