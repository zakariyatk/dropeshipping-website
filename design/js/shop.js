// ================= Storefront layout =================
function logo(cls = '') {
  return `<a href="#/" class="flex items-center gap-2 ${cls}" aria-label="Dukkan">
    <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-md shadow-brand-600/30">${icon('shopping-bag', 'w-5 h-5')}</span>
    <span class="text-xl font-extrabold tracking-tight">${t('brand')}<span class="text-brand-600">${t('brandSub')}</span></span></a>`;
}

function shopHeader() {
  const zone = MUNICIPALITIES.find(m => m.id === (S.zone || 'doha'));
  return `
  <div class="bg-zinc-950 text-zinc-200 text-xs">
    <div class="container-x flex h-9 items-center justify-between gap-4">
      <p class="truncate">${icon('truck', 'w-3.5 h-3.5 inline -mt-0.5 me-1.5 text-brand-300')}${t('topbar')}</p>
      <div class="hidden md:flex items-center gap-5 shrink-0">
        <a href="#/track" class="hover:text-white">${t('track')}</a>
        <a href="#/help/delivery" class="hover:text-white">${t('help')}</a>
        <a href="https://wa.me/97400000000" target="_blank" rel="noopener" class="hover:text-white inline-flex items-center gap-1">${icon('message-circle', 'w-3.5 h-3.5')}${t('whatsapp')}</a>
        <a href="#/admin" class="hover:text-white inline-flex items-center gap-1">${icon('layout-dashboard', 'w-3.5 h-3.5')}${t('admin')}</a>
      </div>
    </div>
  </div>
  <header class="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur-xl">
    <div class="container-x flex h-[72px] items-center gap-3 lg:gap-6">
      <button class="icon-btn lg:hidden" onclick="toggleMenu(true)" aria-label="${t('menu')}">${icon('menu')}</button>
      ${logo('shrink-0')}
      <button onclick="openZonePicker()" class="hidden xl:flex items-center gap-2 rounded-xl px-2 py-1.5 text-start hover:bg-zinc-50 shrink-0">
        ${icon('map-pin', 'w-5 h-5 text-brand-600')}
        <span class="leading-tight"><span class="block text-[11px] text-zinc-500">${t('deliverTo')}</span><span class="block text-sm font-semibold">${L(zone)}, ${S.lang === 'ar' ? 'قطر' : 'Qatar'}</span></span>
      </button>
      <div class="relative hidden md:block flex-1">${searchBox('q')}</div>
      <nav class="ms-auto flex items-center gap-1 sm:gap-2">
        <button onclick="setLang()" class="hidden sm:inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold hover:bg-zinc-100" aria-label="Language">${icon('languages', 'w-4 h-4')}<span class="${S.lang === 'en' ? 'font-arabic' : ''}">${t('langSwitch')}</span></button>
        <a href="${S.user ? '#/account' : '#/login'}" class="hidden sm:flex items-center gap-2 rounded-full px-2.5 py-1.5 hover:bg-zinc-100">
          ${icon('user-round', 'w-5 h-5')}
          <span class="hidden lg:block leading-tight"><span class="block text-[11px] text-zinc-500">${S.user ? t('hello') + ', ' + esc(S.user.name.split(' ')[0]) : t('hello')}</span><span class="block text-sm font-semibold">${S.user ? t('account') : t('signIn')}</span></span>
        </a>
        <a href="#/wishlist" class="icon-btn relative" aria-label="${t('wishlist')}">${icon('heart')}<span data-badge="wish" class="badge hidden"></span></a>
        <button onclick="openDrawer()" class="icon-btn relative" aria-label="${t('cart')}">${icon('shopping-bag')}<span data-badge="cart" class="badge hidden"></span></button>
      </nav>
    </div>
    <div class="container-x pb-3 md:hidden"><div class="relative">${searchBox('qm')}</div></div>
    <div class="hidden lg:block border-t border-zinc-100">
      <div class="container-x flex h-12 items-center gap-1 text-sm">
        <div class="relative group">
          <button class="flex h-9 items-center gap-2 rounded-full bg-brand-600 px-4 font-semibold text-white hover:bg-brand-700">${icon('layout-grid', 'w-4 h-4')}${t('allCats')}${icon('chevron-down', 'w-4 h-4')}</button>
          <div class="invisible absolute start-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
            <div class="grid w-[560px] grid-cols-2 gap-1 rounded-2xl border border-zinc-100 bg-white p-3 shadow-2xl">
              ${CATEGORIES.map(c => `<a href="#/c/${c.slug}" class="flex items-center gap-3 rounded-xl p-2.5 hover:bg-brand-50"><span class="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">${icon(c.icon, 'w-4 h-4')}</span><span class="font-medium">${L(c.name)}</span></a>`).join('')}
            </div>
          </div>
        </div>
        <a href="#/deals" class="nav-link text-brand-700 font-semibold">${icon('zap', 'w-4 h-4')}${t('navDeals')}</a>
        <a href="#/search?tag=best" class="nav-link">${t('navBest')}</a>
        <a href="#/search?tag=new" class="nav-link">${t('navNew')}</a>
        ${CATEGORIES.slice(0, 5).map(c => `<a href="#/c/${c.slug}" class="nav-link hidden xl:inline-flex">${L(c.name).split(/ & | و/)[0]}</a>`).join('')}
        <a href="#/deals" class="ms-auto inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-zinc-900 to-brand-800 px-3.5 py-1.5 text-xs font-bold text-white">${icon('tag', 'w-3.5 h-3.5')}${t('navWF')}</a>
      </div>
    </div>
  </header>
  ${mobileMenu()}`;
}

function searchBox(id) {
  return `<form onsubmit="event.preventDefault();goSearch(this.q.value)" class="relative" role="search">
    <input name="q" id="${id}" autocomplete="off" value="${esc(currentRoute().q.q || '')}" oninput="suggest(this)" onfocus="suggest(this)" onblur="setTimeout(()=>hideSuggest('${id}'),150)"
      class="h-11 w-full rounded-full border border-zinc-200 bg-zinc-50 ps-11 pe-24 text-sm outline-none transition placeholder:text-zinc-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15" placeholder="${t('searchPh')}" aria-label="${t('searchPh')}">
    <span class="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-zinc-400">${icon('search', 'w-4 h-4')}</span>
    <button class="absolute end-1 top-1 h-9 rounded-full bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700">${S.lang === 'ar' ? 'بحث' : 'Search'}</button>
    <div id="${id}-sugg" class="absolute inset-x-0 top-full z-50 mt-2 hidden overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-2xl"></div>
  </form>`;
}
function matchText(p, q) { return (p.name.en + ' ' + p.name.ar + ' ' + p.brand + ' ' + L(C(p.cat).name)).toLowerCase().includes(q); }
function suggest(input) {
  const box = document.getElementById(input.id + '-sugg'), q = input.value.trim().toLowerCase();
  const popular = S.lang === 'ar' ? ['سماعات', 'ساعة ذكية', 'عطر', 'كنبة', 'شاحن'] : ['headphones', 'smartwatch', 'perfume', 'sofa', 'charger'];
  if (!q) {
    box.innerHTML = `<div class="p-4"><p class="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">${S.lang === 'ar' ? 'عمليات بحث شائعة' : 'Popular searches'}</p>
      <div class="flex flex-wrap gap-2">${popular.map(w => `<button type="button" onmousedown="goSearch('${w}')" class="rounded-full bg-zinc-100 px-3 py-1.5 text-sm hover:bg-brand-50 hover:text-brand-700">${icon('trending-up', 'w-3.5 h-3.5 inline me-1')}${w}</button>`).join('')}</div></div>`;
  } else {
    const hits = PRODUCTS.filter(p => matchText(p, q)).slice(0, 6);
    const cats = CATEGORIES.filter(c => (c.name.en + c.name.ar).toLowerCase().includes(q)).slice(0, 2);
    box.innerHTML = (cats.map(c => `<a href="#/c/${c.slug}" onmousedown="location.hash='#/c/${c.slug}'" class="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-zinc-50">${icon(c.icon, 'w-4 h-4 text-brand-600')}<span>${S.lang === 'ar' ? 'في قسم' : 'in'} <b>${L(c.name)}</b></span></a>`).join('') +
      hits.map(p => `<a href="#/p/${p.slug}" onmousedown="location.hash='#/p/${p.slug}'" class="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-50">
        <span class="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-100">${img(p.img, 'h-full w-full object-cover', 100)}</span>
        <span class="min-w-0 flex-1 truncate text-sm">${esc(L(p.name))}</span><span class="text-sm font-semibold">${qar(p.price)}</span></a>`).join('')) ||
      `<p class="p-4 text-sm text-zinc-500">${t('noResults')}</p>`;
    if (hits.length) box.innerHTML += `<button type="button" onmousedown="goSearch('${esc(input.value)}')" class="w-full border-t px-4 py-3 text-start text-sm font-semibold text-brand-700 hover:bg-brand-50">${t('seeAll')} “${esc(input.value)}” →</button>`;
  }
  box.classList.remove('hidden'); lucide.createIcons();
}
function hideSuggest(id) { document.getElementById(id + '-sugg')?.classList.add('hidden'); }
function goSearch(q) { location.hash = `#/search?q=${encodeURIComponent(q)}`; }

function toggleMenu(open) { S.menu = open; const m = document.getElementById('mmenu'); if (m) m.outerHTML = mobileMenu(); lucide.createIcons(); document.body.classList.toggle('overflow-hidden', open); }
function mobileMenu() {
  if (!S.menu) return '<div id="mmenu"></div>';
  return `<div id="mmenu"><div class="fixed inset-0 z-[60] bg-black/40 fade-in" onclick="toggleMenu(false)"></div>
  <aside class="fixed inset-y-0 start-0 z-[61] w-[86%] max-w-sm overflow-y-auto bg-white shadow-2xl slide-in-start">
    <div class="flex items-center justify-between border-b p-4">${logo()}<button class="icon-btn" onclick="toggleMenu(false)">${icon('x')}</button></div>
    <div class="p-4">
      <a href="${S.user ? '#/account' : '#/login'}" onclick="toggleMenu(false)" class="flex items-center gap-3 rounded-2xl bg-brand-50 p-4"><span class="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-white">${icon('user-round')}</span><span class="font-semibold">${S.user ? esc(S.user.name) : t('signIn') + ' / ' + t('register')}</span></a>
      <p class="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">${t('allCats')}</p>
      ${CATEGORIES.map(c => `<a href="#/c/${c.slug}" onclick="toggleMenu(false)" class="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-zinc-50">${icon(c.icon, 'w-5 h-5 text-brand-600')}<span>${L(c.name)}</span></a>`).join('')}
      <div class="my-4 border-t"></div>
      <a href="#/deals" onclick="toggleMenu(false)" class="flex items-center gap-3 rounded-xl px-2 py-2.5">${icon('zap', 'w-5 h-5 text-brand-600')}${t('navDeals')}</a>
      <a href="#/track" onclick="toggleMenu(false)" class="flex items-center gap-3 rounded-xl px-2 py-2.5">${icon('package-search', 'w-5 h-5 text-brand-600')}${t('track')}</a>
      <a href="#/help/delivery" onclick="toggleMenu(false)" class="flex items-center gap-3 rounded-xl px-2 py-2.5">${icon('life-buoy', 'w-5 h-5 text-brand-600')}${t('help')}</a>
      <a href="#/admin" onclick="toggleMenu(false)" class="flex items-center gap-3 rounded-xl px-2 py-2.5">${icon('layout-dashboard', 'w-5 h-5 text-brand-600')}${t('admin')}</a>
      <button onclick="setLang()" class="mt-4 btn-outline w-full">${icon('languages', 'w-4 h-4')}${t('langSwitch')}</button>
    </div>
  </aside></div>`;
}

function openZonePicker() {
  openModal(`<h3 class="text-lg font-semibold">${t('deliverTo')}</h3><p class="mt-1 text-sm text-zinc-500">${S.lang === 'ar' ? 'اختر بلديتك لعرض رسوم ومواعيد التوصيل.' : 'Choose your municipality to see delivery fees and times.'}</p>
    <div class="mt-4 grid grid-cols-2 gap-2">${MUNICIPALITIES.map(m => `<button onclick="S.zone='${m.id}';closeModal();render()" class="rounded-xl border p-3 text-start text-sm hover:border-brand-500 ${(S.zone || 'doha') === m.id ? 'border-brand-600 bg-brand-50' : 'border-zinc-200'}"><b class="block">${L(m)}</b><span class="text-xs text-zinc-500">${m.eta[0] === 0 ? (S.lang === 'ar' ? 'نفس اليوم' : 'Same day') : `${m.eta[0]}–${m.eta[1]} ${S.lang === 'ar' ? 'يوم' : 'days'}`}</span></button>`).join('')}</div>`);
}

function whatsappFab() {
  return `<a href="https://wa.me/97400000000?text=${encodeURIComponent('Hello Dukkan, I need help with my order')}" target="_blank" rel="noopener" class="fixed bottom-20 end-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-600/30 transition hover:scale-105 lg:bottom-6" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24" class="h-7 w-7" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.6.9 1-3.5-.2-.4C2.9 15.8 2.4 14 2.4 12 2.4 6.7 6.7 2.4 12 2.4c2.6 0 5 1 6.8 2.8 1.8 1.8 2.8 4.2 2.8 6.8 0 5.3-4.3 9.8-9.6 9.8zm8.2-18C18 1.6 15.1.4 12 .4 5.6.4.4 5.6.4 12c0 2 .5 4 1.6 5.8L.3 23.6l6-1.6c1.7.9 3.7 1.4 5.7 1.4 6.4 0 11.6-5.2 11.6-11.6 0-3.1-1.2-6-3.4-8.2z"/></svg></a>
  <nav class="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-zinc-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
    ${[['#/', 'house', t('home')], ['#/deals', 'zap', t('navDeals').split(' ')[0]], ['#/wishlist', 'heart', t('wishlist'), 'wish'], ['#/cart', 'shopping-bag', t('cart'), 'cart'], [S.user ? '#/account' : '#/login', 'user-round', t('account')]]
      .map(([h, ic, lb, b]) => `<a href="${h}" class="relative flex flex-col items-center gap-0.5 py-2 text-[11px] ${location.hash === h || (h === '#/' && !location.hash) ? 'text-brand-700 font-semibold' : 'text-zinc-500'}">${icon(ic, 'w-5 h-5')}${lb}${b ? `<span data-badge="${b}" class="badge hidden !top-0.5 !end-[calc(50%-18px)]"></span>` : ''}</a>`).join('')}
  </nav>`;
}

function shopFooter() {
  const col = (title, links) => `<div><h4 class="text-sm font-semibold text-white">${title}</h4><ul class="mt-4 space-y-2.5 text-sm">${links.map(([l, h]) => `<li><a href="${h}" class="hover:text-white">${l}</a></li>`).join('')}</ul></div>`;
  return `<footer class="mt-20 bg-zinc-950 text-zinc-400 pb-16 lg:pb-0">
    <div class="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
      <div class="lg:col-span-2">
        <div class="[&_span]:text-white">${logo()}</div>
        <p class="mt-4 max-w-sm text-sm leading-6">${t('footAbout')}</p>
        <div class="mt-6 space-y-2 text-sm">
          <a href="https://wa.me/97400000000" target="_blank" rel="noopener" class="flex items-center gap-2 hover:text-white">${icon('message-circle', 'w-4 h-4 text-emerald-400')} +974 0000 0000</a>
          <a href="mailto:care@dukkan.qa" class="flex items-center gap-2 hover:text-white">${icon('mail', 'w-4 h-4 text-brand-300')} care@dukkan.qa</a>
          <p class="flex items-center gap-2">${icon('map-pin', 'w-4 h-4 text-brand-300')} ${S.lang === 'ar' ? 'الخليج الغربي، الدوحة، قطر' : 'West Bay, Doha, Qatar'}</p>
        </div>
      </div>
      ${col(t('footShop'), CATEGORIES.slice(0, 6).map(c => [L(c.name), `#/c/${c.slug}`]))}
      ${col(t('footHelp'), [[t('track'), '#/track'], [t('deliveryInfo'), '#/help/delivery'], [t('returnPolicy'), '#/help/returns'], [t('faq'), '#/help/faq'], [t('contactUs'), '#/help/contact']])}
      ${col(t('footCompany'), [[t('aboutUs'), '#/help/about'], [t('sellWithUs'), '#/help/sell'], [t('privacy'), '#/help/privacy'], [t('termsT'), '#/help/terms'], [t('admin'), '#/admin']])}
    </div>
    <div class="border-t border-white/10">
      <div class="container-x flex flex-col gap-4 py-6 text-xs md:flex-row md:items-center md:justify-between">
        <p>© 2026 Dukkan.qa — ${t('rights')} · ${t('crNo')}</p>
        <div class="flex items-center gap-2"><span>${t('weAccept')}</span>${['VISA', 'Mastercard', 'Apple Pay', 'NAPS', 'COD'].map(x => `<span class="rounded-md bg-white/10 px-2 py-1 font-semibold text-white">${x}</span>`).join('')}</div>
      </div>
    </div>
  </footer>`;
}

// ================= Views =================
function shopView(r) {
  const v = { home: homeView, c: categoryView, search: categoryView, deals: categoryView, p: productView, cart: cartView, checkout: checkoutView, order: confirmView, track: trackView, login: loginView, account: accountView, wishlist: wishlistView, help: helpView }[r.name];
  if (v) return v(r);
  return emptyState('compass', '404', S.lang === 'ar' ? 'الصفحة غير موجودة' : 'Page not found', `<a href="#/" class="btn-primary mt-5">${t('home')}</a>`);
}

function sectionHead(title, href, extra = '') {
  return `<div class="mb-5 flex items-end justify-between gap-4"><div class="flex items-center gap-4"><h2 class="text-xl font-bold tracking-tight sm:text-2xl">${title}</h2>${extra}</div>
    ${href ? `<a href="${href}" class="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2 transition-all">${t('seeAll')}${icon('arrow-right', 'w-4 h-4 rtl:rotate-180')}</a>` : ''}</div>`;
}
function rail(products) {
  return `<div class="rail -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">${products.map(p => productCard(p, { w: 'w-[46%] shrink-0 snap-start sm:w-[31%] md:w-[23.5%] lg:w-[18.6%]' })).join('')}</div>`;
}
const byTag = tag => PRODUCTS.filter(p => p.tags.includes(tag));

function homeView() {
  return `
  <section class="container-x pt-5">
    <div class="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div id="hero" class="relative overflow-hidden rounded-3xl">
        ${HERO_SLIDES.map((s, i) => `
        <div class="hero-slide ${i ? 'opacity-0 pointer-events-none' : ''} ${i ? 'absolute inset-0' : 'relative'} bg-gradient-to-br ${s.bg} transition-opacity duration-700" data-i="${i}">
          <div class="absolute inset-0 opacity-40 mix-blend-luminosity">${img(s.img, 'h-full w-full object-cover', 1400)}</div>
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent rtl:bg-gradient-to-l"></div>
          <div class="relative flex min-h-[340px] flex-col justify-center p-7 sm:min-h-[420px] sm:p-12 text-white max-w-xl">
            <span class="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">${icon('sparkles', 'w-3.5 h-3.5')}${L(s.kicker)}</span>
            <h1 class="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">${L(s.title)}</h1>
            <p class="mt-3 text-sm text-white/80 sm:text-base">${L(s.sub)}</p>
            <div class="mt-7 flex gap-3"><a href="${s.href}" class="btn-primary !bg-white !text-zinc-900 hover:!bg-brand-50">${L(s.cta)}${icon('arrow-right', 'w-4 h-4 rtl:rotate-180')}</a></div>
          </div>
        </div>`).join('')}
        <div class="absolute bottom-5 start-7 sm:start-12 z-10 flex gap-2">${HERO_SLIDES.map((_, i) => `<button onclick="heroGo(${i})" class="hero-dot h-2 rounded-full bg-white/50 transition-all ${i ? 'w-2' : 'w-8 !bg-white'}" aria-label="Slide ${i + 1}"></button>`).join('')}</div>
        <div class="absolute bottom-4 end-4 z-10 hidden sm:flex gap-2">
          <button onclick="heroStep(-1)" class="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/30" aria-label="Previous">${icon('chevron-left', 'w-5 h-5 rtl:rotate-180')}</button>
          <button onclick="heroStep(1)" class="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/30" aria-label="Next">${icon('chevron-right', 'w-5 h-5 rtl:rotate-180')}</button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-1">
        <a href="#/c/beauty" class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 to-fuchsia-100 p-5 min-h-[160px]">
          <p class="text-xs font-semibold text-fuchsia-700">${S.lang === 'ar' ? 'عطور وعناية' : 'Fragrance & care'}</p>
          <p class="mt-1 max-w-[60%] text-lg font-bold leading-snug">${S.lang === 'ar' ? 'خصم حتى 40% على العطور' : 'Up to 40% off perfumes'}</p>
          <span class="mt-3 inline-flex items-center gap-1 text-sm font-semibold">${t('seeAll')}${icon('arrow-right', 'w-4 h-4 rtl:rotate-180')}</span>
          <div class="absolute -bottom-4 -end-4 h-32 w-32 overflow-hidden rounded-full transition group-hover:scale-110">${img('1541643600914-78b084683601', 'h-full w-full object-cover', 300)}</div>
        </a>
        <a href="#/c/smart-home" class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-brand-900 p-5 text-white min-h-[160px]">
          <p class="text-xs font-semibold text-brand-200">${S.lang === 'ar' ? 'المنزل الذكي' : 'Smart home'}</p>
          <p class="mt-1 max-w-[60%] text-lg font-bold leading-snug">${S.lang === 'ar' ? 'منزلك أذكى من 159 ر.ق' : 'Smarter home from QAR 159'}</p>
          <span class="mt-3 inline-flex items-center gap-1 text-sm font-semibold">${t('seeAll')}${icon('arrow-right', 'w-4 h-4 rtl:rotate-180')}</span>
          <div class="absolute -bottom-4 -end-4 h-32 w-32 overflow-hidden rounded-full transition group-hover:scale-110">${img('1543512214-318c7553f230', 'h-full w-full object-cover', 300)}</div>
        </a>
      </div>
    </div>
  </section>

  <section class="container-x mt-6">
    <div class="grid grid-cols-2 gap-3 rounded-3xl border border-zinc-100 bg-white p-4 lg:grid-cols-4 lg:p-5">
      ${[['zap', 'perk1'], ['banknote', 'perk2'], ['rotate-ccw', 'perk3'], ['shield-check', 'perk4']].map(([ic, k]) => `
      <div class="flex items-center gap-3"><span class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">${icon(ic)}</span>
      <div class="min-w-0"><p class="text-sm font-semibold">${t(k)}</p><p class="truncate text-xs text-zinc-500">${t(k + 's')}</p></div></div>`).join('')}
    </div>
  </section>

  <section class="container-x mt-14">
    ${sectionHead(t('shopByCat'))}
    <div class="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:gap-4">
      ${CATEGORIES.map(c => `<a href="#/c/${c.slug}" class="group flex flex-col items-center rounded-2xl bg-gradient-to-b ${c.tint} p-3 text-center transition hover:-translate-y-1 hover:shadow-lg sm:p-4">
        <div class="aspect-square w-full overflow-hidden rounded-xl bg-white/60">${img(c.img, 'h-full w-full object-cover transition duration-500 group-hover:scale-110', 300, L(c.name))}</div>
        <p class="mt-3 text-xs font-semibold leading-tight sm:text-sm">${L(c.name)}</p></a>`).join('')}
    </div>
  </section>

  <section class="container-x mt-14">${sectionHead(t('trending'), '#/search?tag=trending', `<span class="hidden sm:inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600">${icon('flame', 'w-3.5 h-3.5')}${S.lang === 'ar' ? 'رائج الآن' : 'Hot'}</span>`)}${rail(byTag('trending'))}</section>

  <section class="container-x mt-14">
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-600 p-6 text-white sm:p-10">
      <div class="absolute -end-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl"></div>
      <div class="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p class="inline-flex items-center gap-2 text-sm font-semibold text-brand-100">${icon('timer', 'w-4 h-4')}${t('specialOffers')}</p>
          <h2 class="mt-2 text-2xl font-extrabold sm:text-4xl">${S.lang === 'ar' ? 'عروض البرق — حتى 50% خصم' : 'Lightning deals — up to 50% off'}</h2>
          <p class="mt-2 text-brand-100">${S.lang === 'ar' ? 'استخدم الرمز QATAR15 لخصم إضافي 15% على الطلبات فوق 300 ر.ق' : 'Use code QATAR15 for an extra 15% off orders over QAR 300'}</p>
        </div>
        <div class="flex items-center gap-3"><span class="text-sm text-brand-100">${t('endsIn')}</span><div id="countdown" class="flex gap-2"></div></div>
      </div>
      <div class="relative mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">${byTag('deal').slice(0, 4).map(p => productCard(p)).join('')}</div>
    </div>
  </section>

  <section class="container-x mt-14">${sectionHead(t('bestSellers'), '#/search?tag=best')}${rail(byTag('best'))}</section>

  <section class="container-x mt-14 grid gap-4 md:grid-cols-2">
    <a href="#/c/furniture-decor" class="group relative overflow-hidden rounded-3xl min-h-[240px]">
      ${img('1555041469-a586c61ea9bc', 'absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105', 1000)}
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div class="absolute bottom-0 p-7 text-white"><p class="text-sm text-white/80">${S.lang === 'ar' ? 'مجموعة الشتاء' : 'Winter living'}</p><h3 class="text-2xl font-bold">${S.lang === 'ar' ? 'أثاث يجمع العائلة' : 'Furniture made for majlis moments'}</h3></div>
    </a>
    <a href="#/c/fashion" class="group relative overflow-hidden rounded-3xl min-h-[240px]">
      ${img('1445205170230-053b83016050', 'absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105', 1000)}
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div class="absolute bottom-0 p-7 text-white"><p class="text-sm text-white/80">${S.lang === 'ar' ? 'أزياء' : 'Fashion'}</p><h3 class="text-2xl font-bold">${S.lang === 'ar' ? 'إطلالات الموسم الجديد' : 'New-season essentials'}</h3></div>
    </a>
  </section>

  <section class="container-x mt-14">${sectionHead(t('newArrivals'), '#/search?tag=new')}<div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">${byTag('new').slice(0, 10).map(p => productCard(p)).join('')}</div></section>

  <section class="container-x mt-14">${sectionHead(t('recommended'), '#/search?tag=rec')}${rail(byTag('rec'))}</section>

  <section class="container-x mt-14">
    ${sectionHead(t('reviewsTitle'))}
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      ${REVIEWS.map(rv => { const p = P(rv.product); return `<figure class="flex flex-col rounded-2xl border border-zinc-100 bg-white p-5">
        ${stars(rv.rating, 'w-4 h-4')}
        <blockquote class="mt-3 flex-1 text-sm leading-6 text-zinc-700">“${L(rv.text)}”</blockquote>
        <figcaption class="mt-4 flex items-center gap-3 border-t pt-4">
          <span class="grid h-10 w-10 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">${rv.name[0]}</span>
          <span class="min-w-0"><span class="block text-sm font-semibold">${rv.name}</span><span class="block truncate text-xs text-zinc-500">${L(rv.city)} · <a href="#/p/${p.slug}" class="hover:text-brand-700">${esc(p.brand)}</a></span></span>
          <span class="ms-auto text-emerald-600" title="${t('verified')}">${icon('badge-check', 'w-5 h-5')}</span>
        </figcaption></figure>`; }).join('')}
    </div>
  </section>

  <section class="container-x mt-14">
    <div class="grid items-center gap-6 rounded-3xl bg-zinc-950 p-7 text-white sm:p-10 lg:grid-cols-2">
      <div><h2 class="text-2xl font-bold sm:text-3xl">${t('newsTitle')}</h2><p class="mt-2 text-zinc-400">${t('newsSub')}</p></div>
      <form onsubmit="event.preventDefault();subscribe(this)" class="flex flex-col gap-2 sm:flex-row">
        <input name="email" type="email" required placeholder="${t('emailPh')}" class="h-12 flex-1 rounded-full border border-white/10 bg-white/5 px-5 text-sm outline-none placeholder:text-zinc-500 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/20">
        <button class="btn-primary h-12">${t('subscribe')}</button>
      </form>
    </div>
  </section>`;
}
function subscribe(f) { if (!/^\S+@\S+\.\S+$/.test(f.email.value)) return toast(t('invalidEmail'), 'err'); f.reset(); toast(t('subscribed')); }

let heroIdx = 0;
function heroGo(i) {
  const slides = document.querySelectorAll('.hero-slide'); if (!slides.length) return;
  heroIdx = (i + slides.length) % slides.length;
  slides.forEach((s, k) => { s.classList.toggle('opacity-0', k !== heroIdx); s.classList.toggle('pointer-events-none', k !== heroIdx); });
  document.querySelectorAll('.hero-dot').forEach((d, k) => { d.classList.toggle('w-8', k === heroIdx); d.classList.toggle('!bg-white', k === heroIdx); d.classList.toggle('w-2', k !== heroIdx); });
}
function heroStep(d) { heroGo(heroIdx + d); }

// ---------- Listing ----------
function categoryView(r) {
  const cat = r.name === 'c' ? C(r.parts[1]) : null;
  const q = (r.q.q || '').toLowerCase(), tag = r.name === 'deals' ? 'deal' : r.q.tag;
  let list = PRODUCTS.filter(p => (!cat || p.cat === cat.slug) && (!q || matchText(p, q)) && (!tag || p.tags.includes(tag) || (tag === 'deal' && p.old)));
  const brands = [...new Set(list.map(p => p.brand))];
  const f = { min: +r.q.min || 0, max: +r.q.max || 0, rating: +r.q.rating || 0, brand: r.q.brand ? r.q.brand.split(',') : [], stock: r.q.stock === '1', sale: r.q.sale === '1', sort: r.q.sort || 'rel' };
  list = list.filter(p => (!f.min || p.price >= f.min) && (!f.max || p.price <= f.max) && p.rating >= f.rating && (!f.brand.length || f.brand.includes(p.brand)) && (!f.stock || p.stock > 0) && (!f.sale || p.old));
  const sorters = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating, new: (a, b) => b.id - a.id };
  if (sorters[f.sort]) list.sort(sorters[f.sort]);
  const title = cat ? L(cat.name) : q ? `${t('searchFor')} “${esc(r.q.q)}”` : r.name === 'deals' ? t('deals') : tag ? { best: t('bestSellers'), new: t('newArrivals'), trending: t('trending'), rec: t('recommended') }[tag] : t('allCats');

  const filters = `
    <div class="space-y-7">
      <div><h4 class="filter-title">${t('allCats')}</h4><div class="space-y-1">${CATEGORIES.map(c => `<a href="#/c/${c.slug}" class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${cat?.slug === c.slug ? 'bg-brand-50 font-semibold text-brand-700' : 'text-zinc-600 hover:bg-zinc-50'}">${icon(c.icon, 'w-4 h-4')}${L(c.name)}</a>`).join('')}</div></div>
      <div><h4 class="filter-title">${t('price')} (QAR)</h4><div class="flex items-center gap-2"><input id="fmin" type="number" min="0" placeholder="0" value="${f.min || ''}" class="input !h-10"><span class="text-zinc-400">–</span><input id="fmax" type="number" min="0" placeholder="5000" value="${f.max || ''}" class="input !h-10"></div>
        <div class="mt-2 flex flex-wrap gap-1.5">${[[0, 100], [100, 500], [500, 1000], [1000, 0]].map(([a, b]) => `<button onclick="setFilter({min:${a}||'',max:${b}||''})" class="chip">${b ? `${a}–${b}` : `${a}+`}</button>`).join('')}</div></div>
      <div><h4 class="filter-title">${t('rating')}</h4>${[4.5, 4, 3].map(v => `<label class="flex cursor-pointer items-center gap-2 py-1 text-sm"><input type="radio" name="rating" ${f.rating === v ? 'checked' : ''} onchange="setFilter({rating:${v}})" class="accent-brand-600">${stars(v)} <span class="text-zinc-500">${t('andUp')}</span></label>`).join('')}</div>
      ${brands.length > 1 ? `<div><h4 class="filter-title">${t('brand_')}</h4>${brands.map(b => `<label class="flex cursor-pointer items-center gap-2 py-1 text-sm"><input type="checkbox" class="fbrand accent-brand-600 h-4 w-4" value="${b}" ${f.brand.includes(b) ? 'checked' : ''} onchange="setFilter({brand:[...document.querySelectorAll('.fbrand:checked')].map(x=>x.value).join(',')})">${b}</label>`).join('')}</div>` : ''}
      <div><h4 class="filter-title">${t('availability')}</h4>
        <label class="flex cursor-pointer items-center gap-2 py-1 text-sm"><input type="checkbox" class="accent-brand-600 h-4 w-4" ${f.stock ? 'checked' : ''} onchange="setFilter({stock:this.checked?1:''})">${t('inStockOnly')}</label>
        <label class="flex cursor-pointer items-center gap-2 py-1 text-sm"><input type="checkbox" class="accent-brand-600 h-4 w-4" ${f.sale ? 'checked' : ''} onchange="setFilter({sale:this.checked?1:''})">${t('onSale')}</label></div>
      <div class="flex gap-2"><button onclick="setFilter({min:document.getElementById('fmin').value,max:document.getElementById('fmax').value})" class="btn-primary flex-1 !h-10">${t('apply')}</button><button onclick="clearFilters()" class="btn-outline !h-10">${t('clear')}</button></div>
    </div>`;

  return `
  ${cat ? `<div class="bg-gradient-to-b ${cat.tint}"><div class="container-x flex items-center justify-between gap-6 py-8">
    <div>${crumbs([[t('home'), '#/'], [L(cat.name)]])}<h1 class="mt-2 text-3xl font-extrabold tracking-tight">${L(cat.name)}</h1><p class="mt-1 text-sm text-zinc-600">${t('results', { n: list.length })}</p></div>
    <div class="hidden sm:block h-28 w-28 overflow-hidden rounded-3xl shadow-lg rotate-3">${img(cat.img, 'h-full w-full object-cover', 300)}</div></div></div>`
    : `<div class="container-x pt-8">${crumbs([[t('home'), '#/'], [title]])}<h1 class="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">${title}</h1>${r.name === 'deals' ? `<p class="mt-1 text-zinc-500">${t('dealsSub')}</p>` : ''}</div>`}
  <div class="container-x mt-6 grid gap-8 lg:grid-cols-[250px_1fr]">
    <aside class="hidden lg:block">${filters}</aside>
    <div>
      <div class="mb-5 flex items-center justify-between gap-3">
        <p class="text-sm text-zinc-500">${t('results', { n: list.length })}</p>
        <div class="flex items-center gap-2">
          <button onclick="openModal(document.getElementById('ftpl').innerHTML)" class="btn-outline !h-10 lg:hidden">${icon('sliders-horizontal', 'w-4 h-4')}${t('filters')}</button>
          <select onchange="setFilter({sort:this.value})" class="input !h-10 !w-auto pe-8" aria-label="${t('sortBy')}">
            ${['rel', 'low', 'high', 'rating', 'new'].map(s => `<option value="${s}" ${f.sort === s ? 'selected' : ''}>${t({ rel: 'sortRel', low: 'sortLow', high: 'sortHigh', rating: 'sortRating', new: 'sortNew' }[s])}</option>`).join('')}
          </select>
        </div>
      </div>
      ${list.length ? `<div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">${list.map(p => productCard(p)).join('')}</div>` : emptyState('search-x', t('noResults'), '', `<button onclick="clearFilters()" class="btn-outline mt-5">${t('clear')}</button>`)}
    </div>
  </div>
  <template id="ftpl"><h3 class="mb-5 text-lg font-semibold">${t('filters')}</h3>${filters}</template>`;
}
function setFilter(obj) {
  const [path, qs] = location.hash.split('?'); const sp = new URLSearchParams(qs || '');
  for (const k in obj) { if (obj[k] === '' || obj[k] == null) sp.delete(k); else sp.set(k, obj[k]); }
  closeModal(); location.hash = `${path}?${sp}`;
}
function clearFilters() { const [path, qs] = location.hash.split('?'); const sp = new URLSearchParams(qs || ''); const keep = new URLSearchParams(); ['q', 'tag'].forEach(k => sp.get(k) && keep.set(k, sp.get(k))); closeModal(); location.hash = `${path}?${keep}`; }
function crumbs(items) {
  return `<nav class="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500" aria-label="Breadcrumb">${items.map(([l, h], i) => (h ? `<a href="${h}" class="hover:text-brand-700">${l}</a>` : `<span class="text-zinc-800 font-medium line-clamp-1">${l}</span>`) + (i < items.length - 1 ? icon('chevron-right', 'w-3 h-3 rtl:rotate-180') : '')).join('')}</nav>`;
}

// ---------- Product detail ----------
const PD = { img: 0, color: 0, size: 0, qty: 1, tab: 'desc' };
function productView(r) {
  const p = PRODUCTS.find(x => x.slug === r.parts[1]);
  if (!p) return emptyState('package-x', '404', '', `<a href="#/" class="btn-primary mt-5">${t('home')}</a>`);
  if (PD.slug !== p.slug) Object.assign(PD, { slug: p.slug, img: 0, color: 0, size: 0, qty: 1, tab: 'desc' });
  const cat = C(p.cat), d = pct(p), zone = MUNICIPALITIES.find(m => m.id === (S.zone || 'doha'));
  const gallery = [IMG(p.img, 1000), IMG(p.img, 1000, '&crop=entropy&h=1000&fp-z=1.6&fp-x=0.4&fp-y=0.45&crop=focalpoint'), IMG(p.img, 1000, '&sat=-100'), IMG(CATEGORIES.find(c => c.slug === p.cat).img, 1000)];
  const colorNames = { '#111111': ['Black', 'أسود'], '#d4d4d8': ['Silver', 'فضي'], '#1e3a8a': ['Navy', 'كحلي'], '#f5f5f4': ['White', 'أبيض'], '#fafafa': ['White', 'أبيض'], '#a1a1aa': ['Space Grey', 'رمادي'], '#27272a': ['Graphite', 'جرافيت'], '#7c6f64': ['Taupe', 'بني فاتح'], '#1f2937': ['Charcoal', 'فحمي'], '#a3a380': ['Olive', 'زيتي'], '#7f1d1d': ['Maroon', 'عنابي'], '#d6c7b0': ['Sand', 'رملي'], '#dc2626': ['Red', 'أحمر'], '#7c3aed': ['Purple', 'بنفسجي'], '#0f766e': ['Teal', 'أخضر مزرق'], '#e7e5e4': ['Chalk', 'طباشيري'], '#e5e7eb': ['Silver', 'فضي'], '#6d28d9': ['Violet', 'بنفسجي'] };
  const cName = c => (colorNames[c] || [c, c])[S.lang === 'ar' ? 1 : 0];
  const variant = [p.colors ? cName(p.colors[PD.color]) : '', p.sizes ? p.sizes[PD.size] : ''].filter(Boolean).join(' / ');
  const eta = zone.eta[0] === 0 ? (new Date().getHours() < 14 ? (S.lang === 'ar' ? 'اليوم' : 'Today') : dateIn(1)) : `${dateIn(zone.eta[0])} – ${dateIn(zone.eta[1])}`;
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.name.en, image: [IMG(p.img, 1000)], brand: { '@type': 'Brand', name: p.brand }, sku: `DK-${p.id}`, aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews }, offers: { '@type': 'Offer', priceCurrency: 'QAR', price: p.price, availability: p.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } };
  const dist = [72, 18, 6, 2, 2];
  document.title = `${L(p.name)} | Dukkan.qa`;

  return `<script type="application/ld+json">${JSON.stringify(ld)}</script>
  <div class="container-x pt-6">${crumbs([[t('home'), '#/'], [L(cat.name), `#/c/${cat.slug}`], [L(p.name)]])}</div>
  <section class="container-x mt-5 grid gap-8 lg:grid-cols-[1.1fr_1fr] xl:gap-12">
    <div class="lg:sticky lg:top-36 self-start">
      <div class="flex flex-col-reverse gap-3 sm:flex-row">
        <div class="flex gap-3 sm:flex-col">${gallery.map((g, i) => `<button onclick="PD.img=${i};render()" class="h-16 w-16 overflow-hidden rounded-xl border-2 bg-zinc-50 sm:h-20 sm:w-20 ${PD.img === i ? 'border-brand-600' : 'border-transparent opacity-70 hover:opacity-100'}"><img src="${g}" class="h-full w-full object-cover" loading="lazy" onerror="${imgFallback}" alt=""></button>`).join('')}</div>
        <div class="relative flex-1 overflow-hidden rounded-3xl bg-zinc-50 aspect-square zoom-wrap" onmousemove="zoomMove(event,this)" onmouseleave="this.firstElementChild.style.transform=''">
          <img src="${gallery[PD.img]}" alt="${esc(L(p.name))}" class="h-full w-full object-cover transition-transform duration-200" onerror="${imgFallback}">
          ${d ? `<span class="absolute start-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">-${d}% ${t('off')}</span>` : ''}
          <div class="absolute end-4 top-4 flex flex-col gap-2">
            <button data-wish="${p.id}" onclick="toggleWish(${p.id},event)" class="wish-btn grid h-10 w-10 place-items-center rounded-full bg-white shadow ${isWished(p.id) ? 'wished' : ''}" aria-label="${t('wishlist')}">${icon('heart', 'w-5 h-5')}</button>
            <button onclick="shareProduct()" class="grid h-10 w-10 place-items-center rounded-full bg-white shadow" aria-label="${t('share')}">${icon('share-2', 'w-5 h-5')}</button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <a href="#/search?q=${encodeURIComponent(p.brand)}" class="text-sm font-semibold text-brand-700 hover:underline">${esc(p.brand)}</a>
      <h1 class="mt-1 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">${esc(L(p.name))}</h1>
      <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <span class="inline-flex items-center gap-1.5">${stars(p.rating, 'w-4 h-4')}<b>${p.rating}</b></span>
        <a href="#reviews" onclick="event.preventDefault();PD.tab='rev';render();setTimeout(()=>document.getElementById('reviews').scrollIntoView({behavior:'smooth'}),50)" class="text-zinc-500 underline-offset-2 hover:underline">${num(p.reviews)} ${t('ratings')}</a>
        ${p.tags.includes('best') ? `<span class="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">#1 ${t('bestSellers')}</span>` : ''}
      </div>

      <div class="mt-6 rounded-2xl bg-zinc-50 p-5">
        <div class="flex flex-wrap items-end gap-3">
          <span class="text-3xl font-extrabold tracking-tight">${qar(p.price)}</span>
          ${p.old ? `<span class="pb-1 text-zinc-400 line-through">${qar(p.old)}</span><span class="mb-1 rounded-md bg-red-50 px-2 py-0.5 text-sm font-bold text-red-600">${S.lang === 'ar' ? 'وفّر' : 'Save'} ${qar(p.old - p.price)}</span>` : ''}
        </div>
        <p class="mt-1 text-xs text-zinc-500">${t('vatNote')}</p>
        <p class="mt-3 text-sm">${S.lang === 'ar' ? 'أو 4 دفعات بدون فوائد بقيمة' : 'Or 4 interest-free payments of'} <b>${qar(Math.ceil(p.price / 4))}</b></p>
      </div>

      ${p.colors ? `<div class="mt-6"><p class="text-sm"><span class="text-zinc-500">${t('color')}:</span> <b>${cName(p.colors[PD.color])}</b></p>
        <div class="mt-2 flex gap-2">${p.colors.map((c, i) => `<button onclick="PD.color=${i};render()" class="h-10 w-10 rounded-full border-2 p-0.5 ${PD.color === i ? 'border-brand-600' : 'border-zinc-200'}" aria-label="${cName(c)}"><span class="block h-full w-full rounded-full ring-1 ring-black/10" style="background:${c}"></span></button>`).join('')}</div></div>` : ''}
      ${p.sizes ? `<div class="mt-5"><p class="text-sm"><span class="text-zinc-500">${t('size')}:</span> <b>${p.sizes[PD.size]}</b></p>
        <div class="mt-2 flex flex-wrap gap-2">${p.sizes.map((s, i) => `<button onclick="PD.size=${i};render()" class="h-10 min-w-[3rem] rounded-xl border px-3 text-sm font-semibold ${PD.size === i ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-zinc-200 hover:border-zinc-400'}">${s}</button>`).join('')}</div></div>` : ''}

      <div class="mt-6 flex items-center gap-3 text-sm font-semibold ${p.stock === 0 ? 'text-red-600' : p.stock < 15 ? 'text-amber-600' : 'text-emerald-600'}">
        ${icon(p.stock ? 'circle-check' : 'circle-x', 'w-4 h-4')}${p.stock === 0 ? t('outOfStock') : p.stock < 15 ? t('onlyLeft', { n: p.stock }) : t('inStock')}
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-3">
        ${qtyControl(PD.qty, 'PD.qty--;render()', `PD.qty=Math.min(${p.stock || 1},PD.qty+1);render()`)}
        <button ${p.stock ? '' : 'disabled'} onclick="addToCart(${p.id},PD.qty,'${esc(variant)}')" class="btn-primary h-11 flex-1">${icon('shopping-bag', 'w-4 h-4')}${t('addToCart')}</button>
        <button ${p.stock ? '' : 'disabled'} onclick="addToCart(${p.id},PD.qty,'${esc(variant)}',false);location.hash='#/checkout'" class="btn-dark h-11 flex-1">${icon('zap', 'w-4 h-4')}${t('buyNow')}</button>
      </div>

      <div class="mt-6 divide-y rounded-2xl border border-zinc-100">
        <div class="flex gap-3 p-4"><span class="text-brand-600">${icon('truck')}</span><div class="text-sm">
          <p><span class="text-zinc-500">${t('getItBy')}</span> <b class="text-emerald-700">${eta}</b> · <button onclick="openZonePicker()" class="font-medium text-brand-700 underline-offset-2 hover:underline">${L(zone)}</button></p>
          <p class="mt-0.5 text-xs text-zinc-500">${t('orderWithin', { t: cutoffLeft() })} · ${p.price >= FREE_OVER ? t('freeDelivery') : qar(15)}</p></div></div>
        <div class="grid grid-cols-3 divide-x rtl:divide-x-reverse text-center text-xs">
          ${[['banknote', t('codAvail')], ['rotate-ccw', t('returns14')], ['shield-check', t('warranty')]].map(([ic, l]) => `<div class="flex flex-col items-center gap-1.5 p-3 text-zinc-600">${icon(ic, 'w-5 h-5 text-zinc-800')}${l}</div>`).join('')}
        </div>
        <div class="flex items-center gap-2 p-4 text-sm"><span class="text-zinc-500">${t('soldBy')}</span><b>Dukkan.qa</b>${icon('badge-check', 'w-4 h-4 text-brand-600')}</div>
      </div>
    </div>
  </section>

  <section class="container-x mt-14" id="reviews">
    <div class="flex gap-6 border-b">${[['desc', t('description')], ['spec', t('specs')], ['rev', `${t('customerReviews')} (${num(p.reviews)})`]].map(([k, l]) => `<button onclick="PD.tab='${k}';render()" class="-mb-px border-b-2 pb-3 text-sm font-semibold ${PD.tab === k ? 'border-brand-600 text-brand-700' : 'border-transparent text-zinc-500 hover:text-zinc-900'}">${l}</button>`).join('')}</div>
    <div class="py-8">
      ${PD.tab === 'desc' ? `<div class="prose-sm max-w-3xl space-y-4 text-zinc-700 leading-7">
        <p>${S.lang === 'ar' ? `يقدّم ${esc(L(p.name))} أداءً استثنائياً وتصميماً أنيقاً يناسب حياتك اليومية في قطر. مصنوع من مواد عالية الجودة ومختبر لضمان المتانة.` : `${esc(L(p.name))} delivers standout performance and a refined design made for everyday life in Qatar. Built from premium materials and quality-checked before dispatch.`}</p>
        <ul class="list-disc ps-5 space-y-1">${(S.lang === 'ar' ? ['ضمان رسمي لمدة سنة في قطر', 'توصيل سريع لجميع البلديات', 'إرجاع مجاني خلال 14 يوماً', 'دعم عملاء بالعربية والإنجليزية'] : ['Official 1-year warranty in Qatar', 'Fast delivery to every municipality', 'Free returns within 14 days', 'Arabic & English customer support']).map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}
      ${PD.tab === 'spec' ? `<dl class="grid max-w-3xl overflow-hidden rounded-2xl border sm:grid-cols-2">${[[t('brand_'), p.brand], ['SKU', `DK-${String(p.id).padStart(5, '0')}`], [S.lang === 'ar' ? 'القسم' : 'Category', L(cat.name)], [t('color'), p.colors ? p.colors.map(cName).join(', ') : '—'], [t('size'), p.sizes ? p.sizes.join(', ') : '—'], [S.lang === 'ar' ? 'الضمان' : 'Warranty', S.lang === 'ar' ? 'سنة واحدة' : '1 year'], [S.lang === 'ar' ? 'بلد الشحن' : 'Ships from', S.lang === 'ar' ? 'مستودع الدوحة' : 'Doha warehouse'], [S.lang === 'ar' ? 'الإرجاع' : 'Returns', S.lang === 'ar' ? '14 يوماً' : '14 days']].map(([k, v]) => `<div class="flex justify-between gap-4 border-b p-4 text-sm odd:bg-zinc-50/60"><dt class="text-zinc-500">${k}</dt><dd class="font-medium text-end">${v}</dd></div>`).join('')}</dl>` : ''}
      ${PD.tab === 'rev' ? `<div class="grid gap-10 lg:grid-cols-[300px_1fr]">
        <div><div class="flex items-end gap-3"><span class="text-5xl font-extrabold">${p.rating}</span><div class="pb-1">${stars(p.rating, 'w-5 h-5')}<p class="text-xs text-zinc-500 mt-1">${num(p.reviews)} ${t('ratings')}</p></div></div>
          <div class="mt-5 space-y-2">${dist.map((v, i) => `<div class="flex items-center gap-3 text-sm"><span class="w-3">${5 - i}</span>${icon('star', 'w-3.5 h-3.5 text-amber-400 fill-amber-400')}<div class="h-2 flex-1 rounded-full bg-zinc-100"><div class="h-full rounded-full bg-amber-400" style="width:${v}%"></div></div><span class="w-9 text-end text-zinc-500">${v}%</span></div>`).join('')}</div>
          <button onclick="${S.user ? `openReviewModal()` : `location.hash='#/login'`}" class="btn-outline mt-6 w-full">${icon('pen-line', 'w-4 h-4')}${t('writeReview')}</button></div>
        <div class="divide-y">${REVIEWS.map(rv => `<div class="py-5 first:pt-0"><div class="flex items-center gap-3"><span class="grid h-9 w-9 place-items-center rounded-full bg-zinc-100 font-semibold">${rv.name[0]}</span><div><p class="text-sm font-semibold">${rv.name}</p><p class="text-xs text-zinc-500">${L(rv.city)} · <span class="text-emerald-600">${t('verified')}</span></p></div><span class="ms-auto">${stars(rv.rating)}</span></div><p class="mt-3 text-sm leading-6 text-zinc-700">${L(rv.text)}</p><button onclick="this.classList.add('text-brand-700');toast('${t('saved')}')" class="mt-2 inline-flex items-center gap-1 text-xs text-zinc-500">${icon('thumbs-up', 'w-3.5 h-3.5')}${t('helpful')}</button></div>`).join('')}</div></div>` : ''}
    </div>
  </section>

  <section class="container-x mt-6">${sectionHead(t('related'), `#/c/${cat.slug}`)}${rail(PRODUCTS.filter(x => x.id !== p.id && (x.cat === p.cat || x.tags.includes('rec'))).slice(0, 8))}</section>

  <div class="fixed inset-x-0 bottom-[57px] z-20 flex items-center gap-3 border-t bg-white/95 p-3 backdrop-blur lg:hidden">
    <div class="min-w-0"><p class="text-lg font-bold leading-none">${qar(p.price)}</p>${p.old ? `<p class="text-xs text-zinc-400 line-through">${qar(p.old)}</p>` : ''}</div>
    <button ${p.stock ? '' : 'disabled'} onclick="addToCart(${p.id},PD.qty,'${esc(variant)}')" class="btn-primary ms-auto h-11 flex-1">${t('addToCart')}</button>
  </div>`;
}
function zoomMove(e, el) { if (matchMedia('(hover:none)').matches) return; const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width * 100, y = (e.clientY - r.top) / r.height * 100; el.firstElementChild.style.transformOrigin = `${x}% ${y}%`; el.firstElementChild.style.transform = 'scale(1.8)'; }
function shareProduct() { try { navigator.clipboard.writeText(location.href); } catch (e) { } toast(t('copied')); }
function openReviewModal() {
  openModal(`<h3 class="text-lg font-semibold">${t('writeReview')}</h3>
    <div class="mt-4 flex gap-1" id="rvstars">${[1, 2, 3, 4, 5].map(i => `<button onclick="document.querySelectorAll('#rvstars button').forEach((b,k)=>b.classList.toggle('text-amber-400',k<${i}))" class="text-zinc-300 text-amber-400">${icon('star', 'w-7 h-7 fill-current')}</button>`).join('')}</div>
    <textarea class="input mt-4 !h-28 py-3" placeholder="${S.lang === 'ar' ? 'شارك تجربتك…' : 'Share your experience…'}"></textarea>
    <button onclick="closeModal();toast('${t('submitted')}')" class="btn-primary mt-4 w-full">${t('submit')}</button>`);
}

// ---------- Cart ----------
function cartView() {
  if (!S.cart.length) return `<div class="container-x py-10">${emptyState('shopping-bag', t('cartEmpty'), t('cartEmptySub'), `<a href="#/" class="btn-primary mt-5">${t('startShopping')}</a>`)}<div class="mt-10">${sectionHead(t('recommended'))}${rail(byTag('rec'))}</div></div>`;
  return `<div class="container-x pt-8"><h1 class="text-2xl font-extrabold tracking-tight sm:text-3xl">${t('yourCart')} <span class="text-zinc-400 font-normal text-lg">(${cartCount()} ${t('items')})</span></h1></div>
  <div class="container-x mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
    <div class="divide-y rounded-3xl border border-zinc-100 bg-white">
      ${S.cart.map((l, i) => { const p = P(l.id); return `<div class="flex gap-4 p-4 sm:p-5">
        <a href="#/p/${p.slug}" class="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-50 sm:h-28 sm:w-28">${img(p.img, 'h-full w-full object-cover', 300)}</a>
        <div class="flex min-w-0 flex-1 flex-col">
          <div class="flex justify-between gap-3"><a href="#/p/${p.slug}" class="line-clamp-2 font-medium hover:text-brand-700">${esc(L(p.name))}</a><span class="shrink-0 font-bold">${qar(p.price * l.qty)}</span></div>
          ${l.variant ? `<p class="mt-0.5 text-xs text-zinc-500">${esc(l.variant)}</p>` : ''}
          <p class="mt-1 text-xs text-emerald-600">${t('getItBy')} ${dateIn(1)}</p>
          <div class="mt-auto flex flex-wrap items-center gap-4 pt-3">${qtyControl(l.qty, `setQty(${i},${l.qty - 1})`, `setQty(${i},${l.qty + 1})`, 'sm')}
            <button onclick="moveToWish(${i})" class="text-xs font-medium text-zinc-500 hover:text-brand-700">${t('saveLater')}</button>
            <button onclick="removeLine(${i})" class="text-xs font-medium text-zinc-500 hover:text-red-600">${t('remove')}</button></div>
        </div></div>`; }).join('')}
    </div>
    ${summaryBox(`<a href="#/checkout" class="btn-primary w-full mt-5">${t('checkout')}${icon('arrow-right', 'w-4 h-4 rtl:rotate-180')}</a><a href="#/" class="btn-outline w-full mt-2">${t('continueShopping')}</a>`)}
  </div>`;
}
function summaryBox(cta, opts = {}) {
  const sub = subtotal(), disc = discountAmt(sub), del = deliveryFee(sub, opts.zone, opts.express), total = Math.max(0, sub - disc + del);
  return `<aside class="h-fit rounded-3xl border border-zinc-100 bg-white p-5 lg:sticky lg:top-36">
    <h2 class="font-semibold">${t('orderSummary')}</h2>
    ${opts.items ? `<div class="mt-4 max-h-64 space-y-3 overflow-y-auto">${S.cart.map(l => { const p = P(l.id); return `<div class="flex items-center gap-3"><span class="relative h-14 w-14 shrink-0 rounded-xl bg-zinc-50">${img(p.img, 'h-full w-full rounded-xl object-cover', 150)}<span class="absolute -end-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-zinc-800 px-1 text-[10px] font-bold text-white">${l.qty}</span></span><span class="line-clamp-2 flex-1 text-xs">${esc(L(p.name))}</span><span class="text-sm font-semibold">${qar(p.price * l.qty)}</span></div>`; }).join('')}</div>` : ''}
    <form onsubmit="event.preventDefault();applyCoupon(this.c.value)" class="mt-4 flex gap-2"><input name="c" value="${S.coupon?.code || ''}" placeholder="${t('coupon')}" class="input !h-10 uppercase"><button class="btn-outline !h-10 shrink-0">${t('applyCoupon')}</button></form>
    <p class="mt-1.5 text-[11px] text-zinc-400">${S.lang === 'ar' ? 'جرّب' : 'Try'}: WELCOME10 · QATAR15 · FREESHIP</p>
    <dl class="mt-4 space-y-2.5 text-sm">
      <div class="flex justify-between"><dt class="text-zinc-500">${t('subtotal')}</dt><dd>${qar(sub)}</dd></div>
      ${disc ? `<div class="flex justify-between text-emerald-600"><dt>${t('discount')} (${S.coupon.code}) <button onclick="S.coupon=null;render()" class="text-xs underline">${t('remove')}</button></dt><dd>−${qar(disc)}</dd></div>` : ''}
      <div class="flex justify-between"><dt class="text-zinc-500">${t('delivery')}</dt><dd>${del ? qar(del) : `<span class="font-semibold text-emerald-600">${t('free')}</span>`}</dd></div>
      <div class="flex justify-between border-t pt-3 text-base font-bold"><dt>${t('total')}</dt><dd>${qar(total)}</dd></div>
    </dl>
    <p class="mt-2 text-[11px] text-zinc-400">${t('vatNote')}</p>
    ${cta}
    <p class="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500">${icon('lock', 'w-3.5 h-3.5')}${t('secure')}</p>
  </aside>`;
}

// ---------- Checkout ----------
const CO = { zone: 'doha', express: false, pay: 'cod' };
function checkoutView() {
  if (!S.cart.length) return cartView();
  const u = S.user || {};
  const field = (name, label, attrs = '', val = '') => `<label class="block"><span class="label">${label}</span><input name="${name}" value="${esc(val)}" class="input" ${attrs}></label>`;
  const step = (n, title, body) => `<section class="rounded-3xl border border-zinc-100 bg-white p-5 sm:p-6"><h2 class="flex items-center gap-3 font-semibold"><span class="grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">${n}</span>${title}</h2><div class="mt-5">${body}</div></section>`;
  const payOpt = (k, ic, title, sub) => `<label class="pay-opt flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${CO.pay === k ? 'border-brand-600 bg-brand-50/50' : 'border-zinc-100 hover:border-zinc-300'}">
    <input type="radio" name="pay" value="${k}" ${CO.pay === k ? 'checked' : ''} onchange="CO.pay='${k}';keepForm(render)" class="mt-1 accent-brand-600"><span class="text-brand-700">${icon(ic)}</span><span><b class="block text-sm">${title}</b><span class="text-xs text-zinc-500">${sub}</span></span></label>`;
  return `<div class="container-x pt-8 flex items-center justify-between"><h1 class="text-2xl font-extrabold tracking-tight sm:text-3xl">${t('checkout').replace(/^Proceed to c/, 'C')}</h1><span class="flex items-center gap-1.5 text-sm text-zinc-500">${icon('lock', 'w-4 h-4')}${t('secure')}</span></div>
  <form id="coform" novalidate onsubmit="event.preventDefault();placeOrder(this)" class="container-x mt-6 grid gap-8 lg:grid-cols-[1fr_400px]">
    <div class="space-y-5">
      ${step(1, t('contact'), `<div class="grid gap-4 sm:grid-cols-2">
        ${field('name', t('fullName'), 'required autocomplete="name"', u.name)}
        <label class="block"><span class="label">${t('mobile')}</span><div class="flex" dir="ltr"><span class="inline-flex h-12 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-s-xl border border-e-0 border-zinc-200 bg-zinc-50 px-3 text-sm font-medium">🇶🇦 +974</span><input name="phone" dir="ltr" inputmode="numeric" maxlength="8" required pattern="[3567][0-9]{7}" value="${esc(u.phone || '')}" placeholder="5512 3344" class="input !rounded-s-none"></div></label>
        <div class="sm:col-span-2">${field('email', t('email'), 'type="email" autocomplete="email"', u.email)}</div></div>`)}
      ${step(2, t('address'), `<div class="grid gap-4 sm:grid-cols-2">
        <label class="block"><span class="label">${t('municipality')}</span><select name="zone" onchange="CO.zone=this.value;keepForm(render)" class="input">${MUNICIPALITIES.map(m => `<option value="${m.id}" ${CO.zone === m.id ? 'selected' : ''}>${L(m)}</option>`).join('')}</select></label>
        ${field('area', t('area'), 'required placeholder="' + (S.lang === 'ar' ? 'مثال: الخليج الغربي' : 'e.g. West Bay') + '"')}
        <div class="sm:col-span-2 grid grid-cols-3 gap-3">${field('zoneNo', t('zoneNo'), 'required inputmode="numeric" placeholder="66"')}${field('street', t('streetNo'), 'required inputmode="numeric" placeholder="850"')}${field('building', t('buildingNo'), 'required inputmode="numeric" placeholder="12"')}</div>
        <p class="sm:col-span-2 -mt-2 flex items-center gap-2 text-xs text-zinc-500"><span class="inline-grid h-5 w-7 place-items-center rounded bg-blue-700 text-[9px] font-bold text-white">QA</span>${t('blueplate')}</p>
        ${field('unit', t('unit'), 'placeholder="Apt 1203"')}${field('pobox', t('poBox'), 'inputmode="numeric"')}
        <div class="sm:col-span-2">${field('landmark', t('landmark'))}</div>
        <button type="button" onclick="toast('${t('comingSoon')}: Google Maps')" class="btn-outline sm:col-span-2">${icon('map-pinned', 'w-4 h-4')}${t('pinMap')}</button></div>`)}
      ${step(3, t('deliveryOpt'), `<div class="grid gap-3 sm:grid-cols-2">
        ${[[false, t('standard'), (() => { const z = MUNICIPALITIES.find(m => m.id === CO.zone); return z.eta[0] === 0 ? `${t('getItBy')} ${dateIn(1)}` : `${dateIn(z.eta[0])} – ${dateIn(z.eta[1])}`; })(), deliveryFee(subtotal(), CO.zone, false)], [true, t('express'), S.lang === 'ar' ? 'اطلب قبل 2 ظهراً — داخل الدوحة الكبرى' : 'Order before 2 PM — Greater Doha', deliveryFee(subtotal(), CO.zone, true)]].map(([ex, title, sub, fee]) => `
        <label class="flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 ${CO.express === ex ? 'border-brand-600 bg-brand-50/50' : 'border-zinc-100 hover:border-zinc-300'}"><input type="radio" name="ship" ${CO.express === ex ? 'checked' : ''} onchange="CO.express=${ex};keepForm(render)" class="mt-1 accent-brand-600"><span class="flex-1"><b class="block text-sm">${title}</b><span class="text-xs text-zinc-500">${sub}</span></span><b class="text-sm">${fee ? qar(fee) : `<span class="text-emerald-600">${t('free')}</span>`}</b></label>`).join('')}</div>`)}
      ${step(4, t('payment'), `<div class="grid gap-3">
        ${payOpt('cod', 'banknote', t('cod'), t('codSub'))}
        ${payOpt('card', 'credit-card', t('card'), t('cardSub'))}
        ${CO.pay === 'card' ? `<div class="grid gap-3 rounded-2xl bg-zinc-50 p-4 sm:grid-cols-2"><div class="sm:col-span-2">${field('cardno', t('cardNo'), 'dir="ltr" inputmode="numeric" autocomplete="cc-number" placeholder="•••• •••• •••• ••••"')}</div>${field('exp', t('expiry'), 'dir="ltr" placeholder="MM/YY" autocomplete="cc-exp"')}${field('cvv', t('cvv'), 'dir="ltr" inputmode="numeric" maxlength="4" placeholder="•••"')}<div class="sm:col-span-2">${field('cname', t('nameOnCard'), 'autocomplete="cc-name"')}</div><p class="sm:col-span-2 text-xs text-zinc-500">${icon('shield-check', 'w-3.5 h-3.5 inline -mt-0.5 me-1')}${S.lang === 'ar' ? 'في النسخة الكاملة يتم إدخال البطاقة في صفحة بوابة الدفع الآمنة (مثل QPay / SkipCash / Dibsy) ولا نخزن بيانات البطاقة.' : 'In the live build, card details are entered on the secure gateway page (e.g. QPay / SkipCash / Dibsy). We never store card data.'}</p></div>` : ''}
        ${payOpt('apple', 'smartphone', t('applePay'), t('applePaySub'))}
        <label class="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" name="wa" checked class="h-4 w-4 accent-brand-600">${icon('message-circle', 'w-4 h-4 text-emerald-600')}${t('notifyMe')}</label></div>`)}
    </div>
    ${summaryBox(`<button class="btn-primary mt-5 w-full h-12 text-base">${t('placeOrder')} · ${qar(Math.max(0, subtotal() - discountAmt(subtotal()) + deliveryFee(subtotal(), CO.zone, CO.express)))}</button>`, { items: true, zone: CO.zone, express: CO.express })}
  </form>`;
}
// Re-render while preserving what the user typed in the checkout form.
function keepForm(fn) {
  const f = document.getElementById('coform'); const vals = {};
  if (f) [...f.elements].forEach(e => { if (e.name && e.type !== 'radio' && e.type !== 'checkbox') vals[e.name] = e.value; });
  fn(); const nf = document.getElementById('coform');
  if (nf) for (const k in vals) if (nf.elements[k] && nf.elements[k].tagName !== 'SELECT') nf.elements[k].value = vals[k];
}
function placeOrder(f) {
  let ok = true;
  f.querySelectorAll('.input').forEach(i => i.classList.remove('invalid'));
  ['name', 'area', 'zoneNo', 'street', 'building'].forEach(n => { if (!f.elements[n].value.trim()) { f.elements[n].classList.add('invalid'); ok = false; } });
  const phone = f.phone.value.replace(/\s/g, '');
  if (!/^[3567]\d{7}$/.test(phone)) { f.phone.classList.add('invalid'); toast(t('phoneInvalid'), 'err'); return; }
  if (CO.pay === 'card') ['cardno', 'exp', 'cvv', 'cname'].forEach(n => { if (!f.elements[n].value.trim()) { f.elements[n].classList.add('invalid'); ok = false; } });
  if (!ok) { toast(t('required'), 'err'); f.querySelector('.invalid')?.focus(); return; }
  const sub = subtotal(), disc = discountAmt(sub), del = deliveryFee(sub, CO.zone, CO.express);
  const z = MUNICIPALITIES.find(m => m.id === CO.zone);
  const order = { id: 'DK-' + (10483 + S.orders.length), date: new Date().toISOString().slice(0, 10), items: S.cart.map(l => [l.id, l.qty, l.variant]), sub, disc, del, total: sub - disc + del, pay: CO.pay, zone: CO.zone, status: 'confirmed', name: f.name.value, phone: '+974 ' + phone, email: f.email.value,
    addr: `${f.unit.value ? f.unit.value + ', ' : ''}Bldg ${f.building.value}, St ${f.street.value}, Zone ${f.zoneNo.value}, ${f.area.value}`, eta: z.eta[0] === 0 && !CO.express ? dateIn(1) : CO.express ? dateIn(0) : dateIn(z.eta[1]) };
  S.orders.unshift(order); S.cart = []; S.coupon = null; save();
  location.hash = `#/order/${order.id}`;
}

function findOrder(id) {
  const o = S.orders.find(x => x.id === id); if (o) return o;
  const d = DEMO_ORDERS.find(x => x.id === id); if (!d) return null;
  return { ...d, name: d.customer, items: d.items, sub: d.total, disc: 0, del: 0, addr: L(MUNICIPALITIES.find(m => m.id === d.zone)), eta: dateIn(1) };
}
function confirmView(r) {
  const o = findOrder(r.parts[1]); if (!o) return emptyState('package-x', '404', '');
  const payLbl = { cod: t('cod'), card: t('card'), apple: t('applePay') }[o.pay];
  return `<div class="container-x max-w-3xl pt-10">
    <div class="text-center"><div class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600 pop">${icon('check', 'w-10 h-10')}</div>
      <h1 class="mt-5 text-2xl font-extrabold sm:text-3xl">${t('thanks')}</h1><p class="mx-auto mt-2 max-w-md text-zinc-500">${t('confirmSub')}</p></div>
    <div id="invoice" class="mt-8 rounded-3xl border border-zinc-100 bg-white p-6">
      <div class="flex flex-wrap items-start justify-between gap-4 border-b pb-5">
        <div>${logo()}<p class="mt-2 text-xs text-zinc-500">${t('crNo')}</p></div>
        <div class="text-end text-sm"><p class="text-zinc-500">${t('orderNo')}</p><p class="text-lg font-bold">${o.id}</p><p class="text-zinc-500">${o.date}</p></div>
      </div>
      <div class="grid gap-4 py-5 text-sm sm:grid-cols-3">
        <div><p class="text-zinc-500">${t('shipTo')}</p><p class="font-medium">${esc(o.name)}</p><p>${esc(o.addr)}</p><p dir="ltr" class="text-start">${esc(o.phone)}</p></div>
        <div><p class="text-zinc-500">${t('estDelivery')}</p><p class="font-semibold text-emerald-700">${o.eta}</p></div>
        <div><p class="text-zinc-500">${t('paidBy')}</p><p class="font-medium">${payLbl}</p></div>
      </div>
      <table class="w-full text-sm"><tbody class="divide-y">${o.items.map(([id, q, v]) => { const p = P(id); return `<tr><td class="py-3"><div class="flex items-center gap-3"><span class="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-50">${img(p.img, 'h-full w-full object-cover', 120)}</span><span><span class="line-clamp-1">${esc(L(p.name))}</span><span class="text-xs text-zinc-500">${v ? esc(v) + ' · ' : ''}× ${q}</span></span></div></td><td class="py-3 text-end font-medium">${qar(p.price * q)}</td></tr>`; }).join('')}</tbody></table>
      <dl class="mt-4 space-y-2 border-t pt-4 text-sm">
        <div class="flex justify-between"><dt class="text-zinc-500">${t('subtotal')}</dt><dd>${qar(o.sub)}</dd></div>
        ${o.disc ? `<div class="flex justify-between text-emerald-600"><dt>${t('discount')}</dt><dd>−${qar(o.disc)}</dd></div>` : ''}
        <div class="flex justify-between"><dt class="text-zinc-500">${t('delivery')}</dt><dd>${o.del ? qar(o.del) : t('free')}</dd></div>
        <div class="flex justify-between text-base font-bold"><dt>${t('total')}</dt><dd>${qar(o.total)}</dd></div>
      </dl>
    </div>
    <div class="mt-6 flex flex-col gap-3 sm:flex-row"><a href="#/track?id=${o.id}" class="btn-primary flex-1">${icon('package-search', 'w-4 h-4')}${t('trackOrder')}</a><button onclick="window.print()" class="btn-outline flex-1">${icon('file-down', 'w-4 h-4')}${t('invoice')}</button><a href="#/" class="btn-outline flex-1">${t('continueShopping')}</a></div>
  </div>`;
}

// ---------- Tracking ----------
function trackView(r) {
  const o = r.q.id ? findOrder(r.q.id) : null;
  const steps = ['confirmed', 'ordered_supplier', 'shipped', 'out_for_delivery', 'delivered'];
  const cur = o ? Math.max(0, steps.indexOf(o.status)) : -1;
  return `<div class="container-x max-w-3xl pt-10">
    <h1 class="text-2xl font-extrabold sm:text-3xl">${t('trackTitle')}</h1><p class="mt-1 text-zinc-500">${t('trackSub')}</p>
    <form onsubmit="event.preventDefault();const o=findOrder(this.id.value.trim().toUpperCase());o?location.hash='#/track?id='+o.id:toast('${t('noResults')}','err')" class="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <input name="id" value="${esc(r.q.id || '')}" placeholder="DK-10482" class="input uppercase" required>
      <input name="ph" placeholder="+974 5512 3344" dir="ltr" class="input">
      <button class="btn-primary">${t('trackBtn')}</button>
    </form>
    <p class="mt-2 text-xs text-zinc-400">Demo: DK-10482 · DK-10479 · DK-10480</p>
    ${o ? `<div class="mt-8 rounded-3xl border border-zinc-100 bg-white p-6">
      <div class="flex flex-wrap items-center justify-between gap-3"><div><p class="text-sm text-zinc-500">${t('orderNo')}</p><p class="text-lg font-bold">${o.id}</p></div>
        <span class="status-pill status-${o.status}">${t('st_' + o.status)}</span></div>
      ${o.tracking ? `<p class="mt-3 text-sm"><span class="text-zinc-500">${t('trackingNo')}:</span> <b dir="ltr">${o.tracking}</b></p>` : ''}
      <ol class="mt-8 space-y-0">${steps.map((s, i) => `<li class="relative flex gap-4 pb-8 last:pb-0">
        ${i < steps.length - 1 ? `<span class="absolute start-[15px] top-8 h-[calc(100%-2rem)] w-0.5 ${i < cur ? 'bg-brand-600' : 'bg-zinc-200'}"></span>` : ''}
        <span class="relative grid h-8 w-8 shrink-0 place-items-center rounded-full ${i <= cur ? 'bg-brand-600 text-white' : 'bg-zinc-100 text-zinc-400'} ${i === cur ? 'ring-4 ring-brand-100' : ''}">${icon(['clipboard-check', 'package', 'plane', 'truck', 'house'][i], 'w-4 h-4')}</span>
        <div class="pt-1"><p class="font-semibold ${i > cur ? 'text-zinc-400' : ''}">${t('st_' + s)}</p><p class="text-xs text-zinc-500">${i <= cur ? dateIn(i - cur) : i === steps.length - 1 ? `${t('estDelivery')}: ${o.eta}` : ''}</p></div></li>`).join('')}</ol>
      <a href="https://wa.me/97400000000?text=${encodeURIComponent('Order ' + o.id)}" target="_blank" rel="noopener" class="btn-outline mt-6 w-full">${icon('message-circle', 'w-4 h-4 text-emerald-600')}${t('whatsapp')}</a>
    </div>` : ''}
  </div>`;
}

// ---------- Auth ----------
const AU = { mode: 'login', step: 'phone', method: 'phone', phone: '' };
function loginView() {
  return `<div class="container-x grid min-h-[70vh] place-items-center py-10">
    <div class="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-xl shadow-brand-900/5 md:grid-cols-2">
      <div class="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 to-indigo-800 p-10 text-white md:block">
        <div class="absolute -bottom-24 -end-24 h-72 w-72 rounded-full bg-white/10"></div>
        ${logo('[&_span]:!text-white')}
        <h2 class="mt-12 text-3xl font-bold leading-tight">${S.lang === 'ar' ? 'تسوّق أذكى في قطر' : 'Shop smarter in Qatar'}</h2>
        <ul class="mt-6 space-y-3 text-sm text-brand-100">${[t('perk1'), t('perk2'), t('perk3'), t('perk4')].map(x => `<li class="flex items-center gap-2">${icon('circle-check', 'w-4 h-4 text-white')}${x}</li>`).join('')}</ul>
      </div>
      <div class="p-7 sm:p-10">
        <div class="flex rounded-full bg-zinc-100 p-1 text-sm font-semibold">${['login', 'register'].map(m => `<button onclick="AU.mode='${m}';AU.step='phone';render()" class="flex-1 rounded-full py-2 ${AU.mode === m ? 'bg-white shadow' : 'text-zinc-500'}">${t(m)}</button>`).join('')}</div>
        <h1 class="mt-7 text-2xl font-bold">${t('loginTitle')}</h1><p class="mt-1 text-sm text-zinc-500">${t('loginSub')}</p>
        ${AU.step === 'otp' ? `
          <p class="mt-6 text-sm">${t('otpSent')} <b dir="ltr">+974 ${esc(AU.phone)}</b> · <button onclick="AU.step='phone';render()" class="text-brand-700">${t('edit')}</button></p>
          <div class="mt-4 flex gap-2" dir="ltr">${[0, 1, 2, 3, 4, 5].map(i => `<input maxlength="1" inputmode="numeric" class="otp input !h-14 !w-12 text-center text-xl font-bold" oninput="this.value=this.value.replace(/\\D/g,'');if(this.value&&this.nextElementSibling)this.nextElementSibling.focus()">`).join('')}</div>
          <button onclick="verifyOtp()" class="btn-primary mt-6 w-full h-12">${t('verify')}</button>
          <button onclick="toast('${t('otpSent')} +974 ${esc(AU.phone)}')" class="mt-3 w-full text-sm text-zinc-500 hover:text-brand-700">${t('resend')}</button>`
        : AU.method === 'phone' ? `
          <form onsubmit="event.preventDefault();sendOtp(this)" class="mt-6 space-y-4">
            ${AU.mode === 'register' ? `<label class="block"><span class="label">${t('fullName')}</span><input name="name" required class="input"></label>` : ''}
            <label class="block"><span class="label">${t('mobile')}</span><div class="flex" dir="ltr"><span class="inline-flex h-12 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-s-xl border border-e-0 border-zinc-200 bg-zinc-50 px-3 text-sm font-medium">🇶🇦 +974</span><input name="phone" inputmode="numeric" maxlength="8" placeholder="5512 3344" class="input !rounded-s-none"></div></label>
            <button class="btn-primary w-full h-12">${t('sendOtp')}</button>
          </form>
          <button onclick="AU.method='email';render()" class="mt-3 w-full text-sm font-medium text-brand-700">${t('useEmail')}</button>`
        : `<form onsubmit="event.preventDefault();doLogin(this.email.value.split('@')[0],'')" class="mt-6 space-y-4">
            ${AU.mode === 'register' ? `<label class="block"><span class="label">${t('fullName')}</span><input name="name" required class="input"></label>` : ''}
            <label class="block"><span class="label">Email</span><input name="email" type="email" required class="input"></label>
            <label class="block"><span class="label flex justify-between">${t('password')}<a href="#/login" onclick="toast('${t('comingSoon')}')" class="font-normal text-brand-700">${t('forgot')}</a></span><input name="pw" type="password" required minlength="8" class="input"></label>
            <button class="btn-primary w-full h-12">${t(AU.mode)}</button></form>
          <button onclick="AU.method='phone';render()" class="mt-3 w-full text-sm font-medium text-brand-700">${t('usePhone')}</button>`}
        <div class="my-6 flex items-center gap-3 text-xs text-zinc-400"><span class="h-px flex-1 bg-zinc-200"></span>${t('orContinue')}<span class="h-px flex-1 bg-zinc-200"></span></div>
        <div class="grid grid-cols-2 gap-3"><button onclick="toast('${t('comingSoon')}: Google')" class="btn-outline">${icon('chrome', 'w-4 h-4')}Google</button><button onclick="toast('${t('comingSoon')}: Apple')" class="btn-outline">${icon('apple', 'w-4 h-4')}Apple</button></div>
        <p class="mt-6 text-center text-xs text-zinc-400">${t('terms')}</p>
      </div>
    </div></div>`;
}
function sendOtp(f) {
  const ph = f.phone.value.replace(/\s/g, '');
  if (!/^[3567]\d{7}$/.test(ph)) { f.phone.classList.add('invalid'); return toast(t('phoneInvalid'), 'err'); }
  AU.phone = ph; AU.name = f.name?.value; AU.step = 'otp'; render(); document.querySelector('.otp')?.focus();
}
function verifyOtp() {
  const code = [...document.querySelectorAll('.otp')].map(i => i.value).join('');
  if (code.length < 6) return toast(t('required'), 'err');
  doLogin(AU.name || (S.lang === 'ar' ? 'عميل دكّان' : 'Dukkan Customer'), AU.phone);
}
function doLogin(name, phone) {
  S.user = { name: name.replace(/^\w/, c => c.toUpperCase()), phone, email: '' }; AU.step = 'phone'; save(); toast(t('welcomeBack')); location.hash = '#/account';
}

// ---------- Account ----------
function accountView(r) {
  if (!S.user) { location.hash = '#/login'; return ''; }
  const tab = r.parts[1] || 'overview';
  const orders = [...S.orders, ...DEMO_ORDERS.slice(0, 3).map(d => findOrder(d.id))];
  const tabs = [['overview', 'layout-grid'], ['orders', 'package'], ['addresses', 'map-pin'], ['wishlist', 'heart'], ['returnsReq', 'rotate-ccw'], ['profile', 'user-round'], ['changePw', 'key-round']];
  const orderRow = o => `<div class="flex flex-wrap items-center gap-4 p-4 sm:p-5">
    <div class="flex -space-x-3 rtl:space-x-reverse">${o.items.slice(0, 3).map(([id]) => `<span class="h-12 w-12 overflow-hidden rounded-xl border-2 border-white bg-zinc-50">${img(P(id).img, 'h-full w-full object-cover', 120)}</span>`).join('')}</div>
    <div class="min-w-0 flex-1"><p class="font-semibold">${o.id}</p><p class="text-xs text-zinc-500">${o.date} · ${o.items.reduce((a, i) => a + i[1], 0)} ${t('items')} · ${qar(o.total)}</p></div>
    <span class="status-pill status-${o.status}">${t('st_' + o.status)}</span>
    <div class="flex gap-2"><a href="#/order/${o.id}" class="btn-outline !h-9 text-xs">${t('details')}</a><a href="#/track?id=${o.id}" class="btn-primary !h-9 text-xs">${t('track')}</a></div></div>`;
  let body = '';
  if (tab === 'overview') body = `<div class="grid gap-4 sm:grid-cols-3">${[['package', orders.length, t('orders')], ['heart', S.wish.length, t('wishlist')], ['wallet', qar(orders.reduce((a, o) => a + o.total, 0)), S.lang === 'ar' ? 'إجمالي المشتريات' : 'Total spent']].map(([ic, v, l]) => `<div class="rounded-2xl border border-zinc-100 bg-white p-5"><span class="text-brand-600">${icon(ic)}</span><p class="mt-3 text-2xl font-bold">${v}</p><p class="text-sm text-zinc-500">${l}</p></div>`).join('')}</div>
    <div class="mt-6 rounded-2xl border border-zinc-100 bg-white"><div class="flex items-center justify-between border-b p-4 sm:p-5"><h3 class="font-semibold">${t('recentOrders')}</h3><a href="#/account/orders" class="text-sm font-semibold text-brand-700">${t('viewAll')}</a></div><div class="divide-y">${orders.slice(0, 3).map(orderRow).join('')}</div></div>`;
  if (tab === 'orders') body = `<div class="divide-y rounded-2xl border border-zinc-100 bg-white">${orders.map(orderRow).join('')}</div>`;
  if (tab === 'addresses') body = `<div class="grid gap-4 sm:grid-cols-2">${[['Home', 'Bldg 12, St 850, Zone 66, West Bay, Doha', true], ['Office', 'Bldg 3, St 230, Zone 69, Lusail Marina, Lusail', false]].map(([n, a, d]) => `<div class="rounded-2xl border ${d ? 'border-brand-600' : 'border-zinc-100'} bg-white p-5"><div class="flex items-center gap-2"><b>${n}</b>${d ? `<span class="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">${t('default_')}</span>` : ''}</div><p class="mt-2 text-sm text-zinc-600">${a}</p><p class="mt-1 text-sm text-zinc-500" dir="ltr">+974 ${esc(S.user.phone || '5512 3344')}</p><div class="mt-4 flex gap-3 text-sm font-medium"><button onclick="toast('${t('saved')}')" class="text-brand-700">${t('edit')}</button><button onclick="this.closest('.rounded-2xl').remove();toast('${t('delete_')}')" class="text-red-600">${t('delete_')}</button></div></div>`).join('')}
    <button onclick="location.hash='#/checkout'" class="grid min-h-[160px] place-items-center rounded-2xl border-2 border-dashed border-zinc-200 text-sm font-semibold text-zinc-500 hover:border-brand-400 hover:text-brand-700"><span class="flex flex-col items-center gap-2">${icon('plus-circle', 'w-6 h-6')}${t('addAddress')}</span></button></div>`;
  if (tab === 'wishlist') body = wishGrid();
  if (tab === 'returnsReq') body = `<div class="rounded-2xl border border-zinc-100 bg-white p-5 sm:p-6"><p class="text-sm text-zinc-500">${t('returnWindow')}</p>
    <form onsubmit="event.preventDefault();this.reset();toast('${t('submitted')}')" class="mt-5 grid gap-4 sm:grid-cols-2">
      <label class="block"><span class="label">${t('orderNo')}</span><select class="input">${orders.filter(o => o.status === 'delivered').concat(orders.slice(0, 1)).map(o => `<option>${o.id}</option>`).join('')}</select></label>
      <label class="block"><span class="label">${t('reason')}</span><select class="input">${(S.lang === 'ar' ? ['المنتج تالف', 'منتج خاطئ', 'لا يطابق الوصف', 'غيرت رأيي'] : ['Damaged item', 'Wrong item received', 'Not as described', 'Changed my mind']).map(x => `<option>${x}</option>`).join('')}</select></label>
      <textarea class="input sm:col-span-2 !h-24 py-3" placeholder="${S.lang === 'ar' ? 'تفاصيل إضافية' : 'Additional details'}"></textarea>
      <label class="sm:col-span-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">${icon('image-plus', 'w-5 h-5')}${S.lang === 'ar' ? 'أرفق صوراً (اختياري)' : 'Attach photos (optional)'}<input type="file" accept="image/*" multiple class="hidden"></label>
      <button class="btn-primary sm:col-span-2">${t('requestReturn')}</button></form>
    <div class="mt-6 rounded-xl bg-zinc-50 p-4 text-sm"><div class="flex items-center justify-between"><span><b>RMA-2041</b> · DK-10476</span><span class="status-pill status-returned">${t('st_returned')}</span></div><p class="mt-1 text-xs text-zinc-500">${S.lang === 'ar' ? 'تم استرداد 649 ر.ق إلى البطاقة' : 'QAR 649 refunded to card'}</p></div></div>`;
  if (tab === 'profile') body = `<form onsubmit="event.preventDefault();S.user.name=this.n.value;S.user.email=this.e.value;save();render();toast('${t('saved')}')" class="grid gap-4 rounded-2xl border border-zinc-100 bg-white p-5 sm:grid-cols-2 sm:p-6">
      <label class="block"><span class="label">${t('fullName')}</span><input name="n" value="${esc(S.user.name)}" class="input"></label>
      <label class="block"><span class="label">${t('mobile')}</span><input value="+974 ${esc(S.user.phone)}" dir="ltr" disabled class="input bg-zinc-50"></label>
      <label class="block"><span class="label">Email</span><input name="e" type="email" value="${esc(S.user.email)}" class="input"></label>
      <label class="block"><span class="label">${S.lang === 'ar' ? 'اللغة المفضلة' : 'Preferred language'}</span><select onchange="setLang(this.value)" class="input"><option value="en" ${S.lang === 'en' ? 'selected' : ''}>English</option><option value="ar" ${S.lang === 'ar' ? 'selected' : ''}>العربية</option></select></label>
      <button class="btn-primary sm:col-span-2 sm:w-fit">${t('save')}</button></form>`;
  if (tab === 'changePw') body = `<form onsubmit="event.preventDefault();if(this.a.value!==this.b.value||this.a.value.length<8)return toast('${t('required')}','err');this.reset();toast('${t('saved')}')" class="grid max-w-md gap-4 rounded-2xl border border-zinc-100 bg-white p-5 sm:p-6">
      <label class="block"><span class="label">${t('currentPw')}</span><input type="password" required class="input"></label>
      <label class="block"><span class="label">${t('newPw')}</span><input name="a" type="password" minlength="8" required class="input"></label>
      <label class="block"><span class="label">${t('confirmPw')}</span><input name="b" type="password" required class="input"></label>
      <button class="btn-primary">${t('updatePw')}</button></form>`;
  return `<div class="container-x pt-8"><h1 class="text-2xl font-extrabold sm:text-3xl">${t('myAccount')}</h1><p class="text-zinc-500">${t('hello')}, ${esc(S.user.name)} 👋</p></div>
  <div class="container-x mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
    <nav class="flex gap-1 overflow-x-auto rounded-2xl border border-zinc-100 bg-white p-2 lg:flex-col lg:self-start">${tabs.map(([k, ic]) => `<a href="#/account/${k}" class="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${tab === k ? 'bg-brand-50 font-semibold text-brand-700' : 'text-zinc-600 hover:bg-zinc-50'}">${icon(ic, 'w-4 h-4')}${t(k)}</a>`).join('')}
      <button onclick="S.user=null;save();location.hash='#/'" class="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50">${icon('log-out', 'w-4 h-4')}${t('logout')}</button></nav>
    <div>${body}</div></div>`;
}
function wishGrid() {
  const list = S.wish.map(P).filter(Boolean);
  return list.length ? `<div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">${list.map(p => productCard(p)).join('')}</div>` : emptyState('heart', t('wishEmpty'), t('cartEmptySub'), `<a href="#/" class="btn-primary mt-5">${t('startShopping')}</a>`);
}
function wishlistView() { return `<div class="container-x pt-8"><h1 class="mb-6 text-2xl font-extrabold sm:text-3xl">${t('wishlist')}</h1>${wishGrid()}</div>`; }

// ---------- Help / policies ----------
function helpView(r) {
  const page = r.parts[1] || 'delivery';
  const ar = S.lang === 'ar';
  const pages = {
    delivery: [t('deliveryInfo'), `<p>${ar ? 'نوصّل إلى جميع بلديات قطر. التوصيل مجاني للطلبات فوق 99 ر.ق، وإلا فرسوم التوصيل 15 ر.ق.' : 'We deliver to every municipality in Qatar. Delivery is free on orders over QAR 99; otherwise a QAR 15 fee applies.'}</p>
      <table class="mt-6 w-full overflow-hidden rounded-2xl border text-sm"><thead class="bg-zinc-50"><tr><th class="p-3 text-start">${t('municipality')}</th><th class="p-3 text-start">${ar ? 'المدة' : 'Delivery time'}</th><th class="p-3 text-start">${ar ? 'رسوم إضافية' : 'Extra fee'}</th></tr></thead>
      <tbody class="divide-y">${MUNICIPALITIES.map(m => `<tr><td class="p-3 font-medium">${L(m)}</td><td class="p-3">${m.eta[0] === 0 ? (ar ? 'نفس اليوم / اليوم التالي' : 'Same / next day') : `${m.eta[0]}–${m.eta[1]} ${ar ? 'أيام' : 'days'}`}</td><td class="p-3">${m.fee ? qar(m.fee) : t('free')}</td></tr>`).join('')}</tbody></table>
      <p class="mt-6">${ar ? 'بعض المنتجات تُشحن مباشرة من موردينا الدوليين وتستغرق 5–10 أيام عمل، ويظهر ذلك بوضوح في صفحة المنتج.' : 'Some items ship directly from our international suppliers and take 5–10 business days — this is always shown clearly on the product page.'}</p>`],
    returns: [t('returnPolicy'), `<ul class="list-disc space-y-2 ps-5">${(ar ? ['يمكنك إرجاع معظم المنتجات خلال 14 يوماً من الاستلام.', 'يجب أن يكون المنتج بحالته الأصلية ومع جميع الملحقات.', 'نستلم المرتجعات مجاناً من عنوانك في أي مكان في قطر.', 'يتم الاسترداد خلال 3–7 أيام عمل إلى وسيلة الدفع الأصلية، أو كرصيد في المحفظة لطلبات الدفع عند الاستلام.', 'العطور المفتوحة ومنتجات العناية الشخصية غير قابلة للإرجاع لأسباب صحية.'] : ['Most items can be returned within 14 days of delivery.', 'Items must be unused, in original packaging, with all accessories.', 'We pick up returns for free from your address anywhere in Qatar.', 'Refunds are issued within 3–7 business days to the original payment method, or as wallet credit / bank transfer for COD orders.', 'Opened fragrances and personal-care items are non-returnable for hygiene reasons.']).map(x => `<li>${x}</li>`).join('')}</ul>
      <a href="#/account/returnsReq" class="btn-primary mt-6">${t('requestReturn')}</a>`],
    faq: [t('faq'), (ar ? [['هل يتوفر الدفع عند الاستلام؟', 'نعم، في جميع أنحاء قطر نقداً أو بالبطاقة للمندوب.'], ['هل الأسعار تشمل الضريبة؟', 'لا توجد ضريبة قيمة مضافة في قطر، والسعر المعروض هو السعر النهائي.'], ['كيف أتتبع طلبي؟', 'من صفحة تتبع الطلب أو عبر رسائل واتساب.']] : [['Is Cash on Delivery available?', 'Yes — everywhere in Qatar, pay by cash or card to the courier.'], ['Do prices include tax?', 'There is no VAT in Qatar; the displayed price is final.'], ['How do I track my order?', 'Use the Track Order page or follow the WhatsApp updates we send.']]).map(([q, a]) => `<details class="group rounded-2xl border p-4 [&_summary::-webkit-details-marker]:hidden"><summary class="flex cursor-pointer items-center justify-between font-semibold">${q}${icon('chevron-down', 'w-4 h-4 transition group-open:rotate-180')}</summary><p class="mt-3 text-zinc-600">${a}</p></details>`).join('<div class="h-3"></div>')],
    contact: [t('contactUs'), `<div class="grid gap-4 sm:grid-cols-3">${[['message-circle', 'WhatsApp', '+974 0000 0000', 'https://wa.me/97400000000'], ['mail', 'Email', 'care@dukkan.qa', 'mailto:care@dukkan.qa'], ['phone', ar ? 'هاتف' : 'Phone', '+974 4000 0000', 'tel:+97440000000']].map(([ic, l, v, h]) => `<a href="${h}" class="rounded-2xl border p-5 hover:border-brand-400"><span class="text-brand-600">${icon(ic)}</span><p class="mt-3 font-semibold">${l}</p><p class="text-sm text-zinc-500" dir="ltr">${v}</p></a>`).join('')}</div><p class="mt-6 text-sm text-zinc-500">${ar ? 'ساعات العمل: السبت – الخميس، 9 صباحاً – 10 مساءً' : 'Hours: Saturday – Thursday, 9 AM – 10 PM'}</p>`],
  };
  const [title, body] = pages[page] || [L({ en: 'Information', ar: 'معلومات' }), `<p>${t('comingSoon')}.</p>`];
  return `<div class="container-x pt-8">${crumbs([[t('home'), '#/'], [title]])}</div>
  <div class="container-x mt-4 grid gap-8 lg:grid-cols-[240px_1fr]">
    <nav class="flex gap-1 overflow-x-auto lg:flex-col">${[['delivery', t('deliveryInfo')], ['returns', t('returnPolicy')], ['faq', t('faq')], ['contact', t('contactUs')]].map(([k, l]) => `<a href="#/help/${k}" class="shrink-0 rounded-xl px-3 py-2.5 text-sm ${page === k ? 'bg-brand-50 font-semibold text-brand-700' : 'text-zinc-600 hover:bg-zinc-50'}">${l}</a>`).join('')}</nav>
    <article class="max-w-3xl leading-7 text-zinc-700"><h1 class="mb-6 text-3xl font-extrabold text-zinc-900">${title}</h1>${body}</article></div>`;
}

// ---------- Post-render hooks ----------
function afterRender(r) {
  if (r.name === 'home' || !r.name) {
    heroIdx = 0;
    S.timers.push(setInterval(() => heroStep(1), 6000));
    const tick = () => {
      const el = document.getElementById('countdown'); if (!el) return;
      const end = new Date(); end.setHours(23, 59, 59, 999); let s = Math.floor((end - new Date()) / 1000);
      const parts = [Math.floor(s / 3600), Math.floor(s % 3600 / 60), s % 60];
      el.innerHTML = parts.map(v => `<span class="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-lg font-bold tabular-nums backdrop-blur">${String(v).padStart(2, '0')}</span>`).join('<span class="self-center font-bold">:</span>');
    };
    tick(); S.timers.push(setInterval(tick, 1000));
    document.title = S.lang === 'ar' ? 'دكّان | تسوّق أونلاين في قطر' : 'Dukkan.qa | Online Shopping in Qatar';
  }
}
