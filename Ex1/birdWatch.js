$(function () {
  const birds = [
    "peippo",
    "tikka",
    "talitintti",
    "punatulkku",
    "sinitiainen",
    "västäräkki",
    "mustarastas",
    "varpunen",
    "kottarainen",
    "tulipäähippiäinen",
  ];
  // Init counter
  let x = 0;
  // Init first birb
  $("#bird").text(birds[x]);
  let bird = birds[x];
  let letterCount = bird.length;
  let firstOrLast = true;

  $("#input").keypress(function (event) {
    i = 0;
    letterCount = bird.length;
    // First letter
    if (event.keyCode == bird.charCodeAt(0) && firstOrLast) {
      firstOrLast = false;
      ReplaceLetters();
    }
    // Last letter
    else if (
      event.keyCode == bird.charCodeAt(letterCount - 1) &&
      !firstOrLast
    ) {
      firstOrLast = true;
      ReplaceLetters();
    } else {
      // If all birds typed
      if (x == 9) {
        $("#bird").text("Nice typing").addClass("keno");
      }
    }
  });

  function ReplaceLetters() {
    // Go through letters and replace w/ typed letter
    while (i < letterCount) {
      if (event.keyCode == bird.charCodeAt(i)) {
        bird = bird.replace(bird.charAt(i), "");
        $("#bird").text(bird);
      }
      // All letters typed, show next bird
      else if (bird.length == 0) {
        NextBird();
        break;
      }
      // Not found, increase counter & update bird
      else {
        i += 1;
        $("#bird").text(bird);
      }
    }
  }

  function NextBird() {
    // Update next bird
    x += 1;
    bird = birds[x];
    letterCount = bird.length;
    firstOrLast = true;
    $("#bird").text(bird);
  }
});
