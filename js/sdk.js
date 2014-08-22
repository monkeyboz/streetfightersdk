$(document).ready(function(){
    
    var directory;
    var currPosition;
    var holder = 0;
    //scans directory for images to be used for animations. This will later use user login information
    //as well as other various options to know exactly where the animation sheets are stored, and which
    //animation sheets are being used.
    $.ajax({
        url: "scan_directory.php",
        success: function(html){
            directory = $.parseJSON(html);
            $('select[name="animation_sheet"]').html('<option>- Select Image -</option>');
            for(var i = 0; i < directory.length; ++i){
                $('select[name="animation_sheet"]').append("<option name='"+directory[i]+"'>"+directory[i]+"</option>");
            }
        }
    })
    //function used to create options for animation sheet display
    $("select[name='animation_sheet']").change(function(){
        $('#animation_sheet_holder').find('img').attr('src','animations/'+$(this).val());
    });
    var standing = {};
    //function used to create new animation on screen with animations running
    $('input[name="complete_new_animation"]').click(function(){
        var count = 0;
        var frames = new Array();
        var yPosition = 0;
        $('#animation_sheet > .animation_holder').each(function(){
            if($(this).css("width") != '0px'){
                if(yPosition < $(this).css('top').replace('px','')){
                    yPosition = $(this).css('top').replace('px','');
                }
                frames[count] = {"position":$(this).css('left').replace('px',''),"width":$(this).css('width').replace('px',''),"height":150},
                ++count;
            }
        });
        frames.shift();
        yPosition = yPosition - 30;
        standing = {"total":count,
            "sprite_position": yPosition,
            "frames": frames
        };
        $.ajax({
            url: 'displaySettings.php',
            type: 'POST',
            data: 'call=displaySettings&info='+JSON.stringify(standing),
            success: function(html){
                $('.overlay').html('<div id="layout">'+html+'</div>');
            }
        })
        var player = new Player();
        $('#background').html("<div id='player' ><img src='animations/"+$('select[name="animation_sheet"]').val()+"' /></div>");
        var img = new Image();
        img.onload = function(){
            $('#player > img').css('width',img.width).css('height',img.height);
        }
        img.src = 'animations/'+$('select[name="animation_sheet"]').val();
        player.addAnimation(standing);
        mainAnimationFunction($('#player'),player.animations[0].sprite_position,player.animations[0].frames,player,"standing",0);
    });
    //button option used to create the animation on screen
    $('input[name="create_new_animation"]').click(function(){
        //create animation start frame on animation_sheet if animation_start_frame is not empty
        if($('#animation_sheet').find("#animation_start_frame").html() != null){
            var animation_add = '<div class="animate_frame"></div>';
            $("#animation_sheet > #animation_start_frame").append(animation_add);
        } else {
            //create animation screen for toplevel animation which will increment through the animations
            var animationstart = '<div id="top_level"></div><div id="animation_start_frame" class="animation_holder"></div><div id="bottom_level"></div>';
            $("#animation_sheet").append(animationstart);
            $('#animation_start_frame').css('top','0px').css('left','0px');
            var initial = true;
            //once animation is clicked, there should be an initial, if initial is not
            //created make sure that it is stored
            $('#animation_sheet').click(function(e){
                if(initial == true){
                    $('#animation_start_frame').css('left',e.pageX-$('#animation_start_frame').width()).css('top',e.pageY-($('#animation_start_frame').height()*2));
                    $('#animation_sheet').mousemove(function(e){
                        $('#animation_start_frame').css('width',e.pageX).css('left',e.pageX-$('#animation_start_frame').width()).css('top',e.pageY-($('#animation_start_frame').height()*2));
                        $('#top_level').css('height',e.pageY-$('#animation_start_frame').height()*2);
                        $('#bottom_level').css('height',$('#animation_sheet').height()-e.pageY).css('top',e.pageY-$('#animation_start_frame').height());
                    });
                } else {
                    $('#animation_sheet').unbind('mousemove');
                    initial = true;
                }
                $('#top_level').click(function(){
                    $(this).html();
                })
            });
        }

        //this is used to store the information about which animations are being added to the 
        //animation sheets
        $('#animation_start_frame').click(function(){
            if($('#holder'+holder) != undefined){
                var holderPosition = 0;
                //var holdLeft = $('#holder'+holder).css('left').replace('px','');
                if($('#holder'+holder).css('left') != undefined){
                    holderPosition = $(this).css('width').replace("px",'').replace('px','');
                }

                if(holderPosition > currPosition){
                    $('#holder'+holder).css('width',holderPosition-currPosition);
                } else {
                    $('#holder'+holder).css('width',holderPosition-currPosition);
                }
            }
            ++holder;
            currPosition = $(this).css('width').replace("px",'');
            var layout = '<div class="animation_holder" id="holder'+holder+'"></div>';
            $('#animation_sheet').append(layout);
            $('#holder'+holder).css('left',currPosition+'px').css('top',$(this).css('top'));
        });
        return false;
    });
})