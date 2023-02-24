const mysql = require('mysql');



  let QueryFunction =async (query)=>{
    let respuesta;
    let promise=new Promise(async (resolve, reject) => {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "SalonesDB"
      });
    
       con.connect(function(err) {
        if (err) throw err;
        //console.log(query);
        con.query(query, async function (err, result, fields) {
          if (err) throw err;
          
          respuesta = await result;
          resolve(result);
        });
      });
    });


  
    return promise;
  ////console.log(respuesta);
  
  
};

module.exports =QueryFunction;