var ActivePresentationView = Backbone.View.extend({
    el: "#slidesBar",
    template: _.template($("#presViewTemplate").html()),

    initialize: function() {
        this.collection.on("change", this.render, this);
        this.collection.on("add", this.render, this);
        this.collection.on("remove", this.render, this);

        $(document).bind('keyup', _.bind(this.keypressHandler, this));
    },

    render: function() {
       this.$el.html(this.template(this.collection));     
    },

    events: {
        "click #saveSlide": "savePresentation",
        "click #addSlide": "addSlide",
        "click #slidesBarTemp": "selectedSlideRender"
    },

    keypressHandler: function(e) {
        console.log(e.keyCode);
        if(e.keyCode === 46 || e.keyCode === 189) {
            // delete

            this.collection.remove(this.collection.at(this.collection.models.length-1));
            console.log(this.collection.models.length);
        }
    },

    selectedSlideRender: function(e){
        var target = $(e.currentTarget);
        var id     = target.attr("data-id");
        model      = this.collection.get(id);

        var sv = new ActiveSlideView({model:model});
        sv.render();
    },

    addSlide: function() {
        console.log("here");
        var slide = {title:"please add a title here", header: "please add a header to your slide here", content: "please add some content here"};
        this.collection.add(slide);
        console.log(this.collection);
    },

    savePresentation: function () {
        console.log(this.collection.save());
    }
});