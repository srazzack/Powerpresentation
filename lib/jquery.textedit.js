//This jQuery plugin is used for making page text editable

$.fn.textEdit = function( options ){

	var element = $(this),
		settings = $.extend({
			color: "#556b2f",
			backgroundColor: "white",
			textSize: "25%",
			toJsonPath: "app.slides",
			hiddenInputField: $('input[name="hiddenField"]'),
			tempInputField: $('<input name="temp" type="text" />')
		}, options),


		toJson = function(textValue){

		},
		main =  function(evt){
			var textElement = $(this);
			var tempField = settings.tempInputField;

			textElement.hide();
			textElement.after(tempField);
			tempField.focus();

			tempField.blur( function (tempField){
			var hiddenField = settings.hiddenInputField,
				textValue = $(this).val(),
				removeInputHandle = $(this).remove(),
				setText = textElement.show();

			if(textValue != ""){
				hiddenField.val(textValue).change();
				textElement.text(textValue);
			}

			removeInputHandle;
			setText;
			return textValue;
			});

		var objLocation = settings.toJsonPath;
		objLocation.push(textValue);
	};

	element.on('mouseover', function(){
		element.addClass('mouseoverEvent');
		element.css("color", settings.color);
	}, function(){
		element.removeClass('mouseoverEvent');
	});	

	element.on('click', main);

};