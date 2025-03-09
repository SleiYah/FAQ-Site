<?php
include_once("UserSkeleton.php");

class User {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function create($userData) {
        $user = new UserSkeleton();
        $user->setFirstName($userData['first_name']);
        $user->setLastName($userData['last_name']);
        $user->setEmail($userData['email']);
        $user->setPassword($userData['password']); 

        $query = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssss", $user->getFirstName(), $user->getLastName(), $user->getEmail(), $user->getPassword());
        $stmt->execute();
        
        return true;
    }
    
    public function read($email) {
        $query = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->fetch_assoc();
    }
    public function update($userData) {
        $user = new UserSkeleton();
        
        $user->setId($userData['user_id']);
        $user->setFirstName($userData['first_name']);
        $user->setLastName($userData['last_name']);
        $user->setEmail($userData['email']);
        
        $query = "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sssi", $user->getFirstName(), $user->getLastName(), $user->getEmail(), $user->getId());
        $stmt->execute();
        
        return true;
    }
    
    public function delete($userData) {
        $user = new UserSkeleton();     
        $user->setFirstName($userData['user_id']);
   
        $query = "DELETE FROM users WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $user->getId());
        $stmt->execute();
        
        return true;
    }
}
?>