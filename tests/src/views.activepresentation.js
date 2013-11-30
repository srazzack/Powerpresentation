var ActivePresentationView = Backbone.View.extend({
    el: "#app",
    templates: {
        t1: _.template($("#presViewTemplate").html()),
        t2: _.template($("#presViewTemplate").html())
    },

    selectedSlide: null,

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
        "click #addSlide": "addDefaultSlide",
        "click .slide": "selectedSlideRender",
        "click #deleteSlide": "deleteSelectedSlide",
        "click #deleteTargetSlide": "deleteTargetSlide",
        "click #slideUp": "moveUp",
        "click #slideDown": "moveDown",
        "dblclick .fullscreen": "launchFullScreen"
    },

    keypressHandler: function(e) {
        console.log(e.keyCode);
        if(e.keyCode === 46 || e.keyCode === 189) {
            this.deleteSelectedSlide();
        }
        else if(e.keyCode === 187) {
            this.addDefaultSlide();
        }
    },

    getSlide: function(e){
        return this.collection.get($(e.currentTarget).attr("data-id"));
    },

    moveUp: function(e){
        this.collection.moveUp(this.getSlide(e));
    },

    moveDown: function(e){
        this.collection.moveDown(this.getSlide(e));
    },

    selectedSlideRender: function(e){
        var sv = new ActiveSlideView({model:this.getSlide(e)});
        sv.render();
        this.selectedSlide = this.getSlide(e);
    },

    deleteTargetSlide: function(e){
        this.collection.remove(this.getSlide(e));
    },

    deleteSelectedSlide: function(e) {
        var selected = this.selectedSlide;
        
        if(selected){
            this.collection.remove(selected);
            console.log(this.collection.models.length);
        }
        else {
            this.collection.remove(this.collection.at(this.collection.models.length-1));
            console.log(this.collection.models.length);
        }
    },

    addDefaultSlide: function() {
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