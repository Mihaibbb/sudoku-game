<?php

$host = 'localhost:3307';
$user = 'root';
$password = '';
$db_name = "sudoku_login";

$conn = mysqli_connect($host, $user, $password, $db_name);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}