# Linden

Un curs de engleză pentru vorbitori de română, ilustrat și cu sunet, pe o stradă englezească: Linden Lane.
Fiecare loc de pe stradă e o unitate, fiecare lecție e o scenă cu un vecin. Câte cinci minute pe zi.

**Deschide:** https://paleferndev.github.io/linden/

Se instalează ca o aplicație, fără App Store: pe iPhone, în Safari, *Partajează → Adaugă pe ecranul principal*;
pe PC, în Chrome sau Edge, iconița de instalare din bara de adrese. Merge și fără internet și se actualizează singură.
Progresul rămâne pe dispozitiv.

## Dezvoltare

```
npm install
npm run dev       # server local cu reîncărcare
npm test          # aspect pe telefon și PC, pornire offline, actualizare automată
npm run deploy    # testează, construiește și publică pe GitHub Pages
```

Aplicația veche, un singur fișier HTML fără sunet, e în `legacy/`, împreună cu testele ei.
