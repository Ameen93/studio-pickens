const fs = require('fs');
const path = require('path');

// Validate database records
function validateRecords() {
  console.log('🔍 Validating Studio Pickens Database Records...\n');

  const dataDir = path.join(__dirname, 'data');
  const publicDir = path.join(__dirname, 'public');
  
  // Check if data directory exists
  if (!fs.existsSync(dataDir)) {
    console.error('❌ Data directory not found');
    return false;
  }

  const files = ['hero.json', 'work.json', 'faq.json', 'contact.json'];
  let allValid = true;

  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log(`✅ ${file} - Valid JSON, ${Array.isArray(data) ? data.length : 'object'} records`);
        
        // Validate images for each record type
        if (file === 'hero.json') {
          validateHeroImages(data, publicDir);
        } else if (file === 'work.json') {
          validateWorkImages(data, publicDir);
        }
      } catch (error) {
        console.error(`❌ ${file} - Invalid JSON:`, error.message);
        allValid = false;
      }
    } else {
      console.error(`❌ ${file} - File not found`);
      allValid = false;
    }
  });

  console.log(allValid ? '\n🎉 All records are valid!' : '\n⚠️  Some records have issues');
  return allValid;
}

function validateHeroImages(heroData, publicDir) {
  // Check background images
  if (heroData.backgroundImages) {
    heroData.backgroundImages.forEach((bg, index) => {
      const imagePath = path.join(publicDir, bg.image);
      if (fs.existsSync(imagePath)) {
        console.log(`   📸 Background ${index + 1}: ${bg.image} ✅`);
      } else {
        console.log(`   📸 Background ${index + 1}: ${bg.image} ❌`);
      }
    });
  }
  
  // Check polaroids
  if (heroData.polaroids) {
    heroData.polaroids.forEach((polaroid, index) => {
      const imagePath = path.join(publicDir, polaroid.image);
      if (fs.existsSync(imagePath)) {
        console.log(`   🖼️  Polaroid ${index + 1}: ${polaroid.image} ✅`);
      } else {
        console.log(`   🖼️  Polaroid ${index + 1}: ${polaroid.image} ❌`);
      }
    });
  }
}

function validateWorkImages(workData, publicDir) {
  workData.forEach((project, index) => {
    const imagePath = path.join(publicDir, project.image || project.src);
    if (fs.existsSync(imagePath)) {
      console.log(`   🎨 Work ${index + 1}: ${project.title} - ${project.image || project.src} ✅`);
    } else {
      console.log(`   🎨 Work ${index + 1}: ${project.title} - ${project.image || project.src} ❌`);
    }
  });
}

// Run validation
validateRecords();