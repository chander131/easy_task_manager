# ✅ Task Manager Frontend

Este es el **frontend de la aplicación Task Manager**, construido con [Next.js 15](https://nextjs.org/docs), utilizando el nuevo sistema de **App Router**, **Material UI (MUI)** y React 19.  
Se comunica con la API `task_manager_api` para autenticación vía cookies y gestión segura de sesión.

---

## 🧰 Tecnologías principales

- [Next.js 15 (App Router)](https://nextjs.org/docs/app)
- React 19
- Material UI (v7)
- TypeScript
- Charts con [Recharts](https://recharts.org/)
- Drag & drop con `@dnd-kit/core`

---

## ⚙️ Instalación y ejecución local

### 1. Clona el repositorio

```bash
git clone https://github.com/chander131/easy_task_manager.git
cd easy_task_manager
```

### 2. Instala las dependencias

```bash
npm install
# o si usas Yarn
yarn install
```

### 3. Crea el archivo .env.local

```env
TASK_MANAGER_API=http://localhost:8000
NEXT_PUBLIC_TASK_MANAGER_API=http://localhost:8000
```

> Asegúrate de que este dominio esté habilitado en CORS desde el backend.

### 4. Ejecuta la aplicación en modo desarrollo

```bash
npm run dev
```

La app estará disponible en [http://localhost:3000](http://localhost:3000)

---

### 🔐 Autenticación

La autenticación se maneja por medio de cookies HTTPOnly que son establecidas por el backend `(task_manager_api)`.
Este frontend incluye:

- Redirección automática si no hay sesión activa

- Consumo seguro de rutas protegidas desde componentes Server y Client

- Manejo de estado de usuario en contexto compartido

### 📦 Scripts disponibles

- `npm run dev`: Ejecuta la app en desarrollo

- `npm run build`: Compila para producción

- `npm run start`: Inicia el servidor de producción

- `npm run lint`: Corre el linter con configuración de Next.js

### 🎨 Estilo y UI

- Componentes de UI modernos con [Material UI](https://mui.com)
- Tipografía basada en `@fontsource/roboto`
- Temas y modo oscuro fácilmente extensibles

### 📊 Funcionalidad destacada

- Panel principal de tareas (drag & drop)
- Visualización de estadísticas con gráficos (Recharts)
- Acceso condicional a rutas protegidas
- Interacción fluida con la API REST

### 📦 Despliegue

Puede desplegarse fácilmente en:

- Vercel (recomendado para Next.js)
- Docker
- Servidores Node.js estándar (`npm run build && npm run start`)

### 🧑‍💻 Contribuciones

Pull Requests y mejoras son bienvenidas.
Usa el sistema de Issues para sugerencias, bugs o nuevas ideas.

### 📄 Licencia

Este proyecto está licenciado bajo MIT.
