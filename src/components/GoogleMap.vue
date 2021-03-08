<template>
  <div style="width: 100%;  min-height: 50px;">
    <br>
    <div style="display: flex; justify-content:center; padding: 20px 0px ;width: 100%;  height: 200px; ">
    <gmap-map
      :center="center"
      :zoom="12"
      :lati="lati"
      :long="long"
      style="width:85%;  min-height: 50px  "
    >
      <gmap-marker 
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: [
    "lati",
    "long"
  ],
  data() {
    return {
       
      center: { lat: this.lati, lng:  this.long },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  mounted(){
      console.log(Number(this.lati));
      console.log(Number(this.long)); 
           
      
      this.center = { lat: Number(this.lati), lng:  Number(this.long)};
      
      
     
  },
  
  

  
  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
      
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        
       
        
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
          
          
        };
        
    
      });
      
    }
  }
};
</script>