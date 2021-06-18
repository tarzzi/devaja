if (!storageAvailable("localStorage")) {
  window.alert("No storage available!");
 }
else{
		var qStorage = window.localStorage;
	}

var div = "";
$("grid").html = div;

// Init date
var date = new Date();
[day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];

if (qStorage.getItem("questions")) {
  var questions = [];
  getQuestions();
}
else{
	var questions = [];
}


function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

// Push array containing all questions to localstorage as a string
function saveQuestion() {
  let category = $("#category").val();
  let question = $("#question").val();
  let dataArr = [];
  let dateStr = day + "." + month + "." + year;
  dateStr = "<h2>Date: " + dateStr + "</h2>";
  category = "<h2>Category: " + category + "</h2>";
  question = "<h2>Question:</h2>" + question;
  dataArr.push(dateStr, category, question);
  questions.push(dataArr);
  qStorage.questions = JSON.stringify(questions);
  console.log(JSON.stringify(questions));
   
  // Close and update
  closeForm();
  getQuestions();
}
// Get from localstorage & append to grid
function getQuestions(let filter) {
  questions = JSON.parse(qStorage.questions);
  let grid = $("#grid");
  grid.empty();
	let index = questions.length;
  for (let x = index; x > 0; x--) {
    let data = questions[x-1];
    let dd = "<div id='dtcat'>" + data[0] + data[1] + "</div>";
    let dq = "<div id='que'>" + data[2] + "</div>";
    let card = $('<div class="card subgrid"></div>').html(dd + dq);
    grid.append(card);
  }
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function clearData(){
	qStorage.clear(); 
	let grid = $("#grid");
  grid.empty();
  }
function filterData(){
	let filter = $("#filter").val();
	
	
	}
