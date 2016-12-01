<?php
for ($num1 = 1; $num1 <= 9; $num1++) {
  for ($num2 = 1; $num2 <= 9; $num2++) {
    echo sprintf(
      '      ["%s + %s", "%s"],%s',
      $num1,
      $num2,
      (($num1 + $num2 === 10) ? 'Yes' : 'No'),
      PHP_EOL
    );
  }
}
