# GameHub — Frontend (Next.js + Tailwind)

Frontend para la tienda de videojuegos que consume la API Express/Mongo entregada.

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
- **Tienda**: listado de productos, agregar al carrito.
- **Carrito**: editar cantidades, eliminar, total, **checkout** con formulario (customerId y método de pago) y **diálogo de compra exitosa**.
- **Administrador**: listar, crear, editar (PATCH) y eliminar productos.
- **Responsive**: teléfonos, tablets y desktop.
- **Validación**: los formularios envían JSON (`Content-Type: application/json`) según lo requerido por la API.

## Notas de implementación
- El backend exige `customerId` válido como ObjectId. Si no manejas clientes, el formulario de checkout usa por defecto `000000000000000000000000` (válido sintácticamente).
- La API no expone `GET /products/:id`, así que la vista de edición trae el listado y filtra por `_id`.
- Campos requeridos para crear productos: `name`, `type` (`game|console`), `price`, `quantity`, `sku`, `platform`, `brand`, `status` (`active|inactive|discontinued`).

## Estructura
- `app/` app router de Next.js
- `components/` UI reutilizable (Header, ProductCard, Modal, ProductForm)
- `context/CartContext.jsx` estado global del carrito con `localStorage`
- `lib/api.js` cliente fetch hacia la API
- `lib/utils.js` utilidades (formato moneda)

¡Listo para conectar con tu backend!
