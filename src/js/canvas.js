import platform from '../img/platform.png'
import hills from '../img/hills.png'
import background from '../img/background.png'
import platformSmallTall from '../img/platformSmallTall.png'


import platform2 from '../img/platform2.png'
import hills2 from '../img/hills2.png'
import background2 from '../img/background2.png'
import platformSmallTall2 from '../img/platformSmallTall2.png'

import spriteRunLeft from '../img/spriteRunLeft.png'
import spriteRunRight from '../img/spriteRunRight.png'
import spriteStandLeft from '../img/spriteStandLeft.png'
import spriteStandRight from '../img/spriteStandRight.png'

import door from '../img/door.png'
import door2 from '../img/door2.png'

// Mevcut importların yanına ekleyin
import platform3 from '../img/platform3.png'  // Geçici olarak level 1'in platformunu kullan
import hills3 from '../img/hills3.png'
import background3 from '../img/background3.png'
import platformSmallTall3 from '../img/platformSmallTall3.png'
import door3 from '../img/door.png'

import platform4 from '../img/platform4.png'  // Geçici olarak level 2'nin platformunu kullan
import hills4 from '../img/hills4.png'
import background4 from '../img/background4.png'
import platformSmallTall4 from '../img/platformSmallTall4.png'
import door4 from '../img/door2.png'

// Mevcut importların yanına dil resimlerini ekleyelim
import trFlag from '../img/tr.png'
import enFlag from '../img/en.png'
import ruFlag from '../img/ru.png'

// CollisionSystem sınıfını en başa taşıyalım
class CollisionSystem {
    static checkCollision(player, platform) {
        return (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        )
    }

    static handleCollisions(player, platforms) {
        platforms.forEach(platform => {
            if (this.checkCollision(player, platform)) {
                player.velocity.y = 0
                player.isJumping = false
            }
        })
    }
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// Dokunmatik kontroller için event listener'lar
let touchStartX = 0;
const touchThreshold = 50; // Kaydırma eşiği

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Sayfanın kaymasını engelle
    const touchX = e.touches[0].clientX;
    const diffX = touchX - touchStartX;

    // Sağa veya sola kaydırma
    if (Math.abs(diffX) > touchThreshold) {
        if (diffX > 0) {
            keys.right.pressed = true;
            keys.left.pressed = false;
        } else {
            keys.left.pressed = true;
            keys.right.pressed = false;
        }
    }
});

canvas.addEventListener('touchend', () => {
    keys.right.pressed = false;
    keys.left.pressed = false;
});

// Zıplama için ekrana dokunma
canvas.addEventListener('touchstart', (e) => {
    if (!player.isJumping) {
        player.jump();
    }
});

// Sabitleri ayrı bir yerde tanımlayalım
const CANVAS_WIDTH = 1024
const CANVAS_HEIGHT = 576
const GRAVITY = 1.2
const PLAYER_SPEED = 5
const PLAYER_JUMP_FORCE = 25

// Game state yönetimi için
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    GAME_OVER: 'gameOver',
    LEVEL_COMPLETE: 'levelComplete'
}

let currentGameState = GameState.MENU

// Game state tanımlamalarının yanına ekleyin
let currentLevel = 1;  // 2 yerine 1'den başlat

// Game state tanımlamalarının altına dil değişkenini ekleyelim
let currentLanguage = 'en'; // Varsayılan dil İngilizce

// Dil metinlerini tanımlayalım
const gameTexts = {
    en: {
        title: 'Platform Game',
        startText: 'Press SPACE to Start',
        controls: 'Controls:',
        moveLeft: 'A - Move Left',
        moveRight: 'D - Move Right',
        jump: 'W - Jump',
        gameOver: 'GAME OVER',
        levelComplete: 'LEVEL COMPLETE!',
        pressSpace: 'Press SPACE for Level',
        congratulations: 'Congratulations!'
    },
    tr: {
        title: 'Platform Oyunu',
        startText: 'Başlamak için SPACE tuşuna basın',
        controls: 'Kontroller:',
        moveLeft: 'A - Sola Git',
        moveRight: 'D - Sağa Git',
        jump: 'W - Zıpla',
        gameOver: 'OYUN BİTTİ',
        levelComplete: 'BÖLÜM TAMAMLANDI!',
        pressSpace: 'Bölüm için SPACE tuşuna basın',
        congratulations: 'Tebrikler!'
    },
    ru: {
        title: 'Платформер',
        startText: 'Нажмите SPACE чтобы начать',
        controls: 'Управление:',
        moveLeft: 'A - Влево',
        moveRight: 'D - Вправо',
        jump: 'W - Прыжок',
        gameOver: 'ИГРА ОКОНЧЕНА',
        levelComplete: 'УРОВЕНЬ ПРОЙДЕН!',
        pressSpace: 'Нажмите SPACE для уровня',
        congratulations: 'Поздравляем!'
    }
};

// Bayrak resimlerini yükleyelim
const flags = {
    tr: createImage(trFlag),
    en: createImage(enFlag),
    ru: createImage(ruFlag)
};

class Player{
  constructor(){
    this.speed = 5
    this.position = {
      x:100,
      y:100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 66
    this.height = 150

    this.image = createImage(spriteStandRight)
    this.frames = 0
    this.sprites = {
      stand:{
        right: createImage(spriteStandRight),
        left: createImage(spriteStandLeft),
        cropWidth: 177,
        width: 66
      },
      run:{
        right: createImage(spriteRunRight),
        left: createImage(spriteRunLeft),
        cropWidth: 340,
        width: 127.875
      }
    }

    this.currentSprite = this.sprites.stand.right
    this.currentCropWidth = 177

    // Yeni özellikler
    this.isJumping = false
    this.score = 0
    
    // Fizik sabitleri
    this.maxVelocityY = 20
    this.friction = 0.8
  }
  draw() {
  c.drawImage(
    this.currentSprite,
    this.currentCropWidth * this.frames,
    0,
    this.currentCropWidth ,
    400, this.position.x, this.position.y, this.width, this.height)
  }
  update(){
    this.frames++
    
    // Sprite animasyon mantığını ayrı bir metoda taşıyalım
    this.updateAnimation()
    
    // Fizik güncellemelerini yapalım
    this.updatePhysics()
    
    // Sınırları kontrol edelim
    this.checkBoundaries()
    
    this.draw()
  }

  updateAnimation() {
      if (this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
          this.frames = 0
      } else if(this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left))
      this.frames = 0
  }

  updatePhysics() {
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

      // Yerçekimi etkisi
      if (this.position.y + this.height + this.velocity.y <= CANVAS_HEIGHT) {
          this.velocity.y = Math.min(this.velocity.y + GRAVITY, this.maxVelocityY)
      }

      // Sürtünme etkisi
      this.velocity.x *= this.friction
  }

  checkBoundaries() {
      // Ekran sınırlarını kontrol et
      if (this.position.x < 0) this.position.x = 0
  }

  respawn() {
      this.position = { x: 100, y: 100 }
      this.velocity = { x: 0, y: 0 }
      this.isInvulnerable = true
      setTimeout(() => this.isInvulnerable = false, 2000)
  }

  jump() {
      if (!this.isJumping) {
          this.velocity.y = -PLAYER_JUMP_FORCE
          this.isJumping = true
      }
  }

  die() {
      this.lives--; // Canı 1 azalt
      console.log('Lives remaining:', this.lives); // Kalan canı konsola yazdır

      if (this.lives <= 0) {
          console.log('Game Over - No lives remaining');
          currentGameState = GameState.GAME_OVER; // Oyunu bitir
          return;
      }

      // Can hakkı varsa bölümü yeniden başlat
      initialized = false;
      scrollOffset = 0;
      this.position = { x: 100, y: 100 }; // Oyuncuyu başlangıç pozisyonuna getir
      this.velocity = { x: 0, y: 0 }; // Hızı sıfırla
  }
}



class Platform{
  constructor({x, y ,image}){
    this.position = {
      x,
      y 
    }

    this.image = image
    this.width = image.width
    this.height = image.height

    
  }

  
  draw(){
  c.drawImage(this.image, this.position.x, this.position.y)
  }
}





  class GenericObject{
  constructor({x,y,image}){
    this.position = {
      x,
      y 
    }

    this.image = image
    this.width = image.width
    this.height = image.height

    
  }
  draw(){
  c.drawImage(this.image, this.position.x, this.position.y)
  }
}

function createImage(imageSrc) {


const image = new Image()
image.src = imageSrc
return image
}

let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)
let player = new Player()
let platforms = []
let genericObjects = []
let doorImage = createImage(door)
let door2Image = createImage(door2)
let platformImage2 = createImage(platform2)
let platformSmallTallImage2 = createImage(platformSmallTall2)

// Yeni değişkenleri ekleyelim
let door3Image = createImage(door3)
let door4Image = createImage(door4)
let platformImage3 = createImage(platform3)
let platformImage4 = createImage(platform4)
let platformSmallTallImage3 = createImage(platformSmallTall3)
let platformSmallTallImage4 = createImage(platformSmallTall4)

let lastKey

const keys = {
  right: {
    pressed: false 
  },
  left: {
    pressed: false
  }
}

let scrollOffset = 0

function init(){
    player = new Player()
    player.lives = 3; // Canları 3 olarak ayarla

doorImage = createImage(door)

platformImage = createImage(platform)

player = new Player()



platforms = [
  new Platform({ 
  x: platformImage.width * 4 + 300 - 2 + platformImage.width - platformSmallTallImage.width, 
  y: 270,
  image: createImage(platformSmallTall)
  }),
new Platform ({
  x: -1,
  y: 470,
  image : platformImage 
}),
new Platform({ x: platformImage.width - 3, y: 470, image: 
  platformImage }),
new Platform({ 
  x: platformImage.width * 2 + 100, 
  y: 470,
  image: platformImage
    }),
new Platform({ 
  x: platformImage.width * 3 + 200, 
  y: 370,
  image: platformImage
    }),
new Platform({ 
  x: platformImage.width * 4 + 300 - 2, 
  y: 370,
  image: platformImage
    }),
new Platform({ 
  x: platformImage.width * 5 + 490 - 2, 
  y: 370,
  image: platformImage
    }),
new Platform({ 
  x: platformImage.width * 6 + 600 - 2, 
  y: 370,
  image: platformImage
    }),
new Platform({ 
  x: platformImage.width * 7 + 700 - 2, 
  y: 470,
  image: platformImage
    }),
new Platform({ 
  x: platformImage.width * 8 + 900 - 2, 
  y: 370,
  image: platformImage
    }),
new Platform({ 
  x: platformImage.width * 9 + 1000 - 2, 
  y: 270,
  image: platformImage
    }),
new Platform({ 
  x: platformImage.width * 10 + 600 - 2, 
  y: 170,
  image: platformImage
    }),
  new Platform({ 
  x: platformImage.width * 11 + 600 - 2 + platformImage.width - platformSmallTallImage.width, 
  y: 470,
  image: createImage(platformSmallTall)
    }),
  new Platform({ 
  x: platformImage.width * 12 + 433 - 2 + platformImage.width - platformSmallTallImage.width, 
  y: 470,
  image: createImage(platformSmallTall)
    }),
    new Platform({ 
    x: platformImage.width * 13 + 350 - 2 + platformImage.width - platformSmallTallImage.width, 
    y: 370,
    image: createImage(platformSmallTall)
      }),
      new Platform({ 
      x: platformImage.width * 14 + 300- 2 + platformImage.width - platformSmallTallImage.width, 
      y: 370,
      image: createImage(platformSmallTall)
        }),
        new Platform({ 
        x: platformImage.width * 15 + 250- 2 + platformImage.width - platformSmallTallImage.width, 
        y: 270,
        image: createImage(platformSmallTall)
          }),
          new Platform({ 
          x: platformImage.width * 16 + 200- 2 + platformImage.width - platformSmallTallImage.width, 
          y: 170,
          image: createImage(platformSmallTall)
            }),
            new Platform({ 
            x: platformImage.width * 17 + 150- 2 + platformImage.width - platformSmallTallImage.width, 
            y: 170,
            image: createImage(platformSmallTall)
              }),
              new Platform({ 
              x: platformImage.width * 18 + 300 - 2, 
              y: 370,
              image: platformImage
                }),
              



]

genericObjects = [
new GenericObject({
  x: -1,
  y: -1,
  image : createImage(background)
}),
new GenericObject({
  x: -1,
  y: -1,
  image : createImage(hills)
}),
new GenericObject({
  x: 7400,
  y: 180,
  image : createImage(door)
}),

]

scrollOffset = 0
}

function init2() {
  player = new Player()
  player.lives = 3; // Canları 3 olarak ayarla
  
  // Kapı görüntüsünün yüklendiğini kontrol et
  console.log("Door2 Image:", door2Image)
  
  platforms = [
      // Başlangıç platformları
      new Platform({
          x: -1,
          y: 470,
          image: platformImage2
      }),
      new Platform({
          x: platformImage2.width - 3,
          y: 470,
          image: platformImage2
      }),
      // Level 1'e benzer platform yerleşimi
      new Platform({
          x: platformImage2.width * 2 + 100,
          y: 470,
          image: platformImage2
      }),
      new Platform({
          x: platformImage2.width * 3 + 300,
          y: 470,
          image: platformImage2
      }),
      // Yükselen platformlar
      new Platform({
          x: platformImage2.width * 4 + 500,
          y: 370,
          image: platformImage2
      }),
      new Platform({
          x: platformImage2.width * 5 + 700,
          y: 370,
          image: platformImage2
      }),
      // Küçük platformlar
      new Platform({
          x: platformImage2.width * 6 + 900,
          y: 270,
          image: platformSmallTallImage2
      }),
      new Platform({
          x: platformImage2.width * 7 + 900,
          y: 290,
          image: platformSmallTallImage2
      }),
      // Alçalan platformlar
      new Platform({
          x: platformImage2.width * 8 + 900,
          y: 370,
          image: platformImage2
      }),
      new Platform({
          x: platformImage2.width * 9 + 1240,
          y: 470,
          image: platformImage2
      }),
      // Son platformlar
      new Platform({
          x: platformImage2.width * 10 + 1370,
          y: 400,
          image: platformImage2
      }),
      new Platform({
          x: platformImage2.width * 11 + 1500,
          y: 350,
          image: platformImage2
      }),
      // Kapıyı platform olarak da ekle
      new Platform({
          x: 8200,
          y: 150,
          image: door2Image
      })
  ]

  genericObjects = [
      new GenericObject({
          x: -1,
          y: -1,
          image: createImage(background2)
      }),
      new GenericObject({
          x: -1,
          y: -1,
          image: createImage(hills2)
      }),
      new GenericObject({
          x: 8200,
          y: 200,
          image: door2Image
      })
  ]

  // Kapının pozisyonunu kontrol et
  console.log("Door X position:", genericObjects[2].position.x)
  console.log("Door Y position:", genericObjects[2].position.y)

  scrollOffset = 0
}
function init3() {
    player = new Player()
    player.lives = 3; // Canları 3 olarak ayarla
    
    // Kapı görüntüsünün yüklendiğini kontrol et
    console.log("Door3 Image:", door3Image)

    platforms = [
        // Başlangıç platformları
        new Platform({
            x: -1,
            y: 470,
            image: platformImage3
        }),
        new Platform({
            x: platformImage3.width - 3,
            y: 470,
            image: platformImage3
        }),
        // Ana platformlar serisi
        new Platform({
            x: platformImage3.width * 2 + 100,
            y: 470,
            image: platformImage3
        }),
        new Platform({
            x: platformImage3.width * 3 + 300,
            y: 400,
            image: platformImage3
        }),
        // Yükselen platformlar (mini platformlar)
        new Platform({
            x: platformImage3.width * 4 + 500,
            y: 320,
            image: platformSmallTallImage3
        }),
        new Platform({
            x: platformImage3.width * 5 + 500,
            y: 240,
            image: platformSmallTallImage3
        }),
        // Orta seviyeli platformlar
        new Platform({
            x: platformImage3.width * 6 + 500,
            y: 300,
            image: platformImage3
        }),
        new Platform({
            x: platformImage3.width * 7 + 600,
            y: 250,
            image: platformImage3
        }),
        new Platform({
            x: platformImage3.width * 8 + 700,
            y: 350,
            image: platformImage3
        }),
        // Mini platformlar (zıplama gerektiren)
        new Platform({
            x: platformImage3.width * 9 + 800,
            y: 200,
            image: platformSmallTallImage3
        }),
        new Platform({
            x: platformImage3.width * 10 + 800,
            y: 150,
            image: platformSmallTallImage3
        }),
        // Büyük platform geçişleri
        new Platform({
            x: platformImage3.width * 11 + 850,
            y: 270,
            image: platformImage3
        }),
        new Platform({
            x: platformImage3.width * 12 + 900,
            y: 370,
            image: platformImage3
        }),
        new Platform({
            x: platformImage3.width * 13 + 2100,
            y: 400,
            image: platformImage3
        }),
        new Platform({
            x: platformImage3.width * 14 + 2300,
            y: 470,
            image: platformImage3
        }),
        // Daha fazla zıplama gerektiren mini platformlar
        new Platform({
            x: platformImage3.width * 15 + 2500,
            y: 270,
            image: platformSmallTallImage3
        }),
        new Platform({
            x: platformImage3.width * 16 + 2700,
            y: 150,
            image: platformSmallTallImage3
        }),
        // Son platformlar (Kapıya yaklaşıyoruz)
        new Platform({
            x: platformImage3.width * 17 + 2900,
            y: 100,
            image: platformImage3
        }),
        new Platform({
            x: platformImage3.width * 18 + 3100,
            y: 150,
            image: platformImage3
        }),
        // Kapıyı platform olarak da ekle
        new Platform({
            x: 8230,
            y: 180,
            image: door3Image
        })
    ]

    genericObjects = [
        new GenericObject({
            x: -1,
            y: -1,
            image: createImage(background3)
        }),
        new GenericObject({
            x: -1,
            y: -1,
            image: createImage(hills3)
        }),
        // Kapıyı x: 8250 konumuna yerleştiriyoruz
        new GenericObject({
            x: 8250,
            y: 200,
            image: door3Image
        })
    ]

    // Kapının pozisyonunu kontrol et
    console.log("Door X position:", genericObjects[2].position.x)
    console.log("Door Y position:", genericObjects[2].position.y)

    scrollOffset = 0
}

function init4() {
    player = new Player()
    player.lives = 3; // Canları 3 olarak ayarla
    
    // Kapı görüntüsünün yüklendiğini kontrol et
    console.log("Door4 Image:", door4Image)

    platforms = [
        // Başlangıç platformları
        new Platform({
            x: -1,
            y: 470,
            image: platformImage4
        }),
        new Platform({
            x: platformImage4.width - 3,
            y: 470,
            image: platformImage4
        }),
        // Ana platformlar serisi
        new Platform({
            x: platformImage4.width * 2 + 100,
            y: 470,
            image: platformImage4
        }),
        new Platform({
            x: platformImage4.width * 3 + 300,
            y: 400,
            image: platformImage4
        }),
        // Yükselen platformlar
        new Platform({
            x: platformImage4.width * 4 + 400,
            y: 350,
            image: platformImage4
        }),
        new Platform({
            x: platformImage4.width * 5 + 500,
            y: 300,
            image: platformImage4
        }),
        // Küçük platformlar
        new Platform({
            x: platformImage4.width * 6 + 630,
            y: 250,
            image: platformSmallTallImage4
        }),
        new Platform({
            x: platformImage4.width * 7 + 630,
            y: 200,
            image: platformSmallTallImage4
        }),
        // Son platformlar
        new Platform({
            x: platformImage4.width * 8 + 630,
            y: 300,
            image: platformImage4
        }),
        new Platform({
            x: platformImage4.width * 9 + 690,
            y: 350,
            image: platformImage4
        }),
        // Kapıyı platform olarak da ekle
        new Platform({
            x: 6240,
            y: 150,
            image: door4Image
        })
    ]

    genericObjects = [
        new GenericObject({
            x: -1,
            y: -1,
            image: createImage(background4)
        }),
        new GenericObject({
            x: -1,
            y: -1,
            image: createImage(hills4)
        }),
        new GenericObject({
            x: 6300,
            y: 200,
            image: door4Image
        })
    ]

    // Kapının pozisyonunu kontrol et
    console.log("Door X position:", genericObjects[2].position.x)
    console.log("Door Y position:", genericObjects[2].position.y)

    scrollOffset = 0
}

// Konfeti parçacıkları için bir dizi
let confetti = [];

// Konfeti parçacığı sınıfı
class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.size = Math.random() * 10 + 5;
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * 360;
        this.rotation = Math.random() * 5 - 2.5;
        this.color = ["#ff0", "#f00", "#0f0", "#00f", "#f0f", "#0ff", "#ffa500"][Math.floor(Math.random() * 7)];
        this.opacity = 1;
    }

    update() {
        this.y += this.speed;
        this.angle += this.rotation;
        this.opacity = Math.max(0, this.opacity - 0.02);
        return this.opacity > 0;
    }

    draw() {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.angle * Math.PI / 180);
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        c.restore();
    }
}

function createConfetti() {
    // 50 adet konfeti parçacığı oluştur
    for (let i = 0; i < 50; i++) {
        confetti.push(new ConfettiParticle());
    }
}

// En başta init() yerine init2() çağıralım
let initialized = false;
function gameLoop() {
    requestAnimationFrame(gameLoop)

    switch (currentGameState) {
        case GameState.MENU:
            showMenu()
            break
        case GameState.PLAYING:
            // Her level için doğru init fonksiyonunu çağır
            if (!initialized) {
                switch(currentLevel) {
                    case 1:
                        init()
                        break
                    case 2:
                        init2()
                        break
                    case 3:
                        init3()
                        break
                    case 4:
                        init4()
                        break
                }
                initialized = true
                console.log(`Level ${currentLevel} initialized`)
            }
            updateGame()
            break
        case GameState.GAME_OVER:
            showGameOver()
            break
        case GameState.LEVEL_COMPLETE:
            showLevelComplete()
            break
    }
}

function updateGame() {
  // Clear canvas
  c.fillStyle = 'white'
  c.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  // Update and draw background
  genericObjects.forEach(obj => obj.draw())
  
  // Update and draw platforms
  platforms.forEach(platform => platform.draw())
  
  // Update player
  player.update()
  
  // Handle collisions
  CollisionSystem.handleCollisions(player, platforms)
  
  // Handle camera movement
  updateCamera()
  
  // Check win/lose conditions
  checkGameConditions()
  
  // Update UI
  drawUI()

  // Konfetileri güncelle ve çiz
  if (confetti.length > 0) {
      confetti = confetti.filter(particle => {
          const isAlive = particle.update();
          if (isAlive) {
              particle.draw();
          }
          return isAlive;
      });
  }
}

function updateCamera() {
  if (keys.right.pressed && player.position.x < 400) {
      player.velocity.x = PLAYER_SPEED
  } else if (keys.left.pressed && player.position.x > 100 || 
            keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
      player.velocity.x = -PLAYER_SPEED
  } else {
      player.velocity.x = 0
      handleParallaxScrolling()
  }
}

function drawUI() {
  c.fillStyle = 'white'
  c.font = '20px Arial'
  
  // Sadece oyuncunun pozisyonunu göster (sağ üst köşede)
  c.textAlign = 'right'
  const totalX = Math.round(player.position.x + scrollOffset)
  const totalY = Math.round(player.position.y)
  c.fillText(`X: ${totalX} Y: ${totalY}`, canvas.width - 20, 30)
}

function checkGameConditions() {
    // Oyuncu düştüğünde (y seviyesi canvas.height'den büyükse)
    if (player.position.y > canvas.height) {
        // 1. level'dan başlat
        currentLevel = 1;
        initialized = false;
        scrollOffset = 0;
        player.position = { x: 100, y: 100 };
        player.velocity = { x: 0, y: 0 };
        return;
    }
    
    // Level tamamlama koşulları
    const totalX = Math.round(player.position.x + scrollOffset);
    console.log(`Level ${currentLevel} - Position: ${totalX}`);
    
    let levelCompletePosition;
    switch(currentLevel) {
        case 1:
            levelCompletePosition = 11200;
            break;
        case 2:
            levelCompletePosition = 8300;
            break;
        case 3:
            levelCompletePosition = 8350;
            break;
        case 4:
            levelCompletePosition = 6300;
            break;
    }
    
    if (totalX >= levelCompletePosition) {
        console.log(`Level ${currentLevel} Complete! Position: ${totalX}`);
        currentGameState = GameState.LEVEL_COMPLETE;
    }
}

function handleParallaxScrolling() {
  if (keys.right.pressed) {
      scrollOffset += PLAYER_SPEED
      platforms.forEach(platform => {
          platform.position.x -= PLAYER_SPEED
      })
      genericObjects.forEach(obj => {
          obj.position.x -= PLAYER_SPEED * 0.66
      })
  } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= PLAYER_SPEED
      platforms.forEach(platform => {
          platform.position.x += PLAYER_SPEED
      })
      genericObjects.forEach(obj => {
          obj.position.x += PLAYER_SPEED * 0.66
      })
  }
}

function showGameOver() {
    // Mevcut event listener'ı temizle
    if (window.gameOverListener) {
        document.removeEventListener('keydown', window.gameOverListener);
    }

    c.fillStyle = 'rgba(0, 0, 0, 0.7)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.fillStyle = 'white';
    c.font = '48px Arial';
    c.textAlign = 'center';
    
    if (currentLevel > 4) {
        c.fillText(gameTexts[currentLanguage].congratulations, canvas.width / 2, canvas.height / 2 - 40);
        c.font = '24px Arial';
        c.fillText(gameTexts[currentLanguage].levelComplete, canvas.width / 2, canvas.height / 2 + 10);
    } else {
        c.fillText(gameTexts[currentLanguage].gameOver, canvas.width / 2, canvas.height / 2);
    }
    
    c.font = '24px Arial';
    c.fillText(gameTexts[currentLanguage].startText, canvas.width / 2, canvas.height / 2 + 40);

    function handleRestart(event) {
        if (event.code === 'Space') {
            document.removeEventListener('keydown', handleRestart);
            window.gameOverListener = null;
            currentGameState = GameState.PLAYING;
            currentLevel = 1;
            initialized = false;
        }
    }

    window.gameOverListener = handleRestart;
    document.addEventListener('keydown', handleRestart);
}

function showLevelComplete() {
    // Mevcut event listener'ı temizle
    if (window.levelCompleteListener) {
        document.removeEventListener('keydown', window.levelCompleteListener);
    }

    // Siyah arkaplan
    c.fillStyle = 'rgba(0, 0, 0, 0.85)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    // Konfetileri güncelle ve çiz
    if (currentLevel === 4) {
        if (confetti.length === 0) {
            createConfetti();
        }
        confetti = confetti.filter(particle => {
            const isAlive = particle.update();
            if (isAlive) {
                particle.draw();
            }
            return isAlive;
        });
        
        // Konfetiler bittiğinde yeniden oluştur
        if (confetti.length === 0) {
            createConfetti();
        }
    }
    
    // Tebrik mesajları
    c.fillStyle = 'white';
    c.font = '48px Arial';
    c.textAlign = 'center';
    c.fillText(gameTexts[currentLanguage].levelComplete, canvas.width / 2, canvas.height / 2);
    
    c.font = '24px Arial';
    if (currentLevel === 4) {
        c.fillText(gameTexts[currentLanguage].congratulations, canvas.width / 2, canvas.height / 2 + 40);
        c.font = '20px Arial';
        c.fillText(gameTexts[currentLanguage].startText, canvas.width / 2, canvas.height / 2 + 80);
    } else {
        c.fillText(gameTexts[currentLanguage].pressSpace + ' ' + (currentLevel + 1), canvas.width / 2, canvas.height / 2 + 40);
    }

    function handleNextLevel(event) {
        if (event.code === 'Space') {
            document.removeEventListener('keydown', handleNextLevel);
            window.levelCompleteListener = null;
            confetti = []; // Konfetileri temizle
            
            if (currentLevel < 4) {
                currentLevel++;
                console.log('Starting Level:', currentLevel);
                currentGameState = GameState.PLAYING;
                initialized = false;
            } else {
                // Oyun bitti, başa dön
                currentLevel = 1;
                currentGameState = GameState.MENU;
                initialized = false;
            }
        }
    }

    window.levelCompleteListener = handleNextLevel;
    document.addEventListener('keydown', handleNextLevel);
}

function showMenu() {
    c.fillStyle = 'rgba(0, 0, 0, 0.85)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    c.fillStyle = 'white'
    c.font = '64px Arial'
    c.textAlign = 'center'
    c.fillText(gameTexts[currentLanguage].title, canvas.width / 2, canvas.height / 3)
    
    c.font = '32px Arial'
    c.fillText(gameTexts[currentLanguage].startText, canvas.width / 2, canvas.height / 2)
    
    // Kontrolleri göster
    c.font = '20px Arial'
    c.fillText(gameTexts[currentLanguage].controls, canvas.width / 2, canvas.height - 160)
    c.fillText(gameTexts[currentLanguage].moveLeft, canvas.width / 2, canvas.height - 120)
    c.fillText(gameTexts[currentLanguage].moveRight, canvas.width / 2, canvas.height - 90)
    c.fillText(gameTexts[currentLanguage].jump, canvas.width / 2, canvas.height - 60)

    // Dil bayraklarını çiz
    const flagWidth = 50;
    const flagHeight = 30;
    const flagSpacing = 20;
    const startX = canvas.width / 2 - (flagWidth * 3 + flagSpacing * 2) / 2;
    const flagY = 50;

    // TR bayrağı
    c.drawImage(flags.tr, startX, flagY, flagWidth, flagHeight);
    // EN bayrağı
    c.drawImage(flags.en, startX + flagWidth + flagSpacing, flagY, flagWidth, flagHeight);
    // RU bayrağı
    c.drawImage(flags.ru, startX + (flagWidth + flagSpacing) * 2, flagY, flagWidth, flagHeight);
}

addEventListener('keydown', ({keyCode}) => {
    //console.log(keyCode)
  switch(keyCode){
    case 65:
    console.log('left')
    keys.left.pressed = true
    lastKey = 'left'

    break

    case 83:
    console.log('down')
    break

    case 68:
    console.log('right')
    keys.right.pressed = true
    lastKey = 'right'
    break

    case 87:
    console.log('up')
    if (!player.isJumping) {
        player.jump()
    }
    break

  }

})

addEventListener('keyup', ({keyCode}) => {
  //console.log(keyCode)
  switch(keyCode){
    case 65:
    console.log('left')
    keys.left.pressed = false
    break

    case 83:
    console.log('down')
    break

    case 68:
    console.log('right')
    keys.right.pressed = false

    break

    case 87:
    console.log('up')
    break

  }
  //console.log(keys.right.pressed)
})

addEventListener('keydown', ({code}) => {
    if (code === 'Space' && currentGameState === GameState.MENU) {
        currentGameState = GameState.PLAYING
        init()  // Oyunu başlat
    }
})

// Bayraklara tıklama kontrolü için event listener ekleyelim
canvas.addEventListener('click', (event) => {
    if (currentGameState === GameState.MENU) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const flagWidth = 50;
        const flagHeight = 30;
        const flagSpacing = 20;
        const startX = canvas.width / 2 - (flagWidth * 3 + flagSpacing * 2) / 2;
        const flagY = 50;

        // TR bayrağına tıklandı mı?
        if (x >= startX && x <= startX + flagWidth &&
            y >= flagY && y <= flagY + flagHeight) {
            currentLanguage = 'tr';
        }
        // EN bayrağına tıklandı mı?
        else if (x >= startX + flagWidth + flagSpacing && x <= startX + flagWidth * 2 + flagSpacing &&
                 y >= flagY && y <= flagY + flagHeight) {
            currentLanguage = 'en';
        }
        // RU bayrağına tıklandı mı?
        else if (x >= startX + (flagWidth + flagSpacing) * 2 && x <= startX + flagWidth * 3 + flagSpacing * 2 &&
                 y >= flagY && y <= flagY + flagHeight) {
            currentLanguage = 'ru';
        }
    }
});

gameLoop()