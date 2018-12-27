/**
 * Created by GMG on 12/04/2016.
 */
/**
 * @api {post}/empresas Guardar Empresa
 * @apiName postEmpresa
 * @apiGroup Empresas
 *
 * @apiParam {String} nombre Nombre de la empresa
 * @apiParam {String} descripcion Descripcion de la empresa
 * @apiParam {Number} socio Id del socio
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando se guarda la empresa correctamente
 * @apiSuccess {JSON} info Devuelve el id de la empresa guardada
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
 *      "msg": true,
 *      "info": {
 *          "id": 1
 *      }
}
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {get}/empresas Listar Empresas
 * @apiName listarEmpresas
 * @apiGroup Empresas
 *
 * @apiParam {Number} socio Id del socio
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realiza correctamente
 * @apiSuccess {Array} info Devuelve un arreglo con la informacion de la consulta
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "msg": true,
  "info": [
    {
      "id_empresa": 1,
      "Nombre": "[nombre de empresa]",
      "Descripcion": "[descripcion de empresa]",
      "id_socio": 1,
      "Activo": 1
    }
  ]
}
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {delete}/empresas Eliminar Empresa
 * @apiName eliminarEmpresa
 * @apiGroup Empresas
 *
 * @apiParam {Number} id Id de la empresa a eliminar
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {put}/empresas Modificar Empresa
 * @apiName modificarEmpresa
 * @apiGroup Empresas
 *
 * @apiParam {Number} empresa Id de la empresa a modificar
 * @apiParam {String} [nombre] Nombre de la empresa
 * @apiParam {String} [descripcion] Descripcion de la empresa
 * @apiParam {Number} [activo] 1: activo, 0: no activo
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */