import { connection } from "./atlas.js";

const collectionGen = async (coleccion) => {
    const db = await connection();
    const newCollection = db.collection(coleccion);
    return newCollection;
}

const startTransaction = async () => {
    const db = await connection();
    const session = db.client.startSession();
    session.startTransaction();
    return session;
}

export {
    collectionGen,
    startTransaction
}
