<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0A0A0F,50:6C63FF,100:8B85F5&height=160&section=header&text=FitManager&fontSize=48&fontColor=F2F2F5&animation=fadeIn&fontAlignY=35&desc=SaaS%20de%20gesti%C3%B3n%20para%20gimnasios&descSize=16&descAlignY=58" width="100%"/>

**Sistema multi-tenant de gestión de gimnasios con automatización de WhatsApp**

[![Demo](https://img.shields.io/badge/🌐_Ver_demo_en_vivo-6C63FF?style=for-the-badge)](https://fitmanager-gym.netlify.app)

![React](https://img.shields.io/badge/React-0A0A0F?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-0A0A0F?style=flat-square&logo=vite&logoColor=8B85F5)
![Tailwind](https://img.shields.io/badge/Tailwind-0A0A0F?style=flat-square&logo=tailwindcss&logoColor=38BDF8)
![Node.js](https://img.shields.io/badge/Node.js-0A0A0F?style=flat-square&logo=nodedotjs&logoColor=339933)
![Express](https://img.shields.io/badge/Express-0A0A0F?style=flat-square&logo=express&logoColor=F2F2F5)
![MongoDB](https://img.shields.io/badge/MongoDB-0A0A0F?style=flat-square&logo=mongodb&logoColor=47A248)
![Twilio](https://img.shields.io/badge/Twilio-0A0A0F?style=flat-square&logo=twilio&logoColor=F22F46)

</div>

---

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

## 👤 Demo

¿Querés probar el sistema? Escribime por [Instagram](https://instagram.com/braian.webdev) y te doy acceso a un entorno de prueba.

## 🤖 Jobs automáticos

- **WhatsApp:** todos los días a las 9:00 AM avisa a alumnos que vencen en 3 o 7 días
- **Limpieza:** el día 1 de cada mes a las 3:00 AM elimina pagos con más de 6 meses de antigüedad

## 📋 Próximamente

- Integración con MercadoPago para suscripciones automáticas
- Registro de pagos manuales con historial por alumno
