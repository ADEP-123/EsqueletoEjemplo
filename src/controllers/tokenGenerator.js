import 'reflect-metadata'
import dotenv from 'dotenv';
import { SignJWT } from 'jose';
import Usuarios from '../entities/usuarios.js';
import config from '../utils/config.js';

dotenv.config();
const appToken = async (req, res) => {    
    try {
        const { user, pass } = req.query;        
        if (!user || !pass) {
            res.status(400).send({ message: "Recuerde enviar el user y pass" })
        } else {
            const usuario = new Usuarios()
            const result = await usuario.countUser(user, pass)            
            if (result.exists) {
                const encoder = new TextEncoder();
                const userObject = {mail:result.usuario,nickname:result.apodo}
                const jwtconstructor = new SignJWT(Object.assign({}, Object.assign(userObject)));
                const jwt = await jwtconstructor
                    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
                    .setIssuedAt()
                    .setExpirationTime("2h")
                    .sign(encoder.encode(config.jwktKey));
                req.data = jwt;
                res.status(201).send({ status: 201, message: jwt });
                console.log(req.data);
            }else{
                res.status(202).send({status:202, message:"Usuario no registrado"})
            }
        }
    } catch (error) {
        res.status(404).send({ status: 404, message: error.message });
    }
}

export default appToken