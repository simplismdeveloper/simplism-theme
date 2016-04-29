/**
 * @ngdoc module
 * @name simplism
 * @module simplism
 *
 * @requires ui.router
 *
 * @description
 * # simplism
 *
 * 메인 모듈입니다.
 *
 */
angular.module('simplism', ["ui.router"]);

angular.module('simplism').config(/*@ngInject*/ function($provide, $stateProvider){
    //-- 한글입력적용이 안되는 오류 수정
    $provide.decorator('inputDirective', /*@ngInject*/ function($delegate){
        var directive = $delegate[0];
        angular.extend(directive.link, {
            post: function(scope, element, attr, ctrls) {
                return element.on('compositionupdate', function(event) {
                    return element.triggerHandler('compositionend');
                });
            }
        });
        return $delegate;
    });

    //-- ui-sref 빈칸일때, 오류가 나지 않고 작동만 안되도록
    $provide.decorator('uiSrefDirective', ['$delegate','$parse', function($delegate, $parse) {
        var prevLink = $delegate[0].link;

        $delegate[0].compile = function (_element, _attr){
            return function(scope, element, attr, ctrl, fn){
                if(attr['uiSref']){
                    prevLink(scope, element, attr, ctrl, fn);
                }
            };
        };
        return $delegate;
    }]);

    $stateProvider.state("root", {
        abstract: true,
        url: "",
        template: "<ui-view></ui-view>",
        resolve: {
            init: /*@ngInject*/ function(simplism) {
                return simplism.promise;
            }
        }
    });
});


/**
 * @ngdoc provider
 * @name simplismProvider
 * @requires ng.$injector
 * @requires ng.$q
 *
 * @description
 */
angular.module("simplism").provider('simplism', function (){
    this.initializer = null;

    /**
     * @ngdoc method
     * @name simplismProvider#setInitializer
     * @kind function
     *
     * @description
     * 프로그램 초기화 함수 등록
     *
     * @param {Function=} func 초기화 함수. 이 함수는 Injection되어 사용되고, 이 함수에서
     *      <code>Promise</code> 를 리턴하게 하면, Promise가 종료된 후에, 로딩이 끝난다.
     */
    this.setInitializer = function (func) {
        this.initializer = func;
    };

    this.$get = /*@ngInject*/ function($q, $injector){
        var deferred = $q.defer();

        var self = this;
        return {
            promise: deferred.promise,
            run: function() {
                if(self.initializer){
                    var prom = $injector.invoke(self.initializer);
                    if(prom && typeof prom.then == 'function'){
                        prom.then(function(){
                            deferred.resolve();
                        })
                    }else{
                        deferred.resolve();
                    }
                }

                return deferred.promise;
            }
        };
    };
});

angular.module("simplism").run(/*@ngInject*/ function(simplism, $rootScope, $compile, BlockUI){
    //-- App Loading 을 켬
    var $appLoading = $('<app-loading></app-loading>');
    $compile($appLoading)($rootScope);
    $('body').append($appLoading);

    //-- Init완료시 App Loading을 끔
    simplism.run().then(function(){
        $appLoading.on('transactionend.sd.init', function(){
            $appLoading.remove();
        });
    });

    //-- Size Class를 html에 넣음
    var sizing = function(){
        var $html = $('html');

        var currWidth = $(window).outerWidth();
        if(currWidth < 768 && !$html.hasClass('size-mobile')){
            $html.addClass('size-mobile');
            $html.removeClass('size-tablet');
            $html.removeClass('size-desktop');
            $html.removeClass('size-desktop-lg');

        }else if(currWidth >= 768 && currWidth < 992 && !$html.hasClass('size-tablet')){
            $html.removeClass('size-mobile');
            $html.addClass('size-tablet');
            $html.removeClass('size-desktop');
            $html.removeClass('size-desktop-lg');

        }else if(currWidth >= 992 && currWidth < 1200 && !$html.hasClass('size-desktop')){
            $html.removeClass('size-mobile');
            $html.removeClass('size-tablet');
            $html.addClass('size-desktop');
            $html.removeClass('size-desktop-lg');

        }else if(currWidth >= 1200 && !$html.hasClass('size-desktop-lg')){
            $html.removeClass('size-mobile');
            $html.removeClass('size-tablet');
            $html.removeClass('size-desktop');
            $html.addClass('size-desktop-lg');
        }
    };
    sizing();

    $(window).resize(function(e){
        sizing();
    });

    $rootScope.$on('$viewContentLoading', function(){
        BlockUI.show();
    });
    $rootScope.$on('$viewContentLoaded', function(){
        BlockUI.hide();
    });
});