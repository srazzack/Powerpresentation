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