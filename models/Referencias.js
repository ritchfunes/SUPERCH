/**
 * Created by Roberto on 27/07/2015.
 */
var pool = require('./conexion').pool;
db=require("./ConexionMongo");
var geocercasModel ={};

geocercasModel.referenciasIconos = function(callback)
{
    pool.getConnection(function (err,connection){
        if(connection)
        {
            query = "SELECT \
                            * \
                     FROM \
                        ReferenciasIconos;"

            connection.query(query, function (error, rows) {
                connection.release();
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                    callback(null, rows);
                }

            });

        }
    });

}

geocercasModel.listar= function(empresa,callback)
{
    pool.getConnection(function(err,connection)
    {
        var query = 'SELECT \
                                 ref.PK_ReferenciaId Id \
                                ,ref.Nombre \
                                ,ref.Descripcion \
                                ,CAST(ref.Longitud  AS DECIMAL(10,6)) Longitud \
                                ,CAST(ref.Latitud AS DECIMAL(10,6)) Latitud \
                                ,if(visible=1,"Si","No") visibleCompuesto \
                                ,refI.url\
                                 ,ref.FK_CategoriaId CategoriaId\
                                 ,cat.Categoria,p.Radio \
                              FROM \
                                Referencias ref inner join ReferenciasIconos refI  \
                                INNER JOIN CategoriasReferencia cat  \
                                on ref.FK_IconoId = refI.PK_ReferenciasIconosId \
                                 and ref.FK_CategoriaId = cat.PK_CategoriaId \
                                 Left join Paradas p on p.FK_ReferenciaId = ref.PK_ReferenciaId\
                              where ref.FK_EmpresaId ='+empresa;
        console.log(query)

        if (connection) {
            connection.query(query, function (error, rows) {
                connection.release();
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                    callback(null, rows);
                }
            });
        }
    });
}


geocercasModel.guardar=function(Data,callback)
{
    pool.getConnection(function(err,connection){
        if(connection) {
            connection.query("Insert into Referencias set ?", Data, function (error, result) {
                connection.release();
                if (error) {

                    callback(error, null);

                } else {

                        var json =                 {
                            "type":"Feature",
                            "geometry":{
                                "type":"Point",
                                "coordinates":[Data.Longitud,Data.Latitud]
                            },
                            "properties":{
                                "empresa":Data.FK_EmpresaId,
                                "nombre":Data.Nombre,
                                "Descripcion":Data.Descripcion,

                            }
                        }
                        Lugares = db.collection();
                        Lugares.insert(json,{w:1},function (err, r) {
                          callback(err, {"insertId": result.insertId});
                        });
                        /*db.dbTest.open(function (error, client) {
                            if (error) throw error;
                        client.command({
                           insert : "Lugares",
                            documents: [json]
                        }, function (err, r) {
                            callback(err, {"insertId": result.insertId});
                        });
                    });*/
                    //db.dbTest.close();

                }

            });
        }
    });


}

geocercasModel.eliminar = function(id,callback)
{


    pool.getConnection(function(err,connection){
        if(connection) {
            connection.query("Delete from Referencias where PK_ReferenciaId = ?", id , function (error, result) {
                connection.release();
                if (error) {

                    callback(error, null);

                } else {
                    callback(null, {result : result});
                }

            });
        }
    });
};

geocercasModel.put=function(id,data,callback) {
    pool.getConnection(function (err, connection) {
        if (connection) {
            query = connection.format("Update Referencias set ? where PK_ReferenciaId=" + id, data);
            console.log(query);
            connection.query(query, function (error, result) {
                connection.release();
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                    callback(null, result);
                }
            })
        }
    });
};

module.exports= geocercasModel;
