angular.module('simplism').provider('BlockUI', function(){
    var $body = $('body');

    var $blockUI = $('<div class="sd-block-ui"></div>');
    $blockUI.append('<div class="sd-block-ui-backdrop"></div>');

    $body.append($blockUI);

    var $container = $('<div class="sd-block-ui-container"></div>');
    $blockUI.append($container);

    var $shape = $('<div class="sd-block-ui-shape"></div>');
    $container.append($shape);

    $shape.append('<svg class="circle" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>');
    $shape.append('<svg class="circle2" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>');
    //$shape.append('<svg class="icon" x="0px" y="0px" width="128px" height="128px" viewBox="0 0 128 128" enable-background="new 0 0 128 128" xml:space="preserve"><g id="레이어_1"><polygon fill="#FFFFFF" points="20.25,128 66.5,0 128,114.25 0,63.634 101.5,89.75 68.25,33 	"/></g><g id="레이어_2"><circle fill="#FFFFFF" cx="42.639" cy="76.436" r="8.798"/></g></svg>');
    var $icon = null;

    var $content = $('<div class="sd-block-ui-content"></div>');
    $container.append($content);

    var count = 0;

    return {
        setIconHtml: function(html){
            if($icon) $icon.remove();
            $icon = $(html);
            $icon.addClass('icon');
            $shape.append($icon);
        },
        $get: function(){
            return {
                show: function(content){
                    count++;
                    if(content){
                        $content.html(content);
                    }else{
                        $content.html('');
                    }

                    $blockUI.get(0).offsetWidth = $blockUI.get(0).offsetWidth; //force a repaint;
                    $blockUI.addClass('on sd-animate');

                    $blockUI.off('transitionend.sd.block-ui').on('transitionend.sd.block-ui', function(){
                        $(this).removeClass('sd-animate');
                    });
                },
                hide: function(){
                    count--;
                    if(count < 1){
                        $blockUI.addClass('sd-animate');
                        $blockUI.removeClass('on');

                        $blockUI.off('transitionend.sd.block-ui').on('transitionend.sd.block-ui', function () {
                            $blockUI.removeClass('sd-animate');
                            //$blockUI.remove();
                        });
                    }
                }
            };
        }
    }
});
