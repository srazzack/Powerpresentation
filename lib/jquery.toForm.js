//Appending a form into html div from a data object 

(function($){

	$.fn.toForm = function( options ) {

		var target = this,
			form = $("<form/>"),
			
			settings = $.extend({
				"formId":"newForm",
				"formMethod":"get",
				"formAction":"submit.php"
			}, options);

		form.attr("id", settings.formId);
		form.attr("method", settings.formMethod);
		form.attr("action", settings.formAction);
		
		$.each(settings.data, function(key, value){

			var inputCheckbox = $('<input type="checkbox" value="+value+" />');
			var inputStandard = $('<input type="text" value="+value+" />');
			var label = $("<label></label>");
			target.append(form);		

			if(typeof value === "boolean" || value instanceof Array){
				label.attr("for", key).text(key).appendTo(form);
				inputCheckbox.attr("id", key).attr("name", key).appendTo(form);	
			}
			else {
				label.attr("for", key).text(key).appendTo(form);
				inputStandard.attr("id", key).attr("name", key).appendTo(form);
			}
		});
	};

})(jQuery);