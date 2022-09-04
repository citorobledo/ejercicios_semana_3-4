/*Actividad práctica: Deberán realizar los siguientes programas y enviarme los 3 archivos
JS, para lo cual podrán utilizar gitlab/github o bien un correo con los archivos adjuntos
para su revisión.
Ejercicios:

1) Inserción y actualización de un registro.
*/

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


// Crea la clase Usuarios que representa la tabla usuarios en la base de datos
class Usuarios extends Sequelize.Model {}// permite definir la estructura de una tabla en la base de datos
Usuarios.init({
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
}, { sequelize, modelName: 'usuarios' });// el modelName es el nombre de la tabla en la base de datos


// Crea Usuario
sequelize.sync()
  .then(() => Usuarios.create({//crea un registro en la tabla Usuarios
    firstName: 'Javier',
    lastName: 'Robledo'
  }))
  .then(Javi => {
    console.log(Javi.toJSON());
  })

//actualiza Usuario
  .then(() => Usuarios.update({ firstName: "Jose" }, {//actualiza el registro en la tabla Usuarios
    where: {
      lastName: "Robledo",
    }
  }))
  .then(() => {
    console.log("Registro Actualizado");
  });

