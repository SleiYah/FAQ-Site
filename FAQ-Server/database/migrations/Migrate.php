<?php


include_once("CreateUser.php");
include_once("CreateFAQ.php");

CreateUsersTable::users($conn);
CreateFaqsTable::faqs($conn);

echo "\nAll migrations completed successfully!";
?>