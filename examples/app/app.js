var mapOptions = {

  center: new google.maps.LatLng(40.731432, -73.988752),

  zoom: 12,

  mapTypeId: google.maps.MapTypeId.ROADMAP

};

var map = new google.maps.Map(document.getElementById("map") , mapOptions);

var mapVent = new Backbone.Map({map: map , library: "google"});

var collection = new Backbone.Collection();

//// Views

var InfoWindowView = Backbone.View.extend({

  template : _.template($("#info-window").html()), 

  render : function() {

    this.$el.html(this.template(this.model.toJSON()));

    return this;

  }

});

var listItemView = Backbone.View.extend({

  template : _.template($("#list-item").html()) ,

  initialize : function(options) {

    this.marker = options.marker;

    this.listenTo(this.marker , "marker:mouseover" , this.highlight);

    this.listenTo(this.marker , "marker:mouseout" , this.removeHighlight);

  } ,

  events : {

    "click h3" : 'open',

    "mouseover .list-item" : 'highlight',

    "mouseout .list-item" : 'removeHighlight'
  },

  render : function() {

    this.$el.html(this.template(this.model.toJSON()));

    return this;

  },

  highlight : function() {

    this.$(".list-item").addClass("highlight");

  },

  removeHighlight : function() {

    this.$(".list-item").removeClass("highlight");

  },

  open : function() {

    this.marker.triggerEvent("click");

  }

});

var listView = Backbone.View.extend({

  initialize : function(options) {

    this.listenTo(options.map , 'map:marker_add' , this.addMarker);

  },

  addMarker : function(marker , model) {

    var view = new listItemView({ marker : marker , model: model  });

    this.$el.append(view.render().el);

  }

});

var sidebarList = new listView({el : "#list-view" , map: mapVent});

// Setup Controller

var MapController = function(collection) {

  this.collection = collection;

  collection.on("add" , this.addMarkers , this);

};

_.extend(MapController.prototype , Backbone.Events, {

  addMarkers : function(model) {

    var Latlng = new google.maps.LatLng(model.get("lat") , model.get("lon"));

    var options = {

      position: Latlng,

      map: map,

      title: model.get("title")

    };

    var marker = new google.maps.Marker(options);

    var markerObj = mapVent.addMarker(marker , model);

    var infoWindowTemplate = new InfoWindowView({marker: marker  , model : model});

    //info_window.render().el); 

    var infowindow = new google.maps.InfoWindow({

      content: infoWindowTemplate.render().el

    });

    google.maps.event.addListener(marker, 'click', function() {
    
       infowindow.open(map, marker);
  
    });

  }

});

var mc = new MapController(collection);

collection.add(GEO_DATA);


