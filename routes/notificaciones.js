/**
 * Created by Walter Suazo on 07/03/2016.
 */

var notificacionModel = require('../models/Notificaciones');
var async = require('async');
var underscore = require('underscore')

exports.listar = function(req,res,next)
{
  usuario = req.user;
  notificacionModel.listar(usuario,function(error,data){
    if(data )
    {
      data = underscore.groupBy(data,'nombre')
      res.send({msg:true,
        info: data,
        cantidad: data.length});
    }
    else
    {
      res.send({"msg":false});
    }
  });
}

function joinValues(notificacionesId, unidades){
  d=[];
  for(value in unidades){
    d[value]="("+notificacionesId+","+unidades[value]+")";
  }
  d= d.join();
  return d;
}

exports.guardar = function(req,res)
{
  console.log(req.body);
  unidades=req.body.unidades;
  evento=req.body.evento;
  var Data=
  {

    nombre:req.body.nombre,
    correo:req.body.correos,
    FK_UsuarioId:req.user
  }

  console.log(Data)

  notificacionModel.guardar(Data,function(error,data)
  {
    if(error)
    {
      console.log(error);
      res.send({msg:false});
    }
    else
    {
      id=data.insertId;
      dataUnidades=joinValues(id,unidades);
      dataEventos="("+id+","+evento+")";
      console.log(dataUnidades);
      async.parallel([
        function(callback)
        {
          console.log(dataUnidades)
          notificacionModel.Unidades(dataUnidades,function(err,data){
            if(err) return callback(err);
            callback();
          });
        },
        function(callback)
        {
          console.log(dataEventos)
          notificacionModel.Evento(dataEventos,function(err,data){
            if(err) return callback(err);
            callback();
          });
        }
    ],function(err){
        if(err){
          console.log(err)
          res.send({msg:false})
        }else
        {
          res.send({msg:true})
        }

      });
    }

  });
}


exports.eliminar = function(req,res,next)
{
  id = req.body.id;

  notificacionModel.eliminar(id,function(error,data){
    if(data )
    {
      res.send({msg:true});
    }
    else
    {
      res.send({msg:false});
      console.log(error);
    }
  });
}

function deletingValues(idNoti,deletes,estado){
  d=[];
  i=0;
  if(estado){
    for (value in deletes){
      if(deletes[value].estado){
        d[i]="("+idNoti+","+deletes[value].id+")";
        i++;
      }
    }
  }
  else{
    for (value in deletes){
      if(!deletes[value].estado){
        d[i]="("+idNoti+","+deletes[value].id+")";
        i++;
      }
    }
  }

  d= d.join();
  return d;
}

exports.modificar = function(req,res)
{
  var id = req.body.id;
  var Data={};
  var DataUnidades={};
  var DeleteUnidades={};
  var DataEventos={};
  var DeleteEventos={};

  if(typeof req.body.nombre==="undefined"){}else
  {
    Data['nombre']=req.body.nombre;
  }
  if(typeof req.body.correos==="undefined"){}else
  {
    Data['correo']=req.body.correos;
  }
  if(typeof req.body.usuario==="undefined"){}else{
    Data['FK_UsuarioId']=req.body.usuario;
  }

  if(req.body.unidades)
  {
    DataUnidades= deletingValues(id,req.body.unidades,true);
    DeleteUnidades=deletingValues(id,req.body.unidades,false);
    console.log(DataUnidades)
  }

  if(req.body.evento)
  {
    DataEventos=deletingValues(id,req.body.evento,true);
    DeleteEventos=deletingValues(id,req.body.evento,false);
    console.log(DataEventos)
  }

  if (Object.keys(Data).length<1)
  {
    res.sendStatus(400);
    console.log("bad request");
  }else
  {

    notificacionModel.update(id,Data,function(error,data){
      if(error)
      {
        console.log(error);
        res.send(500);
      }
      else
      {
        //res.sendStatus(200);
        async.parallel([
          function(callback){
            if(typeof DataUnidades[0]==="undefined"){
              console.log("callback")
              callback();
            }else if(!(typeof DataUnidades[0]==="undefined")){
              notificacionModel.Unidades(DataUnidades,function(err,data){
                if (err) return callback("Insert Uni "+err);
                callback();
              });
            }

          },
            function(callback){
              if(typeof DeleteUnidades[0]==="undefined"){
                console.log("callback")
                callback();
              }else if(!(typeof DeleteUnidades[0]==="undefined")){
                notificacionModel.deleteUnidades(DeleteUnidades,callback,function(err2,data2){
                  if(err2) return callback("Delete Uni "+err2);

                  callback();
                });
              }
            },
            function(callback){
              if(typeof DataEventos[0]==="undefined"){
                console.log("callback")
                callback();
              }else if(!(typeof DataEventos[0]==="undefined")){
                notificacionModel.Evento(DataEventos,function(err,data){
                  if (err) return callback("Insert Ev "+err);

                  callback();
                });

              }
            },
            function(callback){
              if(typeof DeleteEventos[0]==="undefined"){
                console.log("callback")
                callback();
              }else if(!(typeof DeleteEventos[0]==="undefined")){
                notificacionModel.deleteEventos(DeleteEventos,callback,function(err2,data2){
                  if(err2) return callback("Delete Ev "+err2);

                  callback();
                });
              }
            }
        ],function(err){
          if(err){
            console.log("ASYNC"+err)
            res.send({msg:false})
          }else{
            res.send({msg:true})
          }
        });
      }

    });
  }

}
