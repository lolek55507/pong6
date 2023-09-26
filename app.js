window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const ball = document.getElementById('ball');
    const canvasWidth = 1000;
    const canvasHeight = 600;
    const playerWidth = 4;
    const playerHeight = 100;
    const ballWidth = 50;
    const ballHeight = 50;
    const heartImage = document.getElementById('heart');
    let ballCoordsY = canvasHeight / 2 ;
    let ballCoordsX = canvasWidth / 2 - 25;
    let leftCoorsY = 300;
    let rightCoorsY = 300;
    let ballMovingState = "toRight";
    let movingBallInterval;
    let ballSpeed = 5;
    let score = 0;
    let health = 3;
    let gameState = "Resumed";
    const playerSpeed = 5;
    window.addEventListener('keydown', (e) => {
        if (e.key === "w" && leftCoorsY > 0) {
            leftCoorsY -= playerSpeed;
            console.log(leftCoorsY);
        } else if (e.key === "s" && leftCoorsY < 500) {
            leftCoorsY += playerSpeed;
            console.log(leftCoorsY);
        }

        if (e.key === "ArrowUp"  && rightCoorsY > 0) {
            rightCoorsY -= playerSpeed;
        } else if (e.key === "ArrowDown" && rightCoorsY < 500) {
            rightCoorsY += playerSpeed;
        }
    })


    function moveTheball () {
        if (ballMovingState === "toLeft") {
            ballCoordsX -= ballSpeed;
            ballSpeed += 0.1;

        }
        if (ballMovingState === "toRight") {
            ballCoordsX += ballSpeed;
            ballSpeed += 0.1;
        }
        if (ballMovingState === "toRightUp") {
            ballCoordsX +=ballSpeed;
            ballCoordsY -=ballSpeed;
            ballSpeed += 0.1;
        }
        if (ballMovingState === "toRightDown") {
            ballCoordsX +=ballSpeed;
            ballCoordsY +=ballSpeed;
            ballSpeed += 0.1;
        } 
        if (ballMovingState === "toLeftDown") {
            ballCoordsX -=ballSpeed;
            ballCoordsY +=ballSpeed;
            ballSpeed += 0.1;
        }
        if (ballMovingState === "toLeftUp") {
            ballCoordsX -=ballSpeed;
            ballCoordsY -=ballSpeed;
            ballSpeed += 0.1;
        }
        collisionChecker();
    }
    function collisionChecker() {
        if (ballCoordsX < 20 + playerWidth && ballCoordsY >= leftCoorsY - ballHeight  && ballCoordsY  < leftCoorsY + (playerHeight * 0.5)) {
            ballMovingState = "toRightDown";
            score++;
        }  else if (ballCoordsX < 20 + playerWidth && ballCoordsY <= leftCoorsY + playerHeight  && ballCoordsY > leftCoorsY + (playerHeight * 0.5) ) {
            ballMovingState = "toRightUp";
            score++;
        }    else if (ballCoordsX + ballWidth > 970 - playerWidth && ballCoordsY >= rightCoorsY - ballHeight  && ballCoordsY  < rightCoorsY + (playerHeight * 0.5)) {
            ballMovingState = "toLeftDown";
            score++;
        } else if (ballCoordsX + ballWidth > 970 - playerWidth && ballCoordsY <= rightCoorsY + playerHeight && ballCoordsY > rightCoorsY + (playerHeight * 0.5) ) {
            ballMovingState = "toLeftUp";
            score++;
        } 




        
        if (ballCoordsX < 0) {
            health--;
            ballCoordsX = canvasWidth / 2 - 25;
            console.log(health);
        } else if (ballCoordsX > canvasWidth) {
            health--;
            ballCoordsX = canvasWidth / 2 - 25;
            console.log(health);
        }   else if (ballCoordsY <= 0 && ballMovingState === "toRightUp") {
            ballMovingState = "toRightDown";
        } else if (ballCoordsY >= canvasHeight - ballHeight && ballMovingState === "toRightDown") {
            ballMovingState = "toRightUp";
        } else if (ballCoordsY <= 0 && ballMovingState === "toLeftUp") {
            ballMovingState = "toLeftDown";
        } else if (ballCoordsY >= canvasHeight - ballHeight && ballMovingState === "toLeftDown") {
            ballMovingState = "toLeftUp";
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Game state Resumed
        if (gameState === "Resumed") {
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Score: ", 10, 40);
            ctx.fillText("Health: ", 10, 70);
            if (health == 3) { 
            ctx.drawImage(heartImage, 110, 48, 30, 30);
            ctx.drawImage(heartImage, 140, 48, 30, 30);
            ctx.drawImage(heartImage, 170, 48, 30, 30);
            }   else if (health == 2) {
            ctx.drawImage(heartImage, 110, 48, 30, 30);
            ctx.drawImage(heartImage, 140, 48, 30, 30);
            }   else if (health == 1) {
                ctx.drawImage(heartImage, 110, 48, 30, 30);
            } else if (health == 0) {
                gameState = "GameOver";
            }
        ctx.fillText(score, 100, 42);
        ctx.fillRect(20, leftCoorsY, playerWidth, playerHeight);
        ctx.fillRect(970, rightCoorsY, playerWidth, playerHeight);
        ctx.fillRect(canvasWidth/2, 50, 1, 500);
        ctx.drawImage(ball, ballCoordsX, ballCoordsY, ballWidth, ballHeight);
        }  
        // Game state GameOver
        else if (gameState === "GameOver") {

        } 
        // Game state Paused
        else if (gameState === "Paused") {

        }
        
        requestAnimationFrame(animate);
    }
    animate();
    movingBallInterval = setInterval(moveTheball, 120);
})