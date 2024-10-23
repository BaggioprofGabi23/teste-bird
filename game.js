const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Configurações do jogo
const gravity = 0.25;
let bird = { x: 50, y: 150, width: 20, height: 20, velocity: 0 };

// Função para desenhar o pássaro
function drawBird() {
    context.fillStyle = 'yellow';
    context.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// Função para atualizar a posição do pássaro
function updateBird() {
    bird.velocity += gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height) {
        bird.y = canvas.height - bird.height;
        bird.velocity = 0;
    }
}

// Controle de interação
document.addEventListener('keydown', function (e) {
    if (e.key === ' ') {
        bird.velocity = -6; // Faz o pássaro "pular" com um toque
    }
});

// Função principal do loop do jogo
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    updateBird();
    drawBird();

    requestAnimationFrame(gameLoop);
}

gameLoop();
