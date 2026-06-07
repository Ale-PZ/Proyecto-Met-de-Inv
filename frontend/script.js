/*CONTADORES DASHBOARD*/

let tareasTotales = 10;
let tareasActivas = 6;
let tareasAtrasadas = 2;

const total = document.getElementById("numTotal");
const activas = document.getElementById("numActivas");
const atrasadas = document.getElementById("numAtrasadas");

if(total){
    total.textContent = tareasTotales;
}

if(activas){
    activas.textContent = tareasActivas;
}

if(atrasadas){
    atrasadas.textContent = tareasAtrasadas;
}


/*AGREGAR TAREA CONECTADO YA CON BASE*/
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


/*BOTONES EDITAR*/

const botonesEditar = document.querySelectorAll(".editar");

botonesEditar.forEach(function(boton){

    boton.addEventListener("click", function(){

        alert("Función editar tarea");

    });

});


/*BOTONES ELIMINAR*/

const botonesEliminar = document.querySelectorAll(".eliminar");

botonesEliminar.forEach(function(boton){

    boton.addEventListener("click", function(){

        const confirmar = confirm("¿Deseas eliminar esta tarea?");

        if(confirmar){

            boton.parentElement.parentElement.remove();

        }

    });

});


/*PROXIMAS TAREAS*/

const tarea1 = document.getElementById("Tarea1");
const tarea2 = document.getElementById("Tarea2");

if(tarea1){
    tarea1.textContent = "Proyecto Final - 10 Junio";
}

if(tarea2){
    tarea2.textContent = "Investigación UML - 12 Junio";
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
                                <button class="editar">Editar</button>
                                <button class="eliminar">Eliminar</button>
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