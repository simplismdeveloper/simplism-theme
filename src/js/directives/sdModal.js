/**
 * @ngdoc directive
 * @module simplism
 * @name sdModal
 * @restrict E
 *
 * @param {expression} sdOpen
 *
 * @description
 *
 */
angular.module('simplism').directive('sdModal', /*@ngInject*/ function ($parse) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            var $backdrop = $('<div class="sd-modal-backdrop"></div>');
            $(element).prepend($backdrop);
            $backdrop.on('click', function(){
                scope.$apply(function(){
                    $parse(attr['sdOpen']).assign(scope, false);
                });
            });

            var prevFocused;
            scope.$watch(attr['sdOpen'], function(value){
                if(value){
                    prevFocused = document.activeElement;
                    prevFocused.blur();

                    $(element).addClass('open');
                    $('body, *[sd-fill]').addClass('disable-scroll');
                }else{
                    if(prevFocused) prevFocused.focus();

                    $(element).removeClass('open');
                    $('body, *[sd-fill]').removeClass('disable-scroll');
                }
            });
        }
    };
});