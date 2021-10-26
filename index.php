<?php
include("includes/header.php");
$message = "";

// Kontrollerar angivet användarnamn och lösenord
if (isset($_POST["login"])) {
    if ($_POST["user"] == "admin" && $_POST["password"] == "hemligtlösen") {
        $_SESSION["adminloggedin"] = "loggedin";
        echo $_SESSION["adminloggedin"];
        header("Location: admin.php");
    } else {
        $message = "Felaktigt användarnamn<br>eller lösenord!";
    }
}
?>

<body id="login-body">
    <header>
        <h1>administration</h1>
        <h2 id="h2-header">amandas portfolio</h2>
    </header>

    <!-- Main -->
    <main class="flex-container" id="login-main">
        <!-- Hälsning -->
        <div id="intro">
            <h2>Hej!</h2>
            <p>Du har kommit till administrationssidan för Amandas
                digitala portfolio.</p>

            <p>Denna sida sköter hanteringen för CV, det vill säga
                utbildning & anställningar samt webbsidor i portfolio.</p>

            <p>Om du inte har ett konto till denna sida betyder det
                att du inte är behörig att administrera sidan!</p>
        </div>

        <!-- Logga in-formulär -->
        <div id="login-container">
            <h2>Logga in</h2>
            <span><?php echo $message ?></span>
            <form method="POST" action="index.php">
                <label for="user">användarnamn</label>
                <input type="text" id="user" name="user">

                <label for="password">lösenord</label>
                <input type="password" id="password" name="password">

                <input type="submit" name="login" value="logga in" class="submit-btn">

            </form>
        </div>
    </main>

    <!-- Footer -->
    <footer>
<?php
include("includes/footer.php");
?>