// ---------- State ----------
const S = { lang: 'en', cart: [], wish: [], user: null, coupon: null, orders: [], drawer: false, menu: false, timers: [] };
try { Object.assign(S, JSON.parse(localStorage.getItem('dukkan') || '{}')); } catch (e) { /* storage unavailable */ }
const save = () => { try { localStorage.setItem('dukkan', JSON.stringify({ lang: S.lang, cart: S.cart, wish: S.wish, user: S.user, orders: S.orders })); } catch (e) { /* ignore */ } };

// ---------- Helpers ----------
const t = (k, vars) => { let s = I18N[S.lang][k] ?? I18N.en[k] ?? k; if (vars) for (const v in vars) s = s.replace(`{${v}}`, vars[v]); return s; };
const L = o => (o && typeof o === 'object') ? (o[S.lang] || o.en) : o;
const num = n => Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 });
const qar = n => S.lang === 'ar' ? `${num(n)} ر.ق` : `QAR ${num(n)}`;
const pct = p => p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
const P = id => PRODUCTS.find(p => p.id === +id);
const C = slug => CATEGORIES.find(c => c.slug === slug);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icon = (n, cls = 'w-5 h-5') => `<i data-lucide="${n}" class="${cls}"></i>`;
const isWished = id => S.wish.includes(+id);
const cartCount = () => S.cart.reduce((a, i) => a + i.qty, 0);
const subtotal = () => S.cart.reduce((a, i) => a + (P(i.id)?.price || 0) * i.qty, 0);
const FREE_OVER = 99;
const imgFallback = `this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 4 3%22><rect width=%224%22 height=%223%22 fill=%22%23f4f1fb%22/></svg>'`;
const img = (id, cls = '', w = 600, alt = '') => `<img src="${IMG(id, w)}" alt="${esc(alt)}" loading="lazy" decoding="async" class="${cls}" onerror="${imgFallback}">`;

function dateIn(days) {
  const d = new Date(); d.setDate(d.getDate() + days);
  return d.toLocaleDateString(S.lang === 'ar' ? 'ar-QA' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}
function cutoffLeft() {
  const now = new Date(), c = new Date(); c.setHours(14, 0, 0, 0);
  if (now > c) c.setDate(c.getDate() + 1);
  const m = Math.floor((c - now) / 60000);
  return S.lang === 'ar' ? `${Math.floor(m / 60)} س ${m % 60} د` : `${Math.floor(m / 60)}h ${m % 60}m`;
}
function stars(r, cls = 'w-3.5 h-3.5') {
  let h = '';
  for (let i = 1; i <= 5; i++) h += `<svg class="${cls} ${i <= Math.round(r) ? 'text-amber-400' : 'text-zinc-200'}" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"/></svg>`;
  return `<span class="inline-flex items-center gap-0.5" aria-label="${r} / 5">${h}</span>`;
}

// ---------- Toasts ----------
function toast(msg, kind = 'ok') {
  const el = document.createElement('div');
  el.className = `toast pointer-events-auto flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium shadow-xl ${kind === 'err' ? 'bg-red-600 text-white' : 'bg-zinc-900 text-white'}`;
  el.innerHTML = `${icon(kind === 'err' ? 'circle-alert' : 'circle-check', 'w-4 h-4 shrink-0')}<span>${esc(msg)}</span>`;
  document.getElementById('toasts').appendChild(el);
  lucide.createIcons();
  setTimeout(() => { el.classList.add('opacity-0', 'translate-y-2'); setTimeout(() => el.remove(), 300); }, 2600);
}

// ---------- Actions ----------
function setLang(l) { S.lang = l || (S.lang === 'en' ? 'ar' : 'en'); save(); render(); }
function toggleWish(id, ev) {
  ev?.preventDefault(); ev?.stopPropagation(); id = +id;
  if (isWished(id)) { S.wish = S.wish.filter(x => x !== id); toast(t('removedWish')); } else { S.wish.push(id); toast(t('addedWish')); }
  save(); document.querySelectorAll(`[data-wish="${id}"]`).forEach(b => b.classList.toggle('wished', isWished(id))); updateBadges();
}
function addToCart(id, qty = 1, variant = '', open = true, ev) {
  ev?.preventDefault(); ev?.stopPropagation();
  const p = P(id); if (!p || p.stock === 0) return toast(t('outOfStock'), 'err');
  const line = S.cart.find(i => i.id === p.id && i.variant === variant);
  if (line) line.qty = Math.min(line.qty + qty, p.stock); else S.cart.push({ id: p.id, qty, variant });
  save(); updateBadges(); toast(t('added'));
  if (open) openDrawer();
}
function setQty(idx, q) { const l = S.cart[idx]; if (!l) return; const p = P(l.id); l.qty = Math.max(1, Math.min(q, p.stock)); save(); refreshCartViews(); }
function removeLine(idx) { S.cart.splice(idx, 1); save(); refreshCartViews(); }
function moveToWish(idx) { const l = S.cart[idx]; if (!isWished(l.id)) S.wish.push(l.id); removeLine(idx); toast(t('addedWish')); }
function refreshCartViews() { updateBadges(); renderDrawer(); if (currentRoute().name === 'cart' || currentRoute().name === 'checkout') render(); }
function updateBadges() {
  document.querySelectorAll('[data-badge="cart"]').forEach(b => { b.textContent = cartCount(); b.classList.toggle('hidden', !cartCount()); });
  document.querySelectorAll('[data-badge="wish"]').forEach(b => { b.textContent = S.wish.length; b.classList.toggle('hidden', !S.wish.length); });
}

function deliveryFee(sub, zone = 'doha', express = false) {
  if (S.coupon?.type === 'ship') return express ? 25 : 0;
  const z = MUNICIPALITIES.find(m => m.id === zone) || MUNICIPALITIES[0];
  const base = sub >= FREE_OVER ? 0 : 15;
  return (express ? 25 : base) + z.fee;
}
function discountAmt(sub) {
  const c = S.coupon; if (!c) return 0;
  if (c.type === 'pct') return Math.round(sub * c.value) / 100;
  if (c.type === 'fixed') return c.value;
  return 0;
}
function applyCoupon(code) {
  const c = COUPONS.find(x => x.code === String(code || '').trim().toUpperCase() && x.active);
  if (!c || subtotal() < c.min) { S.coupon = null; toast(t('couponBad'), 'err'); } else { S.coupon = c; toast(`${t('couponOk')}: ${c.code}`); }
  render();
}

// ---------- Drawer (mini cart) ----------
function openDrawer() { S.drawer = true; renderDrawer(); }
function closeDrawer() { S.drawer = false; renderDrawer(); }
function renderDrawer() {
  const root = document.getElementById('drawer');
  if (!S.drawer) { root.innerHTML = ''; document.body.classList.remove('overflow-hidden'); return; }
  document.body.classList.add('overflow-hidden');
  const sub = subtotal(), left = Math.max(0, FREE_OVER - sub);
  root.innerHTML = `
  <div class="fixed inset-0 z-[60] bg-black/40 fade-in" onclick="closeDrawer()"></div>
  <aside class="fixed inset-y-0 end-0 z-[61] flex w-full max-w-md flex-col bg-white shadow-2xl slide-in" role="dialog" aria-label="${t('yourCart')}">
    <div class="flex items-center justify-between border-b px-5 py-4">
      <h2 class="text-lg font-semibold">${t('yourCart')} <span class="text-zinc-400 font-normal">(${cartCount()})</span></h2>
      <button class="icon-btn" onclick="closeDrawer()" aria-label="${t('close')}">${icon('x')}</button>
    </div>
    ${S.cart.length ? `
    <div class="px-5 pt-4">
      <div class="rounded-xl bg-brand-50 p-3 text-sm">
        <p class="font-medium text-brand-800">${left > 0 ? t('freeOver', { n: qar(left) }) : t('freeUnlocked')}</p>
        <div class="mt-2 h-1.5 rounded-full bg-brand-100"><div class="h-full rounded-full bg-brand-600 transition-all" style="width:${Math.min(100, sub / FREE_OVER * 100)}%"></div></div>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
      ${S.cart.map((l, i) => { const p = P(l.id); return `
      <div class="flex gap-3">
        <a href="#/p/${p.slug}" onclick="closeDrawer()" class="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-50">${img(p.img, 'h-full w-full object-cover', 200)}</a>
        <div class="min-w-0 flex-1">
          <a href="#/p/${p.slug}" onclick="closeDrawer()" class="line-clamp-2 text-sm font-medium hover:text-brand-700">${esc(L(p.name))}</a>
          ${l.variant ? `<p class="text-xs text-zinc-500 mt-0.5">${esc(l.variant)}</p>` : ''}
          <div class="mt-2 flex items-center justify-between">
            ${qtyControl(l.qty, `setQty(${i},${l.qty - 1})`, `setQty(${i},${l.qty + 1})`, 'sm')}
            <span class="text-sm font-semibold">${qar(p.price * l.qty)}</span>
          </div>
        </div>
        <button class="self-start text-zinc-400 hover:text-red-600" onclick="removeLine(${i})" aria-label="${t('remove')}">${icon('trash-2', 'w-4 h-4')}</button>
      </div>`; }).join('')}
    </div>
    <div class="border-t p-5 space-y-3">
      <div class="flex justify-between text-base font-semibold"><span>${t('subtotal')}</span><span>${qar(sub)}</span></div>
      <p class="text-xs text-zinc-500">${t('vatNote')}</p>
      <a href="#/checkout" onclick="closeDrawer()" class="btn-primary w-full">${t('checkout')}</a>
      <a href="#/cart" onclick="closeDrawer()" class="btn-outline w-full">${t('yourCart')}</a>
    </div>` : emptyState('shopping-bag', t('cartEmpty'), t('cartEmptySub'), `<a href="#/" onclick="closeDrawer()" class="btn-primary mt-5">${t('startShopping')}</a>`)}
  </aside>`;
  lucide.createIcons();
}

function qtyControl(q, dec, inc, size = 'md') {
  const s = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11';
  return `<div class="inline-flex items-center rounded-full border border-zinc-200 bg-white">
    <button class="${s} grid place-items-center rounded-full hover:bg-zinc-100 disabled:opacity-40" onclick="${dec}" ${q <= 1 ? 'disabled' : ''} aria-label="-">${icon('minus', 'w-3.5 h-3.5')}</button>
    <span class="min-w-[2rem] text-center text-sm font-semibold">${q}</span>
    <button class="${s} grid place-items-center rounded-full hover:bg-zinc-100" onclick="${inc}" aria-label="+">${icon('plus', 'w-3.5 h-3.5')}</button>
  </div>`;
}
function emptyState(ic, title, sub, cta = '') {
  return `<div class="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
    <div class="grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-brand-600">${icon(ic, 'w-9 h-9')}</div>
    <h3 class="mt-5 text-lg font-semibold">${title}</h3><p class="mt-1 text-sm text-zinc-500">${sub}</p>${cta}</div>`;
}

// ---------- Product card ----------
function productCard(p, opts = {}) {
  const d = pct(p);
  return `<article class="product-card group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(76,29,149,.35)] ${opts.w || ''}">
    <a href="#/p/${p.slug}" class="relative block aspect-square overflow-hidden bg-zinc-50">
      ${img(p.img, 'h-full w-full object-cover transition duration-500 group-hover:scale-105', 500, L(p.name))}
      <div class="absolute start-3 top-3 flex flex-col gap-1.5">
        ${d ? `<span class="rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-bold text-white">-${d}%</span>` : ''}
        ${p.tags.includes('new') ? `<span class="rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-bold text-white">${S.lang === 'ar' ? 'جديد' : 'NEW'}</span>` : ''}
      </div>
      ${p.stock === 0 ? `<div class="absolute inset-x-0 bottom-0 bg-white/85 py-2 text-center text-xs font-semibold text-zinc-600 backdrop-blur">${t('outOfStock')}</div>` : ''}
    </a>
    <button data-wish="${p.id}" onclick="toggleWish(${p.id}, event)" class="wish-btn absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 ${isWished(p.id) ? 'wished' : ''}" aria-label="${t('wishlist')}">${icon('heart', 'w-4 h-4')}</button>
    <div class="flex flex-1 flex-col p-3.5 sm:p-4">
      <p class="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">${esc(p.brand)}</p>
      <a href="#/p/${p.slug}" class="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-5 text-zinc-900 hover:text-brand-700">${esc(L(p.name))}</a>
      <div class="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">${stars(p.rating)}<span>${p.rating}</span><span class="text-zinc-300">·</span><span>${num(p.reviews)}</span></div>
      <div class="mt-auto pt-3 flex items-end justify-between gap-2">
        <div>
          <div class="text-lg font-bold tracking-tight text-zinc-900">${qar(p.price)}</div>
          ${p.old ? `<div class="text-xs text-zinc-400 line-through">${qar(p.old)}</div>` : '<div class="text-xs text-emerald-600 font-medium">' + t('freeDelivery') + '</div>'}
        </div>
        <button onclick="addToCart(${p.id},1,'',true,event)" ${p.stock === 0 ? 'disabled' : ''} class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/30 transition hover:bg-brand-700 active:scale-95 disabled:bg-zinc-200 disabled:shadow-none" aria-label="${t('addToCart')}">${icon('shopping-bag', 'w-4 h-4')}</button>
      </div>
    </div>
  </article>`;
}

// ---------- Router ----------
function currentRoute() {
  const h = location.hash.replace(/^#\/?/, '');
  const [path, qs] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  const q = Object.fromEntries(new URLSearchParams(qs || ''));
  return { name: parts[0] || 'home', parts, q };
}
function render() {
  S.timers.forEach(clearInterval); S.timers = [];
  document.documentElement.lang = S.lang;
  document.documentElement.dir = S.lang === 'ar' ? 'rtl' : 'ltr';
  const r = currentRoute();
  const app = document.getElementById('app');
  if (r.name === 'admin') { app.innerHTML = adminView(r); document.title = `${t('admin')} · Dukkan`; }
  else { app.innerHTML = shopHeader() + `<main id="main" class="min-h-[60vh]">${shopView(r)}</main>` + shopFooter() + whatsappFab(); }
  lucide.createIcons(); updateBadges(); renderDrawer();
  afterRender(r);
}
let lastPath = '';
window.addEventListener('hashchange', () => {
  S.menu = false;
  const p = location.hash.split('?')[0];
  render();
  if (p !== lastPath) window.scrollTo({ top: 0 });
  lastPath = p;
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); closeModal?.(); } });
