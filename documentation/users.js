/**
 * Created by GMG on 11/04/2016.
 */
/**
 * @api {post}/resetPass Cambiar Clave
 * @apiName resetPassword
 * @apiGroup Users
 *
 * @apiParam {Number} user Id del usuario
 * @apiParam {String} pass Nueva clave del usuario
 * @apiParam {String} opass Clave vieja del usuario
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando se cambia la clave del usuario
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
        "msg": true
}

 * @apiError {Boolean} msg Devuelve false cuando se no puede cambiar la clave del usuario
 * @apiErrorExample {json} Respuesta-Error 1
 * {
        "msg": false
}
 *
 * @apiError {String} info Devuelve el mensaje del error cuando la clave anterior no corresponde al usuario
 * @apiErrorExample {json} Respuesta-Error 2
 * {
        "msg": false,
        "info:"La clave anterior no corresponde al usuario actual"
}
 *  */