"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const Token_1 = __importDefault(require("../class/Token"));
exports.verificarToken = (req, res, next) => {
    const usuarioToken = req.get("myToken") || "";
    Token_1.default.comprobarToken(usuarioToken).then((decoded) => {
        req.usuario = decoded.usuario;
        next();
    }).catch(err => {
        res.json({
            ok: false,
            mensaje: "Token Invalido",
            err
        });
    });
};
