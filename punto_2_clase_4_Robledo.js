// 2) inserción y eliminación de un registro.

const Sequelize = require('sequelize');// almacena la clase Sequelize de la libreria sequelize en la variable Sequelize

const sequelize = new Sequelize('clase_n4', 'root', '', {// le cambie el password por el de la base de datos
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' (es el motor de base de datos)*/
});

sequelize.authenticate()// verifica si la conexion se realizo correctamente
  .then(() => {// si la conexion se realizo correctamente se ejecuta el codigo dentro de la funcion then (then es una promesa)
    console.log('La conexion se estableció... \nConnection has been established successfully.');
  })
  .catch(err => {// si la conexion no se realizo correctamente se ejecuta el codigo dentro de la funcion catch
    console.error('Imposible conectar a la base de datos. \nUnable to connect to the database:', err);
  });

class Usuarios extends Sequelize.Model {}// permite definir la estructura de una tabla en la base de datos
  Usuarios.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
  }, { sequelize, modelName: 'usuarios' });// el modelName es el nombre de la tabla en la base de datos
  
// Crea Usuario
sequelize.sync()
  .then(() => Usuarios.create({//crea un registro en la tabla Usuarios
    firstName: 'Pedro',
    lastName: 'Aznar'
  }))
  .then(Pedro => {
    console.log('Usuario Creado:');
    console.log( Pedro.toJSON());
  })

//elimina usuario Pedro Aznar

  .then(() => Usuarios.destroy({//elimina un registro en la tabla Usuarios
    where: {
      firstName: 'Pedro', lastName: 'Aznar'
    }
  }))
  .then(() => {
  console.log("Elimine el Registro");
  });