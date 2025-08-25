# Solución al Problema de CORS

## 🔴 **Problema Identificado**

Tu aplicación frontend está experimentando un error de **CORS (Cross-Origin Resource Sharing)** cuando intenta conectarse al backend de Render.

```
Access to XMLHttpRequest at 'https://prueba-tecnica-backend-h0az.onrender.com/brands' 
from origin 'http://localhost:3000' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 📋 **¿Qué es CORS?**

CORS es un mecanismo de seguridad del navegador que controla qué dominios pueden hacer peticiones a tu API. Por defecto, los navegadores bloquean peticiones entre diferentes orígenes por seguridad.

## 🎯 **Solución: Configurar CORS en el Backend**

### **Opción 1: Si tienes acceso al código del backend**

Agrega el middleware de CORS en tu backend (ejemplo en Node.js/Express):

```javascript
const cors = require('cors');

// Configuración básica de CORS
app.use(cors({
  origin: [
    'http://localhost:3000',           // Desarrollo local
    'http://localhost:3001',           // Puerto alternativo
    'https://tu-dominio-produccion.com' // Tu dominio en producción
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// O permitir todos los orígenes (solo para desarrollo)
app.use(cors());
```

### **Opción 2: Si usas Python/FastAPI**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://tu-dominio-produccion.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### **Opción 3: Si usas Python/Django**

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://tu-dominio-produccion.com",
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
```

## 🚀 **Pasos para Solucionar**

1. **Identifica tu framework backend** (Node.js, Python, etc.)
2. **Instala el middleware CORS** correspondiente
3. **Configura los orígenes permitidos**:
   - `http://localhost:3000` (desarrollo)
   - Tu dominio de producción
4. **Reinicia el servidor backend**
5. **Prueba la conexión** desde el frontend

## 🔧 **Solución Temporal para Desarrollo**

Si no puedes modificar el backend inmediatamente, puedes usar un proxy de desarrollo:

```javascript
// next.config.ts
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://prueba-tecnica-backend-h0az.onrender.com/:path*',
      },
    ];
  },
};
```

## 📱 **Verificación**

Después de configurar CORS, deberías ver en la consola del navegador:

```
✅ Petición exitosa a la API
✅ Datos recibidos correctamente
✅ Sin errores de CORS
```

## 🆘 **Si el Problema Persiste**

1. **Verifica que el backend esté corriendo**
2. **Confirma que CORS esté configurado correctamente**
3. **Revisa los logs del backend** para errores
4. **Verifica que el dominio esté en la lista de orígenes permitidos**

## 📞 **Soporte**

Si necesitas ayuda adicional:
- Revisa la documentación de tu framework backend
- Consulta con el equipo de backend
- Verifica la configuración de Render







