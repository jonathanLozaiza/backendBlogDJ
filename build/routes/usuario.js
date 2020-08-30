"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../models/usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Token_1 = __importDefault(require("../class/Token"));
const auth_1 = require("../midlewares/auth");
const usuarioRutas = express_1.Router();
//crear usuario
usuarioRutas.post("/crear", (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        password: bcrypt_1.default.hashSync(req.body.password, 10)
    };
    //crear usuario en base de datos
    usuario_1.Usuario.create(usuario).then(usuarioDb => {
        res.json({
            ok: true,
            usuario: usuarioDb
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//login
usuarioRutas.post("/entrar", (req, res) => {
    usuario_1.Usuario.findOne({ nombre: req.body.nombre }, (err, usuarioDB) => {
        if (err)
            throw err;
        if (!usuarioDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid Data'
            });
        }
        if (usuarioDB.compararPassword(req.body.password)) {
            const myToken = Token_1.default.getToken({
                _id: usuarioDB._id,
                nombre: usuarioDB.nombre
            });
            res.json({
                ok: true,
                token: myToken
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: "Invalid Data"
            });
        }
    });
});
// Actualizar mi usuario
usuarioRutas.post('/update', auth_1.verificarToken, (req, res) => {
    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        password: req.body.password || req.usuario.password
    };
    usuario_1.Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        const miToken = Token_1.default.getToken({
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
usuarioRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usuario_1.Usuario.find()
        .limit(1) // Limit es para el número de usuarios que queremos obtener
        .exec();
    res.json({
        ok: true,
        user
    });
}));
exports.default = usuarioRutas;
