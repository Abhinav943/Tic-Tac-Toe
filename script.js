const boxes = document.querySelectorAll(".box");
const newbtn = document.querySelector("#new-btn");
const msgcontainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
let turnX = true;
let count = 0;
let iswinner = false;
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.disabled && !iswinner) {
      if (turnX) {
        box.innerText = "X";
        turnX = false;
      } else {
        box.innerText = "O";
        turnX = true;
      }
      count++;
      box.disabled = true;

      checkwinner();
      if (!iswinner && count === 9) {
        draw();
      }
    }
  });
});

const checkwinner = () => {
  for (let pattern of winpatterns) {
    let position1 = boxes[pattern[0]].innerText;
    let position2 = boxes[pattern[1]].innerText;
    let position3 = boxes[pattern[2]].innerText;

    if (position1 !== "" && position2 !== "" && position3 !== "") {
      if (position1 === position2 && position2 === position3) {
        showwinner(position1);
        iswinner = true;
        break;
      }
    }
  }
};
const showwinner = (winner) => {
  msg.innerText = `Congratulations! winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disableboxes();
};

const draw = () => {
  msg.innerText = "Oops! Game is Draw";
  msgcontainer.classList.remove("hide");
};

const disableboxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableboxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    count = 0;
    iswinner = false;
  });
};

const newgame = () => {
  turnX = true;
  enableboxes();
  msgcontainer.classList.add("hide");
};

newbtn.addEventListener("click", newgame);