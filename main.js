var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//probamos que todo funcione:
//ctx.fillRect(0,0,50,50);


var answers = [
    {
        question: "¿Cuál es el número de emergencias en México?",
        answer : "911"
    },
    {
        question: "¿Cuál es el órgano mas largo del cuerpo humano?",
        answer: "la piel"
    },
    {
        question: "¿Cuantas compresiones con insuflaciones se debe de dar en RCP?",
        answer: "30x2"
    },
    {
        question: "Cuando sufres una quemadura, hay que mantenerla húmeda, ¿verdadero o falso?",
        answer: "verdadero"
    }
]

class Ambulancia{
    constructor(apellido){
        this.apellido = apellido
        this.imagen1 = new Image()
        this.imagen1.src = './images/ambulance trans azul blanco.png'
        this.imagen2 = new Image()
        this.imagen2.src = './images/ambulance trans rojo blanco.png'
        this.imagen = this.imagen1;
        this.x = 10;
        this.y = 250;
        this.width = 40;
        this.height = 40;
    }


    collision(item){
        return (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
    }

    
    draw(){
        if(frames % 10 === 0){
             this.imagen = this.imagen == this.imagen1 ? this.imagen2 : this.imagen1;
        }
        ctx.drawImage(this.imagen, this.x, this.y, this.width,this.height);
    }
}

class Background{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.imagen = new Image()
        this.imagen.src = './images/cdmx2.jpg';
        this.puntos = 0;
        this.vidas = 3;
    }

    gameOver(){
        // // Detenemos la ejecución del intervalo
        clearInterval(interval);
        // Definimos el tamaño y fuente de nuestro texto
        ctx.font = "20px Arial";
        // Dibujamos el texto en el canvas.
        ctx.fillText("Game Over in your pacient", 90, 80);
    }
    
    draw(){
       // restamos en x para moverlo
       this.x--;
       // en caso de alcanzar el final de la imagen reseteamos x
       if(this.x < -canvas.width) this.x = 0;
       ctx.drawImage(this.imagen,this.x,this.y,this.width,this.height); 
     // dibujamos una segunda imagen al final de la primera
      ctx.drawImage(this.imagen,this.x + this.width,this.y,this.width,this.height);
      ctx.fillText(`Puntos: ${this.puntos}`, 20, 30);
      ctx.fillText(`Vidas: ${this.vidas}`, 400, 30);
    }
}


class Enemy{
    constructor(){
    //de principio el enemigo aparece fuera del canvas
        this.x = canvas.width;
        //el y del enemigo es el mismo de mario
        this.y = 250;
        this.width = 20;
        this.height = 40;
        this.image = new Image();
        this.image.src = "./images/stomach-ache.png";
    }

    draw(){
        //el y del enemigo es el mismo de mario
        if(frames % 10) this.x -= 5;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}



var fondo = new Background();
var ambulanciaErum = new Ambulancia("Erum");

var frames = 0;
var interval = setInterval(function(){
    // sumamos cada cuadro que dibujamos
    frames++
    // borramos el canvas
    ctx.clearRect(0,0,256,256);
    // Dibujamos a mario y el background
    fondo.draw();
    ambulanciaErum.draw();
    // Generamos enemigos
    generateEnemies();
    drawingEnemies();
}, 1000/30)


addEventListener('keydown', function(event){
    if(event.keyCode === 38){
        ambulanciaErum.y -= 20;
    }
    if(event.keyCode === 40){
        ambulanciaErum.y += 20
    }
})


var enemies = [];

function generateEnemies() {
    if(frames % 300 == 0 || frames % 600 == 0 || frames % 170 == 0){
        // creamos una instancia de Enemy y la agregamos aun arreglo
        var enemy = new Enemy
        enemies.push(enemy);
    }
}

function drawingEnemies(){
    enemies.forEach(function(enemy,i){
        enemy.draw()
        if(ambulanciaErum.collision(enemy)){
            enemies.splice(i, 1);
            //Ejecutamos el gameOver
            //fondo.gameOver();
            let index = Math.floor(Math.random() * 4);
            let res = prompt(answers[index].question);
            if(res === answers[index].answer){
                fondo.puntos += 1;
            }else{
                fondo.vidas -= 1;
                if(fondo.vidas < 0) fondo.gameOver();
            }
        } 
    }) 
} 
