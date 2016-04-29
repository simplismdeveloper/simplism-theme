angular.module('simplism').service('MessageBox', function($q){
    var $body = $('body');
    var $messageBox = $('<div class="sd-message-box"></div>').appendTo($body);

    this.show = function(content, option) {
        var opt = $.extend({
            isConfirm: false,
            title: "알림",
            icon: "warning",
            type: "default",
            isAutoClose: false
        }, option);

        var deferred = $q.defer();

        //-- MessageBox 초기화
        $messageBox.empty();

        //-- MessageBox 클래스 지정
        $messageBox.attr('class', '');
        $messageBox.addClass('sd-message-box sd-message-box-' + opt.type);

        //-- MessageBox.Backdrop 넣기
        var $backdrop = $('<div class="sd-message-box-backdrop"></div>').appendTo($messageBox);
        if (opt.isAutoClose) {
            $backdrop.click(function () {
                $messageBox.removeClass('on');
                deferred.reject();
            });
        }

        //-- MessageBox.Dialog 넣기
        var $dialog = $('<div class="sd-message-box-dialog"></div>').appendTo($messageBox);

        //-- MessageBox.Dialog.Header 넣기
        var $header = $('<div class="sd-message-box-header"></div>').appendTo($dialog);
        $header.append('<i class="fa fa-fw fa-' + opt.icon + '"></i> &nbsp; ' + opt.title);

        //-- MessageBox.Dialog.Content 넣기
        var $content = $('<div class="pre-wrap sd-message-box-content"></div>').appendTo($dialog);
        $content.text(content);

        //-- MessageBox.Dialog.Footer 넣기
        var $footer = $('<div class="sd-message-box-footer"></div>').appendTo($dialog);
        if (opt.isConfirm) {
            //-- MessageBox.Dialog.Footer.CancelButton 넣기
            var $cancelButton = $('<button type="button" class="btn btn-link"><i class="fa fa-times"></i> 취소</button>').appendTo($footer);
            $cancelButton.click(function () {
                $messageBox.addClass('sd-animate');
                $messageBox.removeClass('on');
                deferred.reject();
            });
        }

        //-- MessageBox.Dialog.Footer.OkButton 넣기
        var $okButton = $('<button type="button" class="btn btn-primary"><i class="fa fa-check"></i> 확인</button>').appendTo($footer);
        $okButton.click(function () {
            $messageBox.addClass('sd-animate');
            $messageBox.removeClass('on');
            deferred.resolve();
        });

        $messageBox.get(0).offsetWidth = $messageBox.get(0).offsetWidth; //force a repaint;
        $messageBox.addClass('on sd-animate');

        $messageBox.on('transitionend', function (e) {
            if (e.target == $messageBox.find('.sd-message-box-dialog').get(0)) {
                $messageBox.removeClass('sd-animate');
            }
        });

        return deferred.promise;
    };
});
