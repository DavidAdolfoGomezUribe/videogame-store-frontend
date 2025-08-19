export const metadata = {
  title: "GameHub | Tienda de videojuegos",
  description: "Compra juegos físicos y consolas. Administra tu catálogo.",
};

import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotifyProvider } from "@/context/NotifyContext";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          <NotifyProvider>
            <CartProvider>
              <Header />
              <main className="container-max py-6">{children}</main>
            </CartProvider>
          </NotifyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
