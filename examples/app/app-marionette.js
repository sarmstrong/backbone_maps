var MyApp = new Backbone.Marionette.Application(); 

var mapOptions = {

  center: new google.maps.LatLng(40.731432, -73.988752),

  zoom: 12,

  mapTypeId: google.maps.MapTypeId.ROADMAP

};

var map = new google.maps.Map(document.getElementById("map") , mapOptions);

var mapVent = new Backbone.Map({map: map});

MyApp.Collection = new Backbone.Collection();

MyApp.addRegions({

  listContainer : "#list-container"

}); 

MyApp.InfoWindowView = Backbone.Marionette.ItemView.extend({

  template : _.template($("#info-window").html()), 

});

MyApp.ListItemView = Backbone.Marionette.ItemView.extend({

  template : _.template($("#list-item").html()) ,

  initialize : function(options) {

    this.marker = options.marker;

    this.listenTo(this.marker , "marker:mouseover" , this.highlight);

    this.listenTo(this.marker , "marker:mouseout" , this.removeHighlight);

    this.listenTo(this.model , "remove destroy" , this.remove);

    this.listenTo(this.model.collection , "reset" , this.remove);

  } ,

  events : {

    "click h3" : 'markerOpen',

    "mouseover .list-item" : 'highlight',

    "mouseout .list-item" : 'removeHighlight', 

    'click .close' : 'close'
  },

  highlight : function() {

    this.$(".list-item").addClass("highlight");

  },

  removeHighlight : function() {

    this.$(".list-item").removeClass("highlight");

  },

  markerOpen : function() {

    this.marker.triggerEvent("click");

  } , 

  /// Still need to override Marionettes Close Method

  close : function() { 

    this.model.collection.remove(this.model); 

    this.remove(); 

  }

});

/// 

MyApp.ListView = Backbone.Marionette.ItemView.extend({

  template: "#list-view-tmpl" , 

  initialize : function(options) {

    this.listenTo(options.map , 'map:marker_add' , this.addMarker);

  },

  events : {

    'click .clear-all' : "clearAll"

  }, 

  addMarker : function(marker , model) {

    var view = new MyApp.ListItemView({ marker : marker , model: model  });

    this.$('#list-view-container').append(view.render().el);

  } , 

  clearAll : function() { 

    this.collection.reset(); 
    
  }

});

// Setup Controller

MyApp.Controller = Marionette.Controller.extend({

  initialize : function() { 

    MyApp.Collection.on("add" , this.addMarkers , this);

    MyApp.listContainer.show(new MyApp.ListView({ map: mapVent , collection: MyApp.Collection })); 

  }, 

  addMarkers : function(model) {

    var Latlng = new google.maps.LatLng(model.get("lat") , model.get("lon"));

    var options = {

      position: Latlng,

      map: map,

      title: model.get("title")

    };

    var marker = new google.maps.Marker(options);

    var markerObj = mapVent.addMarker(marker , model);

    var infoWindowTemplate = new MyApp.InfoWindowView({marker: marker  , model : model});

    //info_window.render().el); 

    var infowindow = new google.maps.InfoWindow({

      content: infoWindowTemplate.render().el

    });

    google.maps.event.addListener(marker, 'click', function() {
    
       infowindow.open(map, marker);
  
    });

  }

}); 

MyApp.addInitializer(function() {

  var mc = new MyApp.Controller(); 

  MyApp.Collection.add(GEO_DATA);

}); 

MyApp.start(); 




