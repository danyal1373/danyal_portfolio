# Typography Fix Plan

## 🎯 **Goal: Achieve 100% Theme-Based Typography**

Based on the analysis, we found **94+ hardcoded typography values** that need to be converted to use theme values.

## 📋 **Priority Fixes (Most Critical)**

### **1. Large Page Titles (fontSize: { xs: '50px', md: '80px' })**
**Files to fix:** AboutPage.jsx, ProjectsPage.jsx, PhotosPage.jsx, ResearchPage.jsx, ResumePage.jsx

**Current:**
```javascript
fontSize: { xs: '50px', md: '80px' }
fontWeight: 100
```

**Fix to:**
```javascript
fontSize: { xs: '2.5rem', md: '5rem' }
fontWeight: theme.typography.h1.fontWeight
```

### **2. Common Font Weight Patterns**

#### **fontWeight: 500 → theme.typography.h6.fontWeight**
**Files:** Multiple components
**Current:** `fontWeight: 500`
**Fix to:** `fontWeight: theme.typography.h6.fontWeight`

#### **fontWeight: 600 → theme.typography.h2.fontWeight**
**Files:** MarkdownRenderer.jsx, ProjectDetailPage.jsx, etc.
**Current:** `fontWeight: 600`
**Fix to:** `fontWeight: theme.typography.h2.fontWeight`

#### **fontWeight: 400 → theme.typography.body1.fontWeight**
**Files:** Multiple components
**Current:** `fontWeight: 400`
**Fix to:** `fontWeight: theme.typography.body1.fontWeight`

### **3. Hardcoded Font Sizes**

#### **fontSize: '18' → theme.typography.h6.fontSize**
**Files:** AboutPage.jsx
**Current:** `fontSize: 18`
**Fix to:** `fontSize: theme.typography.h6.fontSize`

#### **fontSize: '13' → theme.typography.body2.fontSize**
**Files:** AboutPage.jsx
**Current:** `fontSize: 13`
**Fix to:** `fontSize: theme.typography.body2.fontSize`

#### **fontSize: '14' → theme.typography.body2.fontSize**
**Files:** ResearchPage.jsx
**Current:** `fontSize: 14`
**Fix to:** `fontSize: theme.typography.body2.fontSize`

## 🛠️ **Systematic Fix Process**

### **Step 1: Fix Page Titles (5 files)**
```bash
# AboutPage.jsx - DONE ✅
# ProjectsPage.jsx
# PhotosPage.jsx  
# ResearchPage.jsx
# ResumePage.jsx
```

### **Step 2: Fix Common Font Weights**
```bash
# Replace all fontWeight: 500 with theme.typography.h6.fontWeight
# Replace all fontWeight: 600 with theme.typography.h2.fontWeight
# Replace all fontWeight: 400 with theme.typography.body1.fontWeight
# Replace all fontWeight: 100 with theme.typography.h1.fontWeight
```

### **Step 3: Fix Hardcoded Font Sizes**
```bash
# Replace all fontSize: 18 with theme.typography.h6.fontSize
# Replace all fontSize: 13 with theme.typography.body2.fontSize
# Replace all fontSize: 14 with theme.typography.body2.fontSize
```

### **Step 4: Fix Responsive Font Sizes**
```bash
# Replace fontSize: { xs: '1rem', md: '1.25rem' } with theme values
# Replace fontSize: { xs: '2rem', md: '2.5rem' } with theme values
```

## 📁 **File-by-File Fix List**

### **High Priority (Most Issues)**
1. **App.js** - 18 hardcoded values
2. **AboutPage.jsx** - 12 hardcoded values ✅ (Partially fixed)
3. **ProjectsPage.jsx** - 10 hardcoded values
4. **ResumePage.jsx** - 10 hardcoded values
5. **ResearchPage.jsx** - 10 hardcoded values

### **Medium Priority**
6. **PhotosPage.jsx** - 4 hardcoded values
7. **ProjectDetailPage.jsx** - 8 hardcoded values
8. **MarkdownRenderer.jsx** - 9 hardcoded values
9. **PasswordPrompt.jsx** - 3 hardcoded values

### **Low Priority**
10. **CategoryProjectCard.jsx** - 3 hardcoded values
11. **GlassyProjectCard.jsx** - 2 hardcoded values
12. **HeroHeader.jsx** - 1 hardcoded value
13. **PhotoCard.jsx** - 1 hardcoded value
14. **ProjectCard.jsx** - 1 hardcoded value
15. **SkillCard.jsx** - 1 hardcoded value
16. **SpiderChart.jsx** - 2 hardcoded values
17. **SwarmMap.jsx** - 1 hardcoded value
18. **SwarmPage.jsx** - 1 hardcoded value
19. **AstrophotographyPage.jsx** - 2 hardcoded values

## 🔧 **Automated Fix Commands**

### **For Font Weights:**
```bash
# Replace fontWeight: 500
find src -name "*.jsx" -exec sed -i 's/fontWeight: 500/fontWeight: theme.typography.h6.fontWeight/g' {} \;

# Replace fontWeight: 600  
find src -name "*.jsx" -exec sed -i 's/fontWeight: 600/fontWeight: theme.typography.h2.fontWeight/g' {} \;

# Replace fontWeight: 400
find src -name "*.jsx" -exec sed -i 's/fontWeight: 400/fontWeight: theme.typography.body1.fontWeight/g' {} \;

# Replace fontWeight: 100
find src -name "*.jsx" -exec sed -i 's/fontWeight: 100/fontWeight: theme.typography.h1.fontWeight/g' {} \;
```

### **For Font Sizes:**
```bash
# Replace fontSize: 18
find src -name "*.jsx" -exec sed -i 's/fontSize: 18/fontSize: theme.typography.h6.fontSize/g' {} \;

# Replace fontSize: 13
find src -name "*.jsx" -exec sed -i 's/fontSize: 13/fontSize: theme.typography.body2.fontSize/g' {} \;

# Replace fontSize: 14
find src -name "*.jsx" -exec sed -i 's/fontSize: 14/fontSize: theme.typography.body2.fontSize/g' {} \;
```

## ✅ **Success Criteria**

After completing all fixes:
- [ ] 0 hardcoded `fontSize` values
- [ ] 0 hardcoded `fontWeight` values  
- [ ] 0 hardcoded `fontFamily` values
- [ ] All typography reads from theme
- [ ] Visual consistency maintained
- [ ] No breaking changes

## 🧪 **Testing Strategy**

1. **Visual Testing:** Check each page renders correctly
2. **Theme Testing:** Verify typography changes with theme changes
3. **Responsive Testing:** Test on different screen sizes
4. **Automated Testing:** Run the detection script again

## 📈 **Progress Tracking**

- **Total Issues:** 94+
- **Fixed:** 3 (AboutPage.jsx)
- **Remaining:** 91+
- **Progress:** 3% complete

## 🎯 **Next Steps**

1. **Run automated fix commands** for common patterns
2. **Manually fix** complex responsive font sizes
3. **Test thoroughly** after each batch of fixes
4. **Run detection script** to verify progress
5. **Repeat** until 100% theme-based typography achieved 