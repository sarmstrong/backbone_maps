#Backbone Maps

A simple event bus for handling google maps events. Using the boilerplate code from the Google Maps api, this library serves as a simple way to bus events between Google Map objects and Backbone object. 

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

. . . And in a related view listening to maps events

```javascript

this.listenTo(options.map , 'map:marker_add' , this.addMarker);

```

**5)** Markers will be removed when the model triggers a 'remove' event

##ToDo List

Example of integration with Backbone.Marionette




