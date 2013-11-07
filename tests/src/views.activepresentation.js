var ActivePresentationView = Backbone.View.extend({
    el: "#app",
    templates: {
        t1: _.template($("#presViewTemplate").html()),
        t2: _.template($("#presViewTemplate").html())
    },
    selectedSlide: "",
    initialize: function() {
        this.collection.on("change", this.render, this);
        this.collection.on("add", this.render, this);
        this.collection.on("remove", this.render, this);
        /*this.collection.on("remove", function() {
            console.log("this code ran: remove", arguments);
            /*
            if(arguments[0] instanceof Slide) {
                console.log('about to destroy a slide');
                arguments[0].destroy(); 
            }

            for(var i = 0; i < arguments.length; i++){
                if(arguments[i] instanceof Backbone.Model){
                    console.log("instanceof of a model here:")
                     
                }
            }
            this.render();
        }, this); */

        /*this.collection.on("destroy", function() {
            arguments[0].destroy();
        });*/

        $(document).bind("keyup", _.bind(this.keypressHandler, this));
    },

    render: function() {
        this.$el.find("#slidesBar").html(this.templates["t1"](this.collection)); 
    },

    events: {
        "click #savePresentation": "savePresentation",
        "click #addSlide": "addSlide",
        "click .slide": "selectedSlideRender",
        "click #deleteSlide": "deleteSlide",
        "click #slideUp": "moveUp",
        "click #slideDown": "moveDown",
        "dblclick .fullscreen": "launchFullScreen"
    },

    keypressHandler: function(e) {
        console.log(e.keyCode);
        if(e.keyCode === 46 || e.keyCode === 189) {
            this.deleteSlide();
        }
        else if(e.keyCode === 187) {
            console.log("here");
            var slide = {title:"please add a title here", header: "please add a header to your slide here", content: "please add some content here"};
            this.collection.add(slide);
        }
    },

    moveUp: function(e){
        this.collection.moveUp(this.selectedSlide);
    },

    moveDown: function(e){
        this.collection.moveDown(this.selectedSlide);
    },

    selectedSlideRender: function(e){
        var target = $(e.currentTarget);
        var id     = target.attr("data-id");
        var model      = this.collection.get(id);
        var sv = new ActiveSlideView({model:model});
        sv.render();

        this.selectedSlide = model;
    },

    deleteSlide: function(e) {

       if(!this.selectedSlide){
            this.collection.remove(this.collection.at(this.collection.models.length-1));
            console.log(this.collection.models.length);
       }
       else if (this.selectedSlide){
             this.collection.remove(this.selectedSlide);
             console.log(this.collection.models.length);
       }
    },

    addSlide: function() {
        console.log("here");
        var slide = {title:"please add a title here", header: "please add a header to your slide here", content: "please add some content here"};
        this.collection.add(slide);
        console.log(this.collection);
    },

    savePresentation: function () {
        console.log(this.collection.save());
    },

    launchFullScreen: function (e) {
        console.log(e.currentTarget);
        var element = e.currentTarget;

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

    }

});