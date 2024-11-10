# Estructura general backend proyecto parcial 3 Gestores de bases de datos

## Descripción del proyecto

Esta es la estructura general de la cual los estudiantes deberan partir para terminar de crear el backend de la aplicacion de tableros, esta estructura ya cuenta con las partes principales para una conexion a la base de datos y la documentacion entregada explica cada una de las partes de la misma.

- **Versión de Node.js**: 18.16.0

## Cómo utilizar este repositorio como plantilla

Para utilizar este repositorio como plantilla puede hacer lo de tres maneras:

### Clonar y eliminar manualmente la garpeta .git
Para realizar este paso debe tener permisos de administrador en su dispotivo y tener habilitada la opcion de ver carpetas ocultas

1. Clone el repositorio con el siguiente comando:
```bash
git clone https://github.com/ADEP-123/EsqueletoEjemplo.git
```
2. Busque la carpeta oculta `.git` dentro de la carpeta `EsqueletoEjemplo` y eliminela

### Crear un repositorio nuevo como plantilla desde github
1. Haz clic en el botón verde que dice "Use this template" (o "Usar esta plantilla" en español), ubicado en la parte superior del repositorio, junto al botón de "Code".
2. Esto abrirá una página para crear un nuevo repositorio basado en esta plantilla.
3. Ingresa el nombre de tu nuevo repositorio y selecciona si quieres que sea público o privado.
4. Haz clic en "Create repository from template" para crear tu nuevo repositorio.

### Usar Github CLI para crearlo desde la terminar
Para este paso debe tener instalado GIT CLI, lo puede encontrar en el siguiente link: https://cli.github.com/ , una vez instalado haga lo siguiente:
1. Ejecute el siguiente comando en su terminal
```bash
gh repo create <NOMBRE-DE-SU-REPO> --template https://github.com/ADEP-123/EsqueletoEjemplo.git < --public o --private >
```
Debe remplazar `<NOMBRE-DE-SU-REPO>` por el nombre del repositorio que desea, y `< --public o --private >` por `--public` o `--private` segun sea el caso, por ejemplo, crearemos un repositorio publico llamado `Parcial3GB_Backend` a patir de la plantilla así:
```bash
gh repo create Parcial3GB_Backend --template https://github.com/ADEP-123/EsqueletoEjemplo.git --public
```
2. Luego debe navegar a sus repostorios de github, buscar el repositorio y clonarlo con el siguiente comando en la carpeta donde quiera almacenar el repositorio
```bash
git clone <aca el link de su repositorio>
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
