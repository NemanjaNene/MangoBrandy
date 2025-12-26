/**
 * ==========================================
 * HTML SECTIONS LOADER
 * ==========================================
 * Učitava sve HTML sekcije iz sections/ foldera
 */

// Funkcija za učitavanje jedne sekcije
async function loadSection(containerId, sectionFile) {
  try {
    const response = await fetch(`sections/${sectionFile}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading ${sectionFile}:`, error);
  }
}

// Učitavanje svih sekcija
async function loadAllSections() {
  console.log('🚀 Loading all sections...');
  
  try {
    await Promise.all([
      loadSection('header', 'header.html'),
      loadSection('hero', 'hero.html'),
      loadSection('process', 'process.html'),
      loadSection('voyage', 'voyage.html'),
      loadSection('product', 'product.html'),
      loadSection('gallery', 'gallery.html'),
      loadSection('testimonials', 'testimonials.html'),
      loadSection('cta', 'cta.html'),
      loadSection('footer', 'footer.html'),
    ]);
    
    console.log('✅ All sections loaded successfully!');
    
    // Initialize app after all sections are loaded
    if (typeof initApp === 'function') {
      initApp();
    }
  } catch (error) {
    console.error('❌ Error loading sections:', error);
  }
}

// Pokreni učitavanje kada je DOM spreman
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAllSections);
} else {
  loadAllSections();
}
