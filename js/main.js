
/*Build Log:
  Make theme-preview selection display styles (internally) with a timer

  1. form to json
  2. make slides deletable
  3. drag and drop slides*/

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

/* TO DOs: 

*/  
$(document).ready(function() {

	$("#themeOption").html($("#themeTemplate").tmpl(app));

	function resetForm(id) {
		$('#'+id).each(function(){
		        this.reset();
		});
	}
	//Dynamic previews of theme templates upon a mouseover event
	$('.theme').on('mouseover', function(){
		//mouseover previews using jquery templates?
	});
	
	//Theme and template selection: click with selection saved and mouseover event with toggle, post-click animation with client callback function
	$('.theme').on('click', function(){

		$("#themeSelect :button").on('click', function(){
			$('.theme').fadeIn(1000);
		});

		//console.log(arguments);
		var themeName = $(this).data('theme-name') + 'theme';
		console.log(themeName);
		app.selectedTheme = themeName;
		//console.log(this);
		console.log(this.value);
		$('.theme').fadeOut(1500);

		$("#slideFormContainer").html($("#slideFormTemplate").tmpl(app));

		$("#ppt").html($("#slideTemplate").tmpl({}));

		$("#slideNa2v").html($("#slidebarTemplate").tmpl(app));

		$("#slideForm").on('update', function(){

			var slide = json2form('slideForm');
			app.slides[slideNumber].push(slide);
		});

		$("#slideForm").on('submit', function(event){
			//console.log(arguments);
			var slide = form2js('slideForm');
			app.slides.push(slide);


			$("#slideNav").html($("#slidebarTemplate").tmpl(app));
			// update the view to show the latest JSON object
			$("#ObjectRep").html(JSON.stringify(app.slides, null, '\t'));

			var slideObj = {
				slide: slide,
				selectedTheme: app.selectedTheme
			};


			$("#ppt").html($("#slideTemplate").tmpl(slideObj));

			/*$('.slidebarprev').on('mouseover', function(){
				var slidePrevNumber = $(this).data('slide-index');
				app.selectedSlide = slidePrevNumber;

				slideObj = {
					title: app.slides[slideNumber].title,
					header: app.slides[slideNumber].header,
					content: app.slides[slideNumber].content,
					selectedTheme: app.selectedTheme
				};

				$('.slidebarprev').html($("#slideTemplate").tmpl(slideObj));
			});*/

		$('.slidebarprev').on('click', function(){

			//$("#slideFormContainer").fadeOut(500);
			//$("#selectable").selectable();

			var slideNumber = $(this).data('slide-index');
			app.selectedSlide = slideNumber;

			slideObj = {
				title: app.slides[slideNumber].title,
				header: app.slides[slideNumber].header,
				content: app.slides[slideNumber].content,
				selectedTheme: app.selectedTheme
			};

			$("#ppt").html($("#slideTemplate").tmpl(slideObj));
				$("#slideForm").populate(slideObj);
			});

			return false;
		});
	});
});	


