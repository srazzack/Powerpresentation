//This jQuery plugin is used for making page text editable
(function ($) {

    $.fn.inline = function (options) {
        var element = $(this),
            settings = $.extend({ //defaults
            }, options);

        var main = function () {
            var textElement = $(this);
            var tempField = $('<input name="temp" type="text"></input>');

            textElement.hide();
            textElement.after(tempField);
            tempField.focus();

            tempField.on("blur keydown", function (e) {

                if (e.which === 0) {
                    console.log(e);
                    element.text(tempField.val());
                    element.show();
                    settings.callback(tempField.val());
                    tempField.remove();

                } else if (e.which === 13) {
                    console.log(e);
                    element.text(tempField.val());
                    element.show();
                    settings.callback(tempField.val());
                    tempField.remove();
                }
            })
        };
        element.on("click", main);
    };

})(jQuery);