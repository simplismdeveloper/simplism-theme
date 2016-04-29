angular.module('simplism').filter('query', function(){
    return function(obj) {
        return decodeURIComponent(querystring.stringify(obj));
    };
});