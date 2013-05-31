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
			
		var main =  function(evt){
			var textElement = $(this);
			var tempField = settings.tempInputField;

				textElement.hide();
				textElement.after(tempField);
				tempField.focus();

				tempField.on("keydown", function (e){
            		console.log(e.which);
		            if (e.which === 13) {
		                var hiddenField = settings.hiddenInputField,
		                textValue = $(this).val(),
		                textColor = settings.color,
		                font = settings.textSize
		                removeInputHandle = $(this).remove(),
		                setText = textElement.show();
		            }

		            if(textValue != ""){
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
