//This is a plugin used to populate the data previosuly entered to a form upon change


jQuery.fn.populate = function(obj) {

	var form = this; 
  	$.each(obj, function(key, value){
    	$('[name='+key+']', form).val(value);
  	});
};


 