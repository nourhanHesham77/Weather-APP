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
let secondDayInfo = {
  Name : document.getElementById("secDay"),
  degH : document.getElementById("secDegH"),
  degL : document.getElementById("secDegL"),
  stateImg : document.getElementById("state-secDay-img"),
  condition : document.getElementById("secCondition"),
};


//thirdDay
let thirdDayInfo = {
  Name : document.getElementById("thirdDay"),
  degH : document.getElementById("thirdDegH"),
  degL : document.getElementById("thirdDegL"),
  stateImg : document.getElementById("state-thirdDay-img"),
  condition : document.getElementById("thirdCondition"),
};

// async makes the function return a promise
// await => makes JavaScript wait for the promise object to settle before running the code in the next line
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];

console.log
window.addEventListener("load" , getData);
searchInput.addEventListener("input",getData);

async function getData(search){
    console.log("hello");
    // search = searchInput.value;
    // if(search.length === 0){
    //   search = "cairo";
    // }
    try{
     const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5cc05c41cf9c43f59a1112040240307&q=${search}&days=3`);
 
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
    let day = date.getDay();
    let monthC = date.getMonth();
    console.log(day);
    currentStateImg.src = 'https:' + data.current.condition.icon;
    currentCity.innerHTML = data.location.name;
    currentDeg.innerHTML = data.current.temp_c;
    today.innerHTML = weekday[day];
    todayNum.innerHTML = day;
    Month.innerHTML = month[monthC];
    todayCondition.innerHTML = data.current.condition.text;


    // second day
    const dateToDay2 =data.forecast.forecastday[1].date;
    let date2 = new Date(dateToDay2);
    let day2 = date.getDate();
    if(day2>7){
      day2 = day2-7;
    }
    day2 = day2+1;
    secondDay.innerHTML = weekday[day2];
    secDegH.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    secDegL.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    secStateImg.src = 'https:' + data.forecast.forecastday[1].day.condition.icon;
    secCondition.innerHTML = data.forecast.forecastday[1].day.condition.text;
    

    console.log("/third DAY/")
    // thied day
    const dateToDay3 =data.forecast.forecastday[2].date;
    let date3 = new Date(dateToDay3);
    let day3 = date.getDate();
    console.log(day3)
    if(day3>7){
      day3 = day3-7;
    }
    day3 = day3 + 2;
    console.log("day3 "+day3)
  
    console.log(data.forecast.forecastday[2].day.condition.icon);
    thirdDay.innerHTML = weekday[day3];
    thirdDegH.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    thirdDegL.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    thirdStateImg.src = 'https:' +data.forecast.forecastday[2].day.condition.icon;
    thirdCondition.innerHTML = data.forecast.forecastday[2].day.condition.text;
    }catch(error){
        console.error('Error:', error);
    }

}

function setDayInfo(index,obj,data){
  const dateToDay =data.forecast.forecastday[index].date;
  let date = new Date(dateToDay);
  let day = date.getDay();
  obj.Name.innerHTML = weekday[day];
  obj.degH.innerHTML = data.forecast.forecastday[index].day.maxtemp_c;
  obj.degL.innerHTML = data.forecast.forecastday[index].day.mintemp_c;
  obj.stateImg.src = 'https:' +data.forecast.forecastday[index].day.condition;
  obj.condition.innerHTML = data.forecast.forecastday[index].day.condition.text;
}

// keydown Event: This event occurs when the user has pressed down the key. It will occur even if the key pressed does not produce a character value.
// keypress Event: This event occurs when the user presses a key that produces a character value. These include keys such as the alphabetic, numeric, and punctuation keys. Modifier keys such as ‘Shift’, ‘CapsLock’, ‘Ctrl’ etc. do not produce a character, therefore they have no ‘keypress’ event attached to them.
// keyup Event: This event occurs when the user has released the key. It will occur even if the key released does not produce a character value.
