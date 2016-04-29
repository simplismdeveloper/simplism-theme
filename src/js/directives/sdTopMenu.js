/**
 * @ngdoc directive
 * @module simplism
 * @name sdTopMenu
 * @restrict E
 *
 * @param sdOpen {expression}
 * @param sdTop {expression}
 *
 * @description
 *
 */
angular.module('simplism').directive('sdTopMenu', /*@ngInject*/ function ($parse) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {

            $(element).on('transitionend.sd.topbar-menu', function(e){
                if(e.target == $(element).get(0)){
                    $(element).removeClass('sd-animate');
                }
            });

            var $backdrop;
            scope.$watch(attr['sdOpen'], function(value){
                if(value){
                    var top = $parse(attr['sdTop'])(scope);
                    $(element).css('top', top);
                    $(element).get(0).offsetWidth = $(element).get(0).offsetWidth; //force a repaint;

                    $(element).addClass('on sd-animate');
                    $backdrop = $('<div class="sd-top-menu-backdrop"></div>');
                    $(element).before($backdrop);
                    $backdrop.click(function(){
                        $parse(attr['sdOpen']).assign(scope, false);
                        scope.$apply();
                    });
                }else{
                    $(element).removeClass('on');
                    if($backdrop) $backdrop.remove();
                }
            });
        }
    };
});