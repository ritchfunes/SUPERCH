/**
 * Created by Roberto on 05/08/2015.
 */

var SabuesoAPP = angular.module("Sabueso",['leaflet-directive','angularMoment','leaflet-directive','ui.bootstrap']);





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
    }])






