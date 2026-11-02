// Demo data for the UI prototype. Replaced by Supabase queries in the real build.
const IMG = (id, w = 800, extra = '') => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${w}&q=80${extra}`;

const CATEGORIES = [
  { slug: 'electronics', icon: 'monitor-smartphone', name: { en: 'Electronics & Gadgets', ar: 'الإلكترونيات والأجهزة' }, img: '1496181133206-80ce9b88a853', tint: 'from-violet-100 to-indigo-50' },
  { slug: 'mobile-accessories', icon: 'smartphone', name: { en: 'Mobile Accessories', ar: 'إكسسوارات الجوال' }, img: '1590658268037-6bf12165a8df', tint: 'from-sky-100 to-cyan-50' },
  { slug: 'home-kitchen', icon: 'cooking-pot', name: { en: 'Home & Kitchen', ar: 'المنزل والمطبخ' }, img: '1556909114-f6e7ad7d3136', tint: 'from-amber-100 to-orange-50' },
  { slug: 'furniture-decor', icon: 'sofa', name: { en: 'Furniture & Home Decor', ar: 'الأثاث وديكور المنزل' }, img: '1555041469-a586c61ea9bc', tint: 'from-stone-200 to-stone-50' },
  { slug: 'fashion', icon: 'shirt', name: { en: 'Fashion & Accessories', ar: 'الأزياء والإكسسوارات' }, img: '1445205170230-053b83016050', tint: 'from-rose-100 to-pink-50' },
  { slug: 'beauty', icon: 'sparkles', name: { en: 'Beauty & Personal Care', ar: 'الجمال والعناية الشخصية' }, img: '1556228578-8c89e6adf883', tint: 'from-fuchsia-100 to-pink-50' },
  { slug: 'sports', icon: 'dumbbell', name: { en: 'Sports & Fitness', ar: 'الرياضة واللياقة' }, img: '1517836357463-d25dfeac3438', tint: 'from-emerald-100 to-teal-50' },
  { slug: 'baby-kids', icon: 'baby', name: { en: 'Baby & Kids', ar: 'الأطفال والرضع' }, img: '1515488042361-ee00e0ddd4e4', tint: 'from-yellow-100 to-lime-50' },
  { slug: 'automotive', icon: 'car', name: { en: 'Automotive Accessories', ar: 'إكسسوارات السيارات' }, img: '1503376780353-7e6692767b70', tint: 'from-slate-200 to-slate-50' },
  { slug: 'smart-home', icon: 'house-wifi', name: { en: 'Smart Home Products', ar: 'منتجات المنزل الذكي' }, img: '1558002038-1055907df827', tint: 'from-indigo-100 to-violet-50' },
];

const SUPPLIERS = [
  { id: 'SUP-01', name: 'Shenzhen TechSource Ltd.', country: 'China', lead: '7–10', rating: 4.7, products: 214, api: true },
  { id: 'SUP-02', name: 'Gulf Home Wholesale', country: 'UAE', lead: '2–3', rating: 4.8, products: 96, api: true },
  { id: 'SUP-03', name: 'Anatolia Textiles Co.', country: 'Türkiye', lead: '5–7', rating: 4.5, products: 138, api: false },
  { id: 'SUP-04', name: 'Doha Local Fulfilment', country: 'Qatar', lead: '1', rating: 4.9, products: 57, api: true },
];

// tags: trending | best | new | deal | rec
const PRODUCTS = [
  { id: 1, slug: 'aurel-anc-headphones', cat: 'electronics', brand: 'Aurel', name: { en: 'Aurel Pro Wireless Noise-Cancelling Headphones', ar: 'سماعات أوريل برو اللاسلكية بخاصية إلغاء الضوضاء' }, price: 349, old: 499, cost: 165, rating: 4.8, reviews: 1284, stock: 42, img: '1505740420928-5e560c06d30e', tags: ['trending', 'best', 'deal'], colors: ['#111111', '#d4d4d8', '#1e3a8a'], supplier: 'SUP-01' },
  { id: 2, slug: 'nova-smartwatch-series-x', cat: 'electronics', brand: 'Nova', name: { en: 'Nova Smartwatch Series X — AMOLED, GPS', ar: 'ساعة نوفا الذكية سيريس إكس — شاشة AMOLED مع GPS' }, price: 899, old: 1099, cost: 430, rating: 4.7, reviews: 856, stock: 18, img: '1546868871-7041f2a55e12', tags: ['trending', 'new'], colors: ['#111111', '#f5f5f4'], sizes: ['41mm', '45mm'], supplier: 'SUP-01' },
  { id: 3, slug: 'volta-true-wireless-earbuds', cat: 'mobile-accessories', brand: 'Volta', name: { en: 'Volta Buds Air — True Wireless Earbuds', ar: 'سماعات فولتا بادز إير اللاسلكية' }, price: 199, old: 279, cost: 72, rating: 4.6, reviews: 2210, stock: 120, img: '1590658268037-6bf12165a8df', tags: ['best', 'deal', 'rec'], colors: ['#fafafa', '#111111'], supplier: 'SUP-01' },
  { id: 4, slug: 'volta-gan-fast-charger-65w', cat: 'mobile-accessories', brand: 'Volta', name: { en: 'Volta 65W GaN Fast Charger — 3 Ports', ar: 'شاحن فولتا السريع 65 واط GaN — ‏3 منافذ' }, price: 89, old: 129, cost: 31, rating: 4.7, reviews: 640, stock: 300, img: '1609091839311-d5365f9ff1c5', tags: ['best', 'rec'], supplier: 'SUP-04' },
  { id: 5, slug: 'lumen-ultrabook-14', cat: 'electronics', brand: 'Lumen', name: { en: 'Lumen Ultrabook 14" — 16GB RAM, 512GB SSD', ar: 'لابتوب لومن ألترابوك 14 بوصة — 16 جيجا رام و512 جيجا SSD' }, price: 3499, old: 3999, cost: 2650, rating: 4.8, reviews: 312, stock: 9, img: '1496181133206-80ce9b88a853', tags: ['trending', 'rec'], colors: ['#a1a1aa', '#27272a'], supplier: 'SUP-02' },
  { id: 6, slug: 'snapix-instant-camera', cat: 'electronics', brand: 'Snapix', name: { en: 'Snapix Retro Instant Camera', ar: 'كاميرا سنابكس الفورية بتصميم كلاسيكي' }, price: 449, cost: 210, rating: 4.5, reviews: 198, stock: 26, img: '1526170375885-4d8ecf77b99f', tags: ['new'], supplier: 'SUP-01' },
  { id: 7, slug: 'barista-espresso-machine', cat: 'home-kitchen', brand: 'Barista+', name: { en: 'Barista+ Espresso Machine with Milk Frother', ar: 'ماكينة إسبريسو باريستا+ مع مبخر الحليب' }, price: 699, old: 899, cost: 340, rating: 4.7, reviews: 421, stock: 15, img: '1495474472287-4d71bcdd2085', tags: ['best', 'deal'], supplier: 'SUP-02' },
  { id: 8, slug: 'cookmaster-cookware-set', cat: 'home-kitchen', brand: 'CookMaster', name: { en: 'CookMaster 10-Piece Non-Stick Cookware Set', ar: 'طقم أواني طهي كوك ماستر غير لاصق — 10 قطع' }, price: 459, old: 599, cost: 190, rating: 4.6, reviews: 377, stock: 34, img: '1556909114-f6e7ad7d3136', tags: ['deal', 'rec'], supplier: 'SUP-02' },
  { id: 9, slug: 'majlis-3-seat-sofa', cat: 'furniture-decor', brand: 'Majlis Living', name: { en: 'Majlis Living 3-Seater Velvet Sofa', ar: 'كنبة مجلس ليفنج المخملية — 3 مقاعد' }, price: 2199, old: 2799, cost: 1180, rating: 4.9, reviews: 88, stock: 6, img: '1555041469-a586c61ea9bc', tags: ['trending', 'new'], colors: ['#7c6f64', '#1f2937', '#a3a380'], supplier: 'SUP-02' },
  { id: 10, slug: 'halo-designer-table-lamp', cat: 'furniture-decor', brand: 'Halo', name: { en: 'Halo Designer Table Lamp', ar: 'مصباح طاولة هالو بتصميم عصري' }, price: 189, old: 249, cost: 64, rating: 4.6, reviews: 154, stock: 48, img: '1507473885765-e6ed057f782c', tags: ['new', 'rec'], supplier: 'SUP-03' },
  { id: 11, slug: 'nordic-living-decor-set', cat: 'furniture-decor', brand: 'Nordic', name: { en: 'Nordic Living Room Decor Set', ar: 'طقم ديكور غرفة المعيشة الاسكندنافي' }, price: 329, cost: 120, rating: 4.4, reviews: 61, stock: 22, img: '1586023492125-27b2c045efd7', tags: ['new'], supplier: 'SUP-03' },
  { id: 12, slug: 'heritage-leather-watch', cat: 'fashion', brand: 'Heritage', name: { en: 'Heritage Minimal Leather Watch', ar: 'ساعة هيريتج الجلدية بتصميم بسيط' }, price: 549, old: 690, cost: 180, rating: 4.7, reviews: 509, stock: 31, img: '1523275335684-37898b6baf30', tags: ['best', 'trending'], colors: ['#f5f5f4', '#111111'], supplier: 'SUP-03' },
  { id: 13, slug: 'solis-aviator-sunglasses', cat: 'fashion', brand: 'Solis', name: { en: 'Solis Polarised Aviator Sunglasses', ar: 'نظارة شمسية سوليس أفياتور مستقطبة' }, price: 299, old: 399, cost: 70, rating: 4.5, reviews: 733, stock: 64, img: '1572635196237-14b3f281503f', tags: ['deal', 'trending'], supplier: 'SUP-03' },
  { id: 14, slug: 'luna-leather-handbag', cat: 'fashion', brand: 'Luna', name: { en: 'Luna Structured Leather Handbag', ar: 'حقيبة يد لونا الجلدية' }, price: 649, old: 850, cost: 260, rating: 4.8, reviews: 245, stock: 12, img: '1584917865442-de89df76afd3', tags: ['new', 'best'], colors: ['#7f1d1d', '#111111', '#d6c7b0'], supplier: 'SUP-03' },
  { id: 15, slug: 'trekker-travel-backpack', cat: 'fashion', brand: 'Trekker', name: { en: 'Trekker Anti-Theft Travel Backpack', ar: 'حقيبة ظهر تريكر للسفر مضادة للسرقة' }, price: 259, cost: 95, rating: 4.6, reviews: 402, stock: 57, img: '1553062407-98eeb64c6a62', tags: ['rec'], supplier: 'SUP-01' },
  { id: 16, slug: 'stride-running-sneakers', cat: 'sports', brand: 'Stride', name: { en: 'Stride Flex Running Sneakers', ar: 'حذاء سترايد فليكس للجري' }, price: 379, old: 459, cost: 150, rating: 4.7, reviews: 1120, stock: 40, img: '1542291026-7eec264c27ff', tags: ['trending', 'best'], sizes: ['40', '41', '42', '43', '44', '45'], colors: ['#dc2626', '#111111'], supplier: 'SUP-01' },
  { id: 17, slug: 'zen-pro-yoga-mat', cat: 'sports', brand: 'Zen', name: { en: 'Zen Pro Non-Slip Yoga Mat 6mm', ar: 'سجادة يوغا زن برو مانعة للانزلاق 6 مم' }, price: 129, old: 169, cost: 38, rating: 4.6, reviews: 318, stock: 85, img: '1544367567-0f2fcb009e0b', tags: ['deal'], colors: ['#7c3aed', '#0f766e', '#111111'], supplier: 'SUP-04' },
  { id: 18, slug: 'ironcore-adjustable-dumbbells', cat: 'sports', brand: 'IronCore', name: { en: 'IronCore Adjustable Dumbbells 2×24kg', ar: 'دمبل آيرون كور القابل للتعديل 2×24 كجم' }, price: 599, old: 749, cost: 310, rating: 4.8, reviews: 207, stock: 11, img: '1517836357463-d25dfeac3438', tags: ['best', 'rec'], supplier: 'SUP-02' },
  { id: 19, slug: 'oud-royale-perfume', cat: 'beauty', brand: 'Oud Royale', name: { en: 'Oud Royale Eau de Parfum 100ml', ar: 'عطر عود رويال أو دو بارفان 100 مل' }, price: 420, old: 520, cost: 140, rating: 4.9, reviews: 964, stock: 50, img: '1541643600914-78b084683601', tags: ['best', 'trending', 'deal'], supplier: 'SUP-04' },
  { id: 20, slug: 'glow-skincare-ritual-set', cat: 'beauty', brand: 'Glow Lab', name: { en: 'Glow Lab Daily Skincare Ritual Set', ar: 'مجموعة جلو لاب للعناية اليومية بالبشرة' }, price: 239, old: 299, cost: 82, rating: 4.7, reviews: 588, stock: 73, img: '1556228578-8c89e6adf883', tags: ['new', 'rec'], supplier: 'SUP-02' },
  { id: 21, slug: 'velvet-makeup-palette', cat: 'beauty', brand: 'Velvet', name: { en: 'Velvet Pro Makeup Essentials Kit', ar: 'مجموعة فيلفت برو الأساسية للمكياج' }, price: 149, cost: 48, rating: 4.4, reviews: 233, stock: 0, img: '1522335789203-aabd1fc54bc9', tags: ['new'], supplier: 'SUP-02' },
  { id: 22, slug: 'cuddle-baby-care-bundle', cat: 'baby-kids', brand: 'Cuddle', name: { en: 'Cuddle Organic Baby Care Bundle', ar: 'مجموعة كادل العضوية للعناية بالرضع' }, price: 189, old: 229, cost: 70, rating: 4.8, reviews: 176, stock: 39, img: '1515488042361-ee00e0ddd4e4', tags: ['rec', 'deal'], supplier: 'SUP-04' },
  { id: 23, slug: 'roadeye-4k-dash-cam', cat: 'automotive', brand: 'RoadEye', name: { en: 'RoadEye 4K Dash Cam with Night Vision', ar: 'كاميرا السيارة رود آي 4K مع رؤية ليلية' }, price: 319, old: 399, cost: 120, rating: 4.6, reviews: 289, stock: 27, img: '1503376780353-7e6692767b70', tags: ['trending', 'deal'], supplier: 'SUP-01' },
  { id: 24, slug: 'echo-smart-speaker', cat: 'smart-home', brand: 'Echoes', name: { en: 'Echoes Smart Speaker with Voice Assistant', ar: 'مكبر صوت إيكوز الذكي مع مساعد صوتي' }, price: 349, old: 429, cost: 150, rating: 4.5, reviews: 412, stock: 33, img: '1543512214-318c7553f230', tags: ['new', 'rec'], colors: ['#27272a', '#e7e5e4'], supplier: 'SUP-01' },
  { id: 25, slug: 'hive-smart-home-starter-kit', cat: 'smart-home', brand: 'Hive+', name: { en: 'Hive+ Smart Home Starter Kit (Hub + 4 Bulbs)', ar: 'مجموعة هايف+ للمنزل الذكي (موزع + 4 مصابيح)' }, price: 499, old: 649, cost: 205, rating: 4.7, reviews: 143, stock: 19, img: '1558002038-1055907df827', tags: ['trending', 'deal'], supplier: 'SUP-01' },
  { id: 26, slug: 'pulse-5g-smartphone', cat: 'mobile-accessories', brand: 'Pulse', name: { en: 'Pulse X 5G Smartphone 256GB', ar: 'هاتف بلس إكس 5G سعة 256 جيجا' }, price: 2299, old: 2599, cost: 1720, rating: 4.6, reviews: 530, stock: 14, img: '1511707171634-5f897ff02aa9', tags: ['new', 'trending'], colors: ['#111111', '#e5e7eb', '#6d28d9'], supplier: 'SUP-02' },
];

const HERO_SLIDES = [
  { id: 'wf', img: '1607082348824-0a96f2a4b9da', bg: 'from-[#1e0b3b] via-[#3b0f7a] to-[#6d28d9]', kicker: { en: 'White Friday · Up to 70% off', ar: 'الجمعة البيضاء · خصومات حتى 70%' }, title: { en: 'The biggest sale of the year is here', ar: 'أكبر تخفيضات السنة بدأت الآن' }, sub: { en: 'Thousands of deals on electronics, fashion, home and more — delivered across Qatar.', ar: 'آلاف العروض على الإلكترونيات والأزياء والمنزل — توصيل لجميع مناطق قطر.' }, cta: { en: 'Shop the deals', ar: 'تسوّق العروض' }, href: '#/deals' },
  { id: 'nd', img: '1586023492125-27b2c045efd7', bg: 'from-[#4a0d1f] via-[#7a1530] to-[#8a1538]', kicker: { en: 'Qatar National Day · 18 December', ar: 'اليوم الوطني لقطر · 18 ديسمبر' }, title: { en: 'Celebrate in style with the Maroon Collection', ar: 'احتفل بأناقة مع المجموعة العنابية' }, sub: { en: 'Home décor, fashion and gifts inspired by Qatar.', ar: 'ديكور وأزياء وهدايا مستوحاة من قطر.' }, cta: { en: 'Explore collection', ar: 'اكتشف المجموعة' }, href: '#/c/furniture-decor' },
  { id: 'sd', img: '1505740420928-5e560c06d30e', bg: 'from-[#0b1324] via-[#1e1b4b] to-[#4338ca]', kicker: { en: 'Same-day delivery in Doha', ar: 'توصيل في نفس اليوم داخل الدوحة' }, title: { en: 'Order by 2 PM, get it tonight', ar: 'اطلب قبل الساعة 2 ظهراً واستلم الليلة' }, sub: { en: 'Free delivery on orders over QAR 99. Cash on Delivery available.', ar: 'توصيل مجاني للطلبات فوق 99 ر.ق. الدفع عند الاستلام متاح.' }, cta: { en: 'Shop electronics', ar: 'تسوّق الإلكترونيات' }, href: '#/c/electronics' },
];

const REVIEWS = [
  { name: 'Fatima Al-Kuwari', city: { en: 'Al Wakrah', ar: 'الوكرة' }, rating: 5, text: { en: 'Ordered at noon and the headphones arrived the same evening in Al Wakrah. Paid cash on delivery — super easy.', ar: 'طلبت الظهر ووصلت السماعات في نفس المساء إلى الوكرة. دفعت عند الاستلام — سهل جداً.' }, product: 1 },
  { name: 'Ahmed Rahman', city: { en: 'Lusail', ar: 'لوسيل' }, rating: 5, text: { en: 'Great prices compared to the malls. The sofa quality is excellent and the delivery team assembled it for me.', ar: 'أسعار ممتازة مقارنة بالمولات. جودة الكنبة رائعة وفريق التوصيل قام بتركيبها.' }, product: 9 },
  { name: 'Maryam Hassan', city: { en: 'Doha', ar: 'الدوحة' }, rating: 4, text: { en: 'Love the Arabic interface and WhatsApp updates. I always know where my order is.', ar: 'أحب الواجهة العربية وتحديثات واتساب. دائماً أعرف أين وصل طلبي.' }, product: 19 },
  { name: 'Joseph Mathew', city: { en: 'Al Rayyan', ar: 'الريان' }, rating: 5, text: { en: 'Return was hassle-free — the courier picked it up from my building and refund came in 3 days.', ar: 'الإرجاع كان سهلاً — المندوب استلمه من البناية واسترجعت المبلغ خلال 3 أيام.' }, product: 16 },
];

const MUNICIPALITIES = [
  { id: 'doha', en: 'Doha', ar: 'الدوحة', fee: 0, eta: [0, 1] },
  { id: 'rayyan', en: 'Al Rayyan', ar: 'الريان', fee: 0, eta: [1, 1] },
  { id: 'lusail', en: 'Lusail', ar: 'لوسيل', fee: 0, eta: [1, 1] },
  { id: 'wakrah', en: 'Al Wakrah', ar: 'الوكرة', fee: 10, eta: [1, 2] },
  { id: 'daayen', en: 'Al Daayen', ar: 'الضعاين', fee: 10, eta: [1, 2] },
  { id: 'ummsalal', en: 'Umm Salal', ar: 'أم صلال', fee: 10, eta: [1, 2] },
  { id: 'khor', en: 'Al Khor & Al Thakhira', ar: 'الخور والذخيرة', fee: 20, eta: [2, 3] },
  { id: 'shamal', en: 'Al Shamal', ar: 'الشمال', fee: 25, eta: [2, 4] },
  { id: 'shahaniya', en: 'Al Shahaniya', ar: 'الشحانية', fee: 25, eta: [2, 4] },
  { id: 'mesaieed', en: 'Mesaieed', ar: 'مسيعيد', fee: 20, eta: [2, 3] },
];

const COUPONS = [
  { code: 'WELCOME10', type: 'pct', value: 10, min: 0, uses: 1240, limit: 5000, active: true, expires: '2026-12-31' },
  { code: 'QATAR15', type: 'pct', value: 15, min: 300, uses: 388, limit: 1000, active: true, expires: '2026-12-18' },
  { code: 'FREESHIP', type: 'ship', value: 0, min: 0, uses: 902, limit: 0, active: true, expires: '2026-11-30' },
  { code: 'WF50', type: 'fixed', value: 50, min: 400, uses: 75, limit: 500, active: false, expires: '2026-11-29' },
];

const ORDER_STATUSES = ['pending', 'confirmed', 'ordered_supplier', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'];

const DEMO_ORDERS = [
  { id: 'DK-10482', date: '2026-11-02', customer: 'Fatima Al-Kuwari', phone: '+974 5512 3344', zone: 'wakrah', items: [[1, 1], [4, 2]], total: 527, pay: 'cod', status: 'out_for_delivery', supRef: 'STS-88421', tracking: 'QP-2207781' },
  { id: 'DK-10481', date: '2026-11-02', customer: 'Ahmed Rahman', phone: '+974 6677 1020', zone: 'lusail', items: [[9, 1]], total: 2199, pay: 'card', status: 'ordered_supplier', supRef: 'GHW-5521', tracking: '' },
  { id: 'DK-10480', date: '2026-11-01', customer: 'Maryam Hassan', phone: '+974 3300 4512', zone: 'doha', items: [[19, 1], [20, 1]], total: 659, pay: 'card', status: 'delivered', supRef: 'DLF-1204', tracking: 'DLF-990112' },
  { id: 'DK-10479', date: '2026-11-01', customer: 'Joseph Mathew', phone: '+974 7012 8890', zone: 'rayyan', items: [[16, 1]], total: 379, pay: 'cod', status: 'shipped', supRef: 'STS-88390', tracking: 'AR-55102931' },
  { id: 'DK-10478', date: '2026-10-31', customer: 'Noora Al-Thani', phone: '+974 5590 1177', zone: 'doha', items: [[2, 1]], total: 899, pay: 'apple', status: 'confirmed', supRef: '', tracking: '' },
  { id: 'DK-10477', date: '2026-10-31', customer: 'Rashid Khan', phone: '+974 3345 6789', zone: 'khor', items: [[18, 1], [17, 1]], total: 748, pay: 'cod', status: 'pending', supRef: '', tracking: '' },
  { id: 'DK-10476', date: '2026-10-30', customer: 'Sara Ibrahim', phone: '+974 6612 0045', zone: 'daayen', items: [[14, 1]], total: 659, pay: 'card', status: 'returned', supRef: 'ATC-3301', tracking: 'AR-55100012' },
];

const CUSTOMERS = [
  { name: 'Fatima Al-Kuwari', phone: '+974 5512 3344', email: 'fatima.k@example.qa', orders: 12, spent: 4820, zone: 'wakrah', joined: '2025-03-14' },
  { name: 'Ahmed Rahman', phone: '+974 6677 1020', email: 'ahmed.r@example.qa', orders: 4, spent: 3910, zone: 'lusail', joined: '2025-08-02' },
  { name: 'Maryam Hassan', phone: '+974 3300 4512', email: 'maryam.h@example.qa', orders: 9, spent: 2765, zone: 'doha', joined: '2024-12-21' },
  { name: 'Joseph Mathew', phone: '+974 7012 8890', email: 'joseph.m@example.qa', orders: 6, spent: 1980, zone: 'rayyan', joined: '2025-05-30' },
  { name: 'Noora Al-Thani', phone: '+974 5590 1177', email: 'noora.t@example.qa', orders: 15, spent: 9240, zone: 'doha', joined: '2024-09-10' },
  { name: 'Rashid Khan', phone: '+974 3345 6789', email: 'rashid.k@example.qa', orders: 2, spent: 748, zone: 'khor', joined: '2026-10-29' },
];

const PURCHASE_ORDERS = [
  { id: 'PO-3108', supplier: 'SUP-01', date: '2026-11-02', items: 6, cost: 1420, status: 'sent', orders: ['DK-10482', 'DK-10479'] },
  { id: 'PO-3107', supplier: 'SUP-02', date: '2026-11-01', items: 1, cost: 1180, status: 'confirmed', orders: ['DK-10481'] },
  { id: 'PO-3106', supplier: 'SUP-04', date: '2026-11-01', items: 2, cost: 222, status: 'received', orders: ['DK-10480'] },
  { id: 'PO-3105', supplier: 'SUP-03', date: '2026-10-30', items: 1, cost: 260, status: 'received', orders: ['DK-10476'] },
];
