describe("Backbone Model Test", function () {
    describe("create app", function () {
        it("should create a new app ", function () {
            var myApp = new App();

            console.log(myApp);

            var slide = new Slide();
            slide.set('title', 'intro');
            var slide2 = new Slide();
            slide2.set('title', 'welcome to this');
            var slide3 = new Slide();
            slide3.set('title', 'conclusion');

            myApp.presentations = new PresentationCollection();

            var presentation = new Presentation();
            presentation.set('title', 'Intro to Islam');

            presentation.set('slides', new SlidesCollection());
            presentation.get('slides').add(slide);
            presentation.get('slides').add(slide2);
            presentation.get('slides').add(slide3, {at:0});

            expect(presentation.get('slides').length).toBe(3);
            expect(slide3).toBe(presentation.get('slides').at(0));
            expect(slide2).toBe(presentation.get('slides').at(2));

            presentation.get('slides').moveSlide(slide3, 2);

            expect(presentation.get('slides').length).toBe(3);
            expect(slide3).toBe(presentation.get('slides').at(2));

            presentation.get('slides').remove(slide3);

            expect(presentation.get('slides').length).toBe(2);
            expect(presentation.get('slides').get(slide3)).toBeUndefined();

        });

        it("should test the addPresentation and addSlide function within App Model and Presentation Model respectively ",function () { 

            var testApp = new App();
            var testPresentation = new Presentation(); 
            var testSlide = new Slide();
            testSlide.set('title', 'This is a test slide');
            testApp.addPresentation(testPresentation);
            testPresentation.addSlide(testSlide);

            expect(testApp.get('presentations').length).toBe(1);
            expect(testPresentation.get('slides').length).toBe(1);
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
            var ppApp = new App ();
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
});
