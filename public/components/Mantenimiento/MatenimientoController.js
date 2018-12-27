SabuesoAPP.controller("MantenimientoController", function( $scope , FactoryCrearMantenimiento ,ServiceMantenimiento , $uibModal  )
{




  
  $scope.modificarMantenimiento = function(man){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/Mantenimiento/EditMantenimiento.html',
          controller: 'editarMantenimientoCtrl',
      size:'lg',
      resolve: {
        man: function(){
          return man;
        }
      }
    });
 

    modalInstance.result.then(function(newman){
        console.log(newman) ; 
        
      if(typeof newman !== 'undefined'){
        idx = _.findIndex(ServiceMantenimiento.listaMantenimiento, man );
        ServiceMantenimiento.listaMantenimiento[idx] = newman;
       $scope.listaMantenimiento();
      }
    });    

}




 $scope.eliminarMantenimiento = function (elemento ,idMantenimiento )
 {
    FactoryCrearMantenimiento.eliminar({PK_Mantenimiento:idMantenimiento}).then(function(d) {
        if(d.data.msg == true)
        {
            var index = ServiceMantenimiento.listaMantenimiento.indexOf(elemento) ; 
            ServiceMantenimiento.listaMantenimiento.splice(index , 1) ; 
            ServiceMantenimiento.listaMantenimiento = [] ;
            $scope.listarMantenimiento() ; 
            $.bootstrapGrowl("Exito, Mantenimiento se ha inactivado",  {type: 'success',delay: 120000});
        }
        else {
            $.bootstrapGrowl("Error, Mantenimiento no se ha inactivado",  {type: 'danger',delay: 120000});
        }
    });
 }

 

  $scope.showform = function ()
  {
      var modalInstance = $uibModal.open({
          animation: true , 
          templateUrl: 'components/Mantenimiento/CreateMantenimiento.html',
          controller: 'guardarMantenimientoctrl' ,
          size: 'lg', 
          resolve: {
           function: function(){
               return [];
           }   
          }
      });

      modalInstance.result.then(function(){
        //  ServiceMarcaVehiculo.listaMarcaVehiculo = [];
         $scope.listarMantenimiento();
      });
     
  }





 $scope.listaMantenimiento  = function(){
    return  ServiceMantenimiento.listaMantenimiento ; 
 }


 $scope.listarMantenimiento  = function()
 {
    FactoryCrearMantenimiento.get().then(function(d) {
        ServiceMantenimiento.listaMantenimiento = d.data.info ; 
     });
 }


  


})



 SabuesoAPP.controller('guardarMantenimientoctrl' , function( $scope , $uibModalInstance,    FactoryCrearUbicacion , ServiceUbicacion , FactoryCrearTipoFalla,ServiceTipofalla ,  FactoryCrearModelounidaes, ServiceModelounidades , FactoryMotorista,ServicioMotorista ,  FactoryCrearMantenimiento ,ServiceMantenimiento ,FactoryCrearMecanico ,ServiceMecanico  )
{


    $scope.listaMecanico  = function(){
        return  ServiceMecanico.listaMecanico ; 
     }
    
    
     $scope.listarMecanico  = function()
     {
        FactoryCrearMecanico.get().then(function(d) {
            ServiceMecanico.listaMecanico = d.data.info ; 
         });
     }
    
    
    
    
 $scope.listaMantenimiento  = function(){
    return  ServiceMantenimiento.listaMantenimiento ; 
 }


 $scope.listarMantenimiento  = function()
 {
    FactoryCrearMantenimiento.get().then(function(d) {
        ServiceMantenimiento.listaMantenimiento = d.data.info ; 
     });
 }



    
  //Funcion para listar Motoristas
  $scope.listarMotoristas = function(){

    if (ServicioMotorista.listaMotorista.length == 0) {
        FactoryMotorista.Obtenerconductores().then(function(d){
          ServicioMotorista.listaMotorista = d.data.info;

        });
    }

  }


  //Retorna la lista de Motoristas en el ServicioMotorista
  $scope.listaMotoristas = function(){
    return ServicioMotorista.listaMotorista;
  }

 
    $scope.listarModeloUnidades = function()
    {
    //  if(ServiceMarcaVehiculo.listaMarcaVehiculo.length == 0)
    //  {
      FactoryCrearModelounidaes.get().then( function(d) {
          ServiceModelounidades.listaModeloUnidades = d.data.info ;
              console.log(d.data.info) ;
           } ) ; 
    //  }
  
    }
  
    
    $scope.listaModeloUnidades = function()
    {
        return ServiceModelounidades.listaModeloUnidades;
    }
    
    $scope.listarTipoFalla = function()
    {
      if(ServiceTipofalla.listaTipoFalla.length == 0)
      {
          FactoryCrearTipoFalla.gettipofalla().then( function(d) {
              ServiceTipofalla.listaTipoFalla = d.data.info ;
           //   console.log(d.data.info) ;
           } ) ; 
      }
  
    }
  
    
    $scope.listaTipoFalla = function()
    {
        return ServiceTipofalla.listaTipoFalla;
    }
  

     $scope.init = function(){
        $scope.listarMecanico();
        $scope.listarTipoFalla();
        $scope.listarModeloUnidades() ;
        $scope.listarMotoristas() ; 

    $scope.planificar = [{
        id: "S",
        estadoplan: "SI"
    }, {
        id: "N",
        estadoplan: "NO"
    }];

    $scope.carburante = [{
        id: 1,
        estadocarburante: "Diesel"
    }, {
        id: 2,
        estadocarburante: "Gasolina"
    }, 
    {
        id: 3,
        estadocarburante: "LPG"
    }
    ];


    $scope.tipomantenimiento = [{
        id: "p",
        estadotipoman: "Preventivo"
    }, {
        id: "c",
        estadotipoman: "Correctivo"
    }];

    $scope.categoria = [{
        id: "t",
        estadocabezal: "Tiempo"
    }, {
        id: "k",
        estadocabezal: "Kilometraje"
    }];

     }
     

 $scope.guardarMantenimiento = function()
 {
     var data = { 
        Planificado: $scope.planificaman.id ,
        Fecha_Planificacion: moment($scope.fechplaman).format('YYYY-MM-DD') , 
        Carburante: $scope.carburanteman.id ,
        Tipo_Mantenimiento: $scope.tipomanman.estadotipoman ,
        FK_TipoFalla: $scope.tipoman.Pk_tipofalla ,
        FK_ModeloUnidades: $scope.modundman.PK_ModeloUnidades ,
        Kilometraje: $scope.kilometrajeman ,
        Categoria: $scope.categoriaman.estadocabezal ,
        Motivo: $scope.Motivomant ,
        Fecha_Ingreso: moment($scope.fecingresoman).format('YYYY-MM-DD'),
        Fecha_Entrega:  moment($scope.fecentregaman ).format('YYYY-MM-DD') ,
        FK_Conductores:  $scope.conductorman.IdConductor ,    
        Observaciones: $scope.observacoinesman ,
        FK_Mecanico: $scope.mecanicoman.PKMecanico 
     } ;

     console.log(data) ; 
     FactoryCrearMantenimiento.guardar(data).then( function(d) {
         if(d.data.msg == true)
         {
            $.bootstrapGrowl(" Matenimiento guardado exitosamente !!" , {type: 'success' , delay: 120000 } ) ;
            $uibModalInstance.close('')  ;
         }
         else{
            $.bootstrapGrowl("Error, Matenimiento no se ha guardado ", {type: 'danger', delay: 120000 } ) ;
         } 
     });
 }
 


}) ;


 
SabuesoAPP.controller( 'editarMantenimientoCtrl' , function( $scope , FactoryCrearTaller , ServiceTaller , $filter , $uibModalInstance , $uibModal , man , FactoryCrearUbicacion , ServiceUbicacion , FactoryCrearTipoFalla,ServiceTipofalla ,  FactoryCrearModelounidaes, ServiceModelounidades , FactoryMotorista, ServicioMotorista  ,  FactoryCrearMantenimiento ,ServiceMantenimiento ,FactoryCrearMecanico ,ServiceMecanico,  FactoryCrearMantenimiento ,ServiceMantenimiento  )
{
  
        
 $scope.listaMantenimiento  = function(){
    return  ServiceMantenimiento.listaMantenimiento ; 
 }


 $scope.listarMantenimiento  = function()
 {
    FactoryCrearMantenimiento.get().then(function(d) {
        ServiceMantenimiento.listaMantenimiento = d.data.info ; 
     });
 }
  

    $scope.init = function(){
        $scope.listarTipoFalla();
        $scope.listarModeloUnidades() ;
        $scope.listarMotoristas() ; 
        $scope.listarMecanico();
        console.log("abrir") ;
   console.log(man) ;
   console.log("cerrar") ;
   
        $scope.man = man ;
        $scope.man.Fecha_Planificacion =new Date($scope.man.Fecha_Planificacion+" 00:00:00"); 
        $scope.man.Fecha_Ingreso = new Date($scope.man.Fecha_Ingreso);
        $scope.man.Fecha_Entrega = new Date($scope.man.Fecha_Entrega);
/*
        if($scope.man.PLANIFICADO == 'SI')
        {
            $scope.man.PLANIFICADO = 'S';
        }
        else if ($scope.man.PLANIFICADO = 'S' )
        {
            $scope.man.PLANIFICADO = 'S' ; 
        }
        else 
        {
            $scope.man.PLANIFICADO = 'N' ;
        }
*/
  
        if($scope.man.CARBURANTE == 'Diesel' || $scope.man.CARBURANTE == 1 )
        {
            $scope.man.CARBURANTE = 1;
        }
        else if ($scope.man.CARBURANTE == 'Gasolina' || $scope.man.CARBURANTE == 2)
        {
            $scope.man.CARBURANTE = 2;
        }
        else 
        {
            $scope.man.CARBURANTE = 3;
        }
      

      /*  if($scope.man.Tipo_Mantenimiento == "Preventivo")
        {
            $scope.man.Tipo_Mantenimiento = "p";
        }
        else 
        {
            $scope.man.Tipo_Mantenimiento = "c" ;
        }
     */
      /*  if($scope.man.Categoria == "Tiempo")
        {
            $scope.man.Categoria = "t";
        }
        else 
        {
            $scope.man.Categoria = "k" ;
        }
      */  
        $scope.planificar = [{
            id: "SI",
            estadoplan: "SI"
        }, {
            id: "NO",
            estadoplan: "NO"
        }];
    



        $scope.carburanteedit = [{
            id: 1,
            estadocarburante: "Diesel"
        }, {
            id: 2,
            estadocarburante: "Gasolina"
        }, 
        {
            id: 3,
            estadocarburante: "LPG"
        }
        ];
    
    
        $scope.tipomantenimientodata = [{
            id: "p",
            estadotipoman: "Preventivo"
        }, {
            id: "c",
            estadotipoman: "Correctivo"
        }];
    
        $scope.categoriadata = [{
            id: "t",
            estadocabezal: "Tiempo"
        }, {
            id: "k",
            estadocabezal: "Kilometraje"
        }];


    

        $scope.datafalla = {
            Pk_tipofalla: $scope.man.FK_TipoFalla , 
            Falla: $scope.man.Falla
       } ;

       $scope.dataconductor = {
        IdConductor: $scope.man.FK_Conductores , 
        Nombre: $scope.man.CONDUCTORES,
        Apellido: $scope.man.conduape
   } ;


   $scope.dataunidad = {
    PK_ModeloUnidades: $scope.man.FK_ModeloUnidades , 
    Nombre_Vehiculo: $scope.man.Nombre_Vehiculo 
    
} ;


    $scope.datamecanico = {
        PKMecanico: $scope.man.FK_Mecanico , 
        Nombre: $scope.man.MECANICO,
        Apellido: $scope.man.MECANICOAPE
    } ;

    }
 
     
    $scope.listaMecanico  = function(){
        return  ServiceMecanico.listaMecanico ; 
     }
    
    
     $scope.listarMecanico  = function()
     {
        FactoryCrearMecanico.get().then(function(d) {
            ServiceMecanico.listaMecanico = d.data.info ; 
         });
     }
    
    
    
  //Funcion para listar Motoristas
  $scope.listarMotoristas = function(){

    if (ServicioMotorista.listaMotorista.length == 0) {
        FactoryMotorista.Obtenerconductores().then(function(d){
          ServicioMotorista.listaMotorista = d.data.info;

        });
    }

  }


  //Retorna la lista de Motoristas en el ServicioMotorista
  $scope.listaMotoristas = function(){
    return ServicioMotorista.listaMotorista;
  }

 
    $scope.listarModeloUnidades = function()
    {
    //  if(ServiceMarcaVehiculo.listaMarcaVehiculo.length == 0)
    //  {
      FactoryCrearModelounidaes.get().then( function(d) {
          ServiceModelounidades.listaModeloUnidades = d.data.info ;
              console.log(d.data.info) ;
           } ) ; 
    //  }
  
    }
  
    
    $scope.listaModeloUnidades = function()
    {
        return ServiceModelounidades.listaModeloUnidades;
    }
    
    $scope.listarTipoFalla = function()
    {
      if(ServiceTipofalla.listaTipoFalla.length == 0)
      {
          FactoryCrearTipoFalla.gettipofalla().then( function(d) {
              ServiceTipofalla.listaTipoFalla = d.data.info ;
           //   console.log(d.data.info) ;
           } ) ; 
      }
  
    }
  
    
    $scope.listaTipoFalla = function()
    {
        return ServiceTipofalla.listaTipoFalla;
    }

 
   $scope.editarMantenimiento = function(){
 /*  if ( $scope.man.PLANIFICADO.id = "SI")
   {
    $scope.man.PLANIFICADO.id = "S"
   }
   else {
    $scope.man.PLANIFICADO.id = "N" 
   }
   */
   console.log("editando");
    console.log($scope.man.PLANIFICADO);

     data = {
        PK_Mantenimiento: $scope.man.PK_Mantenimiento , 
        Planificado: $scope.man.PLANIFICADO , 
        Fecha_Planificacion:moment($scope.man.Fecha_Planificacion).format('YYYY-MM-DD')  , 
        Carburante: $scope.man.CARBURANTE , 
        Tipo_Mantenimiento: $scope.man.Tipo_Mantenimiento , 
        FK_TipoFalla: $scope.datafalla.Pk_tipofalla , 
        FK_ModeloUnidades: $scope.dataunidad.PK_ModeloUnidades , 
        Kilometraje: $scope.man.Kilometraje , 
        Categoria: $scope.man.Categoria , 
        Motivo: $scope.man.Motivo, 
        Fecha_Ingreso: moment($scope.man.Fecha_Ingreso ).format('YYYY-MM-DD') , 
        Fecha_Entrega:  moment($scope.man.Fecha_Entrega ).format('YYYY-MM-DD') , 
        FK_Conductores: $scope.dataconductor.IdConductor , 
        Observaciones: $scope.man.Observaciones, 
        FK_Mecanico: $scope.datamecanico.PKMecanico , 
        Activo: 1 
       }
       console.log(data) ; 

       FactoryCrearMantenimiento.editar(data).then(function(res) {
           if(res.status == 200){
                if(data.Activo == 1)
                {
                    $scope.man['ACTIVO'] = "ACTIVO" ;
                }
                else{
                    $scope.man['ACTIVO'] = "INACTIVO" ;
                }
               
                $.bootstrapGrowl("Mantenimiento editada exitosamente!", {type: 'success',delay: 10000});
                $scope.listarMantenimiento() ; 
                $uibModalInstance.close($scope.man);
           }
           else {
               $.bootstrapGrowl("Error , Editar mantenimiento", { type: 'danger', delay: 10000 });
           }

        }) ;
       
   }


    function deleteEmptyFields(data){
        for(key in data){
            if(typeof data[key] === 'undefined' || data[key] === '' || data[key] == null || data[key] === 'Invalid date'){
                delete data[key];
            }
        }
        return data;
    }

   
   

});

 