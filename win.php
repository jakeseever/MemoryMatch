<?php
$win = array (
    'a' => "<h2>Congratulations, you rock!</h2>",
    'b' => "<h2>Wow, that was impressive!</h2>",
    'c' => "<h2>That was fast, nicely done!</h2>",
    'd' => "<h2>You have one heck of a memory!</h2>" 
);

echo $win[array_rand($win)];
?>