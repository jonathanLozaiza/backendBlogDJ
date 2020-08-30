import {Router, Request, Response} from "express"
import { Usuario } from "../models/usuario";
import bcrypt from "bcrypt"
import Token from "../class/Token";
import {verificarToken} from "../midlewares/auth";

const usuarioRutas : Router = Router();

//crear usuario
usuarioRutas.post("/crear", (req: Request, res: Response)=>{
    const usuario = {
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.password, 10) 
    }

    //crear usuario en base de datos

    Usuario.create(usuario).then(
        usuarioDb => {
            res.json({
                ok: true,
                usuario: usuarioDb
            })
        }
    ).catch( err => {
        res.json({
            ok: false,
            err
        })
    })
})

//login
usuarioRutas.post("/entrar", (req: Request, res: Response)=>{
    
    Usuario.findOne({nombre: req.body.nombre}, (err, usuarioDB)=>{
        if(err) throw err;
        if(!usuarioDB){
            return  res.json({
                ok: false,
                mensaje: 'Invalid Data'
            });
        }
        
        if(usuarioDB.compararPassword(req.body.password)){

            const myToken = Token.getToken({
                _id: usuarioDB._id,
                nombre: usuarioDB.nombre
            })

            res.json({
                ok: true,
                token: myToken
            })
        }else{
            res.json({
                ok: false,
                mensaje: "Invalid Data"
            })
        }

    })
})

// Actualizar mi usuario
usuarioRutas.post('/update', verificarToken, (req: any, res: Response) => {

    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        password: req.body.password || req.usuario.password
    }

    Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {

        if (err) throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        const miToken = Token.getToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            password: userDB.password

        });
        res.json({
            ok: true,
            token: miToken
        });
    });
});


// Get usuario
usuarioRutas.get('/', async (req: any, res: Response) => {

    const user = await Usuario.find()
        .limit(1) // Limit es para el número de usuarios que queremos obtener
        .exec();

    res.json({
        ok: true,
        user
    });
});


export default usuarioRutas;