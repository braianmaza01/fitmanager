# FitManager 🏋️

Sistema de gestión para gimnasios — SaaS multi-tenant con automatización de WhatsApp.

## 🌐 Links de producción

- **Frontend:** https://fitmanager-gym.netlify.app
- **Backend:** https://fitmanager-backend-pc15.onrender.com

## ✨ Features

- Autenticación segura con JWT (sesión de 12 horas)
- Multi-gimnasio con datos 100% aislados por gymId
- Panel de Super Admin para aprobar, bloquear y eliminar gimnasios
- CRUD completo de alumnos con estado automático (al día / por vencer / vencidos)
- Cuota base + Personal Trainer como add-on opcional
- Modal de confirmación para pagos y eliminaciones
- Eliminación en cascada (alumno → pagos, gimnasio → alumnos → pagos)
- Dashboard con métricas en tiempo real
- Historial de ganancias mes a mes
- Automatización de WhatsApp con Twilio (avisos 3 y 7 días antes del vencimiento)
- Limpieza automática de pagos con más de 6 meses de antigüedad
- Diseño dark fitness responsive (desktop con sidebar, mobile con hamburger)

## 🛠 Stack

- **Frontend:** React + Vite + Tailwind CSS v3
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB Atlas + Mongoose
- **Auth:** JWT
- **Automatización:** node-cron + Twilio WhatsApp API
- **Deploy:** Netlify (frontend) + Render (backend)

## 🚀 Correr localmente

### Backend

```bash
cd fitmanager/backend
npm install
npm run dev
```

### Frontend

```bash
cd fitmanager/frontend
npm install
npm run dev
```

## ⚙️ Variables de entorno

### Backend (.env)

```
MONGO_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=tu_clave_secreta
PORT=3000
TWILIO_ACCOUNT_SID=tu_account_sid
TWILIO_AUTH_TOKEN=tu_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:3000/api
```

## 👤 Credenciales de prueba (Super Admin)

- **Email:** admin@fitmanager.com
- **Password:** admin1234

## 🤖 Jobs automáticos

- **WhatsApp:** todos los días a las 9:00 AM avisa a alumnos que vencen en 3 o 7 días
- **Limpieza:** el día 1 de cada mes a las 3:00 AM elimina pagos con más de 6 meses de antigüedad

## 📋 Próximamente

- Integración con MercadoPago para suscripciones automáticas
- Registro de pagos manuales con historial por alumno
