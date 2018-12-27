    /**
 * Created by walter on 07-08-15.
 */
var express = require('express');
var _=require('underscore');

var geocercaModel = require('../models/Geocercas');


exports.init=function(req,res,next){
    empresa = req.empresa;
    if(req.params.visible ==="true")
    {
      geocercaModel.listarGeocercasTodas(empresa,function(error,data){

        if (error)
        {
          res.send({msg:false});
        } else
        if (typeof data !== 'undefined' &&  data.length >0 )
        {

          res.send({
            title : "Listado Geocercas",
            info : data
          });
        }else
        {
          res.send({msg:false});
        }
      })
    }    else
    {
      geocercaModel.listarGeocercas(empresa,function(error,data){

        if (error)
        {
          res.send({msg:false});
        } else
        if (typeof data !== 'undefined' &&  data.length >0 )
        {

          res.send({
            title : "Listado Geocercas",
            info : data
          });
        }else
        {
          res.send({msg:false});
        }
      })

    }

}


exports.todas=function(req,res,next){
    empresa = req.empresa;
    geocercaModel.listarGeocercas(empresa,function(error,data){

        if (error)
        {
          res.send({msg:false});
        } else
        if (typeof data !== 'undefined' &&  data.length >0 )
        {

            res.send({
                title : "Listado Geocercas",
                info : data
            });
        }else
        {
          res.send({msg:false});
        }
    })
}

exports.guardar=function(req,res,next){
    var arr = req.body.puntos.substr(1,req.body.puntos.length-2).split(",");
    var estado = req.body.estado || true;
    if (estado =="VISIBLE")
    {
        estado = true;
    }else
    {
        estado = false;
    }

    var puntos=[];

    //validar puntos
    if (arr.length <= 1){
        res.status(400).send({
            error: "Puntos de geocerca invalidos",
            message: "validation error"
        });
    }else{
        for(i=0; i< arr.length; i++)
        {
            var ubi=  arr[i];
            var punto = ubi.split(" ");
            var lat =  parseFloat(punto[1]);
            var lon = parseFloat(punto[0]);

            //validar puntos
            if (lat == null || lon == null){
                console.log("Error con puntos %f, %f", lat, lon);
                res.status(400).send({
                    error: "Puntos de geocerca invalidos",
                    message: "validation error"
                });
                return;
            }else{
                puntos.push ([lon,lat]);
            }
        }

        var json = {
                "type": "Feature",
                "id": req.body.nombre,
                "properties": { "ColorGeocerca" : req.body.color,"Nombre":req.body.nombre,"Descripcion":req.body.descripcion},
            "geometry":{
                "type":"Polygon",
                "coordinates":[puntos]
                }
        }

        var jsonString = JSON.stringify(json);
        var geoData={
            Nombre:req.body.nombre,
            PK_GeocercaId:0,
            FK_EmpresaId:req.empresa,
            Visible:estado,
            Posiciones : jsonString,
            Puntos:req.body.puntos
        };
        console.log (geoData);
        geocercaModel.guardarGeocercas(geoData,function(error,data){
            if(data && data.insertId)
            {


                res.json({msg:true,
                    info: {id:data.insertId}
                });
            }
            else
            {
                res.json(500,{"msg":"Error"});
            }
        });
    }

    
}

exports.modificar= function(req,res,next){
//----------------------------------------
    var arr = req.body.puntos.substr(1,req.body.puntos.length-2).split(",");
    var estado = req.body.estado || true;
    if (estado =="VISIBLE")
    {
        estado = true;
    }else
    {
        estado = false;
    }

    var puntos=[];
    //validar puntos
    if (arr.length <= 1){
        res.status(400).send({
            error: "Puntos de geocerca invalidos",
            message: "validation error"
        });
    }else{

        for(i=0; i< arr.length; i++)
        {
            var ubi=  arr[i];
            ubi= ubi.trim();
            var punto = ubi.split(" ");
            var lat =  parseFloat(punto[1]);
            var lon = parseFloat(punto[0]);

            //validar puntos
            if (lat == null || lon == null){
                console.log("Error con puntos %f, %f", lat, lon);
                res.status(400).send({
                    error: "Puntos de geocerca invalidos",
                    message: "validation error"
                });
                return;
            }else{
                puntos.push ([lon,lat]);
            }
        }

        var json = {
            "type": "Feature",
            "id": req.body.nombre,
            "properties": { "ColorGeocerca" : req.body.color,"Nombre":req.body.nombre,"Descripcion":req.body.descripcion},
            "geometry":{
                "type":"Polygon",
                "coordinates":[puntos]
            }
        }

        var jsonString = JSON.stringify(json);
        var geoData={
            FK_EmpresaId:req.empresa,
            Visible:estado,
            Posiciones : jsonString,
            Puntos:req.body.puntos,
            Nombre: req.body.nombre
        };

    //_--------------------------------------

        data={
            Posiciones:req.body.posiciones,
            Nombre:req.body.nombre,
            ColorGeocerca:req.body.color
        };

        desc= req.body.descripcion;
        if(desc != ""){
            data["Descripcion"]=desc
        }

        var posiciones=req.body.posiciones;
        var id = req.body.id;

        geocercaModel.modificarGeocercas(id,geoData,function(error,data)
        {
            if(data)
            {
                res.json({msg:true,
                    info: {id:data.insertId}
                });
            }
            else
            {
                res.json(500,{"msg":"Error"});
            }
        });
    }
}

exports.eliminar=function(req,res,next) {
    var id = req.query.id;
    geocercaModel.eliminarGeocercas(id, function (erro, data) {
        if (data) {
            res.json({
                msg: true,
                info: {id: data.insertId}
            });
        }
        else {
            res.json(500, {"msg": "Error"});
        }
    })
};

    exports.unidadesPorGeocerca= function (req, res) {
        data={
            fecha:req.query.fecha
        };
        geocercaModel.unidadesPorGeocerca(data, function (error,result) {
            if(error){
                res.sendStatus(500);
            }else{
                temp=[];
                for(i=0; i<result.length;i++){
                    jsontemp=JSON.parse(result[i]['Posiciones']);
                    temp.push({
                        Nombre_Vehiculo: result[i]['Nombre_Vehiculo'],
                        Rastra: result[i]['Rastra'],
                        FechaEntrada: result[i]['FechaEntrada'],
                        TiempoEnGeocerca: result[i]['TiempoEnGeocerca'],
                        NombreGeocerca:jsontemp['properties'].Nombre
                    });
                }

                agrupados=[];
                agrupados=_.groupBy(temp,'NombreGeocerca');

                res.status(200).send({
                    title:"Cantidad de unidades por geocerca",
                    msg:true,
                    cantidad: agrupados.length,
                    info:agrupados
                });
            }
        });
    };

    exports.detalleUnidadesPorGeocerca= function (req,res) {
        data={
            fecha:req.query.fecha,
            geoId:req.query.geoId
        };
        geocercaModel.detalleUnidades(data, function (error,result) {
            if(error){
                res.sendStatus(500);
            }else{
                res.status(200).send({
                    title: "Detalle de unidades en Geocerca",
                    msg:true,
                    cantidad: result.length,
                    info: result
                });
            }
        });
    };
