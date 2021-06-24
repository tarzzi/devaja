function openForm() {
	document.getElementById("nameForm").style.display = "block";
}
function closeForm() {
	document.getElementById("nameForm").style.display = "none";
}

function displaySaved() {
	document.getElementById("saved").style.display = "block";
}
function closeSaved() {
	document.getElementById("saved").style.display = "none";
}

// Initialize
for (let x = 1; x <= 64; x++) {
	let element = $("<canvas id=" + x + "></canvas>");
	$("#grid").append(element);
}
toBlack();

// Handle led clicks
$("canvas").click(function (ev) {
	canvas = ev.target;
	let ctx = canvas.getContext("2d");
	colorData = ctx.getImageData(0, 0, 300, 200);
	let r = colorData.data[0];
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height);
	if (r == 0) {
		ctx.fillStyle = "white";
	} else {
		ctx.fillStyle = "black";
	}
	ctx.fill();
});
// Reset board
$("#reset").click(function () {
	toBlack();
});
function toBlack() {
	for (let x = 1; x <= 64; x++) {
		let c = document.getElementById(x.toString());
		let ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.rect(0, 0, 300, 200);
		ctx.fillStyle = "black";
		ctx.fill();
	}
}

function saveEmoji() {
	displaySaved();
	closeForm();
	let emoji = [];
	let value = 1;
	for (let x = 1; x <= 64; x++) {
		let canvas = document.getElementById(x.toString());
		let ctx = canvas.getContext("2d");
		colorData = ctx.getImageData(0, 0, 300, 200);
		let r = colorData.data[0];
		if (r == 0) {
			value = 1;
		} else {
			value = 0;
		}
		emoji.push(value);
	}
	let name = $("#name").val();
	database.ref("emojis/" + name).set({
		data: emoji,
	});
	toBlack();
	$("#name").val("");
}

// Get emojis from firebase
var emojiRef = firebase.database().ref("emojis/");
emojiRef.on("value", (snapshot) => {
	var data = snapshot.val();
	displayData(data);
});

function displayData(data) {
	console.log(data);
	let emojis = $("#emojis");
	emojis.empty();
	let x = 0;
	for (let [key, value] of Object.entries(data)) {
		let emojiContainer = $("<div></div>");
		let minigrid = $('<div class="minigrid"></div>');
		for (let [key2, value2] of Object.entries(value)) {
			for (let y = 0; y < 64; y++) {
				let item = null;
				let led = value2[y];
				if (led == 0) {
					item = $('<div class="white"></div>');
				} else {
					item = $('<div class=""></div>');
				}
				minigrid.append(item);
			}
		}
		emojiContainer.append("<h3>" + key + "</h3>");
		emojiContainer.append(minigrid);
		emojis.append(emojiContainer);
		x += 1;
	}
}
