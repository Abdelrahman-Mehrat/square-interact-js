var correctImg =
  '<div class="showAnswerTickMark showAns"><img src="assets/images/tikMark.png" /></div>';
var incorrectImg =
  '<div class="showAnswerCrossMark showAns"><img src="assets/images/crossMark.png" /></div>';
var isMusic1Playing = false;
var isMusic2Playing = false;
var $audio1 = $("#audioPlayer1");
var $audio2 = $("#audioPlayer2");
var slider = document.getElementById("myRange");

var lastAudio = 0;

var totalItems = $(".item").length;
var currentIndex = $("div.active").index() + 1;

function fnTemplate1_v2(_div) {
  let audioArr = [];
  $(".opt").each(function () {
    let srcs = $(this).attr("data-audioSrc");
    audioArr.push(srcs);
  });
  let count = 0;

  $(".opt").on("click", function () {
    if ($(this).hasClass("moving")) {
      $(this).css("pointer-events", "none");
    }

    $audio2[0].setAttribute("src", audioArr[count]);
    $audio2[0].play();
    count++;
    let el = $(this);
    let className = $(this.classList);
    console.log(className[1]);
    $(this.classList.add("animation" + className[1]));
    $(this.classList.add("moving"));
    // setTimeout(function () {
    //     el.css('opacity', '0')

    // }, 500)
  });

  var slide = $(_div);
  $audio1[0].currentTime = 0;
  slider.value = 0;
  $audio1[0].pause();
  $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();
  setAudio($(slide).attr("data-audioSrc"));
  var totalQues = $(slide).find(".question").length;
  var totalAttempted = 0;

  $(slide)
    .find(".notCompleted .option")
    .on("click", function () {
      // console.log("option click ");
      var _this = $(this);
      var result = $(this).attr("data-Answer");
      var currDiv = $(this).parent();

      // console.log(" currDiv ");
      // console.log(currDiv);
      if (result == "incorrect") {
        // fnTitleAudioClick(this);
        fnAudio(this);

        $(_this).addClass("incorrectTick");
        setTimeout(function () {
          $(_this).removeClass("incorrectTick");
        }, 1000);
      } else if (result == "correct") {
        $(".opt").css("pointer-events", "none");
        $(".opt").css("opacity", "1");
        $(".opt").removeClass("moving");
        for (let i = 1; i < 10; i++) {
          $(".opt").removeClass("animationopt" + i);
        }
        // $('.opt').click();
        $(currDiv).find(".option").addClass("optDisable showAns").off("click");
        $(currDiv)
          .find(".option[data-Answer='incorrect']")
          .addClass("disabled");
        $(currDiv).removeClass("notCompleted").addClass("completed");
        // $(this).append(correctImg);
        totalAttempted++;
        if (totalAttempted == totalQues) {
          $(".showAnsBtn").addClass("disabled");
        } else {
          $(".showAnsBtn").removeClass("disabled");
        }
        $(this).addClass("correctTick");
        fnAudio(this);
      }
    });

  totalAttempted = $(slide).find(".correctTick").length;
  if (totalAttempted == totalQues) {
    $(".showAnsBtn").addClass("disabled");
    $("div.active").find(".option").off("click");
  } else {
    $(".showAnsBtn").removeClass("disabled");
  }
}

function fnReloadAll() {
  console.log(document.querySelectorAll(".square"));
  let wrapper = document.querySelectorAll(".square");
  wrapper.forEach((i) => {
    i.remove();
  });
}

function fnReloadScreen() {
  document.querySelector(".select").remove();
}

function fnAudio(obj) {
  var titleAudioPath = $(obj).attr("data-audioSrc");
  $audio2[0].setAttribute("src", titleAudioPath);
  $audio2[0].load();
  var playPromise = $audio2[0].play();

  if (playPromise !== undefined) {
    playPromise
      .then(function (value) {
        // Automatic playback started!
        // Show playing UI.
        //$audio1[0].currentTime = 0;
        //$("#slider").slider({"value": 0});

        $audio1[0].pause();
        $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
        $("#pButton .playImg").show();
        $("#pButton .pauseImg").hide();
      })
      .catch(function (error) {
        // Auto-play was prevented
        // Show paused UI.
      });
  }
}

function showAns() {
  // music.pause();
  // pButton.className = "";
  // pButton.className = "play";
  if ($(".showAnsBtn").hasClass("disabled")) {
    return false;
  }

  $audio1[0].pause();
  $audio2[0].pause();
  $(".opt").css("pointer-events", "none");
  $(".opt").css("opacity", "1");
  $(".opt").removeClass("moving");
  for (let i = 1; i < 10; i++) {
    $(".opt").removeClass("animationopt" + i);
  }
  // $('.showAnswerTickMark').fadeIn('slow');
  $("div.active")
    .find('.option[data-Answer="correct"]')
    .addClass("correctTick");
  $("div.active").find('.option[data-Answer="incorrect"]').addClass("disabled");
  $("div.active").find(".option").addClass("optDisable").off("click");
  // $(".option[data-Answer='incorrect']").css('opacity','0.6');
  $(this).addClass("disabled");
}

function setAudio(_src) {
  if (_src == "") {
    $(".controlsDiv").addClass("hide");
  } else {
    $(".controlsDiv").removeClass("hide");
  }
  $audio1[0].setAttribute("src", _src);
  $audio1[0].load();
}

/* Title Audio function */
function fnTitleAudioClick(obj) {
  if ($(obj).hasClass("hide")) {
    return false;
  }
  //$audio1[0].currentTime = 0;
  //$("#slider").slider({"value": 0});
  $audio1[0].pause();
  $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();
  var titleAudioPath = $(obj).attr("data-audioSrc");
  $audio2[0].setAttribute("src", titleAudioPath);
  $audio2[0].load();
  $audio2[0].play();
  isMusic1Playing = false;
  isMusic2Playing = true;
}

function fnUpdateTimer() {
  var progressValue = Math.round(
    ($audio1[0].currentTime / $audio1[0].duration) * 100
  );
  slider.value = progressValue;
}

$audio1[0].addEventListener("ended", function () {
  lastAudio = 0;
  isMusic1Playing = false;
  $audio1[0].currentTime = 0;
  $("#slider").slider({ value: 0 });
  $audio1[0].pause();
  $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();
});

function fnStartAudio(_state) {
  $audio2[0].pause();
  if (_state == "play") {
    $("#pButton .playImg").hide();
    $("#pButton .pauseImg").show();
    $audio1[0].play();
    isMusic1Playing = true;
  } else {
    $("#pButton .playImg").show();
    $("#pButton .pauseImg").hide();
    $audio1[0].pause();
    lastAudio = 0;
    isMusic1Playing = false;
  }
  $audio1[0].addEventListener("timeupdate", fnUpdateTimer);
}

function stopAudio() {
  $audio1[0].pause();
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();
  $audio1[0].currentTime = 0;
  slider.value = 0;
  isMusic1Playing = false;
  $audio2[0].pause();
  isMusic2Playing = false;
  lastAudio = 0;
}

function fnSetPlayer() {
  if (currentIndex == 1) {
    $(".backBtn").addClass("disabled");
  }

  if (totalItems == 1) {
    $(
      ".navigationControls, .nextBtn, .reloadBtnScreen, .backBtn, .pageNumber"
    ).addClass("hide");
  }

  if ($(".title").attr("data-audioSrc") == "") {
    $(".title").addClass("hide");
    $(".headingTitle").removeClass("col-xs-10").addClass("col-xs-11");
  }

  $audio1[0].addEventListener("playing", function () {
    lastAudio = 1;
    isMusic1Playing = true;
  });

  $audio2[0].addEventListener("playing", function () {
    lastAudio = 2;
    isMusic2Playing = true;
  });

  $audio1[0].addEventListener("pause", function () {
    isMusic1Playing = false;
  });

  $audio2[0].addEventListener("pause", function () {
    isMusic2Playing = false;
  });

  $audio2[0].addEventListener("ended", function () {
    lastAudio = 0;
  });

  slider.addEventListener(
    "input",
    function () {
      // console.log(">> input "+slider.value);
      // $audio1[0].pause();
      $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
      var setTime = Math.round((slider.value * $audio1[0].duration) / 100);
      $audio1[0].currentTime = setTime;
    },
    false
  );

  slider.addEventListener(
    "change",
    function () {
      // console.log("change >> "+isMusic1Playing);
      if (isMusic1Playing) {
        $audio1[0].play();
        $audio1[0].addEventListener("timeupdate", fnUpdateTimer);
      }
    },
    false
  );

  $("#myCarousel").on("slid.bs.carousel", function () {
    currentIndex = $("div.active").index() + 1;
    $(".pageNumber").html(currentIndex + " of " + totalItems);
    if (currentIndex == 1) {
      $(".backBtn").addClass("disabled");
    } else {
      $(".backBtn").removeClass("disabled");
    }

    if (currentIndex == totalItems) {
      $(".nextBtn").addClass("disabled");
    } else {
      $(".nextBtn").removeClass("disabled");
    }

    // need to edit template function name here:
    fnTemplate1_v2($("div.active"));
  });
}
