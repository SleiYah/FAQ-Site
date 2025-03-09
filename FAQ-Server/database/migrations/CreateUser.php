<?php

class CreateUsersTable {
    public static function users($conn) {
        $sql = "CREATE TABLE IF NOT EXISTS users (
            user_id INT(11) NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id),
            UNIQUE KEY email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

        if($conn->query($sql)){
            echo "table 'users' created successfully\n";
        }
        else {
            echo "Error creating table 'users'\n" . $conn->error . "\n";
        }
    }
}
?>