
(function($){

	jQuery.fn.clearfields = function( options ) {

	var form = this,
		settings = $.extend({}, options);

	$.each(settings, function(key, val){
	    var inputElement = $("[name="+key+"]", form),
	        type = inputElement.attr("type");

	    switch(type){
	        case "checkbox":
	            inputElement.attr("checked", "unchecked");
	            break;
	        case "radio":
	            inputElement.filter("[value="+val+"]").attr("checked", "unchecked");
	            break;
	        default:
	            inputElement.val('');
	    }
	});
	
};

})(jQuery);