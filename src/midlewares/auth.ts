import {Response, NextFunction} from "express"
import Token from "../class/Token"

export const verificarToken = (req: any, res: Response, next: NextFunction) => {
    
    const usuarioToken = req.get("myToken") || "";

    Token.comprobarToken(usuarioToken).then((decoded: any)=>{
        req.usuario = decoded.usuario;
        next();
    }).catch(err=>{
        res.json({
            ok:false,
            mensaje:"Token Invalido",
            err
        });
    })
}