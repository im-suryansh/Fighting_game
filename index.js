const canvas= document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width= 1024
canvas.height=576

c.fillRect(0,0,canvas.width,canvas.height);

const gravity= 0.7

const background= new Sprite({
    postition:{
        x:0,
        y:0
    },
    imageSrc:'./image/backgroundq.png'
})
const shop= new Sprite({
    postition:{
        x:600,
        y:128
    },
    imageSrc:'./image/shop.png',
    scale:2.75,
    framesmax:6

})
let player = new Fighter({
    postition:{
    x:0,
    y:0
    },
    velocity:{
       x:0,
       y:0
    },
    offset: {
        x: 0,
        y: 0
      },
    
    imageSrc:'./char/Fantasy Warrior/idle.png',
    framesmax:10,
    scale:2.5,
    offset:{
        x:150,
        y:99
    },
    sprites: {
        
        idle:{
        imageSrc: './char/Fantasy Warrior/idle.png',
          framesmax: 10
        },
        run: {
          imageSrc: './char/Fantasy Warrior/run.png',
          framesmax: 8
        },
        jump: {
            imageSrc: './char/Fantasy Warrior/Jump.png',
            framesmax: 3
          },
        fall: {
            imageSrc: './char/Fantasy Warrior/Fall.png',
            framesmax: 3
          },
        attack:{
            imageSrc:'./char/Fantasy Warrior/Attack3.png',
            framesmax: 8 
        },
        hit:{
          imageSrc:'./char/Fantasy Warrior/Take hit.png',
          framesmax:3

        },
         death:{
          imageSrc:'./char/Fantasy Warrior/Death.png',
          framesmax:7
        }
    },
    attackbox:{
      offset:{
        x:100,
        y:50
      },
      width:135,
      height:50
      }  }

)


const enemy = new Fighter({
    postition:{
    x:400,
    y:100
    },
    velocity:{
       x:0,
       y:0 
    },
    color:'blue',
    offset:{
        x:0,
        y:0
    },
    
    imageSrc:'./char/evil/idle.png',
    framesmax:8,
    scale:2.1,
    offset:{
        x:200,
        y:195
    },
    sprites: {
        
        idle:{
        imageSrc: './char/evil/idle.png',
          framesmax: 8
        },
        run: {
          imageSrc: './char/evil/run.png',
          framesmax: 8
        },
        jump: {
            imageSrc: './char/evil/Jump.png',
            framesmax: 2
          },
        fall: {
            imageSrc: './char/evil/Fall.png',
            framesmax: 2
          },
        attack:{
            imageSrc:'./char/evil/Attack2.png',
            framesmax: 8
        },
        hit:{
          imageSrc:'./char/evil/Take hit.png',
          framesmax:3

        },
        death:{
          imageSrc:'./char/evil/Death.png',
          framesmax:7
    }
  },
    attackbox:{
      offset:{
        x:-195,
        y:50
      },
      width:125,
      height:50
    }
    
    
  })


// enemy.draw()
// player.draw()
// console.log(player)
const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    ArrowRight: {
      pressed: false
    },
    ArrowLeft: {
      pressed: false
    }
  }
  

    timer()
function animate(){
   
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    enemy.velocity.x=0
    player.velocity.x=0
//player movement

    if(keys.a.pressed && player.lastkey==='a'){
        player.velocity.x=-5
        player.switchsprite('run')
    }
    else if(keys.d.pressed && player.lastkey==='d'){
        player.velocity.x=5
        player.switchsprite('run')
    }
        else {
            player.switchsprite('idle')
          }
    
    if (player.velocity.y < 0) {
        player.switchsprite('jump')

      } else if (player.velocity.y > 0) {
        player.switchsprite('fall')
      }
//enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastkey==='ArrowLeft'){
        enemy.velocity.x=-5
        enemy.switchsprite('run')
    }
    else if(keys.ArrowRight.pressed && enemy.lastkey==='ArrowRight'){
        enemy.velocity.x=5
        enemy.switchsprite('run')
    }
    else{
      enemy.switchsprite('idle')
    
    }
    if (enemy.velocity.y < 0) {
      enemy.switchsprite('jump')

    } else if (enemy.velocity.y > 0) {
      enemy.switchsprite('fall')
    }

//attack collisons
if(
    rectanglecollision({rect1:player,
    rect2:enemy})
     &&
     player.isAttacking   && player.currframe===4
    ){
    enemy.hit()
    player.isAttacking=false
    
    // document.querySelector('#enemyhealth').style.width=enemy.health+'%'
    gsap.to('#enemyhealth', {
      width: enemy.health + '%'
    })
}
if(player.isAttacking && player.currframe===4)
{
  player.isAttacking=false
}

if(
    rectanglecollision({rect1:enemy,
    rect2:player})
     &&
     enemy.isAttacking && enemy.currframe===4
    ){
      player.hit()
    enemy.isAttacking=false
    
    // document.querySelector('#playerhealth').style.width=player.health+'%'
    gsap.to('#playerhealth', {
      width: player.health + '%'
    })
}
if(enemy.isAttacking && enemy.currframe===4)
{
  enemy.isAttacking=false

}

if (player.health<=0 || enemy.health<=0) {
    winner({player,enemy, timerid})    
}

}
animate()

window.addEventListener('keydown',(event)=>{
  if (!player.dead) {
  switch (event.key){
        case 'd':
            keys.d.pressed=true
            player.lastkey ='d'
            break
    
        case 'a':
            keys.a.pressed=true
            player.lastkey ='a'
            break
    
        case 'w':
            player.velocity.y=-20
            break

        case ' ':

         player.attack()
            
        
            break
    }
  }
    if (!enemy.dead) {
        switch (event.key){

        case 'ArrowRight':
            keys.ArrowRight.pressed=true
           enemy.lastkey ='ArrowRight'
            break
   
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true
            enemy.lastkey ='ArrowLeft'
            break
    
        case 'ArrowUp':
            enemy.velocity.y=-20
            break

            case 'ArrowDown':
                enemy.attack()
                break
    }}
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
    }
  
    // enemy keys
    switch (event.key) {
    
      case 'ArrowRight':
        console.log('tesit')
        keys.ArrowRight.pressed = false
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
  })