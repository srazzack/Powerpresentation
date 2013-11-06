var ActivePresentationView = Backbone.View.extend({
    el: "#app",
    templates: {
        t1: _.template($("#presViewTemplate").html()),
        t2: _.template($("#presViewTemplate").html())
    },

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
        "click #removeSlide": "deleteSlide",
        "click #slideUp": "moveUp",
        "click #slideDown": "moveDown",
        "dblclick .fullscreen": "launchFullScreen"
    },

    keypressHandler: function(e) {
        console.log(e.keyCode);
        if(e.keyCode === 46 || e.keyCode === 189) {
            this.collection.remove(this.collection.at(this.collection.models.length-1));
            console.log(this.collection.models.length);
        }
        else if(e.keyCode === 187) {
            console.log("here");
            var slide = {title:"please add a title here", header: "please add a header to your slide here", content: "please add some content here"};
            this.collection.add(slide);
            console.log(this.collection);
        }
    },

    moveUp: function(e){
        var target = $(e.currentTarget);
        var id     = target.attr("data-id");
        model      = this.collection.get(id);
        this.collection.moveUp(model);
    },

    moveDown: function(e){
        var target = $(e.currentTarget);
        var id     = target.attr("data-id");
        model      = this.collection.get(id);
        this.collection.moveDown(model);
    },

    selectedSlideRender: function(e){
        var target = $(e.currentTarget);
        var id     = target.attr("data-id");
        model      = this.collection.get(id);
        var sv = new ActiveSlideView({model:model});
        sv.render();
    },

    deleteSlide: function(e) {
       /* console.log(e);
        var target              = $(e.currentTarget);
        var id                  = target.attr("data-id");
        var selectedSlide       = this.collection.get(id);
        console.log(selectedSlide);

       if(!selectedSlide){*/
            this.collection.remove(this.collection.at(this.collection.models.length-1));
            //this.collection.at(this.collection.models.length-1).destroy();
            console.log(this.collection.models.length);
       /*}
       else if (selectedSlide){
             this.collection.remove(selectedSlide);
             selectedSlide.destroy();
             console.log(this.collection.models.length);
       }*/
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