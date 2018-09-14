var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//probamos que todo funcione:
//ctx.fillRect(0,0,50,50);

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
        if(this.y < 250) this.y += 4;
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
        this.imagen.src = './images/cdmx.jpg'
    }

    gameOver(){
        // // Detenemos la ejecución del intervalo
        // clearInterval(interval);
        // Definimos el tamaño y fuente de nuestro texto
        ctx.font = "40px Avenir";
        // Dibujamos el texto en el canvas.
        ctx.fillText("Ambulancia chocada", 30, 80);
    }
    
    draw(){
       // restamos en x para moverlo
       this.x--;
       // en caso de alcanzar el final de la imagen reseteamos x
       if(this.x < -canvas.width) this.x = 0;
       ctx.drawImage(this.imagen,this.x,this.y,this.width,this.height); 
     // dibujamos una segunda imagen al final de la primera
      ctx.drawImage(this.imagen,this.x + this.width,this.y,this.width,this.height); 
    }
}


class Enemy{
    constructor(){
    //de principio el enemigo aparece fuera del canvas
        this.x = canvas.width;
        //el y del enemigo es el mismo de mario
        this.y = 295;
        this.width = 20;
        this.height = 40;
        this.image = new Image();
        this.image.src = "https://bit.ly/2upxkWp";
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
}, 1000/45)


addEventListener('keydown', function(event){
    if(event.keyCode === 38){
        ambulanciaErum.y -= 80;
    }
})


//*var enemies = [];

function generateEnemies() {
    if(frames % 100 == 0 || frames % 60 == 0 || frames % 170 == 0){
        // creamos una instancia de Enemy y la agregamos aun arreglo
        var enemy = new Enemy
        enemies.push(enemy);
    }
}

function drawingEnemies(){
    enemies.forEach(function(enemy){
        enemy.draw()
        if(ambulanciaErum.collision(enemy)){
            //Ejecutamos el gameOver
            fondo.gameOver(); 
        } 
    }) 
} 