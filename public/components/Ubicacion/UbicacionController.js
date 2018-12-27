SabuesoAPP.controller("UbicacionController", function( $scope , FactoryCrearUbicacion ,ServiceUbicacion , $uibModal  )
{




  
  $scope.modificarUbicacion = function(ubi){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/Ubicacion/EditUbicacion.html',
     controller: 'editarUbicacionCtrl',
      size:'lg',
      resolve: {
        ubi: function(){
          return ubi;
        }
      }
    });
 

    modalInstance.result.then(function(newubi){
        console.log(newubi) ; 
        
      if(typeof newubi !== 'undefined'){
        idx = _.findIndex(ServiceUbicacion.listaUbicacion, ubi );
        ServiceUbicacion.listaUbicacion[idx] = newubi;
        $scope.listarUbicacion();
      }
    });    

}




 $scope.eliminarUbicacion = function (elemento ,idUbicacion )
 {
    FactoryCrearUbicacion.eliminar({PKUbicacion:idUbicacion}).then(function(d) {
        if(d.data.msg == true)
        {
            var index = ServiceUbicacion.listaUbicacion.indexOf(elemento) ; 
            ServiceUbicacion.listaUbicacion.splice(index , 1) ; 
            ServiceUbicacion.listaUbicacion = [] ;
            $scope.listarUbicacion() ; 
            $.bootstrapGrowl("Exito, Ubincacion se ha inactivado",  {type: 'success',delay: 120000});
        }
        else {
            $.bootstrapGrowl("Error, Ubicacoin no se ha inactivado",  {type: 'danger',delay: 120000});
        }
    });
 }

 

  $scope.showform = function ()
  {
      var modalInstance = $uibModal.open({
          animation: true , 
          templateUrl: 'components/Ubicacion/CreateUbicacion.html',
          controller: 'guardarUbicacionctrl' ,
          size: 'lg', 
          resolve: {
           function: function(){
               return [];
           }   
          }
      });

      modalInstance.result.then(function(){
        //  ServiceMarcaVehiculo.listaMarcaVehiculo = [];
         $scope.listarUbicacion();
      });
     
  }



 $scope.listaUbicacion = function(){
    return  ServiceUbicacion.listaUbicacion ; 
 }


 $scope.listarUbicacion= function()
 {
    FactoryCrearUbicacion.get().then(function(d) {
        ServiceUbicacion.listaUbicacion = d.data.info ; 
     });
 }


  


})



 SabuesoAPP.controller('guardarUbicacionctrl' , function( $scope , $uibModalInstance, FactoryCrearTaller , ServiceTaller , FactoryCrearUbicacion , ServiceUbicacion )
{

 
    $scope.listaTaller = function(){
        return  ServiceTaller.listaTaller ; 
     }
    
    
     $scope.listarTaller= function()
     {
         FactoryCrearTaller.get().then(function(d) {
             ServiceTaller.listaTaller = d.data.info ; 
         });
     }

     $scope.init = function(){
        $scope.listarTaller();
     }
     
 
 $scope.guardarUbicacion = function()
 {
     var data = {  
        Codigo: $scope.cod , 
        Descripcion: $scope.Descp ,
        FKTaller: $scope.tallPKTaller.PKTaller
     } ;

     console.log(data) ; 
     FactoryCrearUbicacion.guardar(data).then( function(d) {
         if(d.data.msg == true)
         {
            $.bootstrapGrowl(" Ubicacion guardado exitosamente !!" , {type: 'success' , delay: 120000 } ) ;
            $uibModalInstance.close('')  ;
         }
         else{
            $.bootstrapGrowl("Error, Ubicacion no se ha guardado ", {type: 'danger', delay: 120000 } ) ;
         } 
     });
 }
 

}) ;



SabuesoAPP.controller( 'editarUbicacionCtrl' , function( $scope , FactoryCrearTaller , ServiceTaller , $filter , $uibModalInstance , $uibModal , ubi , FactoryCrearUbicacion , ServiceUbicacion )
{
   
  

    $scope.listaTaller = function(){
        return  ServiceTaller.listaTaller ; 
     }
    
    
     $scope.listarTaller= function()
     {
         FactoryCrearTaller.get().then(function(d) {
             ServiceTaller.listaTaller = d.data.info ; 
         });
     }

 /*
    $scope.listaUbicacion = function(){
        return  ServiceUbicacion.listaUbicacion ; 
     }
    
    
     $scope.listarUbicacion= function()
     {
        FactoryCrearUbicacion.get().then(function(d) {
            ServiceUbicacion.listaUbicacion = d.data.info ; 
         });
     }
    */

    $scope.init = function(){
   console.log(ubi) ;
        $scope.ubi = ubi ;
      
        $scope.listarTaller() ; 
        $scope.dataTaller = {
            PKTaller: $scope.ubi.FKTaller , 
            NombreCorto: $scope.ubi.NombreCorto
        } ;
    }



   $scope.editarUbicacion = function(){
       data = {
        PKUbicacion: $scope.ubi.PKUbicacion , 
        Codigo: $scope.ubi.Codigo , 
        Descripcion: $scope.ubi.Descripcion , 
        FKTaller: $scope.dataTaller.PKTaller , 
        Activo: 1 
       }
       console.log(data) ; 

       FactoryCrearUbicacion.editar(data).then(function(res) {
           if(res.status == 200){
                if(data.Activo == 1)
                {
                    $scope.ubi['ACTIVO'] = "ACTIVO" ;
                }
                else{
                    $scope.ubi['ACTIVO'] = "INACTIVO" ;
                }
               
                $.bootstrapGrowl("Ubicacion editada exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.ubi);
           }
           else {
               $.bootstrapGrowl("Error , Editar ubicacion", { type: 'danger', delay: 10000 });
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

