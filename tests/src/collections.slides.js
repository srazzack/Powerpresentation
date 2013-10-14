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