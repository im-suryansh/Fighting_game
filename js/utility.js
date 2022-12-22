function rectanglecollision({rect1,rect2}){
    return(
        rect1.attackbox.postition.x+rect1.attackbox.width>=rect2.postition.x 
    &&
    rect1.attackbox.postition.x <= rect2.postition.x + rect2.width
     &&
     rect1.attackbox.postition.y+rect1.attackbox.height>= enemy.postition.y
     &&
     rect1.attackbox.postition.y<=rect2.postition.y +rect2.height
    )
}

function winner({player,enemy,timerid}){
    clearTimeout(timerid)
    document.querySelector('#displayText').style.display='flex'
        
    if(player.health===enemy.health){
        document.querySelector('#displayText').innerHTML='tie'
        
    }
    else if (player.health>enemy.health) {
        document.querySelector('#displayText').innerHTML='p1 wins'
    }
    else if (player.health<enemy.health) {
        document.querySelector('#displayText').innerHTML='p2 wins'
    }
}
let x = 60
let timerid
function timer(){    
    if(x>0){
        timerid=setTimeout(timer,1000)
        x-=1
        document.querySelector('#timer').innerHTML=x
    }
    if(x===0){
        
    winner({player,enemy,timerid})
    }
}                                                                    
   //for updating fonts of timer with test of time XD


// var fonts = ['tekken 6 2', 'sans-serif;',];
// var currentFont = 0
// console.log('font ni hora')

// function changeFont() {
//   document.body.style.fontFamily = fonts[currentFont++ % fonts.length]
// }

// setInterval(changeFont, 1000);

// var list = document.querySelectorAll("#timer");
// var index;
// for (index = 0; index < list.length; ++index) {
//     list[index].style.fontFamily = 'timerfont';
//     list[index].style.fontSize = '80px'
//     list[index].style.color = '#1F2937'
    

// }