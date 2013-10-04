    /*
    TO DO List: 
     Drag and Drop Reordering of Slides
     Backbone Implementation
    */

    var app = {
    slidePreviews: "",
    selectedPresentation: 0,
    version: "1.0",
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

    var deepSet = function (key,value){
        var index = app.selectedPresentation;
        app.presentations[index][key] = value;

        if(initialSave){
            localStorage.setItem("app", JSON.stringify(app));
            console.log("save event occurs");
        }
    } 

    var uiUpdater = function (slide, add, hide) {
        var index = app.selectedPresentation;
        $("#objectRep").html(JSON.stringify(app.presentations[index], null, "\t"));
        $("#presNav").html($("#presentationSelectTemplate").tmpl(app)); 

        $("#slideNav").html($("#slidebarTemplate").tmpl(app.presentations[index]));
        $("#slideAddButton").html($("#addSlideTemplate").tmpl());
        $("#slideView").html($("#slideTemplate").tmpl({}));

        if (slide) {

            $("#slideFormContainer > #slideForm input[type=text], textarea").val("");
            $("#slideForm").populate({
                title: slide.title,
                header: slide.header,
                content: slide.content,
                selectedTheme: app.presentations[index].selectedTheme
            });

            $("#slideView").html($("#slideTemplate").tmpl(slide));
            $("#slideFormContainer").show();
            $("#slideSubmit").hide();
            $("#slideDeleteButton").show();
            $("#slideUpdate").show();  
        }

        if (initialSave) {
            localStorage.setItem("app", JSON.stringify(app));
            console.log("save event occurs");
        }

        if (add) {
            $("#slideFormContainer > #slideForm input[type=text], textarea").val("");
            $("#slideFormContainer").show();
            $("#slideSubmit").show();
            $("#slideUpdate").hide();
            $("#slideDeleteButton").hide();
        }

        if (hide){
            $("#slideFormContainer > #slideForm input[type=text], textarea").val("");
            $("#slideFormContainer").hide();
            $("#slideSubmit").hide();
            $("#slideUpdate").hide();
            $("#slideDeleteButton").hide();
        }
    };

    var launchFullScreen = function (element) {
        if(element.requestFullScreen) {
            element.requestFullScreen();
        } 
        else if(element.mozRequestFullScreen) {
            console.log(moz);
            element.mozRequestFullScreen();
        } 
        else if(element.webkitRequestFullScreen) {
            console.log("webkit");
            element.webkitRequestFullScreen();
        }

    };

    var cancelFullscreen = function() {

        if(document.cancelFullScreen) {
            document.cancelFullScreen();
        } 
        else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } 
        else if(document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
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
            uiUpdater();
        },

        setTitle: function (title) {
            var index = app.selectedPresentation;
            app.presentations[index].title = title;
            uiUpdater();
         },

        addPresentation: function () {
            $("#presentationTitle").hide();
            app.presentations.push({title: "", slides: [], selectedTheme: ""});
            app.selectedPresentation = app.presentations.length - 1;
            uiUpdater(null, {});
        },

        presentationToggle: function (event) {
            var presentationNumber = $(event.currentTarget).data("presentation-index");
            var index = presentationNumber;
            var slideIndex = app.presentations[index].selectedSlide;
            var savedSlide = app.presentations[index].slides[slideIndex];
            set("selectedPresentation", presentationNumber);
            $("#presentationTitle").show();
            $("#slideFormContainer > #slideForm input[type=text], textarea").val("");
            var presText = app.presentations[app.selectedPresentation].title;
            if(presText !== ""){
              $("#presentationTitle").text(presText);  
            }

            if (savedSlide){
                var savedSlideObj = {
                    title: savedSlide.title,
                    header: savedSlide.header,
                    content: savedSlide.content,
                    selectedTheme: app.presentations[index].selectedTheme
                };
                uiUpdater(savedSlideObj);
            }

        },

        slideInput: function () {
            uiUpdater(null, {});
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

            app.presentations[index].slides.splice(app.presentations[index].selectedSlide, 1, newSlide);
            uiUpdater(newSlideObj);
        },

        deleteSlide: function(event){
            event.preventDefault();
            var index = app.selectedPresentation;
            app.presentations[index].slides.splice(app.presentations[index].selectedSlide, 1);
            $("#slideNav").html("");
            if(app.presentations[index].slides.length === 0){
                uiUpdater(null,{});
            }
            else{
                uiUpdater({}); 
            }
        },

        slideToggle: function (event) {
            var slideNumber = $(event.currentTarget).data("slide-index");
            var index = app.selectedPresentation;

            deepSet("selectedSlide", slideNumber);
            
            var slide = app.presentations[index].slides[slideNumber];
            var slideObj = {
                title: slide.title,
                header: slide.header,
                content: slide.content,
                selectedTheme: app.presentations[index].selectedTheme
            };
            uiUpdater(slideObj);
        },

        loadData: function () {
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
            var index = app.selectedPresentation;
            var savedSlide = app.presentations[index].slides[app.presentations[index].selectedSlide];
            var lastSlide = app.presentations[index].slides[app.presentations[index].selectedSlide];

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
                $("#presentationTitle").text(app.presentations[index].title);
            }
        }
    };

    handlers.loadData();

    $("#presentationTitle").inline({
        textSize: "250%",
        defaultValue: "Enter title of presentation here",
        callback: handlers.setTitle
    });

    $(".theme").on("click", function () {
        var selection = $(this);
        handlers.themeSelect(selection);
    });

    $("#slideView").on("keypress", function (event){
        if(event.which == 27){
            cancelFullscreen();
        }
    });

    $("#slideView").on("click", function(event){
        launchFullScreen($("#slideView").get(0)); 
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