/**
 * @ngdoc directive
 * @module simplism
 * @name sdTable
 * @restrict E
 *
 * @description
 *
 */
angular.module('simplism').directive('sdTable', /*@ngInject*/ function ($compile, $timeout) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            var $thead = $(element).children('table').children('thead');
            var $header = $thead.clone();
            $compile($header)(scope);
            $header.css('visibility', 'hidden');

            var $headerTable = $('<table class="sd-table-header"></table>');
            $headerTable.append($header);

            $(element).prepend($headerTable);

            var timeout;
            var columnSizing = function(){
                if(timeout) $timeout.cancel(timeout);
                timeout = $timeout(function() {
                    $header.css('visibility', 'visible');

                    $header.css({
                        top: $(element).offset().top,
                        left: $(element).offset().left,
                        display: 'block'
                    });

                    var $theadColumns = $thead.find('th');
                    var $headerColumns = $header.find('th');
                    $headerColumns.each(function (index) {
                        var orgWidth = $($theadColumns[index]).outerWidth();
                        $(this).outerWidth(orgWidth);
                    });
                }, 300);
            };

            $(window).resize(function(){
                columnSizing();
            });
            $(document).on('transitionend', function(e){
                columnSizing();
            });
            scope.$watch(function(){
                columnSizing();
            });
            columnSizing();
        }
    };
});