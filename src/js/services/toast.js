angular.module('simplism').factory('toast', function($timeout){
    return function(content, options){
        var opts = $.extend({
            type: 'info'
        }, options);

        var $body = $('body');
        var $toast = $('<div class="sd-toast sd-toast-' + opts.type + '"><div class="pre-wrap sd-toast-block">' + content + '</div></div>').appendTo($body);
        $toast.get(0).offsetWidth = $toast.get(0).offsetWidth; //force a repaint;
        $toast.addClass('on sd-animate');

        $toast.on('transitionend.sd.toast', function(){
            $toast.removeClass('sd-animate');
            if(!$toast.hasClass('on')){
                $toast.remove();
            }
        });

        $timeout(function(){
            $toast.addClass('sd-animate');
            $toast.removeClass('on');
        }, 5000);
    }
});