# 🍽️ API de Recetas

Esta es una API REST desarrollada con Node.js, Express y MongoDB que permite gestionar usuarios y recetas de cocina. Incluye autenticación con JWT, encriptación de contraseñas y protección de rutas. Proyecto final del curso de Backend 💻.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- bcrypt
- JSON Web Token (JWT)
- Postman (para pruebas)

---

## 📦 Instalación

1. Cloná el repositorio o descargá los archivos del proyecto.
2. Instalá las dependencias:

```bash
npm install
```

3. Iniciá MongoDB (por ejemplo, usando `mongod` en otra terminal).
4. Iniciá el servidor:

```bash
node server.js
```

---

## 🔐 Rutas de Autenticación

### 📌 Registro

**POST** `/api/usuarios/registro`

```json
{
  "nombre": "Savina",
  "email": "savina@mail.com",
  "contraseña": "secreta123"
}
```

### 📌 Login

**POST** `/api/usuarios/login`

```json
{
  "email": "savina@mail.com",
  "contraseña": "secreta123"
}
```

📌 Respuesta: incluye un **token JWT** que debe usarse en rutas protegidas.

---

## 🛣️ Rutas de Recetas

> ⚠️ Las siguientes rutas requieren autenticación (enviar token en el header `Authorization`)

### 📖 Ver todas las recetas  
**GET** `/api/recetas`

### 🍳 Crear nueva receta  
**POST** `/api/recetas`

```json
{
  "titulo": "Tarta de manzana",
  "ingredientes": ["manzana", "azúcar", "harina"],
  "instrucciones": "Mezclar todo y hornear.",
  "creadoPor": "ID_DEL_USUARIO"
}
```

### 📝 Editar receta  
**PUT** `/api/recetas/:id`

### ❌ Eliminar receta  
**DELETE** `/api/recetas/:id`

---

## 🧑‍🍳 Rutas de Usuarios (administración)

### 👥 Ver usuarios  
**GET** `/api/usuarios`

### 📝 Actualizar usuario  
**PUT** `/api/usuarios/:id`

### ❌ Eliminar usuario  
**DELETE** `/api/usuarios/:id`

---

## 🛡️ Ruta protegida de prueba

**GET** `/api/recetas/protegida`  
💡 Responde solo si el token JWT es válido.

---

## ✨ Autora

**Savina Gabba**  
Estudiante ADA de Backend  
Proyecto final de curso 🙌

---

## 📝 Notas

- Las contraseñas se encriptan con **bcrypt**.
- El token JWT tiene una validez de 1 hora.
- La base de datos se conecta localmente a `mongodb://127.0.0.1:27017/recetasdb`

---

## 📬 Contacto

**Email:** gabbasavina@gmail.com  
**GitHub:** **
