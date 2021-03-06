(function(Backbone , _){



  var Map = function(opts) {

    var options = opts || {};

    if (options.map === undefined ) {

        throw "Must define a map in the options";

    }

    var library = google;  

    this.getMap = function() {

        return options.map;


    };

    this.getLibrary = function() {

       return library; 

    }; 

    this.getLibraryName = function() { 

      return options.library; 

    }; 

    for (var prop in this.mapEvents) {

        var event = this.mapEvents[prop];

        this.addListener(event);

    }

  };

  _.extend(Map.prototype , Backbone.Events , {

    mapEvents : [

        "bounds_changed",

        "center_changed",

        "click",

        "dblclick",

        "drag",

        "dragend",

        "dragstart",

        "heading_changed",

        "idle",

        "maptypeid_changed",

        "mousemove",

        "mouseout",

        "mouseover",

        "projection_changed",

        "resize",

        "rightclick",

        "tilesloaded",

        "tilt_changed"

    ] , 

    addMapEvents : function(event_str) {

      this.mapEvents.push(event_str);

    } , 

    addListener : function(event) {

      var mapObj = this;

      var referenceMap = this.getMap();

      this.getLibrary().maps.event.addListener(referenceMap , event , function(e) {
                
        var eventName = "map:" + event; 
                
        mapObj.trigger(eventName , [e]);

      }); 

    } , 

    triggerEvent : function(event) {

      var reference_map = this.getMap();

      this.getLibrary().maps.event.trigger(reference_map , event);

    } , 

    addMarker : function(marker , model) {

      var marker_obj = new Backbone.MapMarker({marker: marker , model : model }); 

      this.trigger("map:marker_add" , marker_obj , model);

      return marker_obj; 

    }  


  });

  Backbone.Map = Map; 

})(Backbone , _);