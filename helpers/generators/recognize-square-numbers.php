<?php
for ($num1 = 2; $num1 <= 144; $num1++) {
    echo sprintf(
        '      ["%s", "%s"],%s',
        $num1,
        (fmod(sqrt($num1), 1) == 0) ? 'Yes' : 'No',
        PHP_EOL
    );
}
for ($x = 0; $x < 11; $x++) {
	for ($num1 = 2; $num1 <= 12; $num1++) {
		echo sprintf(
			'      ["%s", "Yes"],%s',
			$num1 * $num1,
			PHP_EOL
		);
	}
}
