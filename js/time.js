

function actualizarHora() {
    var now = new Date();
    const hora = now.toLocaleTimeString("es-ES");
    console.log(hora);
}

actualizarHora();
// setInterval(actualizarHora, 1000)