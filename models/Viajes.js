/**
 * Created by Walter Suazo on 17/11/2016.
 */
var pool = require('./conexion').pool;

var viajeModel ={};
viajeModel.get=function(empresa,callback) {

  pool.getConnection(function (err, connection) {

    if (connection) {
      query = 'call spViajesActuales('+empresa+');'
      console.log(query);
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}

viajeModel.getfinalizados=function(empresa,callback) {

  pool.getConnection(function (err, connection) {

    if (connection) {
      query = 'call spViajesFinalizados('+empresa+');'
      console.log(query);
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}

viajeModel.getDetalles=function(imei,inicio,callback) {

  pool.getConnection(function (err, connection) {

    if (connection) {
      query = 'call spViajesDetalles('+imei+','+inicio+');'
      console.log(query);
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}


viajeModel.getparadas=function(imei,inicio,callback) {

  pool.getConnection(function (err, connection) {

    if (connection) {
      query = 'call spParadasEnViaje('+imei+',"'+inicio+'");'
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}


viajeModel.getvelocidades=function(imei,inicio,callback) {

  pool.getConnection(function (err, connection) {

    if (connection) {
      query = 'call spVelocidadEnViajes('+imei+',"'+inicio+'");'
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}

viajeModel.geteventos=function(imei,inicio,callback) {

  pool.getConnection(function (err, connection) {

    if (connection) {
      query = 'call SPEventosEnViaje('+imei+',"'+inicio+'");'
      console.log(query);
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}

viajeModel.getExcesos=function (imei,inicio,callback) {
  pool.getConnection(function (err, connection) {

    if (connection) {
      query = 'call spExcesosVelocidad('+imei+',"'+inicio+'");'
      console.log(query);
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}

viajeModel.getUnidadesCD=function (empresa,callback) {
  pool.getConnection(function (err, connection) {

    if (connection) {
      query = 'call spTATCDViajes('+empresa+');'
      console.log(query);
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}

viajeModel.cancelar=function(transferencia,callback) {

  pool.getConnection(function (err, connection) {

    if (connection) {
      query = "call spCancelarViaje(" + transferencia.codigo + ",'" + transferencia.observacion + "'," +
           transferencia.estado + ");";
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}

viajeModel.getUniSinTransf = function(empresaId,callback) {
  pool.getConnection(function (err, connection) {

    if (connection) {
      query = 'call spUniSinTransferencia('+empresaId+');'
      console.log(query);
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}

viajeModel.getTiemposViaje = function(transferenciaId,callback) {
  pool.getConnection(function (err, connection) {
    if (connection) {
      query = 'call spTiemposViaje("'+transferenciaId+'");'
      console.log(query);
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          console.log('error');
          callback(error, null);
        } else {
          callback(null, row[0]);
        }

      });
    }
  });
}

module.exports=viajeModel;
