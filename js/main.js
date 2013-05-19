
/*Build Log:
  Make theme-preview selection display styles (internally) with a timer
  1. make slides deletable
  2. drag and drop slides*/

var app = {
	slidePreviews: "",
	slideDuration: 7000,
	selectedTheme: 'themeName',
    themes: [{
        name: 'white',
        css: "whitetheme",
        slideControls: ""
    }, {
        name: 'black',
        css: "blacktheme",
        slideControls: ""
    }, {
        name: 'red',
        css: "redtheme",
        slideControls: ""
    }],
    slides: []
};

$(document).ready(function() {

	$("#themeOption").html($("#themeTemplate").tmpl(app));
	$("#slideNav").html($("#slidebarTemplate").tmpl());
	$("#slideFormContainer").html($("#slideFormTemplate").tmpl(app));
	$("#slideFormContainer").hide();

	var themeOptionHandler = function(themeName){
			console.log("You are at the themeOptionHandler");
			app.selectedTheme = themeName;
			$('.theme').fadeOut(1500);
			console.log('here after the theme selections fade');
			$("#ppt").html($("#slideTemplate").tmpl({}));
			$("#slideFormContainer").fadeIn(750);
			$("#slideNav").html($("#slidebarTemplate").tmpl(app));
			console.log("finish: Rendered jQuery Templates of slidebarTemplate and slideFormTemplate");
	},

		themeSelector = function(selection){
			console.log("You are at the themeSelector with", selection);
			console.log("now here, success!");
			var themeName = selection.data('theme-name') + 'theme';
			console.log(themeName); 
			themeOptionHandler(themeName); 
	},

		themeGhostHandler = function(){
		console.log("You are at the themeGhostHandler");
			$('.theme').fadeIn(1000);
	},	
	
		slidePreviewHandler = function(event){
			var slideNumber = $(event.toElement).data('slide-index');
			app.selectedSlide = slideNumber;
			var slide = app.slides[slideNumber];
			var theme = app.selectedTheme,
				slideObj = {
					title: slide.title,
					header: slide.header,
					content: slide.content,
					selectedTheme: theme
				};

			$("#ppt").html($("#slideTemplate").tmpl(slideObj));

			$("#slideForm").populate(slideObj);
	},

		slideFormHandler = function(event){
			event.preventDefault();
			console.log("You are at the slideFormHandler");
			var slide = form2js('slideForm');
			app.slides.push(slide);
			
			var slideRender = {

				title: slide.title,
				header: slide.header,
				content: slide.content,
				selectedTheme: app.selectedTheme
			};
			
			uiUpdater(slideRender, slide);
			$("#target").toForm(slide, "testForm");
	},

		uiUpdater = function(slideView, slide){
			console.log("You are at the uiUpdater");
			if(slideView){
				//Display Slide Preview
				$("#ppt").html($("#slideTemplate").tmpl(slideView));
				//Update and Render Slide Navigation Bar 
				$("#slideNav").html($("#slidebarTemplate").tmpl(app));
			}

			if(slide){
				// update the view to show the latest JSON object
				$("#ObjectRep").html(JSON.stringify(app.slides, null, '\t'));
			}

	};

	$('.theme').on('click', function(){
		var selection = $(this);
		themeSelector(selection);
	});

	$("#themeSelect :button").on('click', themeGhostHandler);

	$("#slideForm").on('submit', slideFormHandler);

	$('#slideNav').on('click', slidePreviewHandler);

});


