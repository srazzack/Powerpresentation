describe("Backbone Model Test", function () {
    describe("create app", function () {
        it("should create a new app ", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
    		var myApp = new App();
    
        });
    });

  	describe("create slide, delete slide, update slide", function () {
        it("should create a new slide ", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
            var myPresentation = new Presentation();
    		var mySlide = new Slide();
    		myPresentation.addSlide(mySlide);
    		console.log(mySlide);
    
        });

        it("should create and set slide title", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
    		var mySlide = new Slide();
    		mySlide.setTitle("some Title here")
    		console.log(mySlide, mySlide.title);
        });

        it("should delete the current slide ", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
            var myPresentation = new Presentation();
    		var mySlide = new Slide();
    		myPresentation.deleteSlide(mySlide);
    		console.log(mySlide);
    
        });

        it("should move the current slide ", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
            var myPresentation = new Presentation();
    		var mySlide = new Slide();
    		myPresentation.moveSlide(mySlide);
    		console.log(mySlide);
        });
    });

    describe("create Presentation", function () {
        it("should create a new Presentation ", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
    		var myPresentation = new Presentation();
    		console.log(myPresentation);
    
        });
    });

});

    