const numDivs = 36;
const maxHits = 10;

let hits = 0;
let misses = 0;
let firstHitTime = 0;

function round() {
  $('.target').removeClass('target');
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $('.target').text(`${hits + 1}`);
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(`.game-field`).addClass('d-none');
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  let totalScore = hits - misses;
  if (totalScore < 1) {
    totalScore = 0;
  }
  $('#total-score').text(`${totalScore}`)
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $('.miss').removeClass('miss')
    $('.target').text(``);
    hits = hits + 1;
    round();
  } else if ($(event.target).hasClass("game-field")) {
    $(event.target).addClass('miss');
    misses = misses + 1;
  }
}

function init() {
  round();
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$('#button-start').click(function() {
  $('#button-start').addClass('d-none');
  $('#button-reload').removeClass('d-none');
  $('.game').removeClass('d-none');
  firstHitTime = getTimestamp();
  init();
});
