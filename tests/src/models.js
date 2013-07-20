
//Question number 1: how will these function methods be called. 
//Quetion number 2: How does 
(function () {

	App = Backbone.Model.extend({
		defaults: {
			version: "1.0",
			selectedPresentation: 0,
			presentations: [],
			themes: []
		},

		initialize: function() {
			this.on("change", function() {
				//savePresentation
			});
		},

		addPresentation: function (presentation) {
			this.presentation = new Presentation ({slides: [], title: ""});
		},

		importPresentation: function (presentation) {

		},

		savePresentation: function (presentation) {

		},

		exportPresentation: function (presentation) {

		},

		deletePresentation: function () {
		 	that = this;
		 	this.destroy({
		 		success: function() {
		 			console.log("slide has been deleted");
		 			//Array reindexed
		 		}
		 	});
		}

	});

	Presentation = Backbone.Model.extend({
		 defaults: {
		 	presentationTitle:'Default Title',
		 	selectedSlide:0,
		 	slides:[],
		 	selectedTheme: "whitetheme"
		 },

		 initialize: function(){
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
		 	this.set("presentationTitle", title)
		 },

		 addSlide: function (slide) {
		 	this.slide = new Slide ({title: "", header: "", content: ""});
		 	console.log(this);
		 	console.log(this.slides);

		 },

		 moveSlide: function (slide, index) {
		 	//this.slides.
		 },

		 deleteSlide: function () {
		 	that = this;
		 	this.destroy({
		 		success: function() {
		 			console.log("slide has been deleted");
		 			//Array reindexed
		 		}
		 	});
		 },

		 play: function() {

		 }
	}); 

	Slide = Backbone.Model.extend({
		defaults: {
			title: "Slide Title",
			header: "Slide Header",
			content: "Paragraph"
		},

		setTitle: function (title) {
			if(title.length < 3) {
	        	throw new Error('slide must have a title');
            }
			this.set("title", title);
		},

		setHeader: function (header) {
			this.set("header", header);
		},

		addContent: function (content) {
			this.set("content", content);
		}

	});



}());