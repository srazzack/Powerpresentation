    var app = {
    slidePreviews: "",
    presentation: {
        title: "",
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
    $("#slideFormContainer").html($("#slideFormTemplate").tmpl(app));
    $("#slideFormContainer").hide();
    $("#slideAddButton").html($("#addSlideTemplate").tmpl());

    var initialSave = false;

    var set = function (key,value){
        app[key] = value;

        if(initialSave){
            localStorage.setItem("app", JSON.stringify(app));
            console.log("save event occurs");
        }
    } 

    var uiUpdater = function (slideView) {
        $("#ObjectRep").html(JSON.stringify(app.presentation, null, "\t")); 
        $("#slideNav").html($("#slidebarTemplate").tmpl(app));

        if (slideView) {
            $("#ppt").html($("#slideTemplate").tmpl(slideView));
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
            set("selectedTheme", themeName);
            uiUpdater({});
        },

        setTitle: function (title) {
            app.presentation.title = title;
            uiUpdater();
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
            var slidesLength = app.presentation.slides.length;
            app.presentation.slides.push(slide);
            set("displaySlide", slidesLength);

            var slideRender = {
                title: slide.title,
                header: slide.header,
                content: slide.content,
                selectedTheme: app.selectedTheme
            };

            uiUpdater(slideRender);
        },

        updateSlide: function () {
            event.preventDefault();
            var newSlide = form2js("slideForm");
            var newSlideObj = {
                title: newSlide.title,
                header: newSlide.header,
                content: newSlide.content,
                selectedTheme: app.selectedTheme
            };

            app.presentation.slides.splice(app.selectedSlide, 1, newSlide);
            uiUpdater(newSlideObj);
        },

        deleteSlide: function(event){
            event.preventDefault();
            app.presentation.slides.splice(app.selectedSlide, 1);
            $("#slideNav").html("");
            uiUpdater({});
        },

        slideToggle: function (event) {
            var slideNumber = $(event.currentTarget).data("slide-index");
            set("selectedSlide", slideNumber);
            var slide = app.presentation.slides[slideNumber];
            var slideObj = {
                title: slide.title,
                header: slide.header,
                content: slide.content,
                selectedTheme: app.selectedTheme
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
                selectedTheme: app.selectedTheme
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

            var loadSlide = app.presentation.slides[app.selectedSlide];
            var lastSlide = app.presentation.slides[app.displaySlide];

            if (loadSlide){
                var loadSlideObj = {
                    title: loadSlide.title,
                    header: loadSlide.header,
                    content: loadSlide.content,
                    selectedTheme: app.selectedTheme
                };
                uiUpdater(loadSlideObj);
            }
            else if (lastSlide) {
                
                var lastSlideObj = {
                    title: lastSlide.title,
                    header: lastSlide.header,
                    content: lastSlide.content,
                    selectedTheme: app.selectedTheme
                };
                uiUpdater(lastSlideObj);
            }
            else{
                uiUpdater();
            }
            
            if(app.presentation.title !== ""){
                $("#presentationTitle").text(app.presentation.title);
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

    $("#slideAddButton").on("click", handlers.slideInput);
    $("#slideForm").on("submit", handlers.addSlide);
    $("#slideUpdate").on("click", handlers.updateSlide);
    $("#slideDeleteButton").on("click", handlers.deleteSlide);

    $("#slideNav").on("click", "div.slideNavPreview", handlers.slideToggle);

    $("#save").on("click", storage.savePresentationData);
    $("#clearStorage").on("click", storage.clearAppData);
});