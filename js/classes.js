class Sprite {
    constructor({postition,imageSrc,scale=1,framesmax=1,offset={x:0,y:0}}){
        this.postition= postition
        this.width=50
        this.height=150
        this.image=new Image()
        this.image.src=imageSrc
        this.scale=scale
        this.framesmax=framesmax
        this.currframe=0
        this.framesdone=0
        this.frameshold=5
        this.offset=offset
    }

    draw(){
        c.drawImage(
            this.image,
            this.currframe*(this.image.width/this.framesmax),
            0,
            this.image.width /this.framesmax,
            this.image.height,
             this.postition.x -this.offset.x,
              this.postition.y-this.offset.y,
              (this.image.width/this.framesmax) * this.scale,
              this.image.height * this.scale
              )
    }
    
    animateframes() {
        this.framesdone++
    
        if (this.framesdone % this.frameshold === 0) {
          if (this.currframe < this.framesmax - 1) {
            this.currframe++
          } else {
            this.currframe = 0
          }
        }
      }
    


    update(){
        this.draw() 
        this.animateframes()
    }
}
   



class Fighter extends Sprite{
    constructor({postition,
        velocity,
        sprites,
        color='red'
        ,imageSrc,
        scale=1,
        framesmax=1,
        offset={x:0,y:0},
        attackbox ={offset:{},width:undefined,height:undefined}
        
    }
        
        
        ){
        super({
                postition,
                imageSrc,
                scale,
                framesmax,
                offset, 
        })
        // this.postition= postition
        this.velocity=velocity
        this.width=50
        this.height=150
        this.lastkey
        this.currframe=0
        this.framesdone=0
        this.frameshold=5
        this.attackbox={
            postition:{
                x:this.postition.x,
                y:this.postition.y
            },
            offset: attackbox.offset,
            width:attackbox.width,
            height:attackbox.height
        }
        this.color= color
        this.isAttacking
        this.health=100
        this.sprites=sprites
        this.dead=false
        
        for (const i in this.sprites) {
            sprites[i].image = new Image()
            sprites[i].image.src = sprites[i].imageSrc
          }
          console.log(this.sprites)
    }



    update(){
        this.draw()
        if(!this.dead)this.animateframes()
        this.attackbox.postition.x= this.postition.x +this.attackbox.offset.x
        this.attackbox.postition.y= this.postition.y +this.attackbox.offset.y

        // c.fillRect(
    
        //     this.attackbox.postition.x,
        //     this.attackbox.postition.y,
        //     this.attackbox.width,
        //     this.attackbox.height,
        // )

        this.postition.x+=this.velocity.x
        this.postition.y+=this.velocity.y
        if(this.postition.y+this.height+this.velocity.y >= canvas.height-96){
            this.velocity.y=0;
        }else{
            this.velocity.y+=gravity
        }
        
    }
    attack(){
        this.switchsprite('attack')
        this.isAttacking=true
        
    }

    hit(){
    this.health-= (Math.floor(Math.random() * 20) + 8);  
        if(this.health<=0){
            this.switchsprite('death')
        }
        else
        {this.switchsprite('hit')}
    }
    switchsprite(sprite){
        if (this.image === this.sprites.death.image) {
            if (this.currframe === this.sprites.death.framesmax - 1)
              this.dead = true
            return
          }


        if(this.image===this.sprites.attack.image && this.currframe<this.sprites.attack.framesmax -1)
        return

        if(this.image===this.sprites.hit.image && this.currframe<this.sprites.hit.framesmax -1)
        return
        switch(sprite){

            case 'idle':
                if (this.image!==this.sprites.idle.image) {
                    this.image=this.sprites.idle.image
                    this.framesmax = this.sprites.idle.framesmax
                    this.currframe = 0
                }
                
            break
            case 'run':
                if (this.image!==this.sprites.run.image) {
                    this.image=this.sprites.run.image
                    this.framesmax = this.sprites.run.framesmax
                    this.currframe = 0
                }
            break
                
        
        case 'jump':
            if (this.image !== this.sprites.jump.image) {
              this.image = this.sprites.jump.image
              this.framesmax = this.sprites.jump.framesmax
              this.currframe = 0
            }
            break
    
          case 'fall':
            if (this.image !== this.sprites.fall.image) {
              this.image = this.sprites.fall.image
              this.framesmax = this.sprites.fall.framesmax
              this.currframe = 0
            }
            break

            case 'attack':
                if (this.image !== this.sprites.attack.image) {
                  this.image = this.sprites.attack.image
                  this.framesmax = this.sprites.attack.framesmax
                  this.currframe = 0
                }
                break

            case 'hit':
                if (this.image !== this.sprites.hit.image) {
                    this.image = this.sprites.hit.image
                    this.framesmax = this.sprites.hit.framesmax
                    this.currframe = 0
                }
                break

                case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesmax = this.sprites.death.framesmax
                    this.currframe = 0
                }
                break
        }

    }
}