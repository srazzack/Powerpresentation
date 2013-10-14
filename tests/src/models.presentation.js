var Presentation = Backbone.Model.extend({
	defaults: {
	 	title:"",
	 	slides: new SlidesCollection(),
	 	selectedTheme: "whitetheme"
	},

	validate: function (){
	    console.log(this.get('title'));
	    if(this.get("title").length < 3){
	    	throw new Error("set a title for your presentation");
	    }
	},

	initialize: function(){

		//this.validate();

		this.on("change:title", function(model){
			console.log('title changed to: ' + model.get("title"));
		});
		this.on("change:slides", function(model){
			console.log("A slide has been added, updated or deleted");
		});	
		this.on("change", function(model) {
			console.log( "The selected slide is set to: " + model.get("selectedSlide")); 
			console.log("The selected theme is set to: " + model.get("selectedTheme"));
		})
	},

	setPresentationTitle: function (title) {
	 	this.set("title", title);
	},

	setTheme: function (theme) {
		//this.selectedTheme = theme;
		this.set("selectedTheme", theme);
	},

	addSlide: function (slide) {
		this.get('slides').add(slide);
	},

	deleteSlide: function (model) {
		this.remove(model);
	}
});