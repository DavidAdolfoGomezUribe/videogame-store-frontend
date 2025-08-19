# GameHub — Frontend (Next.js + Tailwind)

Frontend para la tienda de videojuegos que consume la API Express/Mongo.

## Requisitos
- Node.js 18+
- Backend corriendo (por defecto en `http://localhost:5500/api`).

## Configuración
1. Copia `.env.local.example` a `.env.local` y ajusta la URL de la API si es necesario:
   ```bash
   cp .env.local.example .env.local
   # edita NEXT_PUBLIC_API_BASE si tu backend usa otro host/puerto
   ```

2. Instala dependencias e inicia el entorno de desarrollo:
   ```bash
   npm install
   npm run dev
   ```

3. Producción:
   ```bash
   npm run build
   npm start
   ```

## Funcionalidades
- **Tienda**: listado de productos, **barra de búsqueda** (nombre, SKU, plataforma, marca), agregar al carrito.
- **Carrito**: editar cantidades, eliminar, total, **checkout** con formulario (customerId y método de pago) y **diálogo de compra exitosa**.
- **Administrador**:
  - **Productos**: listar, buscar, crear, editar (PATCH) y eliminar.
  - **Ventas**: listar todas las ventas y **buscar** por ID, producto, cliente o método de pago.
- **Responsive**: teléfonos, tablets y desktop.
- **Validación**: los formularios envían JSON (`Content-Type: application/json`) según la API.

## Notas
- El backend exige `customerId` con formato de **Mongo ObjectId**. Si no manejas clientes, el checkout usa por defecto `000000000000000000000000`.
- La API no expone `GET /products/:id`, así que la vista de edición trae el listado y filtra por `_id`.

## Estructura
- `app/` app router de Next.js
- `components/` UI reutilizable (Header, ProductCard, Modal, ProductForm, SearchBar)
- `context/CartContext.jsx` estado global del carrito con `localStorage`
- `lib/api.js` cliente fetch hacia la API
- `lib/utils.js` utilidades (formato moneda/fecha y normalización)
