/*
ESQUEMAS DE VALIDACIÓN PARA LA BASE DE DATOS
Este archivo contiene los esquemas de validación utilizados en la aplicación
para asegurar que los datos de entrada cumplan con los requisitos esperados.
(Este archivo se une con la base de datos y el archivo de siembra de datos).
*/

export const validationSchemas = {
  usuarios: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["id", "username", "password", "role", "correo"],
        "properties": {
            "id": {
                "bsonType": "int",
                "description": "Identificador único del usuario."
            },
            "username": {
                "bsonType": "string",
                "description": "Nombre de usuario único."
            },
            "password": {
                "bsonType": "string",
                "description": "Contraseña hasheada."
            },
            "role": {
                "bsonType": "string",
                "enum": ["admin", "user"],
                "description": "Define el rol del usuario."
            },
            "correo": {
                "bsonType": "string",
                "description": "Correo electrónico del usuario."
            },
            "telefono": {
                "bsonType": "string",
                "description": "Número de teléfono opcional."
            }
        }
    }
  },
  categorias_restaurantes: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["id", "nombre"],
        "properties": {
            "id": {
                "bsonType": "int",
                "description": "Identificador único de la categoría."
            },
            "nombre": {
                "bsonType": "string",
                "description": "Nombre de la categoría de restaurantes."
            }
        }
    }
  },
  categorias_platos: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["id", "nombre"],
        "properties": {
            "id": {
                "bsonType": "int",
                "description": "Identificador único de la categoría."
            },
            "nombre": {
                "bsonType": "string",
                "description": "Nombre de la categoría de platos."
            }
        }
    }
  },
  restaurantes: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["id", "categoriaId", "nombre", "direccion", "descripcion"],
        "properties": {
            "id": {
                "bsonType": "int",
                "description": "Identificador único del restaurante."
            },
            "nombre": {
                "bsonType": "string"
            },
            "categoriaId": {
                "bsonType": "int",
                "description": "Referencia a categorias_restaurantes."
            },
            "direccion": {
                "bsonType": "string"
            },
            "imagen_url": {
                "bsonType": "string"
            },
            "descripcion": {
                "bsonType": "string"
            }
        }
    }
  },
  platos: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["id", "id_restaurante", "nombre", "precio", "categoriaId"],
        "properties": {
            "id": {
                "bsonType": "int",
                "description": "Identificador único del plato."
            },
            "nombre": {
                "bsonType": "string"
            },
            "categoriaId": {
                "bsonType": "int",
                "description": "Referencia a categorias_platos."
            },
            "descripcion": {
                "bsonType": "string"
            },
            "precio": {
                "bsonType": "double",
                "description": "Precio del plato."
            },
            "imagen_url": {
                "bsonType": "string"
            },
            "id_restaurante": {
                "bsonType": "int",
                "description": "Referencia al restaurante."
            }
        }
    }
  },
  resenas_restaurantes: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["id", "usuarioId", "restauranteId", "calificacion", "comentario"],
        "properties": {
            "id": {
                "bsonType": "int",
                "description": "Identificador único de la reseña."
            },
            "restauranteId": {
                "bsonType": "int",
                "description": "Referencia al restaurante reseñado."
            },
            "usuarioId": {
                "bsonType": "int",
                "description": "Referencia al usuario que hizo la reseña."
            },
            "calificacion": {
                "bsonType": "int",
                "minimum": 1,
                "maximum": 5
            },
            "comentario": {
                "bsonType": "string",
                "description": "Comentario de la reseña."
            }
        }
    }
  },
  resenas_platos: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["id", "usuarioId", "platoId", "calificacion", "comentario"],
        "properties": {
            "id": {
                "bsonType": "int",
                "description": "Identificador único de la reseña."
            },
            "platoId": {
                "bsonType": "int",
                "description": "Referencia al plato reseñado."
            },
            "usuarioId": {
                "bsonType": "int",
                "description": "Referencia al usuario que hizo la reseña."
            },
            "calificacion": {
                "bsonType": "int",
                "minimum": 1,
                "maximum": 5
            },
            "comentario": {
                "bsonType": "string"
            },
        }
    }
  },
  interacciones_resenas: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["id", "usuarioId", "resenaId", "targetType", "tipo"],
        "properties": {
            "id": {
                "bsonType": "int",
                "description": "Identificador único de la interacción."
            },
            "usuarioId": {
                "bsonType": "int",
                "description": "Referencia al usuario que realiza la interacción (like/dislike)."
            },
            "resenaId": {
                "bsonType": "int",
                "description": "Referencia a la reseña (de restaurante o plato) objetivo."
            },
            "targetType": {
                "bsonType": "string",
                "enum": ["restaurante", "plato"],
                "description": "Indica si resenaId apunta a resenas_restaurantes o resenas_platos."
            },
            "tipo": {
                "bsonType": "string",
                "enum": ["like", "dislike"],
                "description": "Tipo de interacción realizada."
            }
        }
    }
  }
};