createParticle();

function createParticle() {
    requestAnimationFrame(createParticle)

    let id = random(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER).toString(32);
    let xSpeed = random(5, 20);
    let ySpeed = random(15, xSpeed*0.25);
    let yMax = random(50, 110) * -1;
    let color = getRandomFlameColor();

    $('#flames').append(`
<div id="particle-${id}" class="particle-x" style="--x: ${xSpeed};">
    <div class="particle-y" style="--y: ${ySpeed};--max-y: ${yMax}vh;">
        <div class="particle-visual" style="--color: ${color};--time: ${random(5, 30)};"></div>
    </div>
</div>`);

    let delay = (xSpeed > ySpeed ? ySpeed : xSpeed) * 1000;

    setTimeout(() => destroyParticle(id), delay);
}

function destroyParticle(id) {
    $('#particle-' + id).remove();
}

const random = (min, max) => Math.random() * (max - min) + min;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    
    for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    
    return color;
}

function getRandomFlameColor() {
    let R = random(100, 255);
    let G = random(0, 255);
    
    if (R < G) G = 100;
    
    return `rgb(${R}, ${G}, 0)`
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
  }
