
const contenedor = document.getElementById("note-container");

const url = "url";

let notas = [];

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