/**
 * @ngdoc directive
 * @module simplism
 * @name sdFocusing
 * @restrict A
 *
 * @param {expression} sdFocusing
 *
 * @description
 *
 */
angular.module('simplism').directive('sdFocusing', /*@ngInject*/ function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if(attr['sdFocusing']){
                scope.$watch(attr['sdFocusing'], function(value){
                    if(value){
                        $(element).get(0).focus();
                        if($(element).get(0).tagName.toLowerCase() == 'input'){
                            $(element).get(0).select();
                        }
                    }
                });
            }else{
                $(element).get(0).focus();
                $(element).get(0).select();
            }
        }
    };
});