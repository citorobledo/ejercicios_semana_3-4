// 3) inserción y actualización de varios registros.

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
class Usuario extends Sequelize.Model {}// permite definir la estructura de una tabla en la base de datos
Usuario.init({
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
}, { sequelize, modelName: 'usuarios' });// el modelName es el nombre de la tabla en la base de datos


// Crear Usuarios
let usuarios = [{ firstName: 'Pedro', lastName: 'Aznar' }, { firstName: 'Juan', lastName: 'Perez' }, { firstName: 'Maria', lastName: 'Gonzalez' }];//array de usuarios
sequelize.sync()
  .then(() => {//el then es una promesa
    for (i in usuarios) {//recorre el array de usuarios
      Usuario.create({//crea un registro en la tabla Usuarios
        firstName: usuarios[i].firstName,
        lastName: usuarios[i].lastName
      })
      .then(usuario => {
        console.log('Usuario Creado:');
        console.log(usuario.toJSON());
      });
    }
  })
  .then(() => {//cuando se cumple la promesa anterior se ejecuta esta promesa
    //actualizar Usuario
    Usuario.update({ firstName: "Jose" }, {
      where: {
        firstName: "Pedro",
      }
    });

    Usuario.update({ lastName: "Lopez" }, {
      where: {
        lastName: "Perez",
      }
    });

    Usuario.update({ firstName: "Marta" }, {
      where: {
        firstName: "Maria",
      }
    })
    .then(() => {
    console.log("Registros Actualizados:");
    });
  });
