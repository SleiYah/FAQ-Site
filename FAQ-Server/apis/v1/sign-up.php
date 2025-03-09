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

if(!isset($data['first_name']) || empty($data['first_name'])) {
    $response['status'] = false;
    $response['message'] = "First name is required";
    echo json_encode($response);
    exit;
}

if(!isset($data['last_name']) || empty($data['last_name'])) {
    $response['status'] = false;
    $response['message'] = "Last name is required";
    echo json_encode($response);
    exit;
}


$existing_user = $user->read($data['email']);
if($existing_user) {
    $response['status'] = false;
    $response['message'] = "Email already exists";
    echo json_encode($response);
    exit;
}

if($user->create($data)) {
    $response['status'] = true;
    $response['message'] = "User registered successfully";
} else {
    $response['status'] = false;
    $response['message'] = "Failed to register user";
}


echo json_encode($response);
?>