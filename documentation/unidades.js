/**
 * Created by GMG on 09/04/2016.
 */
/**
* @api {get}/unidades Listar Unidades
* @apiName getAllUnidades
* @apiGroup Unidades
*
* @apiParam {Number} empresa Id de la empresa
*
 * @apiSuccess {Boolean} msg Devuelve true cuando la cosulta se realiza exitosamente
* @apiSuccess {String} title Devuelve el titulo de la respuesta
* @apiSuccess {Array} info Devuelve la informacion de la consulta realizada en un arreglo de objetos JSON
* @apiSuccessExample {JSON} Respuesta-Success:
* {
*   "msg": true,
    "title": "Listado Unidades",
    "info": [
        {
            "marcado": "",
            "UnidadId": 1,
            "Imei": 000000000000000,
            "Conductor": "Conductor",
            "apellido": "",
            "Vehiculo": "MarcaVehiculo",
            "FechaCreacion": "2016-04-09 9:10:56",
            "Velocidad": 0,
            "Direccion": 1,
            "Entradas": 0,
            "FechaHora": "2016-04-09 15:38:56",
            "Latitud": 00.000000,
            "Longitud": -00.000000,
            "url": "icon.png",
            "km": 0.0
        }
    ]
  }
*
* @apiError {Boolean} msg Devuelve false si ocurrio un error en la consulta
* @apiErrorExample {JSON} Respuesta-Error:
* {
*      "msg": false
* }
* */

/**
 * @api {put}/unidades Modificar Unidad
 * @apiName putUnidades
 * @apiGroup Unidades
 *
 * @apiParam {Number} imei Numero del imei de la unidad
 * @apiParam {Number} conductor Id del conductor de la unidad
 * @apiParam {String} vehiculo Modelo del vehiculo
 * @apiParam {String} icono Numero del icono a usar
 *
 * @apiSuccess {String} result Devuelve "ok" cuando se guarda la informacion
 * @apiSuccess {JSON} info Devuelve la informacion de la consulta realizada
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
        {
            "result": "ok",
            "info": {
                "fieldCount": 0,
                "affectedRows": 1,
                "insertId": 0,
                "serverStatus": 2,
                "warningCount": 0,
                "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
                "protocol41": true,
                "changedRows": 1
            }
        }
   }
 *
 * @apiError {Number} err Devuelve "1" cuando ocurre un error en la consulta realizada
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *      "err": 1
 * }
 * */

/**
 * @api {post}/unidades Guardar Unidad
 * @apiName postUnidades
 * @apiGroup Unidades
 *
 * @apiParam {Number} imei Imei de la unidad
 * @apiParam {Number} modelo Id del modelo de GPS instalado en la unidad
 * @apiParam {String} nombre Contiene el nombre de la marca del vehiculo de la unidad
 * @apiParam {Boolean} activo Guarda true si la unidad esta activa o false si esta inactiva
 * @apiParam {Number} icono Id del icono de la unidad
 * @apiParam {Datetime} fecha Fecha de creacion de la unidad
 * @apiParam {Number} conductor Id del conductor de la unidad
 *
 * @apiSuccessExample Respuesta-Success:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {delete}/unidades Eliminar Unidad
 * @apiName deleteUnidades
 * @apiGroup Unidades
 *
 * @apiParam {Number} id Id de la unidad
 *
 * @apiSuccessExample Respuesta-Success:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */