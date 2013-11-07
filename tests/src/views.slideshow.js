var SlideshowView = Backbone.View.extend({
 
  el: '#slideshow',

  initialize: function() {
    var element = e.currentTarget;

        if(this.$el.requestFullScreen) {
            this.$el.requestFullScreen();
        } 
        else if(this.$el.mozRequestFullScreen) {
            console.log(moz);
            this.$el.mozRequestFullScreen();
        } 
        else if(this.$el.webkitRequestFullScreen) {
            console.log("webkit");
            this.$el.webkitRequestFullScreen();
        }
  }, 

  events: {
  },
 
  slideTemplate: _.template(),
 
  controlTemplate: _.template(
  ),
 

 
  render: function() {
  },
 
  transition: function(from, to) {
  },
 
 
  play: function() {
  },
 
  pause: function() {
  }

});