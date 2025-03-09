<?php

echo "Starting database setup...\n";

echo "\n== Running Migrations ==\n";
include(__DIR__. "../../database/migrations/Migrate.php");

echo "\n== Running Seeds ==\n";
include(__DIR__. "../../database/seeders");

echo "\nSetup completed successfully!\n";

?>