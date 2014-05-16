describe('Defer', function() {
    
    var injector = angular.injector(['ng', 'Defer']);
    
    describe('defer function', function(done) {
        injector.invoke(function($timeout, $rootScope, defer) {
            var obj = { test: 'OK' };
            
            $rootScope.obj = defer(function(d) {
                $timeout(function() {
                    d.resolve(obj);
                }, 1000);
            });
            
            it('returns object with $resolved and $promise fields', function() {
                expect($rootScope.obj).toEqual(jasmine.objectContaining({
                    '$resolved': false,
                    '$promise': jasmine.any(Object)
                }));
            })

            it('updates the object and sets $resolved to true', function(done) {
                $rootScope.$watch('obj', function(newValue) {
                    expect(newValue).toEqual($rootScope.obj);
                    expect($rootScope.obj).toEqual(jasmine.objectContaining(angular.extend({
                        '$resolved': true,
                        '$promise': jasmine.any(Object)
                    }, obj)));

                    done();
                });
            });
        });
    
    });
});
