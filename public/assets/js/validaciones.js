/**
 * Created by Roberto on 31/07/2015.
 */
function validarForm(elemento)
{
    estado = true

    $(elemento+" :input").each(function(index, element) {
        var $this = $(this);
        if ( $this.is("input") || $this.is("textarea") )
        {
           if( $this.val() == "" )
           {
               $this.popover({
                   "trigger": 'manual',
               }).popover('show');


               estado = false;
               return false;
           }
        }

    });
    return estado;
}


function abrirModal(modal,titulo,modalTipo,tamano)
{
    /*
        modaltipo == 1 /modal estatico no cierra haciendo click fuera de el
        modaltipo == 2 /modal normal cierra dando click en el boton cerrar o dando click fura de el
        ---------------------------------------------------------------------------------------------
        tamano == 1 /modal pequeño
        tamano == 2 /modal grande
    */



    var opcion= 0;

    if( modalTipo == 1 )
        opcion = {backdrop: "static"};
    else if(modalTipo ==2 )
        opcion = "show"



    tamanoModal = "";

    if (tamano == 1)
        { tamanoModal = "modal-sm";}
    else if(tamano == 2)
        { tamanoModal = "modal-md";}
    else
        { tamanoModal = "modal-lg"; }


    $("#"+modal + " #titulo").html(titulo);
    $("#"+modal + " .modal-dialog").removeClass("modal-lg modal-sm").addClass(tamanoModal);
    $("#"+modal).modal(opcion);
}

isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};