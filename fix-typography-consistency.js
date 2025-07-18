#!/usr/bin/env node

/**
 * Typography Consistency Fixer
 * 
 * This script helps identify and fix hardcoded typography values in your codebase.
 * Run this script to find all instances of hardcoded font sizes, weights, and families.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns to search for hardcoded typography values
const patterns = {
  fontSize: [
    /fontSize:\s*['"`](\d+px|\d+rem|\d+em)['"`]/g,
    /fontSize:\s*['"`](\d+)['"`]/g,
    /font-size:\s*['"`](\d+px|\d+rem|\d+em)['"`]/g,
  ],
  fontWeight: [
    /fontWeight:\s*['"`](\d+)['"`]/g,
    /fontWeight:\s*(\d+)(?!\s*[,}])/g,
    /font-weight:\s*['"`](\d+)['"`]/g,
  ],
  fontFamily: [
    /fontFamily:\s*['"`][^'"`]*Libre Franklin[^'"`]*['"`]/g,
    /font-family:\s*['"`][^'"`]*Libre Franklin[^'"`]*['"`]/g,
  ]
};

// Theme mapping for replacements
const themeMapping = {
  fontSize: {
    '18px': 'theme.typography.h6.fontSize',
    '1.125rem': 'theme.typography.h6.fontSize',
    '16px': 'theme.typography.body1.fontSize',
    '1rem': 'theme.typography.body1.fontSize',
    '14px': 'theme.typography.body2.fontSize',
    '0.875rem': 'theme.typography.body2.fontSize',
    '12px': 'theme.typography.caption.fontSize',
    '0.75rem': 'theme.typography.caption.fontSize',
  },
  fontWeight: {
    '500': 'theme.typography.h6.fontWeight',
    '600': 'theme.typography.h2.fontWeight',
    '400': 'theme.typography.body1.fontWeight',
    '300': 'theme.typography.h1.fontWeight',
  }
};

function findHardcodedTypography() {
  const jsFiles = glob.sync('src/**/*.{js,jsx,ts,tsx}');
  const issues = [];

  jsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, lineNumber) => {
      // Check for hardcoded fontSize
      patterns.fontSize.forEach(pattern => {
        const matches = line.match(pattern);
        if (matches) {
          issues.push({
            file,
            line: lineNumber + 1,
            type: 'fontSize',
            value: matches[1],
            suggestion: themeMapping.fontSize[matches[1]] || 'theme.typography.h6.fontSize'
          });
        }
      });

      // Check for hardcoded fontWeight
      patterns.fontWeight.forEach(pattern => {
        const matches = line.match(pattern);
        if (matches) {
          issues.push({
            file,
            line: lineNumber + 1,
            type: 'fontWeight',
            value: matches[1],
            suggestion: themeMapping.fontWeight[matches[1]] || 'theme.typography.h6.fontWeight'
          });
        }
      });

      // Check for hardcoded fontFamily
      patterns.fontFamily.forEach(pattern => {
        const matches = line.match(pattern);
        if (matches) {
          issues.push({
            file,
            line: lineNumber + 1,
            type: 'fontFamily',
            value: matches[0],
            suggestion: 'theme.typography.fontFamily'
          });
        }
      });
    });
  });

  return issues;
}

function generateReport(issues) {
  console.log('\n🔍 Typography Consistency Report\n');
  console.log(`Found ${issues.length} hardcoded typography values:\n`);

  const groupedIssues = issues.reduce((acc, issue) => {
    if (!acc[issue.file]) acc[issue.file] = [];
    acc[issue.file].push(issue);
    return acc;
  }, {});

  Object.entries(groupedIssues).forEach(([file, fileIssues]) => {
    console.log(`📁 ${file}:`);
    fileIssues.forEach(issue => {
      console.log(`  Line ${issue.line}: ${issue.type} = "${issue.value}"`);
      console.log(`    → Replace with: ${issue.suggestion}`);
    });
    console.log('');
  });

  // Generate summary
  const summary = {
    fontSize: issues.filter(i => i.type === 'fontSize').length,
    fontWeight: issues.filter(i => i.type === 'fontWeight').length,
    fontFamily: issues.filter(i => i.type === 'fontFamily').length,
  };

  console.log('📊 Summary:');
  console.log(`  - Font Size issues: ${summary.fontSize}`);
  console.log(`  - Font Weight issues: ${summary.fontWeight}`);
  console.log(`  - Font Family issues: ${summary.fontFamily}`);
  console.log(`  - Total issues: ${issues.length}`);
}

function generateFixCommands(issues) {
  console.log('\n🛠️  Suggested Fix Commands:\n');
  
  const groupedIssues = issues.reduce((acc, issue) => {
    if (!acc[issue.file]) acc[issue.file] = [];
    acc[issue.file].push(issue);
    return acc;
  }, {});

  Object.entries(groupedIssues).forEach(([file, fileIssues]) => {
    console.log(`# Fix ${file}:`);
          fileIssues.forEach(issue => {
        if (issue.value && issue.value !== 'undefined') {
          const escapedValue = issue.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const escapedSuggestion = issue.suggestion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          console.log(`sed -i 's/${escapedValue}/${escapedSuggestion}/g' ${file}`);
        }
      });
    console.log('');
  });
}

// Main execution
if (require.main === module) {
  console.log('🔍 Scanning for hardcoded typography values...\n');
  
  const issues = findHardcodedTypography();
  
  if (issues.length === 0) {
    console.log('✅ No hardcoded typography values found! Your codebase is already consistent.');
  } else {
    generateReport(issues);
    generateFixCommands(issues);
    
    console.log('💡 Next Steps:');
    console.log('1. Review the issues above');
    console.log('2. Use the suggested fix commands or manually update the files');
    console.log('3. Test the visual consistency after changes');
    console.log('4. Run this script again to verify all issues are resolved');
  }
}

module.exports = { findHardcodedTypography, generateReport }; 