/**
 * @ngdoc directive
 * @module simplism
 * @name sdTextbox
 * @restrict E
 *
 * @param {string} placeholder
 * @param {expression} sdModel
 * @param {string} icon
 *
 * @description
 *
 */

angular.module('simplism').directive('sdTextbox', /*@ngInject*/ function () {
    return {
        restrict: 'E',
        template: '<input type="{{type ? type : \'text\'}}" class="form-control" placeholder="{{placeholder}}" ng-model="sdModel" sd-focusing="sdFocusing"><i ng-if="icon" class="fa fa-fw fa-{{icon}}"></i>',
        scope: {
            placeholder: '@?',
            sdModel: '=?',
            icon: '@?',
            type: '@?',
            sdFocusing: '=?'
        },
        link: function (scope, element, attr) {
        }
    }
});