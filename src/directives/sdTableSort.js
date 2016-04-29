/**
 * @ngdoc directive
 * @module simplism
 * @name sdTableSort
 * @restrict A
 *
 * @param sdTableSort {expression}
 *
 * @description
 *
 */
angular.module('simplism').directive('sdTableSort', /*@ngInject*/ function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            $(element).on('click', '*[sd-table-sort-field]', function(){
                var fieldName = $(this).attr('sd-table-sort-field');

                var current = $parse(attr['sdTableSort'])(scope);
                var currentIndex = current.indexOf(fieldName);
                var currentIndex2 = current.indexOf('-' + fieldName);
                if(currentIndex > -1){
                    current[currentIndex] = '-' + fieldName;
                }else if(currentIndex2 > -1){
                    current.remove(current[currentIndex2]);
                }else{
                    current.clear();
                    current.push(fieldName);
                }

                scope.$apply();
            });

            scope.$watchCollection(attr['sdTableSort'], function(value){
                if(value){
                    var $fields = $(element).find('*[sd-table-sort-field]');
                    $fields.removeClass('sd-table-sort-desc');
                    $fields.removeClass('sd-table-sort-asc');

                    for(var i = 0 ; i < value.length ; i++){
                        var item = value[i];
                        var fieldName = item.replace('-', '');

                        var orderType = item.indexOf('-') == 0 ? 'desc': 'asc';

                        var $field = $(element).find('*[sd-table-sort-field="' + fieldName + '"]');
                        $field.addClass('sd-table-sort-' + orderType);
                    }
                }
            });
        }
    };
});