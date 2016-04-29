'use strict';

/**
 * @ngdoc directive
 * @module simplism
 * @name sdViewPager
 * @restrict E
 *
 * @param {expression} sdModel
 *
 * @description
 *
 */
angular.module('simplism').directive('sdViewPager', /*@ngInject*/ function ($parse) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.$watch(attr['sdModel'], function(value){
                if(value){
                    var $items = $(element).find('sd-view-pager-item');

                    var isPrevSelected = false;
                    $items.each(function(){
                        var $item = $(this);
                        var itemValueAttr = $item.attr('sd-value');
                        var itemScope = angular.element($item).scope();

                        var itemValue = $parse(itemValueAttr)(itemScope);

                        if(itemValue == value){
                            $item.addClass('open');
                            $('body, *[sd-fill]').addClass('disable-scroll');
                            $item.get(0).offsetWidth = $item.get(0).offsetWidth; // force a repaint;

                            $item.removeClass('pos-left');
                            $item.removeClass('pos-right');

                            isPrevSelected = true;
                        }else{

                            if(isPrevSelected){
                                $item.removeClass('pos-left');
                                $item.addClass('pos-right');
                            }else{
                                $item.removeClass('pos-right');
                                $item.addClass('pos-left');
                            }
                        }
                        console.log(itemValue, value, isPrevSelected);
                    });

                }else{
                    var $item = $(element).find('sd-view-pager-item').first();
                    var itemValueAttr = $item.attr('sd-value');
                    var itemScope = angular.element($item).scope();

                    var itemValue = $parse(itemValueAttr)(itemScope);

                    $parse(attr['sdModel']).assign(scope, itemValue);
                }
            });

            $(element).on('transitionend', 'sd-view-pager-item', function(){
                if($(this).hasClass('open')){
                    if($(this).hasClass('pos-left') || $(this).hasClass('pos-right')){
                        $(this).removeClass('open');
                        $('body, *[sd-fill]').removeClass('disable-scroll');
                    }
                }
            });
        }
    };
});



/**
 * @ngdoc directive
 * @module simplism
 * @name sdViewPagerItem
 * @restrict E
 *
 * @param {expression} sdValue
 *
 * @description
 *
 */