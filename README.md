# Portafolio - Angel Ontiveros

Portafolio estático construido con Astro y TailwindCSS, basado en la plantilla `astro-aria`.

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Despliegue

El sitio está configurado para GitHub Pages:

- `site`: `https://angellontiveros.github.io`
- `base`: raíz del sitio (no se usa `base` en `astro.config.mjs`)
- Workflow: `.github/workflows/deploy.yml`

Si el repositorio final cambia de nombre y se despliega como sitio de proyecto, agrega el `base` correcto en `astro.config.mjs`.
