

$(document).ready(function () {
	$(".slidebarprev").draggable({
		containment: "#slidebartemplate",
		//containment: 'parent',
		//containment: 

	});
})

Presentation = Backbone.Model.extend({

	defaults: {
		//if any... in this case none
	}
	initialize: function() {
		alert("Welcome to this World");
		this.on("change:slides"), function(model) {
			alert("A new Slide has been Added, or updated or deleted!" + slides );
		});
	}
	create: function(slide) {
		this.set({ slides: slide});
	}

});

var presentation = new Presentation ();
presentation.set({slides: [], title: ""});
Presentation.create('firstSlide');
var slide = person.get("slides");


//Or conversly, you can do this too
//var presentation = new Presentation ({slides: [], title: ""});

var slides = presentation.get("slides");
var title = presentation.get("title");







