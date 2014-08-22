var standing = {};
var haduken = {"total":8,
            "name":"haduken",
            "sound": document.getElementById('powerMoveSound'),
            "sprite_position":2008,
            "augments":[{'keycode':37403965,'speed':10,'hitpoints':10},
                {"keycode":37403983,'speed':20,'hitpoints':20},
                {"keycode":37403968,'speed':30,'hitpoints':30}],
            "type": "projectile",
            "frames":[{"position":-700,"width":59,"height":150},
                        {"position":-767,"width":59,"height":150},
                        {"position":-828,"width":81,"height":150},
                        {"position":-904,"width":81,"height":150},
                        {"position":-985,"width":81,"height":150},
                        {"position":-1060,"width":81,"height":150},
                        {"position":-1151,"width":81,"height":150},
                        {"position":-1233,"width":81,"height":150}],
            "throw_position":{"sprite_position":2008},
            "throw_animation":[{"position":-1351,"width":71,"height":150},
                                {"position":-1427,"width":45,"height":150},
                                {"position":-1475,"width":59,"height":150},
                                {"position":-1536,"width":45,"height":150},
                                {"position":-1587,"width":59,"height":150},
                                {"position":-1648,"width":45,"height":150},
                                {"position":-1695,"width":71,"height":150},
                                {"position":-1759,"width":45,"height":150}],
            "collision_animation":[]
};
var framerate = 10;
var keystring = '';
var keydown = setTimeout(function(){ },0);
function Player(){
    this.animations = [];
    this.animationCount = 0;
    this.animated = false;
    this.powerMoveCount = 0;
    this.addAnimation = function(animation){
        this.animations[this.animationCount] = animation;
        ++this.animationCount;
    }
}
$(document).keydown(function(event) {
     keystring += event.keyCode;
     clearTimeout(keydown);
     $('#keycode').html(keystring);
     switch(keystring){
         case "37403965":
             ++powerMoves;
             animation($("#player"),true,ryu,0,2500);
             keystring = '';
             break;
         case "37403983":
             ++powerMoves;
             animation($("#player"),true,ryu,0,2000);
             keystring = '';
             break;
         case "37403968":
             ++powerMoves;
             animation($("#player"),true,ryu,0,1000);
             keystring = '';
             break;
     }
     setTimeout(function(){ keystring = ""; $('#keycode').html(""); },500);
});