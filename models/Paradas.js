/**
 * Created by GMG on 06/06/2016.
 */
var pool = require('./conexion').pool;

paradasModel= {};

paradasModel.Insert= function (data, callback) {
    pool.getConnection(function(err,connection){

        if(connection){
            query = "insert ignore into Paradas (FK_ReferenciaId, Radio) values "+data;
            //sql=connection.format(query,data);
            console.log(query);
            connection.query(query,function(error,row){
                connection.release();
                if(error)
                {
                    console.log(error);
                    callback(error,null);
                } else{
                    callback(null,row);
                }
            });
        }
    });
};

paradasModel.Update= function (data, id, callback) {
    pool.getConnection(function (err,connection) {
        if(connection){
            query="Update Paradas set ? where PK_ParadasId="+id;
            sql=connection.format(query,data);
            console.log(sql);
            connection.query(sql, function (error, result) {
                connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,result);
                }
            })
        }
    });
};

paradasModel.Get= function (empresa,callback) {
    pool.getConnection(function (err, connection) {
        if(connection){
            query = "SELECT \
            ref.PK_ReferenciaId ReferenciaId,\
                p.PK_ParadasId ParadasId,\
                ref.Nombre,\
                ref.Descripcion,\
                ref.Latitud,\
                ref.Longitud,\
                p.Radio,\
                rei.url,\
                IF(ref.Visible=1,'Si','No') Visible,\
                ref.FK_CategoriaId CategoriaId,\
                cr.Categoria\
            FROM\
            Referencias ref\
            INNER JOIN\
            Paradas p ON p.FK_ReferenciaId = ref.PK_ReferenciaId\
            INNER JOIN\
            ReferenciasIconos rei ON rei.PK_ReferenciasIconosId = ref.FK_IconoId\
            INNER JOIN\
            CategoriasReferencia cr ON cr.PK_CategoriaId = ref.FK_CategoriaId\
            WHERE\
            ref.FK_EmpresaId ="+empresa+";";
            console.log(query);
            connection.query(query, function (error,result) {
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,result);
                }
            });
        }
    });
};

paradasModel.Delete= function (id, callback) {
    pool.getConnection(function (err,connection) {
        if(connection){
            query="Delete from Paradas where PK_ParadasId="+id+";";
            console.log(query);
            connection.query(query, function (error,result) {
                connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,result);
                }
            });
        }
    });
};

paradasModel.GetParadasNoAutorizadas= function (empresa,callback) {
    pool.getConnection(function (err, connection) {
        if(connection){
            query="SELECT ref.PK_ReferenciaId, ref.Nombre FROM Gateway1.Referencias ref " +
                "where ref.PK_ReferenciaId not in (Select FK_ReferenciaId from Paradas) " +
                "and ref.FK_EmpresaId="+empresa+";";
            console.log(query);
            connection.query(query, function (error, result) {
                connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,result);
                }
            });
        }
    });
};

module.exports = paradasModel;