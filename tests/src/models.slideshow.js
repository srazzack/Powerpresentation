var Slideshow = Backbone.Model.extend({
  defaults: {
    id: 1,
    headline: 'Welcome to APP',
    caption: 'This is an awesome slide',
    layout: 'right'
  },
 
  show: function() {
    this.getEl().show();
  },
 
  getEl: function() {
    return $('#slide-' + this.id);
  },
 
  getControl: function() {
    return $('.jump-to').eq(this.id - 1);
  }
});