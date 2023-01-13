class Random {
    static shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        
        return array;
    }

    static getRandomFlameColor() {
        let R = Random.getRandomInt(100, 255);
        let G = Random.getRandomInt(0, 255);
        
        if (R < G) G = 100;
        
        return `rgb(${R}, ${G}, 0)`
    }

    static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        
        for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
        
        return color;
    }

    static getRandomInt(min, max) {
        return Math.random() * (max - min) + min;
    }
}

class ParticleSystem {
    particleLimit = 1000;
    particles = new Map();

    constructor(particleLimit = 1000) {
        this.particleLimit = particleLimit;
    }

    /**
     * @param {ParticleSystem} system 
     * @param {Particle} particle 
     */
    static createParticle(system, particle) {
        if (system.particles.size < system.particleLimit) {
            system.particles.set(particle.id, particle);
            $('#flames').append(`<div id="particle-${particle.id}" class="particle-x" style="--x: ${particle.xSpeed};"><div class="particle-y" style="--y: ${particle.ySpeed};--max-y: ${particle.yMax}vh;"><div class="particle-visual" style="--color: ${particle.color};--time: ${particle.time};"></div></div></div>`);
        }

        setTimeout(() => ParticleSystem.destroyParticle(system, particle), particle.delay);
    }

    static destroyParticle(system, particle) {
        system.particles.delete(particle.id);
        $('#particle-' + particle.id).remove();
    }

    static createFlameParticle(system) {
        const x = Random.getRandomInt(5, 20);
        const y = Random.getRandomInt(15, x * 0.25);
        const particle = new Particle(x, y, Random.getRandomInt(50, 110) * -1, Random.getRandomFlameColor(), Random.getRandomInt(5, 30), (x > y ? y : x) * 1000);

        ParticleSystem.createParticle(system, particle);
        requestAnimationFrame(() => ParticleSystem.createFlameParticle(system));
    }
}

class Particle {
    id = Random.getRandomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER).toString(32);
    xSpeed = 0;
    ySpeed = 0;
    yMax = 0;
    color = 'white';
    time = 0;
    delay = 0;

    constructor(xSpeed = 0, ySpeed = 0, yMax = 0, color = 'white', time = 0, delay = 0) {
        this.id = Random.getRandomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER).toString(32);
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.yMax = yMax;
        this.color = color;
        this.time = time;
        this.delay = delay;
    }
}

const obj = new ParticleSystem();

ParticleSystem.createFlameParticle(obj);