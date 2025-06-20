const fs = require('fs');
const path = require('path');

// Function to revert the project cards
function revertProjectCards() {
  try {
    const backupPath = path.join(__dirname, 'src', 'components', 'GlassyProjectCard.backup.jsx');
    const currentPath = path.join(__dirname, 'src', 'components', 'GlassyProjectCard.jsx');
    
    if (fs.existsSync(backupPath)) {
      const backupContent = fs.readFileSync(backupPath, 'utf8');
      fs.writeFileSync(currentPath, backupContent);
      console.log('✅ Project cards reverted to original design!');
      console.log('📝 You can now delete the backup file if you want: src/components/GlassyProjectCard.backup.jsx');
    } else {
      console.log('❌ Backup file not found. Cannot revert.');
    }
  } catch (error) {
    console.error('❌ Error reverting project cards:', error.message);
  }
}

// Function to restore the enhanced design
function restoreEnhancedCards() {
  try {
    const enhancedPath = path.join(__dirname, 'src', 'components', 'GlassyProjectCard.enhanced.jsx');
    const currentPath = path.join(__dirname, 'src', 'components', 'GlassyProjectCard.jsx');
    
    if (fs.existsSync(enhancedPath)) {
      const enhancedContent = fs.readFileSync(enhancedPath, 'utf8');
      fs.writeFileSync(currentPath, enhancedContent);
      console.log('✅ Enhanced project cards restored!');
    } else {
      console.log('❌ Enhanced file not found. Cannot restore.');
    }
  } catch (error) {
    console.error('❌ Error restoring enhanced cards:', error.message);
  }
}

// Check command line arguments
const command = process.argv[2];

if (command === 'revert') {
  revertProjectCards();
} else if (command === 'restore') {
  restoreEnhancedCards();
} else {
  console.log('🎨 Project Cards Management Script');
  console.log('');
  console.log('Usage:');
  console.log('  node revert-cards.js revert   - Revert to original design');
  console.log('  node revert-cards.js restore  - Restore enhanced design');
  console.log('');
  console.log('Current status: Enhanced design with fluid glossy UI effects');
  console.log('✨ Features: 3D tilt, spring animations, floating particles, enhanced gradients');
} 