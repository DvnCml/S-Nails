/* ==========================================================
   app.js — Lógica principal del sitio
   Responsabilidades: carga de datos, aplicación de estilos,
   renderizado dinámico, modal, eventos, modo oscuro.
   ========================================================== */

// ==========================================================
// FALLBACK DE ÍCONOS SVG (inline data URIs)
// Se usan cuando los archivos locales ./img/icon/*.svg
// no existen aún, para que el sitio funcione de inmediato.
// ==========================================================
const ICON_FALLBACKS = {
  whatsapp: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>')}`,
  cel: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z"/></svg>')}`,
  instagram: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>')}`,
  tiktok: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15a6.34 6.34 0 0010.86 4.48V13.2a8.26 8.26 0 005.58 2.17V11.9a4.85 4.85 0 01-3.59-1.52V6.69h3.59z"/></svg>')}`,
  facebook: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>')}`,
  starFilled: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>')}`,
  starEmpty: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>')}`,
  mapPin: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C2185B"><path d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 7.5 8.5 15.5 8.5 15.5s8.5-8 8.5-15.5C20.5 3.81 16.69 0 12 0zm0 11.5a3 3 0 110-6 3 3 0 010 6z"/></svg>')}`,
  menu: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>')}`,
  close: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 005.7 7.11L10.59 12 5.7 16.89a1 1 0 001.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z"/></svg>')}`,
  sun: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#F59E0B"/><path d="M12 1v2m0 18v2m9-9h-2M5 12H3m15.36-6.36l-1.42 1.42M7.05 17.95l-1.42 1.42m12.73 0l-1.42-1.42M7.05 6.05L5.63 4.63" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/></svg>')}`,
  moon: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#F59E0B"/></svg>')}`
};

// ==========================================================
// VARIABLES GLOBALES
// Almacenamos los datos y la configuración para acceso
// desde cualquier función sin depender de closures complejas.
// ==========================================================
let siteData = null;       // Contenido completo de data.json
let stylesCfg = null;      // Configuración de estilos
let servicesMap = {};      // Mapa id → servicio (para búsquedas rápidas en modal)
let isDarkMode = false;    // Estado actual del modo oscuro

// ==========================================================
// UTILIDADES
// ==========================================================

/** Genera un ID único sencillo (para uso futuro con CRUD) */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/** Asigna texto de forma segura (previene XSS) */
function safeText(node, text) {
  node.textContent = text;
}

/** Codifica un mensaje para URL de WhatsApp */
function formatWhatsappMessage(text) {
  return encodeURIComponent(text);
}

/** Construye la URL completa de WhatsApp */
function buildWhatsappUrl(number, message) {
  return `https://wa.me/${number}?text=${formatWhatsappMessage(message)}`;
}

/** Muestra la pantalla de carga */
function showLoading() {
  const el = document.getElementById('loading-screen');
  if (el) el.classList.remove('hidden');
}

/** Oculta la pantalla de carga */
function clearLoading() {
  const el = document.getElementById('loading-screen');
  if (el) el.classList.add('hidden');
}

/** Muestra la pantalla de error con un mensaje */
function showError(msg) {
  clearLoading();
  const screen = document.getElementById('error-screen');
  const msgEl = document.getElementById('error-message');
  if (screen) screen.classList.add('visible');
  if (msgEl) safeText(msgEl, msg);
}

// ==========================================================
// OBTENCIÓN DE DATOS
// Fetch paralelo de ambos JSON con manejo de errores.
// Si falla stylesCnfg.json, se usan los valores CSS por defecto.
// Si falla data.json, se muestra error y no se renderiza nada.
// ==========================================================

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${url}`);
    return await response.json();
  } catch (err) {
    console.warn(`Error cargando ${url}:`, err.message);
    return null;
  }
}

// ==========================================================
// APLICACIÓN DE ESTILOS
// Toma los valores de stylesCnfg.json y los aplica como
// CSS custom properties en :root y .dark
// ==========================================================

function applyStyles(cfg) {
  if (!cfg) {
    console.info('stylesCnfg.json no disponible — se usan valores CSS por defecto.');
    // Aplicar modo inicial basado en preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toggleDarkMode(true);
    }
    return;
  }

  const root = document.documentElement;
  const c = cfg.colores;

  // Colores base del tema
  root.style.setProperty('--c-primary', c.primary);
  root.style.setProperty('--c-secondary', c.secondary);
  root.style.setProperty('--c-accent', c.accent);
  root.style.setProperty('--c-bg-light', c.background);
  root.style.setProperty('--c-text-light', c.text);
  root.style.setProperty('--c-card-light', c.card);
  root.style.setProperty('--c-bg-dark', c.darkBackground);
  root.style.setProperty('--c-text-dark', c.darkText);
  root.style.setProperty('--c-card-dark', c.darkCard);
  root.style.setProperty('--c-secondary-dark', c.darkSecondary);

  // Parámetros de diseño
  root.style.setProperty('--radius', cfg.borderRadius + 'px');
  root.style.setProperty('--btn-padding', cfg.buttonPadding);
  root.style.setProperty('--card-shadow', cfg.cardShadow);
  root.style.setProperty('--font', cfg.fontFamily);
  root.style.setProperty('--spacing', cfg.spacing + 'px');
  root.style.setProperty('--max-width', cfg.maxContentWidth + 'px');
  root.style.setProperty('--overlay-opacity', cfg.bannerOverlayOpacity);
  root.style.setProperty('--menu-offset', cfg.menuFloatingOffset + 'px');

  // Modo inicial
  const modoInicial = cfg.modoInicial || 'light';
  if (modoInicial === 'dark') {
    toggleDarkMode(true);
  } else if (modoInicial === 'system') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toggleDarkMode(true);
    }
  }
  // Si es 'light' no hacemos nada (ya está en claro por defecto)
}

/** Alterna el modo oscuro. Si se pasa un booleano, lo fuerza. */
function toggleDarkMode(force) {
  isDarkMode = typeof force === 'boolean' ? force : !isDarkMode;
  document.documentElement.classList.toggle('dark', isDarkMode);
  updateDarkToggleIcon();
}

/** Actualiza el ícono del botón de modo oscuro */
function updateDarkToggleIcon() {
  const btn = document.getElementById('dark-toggle');
  if (!btn || !siteData) return;

  const img = document.createElement('img');
  img.alt = isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro';
  img.src = isDarkMode
    ? (siteData.iconos.sun || ICON_FALLBACKS.sun)
    : (siteData.iconos.moon || ICON_FALLBACKS.moon);

  // Fallback si el archivo local no existe
  img.onerror = function () {
    this.onerror = null;
    this.src = isDarkMode ? ICON_FALLBACKS.sun : ICON_FALLBACKS.moon;
  };

  btn.innerHTML = '';
  btn.appendChild(img);
  btn.setAttribute('aria-label', isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro');
}

// ==========================================================
// MANEJO DE IMÁGENES CON FALLBACK
// Cuando una imagen local no existe, se reemplaza por
// picsum (para fotos) o SVG inline (para íconos).
// ==========================================================

/** Aplica fallback a una imagen de contenido (foto) */
function handleContentImgError(img, seed) {
  img.onerror = null; // Evitar loop infinito
  img.src = `https://picsum.photos/seed/${seed}/600/400`;
}

/** Aplica fallback a una imagen de ícono */
function handleIconImgError(img, iconKey) {
  img.onerror = null;
  if (ICON_FALLBACKS[iconKey]) {
    img.src = ICON_FALLBACKS[iconKey];
  }
}

// ==========================================================
// RENDERIZADO — Menú flotante de contacto
// Genera la burbuja FAB (móvil) y el panel de opciones.
// En escritorio, CSS muestra el panel directamente.
// ==========================================================

function renderMenuContacto(contacto, iconos) {
  const container = document.getElementById('menu-contacto');
  container.innerHTML = '';

  // --- Definición de las opciones de contacto ---
  const opciones = [
    { key: 'whatsapp', url: buildWhatsappUrl(contacto.whatsapp, 'Hola, me gustaría agendar una cita'), label: 'WhatsApp' },
    { key: 'cel', url: `tel:${contacto.cel}`, label: 'Llamar' },
    { key: 'instagram', url: contacto.instagram, label: 'Instagram' },
    { key: 'tiktok', url: contacto.tiktok, label: 'TikTok' },
    { key: 'facebook', url: contacto.facebook, label: 'Facebook' }
  ];

  // --- Burbuja FAB (solo visible en móvil por CSS) ---
  const fab = document.createElement('button');
  fab.className = 'menu-fab';
  fab.setAttribute('aria-label', 'Abrir menú de contacto');
  const fabImg = document.createElement('img');
  fabImg.src = iconos.menu || ICON_FALLBACKS.menu;
  fabImg.alt = 'Menú';
  fabImg.onerror = function () { this.onerror = null; this.src = ICON_FALLBACKS.menu; };
  fab.appendChild(fabImg);
  container.appendChild(fab);

  // --- Contenedor de opciones ---
  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'menu-options';

  opciones.forEach(function (opt) {
    const btn = document.createElement('a');
    btn.className = 'menu-opt-btn';
    btn.href = opt.url;
    // Los enlaces tel: se abren en la misma pestaña, el resto en nueva
    btn.target = opt.key === 'cel' ? '_self' : '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', opt.label);

    const img = document.createElement('img');
    img.src = iconos[opt.key] || ICON_FALLBACKS[opt.key] || '';
    img.alt = opt.label;
    img.onerror = function () { handleIconImgError(this, opt.key); };

    btn.appendChild(img);
    optionsDiv.appendChild(btn);
  });

  container.appendChild(optionsDiv);

  // --- Toggle del menú al hacer clic en la burbuja ---
  fab.addEventListener('click', function () {
    const isActive = fab.classList.toggle('active');
    optionsDiv.classList.toggle('active', isActive);

    // Cambiar ícono: si está activo mostrar X, si no mostrar menú
    const img = fab.querySelector('img');
    if (isActive) {
      img.src = iconos.close || ICON_FALLBACKS.close;
      img.onerror = function () { this.onerror = null; this.src = ICON_FALLBACKS.close; };
    } else {
      img.src = iconos.menu || ICON_FALLBACKS.menu;
      img.onerror = function () { this.onerror = null; this.src = ICON_FALLBACKS.menu; };
    }
  });

  // --- Cerrar menú al hacer clic fuera ---
  document.addEventListener('click', function (e) {
    if (!container.contains(e.target)) {
      fab.classList.remove('active');
      optionsDiv.classList.remove('active');
      const img = fab.querySelector('img');
      img.src = iconos.menu || ICON_FALLBACKS.menu;
      img.onerror = function () { this.onerror = null; this.src = ICON_FALLBACKS.menu; };
    }
  });
}

// ==========================================================
// RENDERIZADO — Banner
// Sección hero con imagen de fondo, título y botones redondeados.
// ==========================================================

function renderBanner(banner, contacto) {
  const section = document.createElement('section');
  section.className = 'banner';
  section.id = 'banner';

  // Imagen de fondo: se carga primero para verificar si existe.
  // Si falla, se usa picsum como fallback.
  const bgImg = new Image();
  bgImg.src = banner.imagen;
  bgImg.onload = function () {
    section.style.backgroundImage = `url('${banner.imagen}')`;
  };
  bgImg.onerror = function () {
    section.style.backgroundImage = `url('https://picsum.photos/seed/nailbanner/1920/1080')`;
  };

  // --- Contenido sobre el banner ---
  const content = document.createElement('div');
  content.className = 'banner-content';

  const title = document.createElement('h1');
  title.className = 'banner-title';
  safeText(title, banner.titulo);

  const subtitle = document.createElement('p');
  subtitle.className = 'banner-subtitle';
  safeText(subtitle, banner.subtitulo);

  const buttons = document.createElement('div');
  buttons.className = 'banner-buttons';

  // Botón de contacto (WhatsApp)
  const btnContact = document.createElement('a');
  btnContact.className = 'btn-banner btn-banner-primary';
  btnContact.href = buildWhatsappUrl(contacto.whatsapp, banner.botonContacto.whatsappMessage);
  btnContact.target = '_blank';
  btnContact.rel = 'noopener noreferrer';
  const waImg = document.createElement('img');
  waImg.src = siteData.iconos.whatsapp || ICON_FALLBACKS.whatsapp;
  waImg.alt = '';
  waImg.onerror = function () { this.onerror = null; this.src = ICON_FALLBACKS.whatsapp; };
  safeText(btnContact, banner.botonContacto.texto);
  btnContact.prepend(waImg); // Ícono antes del texto

  // Botón de servicios (anchor interno con scroll suave)
  const btnServices = document.createElement('a');
  btnServices.className = 'btn-banner btn-banner-outline';
  btnServices.href = banner.botonServicios.ancla;
  safeText(btnServices, banner.botonServicios.texto);

  buttons.appendChild(btnContact);
  buttons.appendChild(btnServices);
  content.appendChild(title);
  content.appendChild(subtitle);
  content.appendChild(buttons);
  section.appendChild(content);

  return section;
}

// ==========================================================
// RENDERIZADO — Servicios
// Grilla de 8 tarjetas con imagen, título, precio y 2 botones:
//   1) "Ver Detalles" → abre modal con descripción completa
//   2) "Contactar" → enlace directo a WhatsApp
// ==========================================================

function renderServicios(servicios) {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'servicios';

  const container = document.createElement('div');
  container.className = 'container';

  const title = document.createElement('h2');
  title.className = 'section-title reveal';
  safeText(title, 'Nuestros Servicios');

  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle reveal';
  safeText(subtitle, 'Conoce todo lo que podemos hacer por tus uñas');

  const grid = document.createElement('div');
  grid.className = 'services-grid';

  servicios.forEach(function (srv) {
    // Guardar en mapa para acceso rápido desde el handler del modal
    servicesMap[srv.id] = srv;

    const card = document.createElement('article');
    card.className = 'service-card reveal';

    // Imagen del servicio
    const img = document.createElement('img');
    img.className = 'service-card-img';
    img.src = srv.imagen;
    img.alt = srv.titulo;
    img.loading = 'lazy';
    img.onerror = function () { handleContentImgError(this, srv.id); };

    // Cuerpo de la tarjeta
    const body = document.createElement('div');
    body.className = 'service-card-body';

    const titleEl = document.createElement('h3');
    titleEl.className = 'service-card-title';
    safeText(titleEl, srv.titulo);

    const priceEl = document.createElement('p');
    priceEl.className = 'service-card-price';
    safeText(priceEl, srv.precio || '');

    // --- Dos botones por tarjeta ---
    const btns = document.createElement('div');
    btns.className = 'service-card-buttons';

    // Botón 1: Ver detalles (abre modal)
    const btnDetail = document.createElement('button');
    btnDetail.className = 'btn btn-primary btn-service-detail';
    btnDetail.setAttribute('data-service-id', srv.id);
    safeText(btnDetail, 'Ver Detalles');

    // Botón 2: Contactar directo (WhatsApp con mensaje personalizado)
    const btnContact = document.createElement('a');
    btnContact.className = 'btn btn-whatsapp btn-contact';
    btnContact.href = buildWhatsappUrl(siteData.contacto.whatsapp, srv.whatsappMessage);
    btnContact.target = '_blank';
    btnContact.rel = 'noopener noreferrer';
    safeText(btnContact, 'Contactar');

    btns.appendChild(btnDetail);
    btns.appendChild(btnContact);
    body.appendChild(titleEl);
    body.appendChild(priceEl);
    body.appendChild(btns);
    card.appendChild(img);
    card.appendChild(body);
    grid.appendChild(card);
  });

  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ==========================================================
// RENDERIZADO — Testimonios
// 3 tarjetas simples con nombre, comentario y calificación
// (estrellas).
// ==========================================================

function renderTestimonios(testimonios) {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'testimonios';

  const container = document.createElement('div');
  container.className = 'container';

  const title = document.createElement('h2');
  title.className = 'section-title reveal';
  safeText(title, 'Lo que dicen nuestras clientas');

  const grid = document.createElement('div');
  grid.className = 'testimonials-grid';

  testimonios.forEach(function (test) {
    const card = document.createElement('article');
    card.className = 'testimonial-card reveal';

    const text = document.createElement('p');
    text.className = 'testimonial-text';
    safeText(text, test.comentario);

    const name = document.createElement('p');
    name.className = 'testimonial-name';
    safeText(name, test.nombre);

    // Calificación representada con estrellas
    const starsDiv = document.createElement('div');
    starsDiv.className = 'testimonial-stars';
    for (let i = 1; i <= 5; i++) {
      const starImg = document.createElement('img');
      starImg.src = (i <= test.calificacion)
        ? (siteData.iconos.starFilled || ICON_FALLBACKS.starFilled)
        : (siteData.iconos.starEmpty || ICON_FALLBACKS.starEmpty);
      starImg.alt = i <= test.calificacion ? 'Estrella llena' : 'Estrella vacía';
      starImg.loading = 'lazy';
      starImg.onerror = function () {
        this.onerror = null;
        this.src = (i <= test.calificacion) ? ICON_FALLBACKS.starFilled : ICON_FALLBACKS.starEmpty;
      };
      starsDiv.appendChild(starImg);
    }

    card.appendChild(text);
    card.appendChild(name);
    card.appendChild(starsDiv);
    grid.appendChild(card);
  });

  container.appendChild(title);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ==========================================================
// RENDERIZADO — Ubicación
// Imagen del local, dirección con ícono y mapa de Google
// embebido en un iframe.
// ==========================================================

function renderUbicacion(ubicacion) {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'ubicacion';

  const container = document.createElement('div');
  container.className = 'container';

  const title = document.createElement('h2');
  title.className = 'section-title reveal';
  safeText(title, 'Encuéntranos');

  const grid = document.createElement('div');
  grid.className = 'location-grid';

  // --- Imagen del local ---
  const img = document.createElement('img');
  img.className = 'location-img reveal';
  img.src = ubicacion.imagen;
  img.alt = 'Nuestro local';
  img.loading = 'lazy';
  img.onerror = function () { handleContentImgError(this, 'local-nails'); };

  // --- Información: dirección + mapa ---
  const info = document.createElement('div');
  info.className = 'location-info';

  // Dirección con ícono de pin
  const addrDiv = document.createElement('div');
  addrDiv.className = 'location-address reveal';

  const pinImg = document.createElement('img');
  pinImg.src = siteData.iconos.mapPin || ICON_FALLBACKS.mapPin;
  pinImg.alt = 'Ubicación';
  pinImg.onerror = function () { this.onerror = null; this.src = ICON_FALLBACKS.mapPin; };

  const addrText = document.createElement('p');
  addrText.className = 'location-address-text';
  safeText(addrText, ubicacion.direccion);

  addrDiv.appendChild(pinImg);
  addrDiv.appendChild(addrText);

  // Mapa embebido de Google Maps
  const mapDiv = document.createElement('div');
  mapDiv.className = 'location-map reveal';

  const iframe = document.createElement('iframe');
  iframe.src = ubicacion.mapsEmbed;
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
  iframe.title = 'Ubicación en Google Maps';

  mapDiv.appendChild(iframe);

  info.appendChild(addrDiv);
  info.appendChild(mapDiv);
  grid.appendChild(img);
  grid.appendChild(info);
  container.appendChild(title);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ==========================================================
// RENDERIZADO — Sobre Nosotros
// Sección estándar "About" con texto descriptivo y 4
// enlaces a redes sociales.
// ==========================================================

function renderAbout(about) {
  const section = document.createElement('section');
  section.className = 'section about-section';
  section.id = 'sobre-nosotros';

  const container = document.createElement('div');
  container.className = 'container';

  const title = document.createElement('h2');
  title.className = 'section-title reveal';
  safeText(title, about.titulo);

  // El texto puede contener saltos de línea (\n) separados por
  // dos párrafos. Los dividimos aquí.
  const textDiv = document.createElement('div');
  textDiv.className = 'about-text reveal';

  const paragraphs = about.descripcion.split('\n\n');
  paragraphs.forEach(function (p) {
    if (p.trim()) {
      const pEl = document.createElement('p');
      safeText(pEl, p.trim());
      textDiv.appendChild(pEl);
    }
  });

  // --- Redes sociales (4 enlaces con ícono y nombre) ---
  const socialsDiv = document.createElement('div');
  socialsDiv.className = 'about-socials reveal';

  about.redesSociales.forEach(function (red) {
    const link = document.createElement('a');
    link.className = 'about-social-link';
    link.href = red.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', red.nombre);

    const img = document.createElement('img');
    img.src = red.icono || ICON_FALLBACKS[red.nombre.toLowerCase()] || '';
    img.alt = red.nombre;
    img.onerror = function () {
      handleIconImgError(this, red.nombre.toLowerCase());
    };

    const nameSpan = document.createElement('span');
    safeText(nameSpan, red.nombre);

    link.appendChild(img);
    link.appendChild(nameSpan);
    socialsDiv.appendChild(link);
  });

  container.appendChild(title);
  container.appendChild(textDiv);
  container.appendChild(socialsDiv);
  section.appendChild(container);

  return section;
}

// ==========================================================
// RENDERIZADO — Footer
// Pequeño pie de página con 2 líneas de texto (derechos).
// ==========================================================

function renderFooter(footerData) {
  const footer = document.getElementById('site-footer');

  const container = document.createElement('div');
  container.className = 'container';

  const line1 = document.createElement('p');
  safeText(line1, footerData.linea1);

  const line2 = document.createElement('p');
  safeText(line2, footerData.linea2);

  container.appendChild(line1);
  container.appendChild(line2);
  footer.appendChild(container);
}

// ==========================================================
// RENDERIZADO — Todas las secciones
// Limpia el contenedor principal y agrega cada sección
// en el orden definido por el esquema.
// ==========================================================

function renderAll() {
  const app = document.getElementById('app');
  app.innerHTML = ''; // Limpiar contenido previo

  // Banner
  app.appendChild(renderBanner(siteData.banner, siteData.contacto));

  // Servicios (8 tarjetas)
  app.appendChild(renderServicios(siteData.servicios));

  // Testimonios (3 tarjetas)
  app.appendChild(renderTestimonios(siteData.testimonios));

  // Ubicación
  app.appendChild(renderUbicacion(siteData.ubicacion));

  // Sobre Nosotros
  app.appendChild(renderAbout(siteData.about));

  // Footer (se renderiza en su propio contenedor fuera de <main>)
  renderFooter(siteData.footer);
}

// ==========================================================
// MODAL — Crear, abrir, cerrar
// El modal se renderiza dinámicamente cuando el usuario
// hace clic en "Ver Detalles" de un servicio.
// Layout: imagen a la izquierda (50%), contenido a la derecha.
// ==========================================================

/** Abre el modal con la información detallada del servicio */
function openModal(serviceId) {
  const service = servicesMap[serviceId];
  if (!service) {
    console.warn(`Servicio con id "${serviceId}" no encontrado.`);
    return;
  }

  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  container.innerHTML = ''; // Limpiar contenido previo del modal

  // --- Botón de cerrar ---
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.setAttribute('aria-label', 'Cerrar modal');
  const closeImg = document.createElement('img');
  closeImg.src = siteData.iconos.close || ICON_FALLBACKS.close;
  closeImg.alt = 'Cerrar';
  closeImg.onerror = function () { this.onerror = null; this.src = ICON_FALLBACKS.close; };
  closeBtn.appendChild(closeImg);

  // --- Imagen de referencia (lado izquierdo, 50%) ---
  const modalImg = document.createElement('img');
  modalImg.className = 'modal-image';
  modalImg.src = service.imagenReferencia || service.imagen;
  modalImg.alt = service.titulo;
  modalImg.onerror = function () { handleContentImgError(this, service.id + '-full'); };

  // --- Cuerpo del modal (lado derecho, 50%) ---
  const body = document.createElement('div');
  body.className = 'modal-body';

  const titleEl = document.createElement('h3');
  titleEl.className = 'modal-title';
  safeText(titleEl, service.titulo);

  const priceEl = document.createElement('p');
  priceEl.className = 'modal-price';
  safeText(priceEl, service.precio || '');

  const descEl = document.createElement('p');
  descEl.className = 'modal-description';
  safeText(descEl, service.descripcion);

  // --- Dos botones de contacto (ambos van a WhatsApp) ---
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'modal-buttons';

  // Botón 1: Agendar (mensaje personalizado)
  const btnAgendar = document.createElement('a');
  btnAgendar.className = 'btn btn-whatsapp btn-contact';
  btnAgendar.href = buildWhatsappUrl(siteData.contacto.whatsapp, service.whatsappMessage);
  btnAgendar.target = '_blank';
  btnAgendar.rel = 'noopener noreferrer';
  safeText(btnAgendar, 'Agendar Cita');

  // Botón 2: Más información (mensaje ligeramente diferente)
  const btnInfo = document.createElement('a');
  btnInfo.className = 'btn btn-outline btn-contact';
  btnInfo.href = buildWhatsappUrl(
    siteData.contacto.whatsapp,
    service.whatsappMessage + ', ¿podrían darme más información?'
  );
  btnInfo.target = '_blank';
  btnInfo.rel = 'noopener noreferrer';
  safeText(btnInfo, 'Más Información');

  buttonsDiv.appendChild(btnAgendar);
  buttonsDiv.appendChild(btnInfo);

  // --- Ensamblar modal ---
  body.appendChild(titleEl);
  body.appendChild(priceEl);
  body.appendChild(descEl);
  body.appendChild(buttonsDiv);

  container.appendChild(closeBtn);
  container.appendChild(modalImg);
  container.appendChild(body);

  // --- Mostrar modal ---
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Bloquear scroll del body
}

/** Cierra el modal y restaura el scroll */
function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Restaurar scroll
}

// ==========================================================
// UTILIDADES DOM — Manipulación individual de elementos
// Útiles si se habilita CRUD en el futuro para no
// tener que re-renderizar todo el sitio.
// ==========================================================

/** Agrega un elemento hijo al final de un contenedor (sin re-renderizar todo) */
function appendItem(containerSelector, element) {
  const container = document.querySelector(containerSelector);
  if (container) container.appendChild(element);
}

/** Actualiza un elemento específico por su data-id */
function updateItem(containerSelector, dataId, newContentFn) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const existing = container.querySelector(`[data-id="${dataId}"]`);
  if (existing) {
    const fresh = newContentFn();
    existing.replaceWith(fresh);
  }
}

/** Elimina un elemento específico por su data-id */
function removeItem(containerSelector, dataId) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const existing = container.querySelector(`[data-id="${dataId}"]`);
  if (existing) existing.remove();
}

// ==========================================================
// EVENTOS — Delegación y binding
// Se usa delegación de eventos en el contenedor principal
// para manejar clics en elementos dinámicos sin tener que
// re-asignar listeners cada vez que se renderiza.
// ==========================================================

function bindListeners() {
  const app = document.getElementById('app');

  // --- Delegación de clics en el contenido principal ---
  app.addEventListener('click', function (e) {
    // Buscar el botón más cercano con clase .btn-service-detail
    const detailBtn = e.target.closest('.btn-service-detail');
    if (detailBtn) {
      // Obtener el ID del servicio del atributo data-service-id
      const serviceId = detailBtn.getAttribute('data-service-id');
      handleServiceDetailClick(serviceId);
      return; // No procesar otros handlers
    }

    // Los botones .btn-contact son <a> con href directo a WhatsApp,
    // así que no necesitan handler especial — el navegador los sigue
    // automáticamente. Se incluye la clase por si se necesita lógica
    // adicional en el futuro (ej. analytics).
  });

  // --- Cerrar modal al hacer clic en el overlay (fuera del contenido) ---
  const modalOverlay = document.getElementById('modal-overlay');
  modalOverlay.addEventListener('click', function (e) {
    // Solo cerrar si el clic fue directamente en el overlay,
    // no en elementos dentro del modal
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // --- Cerrar modal con el botón X (delegación) ---
  modalOverlay.addEventListener('click', function (e) {
    const closeBtn = e.target.closest('.modal-close');
    if (closeBtn) {
      closeModal();
    }
  });

  // --- Cerrar modal con tecla Escape ---
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // --- Toggle de modo oscuro ---
  const darkToggle = document.getElementById('dark-toggle');
  darkToggle.addEventListener('click', function () {
    toggleDarkMode();
  });
}

// ==========================================================
// HANDLERS — Lógica de negocio para cada interacción
// ==========================================================

/** Maneja el clic en "Ver Detalles" de un servicio */
function handleServiceDetailClick(serviceId) {
  openModal(serviceId);
}

/** Maneja un clic de contacto directo (WhatsApp).
 *  Se puede usar desde cualquier botón que tenga un mensaje
 *  personalizado, pasando el mensaje directamente o el ID
 *  del servicio para buscarlo en el mapa.
 */
function handleContactClick(messageOrId) {
  let message;
  if (servicesMap[messageOrId]) {
    // Si es un ID de servicio, obtener su mensaje
    message = servicesMap[messageOrId].whatsappMessage;
  } else {
    // Si es un string de mensaje directo, usarlo tal cual
    message = messageOrId;
  }
  const url = buildWhatsappUrl(siteData.contacto.whatsapp, message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ==========================================================
// ANIMACIONES DE SCROLL — Intersection Observer
// Detecta cuando los elementos con clase .reveal entran al
// viewport y les agrega la clase .visible para animarlos.
// ==========================================================

function initScrollReveal() {
  // Verificar si el navegador soporta IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    // Fallback: mostrar todo inmediatamente
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Agregar clase visible con un pequeño delay escalonado
          // para crear efecto de aparición progresiva
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, parseInt(delay, 10));
          // Dejar de observar una vez que ya se reveló
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Se activa cuando el 15% del elemento es visible
      threshold: 0.15,
      // Margen negativo para que se active un poco antes de
      // llegar al centro de la pantalla
      rootMargin: '0px 0px -40px 0px'
    }
  );

  // Observar todos los elementos con clase .reveal
  document.querySelectorAll('.reveal').forEach(function (el, index) {
    // Asignar delay escalonado dentro de su sección
    // (cada tarjeta aparece ligeramente después de la anterior)
    el.dataset.revealDelay = (index % 8) * 80; // Máximo 8 elementos por "ola"
    observer.observe(el);
  });
}

// ==========================================================
// HELPERS ADICIONALES PARA ORIENTATION CHANGE (móvil)
// En algunos dispositivos, al rotar la pantalla el menú
// flotante puede quedar en un estado inconsistente. Este
// listener fuerza el cierre del menú al cambiar orientación.
// ==========================================================

function bindOrientationHandler() {
  // Verificar si matchMedia soporta orientación
  if (window.matchMedia) {
    const portraitQuery = window.matchMedia('(orientation: portrait)');
    portraitQuery.addEventListener('change', function () {
      // Cerrar el menú flotante al cambiar orientación
      const fab = document.querySelector('.menu-fab');
      const options = document.querySelector('.menu-options');
      if (fab && options) {
        fab.classList.remove('active');
        options.classList.remove('active');
        // Restaurar ícono de menú
        const img = fab.querySelector('img');
        if (img && siteData) {
          img.src = siteData.iconos.menu || ICON_FALLBACKS.menu;
          img.onerror = function () { this.onerror = null; this.src = ICON_FALLBACKS.menu; };
        }
      }
    });
  }
}

// ==========================================================
// INICIALIZACIÓN — Flujo principal
// 1. Mostrar pantalla de carga
// 2. Fetch paralelo de data.json y stylesCnfg.json
// 3. Aplicar estilos (CSS variables)
// 4. Renderizar todo el sitio
// 5. Bindear eventos
// 6. Iniciar animaciones de scroll
// 7. Ocultar pantalla de carga
// ==========================================================

async function init() {
  showLoading();

  try {
    // Fetch paralelo: ambos JSON se cargan al mismo tiempo
    const [dataResult, stylesResult] = await Promise.all([
      fetchData('./data.json'),
      fetchData('./stylesCnfg.json')
    ]);

    // Validar que data.json cargó correctamente (es obligatorio)
    if (!dataResult) {
      throw new Error(
        'No se pudo cargar data.json. Verifica que el archivo exista y sea JSON válido.'
      );
    }

    // Guardar datos en variables globales
    siteData = dataResult;
    stylesCfg = stylesResult; // Puede ser null (se usarán valores CSS por defecto)

    // 1. Aplicar configuración de estilos como CSS variables
    applyStyles(stylesCfg);

    // 2. Renderizar menú flotante de contacto (fuera de <main>)
    renderMenuContacto(siteData.contacto, siteData.iconos);

    // 3. Renderizar todas las secciones dentro de <main>
    renderAll();

    // 4. Actualizar ícono del toggle de modo oscuro
    updateDarkToggleIcon();

    // 5. Bindear todos los eventos (delegación, modal, dark toggle)
    bindListeners();

    // 6. Iniciar animaciones de scroll (reveal)
    initScrollReveal();

    // 7. Bindear handler de orientación para el menú flotante
    bindOrientationHandler();

    // 8. Ocultar pantalla de carga con una pequeña demora
    // para que la transición CSS sea visible
    setTimeout(clearLoading, 300);

  } catch (error) {
    console.error('Error en init():', error);
    showError(error.message || 'Ocurrió un error inesperado al cargar el sitio.');
  }
}

// ==========================================================
// PUNTO DE ENTRADA
// Ejecutar init() cuando el DOM esté completamente listo.
// ==========================================================
document.addEventListener('DOMContentLoaded', init);