/**
 * Created by GMG on 11/04/2016.
 */
/**
 * @api {get}/referencias/iconos Listar Iconos de Referencias
 * @apiName getReferenciasIconos
 * @apiGroup Referencias
 *
 * @apiSuccess {String} title Devuelve el titulo de la respuesta
 * @apiSuccess {Array} info Devuelve un arreglo con la informacion consultada
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
 *      "title": "Listado ReferenciasIconos",
 *      "info": [
            {
              "PK_ReferenciasIconosId": 1,
              "url": "icono1.png"
            },
            {
              "PK_ReferenciasIconosId": 2,
              "url": "icono2.png"
            },
            {
              "PK_ReferenciasIconosId": 3,
              "url": "icono3.png"
            }
        ]
 * }
 *
 * @apiErrorExample Repuesta-Error:
 * error
 * */

/**
 * @api {post}/referencias Guardar Referencias
 * @apiName postReferencias
 * @apiGroup Referencias
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {String} nombre Nombre de la referencia
 * @apiParam {String} descipcion Descripcion de la referencia
 * @apiParam {Number} latitud Latitud en que se encuentra la referencia
 * @apiParam {Number} longitud Longitud en que se encuentra la referencia
 * @apiParam {Number} iconoId Id del icono de la referencia
 * @apiParam {Number} visible Determina la visibilidad de la referencia. 1: visible, 0: no visible
 * @apiParam {Number} categoriaId Id de la categoria a que pertenece la referencia
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando se guarda la referencia
 * @apiSuccess {JSON} info Devuelve la informacion del campo agregado
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
 *      "msg": true,
 *      "info": {
            "id": 244
        }
 * }
 *
 * @apiError {String} msg Devuelve un mensaje cuando ocurre un error al guardar la informacion
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *      "msg": "Error"
 * }
 * */

/**
 * @api {get}/referencias Listar Referencias
 * @apiName getReferencias
 * @apiGroup Referencias
 *
 * @apiParam {Number} empresa Id de la empresa
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realizo exitosamente
 * @apiSuccess {Array} info Devuelve un arreglo con la informacion consultada
 * @apiSuccess {Number} cantidada Devuelve la cantidad de datos consultados
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
 *      "msg": true,
 *      "info": [
            {
              "Id": 1,
              "Nombre": "Ejemplo",
              "Descripcion": "Ejemplo Referencia",
              "Longitud": 00.00,
              "Latitud": 00.00,
              "visibleCompuesto": "Si",
              "url": "icono.png",
              "CategoriaId": 1,
              "Categoria": "Ejemplo Categoria"
            },
            {
              "Id": 2,
              "Nombre": "Ejemplo 2",
              "Descripcion": "Ejemplo 2 de Referencia",
              "Longitud": 00.00,
              "Latitud": 00.00,
              "visibleCompuesto": "Si",
              "url": "icono2.png",
              "CategoriaId": 1,
              "Categoria": "Ejemplo Categoria"
            }
        ],
        "cantidada": 2
 * }
 *
 * @apiError {Boolean} msg Devuelve false cuando la consulta no se realizo correctamente
 * @apiErrorExample Respuesta-Error:
 * {
 *      "msg": false
 * }
 * */

/**
 * @api {delete}/referencias?id=id Eliminar Referencia
 * @apiName deleteReferencias
 * @apiGroup Referencias
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {Number} id Id de la Referencia
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando se elimina la referencia correctamente
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
 *      "msg": true
 * }
 *
 * @apiError {String} msg Devuelve un mensaje cuando la consulta no se realizo correctamente
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *      "msg": "Error"
 * }
 * */