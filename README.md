# Event Invitations Platform

🎉 Una plataforma completa para crear invitaciones personalizadas para eventos

## Características Principales

✨ **Crear Eventos Únicos**
- Cada evento recibe un ID único
- Información completa: título, descripción, fecha, ubicación
- Temas predefinidos (elegante, moderno, lúdico, minimalista)

📋 **Sistema de Plantillas Flexible**
- Plantillas predefinidas para diferentes secciones:
  - 👋 Saludo inicial
  - 🕐 Fecha y hora
  - 📍 Ubicación
  - 👔 Código de vestimenta
  - ✉️ RSVP
  - ✏️ Texto personalizado

🔄 **Editor Intuitivo**
- Agregar y eliminar secciones fácilmente
- Reordenar secciones con botones de movimiento (arriba/abajo)
- Editar títulos de secciones
- Preview en tiempo real

👀 **Preview en Vivo**
- Visualiza tu invitación mientras la editas
- Alterna entre modo edición y vista previa
- Renderizado HTML en vivo con estilos CSS

💾 **Gestión de Datos**
- Base de datos SQLite local
- Persistencia automática de cambios
- Dashboard para ver todos tus eventos

## Estructura del Proyecto

```
event-invitations-platform/
├── app/
│   ├── api/              # API Routes
│   │   ├── events/       # CRUD de eventos
│   │   ├── sections/     # CRUD de secciones
│   │   └── templates/    # Endpoints de plantillas
│   ├── events/           # Páginas de eventos
│   │   ├── [id]/
│   │   │   └── edit/     # Página de edición
│   │   └── new/          # Página de creación
│   ├── page.tsx          # Dashboard
│   ├── layout.tsx        # Layout principal
│   └── globals.css       # Estilos globales
├── components/           # Componentes React
│   ├── EventEditor.tsx
│   ├── SectionEditor.tsx
│   ├── TemplateSelector.tsx
│   └── InvitationPreview.tsx
├── lib/
│   ├── db.ts            # Instancia de Prisma
│   └── templates.ts     # Definiciones de plantillas
├── prisma/
│   └── schema.prisma    # Esquema de BD
└── public/              # Archivos estáticos
```

## Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **UI**: React 18
- **Styling**: Tailwind CSS
- **Base de Datos**: SQLite + Prisma ORM
- **Validación**: Zod
- **Lenguaje**: TypeScript

## Requisitos

- Node.js 18.17 o superior
- npm o yarn

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/rayGnarok696/event-invitations-platform.git
cd event-invitations-platform
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

```bash
npx prisma db push
```

Esto creará el archivo `dev.db` con el esquema de la BD.

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor dev en puerto 3000

# Producción
npm run build            # Construye la app para producción
npm start                # Inicia servidor de producción

# Utilidades
npm run lint             # Ejecuta ESLint
npx prisma db push      # Sincroniza cambios en schema con BD
npx prisma studio      # Abre Prisma Studio para BD
```

## Flujo de Uso

1. **Dashboard** → Ve todos tus eventos
2. **Crear Evento** → Ingresa detalles básicos del evento
3. **Editar Invitación** → Agrega secciones desde plantillas
4. **Vista Previa** → Visualiza cómo se vería la invitación
5. **Reordenar** → Usa botones arriba/abajo para reordenar
6. **Guardar** → Los cambios se guardan automáticamente

## Modelos de Datos

### Event
- `id`: Identificador único (CUID)
- `title`: Título del evento
- `description`: Descripción detallada
- `date`: Fecha y hora del evento
- `location`: Ubicación
- `theme`: Tema visual
- `createdAt`, `updatedAt`: Timestamps
- `sections`: Relación con secciones

### Section
- `id`: Identificador único
- `eventId`: Referencia al evento
- `templateId`: ID de la plantilla usada
- `title`: Título de la sección
- `content`: Contenido personalizado
- `order`: Orden en la invitación
- `customData`: JSON con datos adicionales

### Template
- `id`: Identificador único
- `name`: Nombre de la plantilla
- `description`: Descripción
- `category`: Categoría (header, details, footer, content)
- `icon`: Emoji o ícono
- `htmlTemplate`: HTML renderizable
- `cssPreset`: Estilos CSS

## Extensiones Futuras

- [ ] Exportar invitación a PDF
- [ ] Generar enlace público para compartir
- [ ] Más plantillas predefinidas
- [ ] Personalización avanzada de colores y fuentes
- [ ] Autenticación de usuarios
- [ ] Galería de diseños
- [ ] Envío por email
- [ ] Historial de versiones

## Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Si tienes preguntas o problemas, por favor abre un [Issue](https://github.com/rayGnarok696/event-invitations-platform/issues).

---

**Hecho con ❤️ para hacer invitaciones hermosas**
