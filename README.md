# Estructura general backend proyecto parcial 3 Gestores de bases de datos

## Descripción del proyecto

Esta es la estructura general de la cual los estudiantes deberan partir para terminar de crear el backend de la aplicacion de tableros, esta estructura ya cuenta con las partes principales para una conexion a la base de datos y la documentacion entregada explica cada una de las partes de la misma.

- **Versión de Node.js**: 18.16.0

## Cómo clonar el repositorio

```bash
git clone https://github.com/ADEP-123/EsqueletoEjemplo.git
cd EsqueletoEjemplo
```

## Cómo instalar las dependencias

### Backend

```bash
npm install
```

## Cómo iniciar el Backend

### Backend

1. Ingrese al archivo `.env` en y rellene cada una de las variables con las correspondientes a las variables de entorno de su sistema (base de datos, puerto, etc.).
2. Cree la base de datos basada en mongo en el documento `query.mongodb` que encontrara en la ruta `db/scripts` y siguiendo la documentacion ejecute la creacion de la base de datos en su cluster personal.
3. Iniciar el servidor backend:

```bash
npm run dev
```

## Cómo interactuar con el Backend desde los Endpoints

A pesar de que esto ya está explicado en la documentacion se explica los endpoints existentes, recuerde que dentro de la entidad usuarios ya hay algunas condiciones previas que debe considerar al momento de crear la base de datos para no tener que alterar el codigo existente

### **Login**

- **Endpoint**: `GET http://127.10.10.10:5010/appTableros/login`
- **Descripción**: Se envían los datos de `user` y `pass` por query para obtener el JWT.

**Ejemplo**:

```bash
curl -X GET "http://127.10.10.10:5010/appTableros/login?user=juan@example.com&pass=password123"
```

**Respuesta**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### **Validacion del token**

- **Endpoint**: `GET http://127.10.10.10:5010/appTableros/testLog`
- **Descripción**: Este endpoint es meramente de testeo y aprendizaje, no tiene un valor real dentro de la aplicacion.

**Ejemplo**:

```bash
curl -X GET "http://127.10.10.10:5010/appTableros/testLog" \
-H "Authorization: token"
```

**Respuesta**:

```json
{
  "status": true,
  "message": "Prueva exitosa, recibido el jwt"
}
```

---

### **Creacion de un nuevo usuario**

- **Endpoint**: `POST http://127.10.10.10:5010/appTableros/post/user`
- **Descripción**: Este endpoint funciona para crear un nuevo usuario.

**Ejemplo**:

```bash
curl -X GET "http://127.10.10.10:5010/appTableros/post/user" \
-Body {
  "email":"emailTest@test.com",
  "nickname":"pacoALberto123",
  "password":"PACOpaco123456"
}
```

**Respuesta**:

```json
{
  "status": true,
  "result": {
    "status": "success",
    "message": "Usuario creado exitosamente"
  }
}
```
