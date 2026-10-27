/* ============================================================
   PREPARAMENTE — Landing page interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Sticky header ---------- */
  var header = document.querySelector('.site-header');
  function onScrollHeader() {
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Scrollspy ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function spy() {
    var pos = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) current = sec;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
    });
  }
  if (sections.length) {
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    spy();
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
  var pending = Array.prototype.slice.call(reveals);
  function revealPending() {
    if (!pending.length) { window.removeEventListener('scroll', revealPending); return; }
    var vh = window.innerHeight;
    pending = pending.filter(function (el) {
      if (el.classList.contains('in')) return false;
      var r = el.getBoundingClientRect();
      if (r.top < vh - 20 && r.bottom > 0) { el.classList.add('in'); return false; }
      return true;
    });
  }
  window.addEventListener('scroll', revealPending, { passive: true });
  window.addEventListener('resize', revealPending);
  window.addEventListener('load', revealPending);
  setTimeout(revealPending, 1200);

  /* ---------- Eco gallery ---------- */
  var gallery = document.getElementById('ecoGallery');
  var prev = document.getElementById('ecoPrev');
  var next = document.getElementById('ecoNext');
  if (gallery && prev && next) {
    function slide(dir) {
      var slides = gallery.querySelectorAll('.eco-slide');
      if (!slides.length) return;
      var gap = parseFloat(getComputedStyle(gallery).columnGap || getComputedStyle(gallery).gap) || 16;
      var step = slides[0].getBoundingClientRect().width + gap;
      gallery.scrollBy({ left: dir * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
    next.addEventListener('click', function () { slide(1); });
    prev.addEventListener('click', function () { slide(-1); });

    gallery.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { slide(1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { slide(-1); e.preventDefault(); }
    });
  }


  /* Arraste com mouse; toque usa a rolagem horizontal nativa. */
  if (gallery) {
    var dragStart = null;
    var dragScroll = 0;
    gallery.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragStart = e.clientX;
      dragScroll = gallery.scrollLeft;
      gallery.setPointerCapture(e.pointerId);
      gallery.classList.add('is-dragging');
    });
    gallery.addEventListener('pointermove', function (e) {
      if (dragStart === null) return;
      gallery.scrollLeft = dragScroll - (e.clientX - dragStart);
    });
    function endGalleryDrag() {
      dragStart = null;
      gallery.classList.remove('is-dragging');
    }
    gallery.addEventListener('pointerup', endGalleryDrag);
    gallery.addEventListener('pointercancel', endGalleryDrag);
    gallery.addEventListener('lostpointercapture', endGalleryDrag);
  }
  /* Duplique apenas a apresentação para um ciclo contínuo sem salto. */
  document.querySelectorAll('.depo-track').forEach(function (track) {
    if (track.children.length !== 1) return;
    var copy = track.firstElementChild.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    copy.setAttribute('inert', '');
    track.appendChild(copy);
  });


  /* Alinhe as ofertas sem remover a ampliação original do plano em destaque. */
  var offerGrid = document.querySelector('.planos-grid');
  if (offerGrid) {
    function alignOffers() {
      var reference = offerGrid.querySelector('.plano:not(.plano--featured)');
      var featured = offerGrid.querySelector('.plano--featured');
      if (!reference || !featured) return;
      var price = featured.querySelector('.plano-price');
      var button = price.nextElementSibling;
      price.style.top = '';
      button.style.top = '';
      if (!window.matchMedia('(min-width: 1081px)').matches) return;
      var scale = featured.getBoundingClientRect().height / featured.offsetHeight;
      var referencePrice = reference.querySelector('.plano-price');
      price.style.top = (referencePrice.getBoundingClientRect().top - price.getBoundingClientRect().top) / scale + 'px';
      button.style.top = (referencePrice.nextElementSibling.getBoundingClientRect().top - button.getBoundingClientRect().top) / scale + 'px';
    }
    if ('ResizeObserver' in window) new ResizeObserver(alignOffers).observe(offerGrid);
    window.addEventListener('resize', alignOffers);
    window.addEventListener('load', alignOffers);
    if (document.fonts) document.fonts.ready.then(alignOffers);
    offerGrid.addEventListener('transitionend', function (e) {
      if (e.propertyName === 'opacity') alignOffers();
    });
    alignOffers();
  }

  /* ---------- FAQ single-open (desktop convenience) ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.removeAttribute('open');
      });
    });
  });

  /* ---------- Video: click-to-play (no error on load) ---------- */
  var videoBox = document.getElementById('ppVideo');
  if (videoBox) {
    var thumb = videoBox.querySelector('.video-thumb');
    var embed = videoBox.querySelector('.video-embed');
    thumb.addEventListener('click', function () {
      var id = thumb.getAttribute('data-yt');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = 'Vídeo do Preparamente';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      embed.appendChild(iframe);
      embed.hidden = false;
      thumb.hidden = true;
    });
  }
})();
