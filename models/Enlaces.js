/**
 * Created by GMG on 14/06/2016.
 */
var pool = require('./conexion').pool;
var enlacesModel={};

enlacesModel.getEnlazados = function (empresa,callback) {
    pool.getConnection(function (err,connection) {
        var query = "select e.PK_EnlaceId EnlaceId, e.FK_UnidadId UnidadId, u.Nombre_Vehiculo, e.FK_RastraId RastraId, r.Rastra , e.Fecha from Enlaces e " +
            "left join Unidades u on e.FK_UnidadId=u.PK_Unidades " +
            "left join Rastras r on e.FK_RastraId=r.PK_RastraId " +
            "INNER JOIN UnidadesEmpresas ue ON u.PK_Unidades=ue.FK_UnidadId "+
            "WHERE ue.FK_EmpresaId="+empresa;
        console.log(query);
        if(connection){
            connection.query(query, function (error,result) {
                connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,result);
                }
            });
        }else{
            console.log(err);
        }
    });
};

enlacesModel.getRastras = function (callback) {
    pool.getConnection(function (err,connection) {
        var query = "select DISTINCT '' marcado,r.PK_RastraId RastraId, r.Rastra from Rastras r " +
            "where r.PK_RastraId not in (select e.FK_RastraId from Enlaces e);";
        console.log(query);
        if(connection){
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

enlacesModel.getUnidades= function (empresa,callback) {
    pool.getConnection(function (err,connection) {
        var query = "select DISTINCT '' marcado, u.PK_Unidades UnidadId, u.Nombre_Vehiculo from Unidades u " +
            "INNER JOIN UnidadesEmpresas ue ON ue.FK_UnidadId=u.PK_Unidades " +
            "where u.PK_Unidades not in (select e.FK_UnidadId from Enlaces e)" +
            "and ue.FK_EmpresaId="+empresa;
        console.log(query);
        if(connection){
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

enlacesModel.post= function (data,callback) {
    pool.getConnection(function (err,connection) {
        var query = "insert into Enlaces (FK_UnidadId,FK_RastraId, Fecha ) values "+ data +" on duplicate key update FK_RastraId=FK_RastraId";
        console.log(query);
        if(connection){
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

enlacesModel.delete= function (id,callback) {
    pool.getConnection(function (err,connection) {
        var query = "delete from Enlaces where PK_EnlaceId="+id;
        console.log(query);
        if(connection){
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

enlacesModel.postRastra= function (data, callback) {
    pool.getConnection(function (err, connection) {
        if(connection){
            query="insert into Rastras set ?";
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
            });
        }else{
            console.log(err);
        }
    });
};

enlacesModel.listRastras= function (callback) {
    pool.getConnection(function (err,connection) {
        var query = "select DISTINCT r.PK_RastraId RastraId, r.Rastra, r.Barcode, r.Placa from Rastras r ";
        console.log(query);
        if(connection){
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

enlacesModel.updateRastra= function (id, data, callback) {
    pool.getConnection(function (err,connection) {
        query=connection.format("update Rastras set ? where PK_RastraId="+id,data);
        console.log(query);
        if(connection){
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

module.exports=enlacesModel;