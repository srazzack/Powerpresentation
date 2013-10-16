var ActivePresentationView = Backbone.View.extend({
    el: "#slidesBar",
    template: _.template($("#presViewTemplate").html()),

    initialize: function() {
        this.collection.on("change", this.render, this);
    },

    render: function() {
       this.$el.html(this.template(this.collection));     
    },

    events: {
        "click #saveSlide": "savePresentation",
        "click #addSlide": "addSlide",
        "click #slidesBarTemp": "selectedSlideRender"
    },

    selectedSlideRender: function(e){

        var target = $(e.currentTarget);
        var id     = target.attr("data-id");
        model      = this.collection.get(id);

        var sv = new ActiveSlideView({model:model});
        sv.render();
    },

    savePresentation: function (e) {
        console.log(this.collection.save());
    }
});