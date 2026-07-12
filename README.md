# MERIDIAN — web sajt

Statički sajt, spreman za hostovanje na GitHub Pages (ili bilo kom statičkom hostu).

## Stranice
- `index.html` — Početna
- `pristup.html` — Pristup
- `programi.html` — Programi
- `nauka.html` — Nauka
- `o-nama.html` — O nama
- `zakazivanje.html` — Zakazivanje
- `privatnost.html` — Politika privatnosti
- `uslovi.html` — Uslovi korišćenja

## Hostovanje na GitHub Pages
1. Napravi novi repozitorijum na GitHub-u i otpremi sav sadržaj ovog foldera u koren repozitorijuma (tako da `index.html` bude na vrhu).
2. Settings → Pages → Build and deployment → Source: **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)` → Save.
4. Za par minuta sajt je dostupan na `https://<korisnicko-ime>.github.io/<repo>/`.

## Napomene
- Sve slike i skripte su lokalne (folder `assets/` i `*.js`). Fontovi se učitavaju sa Google Fonts CDN-a (potreban internet).
- `.nojekyll` sprečava GitHub-ovu Jekyll obradu — ostavi ga u repozitorijumu.
