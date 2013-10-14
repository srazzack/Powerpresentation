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