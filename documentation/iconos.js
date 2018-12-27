/**
 * Created by GMG on 12/04/2016.
 */
/**
 * @api {post}/iconos Agregar Icono
 * @apiName addIconos
 * @apiGroup Iconos
 *
 * @apiParam {String} url Ruta o enlace del icono a agregar
 *
 * @apiSuccess {JSON} info Devuelve un objeto JSON con la informacion del icono agregado
 * @apiSuccessExample Respuesta-Success:
 * {
  "info": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 1,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
  }
}
 *
 * @apiError {Number} err Devuelve -1 si ocurrio algun error al agregar el icono
 * @apiErrorExample Respuesta-Error:
 * {
 *      "err": -1
 * }
 * */

/**
 * @api {get}/iconos?id=[id] Obtener Icono
 * @apiName getIconos
 * @apiGroup Iconos
 *
 * @apiParam {Number} id Id del icono a buscar
 *
 * @apiSuccess {String} title Devuelve el titulo de la respuesta
 * @apiSuccess {Array} info Devuelve un arreglo con la informacion de la consulta realizada
 * @apiSuccessExample Respuesta-Success:
 * {
  "title": "Iconos",
  "info": [
    {
      "id": [id],
      "url": "[url]"
    }
  ]
}
 *
 * @apiError {Number} err Devuelve -1 si ocurrio algun error en la consulta
 * @apiErrorExample Respuesta-Error:
 * {
 *      "err": -1
 * }
 * */