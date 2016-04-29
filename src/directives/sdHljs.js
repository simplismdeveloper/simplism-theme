/**
 * @ngdoc directive
 * @module simplism
 * @name sdHljs
 * @restrict E
 *
 * @param sdType {string}
 * @param sdModel {expression}
 *
 * @description
 *
 */
angular.module('simplism').directive('sdHljs', /*@ngInject*/ function () {
    return {
        restrict: 'E',
        scope: {
            sdType: '@',
            sdModel: '='
        },
        template: '<pre><code class="{{sdType}}">{{sdModel}}</code></pre>',
        link: function (scope, element, attr){
            scope.$watch('sdModel', function(value){
                hljs.highlightBlock($(element).children('pre').children('code').get(0));
            })
        }
    };
});