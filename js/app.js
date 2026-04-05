
const container = document.getElementById("note-container");
const url = "http://127.0.0.1:8000/notes";

function fetchNotes(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        renderNotes(data);
        resizeAllNotes();
    })
    .catch(function(error) {
        console.log(error);
    });
}

fetchNotes(url);



function renderNotes(list) {
    container.innerHTML = ""

    list.forEach(note => {
        let main = document.createElement("div");
        main.classList.add("note");
        main.setAttribute("data-id", note[0]);

        main.innerHTML = `
            <div class="note-inner">
                <h5>${note[1]}</h5>
                <p>${note[2]}</p>
                <div class="tag"><i class="fa-solid fa-tag"></i>${note[3]}</div>
            </div>`

        
        container.appendChild(main);
    });
}


let activeNote = null;

function openNote(note) {
    activeNote = note;

    const title = note.querySelector("h5").textContent;
    const body = note.querySelector("p").textContent;
    const tag = note.querySelector(".tag");

    document.getElementById("show-title").textContent = title;
    document.getElementById("show-body").textContent = body;
    
    const show_tag = document.getElementById("show-tag");
    if (tag) {
        show_tag.innerHTML = tag.innerHTML;
        show_tag.classList.add("tag");
        show_tag.style.display = "block";
    } else {
        show_tag.style.display = "none";
    }

    document.getElementById("show").style.display = "block";
    editor.classList.remove("invisible");
}

function closeNote() {
    if(!activeNote) return;

    const title = document.getElementById("show-title").textContent;
    const body = document.getElementById("show-body").textContent;
    const id = Number(activeNote.getAttribute("data-id"));

    activeNote.querySelector("h5").textContent = title;
    activeNote.querySelector("p").textContent = body;

    activeNote = null;
    editor.classList.add("invisible");
    updateNotes(id, title, body);
    resizeAllNotes();
}

const notes = document.querySelectorAll(".note");
const editor = document.getElementById("show");
const show_editor = document.getElementById("show-container");

container.addEventListener("click", (e) => {
    const item = e.target.closest(".note");

    if(item) {
        e.stopPropagation();
        openNote(item);
    }
})

editor.addEventListener("mousedown", () => {
    closeNote();
});
show_editor.addEventListener("mousedown", (e) => {
    e.stopPropagation();
});





function resizeNote(noteCard) {
    const grid = document.querySelector("#note-container");

    const rowHeight = parseInt(getComputedStyle(grid).gridAutoRows);
    const rowGap = parseInt(getComputedStyle(grid).rowGap);
    const height = noteCard.getBoundingClientRect().height;

    const span = Math.ceil((height + rowGap + 15) / (rowHeight + rowGap));
    noteCard.style.gridRow = `span ${span}`;
}

function resizeAllNotes() {
    document.querySelectorAll(".note").forEach(resizeNote);
}

window.addEventListener("load", resizeAllNotes);
window.addEventListener("resize", resizeAllNotes);



function updateNotes(id, title, content) {
    fetch("http://127.0.0.1:8000/update", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: id,
        title: title,
        content: content
    })
})
.then((response) => response.json())
.then((data) => console.log("Updated data"))
.catch((error) => console.log(error));
}


function createNote() {
    let main = document.createElement("div");
        main.classList.add("note");
        main.setAttribute("data-id", note.id);

        main.innerHTML = `
            <div class="note-inner">
                <h5></h5>
                <p></p>
                <div class="tag"><i class="fa-solid fa-tag"></i></div>
            </div>`

        
        container.appendChild(main);
}

function openNewnote() {

    document.getElementById("show").style.display = "block";
    editor.classList.remove("invisible");

    document.getElementById("show-title").textContent = "Title";
    document.getElementById("show-body").textContent = "Write here..";
    document.getElementById("show-tag").innerHTML = `
        <div class="tag" contenteditable="true">Name your tag</div>`;
}

async function closeNewnote() {
    const title = document.getElementById("show-title").textContent.trim();
    const body = document.getElementById("show-body").textContent.trim();
    const tag = document.getElementById("show-tag").textContent.trim();

    editor.classList.add("invisible");
    await addNote(title, body, tag);
    await fetchNotes(url);
    resizeAllNotes();
}


document.getElementById("new_note_button").addEventListener("click", (e) => {
    openNewnote();
});

editor.addEventListener("mousedown", () => {
    closeNewnote();
});
show_editor.addEventListener("mousedown", (e) => {
    e.stopPropagation();
});



async function addNote(title, content, tag) {
    await fetch("http://127.0.0.1:8000/insert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            content: content, 
            tag: tag
        })
    })
    .then((res) => res.json())
    .then((data) => console.log("Inserted data"))
    .catch((error) => console.log(error))
}