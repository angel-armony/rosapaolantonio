//Bottone scopri i miei servizi -------> servizi offerti
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.hero-button');
    
    button.addEventListener('click', () => {
        const section = document.querySelector('.servizi-offerti');
        if (section) {
            smoothScroll(section, 1000); // 1000ms = 1s per uno scroll morbido
        }
    });
});

/*carosello*/

document.addEventListener('DOMContentLoaded', () => {
    const carosello = document.querySelector('#carosello');
    const indicators = document.querySelectorAll('.indicator');
    const items = document.querySelectorAll('.carosello-item');
    let currentIndex = 0;
    const totalItems = items.length;

    // Imposta larghezza dinamica del carosello
    carosello.style.width = `${100 * totalItems}%`;
    items.forEach(item => {
        item.style.width = `${100 / totalItems}%`;
    });

    let startX = 0;
    let endX = 0;

    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function goToSlide(index) {
        currentIndex = (index + totalItems) % totalItems;
        carosello.style.transform = `translateX(-${(100 / totalItems) * currentIndex}%)`;
        updateIndicators(currentIndex);
    }

    carosello.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carosello.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        if (deltaX > 50) {
            goToSlide(currentIndex - 1); // swipe right
        } else if (deltaX < -50) {
            goToSlide(currentIndex + 1); // swipe left
        }
    });
});


// on click logo ----> home

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');

    logo.addEventListener('click', () => {
        window.location.href = 'index.html'; // Assicurati che questo percorso sia corretto
    });
});



//certificati 

document.addEventListener("DOMContentLoaded", function () {
    const certificati = document.querySelectorAll('.certificazione-img');
    const pagineContainer = document.getElementById('pagine');
    const certificazioniContainer = document.getElementById('certificazioni');
    
    let pageIndex = 0;  // Indice della pagina corrente
    const itemsPerPage = 2;  // Numero di certificati per pagina

    // Funzione per mostrare i certificati in base alla pagina
    function showPage(page) {
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;

        certificati.forEach((certificato, index) => {
            if (index >= start && index < end) {
                certificato.style.display = 'block';  // Mostra il certificato
            } else {
                certificato.style.display = 'none';  // Nascondi il certificato
            }
        });

        // Aggiornare lo stile dei numeri di pagina
        const pages = document.querySelectorAll('.pagina');
        pages.forEach((pagina, index) => {
            if (index === page) {
                pagina.classList.add('pagina-active');  // Applica lo stile semibold per la pagina attiva
                pagina.classList.remove('pagina-inactive');
            } else {
                pagina.classList.add('pagina-inactive');  // Applica lo stile sottolineato per le altre pagine
                pagina.classList.remove('pagina-active');
            }
        });
    }

    // Funzione per creare i numeri di pagina dinamicamente
    function createPagination() {
        const totalPages = Math.ceil(certificati.length / itemsPerPage);

        for (let i = 0; i < totalPages; i++) {
            const pageElement = document.createElement('span');
            pageElement.textContent = i + 1;
            pageElement.classList.add('pagina');
            pageElement.addEventListener('click', () => {
                pageIndex = i;
                showPage(pageIndex);
            });
            pagineContainer.appendChild(pageElement);
        }
    }

    // Inizializza la pagina iniziale e la paginazione
    createPagination();
    showPage(pageIndex);
});





//cambio img da homemobile tablet a home desktop
window.addEventListener('load', function() {
    const img = document.querySelector('img[src*="imgHome.png"]');
    
    if (img && window.innerWidth >= 1025) {
        img.src = img.src.replace('imgHome.png', 'imgHomeDesktop.png');
    }
});

window.addEventListener('resize', function() {
    const img = document.querySelector('img[src*="imgHome"], img[src*="imgHomeDesktop"]');
    
    if (img) {
        if (window.innerWidth >= 1025) {
            img.src = img.src.replace('imgHome.png', 'imgHomeDesktop.png');
        } else {
            img.src = img.src.replace('imgHomeDesktop.png', 'imgHome.png');
        }
    }
});


// animazione imagine scroll fino alla fine del contenuto 
function initImageScrollSimple() {
  if (window.innerWidth <= 1025) return;

  const image = document.querySelector('.images-hero');
  const card = document.querySelector('.card-prima-visita');

  if (!image || !card) {
    console.log('Elementi non trovati');
    return;
  }

  function updateScroll() {
    // Ottieni le posizioni senza transform
    const originalTransform = image.style.transform;
    image.style.transform = '';
    
    const imageRect = image.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    
    // Ripristina il transform
    image.style.transform = originalTransform;
    
    // Calcola quanto deve muoversi l'immagine per allineare i bottom
    const imageBottom = imageRect.top + imageRect.height;
    const cardBottom = cardRect.top + cardRect.height;
    const maxMovement = cardBottom - imageBottom;
    
    console.log('--- Debug ---');
    console.log('Image bottom:', imageBottom);
    console.log('Card bottom:', cardBottom);
    console.log('Max movement needed:', maxMovement);
    
    if (maxMovement <= 0) {
      image.style.transform = 'translateY(0px)';
      return;
    }
    
    // Calcola basandosi sulla visibilità della card nella viewport
    const viewportHeight = window.innerHeight;
    const cardVisibleTop = Math.max(0, viewportHeight - cardRect.bottom);
    const cardVisibleBottom = Math.max(0, cardRect.top);
    
    if (cardRect.top >= viewportHeight * 0.5) {
      // Non ancora iniziato
      image.style.transform = 'translateY(0px)';
    } else if (cardRect.bottom <= viewportHeight) {
      // Card completamente visibile - applica il movimento completo
      image.style.transform = `translateY(${maxMovement}px)`;
      console.log('FINALE: Card completamente visibile, translateY:', maxMovement);
    } else {
      // In transizione
      const scrollProgress = (viewportHeight * 0.5 - cardRect.top) / (cardRect.height - viewportHeight * 0.5);
      const progress = Math.min(1, Math.max(0, scrollProgress));
      const translateY = Math.round(progress * maxMovement);
      
      image.style.transform = `translateY(${translateY}px)`;
      console.log('Progress:', (progress * 100).toFixed(1) + '%', 'TranslateY:', translateY);
    }
  }

  let rafId;
  function onScroll() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateScroll);
  }

  updateScroll();
  
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateScroll);

  return function cleanup() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', updateScroll);
    cancelAnimationFrame(rafId);
    image.style.transform = '';
  };
}

function checkAndInitImageScroll() {
  let cleanup = null;

  function toggle() {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
    
    if (window.innerWidth > 1025) {
      cleanup = initImageScrollSimple();
    }
  }

  toggle();
  
  let resizeDebounce;
  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(toggle, 200);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAndInitImageScroll);
} else {
  checkAndInitImageScroll();
}


// cambiare immagini con le frecce
document.addEventListener('DOMContentLoaded', function() {
    // Carica il font di Google se non è già presente
    if (!document.querySelector('link[href*="Material+Symbols"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
        document.head.appendChild(link);
    }

    // --- SELETTORI ---
    const caroselloContainer = document.querySelector('.carosello-container'); 
    const caroselloWrapper = document.querySelector('.carosello-wrapper');
    const carosello = document.querySelector('.carosello');
    const indicatorsContainer = document.querySelector('.carosello-indicators');

    if (!caroselloContainer || !caroselloWrapper || !carosello || !indicatorsContainer) {
        console.error("Attenzione: uno degli elementi necessari per il carosello non è stato trovato nel DOM.");
        return;
    }

    const items = carosello.querySelectorAll('.carosello-item');
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    const totalItems = items.length;
    let currentIndex = 0;
    let prevBtn = null;
    let nextBtn = null;

    // Aggiorna stato carosello
    function updateCarouselState() {
        const translateXValue = -currentIndex * (100 / totalItems);
        carosello.style.transform = `translateX(${translateXValue}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        if (prevBtn && nextBtn) {
            prevBtn.disabled = (currentIndex === 0);
            nextBtn.disabled = (currentIndex === totalItems - 1);
        }
    }

    // Posiziona frecce rispetto al wrapper
    function positionArrows() {
        if (!prevBtn || !nextBtn) return;
        const containerRect = caroselloContainer.getBoundingClientRect();
        const wrapperRect = caroselloWrapper.getBoundingClientRect();
        const GAP = 50; // distanza dal bordo wrapper

        prevBtn.style.left = (wrapperRect.left - containerRect.left - GAP) + 'px';
        prevBtn.style.right = 'auto';
        nextBtn.style.right = (containerRect.right - wrapperRect.right - GAP) + 'px';
        nextBtn.style.left = 'auto';

        const centerY = (wrapperRect.top - containerRect.top) + (wrapperRect.height / 2);
        prevBtn.style.top = centerY + 'px';
        nextBtn.style.top = centerY + 'px';
    }

    // Crea frecce
    function createArrows() {
        if (document.querySelector('.carosello-arrow')) return;

        prevBtn = document.createElement('button');
        prevBtn.className = 'carosello-arrow carosello-arrow-left';
        prevBtn.setAttribute('aria-label', 'Immagine precedente');
        prevBtn.innerHTML = '<span class="material-symbols-outlined">arrow_back_ios</span>';
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) { currentIndex--; updateCarouselState(); }
        });

        nextBtn = document.createElement('button');
        nextBtn.className = 'carosello-arrow carosello-arrow-right';
        nextBtn.setAttribute('aria-label', 'Immagine successiva');
        nextBtn.innerHTML = '<span class="material-symbols-outlined">arrow_forward_ios</span>';
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalItems - 1) { currentIndex++; updateCarouselState(); }
        });

        caroselloContainer.appendChild(prevBtn);
        caroselloContainer.appendChild(nextBtn);

        updateCarouselState();
        requestAnimationFrame(positionArrows);
    }

    // Rimuovi frecce
    function removeArrows() {
        if (prevBtn) prevBtn.remove();
        if (nextBtn) nextBtn.remove();
        prevBtn = null;
        nextBtn = null;
    }

    // Mostra/nasconde frecce a seconda della larghezza
    function handleResize() {
        if (window.innerWidth >= 1024) {
            createArrows();
            positionArrows();
        } else {
            removeArrows();
        }
    }

    // --- Swipe ---
    let touchStartX = 0;
    carosello.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carosello.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50 && currentIndex < totalItems - 1) {
            currentIndex++;
        } else if (touchEndX > touchStartX + 50 && currentIndex > 0) {
            currentIndex--;
        }
        updateCarouselState();
    });

    // Indicatori
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarouselState();
        });
    });

    // --- Init ---
    handleResize();
    updateCarouselState();
    window.addEventListener('resize', () => {
        handleResize();
        positionArrows();
    });
    window.addEventListener('load', positionArrows);
});


// Funzione helper per verificare la larghezza dello schermo
function isDesktop() {
  return window.innerWidth > 1024;
}

//Allineare il titolo della prima visita alla card 
function aggiornaLarghezzaEPosizioneCard() {
  const titolo = document.querySelector('.title-prima-visita');
  const descrizione = document.querySelector('.descrizione-prima-visita');
  const card = document.querySelector('.card-prima-visita');

  if (!titolo || !descrizione || !card) return;

  // Se lo schermo è <= 1024px, resetta gli stili e esci
  if (!isDesktop()) {
    card.style.transform = '';
    card.style.width = '';
    card.style.maxWidth = '';
    card.style.opacity = '';
    card.style.visibility = '';
    return;
  }

  const titoloRect = titolo.getBoundingClientRect();
  const descrizioneRect = descrizione.getBoundingClientRect();

  const paddingLeft = parseFloat(window.getComputedStyle(descrizione).paddingLeft);
  const paddingRight = parseFloat(window.getComputedStyle(descrizione).paddingRight);

  const offsetX = (titoloRect.left - descrizioneRect.left) - paddingLeft;

  const descrizioneWidth = descrizioneRect.width - paddingLeft - paddingRight;
  const nuovaLarghezza = descrizioneWidth - offsetX;

  card.style.transform = `translateX(${offsetX}px)`;
  card.style.width = `${nuovaLarghezza}px`;
  card.style.maxWidth = 'none';

  // Rendi visibile la card solo dopo aver applicato le modifiche
  card.style.opacity = '1';
  card.style.visibility = 'visible';
}

window.addEventListener('load', aggiornaLarghezzaEPosizioneCard);
window.addEventListener('resize', aggiornaLarghezzaEPosizioneCard);


//titoli della prima visita
function initTitleAlignment() {
  function alignTitles() {
    const titles = document.querySelectorAll('.title-prima-visita');
    
    titles.forEach(title => {
      const heroSection = title.closest('.hero-prima-visita');
      
      // Se lo schermo è <= 1024px, resetta tutti gli stili
      if (!isDesktop()) {
        title.style.maxWidth = '';
        title.style.whiteSpace = '';
        
        if (heroSection && heroSection.nextElementSibling) {
          heroSection.nextElementSibling.style.paddingTop = '';
        }
        return;
      }
      
      // Reset stili
      title.style.maxWidth = '';
      title.style.whiteSpace = '';
      
      // Trova la card
      let card = null;
      if (heroSection) {
        const nextSection = heroSection.nextElementSibling;
        if (nextSection) {
          card = nextSection.querySelector('.card-prima-visita');
        }
      }
      
      if (!card) return;
      
      // Aspetta che la card sia visibile
      if (window.getComputedStyle(card).opacity === '0') {
        setTimeout(() => alignTitles(), 100);
        return;
      }
      
      // Ottieni la larghezza della card
      const cardWidth = card.offsetWidth;
      
      // Misura il testo
      const temp = document.createElement('span');
      temp.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-size:32px;font-weight:600;';
      temp.textContent = title.textContent;
      document.body.appendChild(temp);
      const textWidth = temp.offsetWidth;
      document.body.removeChild(temp);
      
      // Prima memorizza l'altezza del titolo su una riga
      title.style.whiteSpace = 'nowrap';
      const singleLineHeight = title.offsetHeight;
      
      // Applica stili al titolo
      title.style.maxWidth = cardWidth + 'px';
      
      if (textWidth > cardWidth) {
        title.style.whiteSpace = 'normal';
        
        // Aspetta che il reflow avvenga
        requestAnimationFrame(() => {
          const multiLineHeight = title.offsetHeight;
          const heightDifference = multiLineHeight - singleLineHeight;
          
          // Se il titolo è cresciuto in altezza, aggiungi solo la differenza
          if (heightDifference > 0 && heroSection.nextElementSibling) {
            const nextSection = heroSection.nextElementSibling;
            // Aggiungi SOLO la differenza di altezza, non toccare il margin negativo!
            nextSection.style.paddingTop = heightDifference + 'px';
          }
        });
      } else {
        title.style.whiteSpace = 'nowrap';
        // Reset padding se il titolo sta su una riga
        if (heroSection.nextElementSibling) {
          heroSection.nextElementSibling.style.paddingTop = '0';
        }
      }
    });
  }
  
  // Rimuovi stili precedenti che potrebbero interferire
  const oldStyles = document.querySelectorAll('style');
  oldStyles.forEach(style => {
    if (style.textContent && style.textContent.includes('540px')) {
      style.remove();
    }
  });
  
  // Inizializza solo se desktop
  if (isDesktop()) {
    setTimeout(alignTitles, 1000);
  }
  
  // Resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(alignTitles, 200);
  });
}

// Inizializza
document.addEventListener('DOMContentLoaded', () => {
  // Pulisci padding precedenti
  document.querySelectorAll('.descrizione-prima-visita').forEach(el => {
    el.style.paddingTop = '';
  });
  
  initTitleAlignment();
});




