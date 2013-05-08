
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

	var formResetHandler = function(){
		$('#'+id).each(function(){
			this.reset();
		});
	},

		themeOptionHandler = function(){

			var themeName = $(this).data('theme-name') + 'theme';
			app.selectedTheme = themeName;

			$('.theme').fadeOut(1500);
			$("#ppt").html($("#slideTemplate").tmpl({}));
			$("#slideFormContainer").html($("#slideFormTemplate").tmpl(app));
			$("#slideNav").html($("#slidebarTemplate").tmpl(app));
		},

		slidePreviewHandler = function(){

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
		},

		slideFormHandler = function(){

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
		},

		themeGhostHandler = function(){
			$('.theme').fadeIn(1000);
		},

		themePreviewHandler = function(){};


	$("#themeOption").html($("#themeTemplate").tmpl(app));
	//Dynamic previews of theme templates upon a mouseover event
	$('.theme').on('mouseover', function(){/*mouseover previews using jquery templates?*/});
	//Theme and template selection: click with selection saved and mouseover event with toggle, post-click animation with client callback function
	$('.theme').on('click', themeOptionHandler());
	$("#themeSelect :button").on('click', themeGhostHandler());
	$("#slideForm").on('submit', slideFormHandler());
	$('.slidebarprev').on('click', slidePreviewHandler());

});


