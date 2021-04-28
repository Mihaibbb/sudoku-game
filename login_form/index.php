<?php 
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login System</title>
    <link rel="stylesheet" href="styles/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
</head>
<body>

    <?php 
        require_once 'sections/header.php';
    ?>  

    <div class="home">
            This is the home page!

            <?php
                if (isset($_SESSION['signup_success']) && $_SESSION['signup_success']) {
                    echo "<p class='success'> Contul a fost creat cu succes! </p>";
                    $_SESSION['signup_success'] = false;
                }

                if (isset($_SESSION['name']) && $_SESSION['login_success']) {
                    echo "<p class='success'> Ati fost logat cu succes! </p>
                          <p class='success'> Bine ai venit, " . $_SESSION['name'] . " !";
                }

                if (isset($_SESSION['logout']) && $_SESSION['logout']) {
                    echo '<p class="success"> Te-ai delogat cu succes!';
                }


            ?>
    </div>

   

  

</body> 
</html>