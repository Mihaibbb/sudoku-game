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
    <?php 
        if (isset($_GET["id"])) {
            echo '<link rel="stylesheet" href="../../styles/style.css">
            <link rel="stylesheet" href="../../styles/account.css">';
        } else {
            echo '<link rel="stylesheet" href="./styles/style.css">
            <link rel="stylesheet" href="./styles/account.css">';
        }
    ?>
    
    <?php require_once "./sections/fonts.php"; ?>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.3.2/dist/chart.min.js" defer></script>
    <?php 
        if (isset($_GET["id"])) {
            echo '<script src="../../scripts/account.js" defer></script>';
        } else {
            echo '<script src="./scripts/account.js" defer></script>';
        }
    ?>
    
</head>
<body>

    <?php 
        require_once "./sections/header.php";
        require_once "./connectionDB/connection.php";

        $sql = "SELECT * FROM users ORDER BY score DESC;";
        $result = $conn->query($sql);
        $number = 0;

        

        if (isset($_GET["id"])) {
            $user_id = $_GET["id"];
        } else {
            $user_id = $_SESSION["user_id"];
        }

        while ($row = $result->fetch_assoc()) {
            
            $number++;  

            if ($row["id"] === $user_id) {
                break;
            }
        }

        $sql = "SELECT * FROM users WHERE id='$user_id';";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();

        $all_scores = $row["all_scores"];
        $account_id = $row["id"];
        $account_name = $row["name"];
        $account_username = $row["username"];
        $account_email = $row["email"];

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

        $easy_score = $row["easy_score"];
        $medium_score = $row["medium_score"];
        $hard_score = $row["hard_score"];
        $total_score = $easy_score + $medium_score + $hard_score;

        $total_matches = $easy_matches + $medium_matches + $hard_matches;
        $mistakes = $row["mistakes"];

        // Convert time from seconds to time format

        $time = $row["time_played"];
        $hours = floor($time / 3600);
        $minutes = floor($time / 60 % 60);
        $seconds = floor($time % 60);
        
        if (floor($hours / 10) == 0) { 
            $hours = "0" . $hours;
            
        }
        
        if (floor($minutes / 10) == 0) $minutes = "0" . $minutes;
        if (floor($seconds / 10) == 0) $seconds = "0" . $seconds;

        // Get the mistakes/matches

        $mistakes_matches = $row["mistakes_matches"];
        $mistakes_matches = explode(" ", $mistakes_matches);

        // Get the time/matches

        $all_times = $row["all_times"];
        $all_times = explode(" ", $all_times);
        
    ?>

    <!-- <div class="position">
        <a href="leaderboard">
            <h2>You're current position on the leaderboard is <span class="placement"> #<?php echo $number;?></span></h2>
        </a>
    </div> -->


    <div class="container">

        

        <div class="account-card">

            <h2>Account details</h2>

            <div class="detail">Account ID: <span class="key"><?php echo $user_id;?></span></div>
            <div class="detail">Name: <span class="key"><?php echo $account_name; ?></span></div>
            <div class="detail">Username: <span class="key"><?php echo $account_username;?></span></div>
            <div class="detail">Email: <span class="key"><?php echo $account_email;?></span></div>
             
        </div>
        

        <div class="account-stats">
            
            <h2>Account Stats (Competitive)</h2>

            

            <div class="detail">Total matches played: 
                <span class="key"> 
                    <?php 
                        if (isset($scores)) echo count($scores); 
                        
                        
                    ?>
                </span>
            </div>
            <div class="detail">Total mistakes: <span class="key"><?php echo $mistakes; ?></span></div>
            <div class="detail">Total time played: <span class="key"><?php echo $hours . ":" . $minutes . ":" . $seconds; ?></span></div>
            <div class="detail">Average score: 
                <span class="key">
                    <?php 
                        if (isset($scores)) echo '<i class="fas fa-bolt"></i> ' . round($media_score, 2); 
                        else echo 0;
                        
                    ?>
                </span>
            </div>
        </div>

        <!-- <div class="chart diff">
            <h2>Difficulty of matches played</h2>
            
           
                <canvas id="difficulty"></canvas>
                
            
            
        </div> -->

        <div class="chart">
            <h2>Total score on difficulties</h2>
    
            <canvas id="score"></canvas>
            <div class="detail">Total Score: 
                <span class="key"><i class="fas fa-bolt"></i> <?php echo $total_score; ?></span>
                
                    <div class="new_score">
                        <?php 
                            
                            if (isset($scores))  echo ' +' . $scores[count($scores) - 1]; 
                            
                        ?>
                    </div>
            </div> 
        </div>

        

    </div>

    <div class="graphics_title">
        <h2>Score Improvements <span class="percent score_imp"></span></h2>
        <h2>Mistakes Improvements <span class="percent mistakes_imp"></span></h2>
        <h2>Time Improvements <span class="percent time_imp"></span></h2>
    </div>

    <div class="graphics_container">
        
        <canvas id="score_improvement"></canvas>
        <canvas id="mistakes_improvement"></canvas>
        <canvas id="time_improvement"></canvas>
    </div>

    <div class="leaderboard_container">
        <canvas id="position_improvement"></canvas>
    </div>

    
    <!-- Hided elements -->

    <div class="matches hide">
        <div class="easy_matches"><?php echo $easy_matches; ?></div>
        <div class="medium_matches"><?php echo $medium_matches; ?></div>
        <div class="hard_matches"><?php echo $hard_matches; ?></div>
    </div>

    <div class="score_matches hide">
        <div class="easy_score"><?php echo $easy_score; ?></div>
        <div class="medium_score"><?php echo $medium_score; ?></div>
        <div class="hard_score"><?php echo $hard_score; ?></div>
    </div>

    <div class="score_array hide">
        <?php 
            if (isset($scores)) {
                foreach ($scores as $match_score) {
                    echo $match_score . " ";
                }
            }
            
        ?>
    </div>

    <div class="times_array hide">
            <?php 
                if (isset($all_times)) {
                    foreach ($all_times as $time_match) {
                        echo $time_match . " ";
                    }
                }   
                
            ?>
    </div>

    <div class="mistakes_matches hide">
        <?php 
            if (isset($mistakes_matches)) {
                foreach ($mistakes_matches as $mistakes_match) {
                    echo $mistakes_match . " ";
                }
            }
           
        ?>
    </div>
    
</body>
</html>