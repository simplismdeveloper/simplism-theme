/**
 * @ngdoc directive
 * @module simplism
 * @name sdTab
 * @restrict E
 *
 * @param {expression} sdModel
 *
 * @description
 *
 */
angular.module('simplism').directive('sdTab', /*@ngInject*/ function ($parse) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            var $selector = $('<div class="sd-tab-selector"></div>');
            $(element).append($selector);

            $(element).on('click', 'sd-tab-item', function(){
                var $item = $(this);

                scope.$apply(function(){
                    var itemValueAttr = $item.attr('sd-value');
                    var itemScope = angular.element($item).scope();

                    var itemValue = $parse(itemValueAttr)(itemScope);

                    $parse(attr['sdModel']).assign(scope, itemValue);
                });
            });

            scope.$watch(attr['sdModel'], function(value){
                if(value){
                    var $items = $(element).find('sd-tab-item');
                    $items.each(function() {
                        var $item = $(this);
                        var itemValueAttr = $item.attr('sd-value');
                        var itemScope = angular.element($item).scope();

                        var itemValue = $parse(itemValueAttr)(itemScope);

                        if(itemValue == value){
                            $item.addClass('active');
                            $selector.css({
                                top: $item.outerHeight() - 2,
                                left: $item.position().left,
                                width: $item.outerWidth()
                            })
                        }else{
                            $item.removeClass('active');
                        }
                    });
                }else{
                    $(element).find('sd-tab-item').removeClass('active');
                }
            });
        }
    };
});



/**
 * @ngdoc directive
 * @module simplism
 * @name sdTabItem
 * @restrict E
 *
 * @param {expression} sdValue
 *
 * @description
 *
 */