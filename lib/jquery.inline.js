//This jQuery plugin is used for making page text editable
(function ($) {

    $.fn.inline = function (options) {
        var element = $(this),
            settings = $.extend({currentValue: element.text(),
                defaultValue: ""
            }, options);

            //console.log('settings.defaultValue', settings.defaultValue);

        var main = function () {
            
            var textElement = $(this);
            var tempField = $('<input name="temp" type="text"></input>');

            textElement.hide();
            textElement.after(tempField);
            tempField.text(settings.currentValue);

            if(settings.defaultValue == settings.currentValue){
               tempField.val("");
            }
            else {
                tempField.val(settings.currentValue);
            }
            
            tempField.focus();

            tempField.on("blur keydown", function (event) {
    
                var newValue = element.text(tempField.val());

                if (event.which === 0) {
                    if(tempField.val() == ""){
                        tempField.val(settings.defaultValue);
                    }
                    element.text(tempField.val());
                    element.show();
                    settings.callback(tempField.val());
                    tempField.remove();
                    settings.currentValue = tempField.val();
                    console.log(settings.currentValue);
                } 
                else if (event.which === 13) {
                    if(tempField.val() == ""){
                        tempField.val(settings.defaultValue);
                    }
                    element.text(tempField.val());
                    element.show();
                    settings.callback(tempField.val());
                    tempField.remove();
                    settings.currentValue = tempField.val();
                }

                if (element.text() == ""){
                    element.text(settings.currentValue);
                }
            })
        };
        element.on("click", main);
    };
    
})(jQuery);