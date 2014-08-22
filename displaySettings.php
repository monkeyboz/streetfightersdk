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
        function DisplaySettings(){
        }
        function loading($json){
            $json = json_decode($_POST['info'],true);
            print_r($json);
        }
        function displaying(){
            
        }
        function __destruct() {
            
        }
    }
    
    $display = new DisplaySettings();
    if(isset($_POST) && sizeof($_POST) > 0){
        switch($_POST['call']){
            case 'displaySettings':
                $display->loading($_POST['info']);
                break;
            case 'loadSettings':
                $display->displaying();
                break;
            default:
                $display;
                break;
        }
    }
?>