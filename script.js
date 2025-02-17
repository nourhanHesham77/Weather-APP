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
    let dayInMonth = date.getUTCDate();
    console.log(day);
    currentStateImg.src = 'https:' + data.current.condition.icon;
    currentCity.innerHTML = data.location.name;
    currentDeg.innerHTML = data.current.temp_c;
    today.innerHTML = weekday[day];
    todayNum.innerHTML = dayInMonth;
    Month.innerHTML = month[monthC];
    todayCondition.innerHTML = data.current.condition.text;


    // second day
    setDayInfo(1,secondDayInfo,data);
    // thied day
    setDayInfo(2,thirdDayInfo,data);
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
  obj.stateImg.src = 'https:' +data.forecast.forecastday[index].day.condition.icon;
  obj.condition.innerHTML = data.forecast.forecastday[index].day.condition.text;
}

// Important to know
searchInput.addEventListener("input" ,()=>{
  getData(searchInput.value ? searchInput.value : "cairo");
});

window.addEventListener("load",()=>{
  getData("cairo");
})

// keydown Event: This event occurs when the user has pressed down the key. It will occur even if the key pressed does not produce a character value.
// keypress Event: This event occurs when the user presses a key that produces a character value. These include keys such as the alphabetic, numeric, and punctuation keys. Modifier keys such as ‘Shift’, ‘CapsLock’, ‘Ctrl’ etc. do not produce a character, therefore they have no ‘keypress’ event attached to them.
// keyup Event: This event occurs when the user has released the key. It will occur even if the key released does not produce a character value.
