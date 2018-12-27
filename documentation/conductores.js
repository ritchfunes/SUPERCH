/**
 * Created by GMG on 12/04/2016.
 */
/**
 * @api {post}/conductores Crear Conductor
 * @apiName crearConductor
 * @apiGroup Conductores
 *
 * @apiParam {String} nombre Nombre del Conductor
 * @apiParam {String} apellido Apellido del Conductor
 * @apiParam {String} telefono Telefono del Conductor
 * @apiParam {String} direccion Direccion del Conductor
 * @apiParam {String} identidad Identidad del Conductor
 * @apiParam {Datatime} fechaExp Fecha de expiracion de licencia del Conductor
 * @apiParam {String} ficha Ficha del Conductor
 * @apiParam {Number} empresa Id de la empresa del Conductor
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando el Conductor se crea exitosamente
 * @apiSuccess {JSON} info Devuelve el id del Conductor creado
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
 *  "msg": true,
 *  "info": {
 *      "id": 1
 *  }
 * }
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {get}/conductores Listar Conductores
 * @apiName listarConductores
 * @apiGroup Conductores
 *
 * @apiParam {Number} empresa Id del empresa
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realiza exitosamente
 * @apiSuccess {JSON} info Devuelve la informacion de la consulta dentro de un objeto JSON
 * @apiSuccess {Number} cantidad Devuelve la cantidad de registros consultados
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "msg": true,
  "info": [
    {
      "IdConductor": 1,
      "Nombre": "[nombre_conductor]",
      "Telefono": "[digitos_telefono]",
      "Direccion": "[direccion_conductor]",
      "Identidad": "[identidad_conductor]",
      "FechaExp": "[fecha_expiracion]",
      "Ficha": "[ficha]",
      "EmpresaId": [id_empresa]
    }
  ],
  "cantidad": 1
}
 *
 * @apiError {Boolean} msg Devuelve false cuando ocurre un error en la consulta
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *      "msg": false
 * }
 * */

/**
 * @api {delete}/conductores Eliminar Conductor
 * @apiName eliminarConductor
 * @apiGroup Conductores
 *
 * @apiParam {Number} id Id del Conductor a eliminar
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando el Conductor se elimina exitosamente
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
 *  "msg": true
 * }
 *
 * @apiError {Boolean} msg Devuelve false cuando ocurre algun error al eliminar al Conductor
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *  "msg": false
 * }
 * */

/**
 * @api {put}/conductores Modificar Conductor
 * @apiName modificarConductor
 * @apiGroup Conductores
 *
 * @apiParam {Number} id Id del Conductor a modificar
 * @apiParam {String} [nombre] Nombre del Conductor
 * @apiParam {String} [apellido] Apellido del Conductor
 * @apiParam {String} [telefono] Telefono del Conductor
 * @apiParam {String} [direccion] Direccion del Conductor
 * @apiParam {String} [identidad] Identidad del Conductor
 * @apiParam {Datatime} [fechaExp] Fecha de expiracion de licencia del Conductor
 * @apiParam {String} [ficha] Ficha del Conductor
 * @apiParam {Number} [empresa] Id de la empresa del Conductor
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */