
/**
 * Created by Roberto on 19/10/2015.
 */
var SabuesoAPP = angular.module("Sabueso",['ui.bootstrap',
                                            'angularMoment',
                                            'leaflet-directive',
                                            'angular-loading-bar',
                                            'pasvaz.bindonce',
                                            'angularjs-dropdown-multiselect',
                                            'ngCookies',
                                            'angular-toArrayFilter',
                                            'jqwidgets',
                                            'angular-web-notification'
                                            ]);

var SabuesoInvitadoAPP = angular.module("SabuesoInvitado",['ui.bootstrap',
    'angularMoment',
    'leaflet-directive',
    'jqwidgets'
]);

SabuesoAPP.directive('ngConfirmClick', [
    function( $http){
        return {
            link: function (scope,element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$apply(clickAction)
                    }
                });
            }
        };
    }]);


SabuesoAPP.directive('ngReallyClick', ['$modal',
    function($modal) {

      var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.ok = function() {
          $modalInstance.close();
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      return {
        restrict: 'A',
        scope: {
          ngReallyClick:"&"
        },
        link: function(scope, element, attrs) {
          element.bind('click', function() {
            var message = attrs.ngReallyMessage || "Are you sure ?";

            var modalHtml = '<div class="modal-body">' + message + '</div>';
            modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">Si, Confirmar</button><button class="btn btn-warning" ng-click="cancel()">Cancelar</button></div>';

            var modalInstance = $modal.open({
              template: modalHtml,
              controller: ModalInstanceCtrl
            });

            modalInstance.result.then(function() {
              scope.ngReallyClick();
            }, function() {
              //Modal dismissed
            });

          });

        }
      }
    }


  ]);

SabuesoAPP.directive('ngModel', function( $filter ) {
    return {
        require: '?ngModel',
        link: function(scope, elem, attr, ngModel) {
            if( !ngModel )
                return;
            if( attr.type !== 'time' )
                return;
                    
            ngModel.$formatters.unshift(function(value) {
                return value.replace("/:00\.000$/", '')
            });
        }
    }   
}); 

SabuesoAPP
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);
SabuesoAPP
  .config(['$logProvider', function($logProvider){
    $logProvider.debugEnabled(false);
  }]);
