var powerMoves = 0;
function checkProjectile(projectile){
    setTimeout(function(){
            var projectilePosition = projectile.css("left").replace("px","");
            var collisionPosition = $('#intheway').css("left").replace("px","");
            var projectilePosition = projectilePosition - 100;
            var collisionPosition = collisionPosition - 100;

            if(projectilePosition > collisionPosition){
                projectile.remove();
            } else {

            }
        },0);
}
function mainAnimationFunction(object,startPosition,animationArray,player,type,curr){
    if(type != "projectile" || type != "standing"){
        player.animated = true;
    } else {
        checkProjectile(object);
    }
    if(curr == 0 && player.animate == true){
        object.find('img').css('left',-animationArray[curr].position+"px").css('top',-startPosition+"px");
        object.css("width",animationArray[curr].width);
        setTimeout(function(){ mainAnimationFunction(object,startPosition,animationArray,player,type,curr); },1000/framerate);
        ++curr;
    } else if(curr < animationArray.length){
        object.find('img').css('left',-animationArray[curr].position+"px").css('top',-startPosition+"px");
        object.css("width",animationArray[curr].width);
        setTimeout(function(){ mainAnimationFunction(object,startPosition,animationArray,player,type,curr); },1000/framerate);
    } else {
        if(type == "projectile" || type == "standing"){
            mainAnimationFunction(object,startPosition,animationArray,player,type,0);
        } else {
            curr = 0;
            object.find('img').css('left',-animationArray[curr].position+"px").css('top',-startPosition+"px");
            object.css("width",animationArray[curr].width);
            player.animated = false;
        }
        return true;
    }
    ++curr;
}
function animation(object,start,player,curr,speed){
    if(start === true){
        player.animated = true;
        mainAnimationFunction(object,player.powerMove.sprite_position,player.powerMove.frames,player,"powermove",curr);


        setTimeout(function(){ 
            player.powerMove.sound.pause();
            player.powerMove.sound.currentTime = 0;
            player.powerMove.sound.play();
            $("#background").append("<div class='projectile ryu' id='ryu"+powerMoves+"'></div>");
            var powermove = $("#ryu"+powerMoves);
            powermove.css('left',$('#player').width());
            checkProjectile(powermove);
            powermove.animate({"left":$("#background").width()},speed,"linear",function(){ powermove.remove(); });    
            mainAnimationFunction(powermove,player.projectile.throw_position.sprite_position,player.projectile.throw_animation,player,"projectile",0); },player.powerMove.frames.length*80);
    } else {

    }
}