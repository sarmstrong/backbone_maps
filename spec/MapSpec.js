describe("Backbone Map" , function() { 

    var map;

    var googleMapMock; 

    describe("faulty implementation" , function() {

      it("Should throw error if the map is omitted" , function() { 

        var faulty = function() { 

          var map = new Backbone.Map();

        }; 

        expect(faulty).toThrow(); 

      });

      googleMapMock  = undefined; 


    }); 

    describe("common usage" , function() {

        beforeEach(function() {

          googleMapMock = new google.maps.Map();

          map = new Backbone.Map({map: googleMapMock , library : "google"});

        }); 

        afterEach(function() {

          map = undefined;

          googleMapMock = undefined; 

        });

        it("should set the Map property" , function() {

            expect(map.getMap()).toEqual(googleMapMock);

        }); 

        it("should have references to GoogleMap events",  function() {

            expect(map.mapEvents.indexOf("bounds_changed")).toBeGreaterThan(-1);

        }); 

        it("should provide a way to extend map events", function() {

            map.addMapEvents("push_some_event"); 

            expect(map.mapEvents.indexOf("push_some_event")).toBeGreaterThan(-1);


        }); 

        it("should set the library" , function() {

            expect(map.getLibrary()).toEqual(google);

        }); 

        it("should add an event listener" , function() {

          map.addListener("some_listener"); 

          expect(googleMapMock.listeners.some_listener).toBeDefined();


        }); 

        it("should be able to trigger map events", function() {

          spyOn(map , 'trigger'); 

          google.maps.event.trigger(googleMapMock , "dragend"); 

          expect(map.trigger).toHaveBeenCalled();

        }); 

        it("should be able to create a Marker object", function() {

          spyOn(map , 'trigger'); 

          var model = {data : "Some Data"}; 

          var marker = new google.maps.Marker(); 

          var markerObj = map.addMarker(marker , model); 

          expect(markerObj instanceof Backbone.MapMarker).toBe(true);
        
        }); 
        

        it("should pass the Marker object as an argument in the marker trigger event", function() {

          spyOn(map , 'trigger'); 

          var model = {data : "Some Data"}; 

          var marker = new google.maps.Marker(); 

          var markerObj = map.addMarker(marker , model); 

          expect(map.trigger).toHaveBeenCalled();

          expect(map.trigger).toHaveBeenCalledWith("map:marker_add" , markerObj , model); 

        }); 

        it("Should be able to trigger Map Events", function() {

          spyOn(googleMapMock, 'callListener'); 

          map.triggerEvent("bounds_changed"); 

          expect(googleMapMock.callListener).toHaveBeenCalled(); 

          expect(googleMapMock.callListener).toHaveBeenCalledWith("bounds_changed");


        }); 

    }); 


}); 