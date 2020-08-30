import Server from "./class/Server"
import usuarioRutas from "./routes/usuario";
import mongoose from 'mongoose';
import bodyParser, { urlencoded } from "body-parser";

//levantamos el server
const serverOne: Server = new Server();

//Body parser
serverOne.app.use(bodyParser.urlencoded({extended: true}));
serverOne.app.use(bodyParser.json());

//rutas
serverOne.app.use('/usuario', usuarioRutas);


//configurar conexion a la db
mongoose.connect(
    'mongodb://localhost:27017/fedeDJBase',
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false},
    (err) => {
        if(err){ 
            throw 'err'
        }else{
            console.log("Base de datos ONLINE");
        }
    } 
)


serverOne.start(()=>{
    console.log(`Server run on port ${serverOne.port}`);
})