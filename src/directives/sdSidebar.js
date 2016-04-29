/**
 * @ngdoc directive
 * @module simplism
 * @name sdSidebar
 * @restrict E
 *
 * @description
 *
 */
angular.module('simplism').directive('sdSidebar', /*@ngInject*/ function () {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            var slideDown = function($elem){
                $elem.addClass('sd-animate');
                var elemHeight = $elem.get(0).scrollHeight;
                $elem.css('height', elemHeight);
            };

            var slideUp = function($elem){
                $elem.addClass('sd-animate');
                $elem.css('height', 0);
            };

            $(element).on('transitionend', function(e){
                var $target = $(e.target);
                $target.removeClass('sd-animate');
            });

            $(element).on('click', 'sd-sidebar-menu-item > a', function(){
                var $item = $(this).parent();
                var $childMenu = $item.children('sd-sidebar-menu');
                if($childMenu.length > 0){
                    if($item.hasClass('on')){
                        var $itemChildMenu = $item.children('sd-sidebar-menu');
                        if($itemChildMenu.length > 0) slideUp($itemChildMenu);

                        var $currItem = $item.find('sd-sidebar-menu-item.on');
                        $currItem.removeClass('on');
                        var $itemsItemChildMenu = $currItem.children('sd-sidebar-menu');
                        if($itemsItemChildMenu.length > 0) slideUp($itemsItemChildMenu);

                        $item.removeClass('on');
                    }else{
                        $(element).find('sd-sidebar-menu-item.on').each(function(){
                            if($(this).has($childMenu).length < 1){
                                $(this).removeClass('on');

                                var $thisChildMenu = $(this).children('sd-sidebar-menu');
                                if($thisChildMenu.length > 0){
                                    slideUp($thisChildMenu)
                                }
                            }
                        });

                        $item.addClass('on');
                        slideDown($childMenu);
                    }
                }
            });
        }
    };
});