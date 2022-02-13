// draggable func
// target elements with the "draggable" class

// end draggable func
// start resize
interact("#resizable-element")
  .styleCursor(false)
  .resizable({
    manualStart: true,
    edges: { left: true, right: true, bottom: true, top: true },
  })
  .on("resizemove", function (event) {
    console.log(event.rect);
    var target = event.target,
      x = parseFloat(target.getAttribute("data-x")) || 0,
      y = parseFloat(target.getAttribute("data-y")) || 0;

    // update the element's style
    target.style.width = event.rect.width + "px";
    target.style.height = event.rect.height + "px";

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px," + y + "px)";

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);

    moveHandler(event, document.getElementById("resize-handle"));
  });

interact("#resize-handle").on("down", function (event) {
  var interaction = event.interaction,
    handle = event.currentTarget;

  interaction.start(
    {
      name: "resize",
      edges: {
        left: handle.dataset.left,

        right: handle.dataset.right,
      },
    },
    interact("#resizable-element"), // target Interactable
    document.getElementById("resizable-element")
  ); // target Element
});

function moveHandler(event, handlerElement) {
  var target = handlerElement,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
    y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  // target.style.webkitTransform = target.style.transform =
  //   "translate(" + event.rect.right + "px, " + event.rect.bottom + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
//
// btn color
let clr;
//
$(".startActivity").on("click", () => {
  const html = `
  <div class='square   ' id="resizable-element">
    <div class='form ' >
      <input id="form__value" class="btn" type='number' min='1' max='10'/>
      <button id="form__btn">Ok</button>
    </div>
    <div id="resize-handle" data-right="true" data-top="true"></div>
  </div>
  
  `;

  document.querySelector(".dragParent").insertAdjacentHTML("afterbegin", html);

  let formBtn = document.querySelector(".form button");
  formBtn.addEventListener("click", (e) => {
    const target = e.target.parentElement.children[0];
    const square = target.parentElement.parentElement;
    if (!target.value) return;
    // console.log(target.value);
    for (let i = 0; i < +target.value; i++) {
      let childd = document.createElement("p");
      // childd.setAttribute("class", "clickMe");
      childd.classList.add("childd");
      childd.style.width = `${100 / +target.value}%`;
      square.appendChild(childd);
    }
    e.target.parentElement.remove();
  });

  document.querySelectorAll(".square").forEach((sq) => {
    sq.addEventListener("click", (e) => {
      document
        .querySelectorAll(".square")
        .forEach((sq) => sq.classList.remove("select"));
      if (e.target.classList.contains("square"))
        e.target.classList.add("select");
      else e.target.parentElement.classList.add("select");
    });
  });
});
//
(function () {
  const colorBtn = document.querySelectorAll(".color__btn");
  // console.log(colorBtn);
  colorBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // console.log(e.target.dataset.color);
      clr = e.target.dataset.color;

      const slice = document.querySelectorAll(".childd");

      slice.forEach((ele) => {
        ele.addEventListener("click", (e) => {
          const target = e.target;

          const targetBg = target.style.backgroundColor;
          //
          function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
          }

          function rgbToHex(r, g, b) {
            console.log(
              "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
            );
            return (
              "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
            );
          }
          //

          const rgb = targetBg
            .split("")
            .filter((le) => !isNaN(le) || le === ",")
            .join("")
            .split(",")
            .map((num) => +num);
          console.log(rgb);
          // if (targetBg === clr) targetBg = "none";
          target.style.backgroundColor = clr;
        });
      });
    });
  });
})();
