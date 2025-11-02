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
