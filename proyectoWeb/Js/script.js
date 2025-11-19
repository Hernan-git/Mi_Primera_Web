document.addEventListener('DOMContentLoaded', () => {
    const botonEnviar = document.getElementById('enviarReseña');

    cargarReseñasGuardadas(); 

    if (botonEnviar) {
        botonEnviar.addEventListener('click', enviarReseña);
    }
});


 // Función para cargar y mostrar todas las reseñas guardadas en LocalStorage.
 
function cargarReseñasGuardadas() {
      const reseñas = JSON.parse(localStorage.getItem('reseñasUsuarios')) || [];
    const contenedorComentarios = document.getElementById('form-comentarios');
contenedorComentarios.innerHTML = '';

    reseñas.forEach(reseña => {
        const nuevaReseñaCard = crearCardReseña(reseña.nombre, reseña.calificacion, reseña.texto, reseña.fecha);
        contenedorComentarios.appendChild(nuevaReseñaCard);
    });
}



function enviarReseña() {
    const calificacionInput = document.querySelector('input[name="rating"]:checked');
    const textoReseña = document.querySelector('#textoReseña').value.trim();
    const nombreInput = document.getElementById('nombreUsuario') ? document.getElementById('nombreUsuario').value.trim() : "";
    const nombreUsuario = nombreInput === "" ? "Usuario Anónimo" : nombreInput;

    if (!calificacionInput || textoReseña === "") {
        alert("Por favor, selecciona una calificación y escribe tu reseña.");
        return;
    }

    const calificacion = calificacionInput.value;
    const fechaActual = new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    const nuevaReseña = {
        nombre: nombreUsuario,
        calificacion: calificacion,
        texto: textoReseña,
        fecha: fechaActual
    };

    guardarReseña(nuevaReseña);

    // Actualizar (DOM)
    const nuevaReseñaCard = crearCardReseña(nombreUsuario, calificacion, textoReseña, fechaActual);
    const contenedorComentarios = document.getElementById('form-comentarios');
    
    // Usamos prepend() para que la nueva reseña aparezca al principio
    contenedorComentarios.prepend(nuevaReseñaCard); 

    alert(`¡Reseña enviada correctamente! Calificación: ${calificacion} estrellas.`);
    document.querySelector('#textoReseña').value = '';
    calificacionInput.checked = false;
    if (document.getElementById('nombreUsuario')) {
        document.getElementById('nombreUsuario').value = '';
    }
}


function guardarReseña(reseña) {
    const reseñas = JSON.parse(localStorage.getItem('reseñasUsuarios')) || [];
    
    reseñas.unshift(reseña); 
    
    localStorage.setItem('reseñasUsuarios', JSON.stringify(reseñas));
}


function crearCardReseña(nombre, calificacion, texto, fecha) {
    const card = document.createElement('div');
    card.classList.add('reseña-card'); 

    // Función auxiliar para generar las estrellas visualmente
    const generarEstrellas = (rating) => {
        let estrellasHTML = '';
        for (let i = 0; i < 5; i++) {
            // Si i es menor que la calificación, la estrella está "llena" (★), sino "vacía" (☆)
            estrellasHTML += (i < rating) ? '★' : '☆';
        }
        return `<div class="rating-visual">${estrellasHTML}</div>`;
    };

    card.innerHTML = `
        <div class="reseña-header">
            <span class="reseña-usuario">${nombre}</span>
            ${generarEstrellas(calificacion)}
        </div>
        <p class="reseña-texto">${texto}</p>
        <span class="reseña-fecha">Enviado el: ${fecha}</span>
    `;

    return card;
}
// Para eliminar el ultimo comentario.

/*const ultimoComentario = document.querySelector(':last-child');
if (ultimoComentario){
    ultimoComentario.removeItem();

}*/
