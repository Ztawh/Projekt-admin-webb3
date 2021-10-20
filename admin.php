<?php
include("includes/header.php");

if (isset($_POST["logout"])) {
    unset($_SESSION["adminloggedin"]);
    header("Location: index.php");
}

if (isset($_SESSION["adminloggedin"])) {

?>

    <body>
        <header id="header-admin">
            <h1>administration</h1>
            <h2>amandas portfolio</h2>
        </header>


        <nav class="flex-container">
            <ul class="flex-container">
                <li><a href="#courses-h2">utbildning</a></li>
                <li><a href="#jobs-h2">anställningar</a></li>
                <li><a href="#portfolio-h2">protfolio</a></li>
            </ul>

            <form method="POST" action="admin.php">
                <input type="submit" value="logga ut" name="logout" id="logout-btn" class="submit-btn">
            </form>
        </nav>

        <div id="container" class="flex-container">

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

                        <input type="submit" value="Lägg till" id="add-course" class="submit-btn">
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

                        <input type="submit" value="Lägg till" id="add-job" class="submit-btn">
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

                        <input type="submit" value="Lägg till" id="add-website" class="submit-btn">
                    </form>
                </div>
            </aside>

            <main>
                <section>
                    <h2 id="courses-h2">Utbildning</h2>
                    <h3>kurser</h3>
                    <table id="courses"></table>

                    <div id="edit-course"></div>
                </section>

                <section>
                    <h2 id="jobs-h2">Anställningar</h2>
                    <h3>anställningar</h3>
                    <div id="jobs"></div>

                    <div id="edit-job"></div>
                </section>

                <section>
                    <h2 id="portfolio-h2">Portfolio</h2>
                    <h3>webbsidor</h3>
                    <div id="portfolio"></div>

                    <div id="edit-web"></div>
                </section>


            </main>


        </div>
        <footer id="admin-footer">

    <?php
} else {
    echo "<div id='intruder'><p>Hallå där! Du måste logga in för att få administrera denna sida. Var vänligen logga in med giltigt användarnamn och lösenord. <a href='index.php'>Gå till logga in-sida<a></p></div>";
}
include("includes/footer.php");
    ?>