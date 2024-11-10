import { collectionGen, startTransaction } from "../utils/db.js";

class Usuarios {
    constructor() { }

    // Método para contar la cantidad de usuarios con las credenciales proporcionadas
    async countUser(usuario, contrasena) {
        let session;
        try {
            session = await startTransaction();
            const usuarioCollection = await collectionGen("usuarios");
    
            // Buscamos el usuario con las credenciales proporcionadas
            const result = await usuarioCollection.aggregate([
                {
                    $match: { email: usuario, password: contrasena }
                },
                {
                    $project: {
                        _id: 0, // Excluimos el _id
                        apodo: 1, // Incluimos el campo apodo
                        email: 1 // Incluimos el campo usuario (correo)
                    }
                }
            ]).toArray();
    
            // Confirmamos la transacción si la consulta fue exitosa
            await session.commitTransaction();
            
            // Si el resultado tiene algún usuario, lo devolvemos
            if (result.length > 0) {
                return { 
                    exists: true, 
                    apodo: result[0].apodo, 
                    usuario: result[0].email 
                };
            } else {
                return { exists: false }; // Si no existe, retornamos false
            }
    
        } catch (error) {
            // Si hubo un error, abortamos la transacción
            if (session) {
                await session.abortTransaction();
            }
            throw error;
        } finally {
            // Finalizamos la sesión de la base de datos
            if (session) {
                session.endSession();
            }
        }
    }
    

    // Método para modificar el apodo de un usuario
    async updateApodo(usuario, nuevoApodo) {
        let session;
        try {
            session = await startTransaction();
            const usuarioCollection = await collectionGen("usuarios");

            // Verificamos si el nuevo apodo ya existe
            const apodoExistente = await usuarioCollection.countDocuments({ apodo: nuevoApodo });
            if (apodoExistente > 0) {
                throw new Error("El apodo ya está en uso");
            }

            // Actualizamos el apodo del usuario
            const result = await usuarioCollection.updateOne(
                { email: usuario },
                { $set: { apodo: nuevoApodo } }
            );

            if (result.matchedCount === 0) {
                throw new Error("Usuario no encontrado");
            }

            await session.commitTransaction();
            return { status: "success", message: "Apodo actualizado exitosamente" };
        } catch (error) {
            if (session) {
                await session.abortTransaction();
            }
            throw error;
        } finally {
            if (session) {
                session.endSession();
            }
        }
    }

    // Método para modificar la contraseña de un usuario
    async updateContrasena(usuario, nuevaContrasena) {
        let session;
        try {
            session = await startTransaction();
            const usuarioCollection = await collectionGen("usuarios");

            // Actualizamos la contraseña del usuario
            const result = await usuarioCollection.updateOne(
                { email: usuario },
                { $set: { password: nuevaContrasena } }
            );

            if (result.matchedCount === 0) {
                throw new Error("Usuario no encontrado");
            }

            await session.commitTransaction();
            return { status: "success", message: "Contraseña actualizada exitosamente" };
        } catch (error) {
            if (session) {
                await session.abortTransaction();
            }
            throw error;
        } finally {
            if (session) {
                session.endSession();
            }
        }
    }

    async createUsuario(email, apodo, password) {
        let session;
        try {
            session = await startTransaction();
            const usuarioCollection = await collectionGen("usuarios");
    
            // Verificar si el correo ya existe
            const existingUser = await usuarioCollection.findOne({ email });
            if (existingUser) {
                throw new Error("El correo electrónico ya está registrado");
            }
    
            // Verificar si el apodo ya existe
            const existingNick = await usuarioCollection.findOne({ apodo });
            if (existingNick) {
                throw new Error("El apodo ya está en uso");
            }
    
            // Crear un nuevo usuario
            const newUser = {
                email,
                apodo,
                password,  // Almacena la contraseña sin encriptar
                createdAt: new Date(),  // Añadimos la fecha de creación
            };
    
            const result = await usuarioCollection.insertOne(newUser);
    
            // Si no se insertó el usuario, lanzar un error
            if (result.insertedCount === 0) {
                throw new Error("No se pudo crear el usuario");
            }
    
            await session.commitTransaction();
            return { status: "success", message: "Usuario creado exitosamente" };
        } catch (error) {
            if (session) {
                await session.abortTransaction();
            }
            throw error;
        } finally {
            if (session) {
                session.endSession();
            }
        }
    }

}

export default Usuarios;
