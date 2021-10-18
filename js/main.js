// Variabler
let coursesEl = document.getElementById("courses");
let jobsEl = document.getElementById("jobs");
let portfolioEl = document.getElementById("portfolio");
let editCourseEl = document.getElementById("edit-course");
let editJobEl = document.getElementById("edit-job");
let editWebEl = document.getElementById("edit-web");

// Kursformulär
let courseForm = document.getElementById("course-form");
let schoolInput = document.getElementById("school");
let codeInput = document.getElementById("code");
let nameInput = document.getElementById("name");
let startCourseInput = document.getElementById("start-date-course");
let endCourseInput = document.getElementById("end-date-course");
let checkCourse = document.getElementById("now-course");
let courseBtn = document.getElementById("add-course");

// Jobbformulär
let jobForm = document.getElementById("job-form");
let workplaceInput = document.getElementById("workplace");
let roleInput = document.getElementById("role");
let descJob = document.getElementById("desc-job");
let startJobInput = document.getElementById("start-date-job");
let endJobInput = document.getElementById("end-date-job");
let checkJob = document.getElementById("now-job");
let jobBtn = document.getElementById("add-job");

// Webbsideformulär
let webForm = document.getElementById("website-form");
let titleInput = document.getElementById("title");
let urlInput = document.getElementById("url");
let descWeb = document.getElementById("desc-web");
let webBtn = document.getElementById("add-website");


// Lyssnare
window.addEventListener("load", getCourses);
window.addEventListener("load", getJobs);
window.addEventListener("load", getPortfolio);

// Lägg till-/spara-knappar
courseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addCourse();
});

jobBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addJob();
});

webBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addWebsite();
});

// Funktioner
// Hämta alla kurser
function getCourses() {
    coursesEl.innerHTML = "";

    // Hämta alla kurser från webbtjänsten med fetch
    fetch("http://localhost:8080/projekt-webbtjanst/courses.php")
        .then(response => response.json())
        .then(data => {
            coursesEl.innerHTML += `
            <tr>
                <th>Skola</th>
                <th>Kurskod</th>
                <th>Kursnamn</th>
                <th>Start - år/månad</th>
                <th>Slut - år/månad</th>
                <th>Radera/Redigera</th>
            </tr>
        `;
            data.forEach(courses => {
                // Om slutdatum är 0 är det den nuvarande kursen
                let endDate = courses.end_date;
                if (endDate == "0000-00-00") {
                    endDate = "Nuvarande";
                } else {
                    endDate = endDate.slice(0, -3);
                }

                // Ta bort sista tre tecken så endast år och månad skrivs ut
                let startDate = courses.start_date;
                startDate = startDate.slice(0, -3);

                // Skriv ut kurser i tabell
                coursesEl.innerHTML +=
                    `
            <tr>
                <td>${courses.school}</td>
                <td>${courses.course_id}</td>
                <td>${courses.name}</td>
                <td>${startDate}</td>
                <td>${endDate}</td>
                <td><button onClick="deleteCourse(${courses.id})"><i class="fas fa-trash-alt"></i></button><button onClick="editCourse(${courses.id}, '${courses.school}', '${courses.course_id}', '${courses.name}', '${startDate}', '${endDate}')"><i class="far fa-edit"></i></button></td>
                
            </tr>
            `;
            })

        });
};

// Lägg till kurs
function addCourse() {
    let school = schoolInput.value;
    let code = codeInput.value;
    let name = nameInput.value;
    let start = startCourseInput.value;
    let end = endCourseInput.value;

    start += "-00";
    end += "-00";

    // Om ruta ibockad, sätt datum till noll
    if (checkCourse.checked) {
        end = "0000-00-00";
    }

    if (school == "" || code == "" || name == "" || start == "") {
        alert("Alla fält måste fyllas i!");
        return false;
    }
    if (end == "-00") {
        if (!checkCourse.checked) {
            alert("Ange ett slutdatum eller bocka i 'Nuvarande kurs'.");
            return false;
        }
    }

    // Lägg värden i objekt
    let course = { "school": school, "course_id": code, "name": name, "start_date": start, "end_date": end };

    console.log(course);

    // Gör objektet till json och skickar till webbtjänsten som lägger till kursen. Samt skriv ut kurserna på nytt
    fetch("http://localhost:8080/projekt-webbtjanst/courses.php", {
        method: "POST",
        body: JSON.stringify(course),
    })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log("Error: ", error);
        });

    courseForm.reset(); // Återställ formuläret
}

// Radera kurs
function deleteCourse(id) {
    // Begär bekräftelse
    if (confirm("Är du säker på att du vill ta bort den här kursen?")) {
        // Skickar id till webbtjänsten som tar bort kursen, samt skriver ut kurserna på nytt
        fetch("http://localhost:8080/projekt-webbtjanst/courses.php?id=" + id, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
                getCourses();
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    } else {
        return false; // Om användaren inte vill radera händer ingenting
    }
}

// Redigera kurs
function editCourse(id, school, code, name, start, end) {

    if (end == "0000-00-00" || end == "Nuvarande") {
        end = "";
    }
    // Tar emot värden från klickad kurs
    // Genererar ett formulär som är förifyllt med de nuvarande värdena
    editCourseEl.innerHTML =
        `
        <form id="edit-course-form">
            <h3>redigera kurs</h3>
            <label for="school-edit">Skola</label>
            <input type="text" name="school-edit" id="school-edit" value="${school}" required>

            <label for="code-edit">Kurskod</label>
            <input type="text" name="code-edit" id="code-edit" value="${code}" required>

            <label for="name-edit">Kursnamn</label>
            <input type="text" name="name-edit" id="name-edit" value="${name}" required>

            <label for="start-date-course-edit">Start - år/månad</label>
            <input type="month" name="start-date-course-edit" id="start-date-course-edit" value="${start}" required>

            <label for="end-date-course-edit">Slut - år/månad</label>
            <input type="month" name="end-date-course-edit" id="end-date-course-edit" value="${end}">

            <label for="now-course-edit">Nuvarande kurs</label>
            <input type="checkbox" name="now-course-edit" id="now-course-edit">

            <div class="flex-container">
                <button id="abort" onClick="abortEdit('edit-course-form')">Avbryt</button>
                <button id="save">Spara</button>
            </div>
            
        </form>
        `;

    // Variabel för spara-knappen
    let save = document.getElementById("save");

    // Lyssnar på spara-knappen
    save.addEventListener("click", function (e) {
        e.preventDefault();
        updateCourse(id);
    });
}

function updateCourse(id) {
    let schoolInputEdit = document.getElementById("school-edit");
    let codeInputEdit = document.getElementById("code-edit");
    let nameInputEdit = document.getElementById("name-edit");
    let startInputEdit = document.getElementById("start-date-course-edit");
    let endInputEdit = document.getElementById("end-date-course-edit");
    let checkEdit = document.getElementById("now-course-edit");

    let school = schoolInputEdit.value;
    let code = codeInputEdit.value;
    let name = nameInputEdit.value;
    let start = startInputEdit.value;
    let end = endInputEdit.value;

    start += "-00";
    end += "-00";

    // Om ruta ibockad, sätt datum till noll
    if (checkEdit.checked) {
        end = "0000-00-00";
    }

    if (school == "" || code == "" || name == "" || start == "") {
        alert("Alla fält måste fyllas i!");
        return false;
    }

    if (end == "-00") {
        if (!checkCourse.checked) {
            alert("Ange ett slutdatum eller bocka i 'Nuvarande kurs'.");
            return false;
        }
    }

    // Lägg värden i objekt
    let course = { "school": school, "course_id": code, "name": name, "start_date": start, "end_date": end };

    console.log(course);

    // Skickar id till webbtjänsten samt nya värden för den kursen, webbtjänsten uppdaterar. Samt skriver ut kurser på nytt
    fetch("http://localhost:8080/projekt-webbtjanst/courses.php?id=" + id, {
        method: "PUT",
        body: JSON.stringify(course),
    })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log("Error: ", error);
        });

    abortEdit("edit-course-form");
}

function abortEdit(formName) {
    let form = document.getElementById(formName);
    // Tar bort formuläret
    form.innerHTML = "";
};

// Hämta alla anställningar
function getJobs() {
    jobsEl.innerHTML = "";

    // Hämta alla kurser från webbtjänsten med fetch
    fetch("http://localhost:8080/projekt-webbtjanst/jobs.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(jobs => {
                // Om slutdatum är 0 är det det nuvarnade jobbet
                let endDate = jobs.end_date;
                if (endDate == "0000-00-00") {
                    endDate = "Nuvarande";
                } else {
                    endDate = endDate.slice(0, -3);
                }

                // Ta bort sista tre tecken så endast år och månad skrivs ut
                let startDate = jobs.start_date;
                startDate = startDate.slice(0, -3);

                jobsEl.innerHTML +=
                    `
            <div>
                <h4>${jobs.workplace}</h4>
                <h5>${jobs.title}</5>
                <p>${jobs.description}</p>
                <span>${startDate}</span>
                <span>${endDate}</span>
                <button onClick="deleteJob(${jobs.id})"><i class="fas fa-trash-alt"></i></button><button onClick="editJob(${jobs.id}, '${jobs.workplace}', '${jobs.title}', '${jobs.description}', '${startDate}', '${endDate}')"><i class="far fa-edit"></i></button>
            </div>
            `;
            })

        });
}

// Lägg till anställning
function addJob() {
    let workplace = workplaceInput.value;
    let role = roleInput.value;
    let desc = descJob.value;
    let start = startJobInput.value;
    let end = endJobInput.value;

    start += "-00";
    end += "-00";

    // Om ruta ibockad, sätt datum till noll
    if (checkJob.checked) {
        end = "0000-00-00";
    }

    if (workplace == "" || role == "" || desc == "" || start == "") {
        alert("Alla fält måste fyllas i!");
        return false;
    }

    if (end == "-00") {
        if (!checkJob.checked) {
            alert("Ange ett slutdatum eller bocka i 'Nuvarande anställning'.");
            return false;
        }
    }

    // Lägg värden i objekt
    let job = { "workplace": workplace, "title": role, "description": desc, "start_date": start, "end_date": end };

    console.log(job);

    // Gör objektet till json och skickar till webbtjänsten som lägger till kursen. Samt skriv ut kurserna på nytt
    fetch("http://localhost:8080/projekt-webbtjanst/jobs.php", {
        method: "POST",
        body: JSON.stringify(job),
    })
        .then(response => response.json())
        .then(data => {
            getJobs();
        })
        .catch(error => {
            console.log("Error: ", error);
        });

    jobForm.reset(); // Återställ formuläret
}

function deleteJob(id) {
    // Begär bekräftelse
    if (confirm("Är du säker på att du vill ta bort den här anställningen?")) {
        // Skickar id till webbtjänsten som tar bort anställningen, samt skriver ut anställningarna på nytt
        fetch("http://localhost:8080/projekt-webbtjanst/jobs.php?id=" + id, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
                getJobs();
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    } else {
        return false; // Om användaren inte vill radera händer ingenting
    }
}

function editJob(id, workplace, title, desc, start, end) {

    if (end == "0000-00-00" || end == "Nuvarande") {
        end = "";
    }
    // Tar emot värden från klickad anställning
    // Genererar ett formulär som är förifyllt med de nuvarande värdena
    editJobEl.innerHTML =
        `
        <form id="edit-job-form">
            <h3>redigera anställning</h3>
            <label for="workplace-edit">Arbetsplats</label>
            <input type="text" name="workplace-edit" id="workplace-edit" value="${workplace}" required>

            <label for="role-edit">Roll</label>
            <input type="text" name="role-edit" id="role-edit" value="${title}" required>

            <textarea name="desc-job-edit" id="desc-job-edit" cols="30" rows="10">${desc}</textarea>

            <label for="start-date-job-edit">Start - år/månad</label>
            <input type="month" name="start-date-job-edit" id="start-date-job-edit" value="${start}" required>

            <label for="end-date-job-edit">Slut - år/månad</label>
            <input type="month" name="end-date-job-edit" id="end-date-job-edit" value="${end}">

            <label for="now-job-edit">Nuvarande anställning</label>
            <input type="checkbox" name="now-job-edit" id="now-job-edit">

            <div class="flex-container">
                <button id="abort" onClick="abortEdit('edit-job-form')">Avbryt</button>
                <button id="save-job">Spara</button>
            </div>
            
        </form>
        `;

    // Variabel för spara-knappen
    let save = document.getElementById("save-job");

    // Lyssnar på spara-knappen
    save.addEventListener("click", function (e) {
        e.preventDefault();
        updateJob(id);
    });
}

function updateJob(id) {
    let workplaceInputEdit = document.getElementById("workplace-edit");
    let roleInputEdit = document.getElementById("role-edit");
    let descInputEdit = document.getElementById("desc-job-edit");
    let startInputEdit = document.getElementById("start-date-job-edit");
    let endInputEdit = document.getElementById("end-date-job-edit");
    let checkEdit = document.getElementById("now-job-edit");

    let workplace = workplaceInputEdit.value;
    let role = roleInputEdit.value;
    let desc = descInputEdit.value;
    let start = startInputEdit.value;
    let end = endInputEdit.value;

    start += "-00";
    end += "-00";

    // Om ruta ibockad, sätt datum till noll
    if (checkEdit.checked) {
        end = "0000-00-00";
    }

    if (workplace == "" || role == "" || desc == "" || start == "") {
        alert("Alla fält måste fyllas i!");
        return false;
    }

    if (end == "-00") {
        if (!checkEdit.checked) {
            alert("Ange ett slutdatum eller bocka i 'Nuvarande anställning'.");
            return false;
        }
    }

    // Lägg värden i objekt
    let job = { "workplace": workplace, "title": role, "description": desc, "start_date": start, "end_date": end };

    console.log(job);

    // Skickar id till webbtjänsten samt nya värden för den kursen, webbtjänsten uppdaterar. Samt skriver ut kurser på nytt
    fetch("http://localhost:8080/projekt-webbtjanst/jobs.php?id=" + id, {
        method: "PUT",
        body: JSON.stringify(job),
    })
        .then(response => response.json())
        .then(data => {
            getJobs();
        })
        .catch(error => {
            console.log("Error: ", error);
        });

    abortEdit("edit-job-form");
}

// Hämta alla webbplatser
function getPortfolio() {
    portfolioEl.innerHTML = "";

    // Hämta alla kurser från webbtjänsten med fetch
    fetch("http://localhost:8080/projekt-webbtjanst/websites.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(websites => {
                portfolioEl.innerHTML +=
                    `
            <div>
                <h4>${websites.title}</h4>
                <a href="${websites.url}">Gå till webbplats ></a>
                <p>${websites.description}</p>
                
                <button onClick="deleteWeb(${websites.id})"><i class="fas fa-trash-alt"></i></button><button onClick="editWeb(${websites.id},'${websites.title}', '${websites.url}', '${websites.description}')"><i class="far fa-edit"></i></button>
            </div>
            `;
            })

        });
}

// Lägg till webbplats
function addWebsite() {
    let title = titleInput.value;
    let url = urlInput.value;
    let desc = descWeb.value;

    if (title == "" || url == "" || desc == "") {
        alert("Alla fält måste fyllas i!");
        return false;
    }

    // Lägg värden i objekt
    let website = { "title": title, "url": url, "description": desc };

    console.log(website);

    // Gör objektet till json och skickar till webbtjänsten som lägger till webbsidan. Samt skriv ut portfolio på nytt
    fetch("http://localhost:8080/projekt-webbtjanst/websites.php", {
        method: "POST",
        body: JSON.stringify(website),
    })
        .then(response => response.json())
        .then(data => {
            getPortfolio();
        })
        .catch(error => {
            console.log("Error: ", error);
        });

    webForm.reset(); // Återställ formuläret
}

// Ta bort webbsida
function deleteWeb(id) {
    // Begär bekräftelse
    if (confirm("Är du säker på att du vill ta bort den här webbsidan?")) {
        // Skickar id till webbtjänsten som tar bort anställningen, samt skriver ut anställningarna på nytt
        fetch("http://localhost:8080/projekt-webbtjanst/websites.php?id=" + id, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
                getPortfolio();
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    } else {
        return false; // Om användaren inte vill radera händer ingenting
    }
}

function editWeb(id, title, url, desc) {
    // Tar emot värden från klickad anställning
    // Genererar ett formulär som är förifyllt med de nuvarande värdena
    editWebEl.innerHTML = `
    <form id="edit-web-form">
        <h3>redigera webbsida</h3>
        <label for="title-edit">Titel</label>
        <input type="text" name="title-edit" id="title-edit" value="${title}" required>

        <label for="url-edit">Webblänk</label>
        <input type="text" name="url-edit" id="url-edit" value="${url}" required>

        <textarea name="desc-web-edit" id="desc-web-edit" cols="30" rows="10">${desc}</textarea>

        <div class="flex-container">
            <button id="abort" onClick="abortEdit('edit-web-form')">Avbryt</button>
            <button id="save-web">Spara</button>
        </div>
        
    </form>
    `;

    // Variabel för spara-knappen
    let save = document.getElementById("save-web");

    // Lyssnar på spara-knappen
    save.addEventListener("click", function (e) {
        e.preventDefault();
        updateWeb(id);
    });
}

function updateWeb(id) {
    // Hämtar värden från redigera-formuläret
    let titleInputEdit = document.getElementById("title-edit");
    let urlInputEdit = document.getElementById("url-edit");
    let descInputEdit = document.getElementById("desc-web-edit");

    let title = titleInputEdit.value;
    let url = urlInputEdit.value;
    let desc = descInputEdit.value;

    // Kontrollerar att alla fälten är ifyllda
    if (title == "" || url == "" || desc == "") {
        alert("Alla fält måste fyllas i!");
        return false;
    }

    // Lägg värden i objekt
    let website = { "title": title, "url": url, "description": desc };

    console.log(website);

    // Skickar id till webbtjänsten samt nya värden för den kursen, webbtjänsten uppdaterar. Samt skriver ut kurser på nytt
    fetch("http://localhost:8080/projekt-webbtjanst/websites.php?id=" + id, {
        method: "PUT",
        body: JSON.stringify(website),
    })
        .then(response => response.json())
        .then(data => {
            getPortfolio();
        })
        .catch(error => {
            console.log("Error: ", error);
        });

    abortEdit("edit-web-form");
}