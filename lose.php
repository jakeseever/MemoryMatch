<?php
$lose = array (
    'a' => "<h2>Better luck next time</h2>",
    'b' => "<h2>So close, try again</h2>",
    'c' => "<h2>Give it another try</h2>",
    'd' => "<h2>Don't give up, try again</h2>"    
);

echo $lose[array_rand($lose)];
?>