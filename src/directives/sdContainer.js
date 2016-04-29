/**
 * @ngdoc directive
 * @module simplism
 * @name sdContainer
 * @restrict E
 *
 * @description
 *
 */
angular.module('simplism').directive('sdContainer', /*@ngInject*/ function ($rootScope) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            var $sidebarBackdrop = $('<div class="sd-sidebar-backdrop"></div>');
            $(element).prepend($sidebarBackdrop);
            $sidebarBackdrop.on('click', function(){
                $(element).removeClass('toggle');
            });

            $(element).on('click', 'sd-container-toggler', function(){
                $(element).addClass('toggle');
            });

            $rootScope.$on('$stateChangeStart', function(){
                $(element).removeClass('toggle');
            });
        }
    };
});