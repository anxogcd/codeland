# 🛠️ Proyecto Fullstack - Entorno de Desarrollo

Este proyecto está compuesto por un **backend** (Nestjs levantado con Docker) y un **frontend** (Nextjs). Este README explica cómo levantar ambos entornos en modo desarrollo.

---

## 📦 Backend (Docker)

El backend está containerizado con Docker y se levanta fácilmente con el siguiente comando:

```bash
docker compose up --build -d
```

Esto hará lo siguiente:

- Construirá las imágenes necesarias si no existen.
- Levantará los contenedores en segundo plano (`-d`).
- Usará la configuración definida en `docker-compose.yml`.
- Poblará la bd con datos de prueba

### 🔄 Para reiniciar o detener:

```bash
docker compose restart   # Reinicia los contenedores
docker compose down      # Detiene y elimina los contenedores
```

---

## 💻 Frontend (modo desarrollo)

Para levantar el frontend en modo desarrollo:

```bash
npm install   # Solo la primera vez
npm run dev
```

Esto iniciará el servidor de desarrollo, normalmente disponible en:

```
http://localhost:3000
```

> Asegúrate de que el backend esté corriendo para que el frontend pueda comunicarse correctamente con la API.

---

## 🧪 Entorno de Desarrollo

Este setup está pensado exclusivamente para desarrollo. No está optimizado para producción.

---

## 📁 Estructura esperada

```
root/
├── backend/              # Proyecto backend (Dockerizado)
│   └── docker-compose.yml
├── frontend/             # Proyecto frontend
│   └── package.json
└── README.md             # Este archivo
```

---

## ✅ Requisitos previos

- Docker y Docker Compose
- Node.js >= 18
- npm >= 9

---

## Login para acciones protegidas

- Puedes utilizar cualquier usuario y contraseña del seeder, como por ejemplo:
  "name": "El Constructor de APIs Eternas",
  "username": "constructor_apis",
  "password": "apiBuilder999"

¡Feliz desarrollo! 🚀
