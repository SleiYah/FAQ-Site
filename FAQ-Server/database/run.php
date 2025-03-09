<?php
include_once(__DIR__ . "../../connection/conn.php");
echo "Starting database setup...\n";

echo "\n== Running Migrations ==\n";
include_once(__DIR__. "../../database/migrations/Migrate.php");

echo "\n== Running Seeds ==\n";
include_once(__DIR__. "../../database/seeders/Seeds.php");

echo "\nSetup completed successfully!\n";

?>