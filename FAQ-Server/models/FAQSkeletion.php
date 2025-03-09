<?php
class FAQSkeleton {
    protected $id;
    protected $question;
    protected $answer;
    protected $created_at;

    public function setId($id) { $this->id = $id; }
    public function setQuestion($question) { $this->question = $question; }
    public function setAnswer($answer) { $this->answer = $answer; }
    
    public function getId() { return $this->id; }
    public function getQuestion() { return $this->question; }
    public function getAnswer() { return $this->answer; }
    public function getCreatedAt() { return $this->created_at; }
}
?>