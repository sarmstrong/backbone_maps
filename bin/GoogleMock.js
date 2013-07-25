var google = {};

google.maps = {


}; 

google.maps.event = {

  addListener : function(map , event , cb ) {

    map.listeners[event] = {callBack: cb}; 

  } , 

  trigger : function(obj , event) {

    obj.callListener(event);

  }

};

google.maps.Map = function() { 

  this.listeners =  {}; 

  this.callListener = function(event) {

    this.listeners[event].callBack();

  };

};

google.maps.Marker = function(config) {

  var map = config.map; 

  google.maps.Map.call(this);

  this.getMap = function() { 

    return map; 

  }; 


  this.setMap = function(val) { 

    map = val;

  }



};


