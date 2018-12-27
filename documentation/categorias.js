/**
 * Created by GMG on 12/04/2016.
 */
/**
 * @api {post}/categorias Guardar Categoria de Empresa
 * @apiName guardarCategoria
 * @apiGroup Categorias
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {String} categoria Nombre de la categoria
 * @apiParam {String} descripcion Descripcion de a categoria a guardar
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando se guarda exitosamente la categoria
 * @apiSuccess {JSON} info Devuelve el id de la categoria agregada dentro de un objeto JSON
 * @apiSuccessExample Respuesta-Success:
 * {
  "msg": true,
  "info":{
    "id": 1
  }
}
 *
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {get}/categorias Listar Categorias de Empresa
 * @apiName listarCategorias
 * @apiGroup Categorias
 *
 * @apiParam {Number} empresa Id de la empresa
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realizo exitosamente
 * @apiSuccess {Array} info Devuelve un arreglo con la informacion de la consulta realizada
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "msg": true,
  "info": [
    {
      "id": 1,
      "Categoria": "General",
      "Descripcion": "General",
      "EmpresaId": "0"
    }
  ]
}
 *
 * @apiError {Boolean} msg Devuelve false cuando ocurre algun error en la consulta realizada
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *      "msg": false
 * }
 * */

/**
 * @api {delete}/categorias Eliminar Categoria de Empresa
 * @apiName eliminarCategoria
 * @apiGroup Categorias
 *
 * @apiParam {Number} id Id de la categoria a eliminar
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realizo exitosamente
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "msg": true
}
 *
 * @apiError {Boolean} msg Devuelve false cuando ocurre algun error en la consulta realizada
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *      "msg": false
 * }
 * */

/**
 * @api {put}/categorias Modificar Categoria de Empresa
 * @apiName modificarCategoria
 * @apiGroup Categorias
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {Number} id Id de la categoria a modificar
 * @apiParam {String} [descripcion] Descripcion de la categoria
 * @apiParam {String} [categoria] Nombre de la categoria
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * 500
 * */