var SlidesCollection = Backbone.Collection.extend({

	model:Slide,

	deleteSlide: function (slide) {
		this.remove(slide);
	},

	moveSlide:function(slide, newIndex) {
		console.log("moving", slide, newIndex);
		this.remove(slide);
		this.add(slide, {at:newIndex});
	}
});

var PresentationCollection = Backbone.Collection.extend({
	
	model:Presentation,

	deletePresentation: function (presentation) {
	 	this.remove(presentation);
	},

	movePresentation: function (presentation, newIndex){
		this.remove(presentation);
		this.add(presentation, {at: newIndex});
	}

});

var ThemesCollection = Backbone.Collection.extend({model:Theme});