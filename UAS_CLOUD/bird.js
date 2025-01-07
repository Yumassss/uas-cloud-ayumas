const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Muat gambar burung
const birdImage = new Image();
birdImage.src = "image/bird.png";

// Variabel Game
const gravity = 0.9;
const jump = -10;
const pipeGap = 120;
const pipeWidth = 50;
let birdY = canvas.height / 2;
let birdVelocity = 0;
let score = 0;
const pipes = [];
let isGameOver = false;

// Tombol
const playAgainDiv = document.getElementById("playAgain");
const playAgainButton = document.getElementById("playAgainButton");
const backToMenuButton = document.getElementById("backToMenu");
const finalScoreText = document.getElementById("finalScore");

// Fungsi untuk memulai game
function startGame() {
  isGameOver = false;
  birdY = canvas.height / 2;
  birdVelocity = 0;
  score = 0;
  pipes.splice(0, pipes.length);
  pipes.push({
    x: canvas.width,
    height: randomPipeHeight(),
  });
  playAgainDiv.style.display = "none";
  canvas.style.display = "block";
  gameLoop();
}

// Fungsi untuk loop game
function gameLoop() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar burung
  ctx.drawImage(birdImage, 35, birdY - 15, 30, 30);

  // Terapkan gravitasi
  birdVelocity += gravity;
  birdY += birdVelocity;

  // Cek tabrakan dengan tanah atau langit
  if (birdY + 15 > canvas.height || birdY - 15 < 0) {
    endGame();
  }

  // Gambar dan perbarui pipa
  ctx.fillStyle = "green";
  pipes.forEach((pipe, index) => {
    // Pipa atas
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.height);

    // Pipa bawah
    ctx.fillRect(pipe.x, pipe.height + pipeGap, pipeWidth, canvas.height);

    // Gerakkan pipa ke kiri
    pipe.x -= 2;

    // Cek tabrakan dengan pipa
    if (
      50 + 15 > pipe.x &&
      50 - 15 < pipe.x + pipeWidth &&
      (birdY - 15 < pipe.height || birdY + 15 > pipe.height + pipeGap)
    ) {
      endGame();
    }

    // Tambahkan pipa baru dan perbarui skor
    if (pipe.x + pipeWidth < 0) {
      pipes.splice(index, 1);
      pipes.push({
        x: canvas.width,
        height: randomPipeHeight(),
      });
      score++;
    }
  });

  // Gambar skor
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);

  requestAnimationFrame(gameLoop);
}

// Fungsi untuk tinggi pipa acak
function randomPipeHeight() {
  return Math.floor(Math.random() * (canvas.height / 2)) + 50;
}

// Fungsi untuk mengakhiri game
function endGame() {
  console.log("Game Over triggered");
  isGameOver = true;
  canvas.style.display = "none"; // Sembunyikan canvas
  playAgainDiv.style.display = "flex"; // Tampilkan layar Game Over
  finalScoreText.textContent = `Final Score: ${score}`;
}

// Event listener untuk tombol
playAgainButton.addEventListener("click", startGame);

backToMenuButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Kontrol burung
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") birdVelocity = jump;
});

document.addEventListener("click", function () {
  birdVelocity = jump;
});

// Mulai game pertama kali
startGame();
