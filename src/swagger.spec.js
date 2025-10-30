import 'dotenv/config.js';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'FoodieRank API',
    version: '1.0.1', 
description: 'Documentación de la API de FOODIE RANK para la gestión de restaurantes, platos, categorías y reseñas. La prueba de todos los endpoints están disponibles para su uso con objetivo de visualización y pruebas. La creación de la siguiente documentación se realiza con el propósito de facilitar la integración y el uso de la API por parte de desarrolladores y usuarios finales.',
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
      // Definición del Esquema Restaurante
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
      }
    }
  },
  paths: {
    // Definición de las Rutas /restaurantes
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
    // Definición de las Rutas /restaurantes/{id}
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
      delete:  {
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
    }
  }
};

export default swaggerSpec;