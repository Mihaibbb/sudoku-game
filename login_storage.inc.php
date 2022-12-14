<?php 


session_start();
if (isset($_GET['message'])) {
    if (isset($_SESSION['login_success_message'])) echo "true";
    else echo "false";
} else {
    
    if (isset($_SESSION['login_success']) && $_SESSION['login_success'] === true) {
        echo 'logged in'; 
    } else {
        echo "not logged in";
    }
}

