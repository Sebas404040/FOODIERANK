import 'dotenv/config.js';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'FoodieRank API',
    version: '1.0.1',
    description: 'Documentación de la API de FOODIE RANK para la gestión de restaurantes, platos, categorías y reseñas. La prueba de todos los endpoints están disponibles para su uso con objetivo de visualización y pruebas. La creación de la siguiente documentación se realiza con el propósito de facilitar la integración y el uso de la API por parte de desarrolladores y usuarios finales.'
  },
  servers: [
    {
      url: `http://${process.env.HOST_NAME}:${process.env.PORT}`,
      description: 'Servidor de Desarrollo'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Autenticación requerida para rutas protegidas.'
      }
    },
    schemas: {
      // Esquema Restaurante
      Restaurante: {
        type: 'object',
        required: ['nombre', 'categoriaId', 'direccion', 'imagen_url', 'descripcion'],
        properties: {
          id: { type: 'integer', description: 'El ID generado automáticamente.' },
          nombre: { type: 'string', description: 'Nombre del restaurante.' },
          categoriaId: { type: 'integer', description: 'ID de la categoría.' },
          direccion: { type: 'string', description: 'Dirección física.' },
          imagen_url: { type: 'string', format: 'url', description: 'URL de la imagen.' },
          descripcion: { type: 'string', description: 'Breve descripción.' }
        },
        example: {
          id: 1,
          nombre: 'La Parrilla Feliz',
          categoriaId: 5,
          direccion: 'Avenida 456, Ciudad',
          imagen_url: 'https://example.com/parrilla.jpg',
          descripcion: 'Especializados en carnes.'
        }
      },
      // Esquema Plato
      Plato: {
        type: 'object',
        required: ['nombre', 'descripcion', 'precio', 'id_restaurante', 'categoriaId'],
        properties: {
          id: { type: 'integer', description: 'ID del plato generado automáticamente.' },
          nombre: { type: 'string', description: 'Nombre del plato.' },
          descripcion: { type: 'string', description: 'Descripción detallada del plato.' },
          precio: { type: 'number', format: 'float', description: 'Precio del plato.' },
          id_restaurante: { type: 'integer', description: 'ID del restaurante al que pertenece el plato.' },
          categoriaId: { type: 'integer', description: 'ID de la categoría del plato.' }
        },
        example: {
          id: 1,
          nombre: 'Hamburguesa Clásica',
          descripcion: 'Jugosa hamburguesa con queso.',
          precio: 8.99,
          id_restaurante: 1,
          categoriaId: 1
        }
      },
      // Esquema Reseña de Restaurante
      ResenaRestaurante: {
        type: 'object',
        required: ['restauranteId', 'usuarioId', 'calificacion', 'comentario'],
        properties: {
          id: { type: 'integer', description: 'ID de la reseña generado automáticamente.' },
          restauranteId: { type: 'integer', description: 'ID del restaurante reseñado.' },
          usuarioId: { type: 'integer', description: 'ID del usuario que creó la reseña.' },
          calificacion: { type: 'integer', description: 'Puntuación de 1 a 5.' },
          comentario: { type: 'string', description: 'Comentario de la reseña.' },
          fecha: { type: 'string', format: 'date-time', description: 'Fecha de creación de la reseña.' },
          likes: { type: 'integer', description: 'Número de likes.' }
        },
        example: {
          id: 1,
          restauranteId: 1,
          usuarioId: 2,
          calificacion: 5,
          comentario: 'Excelente comida y servicio.',
          fecha: '2023-01-01T00:00:00.000Z',
          likes: 10
        }
      },
      // Esquema Reseña de Plato (NUEVO)
      ResenaPlato: {
        type: 'object',
        required: ['platoId', 'usuarioId', 'calificacion', 'comentario'],
        properties: {
          id: { type: 'integer', description: 'ID de la reseña generado automáticamente.' },
          platoId: { type: 'integer', description: 'ID del plato reseñado.' },
          usuarioId: { type: 'integer', description: 'ID del usuario que creó la reseña.' },
          calificacion: { type: 'integer', description: 'Puntuación de 1 a 5.' },
          comentario: { type: 'string', description: 'Comentario de la reseña.' },
          fecha: { type: 'string', format: 'date-time', description: 'Fecha de creación de la reseña.' },
          likes: { type: 'integer', description: 'Número de likes.' }
        },
        example: {
          id: 1,
          platoId: 1,
          usuarioId: 3,
          calificacion: 5,
          comentario: 'Delicioso plato.',
          fecha: '2023-01-01T00:00:00.000Z',
          likes: 10
        }
      },
      CategoriaRestaurante: {
        type: 'object',
        required: ['nombre'],
        properties: {
          id: { type: 'integer', description: 'ID de la categoría generado automáticamente.' },
          nombre: { type: 'string', description: 'Nombre de la categoría (ej: "Gourmet", "Vegetariana").' }
        },
        example: {
          id: 2,
          nombre: 'Gourmet'
        }
      },
      CategoriaPlato: {
        type: 'object',
        required: ['nombre'],
        properties: {
          id: { type: 'integer', description: 'ID de la categoría generado automáticamente.' },
          nombre: { type: 'string', description: 'Nombre de la categoría (ej: "Entradas", "Postres").' }
        },
        example: {
          id: 1,
          nombre: 'Entradas'
        }
      },
      UsuarioRegistro: {
        type: 'object',
        required: ['username', 'password', 'role', 'email', 'telefono'],
        properties: {
          username: { type: 'string', description: 'Nombre de usuario.' },
          password: { type: 'string', format: 'password', description: 'Contraseña cifrada (mínimo 6 caracteres).' },
          role: { type: 'string', enum: ['admin', 'user'], description: 'Rol del usuario.' },
          email: { type: 'string', format: 'email', description: 'Correo electrónico único.' },
          telefono: { type: 'string', description: 'Número de teléfono.' }
        },
        example: {
          username: 'test_user',
          password: 'password123',
          role: 'user',
          email: 'test@example.com',
          telefono: '1234567890'
        }
      },
      // Esquema para el inicio de sesión (Payload)
      UsuarioLogin: {
        type: 'object',
        required: ['email', 'contrasenia'],
        properties: {
          email: { type: 'string', format: 'email', description: 'Correo electrónico del usuario.' },
          contrasenia: { type: 'string', format: 'password', description: 'La propiedad del body es "contrasenia".' }
        },
        example: {
          email: 'test@example.com',
          contrasenia: 'password123'
        }
      },
      // Esquema de respuesta de autenticación exitosa
      AuthResponse: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID de MongoDB del usuario.' },
          username: { type: 'string' },
          correo: { type: 'string', format: 'email' },
          mensaje: { type: 'string' }
        },
        example: {
          id: '60c72b2f90d1f7001c8f4b0e',
          username: 'test_user',
          correo: 'test@example.com',
          mensaje: 'Inicio de sesión exitoso'
        }
      }
    }
  },
  paths: {
    // ----------------------------------------------------
    // Rutas Restaurantes
    // ----------------------------------------------------
    '/restaurantes': {
      get: {
        summary: 'Obtiene todos los restaurantes.',
        tags: ['Restaurantes'],
        responses: {
          '200': {
            description: 'Lista de todos los restaurantes.',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Restaurante' } }
              }
            }
          },
          '500': { description: 'Error interno del servidor.' }
        }
      },
      post: {
        summary: 'Crea un nuevo restaurante (Requiere autenticación).',
        tags: ['Restaurantes'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Restaurante' } }
          }
        },
        responses: {
          '201': { description: 'Restaurante creado exitosamente.' },
          '400': { description: 'Datos de entrada inválidos.' },
          '401': { description: 'No autorizado.' }
        }
      }
    },
    '/restaurantes/{id}': {
      get: {
        summary: 'Obtiene un restaurante por su ID.',
        tags: ['Restaurantes'],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico del restaurante.'
        }],
        responses: {
          '200': { description: 'Detalles del restaurante.', content: { 'application/json': { schema: { $ref: '#/components/schemas/Restaurante' } } } },
          '404': { description: 'Restaurante no encontrado.' }
        }
      },
      delete: {
        summary: 'Elimina un restaurante por ID (Requiere autenticación).',
        tags: ['Restaurantes'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico del restaurante a eliminar.'
        }],
        responses: {
          '200': { description: 'Restaurante eliminado exitosamente.' },
          '401': { description: 'No autorizado.' },
          '404': { description: 'Restaurante no encontrado.' }
        }
      },
      patch: {
        summary: 'Actualiza parcialmente un restaurante (Requiere autenticación).',
        tags: ['Restaurantes'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico del restaurante a actualizar.'
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Restaurante' } }
          }
        },
        responses: {
          '200': { description: 'Restaurante actualizado exitosamente.' },
          '400': { description: 'Datos de entrada inválidos.' },
          '401': { description: 'No autorizado.' },
          '404': { description: 'Restaurante no encontrado.' }
        }
      }
    },
    // ----------------------------------------------------
    // Rutas Platos
    // ----------------------------------------------------
    '/platos': {
      get: {
        summary: 'Obtiene todos los platos.',
        tags: ['Platos'],
        responses: {
          '200': {
            description: 'Lista de todos los platos.',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Plato' } }
              }
            }
          },
          '500': { description: 'Error interno del servidor.' }
        }
      },
      post: {
        summary: 'Crea un nuevo plato (Requiere autenticación).',
        tags: ['Platos'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Plato' } }
          }
        },
        responses: {
          '201': { description: 'Plato creado exitosamente.' },
          '400': { description: 'Datos de entrada inválidos.' },
          '401': { description: 'No autorizado.' }
        }
      }
    },
    '/platos/{id}': {
      get: {
        summary: 'Obtiene un plato por su ID.',
        tags: ['Platos'],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico del plato a obtener.'
        }],
        responses: {
          '200': { description: 'Detalles del plato.', content: { 'application/json': { schema: { $ref: '#/components/schemas/Plato' } } } },
          '404': { description: 'Plato no encontrado.' }
        }
      },
      delete: {
        summary: 'Elimina un plato por ID (Requiere autenticación).',
        tags: ['Platos'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico del plato a eliminar.'
        }],
        responses: {
          '200': { description: 'Plato eliminado exitosamente.' },
          '401': { description: 'No autorizado.' },
          '404': { description: 'Plato no encontrado.' }
        }
      },
      patch: {
        summary: 'Actualiza parcialmente un plato (Requiere autenticación).',
        tags: ['Platos'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico del plato a actualizar.'
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Plato' } }
          }
        },
        responses: {
          '200': { description: 'Plato actualizado exitosamente.' },
          '400': { description: 'Datos de entrada inválidos.' },
          '401': { description: 'No autorizado.' },
          '404': { description: 'Plato no encontrado.' }
        }
      }
    },
    // ----------------------------------------------------
    // Rutas Reseñas de Restaurantes
    // ----------------------------------------------------
    '/resenas_restaurantes': {
      get: {
        summary: 'Obtiene todas las reseñas de restaurantes.',
        tags: ['Reseñas de Restaurantes'],
        responses: {
          '200': {
            description: 'Lista de todas las reseñas de restaurantes.',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/ResenaRestaurante' } }
              }
            }
          },
          '500': { description: 'Error interno del servidor.' }
        }
      },
      post: {
        summary: 'Crea una nueva reseña para un restaurante.',
        tags: ['Reseñas de Restaurantes'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  restauranteId: { type: 'integer' },
                  usuarioId: { type: 'integer' },
                  calificacion: { type: 'integer', minimum: 1, maximum: 5 },
                  comentario: { type: 'string' }
                },
                required: ['restauranteId', 'usuarioId', 'calificacion', 'comentario']
              }
            }
          }
        },
        responses: {
          '201': { description: 'Reseña de restaurante creada exitosamente.' },
          '400': { description: 'Datos de entrada inválidos.' },
          '500': { description: 'Error al procesar la reseña.' }
        }
      }
    },
    '/resenas_restaurantes/{id}': {
      get: {
        summary: 'Obtiene reseñas por ID de restaurante.',
        tags: ['Reseñas de Restaurantes'],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID del restaurante para el cual se obtienen las reseñas.'
        }],
        responses: {
          '200': { description: 'Lista de reseñas del restaurante.', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ResenaRestaurante' } } } } },
          '404': { description: 'Restaurante no encontrado.' }
        }
      },
      delete: {
        summary: 'Elimina una reseña por su ID.',
        tags: ['Reseñas de Restaurantes'],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico de la reseña a eliminar.'
        }],
        responses: {
          '200': { description: 'Reseña eliminada exitosamente.' },
          '404': { description: 'Reseña no encontrada.' }
        }
      },
      patch: {
        summary: 'Actualiza parcialmente una reseña de restaurante.',
        tags: ['Reseñas de Restaurantes'],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico de la reseña a actualizar.'
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ResenaRestaurante'
              }
            }
          }
        },
        responses: {
          '200': { description: 'Reseña de restaurante actualizada exitosamente.' },
          '404': { description: 'Reseña no encontrada.' }
        }
      }
    },
    '/resenas_restaurantes/like/{id}': {
      put: {
        summary: 'Incrementa el contador de likes en una reseña de restaurante.',
        tags: ['Reseñas de Restaurantes'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id_usuario: { type: 'integer', description: 'ID del usuario que da el like.' }
                },
                required: ['id_usuario']
              }
            }
          }
        },
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID de la reseña a la que se desea dar like.'
        }],
        responses: {
          '200': { description: 'Like agregado exitosamente.' },
          '400': { description: 'No se puede dar like a tu propia reseña.' },
          '404': { description: 'Reseña no encontrada.' }
        }
      }
    },
    // ----------------------------------------------------
    // Rutas Reseñas de Platos (NUEVO)
    // ----------------------------------------------------
    '/resenas_platos': {
      get: {
        summary: 'Obtiene todas las reseñas de platos.',
        tags: ['Reseñas de Platos'],
        responses: {
          '200': {
            description: 'Lista de todas las reseñas de platos.',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/ResenaPlato' } }
              }
            }
          },
          '500': { description: 'Error interno del servidor.' }
        }
      },
      post: {
        summary: 'Crea una nueva reseña para un plato.',
        tags: ['Reseñas de Platos'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  platoId: { type: 'integer' },
                  usuarioId: { type: 'integer' },
                  calificacion: { type: 'integer', minimum: 1, maximum: 5 },
                  comentario: { type: 'string' }
                },
                required: ['platoId', 'usuarioId', 'calificacion', 'comentario']
              }
            }
          }
        },
        responses: {
          '201': { description: 'Reseña de plato creada exitosamente.' },
          '400': { description: 'Datos de entrada inválidos.' },
          '500': { description: 'Error al procesar la reseña.' }
        }
      }
    },
    '/resenas_platos/{id}': {
      get: {
        summary: 'Obtiene reseñas por ID de plato.',
        tags: ['Reseñas de Platos'],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID del plato para el cual se obtienen las reseñas.'
        }],
        responses: {
          '200': { description: 'Lista de reseñas del plato especificado.', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ResenaPlato' } } } } },
          '404': { description: 'Plato no encontrado.' }
        }
      },
      delete: {
        summary: 'Elimina una reseña por su ID.',
        tags: ['Reseñas de Platos'],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico de la reseña a eliminar.'
        }],
        responses: {
          '200': { description: 'Reseña eliminada exitosamente.' },
          '404': { description: 'Reseña no encontrada.' }
        }
      }
    },
    '/resenas_platos/like/{id}': {
      put: {
        summary: 'Incrementa el contador de likes en una reseña de plato.',
        tags: ['Reseñas de Platos'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id_usuario: { type: 'integer', description: 'ID del usuario que da el like.' }
                },
                required: ['id_usuario']
              }
            }
          }
        },
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID de la reseña a la que se desea dar like.'
        }],
        responses: {
          '200': { description: 'Like agregado exitosamente.' },
          '400': { description: 'No se puede dar like a tu propia reseña.' },
          '404': { description: 'Reseña no encontrada.' }
        }
      }
    },
    '/categorias_restaurantes': {
      get: {
        summary: 'Obtiene todas las categorías de restaurantes.',
        tags: ['Categorías de Restaurantes'],
        responses: {
          '200': {
            description: 'Lista de categorías de restaurantes.',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/CategoriaRestaurante' } }
              }
            }
          },
          '500': { description: 'Error interno del servidor.' }
        }
      },
      post: {
        summary: 'Crea una nueva categoría de restaurante (Requiere autenticación).',
        tags: ['Categorías de Restaurantes'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nombre: { type: 'string', description: 'Nombre de la nueva categoría.' }
                },
                required: ['nombre']
              }
            }
          }
        },
        responses: {
          '201': { description: 'Categoría creada exitosamente.' },
          '400': { description: 'Categoría ya existe o datos inválidos.' },
          '401': { description: 'No autorizado.' }
        }
      }
    },
    '/categorias_restaurantes/{id}': {
      delete: {
        summary: 'Elimina una categoría de restaurante por ID (Requiere autenticación).',
        tags: ['Categorías de Restaurantes'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico de la categoría a eliminar.'
        }],
        responses: {
          '200': { description: 'Categoría eliminada exitosamente.' },
          '401': { description: 'No autorizado.' },
          '404': { description: 'Categoría no encontrada.' }
        }
      }
    },
    '/categorias_restaurantes/{id_categoriaActualizada}': {
      patch: {
        summary: 'Actualiza la categoría de un restaurante existente.',
        description: 'Asigna una nueva categoría a un restaurante específico.',
        tags: ['Categorías de Restaurantes'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path',
          name: 'id_categoriaActualizada',
          schema: { type: 'integer' },
          required: true,
          description: 'ID numérico de la nueva categoría a asignar.'
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id_restaurante: { type: 'integer', description: 'ID del restaurante cuya categoría se va a actualizar.' }
                },
                required: ['id_restaurante']
              }
            }
          }
        },
        responses: {
          '200': { description: 'Categoría de restaurante actualizada exitosamente.' },
          '400': { description: 'Datos inválidos.' },
          '401': { description: 'No autorizado.' },
          '404': { description: 'Restaurante o categoría no encontrados.' }
        }
      }
    },
    '/categorias_platos': {
      get: {
        summary: 'Obtiene todas las categorías de platos.',
        tags: ['Categorías de Platos'],
        responses: {
          '200': {
            description: 'Lista de categorías de platos.',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/CategoriaPlato' } }
              }
            }
          },
          '500': { description: 'Error interno del servidor.' }
        }
      },
      post: {
        summary: 'Crea una nueva categoría de plato (Requiere autenticación).',
        tags: ['Categorías de Platos'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nombre: { type: 'string', description: 'Nombre de la nueva categoría.' }
                },
                required: ['nombre']
              }
            }
          }
        },
        responses: {
          '201': { description: 'Categoría creada exitosamente.' },
          '400': { description: 'Categoría ya existe o datos inválidos.' },
          '401': { description: 'No autorizado.' }
        }
      }
    },
    '/categorias_platos/{id}': {
      delete: {
        summary: 'Elimina una categoría de plato por ID (Requiere autenticación).',
        tags: ['Categorías de Platos'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID numérico de la categoría a eliminar.'
        }],
        responses: {
          '200': { description: 'Categoría eliminada exitosamente.' },
          '401': { description: 'No autorizado.' },
          '404': { description: 'Categoría no encontrada.' }
        }
      }
    },
    '/categorias_platos/{id_categoriaActualizada}': {
      patch: {
        summary: 'Actualiza la categoría de un plato existente.',
        description: 'Asigna una nueva categoría a un plato específico.',
        tags: ['Categorías de Platos'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path',
          name: 'id_categoriaActualizada',
          schema: { type: 'integer' },
          required: true,
          description: 'ID numérico de la nueva categoría a asignar.'
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id_plato: { type: 'integer', description: 'ID del plato cuya categoría se va a actualizar.' }
                },
                required: ['id_plato']
              }
            }
          }
        },
        responses: {
          '200': { description: 'Categoría de plato actualizada exitosamente.' },
          '400': { description: 'Datos inválidos.' },
          '401': { description: 'No autorizado.' },
          '404': { description: 'Plato o categoría no encontrados.' }
        }
      }
    },
    '/auth': {
      get: {
        summary: 'Verifica la salud del servicio de autenticación (Health Check).',
        tags: ['Autenticación'],
        responses: {
          '200': {
            description: 'Servicio de Autenticación Activo.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    message: { type: 'string' }
                  }
                },
                example: { status: 'OK', message: 'Authentication service is healthy' }
              }
            }
          }
        }
      }
    },
    '/auth/register': {
      post: {
        summary: 'Registra un nuevo usuario.',
        tags: ['Autenticación'],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/UsuarioRegistro' } }
          }
        },
        responses: {
          '201': {
            description: 'Registro exitoso. El token JWT se establece como una cookie HttpOnly.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } }
          },
          '400': { description: 'Datos inválidos o el correo ya está registrado.' }
        }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Inicia sesión del usuario.',
        tags: ['Autenticación'],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/UsuarioLogin' } }
          }
        },
        responses: {
          '200': {
            description: 'Inicio de sesión exitoso. El token JWT se establece como una cookie HttpOnly.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } }
          },
          '401': { description: 'Contraseña incorrecta o el usuario no existe.' }
        }
      }
    }
  }
};

export default swaggerSpec;