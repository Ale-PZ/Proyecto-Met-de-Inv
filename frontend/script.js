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


/* LISTA DE TAREAS */

const tareas = [
    {
        nombre: "Proyecto Base de Datos",
        descripcion: "Entregar documentación final",
        estado: "Activa"
    },

    {
        nombre: "Investigación UML",
        descripcion: "Realizar diagramas",
        estado: "Atrasada"
    }
];


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