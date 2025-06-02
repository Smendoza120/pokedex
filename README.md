# Pokedex - Vue 3 + Vite

## Descripción

Este proyecto es una Pokedex la cual fue desarrollada con Vue 3, utilizando Vite como herramienta de build y despliegue en GitHub Pages. Permite explorar, buscar y compartir información de Pokémon, así como gestionar favoritos. El diseño está optimizado para dispositivos móviles y de escritorio.

---

## Tecnologías utilizadas

- **[Vue 3](https://vuejs.org/):** Framework para la construcción de interfaces de usuario.
- **[Vite](https://vitejs.dev/):** Herramienta de build rápida para proyectos frontend modernos.
- **[Vue Router](https://router.vuejs.org/):** Enrutador oficial para Vue.js.
- **[Pinia](https://pinia.vuejs.org/):** Store de estado global para Vue 3.
- **[Axios](https://axios-http.com/):** Cliente HTTP para consumir la API de Pokémon.
- **[PrimeIcons](https://www.primefaces.org/primeicons/):** Conjunto de iconos para UI.
- **[gh-pages](https://www.npmjs.com/package/gh-pages):** Utilidad para desplegar fácilmente en GitHub Pages.

---

## Arquitectura

### Arquitectura de Carpetas

- `/src`
  - `/components` — Componentes reutilizables (ej: `PokemonModal.vue`, `LoadingSpinner.vue`)
  - `/views` — Vistas principales de la app (ej: `HomeView.vue`, `WelcomeView.vue`)
  - `/router` — Configuración de rutas con Vue Router
  - `/stores` — Gestión de estado global con Pinia
  - `/assets` — Imágenes, íconos y estilos globales

### Arquitectura de Software

- **SPA (Single Page Application):**  
  La aplicación es una SPA, gestionando la navegación mediante Vue Router y evitando recargas completas de página.
- **Gestión de Estado Global:**  
  Se utiliza Pinia para manejar el estado global, como la lista de Pokémon, favoritos y el estado del modal.
- **Componentización:**  
  El diseño está basado en componentes reutilizables y desacoplados, siguiendo buenas prácticas de Vue.
- **Responsive Design:**  
  El CSS está optimizado para mobile-first, adaptándose a diferentes tamaños de pantalla mediante media queries y unidades dinámicas (`dvh`).

---

## Despliegue

- **GitHub Pages:**  
  El proyecto se despliega automáticamente en la rama `gh-pages` usando el paquete `gh-pages` y la configuración de Vite con `base: '/pokedex/'`.

---

## Scripts útiles

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}
```

---

## Instalación y uso

1. Instala dependencias:
   ```sh
   npm install
   ```
2. Corre en desarrollo:
   ```sh
   npm run dev
   ```
3. Genera el build de producción:
   ```sh
   npm run build
   ```
4. Despliega a GitHub Pages:
   ```sh
   npm run deploy
   ```

---

## Notas adicionales

- El router utiliza `createWebHashHistory` para compatibilidad con GitHub Pages.
- El diseño mobile-first asegura una experiencia óptima en dispositivos móviles.
- El proyecto sigue buenas prácticas de separación de responsabilidades y escalabilidad.

---
