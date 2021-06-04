<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account</title>
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/account.css">
    <?php require_once "./sections/fonts.php"; ?>
</head>
<body>
    <?php 
        require_once "./sections/header.php";
        require_once "./connectionDB/connection.php";

        $sql = "SELECT * FROM users ORDER BY score DESC;";
        $result = $conn->query($sql);
        $number = 0;
        while ($row = $result->fetch_assoc()) {
            
            $number++;

            if ($row["id"] === $_SESSION["user_id"]) {
                break;
            }
        }
        
    ?>

    <div class="account-card">
        <h2>Account details</h2>
        <div class="detail">Account ID: <span class="key"><?php echo $_SESSION['user_id'];?></span></div>
        <div class="detail">Name: <span class="key"><?php echo $_SESSION['name']; ?></span></div>
        <div class="detail">Username: <span class="key"><?php echo $_SESSION['username'];?></span></div>
        <div class="detail">Email: <span class="key"><?php echo $_SESSION['email'];?></span></div>
        <div class="detail">Total Score: <span class="key"><i class="fas fa-bolt"></i> <?php echo $_SESSION['score'];?></span></div>

        <div class="position">
            <a href="leaderboard"><h2>You're current position is <span class="placement">#<?php echo $number;?></span></h2></a>
        </div>
    </div>
</body>
</html>