
const config = {
    user :'sa',
    password :'12345',
    server:'DESKTOP-AIH1CJ0',
    database:'Concesionario',
    options:{

        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'SQLEXPRESS'
         // instancename :'SQL Server'
    },
    port : 61865
}

/*// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "Administrador", 
      password: "Server.7321" 
    },
    type: "default"
  },
  server: "concesionarioserver.database.windows.net", 
  options: {
    database: "Concesionario", 
    encrypt: true
  }
};*/



module.exports = config; 