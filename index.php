<?php
include("includes/header.php");
$message = "";

if(isset($_POST["login"])){
    if($_POST["user"] == "admin" && $_POST["password"] == "lösen"){
        $_SESSION["adminloggedin"] = "loggedin";
        echo $_SESSION["adminloggedin"];
        header("Location: admin.php");
    } else {
        $message = "Gick inte!";
    }
}
?>

<main class="flex-container">
    <div>
        <h2>Hej!</h2>
        <p>Du har kommit till administrationssidan för Amandas
            digitala portfolio.</p>

            <p>Denna sida sköter hanteringen för CV, det vill säga
            utbildning & anställningar samt webbsidor i portfolio.</p>

            <p>Om du inte har ett konto till denna sida betyder det
            att du inte är behörig att administrera sidan!</p>
    </div>

    <div>
        <h2>Logga in</h2>
        <?php echo $message ?>
        <form method="POST" action="index.php">
            <label for="user">användarnamn</label>
            <input type="text" id="user" name="user">

            <label for="password">lösenord</label>
            <input type="text" id="password" name="password">

            <input type="submit" name="login" value="logga in">

        </form>
    </div>


</main>

<?php
include("includes/footer.php");
?>