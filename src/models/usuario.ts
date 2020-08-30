import {Schema, model, Document} from "mongoose";
import bcrypt from "bcrypt"

const usuarioSchema : Schema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, "El nombre es obligatorio"]
    },
    password: {
        type: String,
        unique: true,
        required: [true, "El password es obligatorio"]
    }
})

usuarioSchema.method("compararPassword", function(password: String = ""): boolean{
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    }
})

interface IYo extends Document {
    nombre: String,
    password: String,
    compararPassword(password: String): boolean
}

export const Usuario =  model<IYo>("Usuario", usuarioSchema);