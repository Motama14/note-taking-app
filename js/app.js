
const contenedor = document.getElementById("note-container");
const url = "url";

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        notas = data;
        renderNotas(data);
    })
    .catch(function(error) {
        console.log(error);
    });


function renderNotas(lista) {
    contenedor.innerHTML = "";

    lista.forEach(nota => {
        let main = document.createElement("div");
        main.classList.add("notas");

        main.innerHTML = `
            <h5>${nota.titulo}</h5>
            <p>${nota.contenido}</p>`;

        contenedor.appendChild(main);
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

    activeNote.querySelector("h5").textContent = title;
    activeNote.querySelector("p").textContent = body;

    activeNote = null;
    editor.classList.add("invisible");
    resizeAllNotes();
}

const notas = document.querySelectorAll(".note");
const editor = document.getElementById("show");
const show_editor = document.getElementById("show-container");

notas.forEach(e => {
    e.addEventListener("click", (i) => {
        i.stopPropagation();

        openNote(e);
        
        
    });    
});


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