// html id 호출
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

// 약어
const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

// javascript 에서도 width 및 height 크기 조절
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 기본 설정 지정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

ctx.fillRect(50, 20, 100, 49);

// 클릭시 작동 할 수 있게 defalut 값을 false로 설정
let painting = false;
let filling = false;

// 작동 멈춤 함수
function stopPainting() {
  painting = false;
}

// 작동 시작 함수
function startPainting() {
  painting = true;
}

// 마우스 움직였을 때의 함수
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// 색상 클릭 함수
function handleColorclick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// brush 크기조절 함수
function handleRangeChannge(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

// Fill 혹은 stroke 지정 함수
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

// fill 위치 설정 함수
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

// 마우스 우측클릭 방지
function handleCM(event) {
  event.preventDefault();
}

// save btn 클릭시 저장하게 만드는 함수
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

// canvas 내에서 이뤄질 수 있게 if로 묶음.
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// 배열 형식으로 바꾸어 각 color 마다 바뀔수 있게 지정
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorclick)
);

// range active시 진행 할 수 있게 event 추가
if (range) {
  range.addEventListener("input", handleRangeChannge);
}

// fill - stroke 클릭시 모드변경 event 추가
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

// 해당 canvas내용을 저장 할 수 있는 event 추가
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
