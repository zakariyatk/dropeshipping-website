// ================= Admin dashboard =================
const A = { q: '', status: 'all', catEdit: null };
const AT = (en, ar) => S.lang === 'ar' ? ar : en;
const supName = id => SUPPLIERS.find(s => s.id === id)?.name || '—';
const margin = p => Math.round((p.price - p.cost) / p.price * 100);

const ADMIN_NAV = [
  ['', 'layout-dashboard', 'Dashboard', 'الرئيسية'],
  ['orders', 'receipt-text', 'Orders', 'الطلبات'],
  ['products', 'package', 'Products', 'المنتجات'],
  ['categories', 'layout-grid', 'Categories', 'الأقسام'],
  ['inventory', 'warehouse', 'Inventory', 'المخزون'],
  ['customers', 'users', 'Customers', 'العملاء'],
  ['-', '', 'Dropshipping', 'الدروبشيبنغ'],
  ['suppliers', 'factory', 'Suppliers', 'الموردون'],
  ['catalog', 'library', 'Supplier catalogue', 'كتالوج الموردين'],
  ['purchase-orders', 'clipboard-list', 'Purchase orders', 'أوامر الشراء'],
  ['-', '', 'Marketing & settings', 'التسويق والإعدادات'],
  ['coupons', 'ticket-percent', 'Coupons', 'القسائم'],
  ['banners', 'gallery-horizontal', 'Banners & promos', 'البانرات والعروض'],
  ['shipping', 'truck', 'Shipping', 'الشحن'],
  ['payments', 'credit-card', 'Payments', 'المدفوعات'],
  ['reports', 'chart-line', 'Reports', 'التقارير'],
  ['import', 'file-spreadsheet', 'Import / Export', 'استيراد / تصدير'],
];

function adminView(r) {
  const sec = r.parts[1] || '';
  const views = { '': adDashboard, orders: adOrders, products: adProducts, categories: adCategories, inventory: adInventory, customers: adCustomers, suppliers: adSuppliers, catalog: adCatalog, 'purchase-orders': adPOs, coupons: adCoupons, banners: adBanners, shipping: adShipping, payments: adPayments, reports: adReports, import: adImport };
  const cur = ADMIN_NAV.find(n => n[0] === sec) || ADMIN_NAV[0];
  return `<div class="min-h-screen bg-zinc-50 lg:grid lg:grid-cols-[260px_1fr]">
    <aside id="adside" class="fixed inset-y-0 start-0 z-50 w-[260px] -translate-x-full rtl:translate-x-full overflow-y-auto border-e border-zinc-200 bg-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 rtl:lg:translate-x-0">
      <div class="flex h-16 items-center justify-between border-b px-5">${logo()}<span class="rounded-md bg-zinc-900 px-1.5 py-0.5 text-[10px] font-bold text-white">ADMIN</span></div>
      <nav class="p-3 text-sm">${ADMIN_NAV.map(([k, ic, en, ar]) => k === '-' ? `<p class="mt-5 mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">${AT(en, ar)}</p>` :
        `<a href="#/admin${k ? '/' + k : ''}" class="flex items-center gap-3 rounded-xl px-3 py-2.5 ${sec === k ? 'bg-brand-600 font-semibold text-white shadow-md shadow-brand-600/25' : 'text-zinc-600 hover:bg-zinc-100'}">${icon(ic, 'w-4 h-4')}${AT(en, ar)}${k === 'orders' ? `<span class="ms-auto rounded-full ${sec === k ? 'bg-white/20' : 'bg-brand-50 text-brand-700'} px-2 text-xs font-bold">3</span>` : ''}</a>`).join('')}</nav>
      <div class="m-3 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 p-4 text-white"><p class="text-sm font-semibold">${AT('View storefront', 'عرض المتجر')}</p><p class="mt-1 text-xs text-brand-100">${AT('See what customers see', 'شاهد ما يراه العملاء')}</p><a href="#/" class="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand-700">${AT('Open store', 'افتح المتجر')}${icon('external-link', 'w-3 h-3')}</a></div>
    </aside>
    <div class="min-w-0">
      <header class="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-zinc-200 bg-white/90 px-4 backdrop-blur sm:px-6">
        <button class="icon-btn lg:hidden" onclick="document.getElementById('adside').classList.toggle('!translate-x-0')">${icon('menu')}</button>
        <h1 class="text-lg font-bold">${AT(cur[2], cur[3])}</h1>
        <div class="relative ms-auto hidden md:block w-72"><input placeholder="${AT('Search orders, products…', 'ابحث في الطلبات والمنتجات…')}" onkeydown="if(event.key==='Enter'){A.q=this.value;location.hash='#/admin/orders'}" class="h-10 w-full rounded-full border border-zinc-200 bg-zinc-50 ps-10 pe-4 text-sm outline-none focus:border-brand-500 focus:bg-white"><span class="absolute start-3.5 top-3 text-zinc-400">${icon('search', 'w-4 h-4')}</span></div>
        <button onclick="setLang()" class="icon-btn !w-auto px-3 text-sm font-semibold">${t('langSwitch')}</button>
        <button onclick="toast(AT('3 new orders, 2 low-stock alerts','3 طلبات جديدة، تنبيهان لانخفاض المخزون'))" class="icon-btn relative">${icon('bell')}<span class="badge">5</span></button>
        <span class="grid h-9 w-9 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">A</span>
      </header>
      <main class="p-4 sm:p-6 lg:p-8">${views[sec] ? views[sec]() : adDashboard()}</main>
    </div>
  </div>`;
}

const card = (body, cls = '') => `<div class="rounded-2xl border border-zinc-200/70 bg-white ${cls}">${body}</div>`;
const cardHead = (title, right = '') => `<div class="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-5 py-4"><h3 class="font-semibold">${title}</h3><div class="flex flex-wrap items-center gap-2">${right}</div></div>`;
const th = cols => `<thead class="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500"><tr>${cols.map(c => `<th class="whitespace-nowrap px-4 py-3 text-start font-semibold">${c}</th>`).join('')}</tr></thead>`;
const table = (cols, rows) => `<div class="overflow-x-auto"><table class="w-full text-sm">${th(cols)}<tbody class="divide-y divide-zinc-100">${rows}</tbody></table></div>`;
const td = (v, cls = '') => `<td class="whitespace-nowrap px-4 py-3 ${cls}">${v}</td>`;
const pill = (txt, color) => `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color}">${txt}</span>`;
const toggle = (on, js = '') => `<button role="switch" aria-checked="${on}" onclick="this.setAttribute('aria-checked',this.getAttribute('aria-checked')!=='true');${js}" class="switch"></button>`;
const btn = (label, ic, js, kind = 'primary') => `<button onclick="${js}" class="btn-${kind} !h-9 text-xs">${ic ? icon(ic, 'w-4 h-4') : ''}${label}</button>`;

function kpi(ic, label, value, delta, color) {
  return card(`<div class="p-5"><div class="flex items-center justify-between"><span class="grid h-10 w-10 place-items-center rounded-xl ${color}">${icon(ic)}</span>${pill((delta > 0 ? '▲ ' : '▼ ') + Math.abs(delta) + '%', delta > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600')}</div>
    <p class="mt-4 text-2xl font-bold tracking-tight">${value}</p><p class="text-sm text-zinc-500">${label}</p></div>`);
}

function lineChart(data, h = 240) {
  const w = 720, pad = 30, max = Math.max(...data) * 1.15;
  const x = i => pad + i * (w - pad * 2) / (data.length - 1), y = v => h - pad - v / max * (h - pad * 2);
  const pts = data.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" class="w-full" preserveAspectRatio="none" role="img" aria-label="Revenue chart">
    <defs><linearGradient id="lg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4c00a4" stop-opacity=".25"/><stop offset="1" stop-color="#4c00a4" stop-opacity="0"/></linearGradient></defs>
    ${[0, 1, 2, 3].map(i => `<line x1="${pad}" x2="${w - pad}" y1="${pad + i * (h - pad * 2) / 3}" y2="${pad + i * (h - pad * 2) / 3}" stroke="#f4f4f5"/>`).join('')}
    <polygon points="${x(0)},${h - pad} ${pts} ${x(data.length - 1)},${h - pad}" fill="url(#lg)"/>
    <polyline points="${pts}" fill="none" stroke="#4c00a4" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${data.map((v, i) => i % 5 === 4 ? `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="#fff" stroke="#4c00a4" stroke-width="2"><title>QAR ${num(v)}</title></circle>` : '').join('')}
    ${data.map((_, i) => i % 5 === 0 ? `<text x="${x(i)}" y="${h - 8}" font-size="10" fill="#a1a1aa" text-anchor="middle">${i + 1} Oct</text>` : '').join('')}
  </svg>`;
}
const REV30 = [8200, 9100, 7800, 10400, 11200, 9800, 12600, 13100, 11900, 12400, 14800, 15200, 13900, 16100, 17400, 15800, 16900, 18200, 17100, 19600, 21300, 19800, 22400, 23900, 22100, 24800, 27200, 26100, 29400, 31800];

function statusSelect(o) {
  return `<select onchange="o_set('${o.id}',this.value)" class="status-pill status-${o.status} cursor-pointer border-0 pe-6 outline-none">${ORDER_STATUSES.map(s => `<option value="${s}" ${o.status === s ? 'selected' : ''}>${t('st_' + s)}</option>`).join('')}</select>`;
}
function o_set(id, s) { const o = DEMO_ORDERS.find(x => x.id === id); o.status = s; toast(`${id} → ${t('st_' + s)} · ${AT('customer notified via WhatsApp & email', 'تم إشعار العميل عبر واتساب والبريد')}`); render(); }

function adDashboard() {
  const revenue = REV30.reduce((a, b) => a + b, 0);
  const catSales = CATEGORIES.map((c, i) => [L(c.name), [38, 24, 18, 31, 27, 22, 12, 9, 7, 15][i]]).sort((a, b) => b[1] - a[1]).slice(0, 6);
  return `<div class="flex flex-wrap items-center justify-between gap-3"><div><p class="text-sm text-zinc-500">${AT('Welcome back, Admin — here’s what’s happening today.', 'أهلاً بعودتك — إليك ملخص اليوم.')}</p></div>
    <div class="flex gap-2"><select class="input !h-9 !w-auto text-xs"><option>${AT('Last 30 days', 'آخر 30 يوماً')}</option><option>${AT('Last 7 days', 'آخر 7 أيام')}</option><option>${AT('This year', 'هذه السنة')}</option></select>${btn(AT('Export', 'تصدير'), 'download', 'exportCSV(\'orders\')', 'outline')}${btn(AT('Add product', 'إضافة منتج'), 'plus', 'productModal()')}</div></div>
  <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    ${kpi('wallet', AT('Revenue (30d)', 'الإيرادات (30 يوماً)'), qar(revenue), 18.2, 'bg-brand-50 text-brand-700')}
    ${kpi('shopping-cart', AT('Total orders', 'إجمالي الطلبات'), num(1284), 12.5, 'bg-sky-50 text-sky-700')}
    ${kpi('trending-up', AT('Gross profit', 'إجمالي الربح'), qar(Math.round(revenue * .41)), 9.1, 'bg-emerald-50 text-emerald-700')}
    ${kpi('users', AT('New customers', 'عملاء جدد'), num(342), -3.4, 'bg-amber-50 text-amber-700')}
  </div>
  <div class="mt-6 grid gap-6 xl:grid-cols-3">
    ${card(cardHead(AT('Revenue overview', 'نظرة على الإيرادات'), `<span class="text-xs text-zinc-500">${AT('Avg. order value', 'متوسط قيمة الطلب')}: <b class="text-zinc-900">${qar(412)}</b></span>`) + `<div class="p-4">${lineChart(REV30)}</div>`, 'xl:col-span-2')}
    ${card(cardHead(AT('Sales by category', 'المبيعات حسب القسم')) + `<div class="space-y-4 p-5">${catSales.map(([n, v]) => `<div><div class="flex justify-between text-sm"><span class="truncate">${n}</span><b>${v}%</b></div><div class="mt-1.5 h-2 rounded-full bg-zinc-100"><div class="h-full rounded-full bg-gradient-to-r from-brand-500 to-indigo-500" style="width:${v / 38 * 100}%"></div></div></div>`).join('')}</div>`)}
  </div>
  <div class="mt-6 grid gap-6 xl:grid-cols-3">
    ${card(cardHead(AT('Recent orders', 'أحدث الطلبات'), `<a href="#/admin/orders" class="text-sm font-semibold text-brand-700">${t('viewAll')}</a>`) + table([AT('Order', 'الطلب'), AT('Customer', 'العميل'), AT('Total', 'الإجمالي'), AT('Payment', 'الدفع'), AT('Status', 'الحالة')], DEMO_ORDERS.slice(0, 5).map(o => `<tr class="hover:bg-zinc-50">${td(`<b>${o.id}</b>`)}${td(o.customer)}${td(qar(o.total))}${td(o.pay.toUpperCase())}${td(statusSelect(o))}</tr>`).join('')), 'xl:col-span-2')}
    <div class="space-y-6">
      ${card(cardHead(AT('Low stock alerts', 'تنبيهات المخزون'), pill(PRODUCTS.filter(p => p.stock < 15).length, 'bg-red-50 text-red-600')) + `<div class="divide-y">${PRODUCTS.filter(p => p.stock < 15).slice(0, 4).map(p => `<div class="flex items-center gap-3 px-5 py-3"><span class="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-100">${img(p.img, 'h-full w-full object-cover', 100)}</span><span class="min-w-0 flex-1 truncate text-sm">${esc(L(p.name))}</span><b class="text-sm ${p.stock ? 'text-amber-600' : 'text-red-600'}">${p.stock}</b></div>`).join('')}</div>`)}
      ${card(cardHead(AT('Top products', 'أفضل المنتجات')) + `<div class="divide-y">${[19, 1, 16, 3].map((id, i) => { const p = P(id); return `<div class="flex items-center gap-3 px-5 py-3"><span class="text-sm font-bold text-zinc-400">#${i + 1}</span><span class="min-w-0 flex-1 truncate text-sm">${esc(L(p.name))}</span><span class="text-xs text-zinc-500">${[214, 188, 152, 147][i]} ${AT('sold', 'مبيع')}</span></div>`; }).join('')}</div>`)}
    </div>
  </div>`;
}

function adOrders() {
  const list = DEMO_ORDERS.filter(o => (A.status === 'all' || o.status === A.status) && (!A.q || (o.id + o.customer + o.phone).toLowerCase().includes(A.q.toLowerCase())));
  return `<div class="flex flex-wrap gap-2">${['all', 'pending', 'confirmed', 'ordered_supplier', 'shipped', 'out_for_delivery', 'delivered', 'returned'].map(s => `<button onclick="A.status='${s}';render()" class="chip ${A.status === s ? '!bg-zinc-900 !text-white' : ''}">${s === 'all' ? AT('All', 'الكل') : t('st_' + s)} <span class="opacity-60">${s === 'all' ? DEMO_ORDERS.length : DEMO_ORDERS.filter(o => o.status === s).length}</span></button>`).join('')}</div>
  ${card(cardHead(`${list.length} ${AT('orders', 'طلب')}`, `<input value="${esc(A.q)}" oninput="A.q=this.value" onkeydown="event.key==='Enter'&&render()" placeholder="${AT('Search order, name, phone', 'ابحث برقم الطلب أو الاسم أو الجوال')}" class="input !h-9 !w-60 text-xs">${btn(AT('Export CSV', 'تصدير CSV'), 'download', "exportCSV('orders')", 'outline')}`) +
    table([AT('Order', 'الطلب'), AT('Date', 'التاريخ'), AT('Customer', 'العميل'), AT('Zone', 'المنطقة'), AT('Total', 'الإجمالي'), AT('Payment', 'الدفع'), AT('Supplier ref.', 'مرجع المورد'), AT('Tracking no.', 'رقم التتبع'), AT('Status', 'الحالة'), ''],
      list.map(o => `<tr class="hover:bg-zinc-50">${td(`<b>${o.id}</b>`)}${td(o.date, 'text-zinc-500')}${td(`${o.customer}<div class="text-xs text-zinc-500" dir="ltr">${o.phone}</div>`)}${td(L(MUNICIPALITIES.find(m => m.id === o.zone)))}${td(`<b>${qar(o.total)}</b>`)}${td(pill(o.pay === 'cod' ? 'COD' : o.pay === 'apple' ? 'Apple Pay' : 'Card', o.pay === 'cod' ? 'bg-amber-50 text-amber-700' : 'bg-sky-50 text-sky-700'))}
      ${td(o.supRef ? `<code class="text-xs">${o.supRef}</code>` : `<button onclick="poFromOrder('${o.id}')" class="text-xs font-semibold text-brand-700">+ ${AT('Create PO', 'إنشاء أمر شراء')}</button>`)}
      ${td(`<input value="${o.tracking}" placeholder="—" onchange="DEMO_ORDERS.find(x=>x.id==='${o.id}').tracking=this.value;toast(AT('Tracking saved & sent to customer','تم حفظ رقم التتبع وإرساله للعميل'))" class="h-8 w-32 rounded-lg border border-transparent bg-transparent px-2 text-xs hover:border-zinc-200 focus:border-brand-500 focus:bg-white outline-none" dir="ltr">`)}
      ${td(statusSelect(o))}${td(`<a href="#/order/${o.id}" class="icon-btn !h-8 !w-8" title="${t('invoice')}">${icon('file-text', 'w-4 h-4')}</a>`)}</tr>`).join('') || `<tr><td colspan="10" class="p-10 text-center text-zinc-500">${t('noResults')}</td></tr>`), 'mt-5')}`;
}
function poFromOrder(id) { const o = DEMO_ORDERS.find(x => x.id === id); const p = P(o.items[0][0]); o.supRef = 'PO-' + (3109 + PURCHASE_ORDERS.length); o.status = 'ordered_supplier'; PURCHASE_ORDERS.unshift({ id: o.supRef, supplier: p.supplier, date: '2026-11-02', items: o.items.length, cost: o.items.reduce((a, [pid, q]) => a + P(pid).cost * q, 0), status: 'sent', orders: [id] }); toast(`${o.supRef} ${AT('sent to', 'أُرسل إلى')} ${supName(p.supplier)}`); render(); }

function adProducts() {
  const list = PRODUCTS.filter(p => !A.q || (p.name.en + p.name.ar + p.brand).toLowerCase().includes(A.q.toLowerCase()));
  return card(cardHead(`${list.length} ${AT('products', 'منتج')}`, `<input value="${esc(A.q)}" oninput="A.q=this.value" onkeydown="event.key==='Enter'&&render()" placeholder="${AT('Search products', 'ابحث في المنتجات')}" class="input !h-9 !w-56 text-xs">${btn(AT('Import', 'استيراد'), 'upload', "location.hash='#/admin/import'", 'outline')}${btn(AT('Export', 'تصدير'), 'download', "exportCSV('products')", 'outline')}${btn(AT('Add product', 'إضافة منتج'), 'plus', 'productModal()')}`) +
    table(['', AT('Product', 'المنتج'), AT('Category', 'القسم'), AT('Supplier', 'المورد'), AT('Cost', 'التكلفة'), AT('Price', 'السعر'), AT('Margin', 'الهامش'), AT('Stock', 'المخزون'), AT('Status', 'الحالة'), ''],
      list.map(p => `<tr class="hover:bg-zinc-50">${td(`<span class="block h-11 w-11 overflow-hidden rounded-lg bg-zinc-100">${img(p.img, 'h-full w-full object-cover', 100)}</span>`)}${td(`<div class="max-w-[260px] truncate font-medium">${esc(L(p.name))}</div><div class="text-xs text-zinc-500">SKU DK-${String(p.id).padStart(5, '0')}</div>`)}${td(L(C(p.cat).name), 'text-zinc-600')}${td(`<span class="text-xs">${supName(p.supplier)}</span>`)}${td(qar(p.cost), 'text-zinc-500')}${td(`<b>${qar(p.price)}</b>`)}${td(pill(margin(p) + '%', margin(p) >= 40 ? 'bg-emerald-50 text-emerald-700' : margin(p) >= 25 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'))}${td(`<span class="${p.stock === 0 ? 'text-red-600' : p.stock < 15 ? 'text-amber-600' : ''} font-semibold">${p.stock}</span>`)}${td(toggle(p.stock > 0))}
      ${td(`<div class="flex gap-1"><button onclick="productModal(${p.id})" class="icon-btn !h-8 !w-8">${icon('pencil', 'w-4 h-4')}</button><a href="#/p/${p.slug}" class="icon-btn !h-8 !w-8">${icon('eye', 'w-4 h-4')}</a><button onclick="if(confirm('${AT('Delete this product?', 'حذف هذا المنتج؟')}')){PRODUCTS.splice(PRODUCTS.findIndex(x=>x.id===${p.id}),1);render();toast('${t('delete_')}')}" class="icon-btn !h-8 !w-8 hover:!text-red-600">${icon('trash-2', 'w-4 h-4')}</button></div>`)}</tr>`).join(''))
  );
}
function productModal(id) {
  const p = id ? P(id) : { name: { en: '', ar: '' }, price: '', cost: '', old: '', stock: '', cat: 'electronics', supplier: 'SUP-01', brand: '' };
  openModal(`<h3 class="text-lg font-semibold">${id ? AT('Edit product', 'تعديل المنتج') : AT('Add product', 'إضافة منتج')}</h3>
  <form onsubmit="event.preventDefault();saveProduct(this,${id || 0})" class="mt-5 grid gap-4 sm:grid-cols-2">
    <label class="block sm:col-span-2"><span class="label">${AT('Name (English)', 'الاسم (إنجليزي)')}</span><input name="en" required value="${esc(p.name.en)}" class="input"></label>
    <label class="block sm:col-span-2"><span class="label">${AT('Name (Arabic)', 'الاسم (عربي)')}</span><input name="ar" dir="rtl" value="${esc(p.name.ar)}" class="input"></label>
    <label class="block"><span class="label">${AT('Category', 'القسم')}</span><select name="cat" class="input">${CATEGORIES.map(c => `<option value="${c.slug}" ${p.cat === c.slug ? 'selected' : ''}>${L(c.name)}</option>`).join('')}</select></label>
    <label class="block"><span class="label">${AT('Supplier', 'المورد')}</span><select name="sup" class="input">${SUPPLIERS.map(s => `<option value="${s.id}" ${p.supplier === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}</select></label>
    <label class="block"><span class="label">${AT('Supplier cost (QAR)', 'تكلفة المورد (ر.ق)')}</span><input name="cost" type="number" step="0.01" required value="${p.cost}" oninput="calcMargin(this.form)" class="input"></label>
    <label class="block"><span class="label">${AT('Selling price (QAR)', 'سعر البيع (ر.ق)')}</span><input name="price" type="number" step="0.01" required value="${p.price}" oninput="calcMargin(this.form)" class="input"></label>
    <label class="block"><span class="label">${AT('Compare-at price (QAR)', 'السعر قبل الخصم (ر.ق)')}</span><input name="old" type="number" value="${p.old || ''}" class="input"></label>
    <label class="block"><span class="label">${AT('Stock', 'المخزون')}</span><input name="stock" type="number" required value="${p.stock}" class="input"></label>
    <div id="mcalc" class="sm:col-span-2 grid grid-cols-3 gap-3 rounded-xl bg-brand-50 p-4 text-center text-sm"></div>
    <label class="sm:col-span-2 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 p-6 text-sm text-zinc-500 hover:border-brand-400">${icon('image-up', 'w-6 h-6')}${AT('Drop images or click to upload (Supabase Storage)', 'اسحب الصور أو انقر للرفع')}<input type="file" accept="image/*" multiple class="hidden" onchange="toast(this.files.length+' ${AT('image(s) selected', 'صورة محددة')}')"></label>
    <div class="sm:col-span-2 flex justify-end gap-2"><button type="button" onclick="closeModal()" class="btn-outline">${AT('Cancel', 'إلغاء')}</button><button class="btn-primary">${t('save')}</button></div>
  </form>`, 'max-w-2xl');
  calcMargin(document.querySelector('#modal form'));
}
function calcMargin(f) {
  const c = +f.cost.value || 0, p = +f.price.value || 0, prof = p - c, m = p ? Math.round(prof / p * 100) : 0;
  document.getElementById('mcalc').innerHTML = `<div><p class="text-xs text-zinc-500">${AT('Profit / unit', 'الربح للوحدة')}</p><b class="text-brand-800">${qar(prof)}</b></div><div><p class="text-xs text-zinc-500">${AT('Margin', 'الهامش')}</p><b class="${m < 25 ? 'text-red-600' : 'text-brand-800'}">${m}%</b></div><div><p class="text-xs text-zinc-500">${AT('Markup', 'نسبة الزيادة')}</p><b class="text-brand-800">${c ? Math.round(prof / c * 100) : 0}%</b></div>`;
}
function saveProduct(f, id) {
  const data = { name: { en: f.en.value, ar: f.ar.value || f.en.value }, cat: f.cat.value, supplier: f.sup.value, cost: +f.cost.value, price: +f.price.value, old: +f.old.value || undefined, stock: +f.stock.value };
  if (id) Object.assign(P(id), data);
  else PRODUCTS.unshift({ id: Math.max(...PRODUCTS.map(p => p.id)) + 1, slug: f.en.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'), brand: 'Dukkan', rating: 0, reviews: 0, img: C(data.cat).img, tags: ['new'], ...data });
  closeModal(); render(); toast(t('saved'));
}

function adCategories() {
  return `<div class="flex justify-end">${btn(AT('Add category', 'إضافة قسم'), 'plus', 'catModal()')}</div>
  <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">${CATEGORIES.map((c, i) => card(`<div class="flex items-center gap-4 p-4">
    <span class="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-100">${img(c.img, 'h-full w-full object-cover', 150)}</span>
    <div class="min-w-0 flex-1"><p class="truncate font-semibold">${c.name.en}</p><p class="truncate text-sm text-zinc-500" dir="rtl">${c.name.ar}</p><p class="mt-1 text-xs text-zinc-400">/c/${c.slug} · ${PRODUCTS.filter(p => p.cat === c.slug).length} ${AT('products', 'منتج')}</p></div>
    <div class="flex flex-col gap-1"><button onclick="catModal(${i})" class="icon-btn !h-8 !w-8">${icon('pencil', 'w-4 h-4')}</button><button onclick="if(confirm('${AT('Delete category?', 'حذف القسم؟')}')){CATEGORIES.splice(${i},1);render();toast('${t('delete_')}')}" class="icon-btn !h-8 !w-8 hover:!text-red-600">${icon('trash-2', 'w-4 h-4')}</button></div></div>`)).join('')}</div>`;
}
function catModal(i) {
  const c = i != null ? CATEGORIES[i] : { name: { en: '', ar: '' }, slug: '', icon: 'tag' };
  openModal(`<h3 class="text-lg font-semibold">${i != null ? AT('Edit category', 'تعديل القسم') : AT('Add category', 'إضافة قسم')}</h3>
  <form onsubmit="event.preventDefault();saveCat(this,${i ?? -1})" class="mt-5 space-y-4">
    <label class="block"><span class="label">${AT('Name (English)', 'الاسم (إنجليزي)')}</span><input name="en" required value="${esc(c.name.en)}" oninput="if(!this.form.slug.dataset.touched)this.form.slug.value=this.value.toLowerCase().replace(/[^a-z0-9]+/g,'-')" class="input"></label>
    <label class="block"><span class="label">${AT('Name (Arabic)', 'الاسم (عربي)')}</span><input name="ar" required dir="rtl" value="${esc(c.name.ar)}" class="input"></label>
    <label class="block"><span class="label">${AT('URL slug', 'رابط القسم')}</span><input name="slug" required value="${esc(c.slug)}" oninput="this.dataset.touched=1" class="input" dir="ltr"></label>
    <label class="block"><span class="label">${AT('Icon', 'الأيقونة')}</span><select name="icon" class="input">${['tag', 'gift', 'gem', 'watch', 'gamepad-2', 'book-open', 'pet', 'flower-2', 'monitor-smartphone', 'sofa', 'shirt'].map(x => `<option ${c.icon === x ? 'selected' : ''}>${x}</option>`).join('')}</select></label>
    <div class="flex justify-end gap-2"><button type="button" onclick="closeModal()" class="btn-outline">${AT('Cancel', 'إلغاء')}</button><button class="btn-primary">${t('save')}</button></div></form>`);
}
function saveCat(f, i) {
  const data = { name: { en: f.en.value, ar: f.ar.value }, slug: f.slug.value, icon: f.icon.value };
  if (i >= 0) Object.assign(CATEGORIES[i], data); else CATEGORIES.push({ ...data, img: '1607082348824-0a96f2a4b9da', tint: 'from-violet-100 to-indigo-50' });
  closeModal(); render(); toast(t('saved'));
}

function adInventory() {
  return card(cardHead(AT('Stock levels', 'مستويات المخزون'), `${btn(AT('Sync from suppliers', 'مزامنة من الموردين'), 'refresh-cw', "toast(AT('Stock & prices synced from 3 supplier feeds','تمت مزامنة المخزون والأسعار من 3 موردين'))", 'outline')}${btn(t('save'), 'save', "toast('" + t('saved') + "')")}`) +
    table([AT('Product', 'المنتج'), AT('Supplier', 'المورد'), AT('Supplier stock', 'مخزون المورد'), AT('Available', 'المتاح'), AT('Reorder at', 'حد إعادة الطلب'), AT('Status', 'الحالة')],
      PRODUCTS.map(p => `<tr class="hover:bg-zinc-50">${td(`<div class="max-w-[280px] truncate font-medium">${esc(L(p.name))}</div>`)}${td(`<span class="text-xs">${supName(p.supplier)}</span>`)}${td(p.stock * 4 + 20, 'text-zinc-500')}
        ${td(`<input type="number" value="${p.stock}" onchange="P(${p.id}).stock=+this.value" class="h-8 w-20 rounded-lg border border-zinc-200 px-2 text-sm">`)}${td('15', 'text-zinc-500')}
        ${td(p.stock === 0 ? pill(t('outOfStock'), 'bg-red-50 text-red-600') : p.stock < 15 ? pill(AT('Low', 'منخفض'), 'bg-amber-50 text-amber-700') : pill(t('inStock'), 'bg-emerald-50 text-emerald-700'))}</tr>`).join('')));
}

function adCustomers() {
  return card(cardHead(`${CUSTOMERS.length} ${AT('customers', 'عميل')}`, btn(AT('Export', 'تصدير'), 'download', "exportCSV('customers')", 'outline')) +
    table([AT('Customer', 'العميل'), AT('Mobile', 'الجوال'), 'Email', AT('Zone', 'المنطقة'), AT('Orders', 'الطلبات'), AT('Total spent', 'إجمالي الإنفاق'), AT('Joined', 'تاريخ التسجيل'), ''],
      CUSTOMERS.map(c => `<tr class="hover:bg-zinc-50">${td(`<div class="flex items-center gap-3"><span class="grid h-9 w-9 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">${c.name[0]}</span><b>${c.name}</b></div>`)}${td(`<span dir="ltr">${c.phone}</span>`)}${td(c.email, 'text-zinc-500')}${td(L(MUNICIPALITIES.find(m => m.id === c.zone)))}${td(c.orders)}${td(`<b>${qar(c.spent)}</b>`)}${td(c.joined, 'text-zinc-500')}
      ${td(`<a href="https://wa.me/${c.phone.replace(/\D/g, '')}" target="_blank" rel="noopener" class="icon-btn !h-8 !w-8 text-emerald-600">${icon('message-circle', 'w-4 h-4')}</a>`)}</tr>`).join('')));
}

function adSuppliers() {
  return `<div class="flex justify-end">${btn(AT('Add supplier', 'إضافة مورد'), 'plus', 'supplierModal()')}</div>
  <div class="mt-5 grid gap-4 md:grid-cols-2">${SUPPLIERS.map(s => card(`<div class="p-5"><div class="flex items-start gap-4"><span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">${icon('factory')}</span>
    <div class="flex-1"><div class="flex items-center gap-2"><b>${s.name}</b>${s.api ? pill('API', 'bg-emerald-50 text-emerald-700') : pill('CSV', 'bg-zinc-100 text-zinc-600')}</div><p class="text-sm text-zinc-500">${s.id} · ${s.country}</p></div>${stars(s.rating)}</div>
    <div class="mt-5 grid grid-cols-3 gap-3 text-center text-sm">${[[AT('Products', 'المنتجات'), s.products], [AT('Lead time', 'مدة التوريد'), s.lead + AT(' days', ' أيام')], [AT('Open POs', 'أوامر مفتوحة'), PURCHASE_ORDERS.filter(p => p.supplier === s.id && p.status !== 'received').length]].map(([l, v]) => `<div class="rounded-xl bg-zinc-50 p-3"><p class="text-xs text-zinc-500">${l}</p><b>${v}</b></div>`).join('')}</div>
    <div class="mt-4 flex gap-2">${btn(AT('Catalogue', 'الكتالوج'), 'library', "location.hash='#/admin/catalog'", 'outline')}${btn(AT('Sync now', 'مزامنة الآن'), 'refresh-cw', `toast('${s.name}: ${AT('prices & stock updated', 'تم تحديث الأسعار والمخزون')}')`, 'outline')}</div></div>`)).join('')}</div>`;
}
function supplierModal() {
  openModal(`<h3 class="text-lg font-semibold">${AT('Add supplier', 'إضافة مورد')}</h3><form onsubmit="event.preventDefault();SUPPLIERS.push({id:'SUP-0'+(SUPPLIERS.length+1),name:this.n.value,country:this.c.value,lead:this.l.value,rating:0,products:0,api:this.a.checked});closeModal();render();toast('${t('saved')}')" class="mt-5 space-y-4">
    <label class="block"><span class="label">${AT('Company name', 'اسم الشركة')}</span><input name="n" required class="input"></label>
    <div class="grid grid-cols-2 gap-3"><label class="block"><span class="label">${AT('Country', 'الدولة')}</span><input name="c" required class="input"></label><label class="block"><span class="label">${AT('Lead time (days)', 'مدة التوريد')}</span><input name="l" required placeholder="3–5" class="input"></label></div>
    <label class="block"><span class="label">${AT('API endpoint / feed URL', 'رابط الـ API / التغذية')}</span><input class="input" placeholder="https://" dir="ltr"></label>
    <label class="flex items-center gap-2 text-sm"><input name="a" type="checkbox" class="h-4 w-4 accent-brand-600">${AT('Automatic order & stock sync via API', 'مزامنة تلقائية للطلبات والمخزون')}</label>
    <div class="flex justify-end gap-2"><button type="button" onclick="closeModal()" class="btn-outline">${AT('Cancel', 'إلغاء')}</button><button class="btn-primary">${t('save')}</button></div></form>`);
}

function adCatalog() {
  const items = [['Wireless Gaming Mouse RGB', 38, 'SUP-01', '1527864550417-7fd91fc51a46'], ['Ceramic Pour-over Coffee Set', 42, 'SUP-02', '1495474472287-4d71bcdd2085'], ['Silk Prayer Mat — Premium', 55, 'SUP-03', '1586023492125-27b2c045efd7'], ['Magnetic Car Phone Holder', 9, 'SUP-01', '1503376780353-7e6692767b70'], ['Kids Smart Watch GPS', 64, 'SUP-01', '1546868871-7041f2a55e12'], ['Bakhoor Electric Burner', 31, 'SUP-04', '1541643600914-78b084683601']];
  return `<div class="flex flex-wrap items-center gap-2"><select class="input !h-9 !w-auto text-xs"><option>${AT('All suppliers', 'جميع الموردين')}</option>${SUPPLIERS.map(s => `<option>${s.name}</option>`).join('')}</select><input placeholder="${AT('Search supplier catalogue', 'ابحث في كتالوج الموردين')}" class="input !h-9 !w-64 text-xs"><span class="ms-auto text-sm text-zinc-500">${AT('Default markup', 'نسبة الزيادة الافتراضية')}</span><input id="mk" type="number" value="120" class="input !h-9 !w-20 text-xs">%</div>
  <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">${items.map(([n, c, s, im]) => card(`<div class="flex gap-4 p-4"><span class="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100">${img(im, 'h-full w-full object-cover', 160)}</span>
    <div class="min-w-0 flex-1"><p class="truncate font-semibold">${n}</p><p class="text-xs text-zinc-500">${supName(s)}</p><p class="mt-2 text-sm">${AT('Cost', 'التكلفة')}: <b>${qar(c)}</b> → ${AT('Sell', 'البيع')}: <b class="text-brand-700">${qar(Math.round(c * 2.2))}</b></p>
    <button onclick="this.outerHTML='<span class=&quot;mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600&quot;>✓ ${AT('Imported as draft', 'تم الاستيراد كمسودة')}</span>';toast('${AT('Product imported to your store', 'تم استيراد المنتج إلى متجرك')}')" class="mt-2 btn-primary !h-8 text-xs">${icon('download', 'w-3.5 h-3.5')}${AT('Import to store', 'استيراد للمتجر')}</button></div></div>`)).join('')}</div>`;
}

function adPOs() {
  const st = { sent: 'bg-sky-50 text-sky-700', confirmed: 'bg-brand-50 text-brand-700', received: 'bg-emerald-50 text-emerald-700' };
  return card(cardHead(AT('Purchase orders', 'أوامر الشراء'), btn(AT('New PO', 'أمر شراء جديد'), 'plus', "location.hash='#/admin/orders';toast(AT('Pick an order and click “Create PO”','اختر طلباً وانقر “إنشاء أمر شراء”'))")) +
    table(['PO', AT('Supplier', 'المورد'), AT('Date', 'التاريخ'), AT('Items', 'المنتجات'), AT('Cost', 'التكلفة'), AT('Customer orders', 'طلبات العملاء'), AT('Status', 'الحالة'), ''],
      PURCHASE_ORDERS.map(p => `<tr class="hover:bg-zinc-50">${td(`<b>${p.id}</b>`)}${td(supName(p.supplier))}${td(p.date, 'text-zinc-500')}${td(p.items)}${td(qar(p.cost))}${td(p.orders.map(o => `<code class="me-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs">${o}</code>`).join(''))}${td(pill(p.status, st[p.status]))}
      ${td(p.status !== 'received' ? `<button onclick="PURCHASE_ORDERS.find(x=>x.id==='${p.id}').status='received';render();toast('${p.id} ${AT('marked received', 'تم الاستلام')}')" class="text-xs font-semibold text-brand-700">${AT('Mark received', 'تحديد كمستلم')}</button>` : '')}</tr>`).join('')));
}

function adCoupons() {
  return card(cardHead(AT('Discount coupons', 'قسائم الخصم'), btn(AT('Create coupon', 'إنشاء قسيمة'), 'plus', 'couponModal()')) +
    table([AT('Code', 'الرمز'), AT('Type', 'النوع'), AT('Value', 'القيمة'), AT('Min. order', 'الحد الأدنى'), AT('Usage', 'الاستخدام'), AT('Expires', 'ينتهي'), AT('Active', 'مفعل')],
      COUPONS.map((c, i) => `<tr class="hover:bg-zinc-50">${td(`<code class="rounded-lg bg-brand-50 px-2 py-1 font-bold text-brand-700">${c.code}</code>`)}${td({ pct: AT('Percentage', 'نسبة'), fixed: AT('Fixed amount', 'مبلغ ثابت'), ship: AT('Free shipping', 'شحن مجاني') }[c.type])}${td(c.type === 'pct' ? c.value + '%' : c.type === 'fixed' ? qar(c.value) : '—')}${td(c.min ? qar(c.min) : '—')}
      ${td(`${num(c.uses)}${c.limit ? ' / ' + num(c.limit) : ''}`)}${td(c.expires, 'text-zinc-500')}${td(toggle(c.active, `COUPONS[${i}].active=!COUPONS[${i}].active`))}</tr>`).join('')));
}
function couponModal() {
  openModal(`<h3 class="text-lg font-semibold">${AT('Create coupon', 'إنشاء قسيمة')}</h3><form onsubmit="event.preventDefault();COUPONS.unshift({code:this.c.value.toUpperCase(),type:this.t.value,value:+this.v.value,min:+this.m.value,uses:0,limit:+this.l.value,active:true,expires:this.e.value});closeModal();render();toast('${t('saved')}')" class="mt-5 grid grid-cols-2 gap-4">
    <label class="col-span-2 block"><span class="label">${AT('Code', 'الرمز')}</span><input name="c" required class="input uppercase" placeholder="NATIONALDAY"></label>
    <label class="block"><span class="label">${AT('Type', 'النوع')}</span><select name="t" class="input"><option value="pct">%</option><option value="fixed">QAR</option><option value="ship">${AT('Free shipping', 'شحن مجاني')}</option></select></label>
    <label class="block"><span class="label">${AT('Value', 'القيمة')}</span><input name="v" type="number" value="10" class="input"></label>
    <label class="block"><span class="label">${AT('Min. order (QAR)', 'الحد الأدنى')}</span><input name="m" type="number" value="0" class="input"></label>
    <label class="block"><span class="label">${AT('Usage limit', 'حد الاستخدام')}</span><input name="l" type="number" value="1000" class="input"></label>
    <label class="col-span-2 block"><span class="label">${AT('Expires', 'تاريخ الانتهاء')}</span><input name="e" type="date" value="2026-12-18" class="input"></label>
    <div class="col-span-2 flex justify-end gap-2"><button type="button" onclick="closeModal()" class="btn-outline">${AT('Cancel', 'إلغاء')}</button><button class="btn-primary">${t('save')}</button></div></form>`);
}

function adBanners() {
  return `<div class="flex justify-end">${btn(AT('Add banner', 'إضافة بانر'), 'plus', `toast('${t('comingSoon')}')`)}</div>
  <div class="mt-5 space-y-4">${HERO_SLIDES.map((s, i) => card(`<div class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
    <div class="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${s.bg} sm:w-64"><div class="absolute inset-0 opacity-40">${img(s.img, 'h-full w-full object-cover', 500)}</div><p class="absolute bottom-3 start-3 end-3 text-sm font-bold text-white">${L(s.title)}</p></div>
    <div class="flex-1 space-y-2"><input value="${esc(s.title.en)}" onchange="HERO_SLIDES[${i}].title.en=this.value" class="input !h-9 text-sm"><input value="${esc(s.title.ar)}" dir="rtl" onchange="HERO_SLIDES[${i}].title.ar=this.value" class="input !h-9 text-sm"><p class="text-xs text-zinc-500">${AT('Link', 'الرابط')}: <code>${s.href}</code> · ${AT('Position', 'الترتيب')} ${i + 1}</p></div>
    <div class="flex items-center gap-3 sm:flex-col">${toggle(true)}<button onclick="toast('${t('saved')}')" class="btn-outline !h-8 text-xs">${t('save')}</button></div></div>`)).join('')}</div>`;
}

function adShipping() {
  return `<div class="grid gap-6 xl:grid-cols-3">${card(cardHead(AT('Delivery zones — Qatar', 'مناطق التوصيل — قطر'), btn(t('save'), 'save', `toast('${t('saved')}')`)) +
    table([AT('Municipality', 'البلدية'), AT('Extra fee', 'رسوم إضافية'), AT('ETA (days)', 'المدة (أيام)'), 'COD', AT('Active', 'مفعل')],
      MUNICIPALITIES.map((m, i) => `<tr>${td(`<b>${L(m)}</b>`)}${td(`<input type="number" value="${m.fee}" onchange="MUNICIPALITIES[${i}].fee=+this.value" class="h-8 w-20 rounded-lg border border-zinc-200 px-2">`)}${td(`${m.eta[0]}–${m.eta[1]}`)}${td(toggle(true))}${td(toggle(true))}</tr>`).join('')), 'xl:col-span-2')}
    ${card(cardHead(AT('Rates & rules', 'الأسعار والقواعد')) + `<div class="space-y-4 p-5">
      <label class="block"><span class="label">${AT('Standard fee (QAR)', 'رسوم التوصيل العادي')}</span><input type="number" value="15" class="input"></label>
      <label class="block"><span class="label">${AT('Free delivery over (QAR)', 'توصيل مجاني فوق')}</span><input type="number" value="${FREE_OVER}" class="input"></label>
      <label class="block"><span class="label">${AT('Express same-day fee (QAR)', 'رسوم التوصيل السريع')}</span><input type="number" value="25" class="input"></label>
      <label class="block"><span class="label">${AT('Same-day cut-off time', 'آخر موعد للتوصيل في نفس اليوم')}</span><input type="time" value="14:00" class="input"></label>
      <label class="block"><span class="label">${AT('Courier partner', 'شركة التوصيل')}</span><select class="input"><option>Q-Post</option><option>Aramex Qatar</option><option>DHL Express</option><option>${AT('Own fleet', 'أسطول خاص')}</option></select></label>
      <button onclick="toast('${t('saved')}')" class="btn-primary w-full">${t('save')}</button></div>`)}</div>`;
}

function adPayments() {
  const gw = [['banknote', t('cod'), AT('Cash or card to courier. Optional COD fee.', 'نقداً أو بالبطاقة للمندوب.'), true], ['credit-card', 'QPay / NAPS', AT('Qatar debit cards (NAPS) via QPay.', 'بطاقات الخصم القطرية عبر QPay.'), true], ['credit-card', 'SkipCash', AT('Visa, Mastercard, Apple Pay — QAR settlement.', 'فيزا وماستركارد و Apple Pay.'), true], ['credit-card', 'Dibsy', AT('Cards & Apple Pay, Qatar-licensed gateway.', 'بوابة مرخصة في قطر.'), false], ['smartphone', 'Apple Pay', AT('Requires domain verification.', 'يتطلب التحقق من النطاق.'), true]];
  return `<div class="grid gap-4 md:grid-cols-2">${gw.map(([ic, n, d, on]) => card(`<div class="flex items-start gap-4 p-5"><span class="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">${icon(ic)}</span><div class="flex-1"><b>${n}</b><p class="text-sm text-zinc-500">${d}</p>
    <div class="mt-3 flex gap-2 text-xs"><span class="rounded-md bg-zinc-100 px-2 py-1">QAR</span><span class="rounded-md bg-zinc-100 px-2 py-1">${AT('Keys in .env', 'المفاتيح في .env')}</span></div></div>${toggle(on)}</div>`)).join('')}</div>
  ${card(cardHead(AT('Recent transactions', 'أحدث المعاملات')) + table([AT('Order', 'الطلب'), AT('Method', 'الطريقة'), AT('Amount', 'المبلغ'), AT('Status', 'الحالة')], DEMO_ORDERS.map(o => `<tr>${td(`<b>${o.id}</b>`)}${td(o.pay.toUpperCase())}${td(qar(o.total))}${td(o.pay === 'cod' && o.status !== 'delivered' ? pill(AT('Awaiting collection', 'بانتظار التحصيل'), 'bg-amber-50 text-amber-700') : o.status === 'returned' ? pill(AT('Refunded', 'مسترد'), 'bg-zinc-100 text-zinc-600') : pill(AT('Paid', 'مدفوع'), 'bg-emerald-50 text-emerald-700'))}</tr>`).join('')), 'mt-6')}`;
}

function adReports() {
  const months = [['Jun', 182400, 71200], ['Jul', 196800, 79100], ['Aug', 214500, 86900], ['Sep', 238900, 98400], ['Oct', 287200, 117800]];
  const max = Math.max(...months.map(m => m[1]));
  return `<div class="grid gap-4 sm:grid-cols-3">${kpi('wallet', AT('Revenue (5 mo)', 'الإيرادات (5 أشهر)'), qar(months.reduce((a, m) => a + m[1], 0)), 21.4, 'bg-brand-50 text-brand-700')}${kpi('piggy-bank', AT('Net profit', 'صافي الربح'), qar(months.reduce((a, m) => a + m[2], 0)), 17.8, 'bg-emerald-50 text-emerald-700')}${kpi('percent', AT('Avg. margin', 'متوسط الهامش'), '40.6%', 2.1, 'bg-sky-50 text-sky-700')}</div>
  ${card(cardHead(AT('Monthly revenue vs profit', 'الإيرادات مقابل الربح شهرياً'), btn(AT('Export CSV', 'تصدير CSV'), 'download', "exportCSV('report')", 'outline')) + `<div class="flex h-64 items-end gap-6 p-6">${months.map(([m, r, p]) => `<div class="flex flex-1 flex-col items-center gap-2"><div class="flex h-48 w-full items-end justify-center gap-1.5"><div class="w-1/3 rounded-t-lg bg-brand-500" style="height:${r / max * 100}%" title="${qar(r)}"></div><div class="w-1/3 rounded-t-lg bg-emerald-400" style="height:${p / max * 100}%" title="${qar(p)}"></div></div><span class="text-xs text-zinc-500">${m}</span></div>`).join('')}</div>
    <div class="flex gap-5 px-6 pb-5 text-xs"><span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-sm bg-brand-500"></span>${AT('Revenue', 'الإيرادات')}</span><span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-sm bg-emerald-400"></span>${AT('Profit', 'الربح')}</span></div>`, 'mt-6')}`;
}

function adImport() {
  return `<div class="grid gap-6 lg:grid-cols-2">
    ${card(cardHead(AT('Import products', 'استيراد المنتجات')) + `<div class="p-5"><label class="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-zinc-200 p-10 text-center hover:border-brand-400">
      <span class="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">${icon('file-spreadsheet', 'w-7 h-7')}</span><b>${AT('Drop a CSV or Excel file', 'اسحب ملف CSV أو Excel')}</b><span class="text-sm text-zinc-500">${AT('Columns: name_en, name_ar, category, cost, price, stock, supplier_sku', 'الأعمدة: name_en, name_ar, category, cost, price, stock, supplier_sku')}</span>
      <input type="file" accept=".csv,.xlsx,.xls" class="hidden" onchange="previewImport(this.files[0])"></label>
      <div id="impPreview" class="mt-4"></div>
      <button onclick="downloadTemplate()" class="mt-3 text-sm font-semibold text-brand-700">${icon('download', 'w-4 h-4 inline me-1')}${AT('Download CSV template', 'تحميل قالب CSV')}</button></div>`)}
    ${card(cardHead(AT('Export data', 'تصدير البيانات')) + `<div class="space-y-3 p-5">${[['products', AT('Products & pricing', 'المنتجات والأسعار'), 'package'], ['orders', AT('Orders', 'الطلبات'), 'receipt-text'], ['customers', AT('Customers', 'العملاء'), 'users'], ['report', AT('Sales report', 'تقرير المبيعات'), 'chart-line']].map(([k, l, ic]) => `<div class="flex items-center gap-3 rounded-xl border border-zinc-100 p-3"><span class="text-brand-600">${icon(ic)}</span><span class="flex-1 text-sm font-medium">${l}</span>${btn('CSV', 'download', `exportCSV('${k}')`, 'outline')}</div>`).join('')}</div>`)}
  </div>`;
}
function previewImport(file) {
  if (!file) return;
  const out = document.getElementById('impPreview');
  if (!/\.csv$/i.test(file.name)) { out.innerHTML = `<p class="text-sm text-zinc-500">${esc(file.name)} — ${AT('Excel parsing will use SheetJS in the full build.', 'سيتم دعم Excel في النسخة الكاملة.')}</p>`; return; }
  const rd = new FileReader();
  rd.onload = () => {
    const rows = rd.result.trim().split(/\r?\n/).map(l => l.split(','));
    out.innerHTML = `<p class="mb-2 text-sm"><b>${rows.length - 1}</b> ${AT('rows detected', 'صف')}</p><div class="max-h-60 overflow-auto rounded-xl border text-xs"><table class="w-full">${rows.slice(0, 8).map((r, i) => `<tr class="${i ? '' : 'bg-zinc-50 font-semibold'}">${r.map(c => `<td class="border-b px-2 py-1.5">${esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>
      <button onclick="toast('${AT('Products imported as drafts', 'تم استيراد المنتجات كمسودات')}')" class="btn-primary mt-3 w-full">${AT('Import', 'استيراد')} ${rows.length - 1}</button>`;
  };
  rd.readAsText(file);
}
function downloadCSV(name, rows) {
  const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })); a.download = name; a.click(); URL.revokeObjectURL(a.href);
}
function downloadTemplate() { downloadCSV('dukkan-products-template.csv', [['name_en', 'name_ar', 'category', 'cost', 'price', 'stock', 'supplier_sku'], ['Sample product', 'منتج تجريبي', 'electronics', '50', '120', '25', 'SUP-01-0001']]); }
function exportCSV(kind) {
  const sets = {
    products: [['id', 'name_en', 'name_ar', 'category', 'supplier', 'cost_qar', 'price_qar', 'margin_pct', 'stock'], ...PRODUCTS.map(p => [p.id, p.name.en, p.name.ar, p.cat, p.supplier, p.cost, p.price, margin(p), p.stock])],
    orders: [['order', 'date', 'customer', 'phone', 'zone', 'total_qar', 'payment', 'status', 'supplier_ref', 'tracking'], ...DEMO_ORDERS.map(o => [o.id, o.date, o.customer, o.phone, o.zone, o.total, o.pay, o.status, o.supRef, o.tracking])],
    customers: [['name', 'phone', 'email', 'zone', 'orders', 'spent_qar', 'joined'], ...CUSTOMERS.map(c => [c.name, c.phone, c.email, c.zone, c.orders, c.spent, c.joined])],
    report: [['day', 'revenue_qar'], ...REV30.map((v, i) => [`2026-10-${String(i + 1).padStart(2, '0')}`, v])],
  };
  downloadCSV(`dukkan-${kind}-${new Date().toISOString().slice(0, 10)}.csv`, sets[kind]); toast(AT('Export downloaded', 'تم تنزيل الملف'));
}
