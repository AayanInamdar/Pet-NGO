<?php
include 'connect.php';

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    // Fetch user
    $sql = "SELECT id, name, password FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $name, $hashedPassword);
    $stmt->fetch();

    if ($stmt->num_rows > 0) {
        if (password_verify($password, $hashedPassword)) {
            echo json_encode(["message" => "Login successful", "name" => $name]);
        } else {
            echo json_encode(["error" => "Incorrect password"]);
        }
    } else {
        echo json_encode(["error" => "No account found with this email"]);
    }

    $stmt->close();
}
$conn->close();
?>
