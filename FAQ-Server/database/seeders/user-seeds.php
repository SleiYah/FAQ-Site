<?php
include(__DIR__."../../../models/User.php");

class SeedUsers {
    public static function seed($conn) {
        echo "Seeding users table...\n";
        
        $userObj = new User($conn);
        
        $users = [
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'email' => 'admin@example.com',
                'password' => 'admin123'
            ],
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john@example.com',
                'password' => 'password123'
            ],
            [
                'first_name' => 'Jane',
                'last_name' => 'Smith',
                'email' => 'jane@example.com',
                'password' => 'password456'
            ]
        ];
        
        foreach ($users as $userData) {
            $userObj->create($userData);
            echo "User created: " . $userData['email'] . "\n";
        }
        
        echo "Users seeding completed\n";
    }
}
?>