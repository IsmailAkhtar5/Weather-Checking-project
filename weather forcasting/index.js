// ______________________ GETTING DOM REFRENCES HERE _______________________

let Country_Name=document.querySelector(".country_name")
let City_Name=document.querySelector(".city_name")
let search_city=document.querySelector(".search_city")
let w_date=document.querySelector(".date_time")
let w_temp=document.querySelector(".weather_temperature")
let w_forcast=document.querySelector(".forcast")
let w_min=document.querySelector(".weather_min")
let w_max=document.querySelector(".weather_max")
let w_feelslike=document.querySelector(".feels_like")
let w_humidity=document.querySelector(".humidity")
let w_pressure=document.querySelector(".pressure")
let w_wind=document.querySelector(".wind")

// ____________________________ CODE FOR DYNAMIC SEARCH BAR____________

city="Lahore";

search_city.addEventListener("submit" ,(e)=>{
  e.preventDefault()

  city=City_Name.value;
  Fetch_Weather_Data();
  City_Name.value="";
})
  

// _________________________ API FOR INTERNATIONAL COUNTRY NAME _____________

const getcountryname=(country)=>{
  return regionNamesInEnglish = new Intl.DisplayNames([country], { type: 'region' }).of(country);

}

// _____________________________ API FOR INTERNATIONAL DATE AND TIME ___________

const get_date=(dt)=>{
 let current_date=new Date(dt*1000)

 const option={
  day:"numeric",
  month:"long",
  hour:"numeric",
  minute:"numeric",
  second:"numeric",
  year:"numeric",
  weekday:"long"

 }
 return new Intl.DateTimeFormat('en-US',option).format(current_date);

}


// ________________________FETCHING DATA FROM API AND MAIN FUNC HERE________________
const Fetch_Weather_Data= async()=>{
 
const weatherApiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1fcd1986026ec8dbb2ca415da8e03e2c`


  try {
      const res=await fetch(weatherApiUrl)
      const data = await res.json()
      console.log(data);

      const {main,weather,sys,dt,name,wind}=data
      // ______________________ ADDING COUNTRY NAME TO WEBPAGE ___________________

Country_Name.innerHTML=(`${name},${getcountryname(sys.country)}`)

  //  ___________________________- ADDING DATE TO WEBPAGE________________________

    w_date.innerHTML=get_date(dt);

    // _________________________adding temperature__________________

w_temp.innerHTML=`${(main.temp-273).toFixed()}&#176C`;
// ____________________________ FORCASTING____________________
w_forcast.innerHTML=weather[0].description;
// ________________________ ADDING MAX AND MIN TEMPERATURE__________________

w_max.innerHTML=`maximum:${(main.temp_max-273).toFixed()}&#176C`

w_min.innerHTML=`minimum:${(main.temp_min-273).toFixed()}&#176C`

// _________________________- EXTRA WEATHER INFO___________________

w_feelslike.innerHTML=`${(main.feels_like-273).toFixed()}&#176C`
w_humidity.innerHTML=`${main.humidity}`
w_pressure.innerHTML=main.pressure
w_wind.innerHTML=wind.speed
  } catch (error) {
    console.log(error)
  }
}








document.body.addEventListener("load",Fetch_Weather_Data())