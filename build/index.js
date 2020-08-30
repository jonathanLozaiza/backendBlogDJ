"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./class/Server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
//levantamos el server
const serverOne = new Server_1.default();
//Body parser
serverOne.app.use(body_parser_1.default.urlencoded({ extended: true }));
serverOne.app.use(body_parser_1.default.json());
//rutas
serverOne.app.use('/usuario', usuario_1.default);
//configurar conexion a la db
mongoose_1.default.connect('mongodb://localhost:27017/fedeDJBase', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err) {
        throw 'err';
    }
    else {
        console.log("Base de datos ONLINE");
    }
});
serverOne.start(() => {
    console.log(`Server run on port ${serverOne.port}`);
});
