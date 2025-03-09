<?php
include_once (__DIR__ . "../../../connection/conn.php");
include_once(__DIR__ . "../../../models/User.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = array(
        'status' => false,
        'message' => 'Only POST method is allowed'
    );
    echo json_encode($response);
    exit;
}

$user = new User($conn);

$data = json_decode(file_get_contents("php://input"), true);
$response = array();

if(!isset($data['email']) || empty($data['email'])) {
    $response['status'] = false;
    $response['message'] = "Email is required";
    echo json_encode($response);
    exit;
}

if(!isset($data['password']) || empty($data['password'])) {
    $response['status'] = false;
    $response['message'] = "Password is required";
    echo json_encode($response);
    exit;
}

$userData = $user->read($data['email']);

if(!$userData) {
    $response['status'] = false;
    $response['message'] = "Invalid email or password";
    echo json_encode($response);
    exit;
}

$hashedPassword = hash('sha256', $data['password']);
if($hashedPassword !== $userData['password']) {
    $response['status'] = false;
    $response['message'] = "Invalid email or password";
    echo json_encode($response);
    exit;
}

$response['status'] = true;
$response['message'] = "Login successful";
$response['user'] = array(
    'user_id' => $userData['user_id'],
    'first_name' => $userData['first_name'],
    'last_name' => $userData['last_name'],
    'email' => $userData['email']
);

echo json_encode($response);
?>