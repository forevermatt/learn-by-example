<?php
for ($num1 = 0; $num1 <= 9; $num1++) {
    echo sprintf(
        '      ["2 × %s", "%s"],%s',
        $num1,
        $num1 * 2,
        PHP_EOL
    );
}
for ($num1 = 0; $num1 <= 9; $num1++) {
    echo sprintf(
        '      ["%s × 2", "%s"],%s',
        $num1,
        $num1 * 2,
        PHP_EOL
    );
}
