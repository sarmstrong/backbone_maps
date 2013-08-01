(function(Backbone , _){

  var Marker;

  Marker = function(opts) {

    var options = opts || {};

    if (options.marker === undefined) {

      throw "Must have a reference to a marker object that will trigger events";

    } 

    if (options.model === undefined) {

      throw "Must associate a model with a MapMarker";

    }

    var library = google; 

    this.getMarker = function() { 

      return options.marker;

    };

    this.getLibrary = function() { 

      return library; 

    }; 

    this.model = options.model;

    this.listenTo(this.model , "destroy remove" , this.remove);

    if (this.model.collection !== undefined) {

      this.listenTo(this.model.collection , "reset" , this.remove);

    }

    for (var prop in this.markerEvents) {

        var event = this.markerEvents[prop];

        this.addListener(event);

    }

  };  


  _.extend(Marker.prototype , Backbone.Events , {

      markerEvents : [

        'animation_changed',

        'click',

        'clickable_changed',

        'cursor_changed',

        'dblclick',

        'drag',

        'dragend',

        'draggable_changed',

        'dragstart',

        'flat_changed',

        'icon_changed',

        'mousedown',

        'mouseout',

        'mouseover',

        'mouseup',

        'position_changed',

        'right click',

        'shadow_changed',

        'shape_changed',

        'title_changed',

        'visible_changed',

        'zindex_changed'

    ] , 

    addListener : function(event) {

      var markerObj = this;

      var referenceMarker = this.getMarker();

      this.getLibrary().maps.event.addListener(referenceMarker , event , function(e) {

        var eventName = "marker:" + event; 

        markerObj.trigger(eventName , [e]);

      }); 

    } , 

    triggerEvent : function(event) {

      var referenceMarker = this.getMarker();

      this.getLibrary().maps.event.trigger(referenceMarker , event);

    } , 

    remove : function() {

      var referenceMarker = this.getMarker(); 

      referenceMarker.setMap(null);

      this.trigger("marker:removed" , this);

    }

  }); 

  Backbone.MapMarker = Marker; 


})(Backbone , _);