
var slide1 = new Slide({"title": "This is the first title to renssacder"});


var sv = new ActiveSlideView({model:slide1});

sv.render();

var slides = [{title: "this is the first slide", header: "this is the first header", content: "this is finally the content" },
{title: "this is the second slide", header: "this is the second header", content: "this is second the content" },
{title: "this is the third slide", header: "this is the third header", content: "this is third the content" },
{title: "this is the fourth slide", header: "this is the fourth header", content: "this fourth the content" }, {title: "this is the fourth slide", header: "this is the fourth header", content: "this fifth content" }]

var sc = new SlidesCollection();
sc.add(slides);
var pv = new ActivePresentationView({collection: sc});
pv.render();

//var ssv = new SlideshowView({collection: sc});

/*
var startSlideshow = new SlideshowView({
	collection: sc
}).render();

*/