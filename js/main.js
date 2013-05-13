
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


	var themeOptionHandler = function(themeName){
		app.selectedTheme = themeName;
		//$('.theme').fadeOut(1500);
		console.log('here with');
		$("#ppt").html($("#slideTemplate").tmpl({}));
		$("#slideFormContainer").html($("#slideFormTemplate").tmpl(app));
		$("#slideNav").html($("#slidebarTemplate").tmpl(app));
	};

	var themeSelector = function(selection){

		console.log(arguments);
		var themeName = selection.data('theme-name') + 'theme';
		console.log(themeName); 
		themeOptionHandler(themeName);
	};
	
	console.log(themeSelector);

	var themeGhostHandler = function(){
			$('.theme').fadeIn(1000);
		};	

	/*$("#themeSelect :button").on('click', themeGhostHandler());
	
	var formResetHandler = function(){
			this.reset();
		};
	$("#formResetButton :button").on('click', formResetHandler());*/
	

	var slidePreviewHandler = function(){

			var slideNumber = $(this).data('slide-index');
			app.selectedSlide = slideNumber;
			var slide = app.slides[slideNumber],
				theme = app.selectedTheme;

			slideObj = {
				title: slide.title,
				header: slide.header,
				content: slide.content,
				selectedTheme: theme
			};

			$("#ppt").html($("#slideTemplate").tmpl(slideObj));

			$("#slideForm").populate(slideObj);
		};

	var slideFormHandler = function(){

			var slide = form2js('slideForm');
			
			app.slides.push(slide);

			var slideView = {
				title: slide.title,
				header: slide.header,
				content: slide.content
			};

			uiUpdater(slideView, slide);
			//return false;
		};

	var uiUpdater = function(slideView, slide){

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
		selection = $(this);
		themeSelector(selection);
		return false;
	});
	$("#slideForm").on('submit', slideFormHandler());
	$('.slidebarprev').on('click', slidePreviewHandler());
});


