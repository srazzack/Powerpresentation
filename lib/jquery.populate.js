//This is a plugin used to populate the data previosuly entered to a form upon change

(function($){

	jQuery.fn.populate = function( options ) {

	var form = this,
		settings = $.extend({}, options);

	$.each(settings, function(key, val){
	    var inputElement = $('[name="'+key+'"]', form),
	        type = inputElement.attr("type");

	    switch(type){
	        case "checkbox":
	            inputElement.attr("checked", "checked");
	            break;
	        case "radio":
	            inputElement.filter('[value="'+val+'"]').attr("checked", "checked");
	            break;
	        default:
	            inputElement.val(val);
	    }
	});
	
};})(jQuery);
