
# Proyecto API REST con Node.js

La API se encuentra desplegada en Heroku:
http://my-first-api-upgrade-bootcamp.herokuapp.com/

Repositorio en GitLab:
[https://gitlab.com/jleal22/proyecto-nodejs-jesus-leal](https://gitlab.com/jleal22/proyecto-nodejs-jesus-leal)

La API utiliza una base de datos MongoDB que se encuentra en [MongoDB Atlas](https://www.mongodb.com/atlas).

**Colecciones:**
- Courses
- Students
- Tutors
- Users

**Relaciones entre colecciones:**
- Cada curso tiene un tutor
- Un estudiantes puede tener n cursos

Las rutas creadas en la API son:

| **Método** | **Ruta** | **Descripción** |
|--------|------|-------------| 
| **Cursos (/courses)** |
| GET | / | Obtener todos los cursos
| GET | /:id | Obtener un curso (por su id) | 
| GET | /status/:status | Obtener todos los cursos que tengan el estado 'Open', 'inProgress' o 'Close' | 
| GET | /tutor/:tutorid | Obtener todos los cursos de un tutor | 
| POST | / | Crear un curso | 
| PUT | /:id | Actualizar un curso (por su id) | 
| PATCH | /title/:id | Actualizar el título de un curso | 
| PATCH | /tutor/:id | Actualizar el tutor de un curso | 
| PATCH | /startdate/:id | Actualizar la fecha de inicio de un curso | 
| PATCH | /status/:id | Actualizar el estado de un curso | 
| DELETE | /:id | Borrar un curso (por su id) | 
| **Estudiantes (/students)** | 
| GET | / | Obtener todos los estudiantes | 
| GET | /:id | Obtener un estudiante (por su id) | 
| GET | /course/:courseid | Obtener todos los estudiantes que tenga un determinado curso | 
| POST | / | Crear un estudiante | 
| PUT | /:id | Actualizar un estudiante (por su id) | 
| PATCH | /newcourse/:id | Incluir un nuevo curso a un estudiante | 
| PATCH | /removecourse/:id | Borrar un determinado curso a un estudiante | 
| PATCH | /image/:id | Actualizar la imagen de un estudiante | 
| DELETE | /:id | Borrar un estudiante (por su id) | 
| **Tutores (/tutors)** | 
| GET | / | Obtener todos los tutores | 
| GET | /:id | Obtener un tutor (por su id) | 
| POST | / | Crear un tutor | 
| PUT | /:id | Actualizar un tutor (por su id) | 
| DELETE | /:id | Borrar un tutor (por su id) | 
| **Usuarios (/users)** | 
| POST | /login | Autentificación de un usuario | 
| POST | /logout | Desconexión de un usuario | 
| GET | / | Obtener todos los usuarios | 
| GET | /:id | Obtener un usuario (por su id) | 
| GET | /alias/:alias | Obtener un usuario (por su alias) | 
| POST | / | Crear un usuario | 
| PUT | /:id | Actualizar un usuario (por su id) | 
| PATCH | /password/:id | Actualizar el password de un usuario | 
| DELETE | /:id | Borrar un usuario (por su id) | 

Se ha incluido autenticación de usuario para todas las rutas salvo para:
- POST users
- POST users/login

### Estructura del proyecto

```bash

|_📁 src
  📄main.js
	|_📁 models
    📝course.model.js
    📝student.model.js
    📝tutor.model.js
		📝user.model.js
	|_📁 routes
    📝course.routes.js
    📝student.routes.js
    📝tutor.routes.js
		📝user.routes.js
	|_📁 controllers
    📝course.controller.js
    📝student.controller.js
    📝tutor.controller.js
		📝user.controller.js
  |_📁resolvers
    📝course.resolver.js
    📝student.resolver.js
    📝tutor.resolver.js  
	|_📁 seeds
		📝course.seed.js
    📝student.seed.js
    📝tutor.seed.js
  |_📁_shared
    |_📁middleware
      📝auth.middleware.js
      📝file.middleware.js
      📝logging.middleware.js
    |_📁utils
      📝utils.utils.js
      📝validations.utils.js
      |_📁db
        📝db.js
📝.env
```

## Variables de entorno

Se deberán configurar las siguientes variables de entorno en un fichero **.env**:

```bash
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
```
Cloudinary
```bash
CLOUD_NAME=...
API_KEY=...
API_SECRET=...
```