import jwt, { decode } from "jsonwebtoken"

export default class Token{
    private static semilla: string = "semilla-seed,privacidadYPropia-FedeDJ";
    private static caducidad: string = "1800"; // media hora

    constructor(){

    }

    public static getToken(payload: any): String{
        return jwt.sign({
            usuario: payload
        }, this.semilla, {expiresIn: this.caducidad})
    }

    public static comprobarToken(userToken: string){
        return new Promise((resolve, reject)=>{
            jwt.verify(userToken, this.semilla, (err, decoded)=>{
                if(err){
                    reject();
                }else{
                    resolve(decoded);
                }
            })
        })
    }
}