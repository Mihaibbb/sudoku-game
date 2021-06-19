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

    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.3.2/dist/chart.min.js" defer></script>
    <script src="./scripts/account.js" defer></script>
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

        $user_id = $_SESSION["user_id"];

        $sql = "SELECT * FROM users WHERE id='$user_id';";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();

        $all_scores = $row["all_scores"];
        if ($all_scores !== "" && $all_scores !== "0") $scores = explode(" ", $all_scores);

        if (isset($scores)) {
            $sum_scores = 0;
            foreach ($scores as $single_score) {
                $sum_scores += intval($single_score);
            }

            $media_score = $sum_scores / count($scores);

        }

        // The easy, medium and hard matches

        $easy_matches = $row["easy"];
        $medium_matches = $row["medium"];
        $hard_matches = $row["hard"];
        $total_matches = $easy_matches + $medium_matches + $hard_matches;
        $mistakes = $row["mistakes"];
    ?>

    <div class="position">
        <a href="leaderboard">
            <h2>You're current position is <span class="placement">#<?php echo $number;?></span></h2>
        </a>
    </div>

    <div class="container">

        

        <div class="account-card">

            <h2>Account details</h2>

            <div class="detail">Account ID: <span class="key"><?php echo $_SESSION['user_id'];?></span></div>
            <div class="detail">Name: <span class="key"><?php echo $_SESSION['name']; ?></span></div>
            <div class="detail">Username: <span class="key"><?php echo $_SESSION['username'];?></span></div>
            <div class="detail">Email: <span class="key"><?php echo $_SESSION['email'];?></span></div>
             
        </div>
        

        <div class="account-stats">
            
            <h2>Account Stats</h2>

            <!-- <div class="detail">Total Score: 
                <span class="key"><i class="fas fa-bolt"></i> <?php echo $_SESSION['score'];?></span>
                <span class="new_score">
                    <?php 
                        if (isset($_SESSION["last_match_score"])) { 
                            
                            echo '<i class="fas fa-arrow-up"></i> ' . $_SESSION["last_match_score"]; 
                        }
                    ?>
                </span>
            </div>  -->

            <div class="detail">Total matches played: 
                <span class="key"> 
                    <?php 
                        if (isset($scores)) echo count($scores); 
                        else echo 0;
                    ?>
                </span>
            </div>
            <div class="detail">Total mistakes: <span class="key"><?php echo $mistakes; ?></span></div>
            <div class="detail">Total time played: <span class="key"></span></div>
            <div class="detail">Arithmetic mean of score: 
                <span class="key">
                    <?php 
                        if (isset($scores)) echo round($media_score, 2); 
                        else echo 0;
                    ?>
                </span>
            </div>
        </div>

        <div class="chart diff">
            <h2>Difficulty of matches played</h2>
            
           
                <canvas id="difficulty"></canvas>
                
            
            
        </div>

        <div class="chart">
            <h2>Difficulty of score's match</h2>
    
            <canvas id="score"></canvas>

        </div>

        

    </div>

    <div class="matches hide">
        <div class="easy_matches"><?php echo $easy_matches; ?></div>
        <div class="medium_matches"><?php echo $medium_matches; ?></div>
        <div class="hard_matches"><?php echo $hard_matches; ?></div>
    </div>
    
</body>
</html>