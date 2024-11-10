import Usuarios from "../entities/usuarios.js"

export const postNewUserController = async (req, res, next) => {
    const { email, nickname, password } = req.body
    const userObject = new Usuarios
    try {
        const result = await userObject.createUsuario(email,nickname,password)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}