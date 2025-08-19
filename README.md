# GameHub — Frontend (Next.js + Tailwind)

Frontend para la tienda de videojuegos que consume la API Express/Mongo.

## Novedades
- **Búsqueda** en tienda y en Admin · Productos / Admin · Ventas (cliente, productos, método, ID).
- **Diálogos** de confirmación/feedback: al **añadir al carrito**, **cambiar cantidades**, **remover**, **crear/editar/eliminar** productos.
- **Tema claro/oscuro** con switch en la esquina superior derecha (se guarda en `localStorage`).

## Requisitos
- Node.js 18+
- Backend corriendo (por defecto `http://localhost:5500/api`).

## Configuración
1. Copia `.env.local.example` a `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Ajusta `NEXT_PUBLIC_API_BASE` si tu backend usa otro host/puerto.
3. Instala e inicia:
   ```bash
   npm install
   npm run dev
   ```

## Funcionalidades principales
- **Tienda**: listado, búsqueda y agregar al carrito (diálogo de añadido).
- **Carrito**: modificar cantidades (diálogo), eliminar (diálogo), total; **checkout** con diálogo de éxito.
- **Administrador**:
  - **Productos**: listar, buscar, crear, editar (PATCH) y eliminar (con notificaciones).
  - **Ventas**: listar y buscar (ID, producto, `customerId`, método), mostrando fecha, total e ítems.

## Estructura
- `app/` Next.js (app router)
- `components/` UI (Header, ProductCard, Modal, SearchBar, ThemeToggle, ProductForm)
- `context/` estados globales (Cart, Theme, Notify)
- `lib/` cliente fetch y utilidades
