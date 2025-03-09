<?php

class CreateFaqsTable {
    public static function faqs($conn) {
        $sql = "CREATE TABLE IF NOT EXISTS faqs (
            id INT(11) NOT NULL AUTO_INCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

        if($conn->query($sql)){
            echo "table 'faqs' created successfully\n";
        }
        else {
            echo "Error creating table 'faqs'\n" . $conn->error . "\n";
        }
    }
}
?>