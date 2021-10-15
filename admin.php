<?php
include("includes/header.php");

if (isset($_POST["logout"])) {
    unset($_SESSION["adminloggedin"]);
    header("Location: index.php");
}

if (isset($_SESSION["adminloggedin"])) {

?>

    <main>
        <nav>
            <ul>
                <li>utbildning</li>
                <li>anställningar</li>
                <li>protfolio</li>
            </ul>

            <form method="POST" action="admin.php">
                <input type="submit" value="logga ut" name="logout">
            </form>
        </nav>


        <div>
            <h2>Utbildning</h2>
            <h3>kurser</h3>
            <table id="courses"></table>

            <div id="edit-course"></div>
        </div>

        <div>
            <h2>Anställningar</h2>
            <h3>anställningar</h3>
            <div id="jobs"></div>

            <div id="edit-job"></div>
        </div>

        <div>
            <h2>Portfolio</h2>
            <h3>webbsidor</h3>
            <div id="portfolio"></div>

            <div id="edit-web"></div>
        </div>


    </main>

    <aside>
        <h2>Lägg till innehåll</h2>
        <div>
            <h3>Lägg till kurs</h3>
            <form id="course-form">
                <label for="school">Skola</label>
                <input type="text" name="school" id="school" required>

                <label for="code">Kurskod</label>
                <input type="text" name="code" id="code" required>

                <label for="name">Kursnamn</label>
                <input type="text" name="name" id="name" required>

                <label for="start-date-course">Start - år/månad</label>
                <input type="month" name="start-date-course" id="start-date-course" required>

                <label for="end-date-course">Slut - år/månad</label>
                <input type="month" name="end-date-course" id="end-date-course" required>

                <label for="now-course">Nuvarande kurs</label>
                <input type="checkbox" name="now-course" id="now-course">

                <input type="submit" value="Lägg till" id="add-course">
            </form>
        </div>
        <div>
            <h3>Lägg till antsällning</h3>
            <form id="job-form">
                <label for="workplace">Arbetsplats</label>
                <input type="text" name="workplace" id="workplace">

                <label for="role">Roll</label>
                <input type="text" name="role" id="role">

                <label for="start-date-job">Start - år/månad</label>
                <input type="month" name="start-date-job" id="start-date-job">

                <label for="end-date-job">Slut år/månad</label>
                <input type="month" name="end-date-job" id="end-date-job">

                <textarea name="desc-job" id="desc-job" cols="30" rows="10"></textarea>

                <label for="now-job">Nuvarande anställning</label>
                <input type="checkbox" name="now-job" id="now-job">

                <input type="submit" value="Lägg till" id="add-job">
            </form>
        </div>
        <div>
            <h3>Lägg till webbsida</h3>
            <form id="website-form">
                <label for="title">Titel</label>
                <input type="text" name="title" id="title">

                <label for="url">Webblänk</label>
                <input type="text" name="url" id="url" placeholder="https://example.com">

                <textarea name="desc-web" id="desc-web" cols="30" rows="10"></textarea>

                <input type="submit" value="Lägg till" id="add-website">
            </form>
        </div>
    </aside>

<?php
} else {
    echo "<div id='intruder'><p>Hallå där! Du måste logga in för att få administrera denna sida. Var vänligen logga in med giltigt användarnamn och lösenord. <a href='index.php'>Gå till logga in-sida<a></p></div>";
}
include("includes/footer.php");
?>