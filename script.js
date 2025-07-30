let tareas = [];
let contadorTareas = 0;

function mostrarAlerta() {
    const alerta = document.getElementById('alertaExito');
    alerta.style.display = 'block';
    alerta.classList.add('show');

    setTimeout(() => {
        alerta.classList.remove('show');
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 150);
    }, 3000);
}

function renderizarTareas() {
    const listaTareas = document.getElementById('listaTareas');
    if (tareas.length === 0) {
        listaTareas.innerHTML = `
            <div class="list-group-item text-center text-muted">
                <i class="bi bi-inbox display-6"></i>
                <p class="mt-2">No hay tareas todavía. ¡Agrega tu primera tarea!</p>
            </div>
        `;
        return;
    }

    let html = '';
    tareas.forEach(tarea => {
        html += `
            <div class="list-group-item task-item d-flex justify-content-between align-items-center">
                <div>
                    <i class="bi bi-check-square text-success me-2"></i>
                    <span>${tarea.texto}</span>
                </div>
                <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.id})">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </div>
        `;
    });

    listaTareas.innerHTML = html;
}

function agregarTarea(textoTarea) {
    if (textoTarea.trim() === '') {
        return false;
    }

    const nuevaTarea = {
        id: contadorTareas++,
        texto: textoTarea.trim()
    };

    tareas.push(nuevaTarea);
    renderizarTareas();
    mostrarAlerta();
    return true;
}

function eliminarTarea(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        tareas = tareas.filter(tarea => tarea.id !== id);
        renderizarTareas();
    }
}

document.getElementById('formularioTarea').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('inputTarea');
    const textoTarea = input.value;

    if (agregarTarea(textoTarea)) {
        input.value = '';
        input.classList.remove('is-invalid');
    } else {
        input.classList.add('is-invalid');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        if (destino) {
            destino.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

renderizarTareas();
