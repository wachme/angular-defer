angular-defer
=============

Simple utility service for invoking asynchronous functions.
It allows scope to watch value returned from a asynchronous call.

Example:
--------

    var module = angular.module('example', ['Defer']);
    
    module.factory('Data', function($http, defer) {
        return defer(function(d) {  // d is the deferred object
            $http.get('/data.json').success(function(data) {
                d.resolve(data);  // resolve deferred and automatically update returned object
            });
        });
    });
    
    module.controller('Ctrl', function($scope, Data) {
        $scope.data = Data;  // you can refer to data in template
        
        $scope.$watch('data', function() {
            console.log('data has been updated!');
        });
    });
