describe("Backbone Marker" , function() {

    var markerModel; 

    var googleMarkerMock; 

    var markerObj;
    
    describe("Test faulty construction" , function() {

      it("Should throw error if a marker is omitted" , function() {

        var faulty = function() {

            var markerObj = new Backbone.MapMarker();

        }; 

        expect(faulty).toThrow("Must have a reference to a marker object that will trigger events"); 

      }); 

      it("Should throw error if the model is omitted" , function() {

        var faulty = function() {

            var marker = new google.maps.Marker(); 

            var markerObj = new Backbone.MapMarker({marker: marker});

        }; 

        expect(faulty).toThrow(); 

      });


    }); 

    describe("Usage" , function() {

        beforeEach(function() {

          markerModel = {data : "Some Data"}; 

          googleMarkerMock = new google.maps.Marker(); 

          markerObj = new Backbone.MapMarker({marker : googleMarkerMock , model : markerModel , library: "google"}); 


        }); 

        afterEach(function() {

          markerObj = undefined;

          googleMarkerMock = undefined; 

          markerModel = undefined; 

        }); 

        it("Should have a reference to the original marker" , function() {

          expect(markerObj.getMarker()).toEqual(googleMarkerMock);
        
        });

        it("Should have a reference to the markers model" , function() {

          expect(markerObj.model).toEqual(markerModel); 

        });  

        it("Should trigger marker events" , function() {

          spyOn(markerObj , 'trigger'); 

          google.maps.event.trigger(googleMarkerMock, "click"); 

          expect(markerObj.trigger).toHaveBeenCalled();

          expect(markerObj.trigger.mostRecentCall.args[0]).toEqual("marker:click");

        }); 

        it("Should be able to trigger Marker Events", function() {

          spyOn(googleMarkerMock, 'callListener'); 

          markerObj.triggerEvent("position_changed"); 

          expect(googleMarkerMock.callListener).toHaveBeenCalled(); 

          expect(googleMarkerMock.callListener).toHaveBeenCalledWith("position_changed");

        }); 



    }); 


}); 