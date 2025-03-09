<?php
include_once (__DIR__ . "../../../connection/conn.php");
include_once(__DIR__ . "../../../models/FAQ.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = array(
        'status' => false,
        'message' => 'Only POST method is allowed'
    );
    echo json_encode($response);
    exit;
}

$faq = new FAQ($conn);

$data = json_decode(file_get_contents("php://input"), true);
$response = array();

if(!isset($data['question']) || empty($data['question'])) {
    $response['status'] = false;
    $response['message'] = "Question is required";
    echo json_encode($response);
    exit;
}

if(!isset($data['answer']) || empty($data['answer'])) {
    $response['status'] = false;
    $response['message'] = "Answer is required";
    echo json_encode($response);
    exit;
}

$faqData = array(
    'question' => $data['question'],
    'answer' => $data['answer']
);

$result = $faq->create($faqData);

if($result) {
    $response['status'] = true;
    $response['message'] = "FAQ added successfully";
    $response['id'] = $result;
} else {
    $response['status'] = false;
    $response['message'] = "Failed to add FAQ";
}

echo json_encode($response);
?>