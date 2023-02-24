//imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


//configuración de variables
const router = express.Router();
const app = express();
app.use(router);

//configuracion de servidor
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);



//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Rutas

app.use(require('./src/routes/Salas'));



//Sever
app.listen(app.get('port'), () => {
    console.log(`Server Running on port ${app.get('port')}`);
});