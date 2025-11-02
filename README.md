# ⭐ FOODIERANK 🍝

![FB_LOGO](./images/FB_LOGO.png)

FoodieRank es una aplicación web diseñada para ser el punto de encuentro definitivo entre los amantes de la gastronomía y los mejores establecimientos de comida. Su propósito fundamental es ofrecer transparencia y una clasificación impulsada por la comunidad para ayudar a los usuarios a tomar decisiones informadas sobre dónde comer.

En este repositorio encontrará la documentación previa acerca de las secciones más importantes para la funcionalidad correcta del backend.

## Planeación ☁️

En esta sección se encuentran los modelos de bases de datos para la creación correcta de la base de datos y la estructuraci;ón de las entidades. Secci;ón muy importante ya que senta las bases del aplicativo web. 

### Modelo E-R 🟦 - 🟥

![Modelo Entidad-Relación](./models/Modelo_conceptual.svg)

En este primer diagrama se detallan los atributos y entidades primarias con graficos de menor grado.

### Modelo lógico 🔳

![Modelo lógico](./models/Modelo%20logico.svg)

En este diagrama un poco mas denominado se detallan los tipos de datos y clasificaciones mas esquematizadas.

### Modelo fisico

Al utilizar una base de datos noSQL (MongoDB) se presenta el siguiente modelo fisico por esquemas de validaciones.

#### Usuarios

```javascript
db.createCollection('usuarios', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'id',
        'username',
        'password',
        'role',
        'correo'
      ],
      properties: {
        id: {
          bsonType: 'int',
          description: 'Identificador único del usuario.'
        },
        username: {
          bsonType: 'string',
          description: 'Nombre de usuario único.'
        },
        password: {
          bsonType: 'string',
          description: 'Contraseña hasheada.'
        },
        role: {
          bsonType: 'string',
          'enum': [
            'admin',
            'user'
          ],
          description: 'Define el rol del usuario.'
        },
        correo: {
          bsonType: 'string',
          description: 'Correo electrónico del usuario.'
        },
        telefono: {
          bsonType: 'string',
          description: 'Número de teléfono opcional.'
        }
      }
    }
  }
})
```

Esta colección almacena la información de los usuarios registrados en la aplicación. Cada documento representa un usuario con sus credenciales de acceso, rol y datos de contacto. El esquema incluye validaciones para asegurar que los campos requeridos estén presentes y que el rol sea válido.

#### Restaurantes

```javascript
db.createCollection('restaurantes', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'id',
        'categoriaId',
        'nombre',
        'direccion',
        'descripcion'
      ],
      properties: {
        id: {
          bsonType: 'int',
          description: 'Identificador único del restaurante.'
        },
        nombre: {
          bsonType: 'string',
          description: 'Nombre del restaurante.'
        },
        categoriaId: {
          bsonType: 'int',
          description: 'Referencia a categorias_restaurantes.'
        },
        direccion: {
          bsonType: 'string',
          description: 'Dirección física del restaurante.'
        },
        imagen_url: {
          bsonType: 'string',
          description: 'URL de la imagen del restaurante.'
        },
        descripcion: {
          bsonType: 'string',
          description: 'Descripción detallada del restaurante.'
        }
      }
    }
  }
})
```

Esta colección almacena la información de los restaurantes registrados en la plataforma. Cada documento contiene los detalles básicos de un restaurante, incluyendo su ubicación, categoría y descripción. El esquema asegura que toda la información esencial esté presente para cada restaurante.

#### Platos

```javascript
db.createCollection('platos', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'id',
        'id_restaurante',
        'nombre',
        'precio',
        'categoriaId'
      ],
      properties: {
        id: {
          bsonType: 'int',
          description: 'Identificador único del plato.'
        },
        nombre: {
          bsonType: 'string',
          description: 'Nombre del plato.'
        },
        categoriaId: {
          bsonType: 'int',
          description: 'Referencia a categorias_platos.'
        },
        descripcion: {
          bsonType: 'string',
          description: 'Descripción detallada del plato.'
        },
        precio: {
          bsonType: 'double',
          description: 'Precio del plato.'
        },
        imagen_url: {
          bsonType: 'string',
          description: 'URL de la imagen del plato.'
        },
        id_restaurante: {
          bsonType: 'int',
          description: 'Referencia al restaurante al que pertenece el plato.'
        }
      }
    }
  }
})
```

Esta colección almacena la información de los platos disponibles en los restaurantes. Cada documento representa un plato con sus detalles, incluyendo precio, categoría y el restaurante al que pertenece. El esquema garantiza que toda la información necesaria esté presente para cada plato.

#### Resenas_restaurantes

```javascript
db.createCollection("resenas_restaurantes", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'id',
        'usuarioId',
        'restauranteId',
        'calificacion',
        'comentario',
        'fecha',
        'likes'
      ],
      properties: {
        id: {
          bsonType: 'int',
          description: 'Identificador único de la reseña.'
        },
        restauranteId: {
          bsonType: 'int',
          description: 'Referencia al restaurante reseñado.'
        },
        usuarioId: {
          bsonType: 'int',
          description: 'Referencia al usuario que hizo la reseña.'
        },
        calificacion: {
          bsonType: 'int',
          minimum: 1,
          maximum: 5,
          description: 'Calificación del restaurante (1-5 estrellas).'
        },
        comentario: {
          bsonType: 'string',
          description: 'Comentario de la reseña.'
        },
        fecha: {
          bsonType: 'date',
          description: 'Fecha de la reseña.'
        },
        likes: {
          bsonType: 'int',
          minimum: 0,
          description: 'Número de likes de la reseña.'
        }
      }
    }
  }
})
```

Esta colección almacena las reseñas realizadas por los usuarios a los restaurantes. Cada documento incluye la calificación, comentarios y métricas de interacción social. El esquema valida que las calificaciones estén entre 1 y 5, y que los likes no sean negativos.

#### Resenas_platos

```javascript
db.createCollection("resenas_platos", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'id',
        'usuarioId',
        'platoId',
        'calificacion',
        'comentario',
        'fecha',
        'likes'
      ],
      properties: {
        id: {
          bsonType: 'int',
          description: 'Identificador único de la reseña.'
        },
        platoId: {
          bsonType: 'int',
          description: 'Referencia al plato reseñado.'
        },
        usuarioId: {
          bsonType: 'int',
          description: 'Referencia al usuario que hizo la reseña.'
        },
        calificacion: {
          bsonType: 'int',
          minimum: 1,
          maximum: 5,
          description: 'Calificación del plato (1-5 estrellas).'
        },
        comentario: {
          bsonType: 'string',
          description: 'Comentario de la reseña del plato.'
        },
        fecha: {
          bsonType: 'date',
          description: 'Fecha de la reseña.'
        },
        likes: {
          bsonType: 'int',
          minimum: 0,
          description: 'Número de likes de la reseña.'
        }
      }
    }
  }
})
```

Esta colección almacena las reseñas realizadas por los usuarios a los platos específicos. Cada documento incluye la calificación, comentarios y métricas de interacción social. El esquema valida que las calificaciones estén entre 1 y 5, y que los likes no sean negativos.

#### Categorias_restaurantes

```javascript
db.createCollection('categorias_restaurantes', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'id',
        'nombre'
      ],
      properties: {
        id: {
          bsonType: 'int',
          description: 'Identificador único de la categoría.'
        },
        nombre: {
          bsonType: 'string',
          description: 'Nombre de la categoría de restaurantes.'
        }
      }
    }
  }
})
```

Esta colección almacena las diferentes categorías a las que pueden pertenecer los restaurantes (por ejemplo: italiana, mexicana, asiática, etc.). Cada documento representa una categoría única con su identificador y nombre.

#### Categorias_platos

```javascript
db.createCollection('categorias_platos', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'id',
        'nombre'
      ],
      properties: {
        id: {
          bsonType: 'int',
          description: 'Identificador único de la categoría.'
        },
        nombre: {
          bsonType: 'string',
          description: 'Nombre de la categoría de platos.'
        }
      }
    }
  }
})
```

Esta colección almacena las diferentes categorías a las que pueden pertenecer los platos (por ejemplo: entradas, platos principales, postres, bebidas, etc.). Cada documento representa una categoría única con su identificador y nombre.

## Endpoints importantes 🔗

Esta sección detalla los servicios de la API REST, accesible en la base **`http://localhost:5000`**, organizados por su funcionalidad principal.

### Módulo I: Autenticación y Perfil de Usuario (`/auth` & `/usuarios`)
Gestión de acceso y perfiles de usuario en la plataforma.

#### Autenticación
* **Registro de Nuevo Usuario**
  * `POST /auth/register`
  * **Propósito:** Permite la creación de una cuenta con rol `user` o `admin`.
  * **Ejemplo de Petición (Body):**
    ```json
    {
      "username": "test_user",
      "password": "password123",
      "role": "user",
      "correo": "test@example.com",
      "telefono": "1234567890"
    }
    ```
  * **Resultado (201 Creado):** Devuelve el perfil básico del usuario y establece el token JWT en una cookie HttpOnly.

* **Inicio de Sesión**
  * `POST /auth/login`
  * **Propósito:** Autentica al usuario, devolviendo datos de sesión, incluido el `numericId` para referencias en reseñas.
  * **Ejemplo de Petición (Body):**
    ```json
    {
      "correo": "test@example.com",
      "password": "password123"
    }
    ```
  * **Resultado (200 OK):** Incluye el `numericId` y el `role` del usuario.

#### Consulta de Usuarios
* **Obtener Todos los Usuarios**
  * `GET /usuarios`
  * **Propósito:** Listado completo de todos los usuarios registrados.

* **Obtener Usuario por ID Numérico**
  * `GET /usuarios/:id`
  * **Propósito:** Consulta los datos de un usuario específico utilizando su ID numérico.

---

### Módulo II: Restaurantes y Platos (`/restaurantes` & `/platos`)
Gestión de la información base de la oferta gastronómica.

#### Gestión de Restaurantes
* **Listar Restaurantes**
  * `GET /restaurantes`
  * **Propósito:** Devuelve la lista completa de todos los restaurantes activos.

* **Crear Restaurante**
  * `POST /restaurantes` (Requiere Autenticación)
  * **Ejemplo de Petición (Body):**
    ```json
    {
      "nombre": "Nuevo Lugar",
      "categoriaId": 4,
      "direccion": "...",
      "imagen_url": "...",
      "descripcion": "..."
    }
    ```
* **Actualizar Restaurante**
  * `PATCH /restaurantes/:id` (Actualización Parcial - Requiere Auth)
  * **Propósito:** Modifica campos específicos del restaurante.

* **Eliminar Restaurante**
  * `DELETE /restaurantes/:id` (Eliminación - Requiere Auth)
  * **Propósito:** Elimina un restaurante del catálogo.

#### Gestión de Platos
* **Listar Platos**
  * `GET /platos`
  * **Propósito:** Devuelve la lista completa de todos los platos.

* **Crear Plato**
  * `POST /platos` (Requiere Autenticación)
  * **Ejemplo de Petición (Body):**
    ```json
    {
      "nombre": "Postre de Día",
      "categoriaId": 3,
      "descripcion": "...",
      "precio": 5.00,
      "id_restaurante": 1,
      "imagen_url": "..."
    }
    ```
* **Actualizar Plato**
  * `PATCH /platos/:id` (Actualización Parcial - Requiere Auth)
  * **Propósito:** Modifica campos específicos del plato.

* **Eliminar Plato**
  * `DELETE /platos/:id`
  * **Propósito:** Elimina un plato del menú.

---

### Módulo III: Interacción y Reseñas (`/resenas_restaurantes` & `/resenas_platos`)
Manejo del contenido generado por los usuarios (UGC).

#### Reseñas de Restaurantes
* **Crear Nueva Reseña**
  * `POST /resenas_restaurantes`
  * **Propósito:** Permite a un usuario enviar una calificación y comentario.
  * **Ejemplo de Petición (Body):**
    ```json
    {
      "restauranteId": 1,
      "usuarioId": 6, 
      "calificacion": 5,
      "comentario": "Genial",
      "fecha": "2025-11-02", 
      "likes": 0
    }
    ```
* **Obtener Reseñas por Restaurante**
  * `GET /resenas_restaurantes/:id`
  * **Propósito:** Devuelve todas las reseñas asociadas al ID del restaurante.

* **Dar/Quitar Like**
  * `PATCH /resenas_restaurantes/like/:id`
  * **Propósito:** Permite a un usuario interactuar con la reseña de otro.
  * **Petición (Body):** `{"id_usuario": 6}`

* **Editar Reseña**
  * `PATCH /resenas_restaurantes/:id`
  * **Propósito:** Modifica la calificación y/o el comentario de la reseña.

#### Reseñas de Platos
* **Crear Nueva Reseña de Plato**
  * `POST /resenas_platos`
  * **Propósito:** Permite calificar un plato específico.
  * **Petición (Body):** (Similar al de restaurantes, usando `platoId`).

* **Obtener Reseñas por Plato**
  * `GET /resenas_platos/:id`
  * **Propósito:** Devuelve todas las reseñas asociadas al ID del plato.

* **Editar Reseña de Plato**
  * `PATCH /resenas_platos/:id`
  * **Propósito:** Modifica la calificación y/o el comentario de la reseña.

* **Dar/Quitar Like a Plato**
  * `PATCH /resenas_platos/like/:id`
  * **Petición (Body):** `{"id_usuario": 6}`

---

### Módulo IV: Categorías y Rankings (`/categorias_*` & `/ranking`)
Estructura de datos y métricas de desempeño.

#### Gestión de Categorías (Requiere Autenticación)
* **Crear Categoría (Restaurantes/Platos)**
  * `POST /categorias_restaurantes` | `POST /categorias_platos`
  * **Ejemplo:** `{"nombre": "Comida Tailandesa"}`

* **Listar Categorías**
  * `GET /categorias_restaurantes` | `GET /categorias_platos`
  * **Propósito:** Obtiene todas las categorías disponibles.

* **Asignar Categoría a un Item**
  * `PATCH /categorias_restaurantes/:id_cat` (Asigna categoría a un **restaurante** - Body: `{"id_restaurante": 5}`)
  * `PATCH /categorias_platos/:id_cat` (Asigna categoría a un **plato** - Body: `{"id_plato": 12}`)

#### Cálculo de Rankings
* **Ranking de Restaurante**
  * `GET /ranking/restaurantes/:id`
  * **Propósito:** Devuelve el promedio de calificación para el restaurante.
  * **Resultado (200 OK):** `4.25`

* **Ranking de Platos**
  * `GET /ranking/platos/:id`
  * **Propósito:** Devuelve el promedio de calificación para el plato.
  * **Resultado (200 OK):** `3.8`

## Conclusión ✅

La culminación del desarrollo del backend de FoodieRank establece una base robusta, segura y escalable para la aplicación. Mediante la adopción de tecnologías modernas y una arquitectura modular, se ha logrado construir la base de dato, arquitecturas de API y lógica que soporta todas las funcionalidades de la plataforma.

## Autores 🥷 🥷

- Davisson Adriel Román (Product Owner, Developer)

- Joan Sebastián Gómez Serrano (SCRUM Masterm, developer)