/**
 * Created by GMG on 14/06/2016.
 */
SabuesoAPP.factory('FactoryEnlaces', function ($http, $q) {
    'use strict';
    var enlaceRequest=$q.defer();

    enlaceRequest.enlazar= function (data) {
        var request=$http({
            method: "POST",
            url: '/enlazar',
            data: data
        });
        return request;
    };

    enlaceRequest.desenlazar= function (data) {
        var request=$http({
            method: "DELETE",
            url: '/desenlazar',
            data: data,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });
        return request;
    };

    enlaceRequest.unidadesSinEnlace= function () {
        var request=$http({
            method: 'GET',
            url: '/unidadesSinEnlace'
        });
        return request;
    };

    enlaceRequest.rastraSinEnlace= function () {
        var request=$http({
            method: 'GET',
            url: '/rastraSinEnlace'
        });
        return request;
    };

    enlaceRequest.unidadesEnlazadas= function () {
        var request=$http({
            method: 'GET',
            url: '/enlazados'
        });
        return request;
    };

    enlaceRequest.crearRastra= function (data) {
        var request=$http({
            method: "POST",
            url: '/rastras',
            data: data
        });
        return request;
    };

    enlaceRequest.rastras= function () {
        var request=$http({
            method: 'GET',
            url: '/rastras'
        });
        return request;
    };

    enlaceRequest.editarRastra= function (params) {
        var request=$http({
            method: 'PUT',
            url: '/rastras',
            data: params
        });
        return request;
    };

    return enlaceRequest;
});