import { conectarBD, obtenerBD } from "./config/db.js";

async function seed() {
    await conectarBD();

    const categorias_restaurantes = [
        { id: 1, nombre: "Comida rapida" },
        { id: 2, nombre: "Gourmet" },
        { id: 3, nombre: "Vegetariana" },
        { id: 4, nombre: "Postres" },
        { id: 5, nombre: "Parrilla" },
        { id: 6, nombre: "Alta cocina" },
        { id: 7, nombre: "Mariscos" }
    ];

    const categorias_platos = [
        { id: 1, nombre: "Entradas" },
        { id: 2, nombre: "Platos principales" },
        { id: 3, nombre: "Postres" },
        { id: 4, nombre: "Bebidas" },
        { id: 5, nombre: "Acompañamientos" },
        { id: 6, nombre: "Sopas y ensaladas" },
        { id: 7, nombre: "Especialidades de la casa" }
    ];

    const usuarios = [
        { id: 1, username: "admin", password: "123456", role: "admin", correo: "admin@example.com", telefono: "1234567890"  },
        { id: 2, username: "Davisson", password: "pass123", role: "user", correo: "davisson@example.com", telefono: "0987654321" },
        { id: 3, username: "Dylan", password: "pass456", role: "user", correo: "dylan@example.com", telefono: "1122334455" },
        { id: 4, username: "Camilo", password: "pass789", role: "user", correo: "camilo@example.com", telefono: "2233445566" },
        { id: 5, username: "Santiago", password: "pass101", role: "user", correo: "santiago@example.com", telefono: "3344556677" }
    ];

    const reseñas_restaurantes = [
        { id: 1, restauranteId: 1, usuarioId: 2, calificacion: 5, comentario: "Excelente comida y servicio." },
        { id: 2, restauranteId: 2, usuarioId: 3, calificacion: 4, comentario: "Muy buen ambiente." },
        { id: 3, restauranteId: 3, usuarioId: 4, calificacion: 3, comentario: "Comida aceptable." },
        { id: 4, restauranteId: 1, usuarioId: 5, calificacion: 4, comentario: "Volvería a visitar." },
        { id: 5, restauranteId: 2, usuarioId: 2, calificacion: 2, comentario: "No cumplió mis expectativas." }
    ];

    const reseñas_platos = [
        { id: 1, platoId: 1, usuarioId: 3, calificacion: 5, comentario: "Delicioso plato." },
        { id: 2, platoId: 2, usuarioId: 4, calificacion: 4, comentario: "Muy sabroso." },
        { id: 3, platoId: 3, usuarioId: 5, calificacion: 3, comentario: "Estuvo bien." },
        { id: 4, platoId: 1, usuarioId: 2, calificacion: 4, comentario: "Lo recomiendo." },
        { id: 5, platoId: 2, usuarioId: 3, calificacion: 2, comentario: "No me gustó mucho." }
    ];

    const restaurantes = [
        { id: 1, nombre: "La Parrilla Feliz", categoriaId: 5, direccion: "Calle 123, Ciudad", imagen_url: "https://example.com/parrilla.jpg", platos_ids: [1, 2] },
        { id: 2, nombre: "Sabor Gourmet", categoriaId: 2, direccion: "Avenida 456, Ciudad", imagen_url: "https://example.com/gourmet.jpg", platos_ids: [3, 4] },
        { id: 3, nombre: "Verde Vida", categoriaId: 3, direccion: "Boulevard 789, Ciudad", imagen_url: "https://example.com/vegetariana.jpg", platos_ids: [5, 6] }
    ];

    await obtenerBD().collection("categorias_restaurantes").deleteMany();
    await obtenerBD().collection("categorias_restaurantes").insertMany(categorias_restaurantes);

    await obtenerBD().collection("categorias_platos").deleteMany();
    await obtenerBD().collection("categorias_platos").insertMany(categorias_platos);

    await obtenerBD().collection("platos").deleteMany();
    await obtenerBD().collection("platos").insertMany(platos);

    await obtenerBD().collection("restaurantes").deleteMany();
    await obtenerBD().collection("restaurantes").insertMany(restaurantes);

    await obtenerBD().collection("reseñas_restaurantes").deleteMany();
    await obtenerBD().collection("reseñas_restaurantes").insertMany(reseñas_restaurantes);

    await obtenerBD().collection("reseñas_platos").deleteMany();
    await obtenerBD().collection("reseñas_platos").insertMany(reseñas_platos);

    await obtenerBD().collection("usuarios").deleteMany();
    await obtenerBD().collection("usuarios").insertMany(usuarios);



    console.log("BD poblada con categorías, platos, restaurantes, reseñas y usuarios");
    process.exit();
}

seed();
