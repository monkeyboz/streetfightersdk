<?php
    define('SAVE_DIR','/players/');
    define('JS_DIR','/js/');
    
    class DisplaySettings{
        var $info;
        var $name;
        var $dir;
        function __construct(){
            $dir = SAVE_DIR;
        }
        function DisplaySettings($character){
            $character = file_get_contents('js/character/'.$character);
        }
        function loadString($json){
            $json = json_decode($json,true);
            $string = '{';
            $string .= '"name" : "'.$json['name'].'",';
            $string .= '"sprite_position" : '.$json['sprite_position'].',';
            $string .= '"frames" : ';
            foreach($json['frames'] as $j){
                $string .= '{"position": '.$j['position'].', "width" : '.$j['width'].', "height": '.$j['height'].'},';
            }
            return $string;
        }
        function createAnimation($json){
            $string = $this->loadString($json);
            $this->writeJSFile($string);
        }
        function writeJSFile($string,$file,$character){
            $jsFile = '';
            foreach($json as $j){
                print_r($j);
            }
            try{
                $fh = fopen('/js/character/testing/'.$character.'.js','w+');
                if($fh){
                    fwrite($fh,$string);
                    fclose($fh);
                }
            } catch (Exception $ex) {
                print_r($ex);
            }
            return true;
        }
        function displaying(){
            
        }
        function __destruct() {
            
        }
    }
    
    $display = new DisplaySettings();
    $display->createAnimation($_POST['info']);
    /*$display->createAnimation($_POST['info']);
    if(isset($_POST) && sizeof($_POST) > 0){
        switch($_POST['call']){
            case 'displaySettings':
                $display->createAnimation($_POST['info']);
                break;
            case 'loadSettings':
                $display->displaying();
                break;
            case 'createAnimation':
                $display->createAnimation();
                break;
            default:
                $display;
                break;
        }
    }*/
?>