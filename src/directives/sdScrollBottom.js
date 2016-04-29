/**
 * @ngdoc directive
 * @module simplism
 * @name sdScrollBottom
 * @restrict A
 *
 * @param {expression} sdScrollBottom
 *
 * @description
 *
 */
angular.module('simplism').directive('sdScrollBottom', /*@ngInject*/ function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            $(element).scroll(function(){
                if($(element).scrollTop() + $(element).innerHeight()>=$(element)[0].scrollHeight){
                    $parse(attr['sdScrollBottom'])(scope);
                }
            });
        }
    };
});