//Appending a form into html div from an object passed 
jQuery.fn.toForm = function(obj, id) {

	var target = this; 

	var form = document.createElement("form");
		form.attr('id', id);
		form.attr('method', "post");
		form.attr('action', "submit.php");

	var input = document.createElement("input");

	
	$.each(obj, function(key, value){

		if(typeof value in obj[key] === boolean){

			$("<input type='checkbox' value='"+value+"' />")
			.attr("id", key).attr("name", key).appendTo("form");
		}

		else if(typeof value in obj[key] === string){

			$("<input type='text' value='"+value+"' />")
			.attr("id", key).attr("name", key).appendTo("form");
		}

	)};
	this.append(form); 
};