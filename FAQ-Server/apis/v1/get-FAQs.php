<?php
include_once (__DIR__ . "../../../connection/conn.php");
include_once(__DIR__ . "../../../models/FAQ.php");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    $response = array(
        'status' => false,
        'message' => 'Only GET method is allowed'
    );
    echo json_encode($response);
    exit;
}

$faq = new FAQ($conn);

$faqs = $faq->read();

$response = array();
if (!empty($faqs)) {
    $response['status'] = true;
    $response['message'] = "FAQs retrieved successfully";
    $response['data'] = $faqs;
} else {
    $response['status'] = true;
    $response['message'] = "No FAQs found";
    $response['data'] = [];
}

echo json_encode($response);
?>