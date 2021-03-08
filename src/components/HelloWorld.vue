<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <ul>
      <li v-for="location in locations" :key="location.state">
        <button v-on:click="region(location.state)">{{location.state}}</button>
        <div v-if="location.state == currentClick"> 
          <ul class="card-container">
            <li class="display-inline " v-for="city in citys" :key="city.city">
              <button class="btn" v-on:click="citySelect(city.city)">{{city.city}} </button>
              <div class="card " v-if="city.city == cityClick " :class="city.city == cityClick ? 'bloc' : 'none'"> 
                <img :src="'img/'+currentWeather.current.weather.ic+'.png'" :alt="currentWeather.current.weather.ic">
                <p><strong>{{city.city}}</strong></p>
      
             <div class="in-card-flex">
               <div class="card-animate-relative">                
                <div class="card-animate-absolute" :style=" `width: `+currentWeather.current.weather.hu+`px ;`">
                  {{currentWeather.current.weather.hu}}
                </div>
              </div>
              <div class="card-animate-relative">
                <div class="card-animate-absolute" :style=" `width: `+currentWeather.current.weather.tp*5+`px;`">
                  {{currentWeather.current.weather.hu}}
                </div>
              </div>
              <div class="card-animate-relative">
                <div class="card-animate-absolute" :style=" `width: `+currentWeather.current.weather.wd+`px;`">
                  {{currentWeather.current.weather.wd}}
                </div>
              </div>
              <div class="card-animate-relative">
                <div class="card-animate-absolute" :style=" `width: `+currentWeather.current.weather.ws*10+`px;`">
                  {{currentWeather.current.weather.wd}}
                </div>
              </div>

             </div> 
             
               
                
                <google-map 
                  v-if="currentWeather.city ==  city.city"                  
                  v-bind:lati="currentWeather.location.coordinates[1]"
                  v-bind:long="currentWeather.location.coordinates[0]" 
                />               
                
              </div> 
            </li>
          </ul>
        </div>
      </li>
      
    </ul>
      
    
  </div>
</template>

<script>
import GoogleMap from "./GoogleMap";
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    array: Array
  },
   components: {   
    GoogleMap
  },
  
  data(){
    return {
      number: 0,
      tweenedNumber: 0,
           
      currentClick: "",
      cityClick:"",
      locations: [],
      citys:[],
      currentWeather:[],
    }

  },
 
  mounted(){

    this.axios
      .get(this.base_url)
        .then((response) =>{
          //console.log(response.data.data);
          this.locations = response.data.data;
          
          
        }
        );
        
  },
  
  methods: {
    change: function(here){
      return here;
    },

    region: function(clicked){
      //console.log(clicked);
      this.citys = [];
      this.currentClick = clicked;
      this.axios
      .get("http://api.airvisual.com/v2/cities?state="+this.currentClick+"&country=Italy&key= [api key air visual]")
        .then((response) =>{
          // console.log(response.data);
          this.citys = response.data.data;
          
          
        }
        );
    },
    
   
    citySelect: function(selectedcity){
      //console.log(selectedcity);
      this.cityClick = selectedcity;
     
      this.axios
      .get( "http://api.airvisual.com/v2/city?city="+this.cityClick+"&state="+this.currentClick+"&country=Italy&key=  [api key air visual]"
        )
        .then((response) =>{
           console.log(response.data.data);
          this.currentWeather = response.data.data;
          console.log(this.currentWeather.location.coordinates[0]);
          
          
        }
        );
        
        
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  
  margin: 20px;
}
a {
  color: #42b983;
}
.display-inline {
  display: inline-block;
  
}
.card-container{
  min-height: 150px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
   animation-name: card-animation;
  animation-duration: 1.5s;
}
.cards {
  
  min-height: 200px;
}
.none {
  opacity: 0;
}
.card { 
  width: 500px;  
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100px;
  opacity: 1;
  animation-name: card-animation;
  animation-duration: 1.8s;
  border-radius: 5px;
  margin-top: 5px ;
  background-color: cadetblue ;
  padding: 20px 0;
  box-shadow: 5px 5px grey;
}
img {
  width: 50px;
}
button{
  animation-name: card-animation;
  animation-duration: 1.5s;
  background-color: lightgreen ;
  border-radius: 5px;
  border: 2px solid rgb(20, 166, 214, 0.5);
}
button:active {
   background-color: lightblue ;
}
button:focus {
  outline: none;
}

.btn {
   width: 100px;
   background-color: rgb(173, 230, 225) ;
}
@keyframes card-animation {
  from {opacity: 0}
  to {opacity: 1}
}
.card-animate-relative{
  position: relative;
  width: 80px;
  height: 10px;
  display: flex;
  border-radius: 5px;
  background-color: white ;
  color: black;
  font-size: 9px ;
} 

.card-animate-absolute {
  width: 0;
  transition: 2s;
  background-color: blue ;
  height: 100%;
  border-radius: 5px;
  

}
.in-card-flex{
  display: flex;
  width: 100%;
  justify-content: space-around;
}


</style>
