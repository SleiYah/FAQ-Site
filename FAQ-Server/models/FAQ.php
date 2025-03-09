<?php
include_once("FAQSkeleton.php");
class FAQ {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function create($faqData) {
        $faq = new FAQSkeleton();
        $faq->setQuestion($faqData['question']);
        $faq->setAnswer($faqData['answer']);

        $question = $faq->getQuestion();
        $answer = $faq->getAnswer();

        $query = "INSERT INTO faqs (question, answer) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ss", $question, $answer);
        $stmt->execute();
        
        return $this->conn->insert_id;
    }
    
    public function read() {
        $this->conn->query("COMMIT");
        $query = "SELECT SQL_NO_CACHE * FROM faqs ORDER BY created_at DESC";
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
        
        $question = $faq->getQuestion();
        $answer = $faq->getAnswer();
        $id = $faq->getId();

        $query = "UPDATE faqs SET question = ?, answer = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssi", $question, $answer, $id);
        $stmt->execute();
        
        return $stmt->affected_rows > 0;
    }
    
    public function delete($faqData) {
        $faq = new FAQSkeleton();
        $faq->setId($faqData['id']);
        
        $id = $faq->getId();

        $query = "DELETE FROM faqs WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        
        return $stmt->affected_rows > 0;
    }
}
?>