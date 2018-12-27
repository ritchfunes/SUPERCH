SabuesoAPP.controller("TallerController", function( $scope , FactoryCrearTaller ,ServiceTaller , $uibModal  )
{




  
  $scope.modificartaller = function(tall){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/Taller/EditTaller.html',
     controller: 'editarTallerCtrl',
      size:'lg',
      resolve: {
        tall: function(){
          return tall;
        }
      }
    });
 

    modalInstance.result.then(function(newtall){
        console.log(newtall) ; 
      if(typeof newtall !== 'undefined'){
        idx = _.findIndex(ServiceTaller.listaTaller, tall );
        ServiceTaller.listaTaller[idx] = newtall;
      }
    });    

}



 $scope.eliminarTaller = function (elemento ,idTaller )
 {
    FactoryCrearTaller.eliminar({PKTaller:idTaller}).then(function(d) {
        if(d.data.msg == true)
        {
            var index = ServiceTaller.listaTaller.indexOf(elemento) ; 
            ServiceTaller.listaTaller.splice(index , 1) ; 
            ServiceTaller.listaTaller = [] ;
            $scope.listarTaller() ; 
            $.bootstrapGrowl("Error, Taller se ha inactivado",  {type: 'success',delay: 120000});
        }
        else {
            $.bootstrapGrowl("Error, Taller no se ha inactivado",  {type: 'danger',delay: 120000});
        }
    });
 }

  $scope.showform = function ()
  {
      var modalInstance = $uibModal.open({
          animation: true , 
          templateUrl: 'components/Taller/AddTaller.html',
          controller: 'guardarTallerctrl' ,
          size: 'lg', 
          resolve: {
           function: function(){
               return [];
           }   
          }
      });

      modalInstance.result.then(function(){
        //  ServiceMarcaVehiculo.listaMarcaVehiculo = [];
         $scope.listarTaller();
      });
     
  }



 $scope.listaTaller = function(){
    return  ServiceTaller.listaTaller ; 
 }


 $scope.listarTaller= function()
 {
     FactoryCrearTaller.get().then(function(d) {
         ServiceTaller.listaTaller = d.data.info ; 
     });
 }


  


})



 SabuesoAPP.controller('guardarTallerctrl' , function( $scope , $uibModalInstance, FactoryCrearTaller , ServiceTaller )
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
     
 
 $scope.guardarTaller = function()
 {
     var data = {  
        NombreCorto: $scope.Nombcorto , 
        NombreLargo: $scope.nomblargo
     } ;

     console.log(data) ; 
     FactoryCrearTaller.guardar(data).then( function(d) {
         if(d.data.msg == true)
         {
            $.bootstrapGrowl(" Taller guardado exitosamente !!" , {type: 'success' , delay: 120000 } ) ;
            $uibModalInstance.close('')  ;
         }
         else{
            $.bootstrapGrowl("Error, Taller no se ha guardado ", {type: 'danger', delay: 120000 } ) ;
         } 
     });
 }
 

}) ;


SabuesoAPP.controller( 'editarTallerCtrl' , function( $scope , FactoryCrearTaller , ServiceTaller , $filter , $uibModalInstance , $uibModal , tall )
{
   
  

 

    $scope.init = function(){
   console.log(tall) ;
        $scope.tall = tall ;
      
    }



   $scope.editarTaller = function(){
       data = {
        PKTaller: $scope.tall.PKTaller , 
           NombreCorto: $scope.tall.NombreCorto , 
           NombreLargo: $scope.tall.NombreLargo , 
           Activo: 1 
       }
       console.log(data) ; 

       FactoryCrearTaller.editar(data).then(function(res) {
           if(res.status == 200){
                if(data.Activo == 1)
                {
                    $scope.tall['ACTIVO'] = "ACTIVO" ;
                }
                else{
                    $scope.tall['ACTIVO'] = "INACTIVO" ;
                }
               
                $.bootstrapGrowl("Taller editada exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.tall);
           }
           else {
               $.bootstrapGrowl("Error , Editar taller", { type: 'danger', delay: 10000 });
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

