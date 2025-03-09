<?php


include("CreateUser.php");
include("CreateFAQ.php");

CreateUsersTable::users($conn);
CreateFaqsTable::faqs($conn);

echo "\nAll migrations completed successfully!";
?>