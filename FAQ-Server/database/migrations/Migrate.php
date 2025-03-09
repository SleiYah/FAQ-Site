<?php

include(__DIR__ ."../../../connection/conn.php");

include(__DIR__ . "CreateUser.php");
include(__DIR__ . "CreateFAQ.php");

CreateUsersTable::users($conn);
CreateFaqsTable::faqs($conn);

echo "\nAll migrations completed successfully!";
?>