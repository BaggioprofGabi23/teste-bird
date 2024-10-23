const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Configurações do jogo
const gravity = 0.25;
let bird = { x: 50, y: 150, width: 20, height: 20, velocity: 0 };
let pipes = [];
let score = 0;
let gameRunning = true;

// Função para desenhar o pássaro
function drawBird() {
    context.fillStyle = 'yellow';
    context.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// Função para atualizar a posição do pássaro
function updateBird() {
    bird.velocity += gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height >= canvas.height) {
        gameOver();
    }
}

// Função para desenhar os canos
function drawPipes() {
    pipes.forEach(pipe => {
        context.fillStyle = 'green';
        context.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
        context.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipe.width, pipe.bottomHeight);
    });
}

// Função para gerar novos canos
function generatePipes() {
    let pipeWidth = 30;
    let gap = 120;
    let topHeight = Math.floor(Math.random() * (canvas.height / 2)) + 20;
    let bottomHeight = canvas.height - topHeight - gap;

    pipes.push({
        x: canvas.width,
        width: pipeWidth,
        topHeight: topHeight,
        bottomHeight: bottomHeight
    });
}

// Função para mover os canos
function updatePipes() {
    pipes.forEach((pipe, index) => {
        pipe.x -= 2;

        // Remover o cano quando sair da tela
        if (pipe.x + pipe.width <= 0) {
            pipes.splice(index, 1);
            score++;
        }

        // Detecção de colisão
        if (
            bird.x + bird.width > pipe.x && bird.x < pipe.x + pipe.width &&
            (bird.y < pipe.topHeight || bird.y + bird.height > canvas.height - pipe.bottomHeight)
        ) {
            gameOver();
        }
    });
}

// Função para desenhar a pontuação
function drawScore() {
    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText('Score: ' + score, 10, 30);
}

// Função para terminar o jogo
function gameOver() {
    gameRunning = false;
    context.fillStyle = 'red';
    context.font = '30px Arial';
    context.fillText('Game Over!', canvas.width / 2 - 80, canvas.height / 2);
    setTimeout(() => {
        resetGame();
    }, 2000);
}

// Reiniciar o jogo
function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameRunning = true;
}

// Controle de interação
document.addEventListener('keydown', function (e) {
    if (e.key === ' ' && gameRunning) {
        bird.velocity = -6; // Faz o pássaro "pular"
    }
});

// Função principal do loop do jogo
function gameLoop() {
    if (gameRunning) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        updateBird();
        updatePipes();

        drawBird();
        drawPipes();
        drawScore();

        // Gera canos a cada 100 frames
        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 150) {
            generatePipes();
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
