/**
 * Created by Walter Suazo on 26/07/2015.
 */
var middleware= require('../bin/middelware');

var rolm = require("../models/PrivilegioRol");
function requireRole() {

  return function(req, res, next) {

    var ruta =req.originalUrl.split("?",1)[0];
    var accion=req.method;
    rolm.listar(ruta,accion,function(err,data){
      var currRol= req.rol;

      if(err)
      {
        res.sendStatus(500);
      }else
      {
        existe=false;
        for (i in data)
        {
          var permitido = data[i].rol;
        if( permitido === currRol){
          existe=true;
        }
        }
        if(existe)
        {
          next();
        }else
        {
          res.sendStatus(403);
        }
      }
    });

  }
}

var validate=require('express-validation');
var joi=require('joi');
var validation=require('./Validations');
var pmx   = require('pmx');
var probe = pmx.probe();

exports = module.exports = function(app) {
    //::::::::::::::::::::::::::Inicio y Main::::::::::::::::::::::::::::::::::::::::::::::::::::
    {
        app.get('/', require('./index').init);
        app.post('/login', require('./index').login);
        app.get('/login', require('./index').loginInvitado);


      app.post('/login2',validate(validation.login),require('./index').login2);
    }
    //::::::::::::::::::::::::::Geocercas:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    {
        app.get('/geocercas/:visible(true|false)', middleware.ensureAuthenticated,requireRole(), require('./geocercas').init);
        app.get('/geocercas', middleware.ensureAuthenticated,requireRole(), require('./geocercas').todas);
        app.post('/geocercas', middleware.ensureAuthenticated,requireRole(), validate(validation.geogercas.guardar), require('./geocercas').guardar);
        app.put('/geocercas', middleware.ensureAuthenticated,requireRole(), validate(validation.geogercas.modificar), require('./geocercas').modificar);
        app.delete('/geocercas', middleware.ensureAuthenticated,requireRole(), validate(validation.geogercas.eliminar), require('./geocercas').eliminar);
        app.get('/geocercas/unidades',middleware.ensureAuthenticated,requireRole(),require('./geocercas').unidadesPorGeocerca);
    }

    //:::::::::::::::::::::::Unidades:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    {
        app.get('/unidades', middleware.ensureAuthenticated,requireRole(), validate(validation.unidades.getAll), require('./unidades').getAll);
        app.put('/unidades',middleware.ensureAuthenticated,requireRole(),validate(validation.unidades.Update),require('./unidades').Update);
        app.post('/unidades',middleware.ensureAuthenticated,requireRole(),validate(validation.unidades.post),require('./unidades').post);
        app.delete('/unidades',middleware.ensureAuthenticated,requireRole(),validate(validation.unidades.delete),require('./unidades').delete);
        app.put('/barcode',middleware.ensureAuthenticated,requireRole(),require('./unidades').SetBarcode);
        app.get('/detenidos',middleware.ensureAuthenticated,requireRole(),require('./unidades').getDetenidos);
        app.get('/limitevelocidad',middleware.ensureAuthenticated,requireRole(),require('./unidades').getlimiteVelocidad);
        app.get('/limitevelocidadDetalle',middleware.ensureAuthenticated,requireRole(),require('./unidades').getlimiteVelocidadDetalle);
        app.get('/unidadesSinReporte',middleware.ensureAuthenticated,require('./unidades').getUnitsNoReport);
        app.get('/excesosMayores75',middleware.ensureAuthenticated,require('./unidades').excesosMayor75);
        app.get('/unidades/CH',middleware.ensureAuthenticated,require('./unidades').getCH);
        app.get('/unidades/empresas',middleware.ensureAuthenticated,require('./unidades').getListaUnidadesPorEmpresa);
        app.get('/unidadesAlertas',middleware.ensureAuthenticated,require('./eventos').unidadesSinReportar);
    }

    //:::::::::::::::::::::::::Usuarios:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    {
   //     app.get('/usuarios',middleware.ensureAuthenticated, requireRole(),require('./users').get);
   //     app.post('/usuarios',middleware.ensureAuthenticated, requireRole(),require('./users').crear);
   //     app.put('/usuarios',middleware.ensureAuthenticated,requireRole(), require('./users').put);
        app.post('/resetPass',middleware.ensureAuthenticated,requireRole(),validate(validation.users.reset),require('./users').reset);
    }

    //:::::::::::::::::::::::::::::::Geocode::::::::::::::::::::::::::::::::::::::::::::::::::::::
    {
        app.get('/geocoder', middleware.ensureAuthenticated,validate(validation.geocode.init),require('./geocode').init);
        app.get('/geocode',require('./geocode').init);
    }
    //:::::::::::::::::::::::::::::::Referencias::::::::::::::::::::::::::::::::::::::::::::::::::
    {
        app.get('/referencias/iconos', middleware.ensureAuthenticated,require('./referencias').referenciasIconos);
        app.delete('/referencias', middleware.ensureAuthenticated,requireRole(), validate(validation.referencias.eliminar),require('./referencias').eliminar);
        app.post('/referencias', middleware.ensureAuthenticated,requireRole(), validate(validation.referencias.guardar),require('./referencias').guardar);
        app.get('/referencias', middleware.ensureAuthenticated,requireRole(), validate(validation.referencias.listar),require('./referencias').listar);
        app.put('/referencias',middleware.ensureAuthenticated,require('./referencias').modificar);
    }
    //:::::::::::::::::::::::::::::::Ultimas Posiciones:::::::::::::::::::::::::::::::::::::::::::
    {
    //app.get('/posiciones',middleware.ensureAuthenticated,require('./posiciones').listar);

        app.get('/posiciones', middleware.ensureAuthenticated,requireRole(), validate(validation.posiciones.listar),require('./posiciones').listar);
    }
    //::::::::::::::::::::::::::::::::::Ultimos Comandos:::::::::::::::::::::::::::::::::::::::::::
    {
        app.post('/comandos/posicion', middleware.ensureAuthenticated,requireRole(), validate(validation.comandos.posicion),require('./comandos').posicion);
        app.post('/comandos/llavines', middleware.ensureAuthenticated,requireRole(), validate(validation.comandos.llavines),require('./comandos').llavines);
        app.post('/comandos/apagar', middleware.ensureAuthenticated,requireRole(), validate(validation.comandos.apagar),require('./comandos').apagar);
        app.post('/comandos/habilitar', middleware.ensureAuthenticated,requireRole(), validate(validation.comandos.habilitar),require('./comandos').habilitar);
        app.post('/comandos/otro', middleware.ensureAuthenticated,requireRole(), validate(validation.comandos.otro),require('./comandos').otro);
    }
    //::::::::::::::::::::::::::::Bitacoras::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    {
        app.get('/bitacoras/sesion', middleware.ensureAuthenticated,requireRole(), validate(validation.bitacora.ultimaSesion),require('./bitacora').ultimaSesion);
        app.get('/bitacoras/eventos', middleware.ensureAuthenticated,requireRole(), validate(validation.bitacora.ultimosEventos),require('./bitacora').ultimosEventos);
    }
    //::::::::::::::::::::::::::::Eventos::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    {
        app.get('/listaEventos', middleware.ensureAuthenticated,requireRole(),require('./eventos').getList);
        app.get('/eventos', middleware.ensureAuthenticated,requireRole(),validate(validation.eventos.getEvento),require('./eventos').getEvento);
        app.get('/eventos/all', middleware.ensureAuthenticated,requireRole(),validate(validation.eventos.getAllEventos),require('./eventos').getAllEventos);
        app.get('/alertas', middleware.ensureAuthenticated,requireRole(),require('./eventos').Alerta);
        app.get('/alertasDetenidos',middleware.ensureAuthenticated,requireRole(),require('./eventos').detenidos);
        app.get('/alertasDetenidos30',middleware.ensureAuthenticated,require('./eventos').detenidosAutorizados30);
        app.get('/alertasSinReportar',middleware.ensureAuthenticated,require('./eventos').sinReportar);
        app.put('/agregarComentario', middleware.ensureAuthenticated, require('./eventos').agregarComentario);
    }
    //::::::::::::::::::::::::::::::iconos::::::::::::::::::::::::::::::::::
    {
        app.post('/iconos', middleware.ensureAuthenticated,requireRole(),validate(validation.iconos.add),require('./iconos').add);
        app.get('/iconos', middleware.ensureAuthenticated,requireRole(),validate(validation.iconos.get),require('./iconos').get);
    }
    //:::::::::::::::::::::::::::recorridos:::::::::::::::::::::::::::::::::::::::
    {
        app.get('/recorridos', middleware.ensureAuthenticated,requireRole(),validate(validation.recorridos.getPuntos),require('./recorridos').getPuntos);
        app.post('/recorridosHora',middleware.ensureAuthenticated,requireRole(),validate(validation.recorridos.getRecorridosHora),require('./recorridos').getRecorridosHora);
    }
    //::::::::::::::::::::::::::categorias:::::::::::::::::::::::::::::::::::::::..
    {
      app.get('/categorias',middleware.ensureAuthenticated,requireRole(),validate(validation.categorias.listar),require('./categorias').listar);
      app.post('/categorias',middleware.ensureAuthenticated,requireRole(),validate(validation.categorias.guardar),require('./categorias').guardar);
      app.delete('/categorias',middleware.ensureAuthenticated,requireRole(),validate(validation.categorias.eliminar),require('./categorias').eliminar);
      app.put('/categorias',middleware.ensureAuthenticated,requireRole(),validate(validation.categorias.modificar),require('./categorias').modificar);

    }
    

    //::::::::::::::::::::::::::::filtros:::::::::::::::::::::::::::::::::::::::::
    {
      app.get('/filtros',middleware.ensureAuthenticated,validate(validation.filtros.get),require('./filtros').get);
      app.post('/filtros',middleware.ensureAuthenticated,validate(validation.filtros.post),require('./filtros').post);
      app.delete('/filtros',middleware.ensureAuthenticated,validate(validation.filtros.delete),require('./filtros').delete);
      app.put('/filtros',middleware.ensureAuthenticated,validate(validation.filtros.put),require('./filtros').put);
    }

  //::::::::::::::::::::::::::::empresas:::::::::::::::::::::::::::::::::::::::::
  {
    app.get('/empresas',middleware.ensureAuthenticated,validate(validation.empresas.get),require('./empresas').get);
    app.post('/empresas',middleware.ensureAuthenticated,validate(validation.empresas.post),require('./empresas').post);
    app.delete('/empresas',middleware.ensureAuthenticated,validate(validation.empresas.delete),require('./empresas').delete);
    app.put('/empresas',middleware.ensureAuthenticated,validate(validation.empresas.put),require('./empresas').put);
  }

  //:::::::::::::::::::::::::::Roles::::::::::::::::::::::::::::::::::::::
  {
    app.get('/roles',middleware.ensureAuthenticated,require('./roles').get);
    app.post('/roles',middleware.ensureAuthenticated,validate(validation.roles.post),require('./roles').post);
    app.delete('/roles',middleware.ensureAuthenticated,validate(validation.roles.delete),require('./roles').delete);
    app.put('/roles',middleware.ensureAuthenticated,validate(validation.roles.put),require('./roles').put);
  }

  //:::::::::::::::::::::::::::Privilegios::::::::::::::::::::::::::::::::::::::
  {
    app.get('/privilegios/',middleware.ensureAuthenticated,require('./privilegios').get);
    app.get('/privilegios',middleware.ensureAuthenticated,require('./privilegios').get);
    app.post('/privilegios',middleware.ensureAuthenticated,require('./privilegios').post);
    app.delete('/privilegios',middleware.ensureAuthenticated,require('./privilegios').delete);
    app.put('/privilegios',middleware.ensureAuthenticated,require('./privilegios').put);
  }

  //:::::::::::::::::::::::::::PrivilegiosRol::::::::::::::::::::::::::::::::::::::
  {
    app.get('/privilegiosrol',middleware.ensureAuthenticated,require('./privilegiosrol').get);
    app.post('/privilegiosrol',middleware.ensureAuthenticated,require('./privilegios').post);
    app.delete('/privilegiosrol',middleware.ensureAuthenticated,require('./privilegios').delete);
    app.put('/privilegiosrol',middleware.ensureAuthenticated,require('./privilegios').put);
  }


  //:::::::::::::::::::::::::::UnidadesEmpresa::::::::::::::::::::::::::::::::::::::
  {
    app.get('/unidadesempresas',middleware.ensureAuthenticated,require('./unidadesEmpresas').get);
    app.post('/unidadesempresas',middleware.ensureAuthenticated,require('./unidadesEmpresas').post);
    app.delete('/unidadesempresas',middleware.ensureAuthenticated,require('./unidadesEmpresas').delete);
    app.put('/unidadesempresas',middleware.ensureAuthenticated,require('./unidadesEmpresas').put);
  }


  //:::::::::::::::::::::::::::Notificaciones:::::::::::::::::::::::::::::::::::::::
  {
    app.get('/notificaciones',middleware.ensureAuthenticated,validate(validation.notificaciones.listar),require('./notificaciones').listar);
    app.post('/notificaciones',middleware.ensureAuthenticated,validate(validation.notificaciones.guardar),require('./notificaciones').guardar);
    app.delete('/notificaciones',middleware.ensureAuthenticated,validate(validation.notificaciones.eliminar),require('./notificaciones').eliminar);
    app.put('/notificaciones',middleware.ensureAuthenticated,validate(validation.notificaciones.modificar),require('./notificaciones').modificar);

  }

    //:::::::::::::::::::::::::::Cambio de clientes 'Super Usuario':::::::::::::::::::::::::::::::::::::::
    {
        app.get('/usuarios',middleware.ensureAuthenticated,validate(validation.usuarios.getUsuarios),require('./usuarios').getUsuarios);
        app.post('/generarAcceso',middleware.ensureAuthenticated,validate(validation.usuarios.getAcceso),require('./usuarios').getAcceso);
    }

    //::::::::::::::::::::::::::::::Visitas:::::::::::::::::::::::::::::::::::::::::::::::
  {
     app.post('/generarVisita',middleware.ensureAuthenticated,validate(validation.usuarios.getAccesoVisita),requireRole(),require('./usuarios').getAccesoVisita);
     app.post('/accesoSeguimiento',middleware.ensureAuthenticated,require('./usuarios').getAccesoSeguimiento);

     app.get('/invitado',validate(validation.usuarios.invitado),require('./usuarios').invitado);
     app.get('/listaPosicion',middleware.visitAuthenticated,validate(validation.posiciones.listado),require('./posiciones').listado);
     app.get('/Posicion',middleware.visitAuthenticated,validate(validation.posiciones.Posicion),require('./posiciones').Posicion);
  }

    //:::::::::::::::::::::::::Conductores::::::::::::::::::::::::::::::::::
    {
        app.post('/conductores',middleware.ensureAuthenticated,validate(validation.conductores.crear),require('./conductores').crear);
        app.get('/conductores',middleware.ensureAuthenticated,validate(validation.conductores.listar),require('./conductores').listar);
        app.get('/conductoresDisponibles',middleware.ensureAuthenticated,validate(validation.conductores.listar),require('./conductores').listarConductoresDisponbles);
        app.put('/conductores',middleware.ensureAuthenticated,validate(validation.conductores.actualizar),require('./conductores').actualizar);
        app.delete('/conductores',middleware.ensureAuthenticated,validate(validation.conductores.eliminar),require('./conductores').eliminar);
        app.get('/conductores/viaje',middleware.ensureAuthenticated,require('./conductores').conductorSinViaje);
    }

    //::::::::::::::::::::::::::Reportes::::::::::::::::::::::::::::::::::
    {
        app.get('/reportAcceso',middleware.ensureAuthenticated,validate(validation.reportes.getRepAcceso),require('./reportes').getRepAcceso);
        app.get('/reportAccFecha',middleware.ensureAuthenticated,validate(validation.reportes.getRepAccFecha),require('./reportes').getRepAccFecha);
    }

    app.get('/monitoreo',require('./monitoreo').monitoreo);

    //:::::::::::::::::::::::::::Paradas::::::::::::::::::::::::::::
    {
        app.post('/paradas',middleware.ensureAuthenticated,requireRole(),validate(validation.paradas.crearParada),require('./paradas').crearParada);
        app.put('/paradas',middleware.ensureAuthenticated,requireRole(),validate(validation.paradas.putParada),require('./paradas').putParada);
        app.get('/paradas',middleware.ensureAuthenticated,requireRole(),validate(validation.paradas.getParadas),require('./paradas').getParadas);
        app.delete('/paradas',middleware.ensureAuthenticated,requireRole(),validate(validation.paradas.deleteParada),require('./paradas').deleteParada);
        app.get('/paradas/true',middleware.ensureAuthenticated,requireRole(),validate(validation.paradas.getNoAutorizadas),require('./paradas').getNoAutorizadas);
    }

    //::::::::::::::::::::::::::Enlaces::::::::::::::::::::::::::::::
    {
        app.get('/enlazados',middleware.ensureAuthenticated,require('./enlaces').listaEnlazados);
        app.get('/unidadesSinEnlace',middleware.ensureAuthenticated,require('./enlaces').listarUnidadesSinEnlace);
        app.get('/rastraSinEnlace',middleware.ensureAuthenticated,require('./enlaces').listaRastrasSinEnlace);
        app.post('/enlazar',middleware.ensureAuthenticated,require('./enlaces').enlazar);
        app.delete('/desenlazar',middleware.ensureAuthenticated,require('./enlaces').desenlazar);
        app.post('/rastras',middleware.ensureAuthenticated,require('./enlaces').crearRastra);
        app.get('/rastras',middleware.ensureAuthenticated,require('./enlaces').listarRastras);
        app.put('/rastras',middleware.ensureAuthenticated,require('./enlaces').editarRastra);
    }

    //::::::::::::::::::::::::::::::Transferencias::::::::::::::::::::::
    app.get('/transferencias',middleware.ensureAuthenticated,require('./transferencias').listar);
    app.get('/transferencias/terminadas',middleware.ensureAuthenticated,require('./transferencias').listarTransferenciasTerminadas);
    app.post('/transferencias',middleware.ensureAuthenticated,require('./transferencias').guardar);
    app.put('/transferencias',middleware.ensureAuthenticated,require('./transferencias').edit);
    app.get('/transferencias/check',middleware.ensureAuthenticated,require('./transferencias').check);
    app.post('/sat', require('./transferencias').sat);

    //::::::::::::::::::::::::::::::ViajeCompleto::::::::::::::::::::::::::
    app.get('/viajeCompleto',middleware.ensureAuthenticated,require('./viajeCompleto').listar);
    app.get('/viajes',middleware.ensureAuthenticated,require('./viajes').getViajes);
    app.get('/viajes/finalizado',middleware.ensureAuthenticated,require('./viajes').getfinalizados);

    app.get('/viajes/detenidos',middleware.ensureAuthenticated,require('./viajes').getparadas);
    app.get('/viajes/velocidades',middleware.ensureAuthenticated,require('./viajes').getvelocidades);
    app.get('/viajes/eventos',middleware.ensureAuthenticated,require('./viajes').geteventos);
    app.get('/viajes/excesos',middleware.ensureAuthenticated,require('./viajes').getexcesos);
    app.get('/viajes/cd',middleware.ensureAuthenticated,require('./viajes').getunidadescd);
    app.put('/viajes/cancelar',middleware.ensureAuthenticated,require('./viajes').cancelar);
    app.get('/viajes/uniSinTransf',middleware.ensureAuthenticated,require('./viajes').uniSinTransf);
    app.get('/viajes/tiempos',middleware.ensureAuthenticated,require('./viajes').tiemposViajes);


    // ........................TURNOS ......................................................
    
    app.get('/turnos',middleware.ensureAuthenticated,require('./turnos').getturnos);
    app.delete('/turnos',middleware.ensureAuthenticated,require('./turnos').deleteturno);    
    app.post('/turnos',middleware.ensureAuthenticated,require('./turnos').insertturno);
    app.put('/turnos',middleware.ensureAuthenticated,require('./turnos').updateturno);
    app.get('/turnos/',middleware.ensureAuthenticated,require('./turnos').getturnos);


    // --------------------- EstadosUnidades ----------------------------------------
    app.get('/estadosunidades',middleware.ensureAuthenticated,require('./estadosunidades').getestadosunidades);
    app.post('/estadosunidades',middleware.ensureAuthenticated,require('./estadosunidades').insertestadosunidades);
    app.delete('/estadosunidades',middleware.ensureAuthenticated,require('./estadosunidades').deleteestadosunidades);
    app.put('/estadosunidades',middleware.ensureAuthenticated,require('./estadosunidades').updateestadosunidades);
    
    //------------ proyeccion plan turnos ------------------------------------------------------

    app.get('/proyeccionplanturnos',middleware.ensureAuthenticated,require('./proyeccionplanturnos').getproyeccionplanturnos);
    app.post('/proyeccionplanturnos',middleware.ensureAuthenticated,require('./proyeccionplanturnos').insertproyeccionplanturnos);
    app.delete('/proyeccionplanturnos',middleware.ensureAuthenticated,require('./proyeccionplanturnos').deleteproyeccionplanturnos);
    app.put('/proyeccionplanturnos',middleware.ensureAuthenticated,require('./proyeccionplanturnos').updateproyeccionplanturnos);
   

   /// ------ unidadesdisponibles --------------------------------------------------------------
   app.get('/unidadesdisponibles',middleware.ensureAuthenticated,require('./unidadesdisponibles').getunidadesdisponibles);
   app.post('/unidadesdisponibles',middleware.ensureAuthenticated,require('./unidadesdisponibles').insertunidadesdisponibles);
   app.delete('/unidadesdisponibles',middleware.ensureAuthenticated,require('./unidadesdisponibles').deleteunidadesdisponibles);
   app.put('/unidadesdisponibles',middleware.ensureAuthenticated,require('./unidadesdisponibles').updateunidadesdisponibles);
   app.post('/Disponibilidadunidadessemanal',middleware.ensureAuthenticated,require('./unidadesdisponibles').insertDisponibilidadunidadessemanal);
   app.get('/Disponibilidadunidadessemanal',middleware.ensureAuthenticated,require('./unidadesdisponibles').getDisponibilidadunidadessemanal);
   app.get('/unidadesdisponiblesonline',middleware.ensureAuthenticated,require('./unidadesdisponibles').getunidadesdisponiblesonline);
 
   

  // ============= ProyeccionPlan --------------------------------------------///////////////////////
  
  app.get('/proyeccionplan',middleware.ensureAuthenticated,require('./proyeccionplan').getproyeccionplan);
  app.post('/proyeccionplan',middleware.ensureAuthenticated,require('./proyeccionplan').insertproyeccionplan);
  app.put('/proyeccionplan',middleware.ensureAuthenticated,require('./proyeccionplan').updateproyeccionplan);
  app.delete('/proyeccionplan',middleware.ensureAuthenticated,require('./proyeccionplan').deleteproyeccionplan);
  

  /// --------- proyeccion plan unidades ------------------------------///////////////////////////
  app.get('/proyeccionplanunidades',middleware.ensureAuthenticated,require('./proyeccionplanunidades').getproyeccionplanunidades);
  app.post('/proyeccionplanunidades',middleware.ensureAuthenticated,require('./proyeccionplanunidades').insertproyeccionplanunidades);
  app.put('/proyeccionplanunidades',middleware.ensureAuthenticated,require('./proyeccionplanunidades').updateproyeccionplanunidades);
  app.delete('/proyeccionplanunidades',middleware.ensureAuthenticated,require('./proyeccionplanunidades').deleteproyeccionplanunidades);
  
 
  /// ----------  Tipo de fallas -------------------//////////////////////////////
  app.get('/tipofalla',middleware.ensureAuthenticated,require('./tipofalla').gettipofalla);
  app.post('/tipofalla',middleware.ensureAuthenticated,require('./tipofalla').inserttipofalla);
  app.delete('/tipofalla',middleware.ensureAuthenticated,require('./tipofalla').deletetipofalla);
  app.put('/tipofalla',middleware.ensureAuthenticated,require('./tipofalla').updatetipofalla);
  
   /// ----------  Marca Vehiculo -------------------//////////////////////////////
   app.get('/marcavehiculo',middleware.ensureAuthenticated,require('./marcavehiculo').getmarcavehiculo);
   app.post('/marcavehiculo',middleware.ensureAuthenticated,require('./marcavehiculo').insertmarcavehiculo);
   app.delete('/marcavehiculo',middleware.ensureAuthenticated,require('./marcavehiculo').deletemarcavehiculo);
   app.put('/marcavehiculo',middleware.ensureAuthenticated,require('./marcavehiculo').updatemarcavehiculo);


  /// ----------  Modelo Vehiculo -------------------//////////////////////////////
  app.get('/modelovehiculo',middleware.ensureAuthenticated,require('./modelovehiculo').getmodelovehiculo);
  app.post('/modelovehiculo',middleware.ensureAuthenticated,require('./modelovehiculo').insertmodelovehiculo);
  app.delete('/modelovehiculo',middleware.ensureAuthenticated,require('./modelovehiculo').deletemodelovehiculo);
  app.put('/modelovehiculo',middleware.ensureAuthenticated,require('./modelovehiculo').updatemodelovehiculo);

 /// ----------  Modelo unidades -------------------//////////////////////////////
 app.get('/modeloUnidad',middleware.ensureAuthenticated,require('./modeloUnidad').getmodelounidad);
 app.post('/modeloUnidad',middleware.ensureAuthenticated,require('./modeloUnidad').insertmodelounidad);
 app.delete('/modeloUnidad',middleware.ensureAuthenticated,require('./modeloUnidad').deletemodelounidad);
 app.put('/modeloUnidad',middleware.ensureAuthenticated,require('./modeloUnidad').updatemodelounidad);


 
 /// ----------  Taller -------------------//////////////////////////////
 app.get('/taller',middleware.ensureAuthenticated,require('./taller').getttaller);
 app.post('/taller',middleware.ensureAuthenticated,require('./taller').inserttaller);
 app.delete('/taller',middleware.ensureAuthenticated,require('./taller').deleteTaller);
 app.put('/taller',middleware.ensureAuthenticated,require('./taller').updatetaller);

/// ----------  Ubicacoin -------------------//////////////////////////////
app.get('/ubicacion',middleware.ensureAuthenticated,require('./ubicacion').getubicacion);
app.post('/ubicacion',middleware.ensureAuthenticated,require('./ubicacion').insertubicacion);
app.delete('/ubicacion',middleware.ensureAuthenticated,require('./ubicacion').deleteubicacion);
app.put('/ubicacion',middleware.ensureAuthenticated,require('./ubicacion').updateubicacion);

 
/// ----------  Mantenimiento -------------------//////////////////////////////
app.get('/mantenimiento',middleware.ensureAuthenticated,require('./mantenimiento').getmantenimiento);
app.post('/mantenimiento',middleware.ensureAuthenticated,require('./mantenimiento').insertmantenimiento);
app.delete('/mantenimiento',middleware.ensureAuthenticated,require('./mantenimiento').deletemantenimiento);
app.put('/mantenimiento',middleware.ensureAuthenticated,require('./mantenimiento').updatemantenimiento);

/// ----------  Mecanico -------------------//////////////////////////////
app.get('/mecanicos',middleware.ensureAuthenticated,require('./mecanicos').getmecanico);
app.post('/mecanicos',middleware.ensureAuthenticated,require('./mecanicos').insertmecanico);
app.delete('/mecanicos',middleware.ensureAuthenticated,require('./mecanicos').deletmecanico);
app.put('/mecanicos',middleware.ensureAuthenticated,require('./mecanicos').updatemecanico);



app.get('/mecanicoss',require('./mecanicos').getmecanico);

}
 