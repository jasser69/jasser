/**
 * Sistema di gestione dei contenuti leggero per il sito di Jasser
 * Questo script carica i contenuti Markdown dalle sezioni e li converte in HTML
 */

class ContentLoader {
  constructor() {
    this.sections = [
      { id: 'chi-sono', file: 'components/chi-sono.md' },
      { id: 'progetti', file: 'components/progetti.md' },
      { id: 'esperienze', file: 'components/esperienze.md' },
      { id: 'competenze', file: 'components/competenze.md' },
      { id: 'contatti', file: 'components/contatti.md' }
    ];
    
    this.markdownConverter = this.initializeMarkdownConverter();
    this.loadAllSections();
  }
  
  // Inizializza il convertitore Markdown -> HTML
  initializeMarkdownConverter() {
    // Utilizziamo una semplice funzione di conversione Markdown
    // In un ambiente di produzione, si potrebbe utilizzare una libreria come marked.js
    return function(markdown) {
      let html = markdown;
      
      // Converti titoli
      html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
      html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
      html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
      
      // Converti paragrafi
      html = html.replace(/^(?!<h[1-6]|<ul|<ol|<li|<blockquote)(.+)$/gm, '<p>$1</p>');
      
      // Converti liste
      html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
      html = html.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
      
      // Converti link
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      
      // Converti enfasi
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      
      return html;
    };
  }
  
  // Carica il contenuto di una sezione
  async loadSection(section) {
    try {
      const response = await fetch(section.file);
      if (!response.ok) {
        throw new Error(`Errore nel caricamento di ${section.file}: ${response.status}`);
      }
      
      const markdown = await response.text();
      const html = this.markdownConverter(markdown);
      
      // Inserisci il contenuto HTML nella sezione corrispondente
      const sectionElement = document.querySelector(`#${section.id} .section-content`);
      if (sectionElement) {
        sectionElement.innerHTML = html;
      }
      
      console.log(`Sezione ${section.id} caricata con successo`);
    } catch (error) {
      console.error(`Errore nel caricamento della sezione ${section.id}:`, error);
    }
  }
  
  // Carica tutte le sezioni
  loadAllSections() {
    this.sections.forEach(section => {
      this.loadSection(section);
    });
  }
  
  // Metodo per aggiornare una sezione specifica (utile per future modifiche)
  updateSection(sectionId, newContent) {
    const section = this.sections.find(s => s.id === sectionId);
    if (section) {
      const html = this.markdownConverter(newContent);
      const sectionElement = document.querySelector(`#${section.id} .section-content`);
      if (sectionElement) {
        sectionElement.innerHTML = html;
        console.log(`Sezione ${section.id} aggiornata con successo`);
        return true;
      }
    }
    return false;
  }
}

// Inizializza il caricatore di contenuti quando il DOM è pronto
window.addEventListener('DOMContentLoaded', () => {
  window.contentLoader = new ContentLoader();
});
