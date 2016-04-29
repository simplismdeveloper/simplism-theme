/**
 * @ngdoc directive
 * @module simplism
 * @name sdCheckbox
 * @restrict E
 *
 * @param {string} sdInnerClass
 * @param {string} sdText
 * @param {expression} sdModel
 * @param {expression} sdDisabled
 *
 * @description
 *
 */
angular.module('simplism').directive('sdCheckbox', /*@ngInject*/ function ($parse) {
    return {
        restrict: 'E',
        template: '<label class="sd-checkbox {{sdInnerClass}}" tabindex="0"><input type="checkbox" ng-model="sdModel" ng-disabled="sdDisabled"/><span>{{sdText}}</span></label>',
        scope: {
            'sdInnerClass': "@",
            'sdText': '@',
            'sdModel': '=?',
            'sdDisabled': '=?',
            'sdOneway': '=?'
        },
        link: function (scope, element, attr) {
            $(element).find('label').on('keydown', function(e){
                if(e.which == 32){
                    scope.sdModel = !scope.sdModel;
                    scope.$apply();
                }
            });
        }
    };
});