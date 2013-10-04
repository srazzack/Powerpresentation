//This jQuery plugin is used for making page text editable
(function($){

	$.fn.textEdit = function( options ){
	var element = $(this),
		settings = $.extend({ //defaults
			color: "#556b2f",
			backgroundColor: "white",
			textSize: "100%",
			hiddenInputField: $('input[name="hiddenField"]'),
			tempInputField: $('<input name="temp" type="text" />'),
			callback: function(){console.log("There needs to be a callback function")}
		}, options);
			
		var main =  function(){
			var textElement = $(this);
			var tempField = settings.tempInputField;

				textElement.hide();
				textElement.after(tempField);
				tempField.focus();

				tempField.on("keydown", function (e){
            		console.log(e.which);
		            if (e.which === 13) {
		                var hiddenField = settings.hiddenInputField;
		                var textValue = $(this).val();
		                var textColor = settings.color;
		                var font = settings.textSize;
		                var removeInputHandle = $(this).remove();
		                var setText = textElement.show();
		           }

		            if(textValue != null){
		            console.log(textValue);
					hiddenField.val(textValue).change();
					textElement.text(textValue);
					textElement.css("color", textColor);
					textElement.css("font-size", font);
					settings.callback();
					}

					if(e.keyCode === 13){
						removeInputHandle;
						setText;
					}
				return textValue;
				});
			};

			element.on('mouseover', function(){
				element.addClass('mouseoverEvent');
				element.css("color", settings.color);

			}, function(){
				element.removeClass('mouseoverEvent');
			});	

			element.on('click', main);
		};

})(jQuery);