<?php 
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <?php require_once "./sections/fonts.php"; ?>
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/leaderboard.css">
    <script src="./scripts/leaderboard.js" defer></script>
</head>
<body>

    <?php 
        require_once "./sections/header.php";
        require_once "./connectionDB/connection.php";
    ?>

    <div class="leaderboard_title">
        <h1>Leaderboard</h1>
    </div>

    <div class="search">
        <input type="text" name="search" class="search-box" placeholder="Search profile...">
        <button type="submit" class="search-button"><i class="fas fa-search"></i></button>
    </div>

    <div class="row-title">
        <li>Position</li>
        <li>Name</li>
        <li>Username</li>
       
        <li>Score</li>
    </div>

    <div class="rows">

    </div>

    <div class="database-rows">
        <?php 
            $sql = "SELECT * FROM users ORDER BY score DESC;";
            $result = $conn->query($sql);
            $position = 1;
            while ($row = $result->fetch_assoc()) {
                echo "<a href='./account/id/". $row["id"] ."'>";


                if ($position % 2 !== 0) {
                    echo "<div class='row even'>";
                } else {
                    echo "<div class='row'>";
                }
                echo "
                        <li class='position-item'>" . $position ."</li>
                        <li>" . $row["name"] . "</li>
                        <li>" . $row["username"] . "</li>
                        <li class='score-item'><i class='fas fa-bolt'></i>" . $row["score"] . "</li>   
                    </div>
                </a>
                    <hr>
                
                ";

                $position++;
            }
        ?>
    </div>
    


</body>
</html>

