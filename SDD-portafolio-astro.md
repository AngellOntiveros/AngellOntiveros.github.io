# SDD — Portafolio Personal (Astro + astro-aria)
**Autor:** Angel Ontiveros
**Repo plantilla base:** https://github.com/miantiao-me/astro-aria
**Repo destino:** github.com/AngellOntiveros/<nombre-del-repo> (GitHub Pages)
**Fecha:** 2026-07-01

---

## 1. Objetivo

Adaptar la plantilla Astro `astro-aria` para construir el portafolio personal de Angel Ontiveros,
Ingeniero Mecatrónico especializado en Full-Stack, DevOps, IA Industrial y Pentesting, y desplegarlo
en **GitHub Pages**.

El resultado debe reflejar tres pilares:
1. Proyectos **reales** ya construidos (Palnorte, Kyra, RNA Conteo Vagonetas) y en curso (PalmaSmart Backend).
2. Espacio para **imágenes/evidencia** de ese trabajo (capturas, diagramas, demos).
3. Espacio para **proyectos futuros** (roadmap) y **stack tecnológico ampliable**.

Este es un portafolio de **proyectos**, no una hoja de vida — no debe incluir experiencia laboral,
educación formal ni historial de empleos. El foco es 100% en lo construido.

---

## 2. Stack técnico de la plantilla (ya presente, no reinventar)

- Astro 5 + TailwindCSS + Biome (lint/format)
- Colecciones de contenido en JSON: `src/collections/{menu,experiences,projects}.json`
- Colección de blog en Markdown: `src/content/post/*.md`
- Páginas: `src/pages/{index,about,projects,posts}.astro` + `post/[slug].astro`
- Componentes reutilizables en `src/components/`
- Imágenes estáticas en `public/assets/images/`

**No se debe reescribir la plantilla desde cero.** El trabajo es de personalización de contenido,
extensión de esquema donde haga falta, y configuración de despliegue.

---

## 3. Tareas para Claude Code

### 3.1 Setup inicial
- [ ] Clonar `https://github.com/miantiao-me/astro-aria` como base (o usar `npm create astro@latest -- --template ccbikai/astro-aria`).
- [ ] Renombrar el proyecto / actualizar `package.json` (`name`, `description`, `author`).
- [ ] `pnpm install` (o `npm install`) y validar que `pnpm dev` levante sin errores antes de tocar nada.

### 3.2 Configuración para GitHub Pages
- [ ] Editar `astro.config.mjs`:
  - `site: "https://angellontiveros.github.io"`
  - `base: "/<nombre-del-repo>"` (omitir `base` solo si el repo se llama `AngellOntiveros.github.io`, es decir, un *user site*).
- [ ] Crear `.github/workflows/deploy.yml` con el Action oficial `withastro/action` para build + deploy a GitHub Pages (trigger en push a `main`).
- [ ] Confirmar en la config del repo (Settings → Pages) que la fuente sea "GitHub Actions".
- [ ] Ajustar `public/robots.txt` y añadir `sitemap` si se desea (opcional, integración `@astrojs/sitemap`).

### 3.3 Identidad y home (`src/pages/index.astro`)
Reemplazar el contenido genérico ("Hello, I'm Kai...") por:
- Nombre: **Angel Ontiveros**
- Rol/tagline: *Ingeniero Mecatrónico · Full-Stack · DevOps · IA Industrial · Pentester*
- Bio corta: transformación digital de procesos industriales — automatización, sistemas embebidos e IA, con soluciones en producción real (edge computing en planta + agentes conversacionales con IA).
- Lista "I can help you out with": Full-Stack Dev, DevOps, IoT Engineer, Ethical Hacker (ajustar viñetas según `README.md` fuente).
- Botón CTA: enlazar a LinkedIn (`linkedin.com/in/angel-ontiveros` — confirmar slug exacto) en vez de al X/Twitter genérico de la plantilla.
- Imagen `public/assets/images/photo.png`: usar la foto profesional (headshot circular) que ya aparece en la hoja de vida (`Black_and_White_Simple_Modern_Sales_Representative_Resume.pdf`). Extraer esa imagen en la mejor resolución disponible; si la calidad es baja para full-size, pedir a Angel el archivo original de la foto.

### 3.4 Sección "About" (`src/pages/about.astro`)
- Heading/descripción (bio corta, tomada del CV, adaptada a tono portafolio):
  > "Ingeniero Mecatrónico enfocado en automatización industrial, desarrollo de software e IIoT.
  > Construyo sistemas de visión artificial, integro protocolos industriales (OPC-UA, MQTT) y
  > plataformas web de monitoreo en planta. Busco entornos donde la tecnología resuelva problemas
  > operativos concretos."
- Imagen `about.jpg`: foto profesional del CV (headshot).
- **Eliminar el bloque de "Experience" (`experiences.json`) por completo.** Quitar también su import
  y renderizado en `about.astro`, y el componente `about-experience.astro` si no se reutiliza en
  ningún otro lado. Este portafolio no muestra historial laboral, solo proyectos.
- **No agregar sección de Educación.** Universidad, certificaciones, bachillerato: fuera de alcance
  de este sitio (eso vive en el CV/LinkedIn, no en el portafolio).
- Sección "Let's Connect": actualizar links reales:
  - Email: `angello3711@outlook.com`
  - Teléfono/WhatsApp: `322 414 8208` (confirmado público — aparece impreso en el CV)
  - LinkedIn: perfil "Angel Ontiveros" (confirmar slug exacto de la URL antes de codificarlo)
  - GitHub: `https://github.com/AngellOntiveros`
  - Eliminar el link a X/Twitter de la plantilla (`0xKaibi`).

### 3.5 Proyectos (`src/collections/projects.json` + `src/pages/projects.astro`)

**Extender el schema actual** (`name`, `description`, `image`, `url`) agregando dos campos nuevos:
- `status`: `"live"` | `"in-progress"` | `"planned"`
- `tech`: array de strings (badges de tecnología por proyecto)

Actualizar el componente `src/components/project.astro` para:
- Renderizar un badge de estado (verde = live, amarillo = in-progress, gris/punteado = planned).
- Renderizar los badges de `tech` debajo de la descripción.

**Contenido inicial de `projects.json`** (reemplazar el de la plantilla):

```json
[
  {
    "name": "Sistema de Control Palnorte — Industry 4.0",
    "description": "Dashboard de monitoreo de producción en tiempo real para planta extractora de aceite de palma. Arquitectura SOA, edge computing con Raspberry Pi, auth JWT+RBAC.",
    "image": "/assets/images/projects/palnorte-dashboard.png",
    "url": "",
    "status": "live",
    "tech": ["FastAPI", "MySQL", "Docker", "Nginx", "WireGuard", "Redis", "Bootstrap 5", "Raspberry Pi"]
  },
  {
    "name": "Kyra — Agente de Voz IA por WhatsApp",
    "description": "Asistente conversacional multi-agente conectado a BD productiva. Responde consultas de planta en lenguaje natural con voz (TTS Nova).",
    "image": "/assets/images/projects/kyra-whatsapp.png",
    "url": "",
    "status": "live",
    "tech": ["OpenAI GPT-4", "TTS Nova", "n8n", "Evolution API", "Redis", "MySQL", "WhatsApp"]
  },
  {
    "name": "RNA Conteo Vagonetas — YOLOv8 + Tracking",
    "description": "Módulo de visión artificial para validación automática de conteo manual (proyecto de tesis). Línea virtual de cruce, detección direccional ENTRY/EXIT, stream RTSP. Elevó la precisión del conteo del 63% al 85% frente al estándar global.",
    "image": "/assets/images/projects/yolo-conteo.png",
    "url": "",
    "status": "live",
    "tech": ["YOLOv8", "BoT-SORT", "RTSP", "FastAPI", "SSE", "Python", "MySQL"]
  },
  {
    "name": "PalmaSmart Backend",
    "description": "Plataforma SaaS para gestión integral de cultivos de palma de aceite, desarrollada para CYPAG S.A.S (Norte de Santander). Digitaliza trazabilidad de fruto FFB, monitoreo agronómico vía CyberTracker, programación de tareas agrícolas y reportes de sostenibilidad RSPO — reemplazando flujos manuales en papel/hojas de cálculo.",
    "image": "/assets/images/projects/palmasmart-backend.png",
    "url": "",
    "status": "in-progress",
    "tech": ["FastAPI", "Python", "MySQL"]
  },
  {
    "name": "Próximo proyecto (placeholder)",
    "description": "Describir aquí el siguiente proyecto en el roadmap.",
    "image": "/assets/images/projects/placeholder-future.png",
    "url": "",
    "status": "planned",
    "tech": []
  }
]
```

> Nota: los repos de Palnorte, Kyra y PalmaSmart son privados por confidencialidad del cliente. Dejar `url: ""`
> o enlazar a una página de detalle interna (`/projects/palnorte`) en vez de a GitHub, si se desea
> profundidad narrativa por proyecto (ver 3.7, opcional).

### 3.6 Stack técnico (nueva sección/componente)
Crear un componente `src/components/tech-stack.astro` que agrupe badges por categoría, e insertarlo
en `about.astro` (o en una nueva página `/stack`). Categorías y contenido inicial (fusionando el
`README.md` de GitHub con el CV — **ya no incluye HTML5; se agrega C++**):

- **Programación:** Python, C++, JavaScript, SQL (MySQL/PostgreSQL), Bash
- **IA & Machine Learning:** PyTorch, LangChain, OpenAI, YOLOv8
- **Web & Backend:** FastAPI, Django, MySQL, PostgreSQL
- **Sistemas Embebidos:** Raspberry Pi, ESP32, Arduino
- **Herramientas:** Git, GitHub, Linux, Autodesk Inventor
- **Seguridad:** Kali Linux, JWT/RBAC, Scapy, Pentesting

Dejar el array de categorías en un JSON (`src/collections/stack.json`) en vez de hardcodear, para que
sea fácil añadir nuevas tecnologías a futuro sin tocar el componente.

### 3.6b Infraestructura & Redes (sección nueva, aparte de "Stack técnico")
Angel tiene un perfil de redes/infraestructura lo bastante fuerte como para merecer su propio bloque,
en vez de mezclarse como badges sueltos. Crear una sección independiente (puede ser parte de
`about.astro` bajo un heading propio, o su propia página `/infraestructura`) con esta estructura:

- **Certificación:** Técnico en Redes — CCNA (Introducción a redes / Switching, Routing), Cisco NetAcad (2026).
- **VPN & Acceso remoto:** WireGuard, OpenVPN, Tailscale.
- **Firewall / Routing:** pfSense.
- **Protocolos industriales:** MQTT, OPC-UA, TCP/IP.
- **Broker de mensajería:** EMQX.
- **Base de datos de series de tiempo:** InfluxDB.

Usar el mismo patrón de componente por categoría que en 3.6 (reutilizar `tech-stack.astro` con una
prop de "sección" distinta, o duplicar el componente como `infra-network.astro` si el diseño visual
debe diferenciarse — por ejemplo con un ícono de red en vez de badges de código).

### 3.7 (Opcional, si hay tiempo) Página de detalle por proyecto
Convertir `projects` en una content collection Markdown (como `post`) en vez de JSON estático, para
poder escribir una página larga por proyecto (contexto, arquitectura, capturas, retos técnicos,
resultados) — especialmente útil para Palnorte y Kyra, que tienen suficiente profundidad técnica.
Esto es una mejora, no bloqueante para el MVP.

### 3.8 Blog (`src/content/post/`)
- Eliminar todos los posts de ejemplo de la plantilla (son del autor original, sin relación con Angel).
- Dejar la colección vacía o con 1 post de bienvenida ("Sobre este portafolio") — a decisión de Angel.
- Si no se va a usar blog por ahora, quitar "Posts" de `src/collections/menu.json` para no mostrar una sección vacía.

### 3.9 Menú (`src/collections/menu.json`)
Confirmar/ajustar orden final, ejemplo:
```json
[
  { "name": "Home", "url": "/" },
  { "name": "Projects", "url": "/projects" },
  { "name": "About", "url": "/about" }
]
```
> "Stack" e "Infraestructura & Redes" se muestran dentro de `/about` como sub-secciones (ver 3.6 y
> 3.6b), no como items de menú aparte, para no saturar la navegación. Si en el futuro cada uno
> crece mucho, se pueden separar en páginas propias y agregarlas aquí.

### 3.10 Metadatos / SEO
- Actualizar `<title>` por defecto y meta description en `Layout` (`src/layouts/main.astro`) con el
  nombre y tagline de Angel.
- Reemplazar `public/favicon.ico` por uno propio (o generar uno simple con las iniciales "AO").
- Revisar imagen Open Graph (`public/assets/images/cover.png` o similar) — reemplazar por una propia.

### 3.11 Validación final
- [ ] `pnpm build` sin errores ni warnings de TypeScript/Astro.
- [ ] `pnpm preview` — revisar visualmente Home, About, Projects, Stack en desktop y mobile.
- [ ] Verificar que todos los links (`mailto:`, LinkedIn, GitHub, WhatsApp) abran correctamente.
- [ ] Verificar que el sitio cargue bien con el `base` path configurado (probar rutas relativas de imágenes).
- [ ] Push a `main` → confirmar que el GitHub Action de deploy corre y el sitio queda accesible.

---

## 4. Fuente de verdad del contenido

Todo el copy (bio, proyectos, stack, contacto, experiencia, educación) debe basarse en dos fuentes,
en este orden de prioridad si hay conflicto:
1. **Hoja de vida** `Black_and_White_Simple_Modern_Sales_Representative_Resume.pdf` — experiencia
   laboral, educación, foto profesional, contacto, skills base.
2. **README.md** de perfil de GitHub — detalle técnico ampliado de cada proyecto (arquitectura,
   stack específico, métricas).

Datos de infraestructura/redes (VPN, pfSense, protocolos industriales, EMQX, InfluxDB) y el proyecto
PalmaSmart Backend fueron confirmados directamente por Angel en esta conversación y deben tratarse
con el mismo nivel de verdad que las dos fuentes anteriores.

Si Claude Code necesita un dato que no está en ninguna fuente (ej. slug exacto de la URL de LinkedIn,
capturas de pantalla de los proyectos), debe **detenerse y preguntar**, no inventar datos de contacto
ni proyectos.

---

## 5. Fuera de alcance (no hacer)

- No incluir experiencia laboral, historial de empleos ni educación formal — este es un portafolio de proyectos, esas secciones pertenecen al CV/LinkedIn, no al sitio.
- No migrar a otro framework ni cambiar el sistema de estilos (se mantiene Tailwind).
- No implementar CMS externo ni backend propio — el sitio es 100% estático.
- No inventar métricas, clientes o resultados no confirmados por Angel.
- No publicar los datos de contacto de las referencias del CV (Ing. Enrique Hernández, Ing. Edison Bastidas) en el sitio público sin su consentimiento explícito — quedan fuera del portafolio web.

---

## 6. Assets pendientes (Angel debe proporcionarlos antes o durante el desarrollo)

| Asset | Ruta destino | Estado |
|---|---|---|
| Foto/avatar personal | `public/assets/images/photo.png` | ✅ Resuelto — extraer del CV (headshot circular). Si se ve pixelada al agrandar, pedir el archivo original. |
| Foto para About | `public/assets/images/about.jpg` | ✅ Misma foto del CV, o variante horizontal si Angel la tiene |
| Captura dashboard Palnorte | `public/assets/images/projects/palnorte-dashboard.png` | ⏳ Pendiente — screenshot real o mockup si es confidencial |
| Captura/demo Kyra (WhatsApp) | `public/assets/images/projects/kyra-whatsapp.png` | ⏳ Pendiente — anonimizar datos de planta |
| Captura YOLOv8 / tracking | `public/assets/images/projects/yolo-conteo.png` | ⏳ Pendiente — frame con bounding boxes |
| Captura PalmaSmart Backend | `public/assets/images/projects/palmasmart-backend.png` | ⏳ Pendiente — screenshot de API docs (Swagger) o mockup si aún no hay UI |
| Favicon | `public/favicon.ico` | ⏳ Pendiente — iniciales "AO" o logo personal |
| Imagen Open Graph | `public/assets/images/cover.png` | ⏳ Pendiente |
| LinkedIn — slug exacto de URL | — | ⏳ Pendiente (solo se confirmó el nombre "Angel Ontiveros") |
| Teléfono público | — | ✅ Confirmado público (aparece impreso en el CV) |

**Mientras no existan estos assets**, Claude Code debe usar placeholders claramente identificables
(ej. un rectángulo gris con texto "Imagen pendiente: palnorte-dashboard.png") en vez de dejar rutas
rotas o usar imágenes de stock no autorizadas.

---

## 7. Criterios de aceptación (Definition of Done)

1. `pnpm build` compila sin errores.
2. Home, About y Projects muestran contenido real de Angel (cero texto placeholder de la plantilla original: "Kai", "Nanjing", "0xKaibi", etc.).
3. Los 3 proyectos `live` (Palnorte, Kyra, YOLOv8) y el proyecto `in-progress` (PalmaSmart Backend) aparecen con descripción, tech badges y estado correcto.
4. Existe al menos un proyecto marcado `planned` como espacio de roadmap.
5. Existe la sección "Infraestructura & Redes" con VPN (WireGuard/OpenVPN/Tailscale), pfSense, MQTT/OPC-UA, EMQX e InfluxDB, separada visualmente del "Stack técnico" general.
6. El listado de lenguajes de programación es Python, C++, JavaScript, SQL, Bash (sin HTML5).
7. **No aparece ninguna sección de experiencia laboral, educación ni historial de empleos en ninguna página.**
8. El sitio despliega correctamente en GitHub Pages vía GitHub Actions.
9. No quedan enlaces rotos ni referencias a redes sociales del autor original de la plantilla.
