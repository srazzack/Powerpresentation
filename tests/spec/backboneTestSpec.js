describe("Backbone Model Test", function () {
    describe("create app", function () {
        it("should create a new app ", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
    		var myApp = new App.application();
    
        });
    });

  	describe("create slide, delete slide, update slide", function () {
        it("should create a new slide ", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
            var myPresentation = new App.presentation();
    		var mySlide = new App.slide();
    		myPresentation.addSlide(mySlide);
    		console.log(mySlide);
    
        });

        it("should create and set slide title", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
    		var mySlide = new App.slide();
    		mySlide.setTitle("some Title here")
    		console.log(mySlide, mySlide.title);
        });

        it("should delete the current slide ", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
            var myPresentation = new App.presentation();
    		var mySlide = new App.slide();
    		myPresentation.deleteSlide(mySlide);
    		console.log(mySlide);
    
        });

        it("should move the current slide ", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
            var myPresentation = new App.presentation();
    		var mySlide = new App.slide();
    		myPresentation.moveSlide(mySlide);
    		console.log(mySlide);
        });
    });

    describe("create Presentation", function () {
        it("should create a new Presentation ", function () {
            //expect(Toolbelt.array.first([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
            console.log('models ready');
    		var myPresentation = new App.presentation();
    		console.log(myPresentation);
    
        });
    });

 	describe("create Presentation", function () {
        it("should create a new Presentation ", function () {
		    var ppApp = new App.application();

			var presentation = new App.presentation({title:'Backbone tutorials'});
		    ppApp.addPresentation(presentation);

    
    		console.log(ppApp.presentation);

    		//ppApp.presentations.length // 1

    		//ppApp.presentation // new presentation 

        });
    });

    describe("create a collection of presentations", function () {
    	it("should create a collection of presentations", function () {
    		var presentationCollection = new App.collection.presentation();
    	});
    })
    

});

    