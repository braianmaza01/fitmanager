# FitManager

Sistema de gestión para gimnasios. Permite a cada gimnasio administrar sus alumnos, cuotas y vencimientos desde un panel propio, mientras un super-admin aprueba o bloquea el acceso de los gimnasios registrados.

## 🚀 Producción

- **Frontend:** https://magnificent-toffee-e35a6d.netlify.app
- **Backend:** https://fitmanager-backend-pc15.onrender.com

## 🛠️ Stack tecnológico

**Frontend**
- React + Vite
- Tailwind CSS v3
- React Router
- Axios
- lucide-react (íconos)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (autenticación)
- bcryptjs (hash de contraseñas)

## 💻 Correr el proyecto localmente

### Backend

```bash
cd fitmanager/backend
npm install
```

Crear un archivo `.env` con:

```
MONGO_URI=mongodb://localhost:27017/fitmanager
JWT_SECRET=tu_secreto_seguro
PORT=3000
```

Crear el usuario super-admin y levantar el servidor:

```bash
npm run seed
npm run dev
```

### Frontend

```bash
cd fitmanager/frontend
npm install
```

Crear un archivo `.env` con:

```
VITE_API_URL=http://localhost:3000/api
```

Levantar el servidor de desarrollo:

```bash
npm run dev
```

## 🔑 Credenciales de prueba (super-admin)

```
Email: admin@fitmanager.com
Password: admin1234
```

## ✨ Features principales

- Registro de gimnasios con aprobación manual (estado pendiente / activo / bloqueado)
- Login con JWT, aislado por gimnasio (cada gimnasio solo ve sus propios alumnos)
- Panel de super-admin para aprobar o bloquear gimnasios
- Gestión de alumnos: alta, edición, baja y búsqueda/filtros por estado
- Cálculo automático de estado de cuota (al día / por vencer / vencido)
- Registro de pagos con confirmación, que renueva el vencimiento 30 días
- Dashboard con métricas (total de alumnos, al día, por vencer, vencidos), próximos vencimientos y ganancias del mes
- Diseño responsive: sidebar en desktop, navbar con menú hamburguesa en mobile

## 🔜 Próximamente

- Historial de ganancias por mes/período
- Notificaciones de vencimiento por WhatsApp
- Limpieza automática de alumnos inactivos/vencidos hace mucho tiempo
