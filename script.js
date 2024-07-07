let searchInput = document.getElementById("search");
let search='';
let currentStateImg = document.getElementById("state-today-img");
let currentCity = document.getElementById("cityName");
let currentDeg = document.getElementById("deg");
let today = document.getElementById("today");
let todayNum = document.getElementById("todayNum");
let Month = document.getElementById("Month");
let todayCondition = document.getElementById("condition");
//secondDay
let secondDay = document.getElementById("secDay");
let secDegH = document.getElementById("secDegH");
let secDegL = document.getElementById("secDegL");
let secStateImg = document.getElementById("state-secDay-img");
let secCondition = document.getElementById("secCondition");

//thirdDay
let thirdDay = document.getElementById("thirdDay");
let thirdDegH = document.getElementById("thirdDegH");
let thirdDegL = document.getElementById("thirdDegL");
let thirdStateImg = document.getElementById("state-thirdDay-img");
let thirdCondition = document.getElementById("thirdCondition");

// async makes the function return a promise
// await => makes JavaScript wait for the promise object to settle before running the code in the next line
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];

console.log
window.addEventListener("load" , getData);
searchInput.addEventListener("input",getData);

async function getData(){
    console.log("hello");
    search = searchInput.value;
    if(search.length === 0){
      search = "cairo";
    }
    try{
     const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=5cc05c41cf9c43f59a1112040240307&q=${search}&days=3`);
 
     if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
    const data = await response.json();
 
  
    console.log('All data: ', data);
    // First day
    const dateToDay =data.forecast.forecastday[0].date;
    // const d = new Date();
    let date = new Date(dateToDay);
    let day = date.getDate();
    let monthC = date.getMonth();
    console.log('Today: ', weekday[day]);
    console.log('month: ', month[monthC]);
    console.log('country name: ', data.location.name);
    console.log('NOW temp :', data.current.temp_c);
    currentStateImg.src = data.current.condition.icon;
    currentCity.innerHTML = data.location.name;
    currentDeg.innerHTML = data.current.temp_c;
    today.innerHTML = weekday[day];
    todayNum.innerHTML = day;
    Month.innerHTML = month[monthC];
    todayCondition.innerHTML = data.current.condition.text;

    console.log("/SECOND DAY/")
    // second day
    const dateToDay2 =data.forecast.forecastday[1].date;
    let date2 = new Date(dateToDay2);
    let day2 = date.getDate();
    console.log('Tomorrow: ', weekday[day2]);
    console.log('country name: ', data.location.name);
    console.log('maxtemp :', data.forecast.forecastday[1].day.maxtemp_c);
    console.log('mintemp :', data.forecast.forecastday[1].day.mintemp_c);
    secondDay.innerHTML = weekday[day2];
    secDegH.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    secDegL.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    secStateImg.src = data.forecast.forecastday[1].day.condition.icon;
    secCondition.innerHTML = data.forecast.forecastday[1].day.condition.text;
    

    console.log("/third DAY/")
    // thied day
    const dateToDay3 =data.forecast.forecastday[2].date;
    let date3 = new Date(dateToDay3);
    let day3 = date.getDate();
    console.log('Tomorrow: ', weekday[day]);
    console.log('country name: ', data.location.name);
    console.log('maxtemp :', data.forecast.forecastday[2].day.maxtemp_c);
    console.log('mintemp :', data.forecast.forecastday[2].day.mintemp_c);
    thirdDay.innerHTML = weekday[day3];
    thirdDegH.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    thirdDegL.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    thirdStateImg.src = data.forecast.forecastday[2].day.condition.icon;
    thirdCondition.innerHTML = data.forecast.forecastday[2].day.condition.text;
    }catch(error){
        console.error('Error:', error);
    }

}

// keydown Event: This event occurs when the user has pressed down the key. It will occur even if the key pressed does not produce a character value.
// keypress Event: This event occurs when the user presses a key that produces a character value. These include keys such as the alphabetic, numeric, and punctuation keys. Modifier keys such as ‘Shift’, ‘CapsLock’, ‘Ctrl’ etc. do not produce a character, therefore they have no ‘keypress’ event attached to them.
// keyup Event: This event occurs when the user has released the key. It will occur even if the key released does not produce a character value.
