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

      var marker_obj = this;

      var reference_marker = this.getMarker();

      this.getLibrary().maps.event.addListener(reference_marker , event , function(e) {

        var event_name = "marker:" + event; 

        marker_obj.trigger(event_name , [e]);

      }); 

    } , 

    triggerEvent : function(event) {

      var reference_marker = this.getMarker();

      this.getLibrary().maps.event.trigger(reference_marker , event);

    }

  }); 

  Backbone.MapMarker = Marker; 


})(Backbone , _);