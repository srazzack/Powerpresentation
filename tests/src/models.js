
//Question number 1: how will these function methods be called. 
//Quetion number 2: How does 

(function () {
	App = {};

	App.application = Backbone.Model.extend({
		defaults: {
			version: "1.0",
			selectedPresentation: 0,
			presentations: [],
			themes: []
		},

		initialize: function() {
			this.on("change", function() {
			savePresentationData: function () {
            localStorage.setItem("app", JSON.stringify(app));
            console.log("save event occurs");
        },
			});
		},

		loadApplicationData: function () {
			var saved = storage.getPresentationData();
            if (saved) {
                console.log("Data exists. Here's the data : ", saved);
                
                if (app.version == saved.version){
                    app = saved;
                    initialSave = true;
                }
                else {
                    alert("version mismatch, storage data will be cleared");
                    localStorage.clear();
                }
                
            }
            else {
                console.log("Data does not exist, save to localStorage");
            }
		},

		addPresentation: function (presentation) {
			// perform validation
			if(presentation.title.length > 10)
			this.presentations.push(presentation);
		},

		importPresentation: function (presentation) {
			//file upload from 
		},

		savePresentation: function (presentation) {
			//save serverside? 
		},

		exportPresentation: function (presentation) {
			//convert to pdf, ppt 
		},

		version: function () {
			var saved = storage.getPresentationData();
			if(this.version == saved.version){
				console.log("Data exists. Here's the data: ", saved);
			}
			else{
				alert("version mismatch, storage data will be cleared");
                    localStorage.clear();
			}
		},

		deletePresentation: function (presentation) {
		 	this.destroy({
		 		success: function() {
		 			console.log("the selected presentation has been deleted");
		 			//Array reindexed
		 		}
		 	});
		}

		deleteAppData: {

		}

	});

	App.presentation = Backbone.Model.extend({
		defaults: {
		 	presentationTitle:'Default Title',
		 	selectedSlide: 0,
		 	slides:[],
		 	selectedTheme: "whitetheme"
		},

		validate: function(attributes){
		    if(attributes.presentationTitle === undefined){
		    	return "Remember to set a title for your slide.";
		    }
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
			//this.presentationTitle = title;
			
		 	this.set("presentationTitle", title);
		 	this.addSlide();
		},

		setTheme: function (theme) {
			//this.selectedTheme = theme;
			this.set("selectedTheme", theme);
		},

		addSlide: function (slide) {
			this.slides.push(slide);
		},

		moveSlide: function (slide, index) {
		 	this.slides.splice(index, 1, slide);
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

		play: function(slide) {
			slide.toggle();
		}
	}); 

	/*var myPres = new App.presentation();
	myPres.setPresentationTitle('hello');

	myPres.version = '1.0';

	var myPres3 = {
		yo: function() {

		}
	};
	myPres3.version = '2.0';

	myPres.yo = function() {
	};

	var myPres2 = new App.presentation();

	myPres2.protoype.yo = function () {

	};*/

	App.slide = Backbone.Model.extend({
		defaults: {
			title: "Slide Title",
			header: "Slide Header",
			content: "Paragraph"
		},

		validate: function (attributes){
			if(attributes.title.length < 3) {
	        	throw new Error('slide must have a title');
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

	App.collection = {};

	App.collection.presentations = Backbone.Collection.extend({
		model: App.presentation,
		localStorage: new Backbone.localStorage('presentations');
	});

	App.collection.presentation = Backbone.Collection.extend({
		model: App.slide,
		localStorage: new Backbone.localStorage('slides');
	});

	App.AppView = Backbone.View.extend({

		initialize: function() {
			this.render();
		},

		render: function() {
			
			var template = _.template($("#appTemplate").html());
			var output = template({data: presentation});
			//$("#mainElement").append(output);
			this.$el.append({data: prensentation});

			return this;
		}

		el: "#slideView",

		events: {
			"click #addSlideButton": 'displaySlide',
			"click #addPresentation": 'newPresentation'
		}
		

	});

}());