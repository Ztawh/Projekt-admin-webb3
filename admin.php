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
                <details>
                    <summary>
                        <h2>Lägg till +</h2>
                    </summary>

                    <div class="details-content">
                        <h3>Lägg till kurs</h3>
                        <form id="course-form">
                            <label for="school">Skola</label>
                            <input type="text" name="school" id="school" placeholder="Mittuniversitetet" required>

                            <label for="code">Kurskod (max 8 tecken)</label>
                            <input type="text" name="code" id="code" placeholder="DT173G" required>

                            <label for="name">Kursnamn</label>
                            <input type="text" name="name" id="name" placeholder="Webbutveckling III" required>

                            <label for="start-date-course">Start - år/månad<br>(ex. 2021-10)</label>
                            <input type="month" name="start-date-course" id="start-date-course" required>

                            <label for="end-date-course">Slut - år/månad<br>(ex. 2022-01)</label>
                            <input type="month" name="end-date-course" id="end-date-course">

                            <div class="flex-container checkbox">
                                <label for="now-course">Nuvarande kurs</label>
                                <input type="checkbox" name="now-course" id="now-course">
                            </div>

                            <input type="submit" value="Lägg till" id="add-course" class="submit-btn">
                        </form>
                    </div>
                    <div class="details-content">
                        <h3>Lägg till anställning</h3>
                        <form id="job-form">
                            <label for="workplace">Arbetsplats</label>
                            <input type="text" name="workplace" id="workplace" placeholder="Målaranders AB">

                            <label for="role">Roll</label>
                            <input type="text" name="role" id="role" placeholder="Målare">

                            <label for="start-date-job">Start - år/månad<br>(ex. 2020-10)</label>
                            <input type="month" name="start-date-job" id="start-date-job">

                            <label for="end-date-job">Slut år/månad<br>(ex. 2022-01)</label>
                            <input type="month" name="end-date-job" id="end-date-job">

                            <label for="desc-job">Beskrivning</label>
                            <textarea name="desc-job" id="desc-job" cols="30" rows="10"></textarea>

                            <div class="flex-container checkbox">
                                <label for="now-job">Nuvarande anställning</label>
                                <input type="checkbox" name="now-job" id="now-job">
                            </div>

                            <input type="submit" value="Lägg till" id="add-job" class="submit-btn">
                        </form>
                    </div>
                    <div class="details-content">
                        <h3>Lägg till webbsida</h3>
                        <form id="website-form">
                            <label for="title">Titel</label>
                            <input type="text" name="title" id="title" placeholder="Youtube">

                            <label for="url">Webblänk</label>
                            <input type="url" name="url" id="url" pattern="https://.*" placeholder="https://example.com">

                            <label for="desc-web">Beskrivning</label>
                            <textarea name="desc-web" id="desc-web" cols="30" rows="10"></textarea>

                            <input type="submit" value="Lägg till" id="add-website" class="submit-btn">
                        </form>
                    </div>
                </details>
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

        <!-- Footer -->
        <footer id="admin-footer">

        <?php
        include("includes/footer.php");
    } else {
        echo "<body id='intruder-body'><main id='intruder'><h1 id='intruder-h1'>Hallå där!</h1><p> Du måste logga in för att få administrera denna sida. Var vänligen logga in med giltigt användarnamn och lösenord. <a href='index.php'>Gå till logga in-sida</a></p></main><footer id='intruder-footer'>";
        include("includes/footer.php");
    }
    
        ?>