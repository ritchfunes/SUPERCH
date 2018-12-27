/**
 * Created by GMG on 12/04/2016.
 */
/**
 * @api {post}/notificaciones Guardar Notificacion
 * @apiName guardarNotificacion
 * @apiGroup Notificaciones
 *
 * @apiParam {String} nombre Nombre de la Notificacion
 * @apiParam {String} correos Correos que recibiran Notificaciones
 * @apiParam {Number} user Id del Usuario
 * @apiParam {Array} unidades Arreglo de Unidades que reportaran Notificaciones
 * @apiParam {Number} evento Id del evento de la Notificacion
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la notificacion se guarda exitosamente
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
 *  "msg": true
 * }
 *
 * @apiError {Boolean} msg Devuelve false cuando ocurre algun error al guardar la notificacion
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *  "msg": false
 * }
 * */

/**
 * @api {get}/notificaciones Listar Notificaciones
 * @apiName listarNotificaciones
 * @apiGroup Notificaciones
 *
 * @apiParam {Number} user Id del Usuario
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realiza exitosamente
 * @apiSuccess {JSON} info Devuelve la informacion de la consulta dentro de un objeto JSON
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "msg": true,
  "info": {
    "[nombre_notificacion]": [
      {
        "Id": 1,
        "nombre": "[nombre_notificacion]",
        "correo": "[correo]",
        "Nombre_Vehiculo": "[nombre_vehiculo]"
      }
    ]
  }
}
 *
 * @apiError {Boolean} msg Devuelve false cuando ocurre un error en la consulta
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *      "msg": false
 * }
 * */

/**
 * @api {delete}/notificaciones Eliminar Notificacion
 * @apiName eliminarNotificacion
 * @apiGroup Notificaciones
 *
 * @apiParam {Number} id Id de la Notificacion a eliminar
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la notificacion se elimina exitosamente
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
 *  "msg": true
 * }
 *
 * @apiError {Boolean} msg Devuelve false cuando ocurre algun error al eliminar la notificacion
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *  "msg": false
 * }
 * */

/**
 * @api {put}/notificaciones Modificar Notificacion
 * @apiName modificarNotificacion
 * @apiGroup Notificaciones
 *
 * @apiParam {Number} id Id de la notificacion a modificar
 * @apiParam {String} [nombre] Nombre de la Notificacion
 * @apiParam {String} [correos] Correos que recibiran Notificaciones
 * @apiParam {Number} [usuario] Id del Usuario
 * @apiParam {Array} [unidades] Arreglo de Unidades a cambiar en Notificaciones
 * @apiParam {Array} [evento] Arreglo de eventos a cambiar en Notificaciones
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la notificacion se modifica exitosamente
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
 *  "msg": true
 * }
 *
 * @apiError {Boolean} msg Devuelve false cuando ocurre algun error al modificar la notificacion
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *  "msg": false
 * }
 * */