//This jQuery plugin is used for making page text editable
(function ($) {

    $.fn.inline = function (options) {
        var element = $(this),
            settings = $.extend({originalValue: element.text()
            }, options);

        var main = function () {
            var textElement = $(this);
            var tempField = $('<input name="temp" type="text"></input>');

            textElement.hide();
            textElement.after(tempField);
            tempField.text(settings.originalValue);
            tempField.val(settings.originalValue);
            tempField.focus();

            tempField.on("blur keydown", function (event) {
    
                var newValue = element.text(tempField.val());

                if (event.which === 0) {
                    element.text(tempField.val());
                    element.show();
                    settings.callback(tempField.val());
                    tempField.remove();
                    settings.originalValue = tempField.val();
                    console.log(settings.originalValue);
                } 
                else if (event.which === 13) {
                    element.text(tempField.val());
                    element.show();
                    settings.callback(tempField.val());
                    tempField.remove();
                    settings.originalValue = tempField.val();
                }

                if (element.text() == ""){
                    element.text(settings.originalValue);
                }
            })
        };
        element.on("click", main);
    };
    
})(jQuery);