# Dukkan.qa — UI design prototype

Clickable, bilingual (English / Arabic RTL) UI prototype for the Qatar dropshipping store.
Design only — no backend yet. Demo data lives in `js/data.js`; cart, wishlist, login and orders are mocked in the browser.

## Run

```bash
python -m http.server 5173 --directory design
```

Open http://localhost:5173

## Screens

Storefront: home, category/search listing with filters, product detail, cart drawer + cart, checkout (Qatar blue-plate address, COD / card / Apple Pay, coupons), order confirmation / invoice, order tracking, phone-OTP login, customer account (orders, addresses, wishlist, returns, profile, password), delivery & returns pages.

Admin (`#/admin`): dashboard, orders (status, supplier ref, tracking no.), products (cost / price / margin), categories CRUD, inventory, customers, suppliers, supplier catalogue import, purchase orders, coupons, banners, shipping zones, payment gateways, reports, CSV import/export.

Demo coupons: `WELCOME10`, `QATAR15`, `FREESHIP`. Demo order numbers: `DK-10482`, `DK-10479`.

## Next phase

Port to Next.js + Tailwind, Supabase (Postgres, Auth with phone OTP, Storage), Qatar payment gateway, keys in `.env`.
