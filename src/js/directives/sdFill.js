/**
 * @ngdoc directive
 * @module simplism
 * @name sdFill
 * @restrict A
 *
 * @description
 *
 */
angular.module('simplism').directive('sdFill', /*@ngInject*/ function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var setting = function(){
                $(element).css({
                    position: '',
                    top: '',
                    left: '',
                    bottom: '',
                    right: '',
                    "overflow-y": ''
                });
                $(element).get(0).offsetWidth = $(element).get(0).offsetWidth; //force a repaint
                $(element).css({
                    position: 'absolute',
                    top: $(element).position().top,
                    left: $(element).position().left,
                    bottom: 0,
                    right: 0,
                    "overflow-y": 'auto'
                });
            };
            var timeout;
            $(window).resize(function(){
                if(timeout) $timeout.cancel(timeout);
                timeout = $timeout(function(){
                    setting();
                }, 100);
            });
            setting();
        }
    };
});