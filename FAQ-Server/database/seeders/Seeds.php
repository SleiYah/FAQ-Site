<?php
include(__DIR__ ."../../../connection/conn.php");

include(__DIR__ . "faq-seeds.php");
include(__DIR__ . "user-seeds.php");

class Seeds {
    public static function seedAll($conn) {
        SeedFaqs::seed($conn);
        
        SeedUsers::seed($conn);
        
        echo "\nAll seeding completed successfully!\n";
    }
}

Seeds::seedAll($conn);
?>