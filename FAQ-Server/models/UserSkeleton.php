<?php
class UserSkeleton {
    protected $id;
    protected $first_name;
    protected $last_name;
    protected $email;
    protected $password;
    
    public function setId($id) { $this->id = $id; }
    public function setFirstName($first_name) { $this->first_name = $first_name; }
    public function setLastName($last_name) { $this->last_name = $last_name; }

    public function setEmail($email) { $this->email = $email; }
    public function setPassword($password) { $this->password = hash('sha256', $password); }

    public function getId() { return $this->id; }
    public function getFirstName() { return $this->first_name; }
    public function getLastName() { return $this->last_name; }

    public function getEmail() { return $this->email; }
    public function getPassword() { return $this->password; }
}
?>
