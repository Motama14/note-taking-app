const header = document.getElementById("header");

fetch("http://127.0.0.1:8000/quote")
    .then((res) => res.json())
    .then((data) => {
        renderQuote(data[0]);
    })
    .catch(function(error) {
        console.log(error);
    });


function renderQuote(quote) {
    header.innerHTML = `
        <h2>${quote.quote}</h2>
        <p>${quote.author}</p>`
}