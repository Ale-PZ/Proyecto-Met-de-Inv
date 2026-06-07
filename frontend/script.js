/* TABLERO INDEX */

function cargarTablero() {
    const total = document.getElementById("numTotal");
    const activas = document.getElementById("numActivas");
    const atrasadas = document.getElementById("numAtrasadas");

    const tarea1 = document.getElementById("Tarea1");
    const tarea2 = document.getElementById("Tarea2");

    if (!total || !activas || !atrasadas) {
        return;
    }

    fetch("backend/tablero_inicio.php")
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                total.textContent = data.total;
                activas.textContent = data.activas;
                atrasadas.textContent = data.atrasadas;

                if (data.proximas.length > 0) {
                    tarea1.textContent = `${data.proximas[0].titulo} - ${data.proximas[0].fecha_entrega}`;
                } else {
                    tarea1.textContent = "No hay tareas próximas";
                }

                if (data.proximas.length > 1) {
                    tarea2.textContent = `${data.proximas[1].titulo} - ${data.proximas[1].fecha_entrega}`;
                } else {
                    tarea2.textContent = "";
                }
            }
        })
        .catch(error => {
            console.error("Error al cargar el tablero de inicio:", error);
        });
}

cargarTablero();


/*AGREGAR MATERIA CONECTADO YA CON BASE*/
const formMateria = document.getElementById("formMateria");

if (formMateria) {
    formMateria.addEventListener("submit", function(event) {
        event.preventDefault();

        const boton = formMateria.querySelector("button[type='submit']");
        boton.disabled = true;

        const datos = new FormData(formMateria);

        fetch("backend/registrar_materia.php", {
            method: "POST",
            body: datos
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje);

            if (data.status === "success") {
                formMateria.reset();
                cargarMaterias();
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Ocurrió un error al registrar la materia");
        })
        .finally(() => {
            boton.disabled = false;
        });
    });
}



/* LISTAR MATERIAS DESDE LA BASE DE DATOS */

function cargarMaterias() {
    const listaMaterias = document.getElementById("listaMaterias");

    if (!listaMaterias) {
        return;
    }

    fetch("backend/listar_materias.php")
        .then(response => response.json())
        .then(data => {
            listaMaterias.innerHTML = "";

            if (data.status === "success") {

                if (data.materias.length === 0) {
                    listaMaterias.innerHTML = "<p>No hay materias registradas.</p>";
                    return;
                }

                data.materias.forEach(materia => {
                    listaMaterias.innerHTML += `
                        <div class="materia-card">
                            <div>
                                <h3>${materia.nombre_materia}</h3>
                                <p>Profesor: ${materia.profesor}</p>
                                <p>Grupo: ${materia.grupo}</p>
                            </div>

                            <div class="acciones">
                                <button class="editar" onclick="editarMateria(
                                ${materia.id_materia},
                                '${materia.nombre_materia}',
                                '${materia.profesor}',
                                '${materia.grupo}')">Editar</button>
                                <button class="eliminar" onclick="eliminarMateria(${materia.id_materia})">Eliminar</button>
                            </div>
                        </div>
                    `;
                });

            } else {
                listaMaterias.innerHTML = `<p>${data.mensaje}</p>`;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            listaMaterias.innerHTML = "<p>Ocurrió un error al cargar las materias.</p>";
        });
}

cargarMaterias();

/* CARGAR MATERIAS EN EL SELECT DE TAREAS */

function cargarMateriasEnSelect() {
    const selectMaterias = document.getElementById("selectMaterias");

    if (!selectMaterias) {
        return;
    }

    fetch("backend/listar_materias.php")
        .then(response => response.json())
        .then(data => {
            selectMaterias.innerHTML = '<option value="">Seleccione una materia</option>';

            if (data.status === "success") {
                data.materias.forEach(materia => {
                    selectMaterias.innerHTML += `
                        <option value="${materia.id_materia}">
                            ${materia.nombre_materia}
                        </option>
                    `;
                });
            }
        })
        .catch(error => {
            console.error("Error al cargar materias:", error);
        });
}

cargarMateriasEnSelect();


/* REGISTRAR TAREA EN BASE DE DATOS */

const formTarea = document.getElementById("formTarea");

if (formTarea) {
    formTarea.addEventListener("submit", function(event) {
        event.preventDefault();

        const boton = formTarea.querySelector("button[type='submit']");
        boton.disabled = true;

        const datos = new FormData(formTarea);

        fetch("backend/registrar_tarea.php", {
            method: "POST",
            body: datos
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje);

            if (data.status === "success") {
                formTarea.reset();
                cargarTareas();
                cargarMateriasEnSelect();
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Ocurrió un error al registrar la tarea");
        })
        .finally(() => {
            boton.disabled = false;
        });
    });
}


/* LISTAR TAREAS DESDE LA BASE DE DATOS */

function cargarTareas() {
    const listaTareas = document.getElementById("listaTareas");

    if (!listaTareas) {
        return;
    }

    fetch("backend/listar_tareas.php")
        .then(response => response.json())
        .then(data => {
            listaTareas.innerHTML = "";

            if (data.status === "success") {

                if (data.tareas.length === 0) {
                    listaTareas.innerHTML = "<p>No hay tareas registradas.</p>";
                    return;
                }

                data.tareas.forEach(tarea => {
                    listaTareas.innerHTML += `
                        <div class="tarea-card">
                            <div>
                                <h3>${tarea.titulo}</h3>
                                <p>${tarea.descripcion}</p>
                                <p>Materia: ${tarea.nombre_materia}</p>
                                <p>Fecha de entrega: ${tarea.fecha_entrega}</p>
                                <span class="estado">${tarea.estado}</span>
                            </div>

                            <div class="acciones">
                                <button class="editar" onclick="editarTarea(
                                ${tarea.id_tarea},
                                '${tarea.titulo}',
                                '${tarea.descripcion}',
                                '${tarea.fecha_entrega}',
                                '${tarea.estado}')">Editar</button>
                                <button class="eliminar" onclick="eliminarTarea(${tarea.id_tarea})">Eliminar</button>
                            </div>
                        </div>
                    `;
                });

            } else {
                listaTareas.innerHTML = `<p>${data.mensaje}</p>`;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            listaTareas.innerHTML = "<p>Ocurrió un error al cargar las tareas.</p>";
        });
}

cargarTareas();

/* ELIMINAR TAREA */

function eliminarTarea(id_tarea) {
    const confirmar = confirm("¿Deseas eliminar esta tarea?");

    if (!confirmar) {
        return;
    }

    const datos = new FormData();
    datos.append("id_tarea", id_tarea);

    fetch("backend/eliminar_tarea.php", {
        method: "POST",
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);

        if (data.status === "success") {
            cargarTareas();
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Ocurrió un error al eliminar la tarea");
    });
}

/* ELIMINAR MATERIA */

function eliminarMateria(id_materia) {
    const confirmar = confirm("¿Deseas eliminar esta materia?");

    if (!confirmar) {
        return;
    }

    const datos = new FormData();
    datos.append("id_materia", id_materia);

    fetch("backend/eliminar_materia.php", {
        method: "POST",
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);

        if (data.status === "success") {
            cargarMaterias();
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Ocurrió un error al eliminar la materia");
    });
}

/* EDITAR MATERIA */

function editarMateria(id_materia, nombreActual, profesorActual, grupoActual) {
    const nuevoNombre = prompt("Nuevo nombre de la materia:", nombreActual);
    const nuevoProfesor = prompt("Nuevo nombre del profesor:", profesorActual);
    const nuevoGrupo = prompt("Nuevo grupo:", grupoActual);

    if (nuevoNombre === null || nuevoProfesor === null || nuevoGrupo === null) {
        return;
    }

    if (nuevoNombre.trim() === "" || nuevoProfesor.trim() === "" || nuevoGrupo.trim() === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    const datos = new FormData();
    datos.append("id_materia", id_materia);
    datos.append("nombre_materia", nuevoNombre);
    datos.append("profesor", nuevoProfesor);
    datos.append("grupo", nuevoGrupo);

    fetch("backend/editar_materia.php", {
        method: "POST",
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);

        if (data.status === "success") {
            cargarMaterias();
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Ocurrió un error al editar la materia");
    });
}

/* EDITAR TAREA */

function editarTarea(id_tarea, tituloActual, descripcionActual, fechaActual, estadoActual) {
    const nuevoTitulo = prompt("Nuevo título de la tarea:", tituloActual);
    const nuevaDescripcion = prompt("Nueva descripción:", descripcionActual);
    const nuevaFecha = prompt("Nueva fecha de entrega (YYYY-MM-DD):", fechaActual);
    const nuevoEstado = prompt("Nuevo estado (Activa, Terminada o Atrasada):", estadoActual);

    if (nuevoTitulo === null || nuevaDescripcion === null || nuevaFecha === null || nuevoEstado === null) {
        return;
    }

    if (nuevoTitulo.trim() === "" || nuevaFecha.trim() === "" || nuevoEstado.trim() === "") {
        alert("Título, fecha y estado son obligatorios");
        return;
    }

    const datos = new FormData();
    datos.append("id_tarea", id_tarea);
    datos.append("titulo", nuevoTitulo);
    datos.append("descripcion", nuevaDescripcion);
    datos.append("fecha_entrega", nuevaFecha);
    datos.append("estado", nuevoEstado);

    fetch("backend/editar_tarea.php", {
        method: "POST",
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);

        if (data.status === "success") {
            cargarTareas();
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Ocurrió un error al editar la tarea");
    });
}