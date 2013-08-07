#Backbone.Maps

A simple event bus for handling Google maps events. Using the boilerplate code from the Google Maps API, this library serves as a simple way to bus events between Google Map objects and Backbone objects. 

The purpose of this library is to simply piggybacks off of Backbone.Events and leaves the map creation up to you. The result is a rather flexible library that can plug-into a variety of Backbone environments.

##Documentation

###Backbone.Map

The Backbone.Map object provides a very simple bus for listening to and triggering map events

To start a backbone map app is very simple

**1)** Set up and configure a google map (make sure to add you google maps scripts before your app code)

**2)** Create a Backbone.Map object

```javascript

var map = new google.maps.Map(document.getElementById("map") , mapOptions);

var mapVent = new Backbone.Map({map: map});

```

**3)** Listen to Backbone.Map events as you would any other object

```javascript 

this.listenTo(options.map , 'map:marker_add' , this.addMarker);

```

**4)** Add Backbone.Marker objects that can be listened to as well. This will trigger a "map:marker_add" event and pass the marker and the marker_object and the corresponding model as arguments

```javascript

var marker = new google.maps.Marker(options);

var markerObj = mapVent.addMarker(marker , model);

```

. . . And in a related view listening to marker events

```javascript

this.listenTo(options.marker , 'marker:mouseover' , this.highlight);

```

**5)** Markers will be removed when the model triggers a 'remove' or 'destroy' event or if the collection is reset

[See a live demo here](http://sarmstrong.github.io/backbone_maps/examples/)

##Usage with Backbone.Marionette

Backbone.Maps can easily be plugged into scaffolding like Backbone.Marionette. Because Marionette is not opinionated about how it is implemented, you can use very similar code to the sample above in Marionette. A sample is provided in the examples library.

Because the Backbone.Marker objects are decoupled from the models, using a traditional CollectionView is not easy because the CollectionViews are built with the Collection 'add' event and markers are built ***after*** model creation. To change this would mean coupling the model with the Backbone.Marker object which is not recommended. 

In order to keep our views *dumb*, included is an example of Marionettes CompositeView (which extends from CollectionView) that uses the appendHtml method. 

The app code in the Marionette example is not all that much shorter, mainly because a lot of boilerplate code is still needed to create maps and add markers. 

[See a live demo of the Backbone.Marionette code here](http://sarmstrong.github.io/backbone_maps/examples/index-marionette.html)






