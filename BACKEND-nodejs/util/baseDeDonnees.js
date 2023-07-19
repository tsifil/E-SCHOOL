const mysql = require('mysql');

/*const data = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "gestionentretienvuejs",
  });*/

const data = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "g_eschool",
  });

  module.exports = data
