let canvas = document.getElementById("cobra");
let context = canvas.getContext("2d");
let box = 32;

//O(1)
let cobra = [];
cobra[0] = 
{
    x: 8 * box,
    y: 8 * box
}

//O(1)
let direction = "right";

//O(1)
let comida =
{
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//O(1)
function criarBG()
{
    context.fillStyle = "#170429";
    context.fillRect(0, 0 , 16 * box, 16 * box);
}

//O(n) | n = i
function criarCobra()
{
    for(i=0; i < cobra.length; i++)
    {
        context.fillStyle = "#5b9f02";
        context.fillRect(cobra[i].x, cobra[i].y, box, box);
    }
}

//O(1)
function criarComida()
{
    context.fillStyle = "#dddd00";
    context.fillRect(comida.x, comida.y, box, box);
}

alert("Alertas são chatos, eu sei disso.\nTUTORIAL:\nUse as setas para mover a cobra(verde)\nPegue a comida(amarelo)\nEvite bater a cabeça contra o próprio corpo, isso dói..\n\nAlerts are annoying, I know that.\nTUTORIAL:\nUse the arrow keys to move the snake(green)\nTake the food(yellow)\nAvoid hitting your head against your own body, it hurts.");
document.addEventListener('keydown', atualizar);

//O(4)
function atualizar(event)
{
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

//O(n) | n = i
function iniciarJogo()
{
    //O(2)
    if(cobra[0].x > 15 * box && direction != "left") 
    {
        cobra[0].x = 0;
    }
    else if(cobra[0].x < 0  && direction != "right")
    {
        cobra[0].x = 15 * box;
    }

    //O(2)
    if(cobra[0].y > 15 * box && direction != "up") 
    {
        cobra[0].y = 0;
    }
    else if(cobra[0].y < 0  && direction != "down")
    {
        cobra[0].y = 15 * box;
    }

    //O(n)| n = i
    for (i =1; i < cobra.length; i++)
    {
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y)
        {
            clearInterval(jogo);
            alert("Fim de jogo!\nYou Lose!");
        }
    }
    
    criarBG();
    criarCobra();
    criarComida();

    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    //O(4)
    if(direction == "right") cobraX += box;
    if(direction == "left") cobraX -= box;
    if (direction == "up") cobraY -= box;
    if(direction == "down") cobraY += box;

    //O(1)
    if(cobraX != comida.x || cobraY != comida.y)
        {
            cobra.pop();
        }
        else
        {
            comida.x = Math.floor(Math.random() * 15 +1) * box;
            comida.y = Math.floor(Math.random() * 15 +1) * box;
        }
    //O(1)
    let newHead = 
    {
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
