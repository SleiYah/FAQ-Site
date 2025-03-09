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

        $firstName = $user->getFirstName();
        $lastName = $user->getLastName();
        $email = $user->getEmail();
        $password = $user->getPassword();

        $query = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssss", $firstName, $lastName, $email, $password);
        $stmt->execute();
        
        return $stmt->affected_rows > 0;
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
        
        $firstName = $user->getFirstName();
        $lastName = $user->getLastName();
        $email = $user->getEmail();
        $id = $user->getId();

        $query = "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sssi", $firstName, $lastName, $email, $id);
        $stmt->execute();
        
        return $stmt->affected_rows > 0;
    }
    
    public function delete($userData) {
        $user = new UserSkeleton();     
        $user->setId($userData['user_id']);
   
        $id = $user->getId();

        $query = "DELETE FROM users WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        
        return $stmt->affected_rows > 0;
    }
}
?>