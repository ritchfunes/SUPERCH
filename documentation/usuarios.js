/**
 * Created by GMG on 12/04/2016.
 */
/**
 * @api {post}/generarAcceso Generar Acceso a Usuario
 * @apiName getAcceso
 * @apiGroup Usuarios
 *
 * @apiParam {JSON} body Informacion dentro del cuerpo de la llamada (request) para generar Acceso. (EmpresasId, UsuariosId, RolesId, SocioId, Empresa, Usuario, logo)
 *
 * @apiSuccess {String} token Devuelve una cadena de caracteres con el token que le da el acceso al Usuario.
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
 *  "token": "[token]"
 * }
 * */

/**
 * @api {get}/usuarios?empresaId=[id_empresa] Listar Usuarios de Empresa
 * @apiName listarUsuarios
 * @apiGroup Usuarios
 *
 * @apiParam {Number} empresaId Id de la empresa del usuario
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * [
 {
   "usuario_id": 1,
   "Usuario": "[nombre/correo]",
   "rol_id": 1,
   "Vigencia": "[fecha_vigencia]",
   "Empresa": "[nombre_empresa]",
   "empresa_id": 1,
   "Rol": "[nombre_rol]"
 }
]
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {post}/generarVisita Generar Acceso de Visita
 * @apiName getAccesoVisita
 * @apiGroup Usuarios
 *
 * @apiParam {Datetime} inicio Fecha y hora de inicio de la visita
 * @apiParam {Datetime} fin Fecha y hora de expiracion de la visita
 * @apiParam {Number} unidad Id de la unidad que sera rastreada en la visita
 * @apiParam {String} correo Correo del visitante
 * @apiParam {String} empresa Nombre de la empresa que genero el acceso
 * @apiParam {String} invitado Nombre de invitado
 *
 * @apiSuccess {Boolean} msg Devuelve una true si el acceso fue generado exitosamente.
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
 *  "msg": true
 * }
 *
 * @apiError {Boolean} msg Devuelve una false si el acceso fue generado exitosamente.
 * @apiErrorExample {JSON} Respuesta-Successs:
 * {
 *  "msg": false
 * }
 * */

/**
 * @api {get}/invitado?t=[token] Obtener Invitado
 * @apiName getInvitado
 * @apiGroup Usuarios
 *
 * @apiParam {String} t Token sacado del enlace
 * */