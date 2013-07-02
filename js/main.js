    /*Build Log:
      1. after initial save, anytime a change happens to the slide, AUTOSAVE
    */
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

var initialSave = false;

var set = function (key,value){
    app[key] = value;

    if(initialSave){
        localStorage.setItem("app", JSON.stringify(app));
        console.log("save event occurs");
    }
    
} 

var autoSave = function () {

}
var get = function (key){
    return app[key];
}

    $("#themeOption").html($("#themeTemplate").tmpl(app));
    //$("#slideNav").html($("#slidebarTemplate").tmpl());

    $("#slideFormContainer").html($("#slideFormTemplate").tmpl(app));
    $("#slideFormContainer").hide();
    $("#slideAddButton").html($("#addSlideTemplate").tmpl());

    var showJson = function () {
        $("#ObjectRep").html(JSON.stringify(app.presentation, null, "\t"));
    };

    var uiUpdater = function (slideView, slide) {

        showJson(); 

        if (slideView) {
            //Display Slide Preview
            $("#ppt").html($("#slideTemplate").tmpl(slideView));
            //Update and Render Slide Navigation Bar 
            $("#slideNav").html($("#slidebarTemplate").tmpl(app));
        }

        if (initialSave) {
            localStorage.setItem("app", JSON.stringify(app));
            console.log("save event occurs");
        }
    };

    var storage = {

        savePresentationData: function () {
            // Place the app object into storage
            localStorage.setItem("app", JSON.stringify(app));
            console.log("save event occurs");
            initialSave = true;
           // $(document).on("change", storage.savePresentationData);
            /*try {
            
                // Set the interval and autosave every second
                setInterval(function() {
                    localStorage.setItem("app", JSON.stringify(app));
                }, 1000);

            } catch (e) {
            
                // If any errors, catch and alert the user
                if (e == QUOTA_EXCEEDED_ERR) {
                    alert('Quota exceeded!');
                }
            }*/
        },

        getPresentationData: function () {
            // Retrieves the object app from HTML 5 local storage
            var retrievedObject = localStorage.getItem("app");
            var savedData = JSON.parse(retrievedObject);
            return savedData;
        },
        clearAppData: function (event) {
            localStorage.clear();
            return false;
        }
    };

    var handlers = {

        setTitle: function (title) {
                    app.presentation.title = title;
                    showJson();
        },

        themeSelector: function (selection) {
            var themeName = selection.data("theme-name") + "theme";
            handlers.themeOption(themeName);
        },

        themeOption: function (themeName) {
            set("selectedTheme", themeName);
            $(".theme").hide();
            $("#ppt").html($("#slideTemplate").tmpl({}));
            $("#slideNav").html($("#slidebarTemplate").tmpl(app));
            $("#ppt").on("click", function () {
                $("#slideFormContainer").show();
            });
        },

        themeGhost: function () {
            $(".theme").fadeIn(1000);
        },

        themePreview: function () {
            $(".theme").toggle();
        },

        slidePreview: function (event) {
            var slideNumber = $(event.currentTarget).data("slide-index");
            set("selectedSlide", slideNumber);
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
            $("#slideDeleteButton").show();

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
        },

        addSlide: function (){
            var emptyRender = {};
            uiUpdater(emptyRender);

            $("#slideFormContainer").show();
            $("#slideSubmit").show();
            $("#slideUpdate").hide();
            $("#slideDeleteButton").hide();
            $("#slideFormContainer > #slideForm input[type=text], textarea").val("");
        },

        deleteSlide: function(event){
            event.preventDefault();
            app.presentation.slides.splice(app.selectedSlide, 1);
            $("#slideNav").html("");
            $("#slideNav").html($("#slidebarTemplate").tmpl(app));
            uiUpdater();
        },

        loadData: function () {
            //get data from localStorage
            var saved = storage.getPresentationData();
            //check if its null / undefined
            if ([null, undefined].indexOf(saved) === -1) {
                //its not null/undefined - data exists!
                console.log("Data exists. Here's the data : ", saved);
                
                //setting app data to the one stored inlocalStorage
                app = saved;
            }
            else {
                //data DOES NOT exist in localStorage
                console.log("Data does not exist, save to localStorage");
                //So, save it in localStorage. Refresh this page now.
                //storage.savePresentationData();
            }

            var currentSlide = app.presentation.slides[app.selectedSlide];
            uiUpdater(currentSlide,{});

            if(app.presentation.title !== ""){
                $("#presentationTitle").text(app.presentation.title);
            }
        }

    };

    $("#presentationTitle").inline({
        textSize: "250%",
        defaultText: "",
        callback: handlers.setTitle
    });


    $(".theme").on("click", function () {
        var selection = $(this);
        handlers.themeSelector(selection);
    });

    $("#themeSelect :button").on("click", handlers.themeGhost);

    $("#addSlideButton").on("click", handlers.addSlide);

    $("#slideForm").on("submit", handlers.slideForm);

    $("#slideNav").on("click", "div.slideNavPreview", handlers.slidePreview);

    $("#slideUpdate").on("click", handlers.updateSlide);

    $("#slideAddButton").on("click", handlers.addSlide);

    $("#slideDeleteButton").on("click", handlers.deleteSlide);

    $("#save").on("click", storage.savePresentationData);

    $("#clearStorage").on("click", storage.clearAppData);

    $(window).load(handlers.loadData);

});