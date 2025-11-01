// Set year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scroll for "Vezi galeria"
    document.getElementById('scroll-gal').addEventListener('click', function(){
      document.querySelector('#galerie').scrollIntoView({behavior:'smooth', block:'start'});
    });

    // Simple reveal on scroll with staggered delays
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el = entry.target;
          const delay = el.getAttribute('data-reveal-delay') || 0;
          setTimeout(()=> el.classList.add('visible'), delay);
          io.unobserve(el);
        }
      });
    }, {threshold: 0.12});

    reveals.forEach(el=>{
      io.observe(el);
    });

    // Small demo animation for hero blocks when clicking "Micuță animație"
    document.getElementById('play-demo').addEventListener('click', function(){
      const blocks = document.querySelectorAll('.hero-right .block');
      blocks.forEach((b,i)=>{
        b.animate([
          { transform: 'translateY(0) scale(1)', opacity:1 },
          { transform: 'translateY(-18px) scale(1.03)', opacity:0.95 },
          { transform: 'translateY(0) scale(1)', opacity:1 }
        ],{
          duration: 900 + i*120,
          easing: 'cubic-bezier(.2,.9,.2,1)'
        });
      });
    });

    // Hover tilt effect for blocks (subtle) - pointermove-based for desktop
    const supportsPointer = window.matchMedia('(hover:hover)').matches;
    if(supportsPointer){
      document.querySelectorAll('.block, .card').forEach(el=>{
        el.addEventListener('pointermove', (ev)=>{
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width/2;
          const cy = rect.top + rect.height/2;
          const dx = (ev.clientX - cx) / rect.width;
          const dy = (ev.clientY - cy) / rect.height;
          el.style.transform = `perspective(600px) rotateX(${(-dy*6).toFixed(2)}deg) rotateY(${(dx*8).toFixed(2)}deg) translateZ(0)`;
          el.style.boxShadow = `${-dx*18}px ${Math.abs(dy)*18}px 40px rgba(2,6,23,0.5)`;
        });
        el.addEventListener('pointerleave', ()=> {
          el.style.transform = '';
          el.style.boxShadow = '';
        });
      });
    }

    // Contact form demo handler (no server) — just prevents submit and shows a small animation -> you can connect to backend later
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Se trimite...';
      setTimeout(()=>{
        btn.textContent = 'Trimis ✓';
        btn.disabled = false;
        form.reset();
        btn.animate([{transform:'scale(1)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:500, easing:'ease-out'});
      }, 900);
    });
    document.getElementById('clear').addEventListener('click', ()=> form.reset());

    // Accessibility: keyboard focus outline
    document.addEventListener('keydown', function(e){
      if(e.key === 'Tab') document.documentElement.classList.add('show-focus');
    });


//mobil carusel galerie logica

// Carusel simplu cu auto-slide pentru mobil
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (track && items.length) {
  let index = 0;
  let autoSlide;
  const interval = 4000; // 4 secunde între slide-uri

  const updateCarousel = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const nextSlide = () => {
    index = (index + 1) % items.length;
    updateCarousel();
  };

  const prevSlide = () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
  };

  // Auto slide logic
  const startAuto = () => {
    stopAuto(); // evităm dublarea
    autoSlide = setInterval(nextSlide, interval);
  };

  const stopAuto = () => {
    if (autoSlide) clearInterval(autoSlide);
  };

  // Butoane
  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAuto(); // repornim cronometru
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAuto();
  });

  // Swipe pe mobil
  let startX = 0;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAuto(); // oprește temporar auto slide la atingere
  });

  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
    startAuto(); // reia auto slide după swipe
  });

  // Pornim auto slide doar pe ecrane mici
  if (window.innerWidth <= 768) startAuto();

  // Oprim când utilizatorul părăsește pagina
  window.addEventListener('blur', stopAuto);
  window.addEventListener('focus', startAuto);
}


//mobil carusel galerie logica