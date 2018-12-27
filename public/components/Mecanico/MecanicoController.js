SabuesoAPP.controller("MecanicoController", function( $scope , FactoryCrearMecanico ,ServiceMecanico , $uibModal  )
{




  
  $scope.modificarMecanico = function(mec){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/Mecanico/editMecanico.html',
          controller: 'editarMecanicoCtrl',
      size:'lg',
      resolve: {
        mec: function(){
          return mec;
        }
      }
    });
 

    modalInstance.result.then(function(newmec){
        console.log(newmec) ; 
        
      if(typeof newmec !== 'undefined'){
        idx = _.findIndex(ServiceMecanico.listaMecanico, mec );
        ServiceMecanico.listaMecanico[idx] = newmec;
       $scope.listarMecanico();
      }
    });    

}
 



 $scope.eliminarMecanico = function (elemento ,idMecanico )
 {
    FactoryCrearMecanico.eliminar({PKMecanico:idMecanico}).then(function(d) {
        if(d.data.msg == true)
        {
            var index = ServiceMecanico.listaMecanico.indexOf(elemento) ; 
            ServiceMecanico.listaMecanico.splice(index , 1) ; 
            ServiceMecanico.listaMecanico = [] ;
            $scope.listarMecanico() ; 
            $.bootstrapGrowl("Exito, Mecanico se ha inactivado",  {type: 'success',delay: 120000});
        }
        else {
            $.bootstrapGrowl("Error, Mecanico no se ha inactivado",  {type: 'danger',delay: 120000});
        }
    });
 }
 
 

  $scope.showform = function ()
  {
      var modalInstance = $uibModal.open({
          animation: true , 
          templateUrl: 'components/Mecanico/addMecanico.html',
          controller: 'guardarMecanicoctrl' ,
          size: 'lg', 
          resolve: {
           function: function(){
               return [];
           }   
          }
      });

      modalInstance.result.then(function(){
        //  ServiceMarcaVehiculo.listaMarcaVehiculo = [];
         $scope.listarMecanico();
      });
     
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





})



 SabuesoAPP.controller('guardarMecanicoctrl' , function( $scope , $uibModalInstance,    FactoryCrearUbicacion , ServiceUbicacion ,  FactoryCrearMecanico ,ServiceMecanico )
{




  

     $scope.init = function(){
     

     }
     

 $scope.guardarMecanico = function()
 {
     var data = { 
      
        Nombre: $scope.NombreMecanico ,
        Apellido: $scope.ApelidoMecanico,
        Telefono:  $scope.TelefonoMecanico  ,
        Direccion:  $scope.DirreccionMecanico ,    
        Identidad: $scope.IdentidadMecanico ,
       FKEstado: 1  
    //    FKTaller: 1  
     //   Activo: 1 
     } ;

     console.log(data) ; 
     FactoryCrearMecanico.guardar(data).then( function(d) {
         if(d.data.msg == true)
         {
            $.bootstrapGrowl(" Mecanico guardado exitosamente !!" , {type: 'success' , delay: 120000 } ) ;
            $uibModalInstance.close('')  ;
         }
         else{
            $.bootstrapGrowl("Error, Mecanico no se ha guardado ", {type: 'danger', delay: 120000 } ) ;
         } 
     });
 }
 


}) ;


 
SabuesoAPP.controller( 'editarMecanicoCtrl' , function( $scope , FactoryCrearTaller , ServiceTaller , $filter , $uibModalInstance , $uibModal , mec , FactoryCrearUbicacion , ServiceUbicacion ,  FactoryCrearMecanico ,ServiceMecanico ,  FactoryCrearEstadosUnidades,ServiceEstadosUnidades )
{
  
    $scope.listarEstadosUnidades = function()
    {
      if(ServiceEstadosUnidades.listaEstadosUnidades.length == 0)
      {
          FactoryCrearEstadosUnidades.getestadosunidades().then( function(d) {
              ServiceEstadosUnidades.listaEstadosUnidades = d.data.info ;
           //   console.log(d.data.info) ;
           } ) ; 
      }
  
    }
  
  
  
    $scope.listaEstadosUnidades = function()
    {
        return ServiceEstadosUnidades.listaEstadosUnidades;
    }
  

    $scope.init = function(){
        $scope.listarEstadosUnidades();
      console.log(mec) ;
     $scope.mec = mec ; 
  
     $scope.dataEstados = {
        PK_Estado: mec.FKEstado,
        Estado: mec.Estado
    };

    

    }
 
     
   

   

 
   $scope.editarMecanico = function(){

   console.log("editando");
  
   Data = {
        PKMecanico: $scope.mec.PKMecanico , 
        Nombre: $scope.mec.Nombre , 
        Apellido:$scope.mec.Apellido , 
        Telefono: $scope.mec.Telefono , 
        Direccion: $scope.mec.Direccion , 
      //  FKTaller: 1 , 
        Identidad: $scope.mec.Identidad ,   
        FKEstado: $scope.dataEstados.PK_Estado , 
        Activo: 1 
       }
       console.log(Data) ; 

       FactoryCrearMecanico.editar(Data).then(function(res) {
           if(res.status == 200){
                if(Data.Activo == 1)
                {
                    $scope.mec['ACTIVO'] = "ACTIVO" ;
                }
                else{
                    $scope.mec['ACTIVO'] = "INACTIVO" ;
                }
               
                $.bootstrapGrowl("Mecanico editada exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.mec);
           }
           else {
               $.bootstrapGrowl("Error , Editar mecanico", { type: 'danger', delay: 10000 });
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

 