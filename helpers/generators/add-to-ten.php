<?php
$prevNum1 = null;
$prevNum2 = null;
$prevYes = null;
for ($i = 0; $i < 300; $i++) {
  $num1 = mt_rand(1, 9);
  $num2 = mt_rand(1, 9);
  $yes = ($num1 + $num2 === 10) || mt_rand(0, 1);
  if (($prevNum1 === $num1) && (($prevNum2 === $num2) || ($prevYes === $yes))) {
    $i--;
    continue;
  }
  echo sprintf(
    '      ["%s + %s", "%s"],%s',
    $num1,
    ($yes ? (10 - $num1) : $num2),
    ($yes ? 'Yes' : 'No'),
    PHP_EOL
  );
  $prevNum1 = $num1;
  $prevNum2 = $num2;
  $prevYes = $yes;
}
