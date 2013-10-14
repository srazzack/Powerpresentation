/*var ActivePresentationView = Backbone.View.extend({

});
var s = new Slide();

var ActiveSlideView = Backbone.View.extend({
    el:'#slideSection',
    events: {
       'click #saveSlide': 'saveSlide'
    },
    saveSlide: function (e) {
        console.log(this.model.save());
    },
    render: function() {
        var that = this;
        this.$el.find('#activeSlide').html(this.model.get('title'));
        this.$el.find('#activeSlide').inline({
            defaultText:'What\'s your name?',
            callback:function(text) {
                console.log('new text', text, that);
                that.model.set({title:text});
            }
        });
    }
});


var sv = new ActiveSlideView({model:s});
sv.render();

*/
var ActivePresentationView = Backbone.View.extend({
    el: "#slidesBar",
    template: _.template($('#presViewTemplate').html()),

    initialize: function() {
        _.bindAll(this);
        this.collection = new SlidesCollection();
        this.collection.bind('all', this.render, this);
    },

    render: function() {   
        var html = this.template({collection: this.collection});
        this.$el.html(html);
        return this;
    },

    events: {
        "click #saveSlide": "savePresentation",
        "click #addSlide": "addSlide"
    },

    savePresentation: function (e) {
        console.log(this.collection.save());
    }
});

var ActiveSlideView = Backbone.View.extend({
    el: "#slideContainer",
    className: "slideContainer",
    template: _.template( $("#slideTemplate").html() ),


    render: function () {
        console.log(this);
        var that = this;
        this.$el.find("#activeSlide").html(this.template(this.model.toJSON()));

        this.$el.find("#slideTitle").inline({
            callback: function (text) {
                that.model.set({title:text});
            }
        });

        this.$el.find("#slideHeader").inline({
            callback: function (text) {
                that.model.set({header:text});
            }
        });

        this.$el.find("#slideContent").inline({
            callback: function (text) {
                that.model.set({content:text});
            }
        });
        
        return this;    
    },

    events: {
        "click #saveSlide": "saveSlide"
    },

    saveSlide: function (e) {
        console.log(this.model.save());
        this.model.save();
    }

});

