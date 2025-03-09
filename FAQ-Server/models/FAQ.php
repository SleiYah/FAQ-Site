<?php

class FAQ {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function create($faqData) {
        $faq = new FAQSkeleton();
        $faq->setQuestion($faqData['question']);
        $faq->setAnswer($faqData['answer']);

        $query = "INSERT INTO faqs (question, answer) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ss", $faq->getQuestion(), $faq->getAnswer());
        $stmt->execute();
        
        return $this->conn->insert_id;
    }
    
    public function read() {
        $query = "SELECT * FROM faqs ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $faqs = [];
        while($row = $result->fetch_assoc()) {
            $faqs[] = $row;
        }
        
        return $faqs;
    }
    
    public function update($faqData) {
        $faq = new FAQSkeleton();
        $faq->setId($faqData['id']);
        $faq->setQuestion($faqData['question']);
        $faq->setAnswer($faqData['answer']);
        
        $query = "UPDATE faqs SET question = ?, answer = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssi", $faq->getQuestion(), $faq->getAnswer(), $faq->getId());
        $stmt->execute();
        
        return true;
    }
    
    public function delete($faqData) {
        $faq = new FAQSkeleton();
        $faq->setId($faqData['id']);
        
        $query = "DELETE FROM faqs WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $faq->getId());
        $stmt->execute();
        
        return true;
    }

   
}
?>