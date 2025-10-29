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
            "required": ["id", "usuarioId", "restauranteId", "calificacion", "comentario", "fecha", "likes"],
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
                },
                "fecha": {
                    "bsonType": "date",
                    "description": "Fecha de la reseña."
                },
                "likes": {
                    "bsonType": "int",
                    "description": "Número de likes de la reseña."
                }
            }
        }
    },
    resenas_platos: {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["id", "usuarioId", "platoId", "calificacion", "comentario", "fecha", "likes"],
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
                "fecha": {
                    "bsonType": "date",
                    "description": "Fecha de la reseña."
                },
                "likes": {
                    "bsonType": "int",
                    "description": "Número de likes de la reseña."
                }
            }
        }
    }
};