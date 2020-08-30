"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
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
});
usuarioSchema.method("compararPassword", function (password = "") {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model("Usuario", usuarioSchema);