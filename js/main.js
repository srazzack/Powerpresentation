
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

	var themeOptionHandler = function(){

			console.log(arguments);
			var themeName = $(this).data('theme-name') + 'theme';
			app.selectedTheme = themeName;
			console.log($this);

			$('.theme').fadeOut(1500);
			$("#ppt").html($("#slideTemplate").tmpl({}));
			$("#slideFormContainer").html($("#slideFormTemplate").tmpl(app));
			$("#slideNav").html($("#slidebarTemplate").tmpl(app));
		};

	$('.theme').on('click', themeOptionHandler());

	$("#themeSelect :button").on('click', themeGhostHandler());
	var themeGhostHandler = function(){
			$('.theme').fadeIn(1000);
		};
	$("#formResetButton :button").on('click', formResetHandler());
	var formResetHandler = function(){
		$('#'+id).each(function(){
			this.reset();
		});
	};
	
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
				
			$("#ppt").html($("#slideTemplate").tmpl(slideView));

			$("#slideNav").html($("#slidebarTemplate").tmpl(app));

			// update the view to show the latest JSON object
			$("#ObjectRep").html(JSON.stringify(app.slides, null, '\t'));

			return false;
		};

	$("#slideForm").on('submit', slideFormHandler());
	$('.slidebarprev').on('click', slidePreviewHandler());
});


