
//Backbone implementation of the Powerpresentation Application
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

var Theme = Backbone.Model.extend({});

var App = Backbone.Model.extend({

	defaults: {
		version: "1.0",
		presentations: new PresentationCollection(),
		themes: new ThemesCollection()
	},

	initialize: function() {

		this.on("change", function() {
		});
	},

	loadApplicationData: function () {
	},

	addPresentation: function (presentation) {
		this.get('presentations').add(presentation);
	},

	addTheme: function (theme){
		this.get("themes").add(theme);
	},

	importPresentation: function (presentation) {
		//file upload from 
	},

	savePresentation: function (presentation) {
		//save serverside? 
	},

	exportPresentation: function (presentation) {
		//convert to pdf, ppt 
	}
});

var Presentation = Backbone.Model.extend({
	defaults: {
	 	title:"",
	 	slides: new SlidesCollection(),
	 	selectedTheme: "whitetheme"
	},

	validate: function (){
	    if(this.get("title").length < 3){
	    	throw new Error("set a title for your presentation");
	    }
	},

	initalize: function(){

		this.validate();

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

	setPresentationTitlsse: function (title) {
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

var Slide = Backbone.Model.extend({
	defaults: {
		title: "",
		header: "Slide Header",
		content: "Paragraph"
	},

	initalize: function(){

		this.validate();

		this.on("change:title", function(model){
			console.log('title changed to: ' + model.get("title"));
		});
		this.on("change:header", function(model){
			console.log("A header has been added, updated or deleted");
		});
	},
	validate: function (){
		if(this.get("title").length < 3) {
        	throw new Error("slide must have a title");
        }
	},

	setTitle: function (title) {
		this.set("title", title);
	},

	setHeader: function (header) {
		this.set("header", header);
	},

	addContent: function (content) {
		this.set("content", content);
	}
});
