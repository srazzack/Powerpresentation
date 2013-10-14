var Slide = Backbone.Model.extend({

	url: '/slides',
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