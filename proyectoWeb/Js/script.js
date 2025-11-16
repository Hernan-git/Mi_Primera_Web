document.addEventListener('DOMContentLoaded', () => {
    const botonEnviar = document.getElementById('enviarReseña');

    // 1. Cargar las reseñas guardadas al inicio
    cargarReseñasGuardadas(); 

    if (botonEnviar) {
        botonEnviar.addEventListener('click', enviarReseña);
    }
});

/**
 * Función para cargar y mostrar todas las reseñas guardadas en LocalStorage.
 */
function cargarReseñasGuardadas() {
    const contenedorComentarios = document.getElementById('form-comentarios');
    // Limpiamos el contenedor por si acaso
contenedorComentarios.innerHTML = '';

    // Obtener las reseñas del LocalStorage o un array vacío si no hay nada
    const reseñas = JSON.parse(localStorage.getItem('reseñasUsuarios')) || [];

    // Recorrer el array y crear una card para cada una
    reseñas.forEach(reseña => {
        const nuevaReseñaCard = crearCardReseña(reseña.nombre, reseña.calificacion, reseña.texto, reseña.fecha);
        contenedorComentarios.appendChild(nuevaReseñaCard);
    });
}


/**
 * Función principal para manejar el envío de la reseña.
 */
function enviarReseña() {
    // 1. Obtener datos
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

    // 2. Crear el objeto de la nueva reseña
    const nuevaReseña = {
        nombre: nombreUsuario,
        calificacion: calificacion,
        texto: textoReseña,
        fecha: fechaActual
    };

    // 3. Guardar en LocalStorage
    guardarReseña(nuevaReseña);

    // 4. Actualizar la interfaz (DOM)
    const nuevaReseñaCard = crearCardReseña(nombreUsuario, calificacion, textoReseña, fechaActual);
    const contenedorComentarios = document.getElementById('form-comentarios');
    
    // Usamos prepend() para que la nueva reseña aparezca al principio
    contenedorComentarios.prepend(nuevaReseñaCard); 

    // 5. Mostrar mensaje de éxito y limpiar campos
    alert(`¡Reseña enviada correctamente! Calificación: ${calificacion} estrellas.`);
    document.querySelector('#textoReseña').value = '';
    calificacionInput.checked = false;
    if (document.getElementById('nombreUsuario')) {
        document.getElementById('nombreUsuario').value = '';
    }
}


function guardarReseña(reseña) {
    // Obtener las reseñas existentes
    const reseñas = JSON.parse(localStorage.getItem('reseñasUsuarios')) || [];
    
    // Agregar la nueva reseña al principio del array (para que se muestre primero)
    reseñas.unshift(reseña); 
    
    // Guardar el array actualizado de vuelta en LocalStorage
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
/*const ultimoComentario = document.querySelector(':last-child');
if (ultimoComentario){
    ultimoComentario.remove();

}*/
