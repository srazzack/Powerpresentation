    /*
    TO DO List: 
    1. Multiple Presentation Ui
    2. HTML 5 FullScreen Play button
    3. Drag and Drop Reordering of Slides
    */

    var app = {
    slidePreviews: "",
    selectedPresentation: 0,
    presentations: [{
        title: "",
        slides: []
    }],
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
    $("#slideFormContainer").html($("#slideFormTemplate").tmpl(app));
    $("#slideFormContainer").hide();
    $("#presentationTitle").hide();
    $("#presNav").html($("presentationSelectTemplate").tmpl(app));
    $("#presAddButton").html($("#addPresentationTemplate").tmpl(app));
    $("#slideAddButton").html($("#addSlideTemplate").tmpl());

    if(app.selectedPresentation){
        $("#presentationTitle").show();
    }
    else{
        $("#presentationTitle").hide();
    }
    var initialSave = false;

    var set = function (key,value){
        app[key] = value;

        if(initialSave){
            localStorage.setItem("app", JSON.stringify(app));
            console.log("save event occurs");
        }
    } 

    var uiUpdater = function (slide) {
        var index = app.selectedPresentation;
        $("#objectRep").html(JSON.stringify(app.presentations[index], null, "\t"));
        $("#presNav").html($("#presentationSelectTemplate").tmpl(app)); 
        $("#slideNav").html($("#slidebarTemplate").tmpl(app.presentations[index]));
        $("#slideAddButton").html($("#addSlideTemplate").tmpl());

        if (slide) {
            $("#slideView").html($("#slideTemplate").tmpl(slide));
        }

        if (initialSave) {
            localStorage.setItem("app", JSON.stringify(app));
            console.log("save event occurs");
        }
    };

    var storage = {
        savePresentationData: function () {
            localStorage.setItem("app", JSON.stringify(app));
            console.log("save event occurs");
            initialSave = true;
        },

        getPresentationData: function () {
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
        themeSelect: function (selection) {
            var themeName = selection.data("theme-name") + "theme";
            var index = app.selectedPresentation;
            app.presentations[index].selectedTheme = themeName;
            uiUpdater({});
        },

        setTitle: function (title) {
            var index = app.selectedPresentation;
            app.presentations[index].title = title;
            uiUpdater();
         },

        addPresentation: function () {
            $("#presentationTitle").hide();
            app.presentations.push({title: "", slides: [], selectedTheme: ""});
            var presentationsLength = app.presentations.length;
            app.selectedPresentation = presentationsLength;
            $("#slideFormContainer > #slideForm input[type=text], textarea").val("");
            uiUpdater({});
        },

        presentationToggle: function (event) {
            var presentationNumber = $(event.currentTarget).data("presentation-index");
            set("selectedPresentation", presentationNumber);
            $("#presentationTitle").show();
            $("#slideFormContainer > #slideForm input[type=text], textarea").val("");
            var presText = app.presentations[app.selectedPresentation].title;
            if(presText !== ""){
              $("#presentationTitle").text(presText);  
            }
            uiUpdater({});
        },

        slideInput: function () {
            $("#slideFormContainer").show();
            $("#slideSubmit").show();
            $("#slideUpdate").hide();
            $("#slideDeleteButton").hide();
            $("#slideFormContainer > #slideForm input[type=text], textarea").val("");
            uiUpdater({});
        },

        addSlide: function (event) {
            event.preventDefault();
            var slide = form2js("slideForm");
            var index = app.selectedPresentation;
            var slidesLength = app.presentations[index].slides.length;
            app.presentations[index].slides.push(slide);
            set("displaySlide", slidesLength);

            var slideRender = {
                title: slide.title,
                header: slide.header,
                content: slide.content,
                selectedTheme: app.presentations[index].selectedTheme
            };

            uiUpdater(slideRender);
        },

        updateSlide: function (event) {
            event.preventDefault();
            var newSlide = form2js("slideForm");
            var index = app.selectedPresentation;
            var newSlideObj = {
                title: newSlide.title,
                header: newSlide.header,
                content: newSlide.content,
                selectedTheme: app.presentations[index].selectedTheme
            };

            app.presentations[index].slides.splice(app.selectedSlide, 1, newSlide);
            uiUpdater(newSlideObj);
        },

        deleteSlide: function(event){
            event.preventDefault();
            var index = app.selectedPresentation;
            app.presentations[index].slides.splice(app.selectedSlide, 1);
            $("#slideNav").html("");
            uiUpdater({});
        },

        slideToggle: function (event) {
            var slideNumber = $(event.currentTarget).data("slide-index");
            set("selectedSlide", slideNumber);
            var index = app.selectedPresentation;
            var slide = app.presentations[index].slides[slideNumber];
            var slideObj = {
                title: slide.title,
                header: slide.header,
                content: slide.content,
                selectedTheme: app.presentations[index].selectedTheme
            };

            uiUpdater(slideObj);
            $("#slideFormContainer").show();
            $("#slideSubmit").hide();
            $("#slideUpdate").show();
            $("#slideDeleteButton").show();

            $("#slideForm").populate({
                title: slide.title,
                header: slide.header,
                content: slide.content,
                selectedTheme: app.presentations[index].selectedTheme
            });
        },

        loadData: function () {
            var saved = storage.getPresentationData();
            if (saved) {
                console.log("Data exists. Here's the data : ", saved);
                app = saved;
                initialSave = true;
            }
            else {
                console.log("Data does not exist, save to localStorage");
            }
            var index = app.selectedPresentation;
            var savedSlide = app.presentations[index].slides[app.selectedSlide];
            var lastSlide = app.presentations[index].slides[app.displaySlide];

            if (savedSlide){
                var savedSlideObj = {
                    title: savedSlide.title,
                    header: savedSlide.header,
                    content: savedSlide.content,
                    selectedTheme: app.presentations[index].selectedTheme
                };
                uiUpdater(savedSlideObj);
            }
            else if (lastSlide) {
                
                var lastSlideObj = {
                    title: lastSlide.title,
                    header: lastSlide.header,
                    content: lastSlide.content,
                    selectedTheme: app.presentations[index].selectedTheme
                };
                uiUpdater(lastSlideObj);
            }
            else{
                uiUpdater();
            }
            
            if(app.presentations[index].title !== ""){
                console.log(app.presentations[index].title);
                console.log(index);
                $("#presentationTitle").text(app.presentations[index].title);
            }
        }
    };

    handlers.loadData();

    $("#presentationTitle").inline({
        textSize: "250%",
        defaultText: "",
        callback: handlers.setTitle
    });

    $(".theme").on("click", function () {
        var selection = $(this);
        handlers.themeSelect(selection);
    });

    $("#presAddButton").on("click", handlers.addPresentation);
    $("#presNav").on("click", "div.presentationNavPreview", handlers.presentationToggle);

    $("#slideAddButton").on("click", handlers.slideInput);
    $("#slideForm").on("submit", handlers.addSlide);
    $("#slideUpdate").on("click", handlers.updateSlide);
    $("#slideDeleteButton").on("click", handlers.deleteSlide);

    $("#slideNav").on("click", "div.slideNavPreview", handlers.slideToggle);

    $("#save").on("click", storage.savePresentationData);
    $("#clearStorage").on("click", storage.clearAppData);
});