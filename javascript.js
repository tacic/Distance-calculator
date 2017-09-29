var myLatLng = {lat: 44.8,lng: 20.5};
var mapOptions = {
  center: myLatLng,
  zoom: 9,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);


var directionsService = new google.maps.DirectionsService();

var directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);


function calcRoute(){
    var request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC //IMPERIAL
    }
    
    directionsService.route(request,
    function(result,status){
     if(status == google.maps.DirectionsStatus.OK){
         
        $("#output").html("<div class='alert-info'>From: "+document.getElementById("from").value+".<br/>To: "+document.getElementById("to").value+".<br/>Driving distance: "+result.routes[0].legs[0].distance.text+             ".<br/>Duration: " +result.routes[0].legs[0].duration.text+".</div>"); 
      
         
         directionsDisplay.setDirections(result);
         
     }else{
         
         directionsDisplay.setDirections({routes:[]});
         
         map.setCenter(myLatLng);
         
         $("#output").html("<div class='alert-danger'>Could not retrive distance</div>");
     }  
    });   
}

var options = {
    types:['(cities)']
}


var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);




