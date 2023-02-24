
const express= require('express');
const Router= express.Router();
const QueryFunction= require('./BD');
var mysql = require('mysql');












Router.post("/AgregarSalon",async(req,res)=>{
    const datos=req.body.data;


    //console.log(datos);

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "SalonesDB"
      });
      
      con.connect(function(err) {
        
        //console.log("Connected!");
        var sql = "INSERT INTO Salones (Nombre,Contrasena,Descripcion) VALUES ('"+datos.Nombre+"','"+datos.Contrasena+"','"+datos.Descripcion+"')";
        con.query(sql, function (err, result) {
          if (err) {
           
            
            res.json({correcto:0});}
        else{
          //console.log(result.insertId);
          res.json({correcto:1});
        }


          
        });
      });


    

});
Router.get("/ObtenerSalas",async(req,res)=>{
    

  let respuesta=QueryFunction("SELECT * FROM Salones");
  respuesta.then((result)=>{
    res.json(result);
  });
    
          
          
        
      


    

});
Router.get("/GetReservacionesSalonFecha/:idSalon/:fecha",async(req,res)=>{
  let id=req.params.idSalon;
  let fecha=req.params.fecha;

  let respuesta=QueryFunction("SELECT * FROM `reservacion` where idSalon="+id+" and fecha='"+fecha+"';");
    respuesta.then((result)=>{
      //console.log(result);
      res.json(result);
    });
   

});


Router.post("/NuevaReservacion",async(req,res)=>{
  const data=req.body.data;
  //console.log(data);
  let respuesta=QueryFunction("INSERT INTO reservacion(idSalon,persona,fecha,horaI,horaf,Contrasena) VALUES("+data.IdSalon+",'"+data.Nombre+"','"+data.Fecha+"','"+data.HoraI+"','"+data.HoraF+"','"+data.Contrasena+"');");
  respuesta.then((result)=>{
    ////console.log(result);

    if(result.insertId>0){
      res.json(true);
    }
    
  });


  

});

Router.get("/ReservacionesSalonMes/:idSalon/:mes",async(req,res)=>{
  let id=req.params.idSalon;
  let mes=req.params.mes;

  let respuesta=QueryFunction("SELECT * FROM `reservacion` where idSalon="+id+";");
    respuesta.then((result)=>{
      //console.log(result);
      res.json(result);
    });

});


Router.delete("/EliminarSalon/:idSalon",async(req,res)=>{
  let id=req.params.idSalon;
  //console.log("Eliminar salon");
  
  let respuesta1=await QueryFunction("Delete from reservacion where idSalon="+id+";");
  

  let respuesta=QueryFunction("DELETE FROM `salones` WHERE Id="+id+";");
    respuesta.then((result)=>{
      if(result.affectedRows>0){
        res.json({correcto:1});
      }
    });

});


Router.put("/ModificarSalon",async(req,res)=>{
  const data=req.body.data;
  //console.log(data);
  let respuesta=QueryFunction("UPDATE `salones` SET `Descripcion` = '"+data.Descripcion+"', `Nombre` = '"+data.Nombre+"' WHERE `Id` ="+data.Id+";");
  respuesta.then((result)=>{
   //console.log(result);

    if(result.changedRows>0){
      res.json({correcto:1});
    }
    
  });


  

});

module.exports=Router;