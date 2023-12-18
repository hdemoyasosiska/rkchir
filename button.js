const likeButton = document.getElementById("likeButton");
const likeCount = document.getElementById("likeCount");
let isLiked = false;
let count = 0;
let X = 0;
let isDrawing = false;
let hearts = [];

likeButton.addEventListener("click", function () {
  isLiked = !isLiked;
  if (isLiked) {
    likeButton.classList.add("liked");
    count++;
    startDrawing();
  } 
  else{
   
    likeButton.classList.remove("liked");
    count--;
    stopDrawing();
    
  }
  likeCount.innerText = count;
});


function startDrawing() {
  isDrawing = true;
  document.addEventListener("mousemove", drawHeart);
}

function stopDrawing() {
  isDrawing = false;
  document.removeEventListener("mousemove", drawHeart);
  removeHearts();
}



function drawHeart(event) {
  if (isDrawing) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = event.clientX + "px";
    heart.style.top = event.clientY + "px";
    document.body.appendChild(heart);
    hearts.push(heart);
  }
}

function removeHearts() {
  for (let heart of hearts) {
    heart.remove();
  }
  hearts = [];
}
