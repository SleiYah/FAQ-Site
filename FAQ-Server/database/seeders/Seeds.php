<?php

include_once("faq-seeds.php");
include_once("user-seeds.php");

class Seeds {
    public static function seedAll($conn) {
        SeedFaqs::seed($conn);
        
        SeedUsers::seed($conn);
        
        echo "\nAll seeding completed successfully!\n";
    }
}

Seeds::seedAll($conn);
?>