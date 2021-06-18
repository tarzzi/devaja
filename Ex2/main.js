if (storageAvailable('localStorage')) {
	// Yippee! We can use localStorage awesomeness
	console.log("Working");
}
else {
	// Too bad, no localStorage for us
	console.log("NOT working");
}
qStorage = window.localStorage;
var date = new Date();
[day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];
var div = "";
var questions = [];

if(qStorage.getItem("questions")){
	getQuestions();
}
$("grid").html = div;
// GET
// var questions = JSON.parse(qStorage.questions);

// SET
// qStorage.questions = JSON.stringify(questions));

function storageAvailable(type) {
		var storage;
		try {
				storage = window[type];
				var x = '__storage_test__';
				storage.setItem(x, x);
				storage.removeItem(x);
				return true;
		}
		catch(e) {
				return e instanceof DOMException && (
						// everything except Firefox
						e.code === 22 ||
						// Firefox
						e.code === 1014 ||
						// test name field too, because code might not be present
						// everything except Firefox
						e.name === 'QuotaExceededError' ||
						// Firefox
						e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
						// acknowledge QuotaExceededError only if there's something already stored
						(storage && storage.length !== 0);
		}
}


// Push array containing all questions to localstorage as a string
function saveQuestion() {
	let category = $("#category").val();
	question = "<b>Date:</b> " + day +"."+ month +"."+ year + "<br><b>Category:</b> ";
	question += category + "<br><b>Question:</b> ";
	question += $("#question").val();
	questions.push(question);
	qStorage.questions = JSON.stringify(questions);
	//array.push(question)
	closeForm();
	getQuestions();

}
function getQuestions() {
	var questions = JSON.parse(qStorage.questions);
	$("#grid").empty();
	for(let x = 0; x< questions.length; x++){
		let data = questions[x];
		$("#grid").append('<div class="card"> ' + data + '</div>');
		}
}

function openForm() {
	document.getElementById("myForm").style.display = "block";
}

function closeForm() {
	document.getElementById("myForm").style.display = "none";
}
