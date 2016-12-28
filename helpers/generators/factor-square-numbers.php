<?php
for ($x = 0; $x < 1; $x++) {
	for ($num = 2; $num <= 12; $num++) {
		echo sprintf(
			'      ["%s", "%s × %s"],%s',
			$num * $num,
			$num,
			$num,
			PHP_EOL
		);
	}
}
