/**
 * Created by GMG on 12/04/2016.
 */
/**
 * @api {post}/roles Guardar Rol
 * @apiName guardarRol
 * @apiGroup Roles
 *
 * @apiParam {String} descripcion Descripcion del rol
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {get}/roles Listar Roles
 * @apiName listarRoles
 * @apiGroup Roles
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * [
 {
   "rol_id": 1,
   "Descripcion": "[descripcion_rol]"
 }
]
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {delete}/roles Eliminar Rol
 * @apiName eliminarRol
 * @apiGroup Roles
 *
 * @apiParam {Number} id Id del rol a eliminar
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {put}/roles Modificar Rol
 * @apiName modificarRol
 * @apiGroup Roles
 *
 * @apiParam {Number} id Id del rol a modificar
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {String} descripcion Descripcion del rol
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */