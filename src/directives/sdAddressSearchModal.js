/**
 * @ngdoc directive
 * @module simplism
 * @name sdAddressSearchModal
 * @restrict E
 *
 * @param {bool} sdOpen
 * @param {expression} sdResult
 * @param {string} sdSearchText
 *
 * @description
 *
 */
angular.module('simplism').directive('sdAddressSearchModal', /*@ngInject*/ function ($timeout) {
    return {
        restrict: 'E',
        template: '' +
        '<sd-modal sd-open="sdOpen">' +
        '   <div class="sd-modal-dialog" style="min-width: 350px;">' +
        '       <div class="sd-modal-header">' +
        '           <div class="pull-right">' +
        '               <a class="sd-modal-header-btn sd-modal-header-btn-muted" ng-click="sdOpen = false"><i class="fa fa-times fa-fw"></i></a>' +
        '           </div>' +
        '           <h4 class="sd-modal-title">우편번호 주소검색</h4>' +
        '       </div>' +
        '       <div class="sd-note sd-note-info sd-note-inset">다음 주소검색 서비스를 사용합니다.</div>' +
        '       <div class="sd-address-search-modal-content" ng-class="{hidden: sdLoading}">' +
        '       </div>' +
        '       <div class="sd-modal-body" ng-class="{hidden: !sdLoading}">' +
        '           <i class="fa fa-circle-o-notch fa-spin"></i> 다음 주소 검색창을 준비하고 있습니다.' +
        '       </div>' +
        '   </div>' +
        '</sd-modal>',
        scope: {
            sdOpen: '=',
            sdResult: '=?',
            sdSearchText: '=?'
        },
        link: function(scope, element, attr){
            scope.sdLoading = false;

            scope.$watch('sdOpen', function(value){
                var $content = $(element).find('.sd-address-search-modal-content');

                var show = function(){
                    daum.postcode.load(function(){
                        var postcode = new daum.Postcode({
                            height : '100%',
                            width: '100%',
                            theme: {
                                bgColor: "#222", //바탕 배경색
                                searchBgColor: "#222", //검색창 배경색
                                contentBgColor: "#222", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
                                pageBgColor: "#222", //페이지 배경색
                                textColor: "#eee", //기본 글자색
                                queryTextColor: "#eee", //검색창 글자색
                                //postcodeTextColor: "", //우편번호 글자색
                                //emphTextColor: "", //강조 글자색
                                outlineColor: "#333" //테두리
                            },
                            oncomplete: function(data) {
                                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
                                scope.sdResult = {
                                    postcode: data.zonecode,
                                    address: data.address
                                };
                                scope.sdOpen = false;
                                scope.$apply();
                            }
                        });
                        postcode.embed($content.get(0), {
                            q: scope.sdSearchText,
                            autoClose: false
                        });

                        //-- 최대한 안 깜빡이게
                        $(element).find('iframe').css('background', '#222');
                        $(element).find('iframe').contents().find('*').css('background', '#222');
                        $(element).find('iframe').contents().find('iframe').css('background', '#222');
                        $(element).find('iframe').contents().find('iframe').contents().find('*').css('background', '#222');

                        $(element).find('iframe').contents().find('iframe').load(function(){
                            console.log('test');
                            scope.sdLoading = false;
                            scope.$apply();
                        });
                    });
                };

                if(value){
                    scope.sdLoading = true;

                    $timeout(function(){

                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.async = true;
                        script.src = 'http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false';


                        if(script.readyState){ //IE
                            script.onreadystatechange = function () {
                                if (script.readyState == "loaded" || script.readyState == "complete") {
                                    script.onreadystatechange = null;
                                    show();
                                }
                            };
                        }
                        else{
                            script.onload = function () {
                                show();
                            };
                        }
                        document.getElementsByTagName('body')[0].appendChild(script);
                    }, 300);
                }else{
                    $content.empty();
                }
            });
        }
    };
});