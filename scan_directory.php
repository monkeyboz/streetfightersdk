<?php
    $dir = scandir("./animations");
    $json = array();
    foreach($dir as $d){
        if($d != '.' && $d != '..'){
            $json[] = $d;
        }
    }
    echo json_encode($json);