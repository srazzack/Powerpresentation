/*Build Log:
  Make theme-preview selection display styles (internally) with a timer
  3. Clean up fill
  4. */
var app = {
    slidePreviews: "",
    slideDuration: 7000,
    presentation: {
        title: "",
        theme: "themeName",
        slides: []
    },
    themes: [{
        name: "white",
        css: "whitetheme",
        slideControls: ""
    }, {
        name: "black",
        css: "blacktheme",
        slideControls: ""
    }, {
        name: "red",
        css: "redtheme",
        slideControls: ""
    }, {
        name: "blue",
        css: "bluetheme",
        slideControls: ""
    }, {
        name: "orange",
        css: "orangetheme",
        slideControls: ""
    }, {
        name: "green",
        css: "greentheme",
        slideControls: ""
    }]
};

$(document).ready(function () {

    $("#themeOption").html($("#themeTemplate").tmpl(app));
    $("#slideNav").html($("#slidebarTemplate").tmpl());
    $("#slideFormContainer").html($("#slideFormTemplate").tmpl(app));
    $("#slideFormContainer").hide();

    var showJson = function () {
        $("#ObjectRep").html(JSON.stringify(app.presentation, null, "\t"));
    };

    var uiUpdater = function (slideView, slide) {
        if (slideView) {
            //Display Slide Preview
            $("#ppt").html($("#slideTemplate").tmpl(slideView));
            //Update and Render Slide Navigation Bar 
            $("#slideNav").html($("#slidebarTemplate").tmpl(app.presentation));
        }
        if (slide) {
            showJson();
        }
    };

    var handlers = {

        themeOption: function (themeName) {
            app.selectedTheme = themeName;
            $(".theme").hide();
            $("#ppt").html($("#slideTemplate").tmpl({}));
            $("#slideNav").html($("#slidebarTemplate").tmpl(app));
            $("#ppt").on("click", function () {
                $("#slideFormContainer").show();
                $("#slideUpdate").hide();
                $("#slideSubmit").show();
            });
        },

        setTitle: function (title) {
            app.presentation.title = title;
            console.log(app.presentation.title);
            showJson();
        },

        themeSelector: function (selection) {
            var themeName = selection.data("theme-name") + "theme";
            handlers.themeOption(themeName);
        },

        themeGhost: function () {
            $(".theme").fadeIn(1000);
        },

        slidePreview: function (event) {
            var slideNumber = $(event.toElement).data("slide-index");
            app.selectedSlide = slideNumber;
            var slide = app.presentation.slides[slideNumber];
            var theme = app.selectedTheme,
                slideObj = {
                    title: slide.title,
                    header: slide.header,
                    content: slide.content,
                    selectedTheme: theme
                };

            $("#ppt").html($("#slideTemplate").tmpl(slideObj));
            $("#slideFormContainer").show();
            $("#slideSubmit").hide();
            $("#slideUpdate").show();

            $("#slideForm").populate({
                title: slide.title,
                header: slide.header,
                content: slide.content,
                selectedTheme: theme
            });
            return slideNumber;
        },

        slideForm: function (event) {
            event.preventDefault();
            var slide = form2js("slideForm");
            app.presentation.slides.push(slide);
            $("#slideFormContainer").hide();

            var slideRender = {

                title: slide.title,
                header: slide.header,
                content: slide.content,
                selectedTheme: app.selectedTheme
            };

            uiUpdater(slideRender, slide);
        },

        updateSlide: function (event) {
            event.preventDefault();
            var slides = app.presentation.slides,
                slideIndex = app.selectedSlide;
            currentSlide = app.presentation.slides[slideIndex];
            theme = app.selectedTheme,
            newSlide = form2js("slideForm");

            slides.splice(slideIndex, 1, newSlide);

            var newSlideObj = {
                title: newSlide.title,
                header: newSlide.header,
                content: newSlide.content,
                selectedTheme: theme
            };

            uiUpdater(newSlideObj, newSlide);
        }
    };

    $("#presentationTitle").inline({
        textSize: "250%",
        callback: handlers.setTitle

    });


    $(".theme").on("click", function () {
        var selection = $(this);
        handlers.themeSelector(selection);
    });

    $("#themeSelect :button").on("click", handlers.themeGhost);

    $("#slideForm").on("submit", handlers.slideForm);

    $("#slideNav").on("click", handlers.slidePreview);

    $("#slideUpdate").on("click", handlers.updateSlide);
});