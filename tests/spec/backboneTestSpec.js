describe("Backbone Model Test", function () {
    describe("create app", function () {
        it("should add a presentation to the App", function () {
            var myApp = new App();
            var myPresentation = new Presentation();
            myApp.get('presentations').add(myPresentation);
            expect(myApp.get('presentations').length).toBe(1);
        });

        it("should set the title of the presentation", function () {
            var myApp = new App();
            var myPresentation = new Presentation();
            myPresentation.set('title', 'The first presentation');
            expect(myPresentation.get('title')).toEqual('The first presentation');
        });

        it("should add another presentation at the first index", function () {
            var myApp = new App();
            var myPresentation = new Presentation();
            var anotherPresentation = new Presentation();
            myApp.get('presentations').add(anotherPresentation, {at:0});
            expect(myApp.get('presentations').length).toBe(2);
            expect(anotherPresentation).toBe(myApp.get('presentations').at(0));
        });

        it("should move a presentation to the second index", function () {
            var myApp = new App();
            var anotherPresentation = new Presentation();
            var myPresentation = new Presentation();
            myApp.get('presentations').add(anotherPresentation);
            myApp.get('presentations').add(myPresentation);
            myApp.get('presentations').movePresentation(anotherPresentation, 1);
            expect(anotherPresentation).toBe(myApp.get('presentations').at(1));
        });
        it("should delete the presentation", function () {
            var myApp = new App();
            var anotherPresentation = new Presentation();
            myApp.get('presentations').add(anotherPresentation);
            expect(anotherPresentation).toEqual(myApp.get('presentations').get(anotherPresentation));
            myApp.get('presentations').deletePresentation(anotherPresentation);
            expect(myApp.get('presentations').get(anotherPresentation)).toBeUndefined();
        });

        it("should add multiple slides to presentation with titles", function () {
            var myApp = new App();
            var myPresentation = new Presentation();
            var slide = new Slide();
            slide.set('title', 'intro');
            var slide2 = new Slide();
            slide2.set('title', 'welcome to this');
            var slide3 = new Slide();
            slide3.set('title', 'conclusion');

            myPresentation.set('title', 'Intro to Islam');

            myPresentation.get('slides').add([slide,slide2,slide3]);
        });

        it("should move the third slide to the first index", function () {
            var myApp = new App();
            var anotherPresentation = new Presentation();
            var slide3 = new Slide();
            var slide1 = new Slide();
            var slide2 = new Slide();
            anotherPresentation.get('slides').add(slide1);
            anotherPresentation.get('slides').add(slide2);
            anotherPresentation.get('slides').add(slide3);
            anotherPresentation.get('slides').moveSlide(slide3, 0);
            expect(slide3).toBe(anotherPresentation.get('slides').at(0));
        });

        it("should delete the slide", function () {
            var myApp = new App();
            var anotherPresentation = new Presentation();
                        var slide3 = new Slide();
            var slide1 = new Slide();
            var slide2 = new Slide();
            anotherPresentation.get('slides').add(slide1);
            anotherPresentation.get('slides').add(slide2);
            anotherPresentation.get('slides').add(slide3);
            expect(anotherPresentation.get('slides').get(slide3)).toBeDefined();
            anotherPresentation.get('slides').deleteSlide(slide3);
            expect(anotherPresentation.get('slides').get(slide3)).toBeUndefined();
        });

        it("should test the addPresentation and addSlide function within App Model and Presentation Model respectively ",function () { 

            var testApp = new App();
            var testPresentation = new Presentation(); 
            var testSlide = new Slide();
            testSlide.set('title', 'This is a test slide');
            testApp.addPresentation(testPresentation);
            testPresentation.addSlide(testSlide);
            expect(testSlide.get('title')).toEqual('This is a test slide');

        });

        it("should should move an added presentation to another specified index ",function () { 

            var newtestApp = new App();
            var testPresentation1 = new Presentation(); 
            var testPresentation2 = new Presentation();
            var testPresentation3 = new Presentation();

            testPresentation1.set('title', 'First presentation');
            testPresentation2.set('title', 'Second presentation');
            testPresentation3.set('title', 'Third presentation');

            newtestApp.addPresentation(testPresentation1);
            newtestApp.addPresentation(testPresentation2);
            newtestApp.addPresentation(testPresentation3);
            console.log(newtestApp.get('presentations'));
            newtestApp.get('presentations').movePresentation(testPresentation2, 0);

            expect(testPresentation2).toBe(newtestApp.get('presentations').at(0));

        });

        it("should set a theme for the presentation with a title", function () {
            var ppApp = new App();
            var presentation = new Presentation({title:'Backbone tutorials'});
            ppApp.addPresentation(presentation);
            presentation.setTheme("redTheme");
            expect(presentation.get('selectedTheme')).toEqual("redTheme");
        });

        it("should add and then delete the current presentation ", function () {
            var myApp = new App();
            expect(myApp).toBeDefined();
            var myPresentation = new Presentation();
            myApp.addPresentation(myPresentation);
            myPresentation.set('title', "The myPresentation")
            expect(myPresentation.get('title')).toEqual("The myPresentation");
            expect(myApp.get('presentations').get(myPresentation)).toBeDefined();
            myApp.get('presentations').deletePresentation(myPresentation);
            expect(myApp.get('presentations').get(myPresentation)).toBeUndefined();
        });
    });
    
    describe("tests for errors", function () {
        it("upon initialization without title, validation should throw error", function () {
            var myApp = new App();
            var newPresentation = new Presentation();
            myApp.get('presentations').add(newPresentation);
            console.log('error must be thrown');
        });
    });
});
