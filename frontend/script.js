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


/*AGREGAR TAREA*/

const formularioTarea = document.querySelector("form");

if(formularioTarea){

    formularioTarea.addEventListener("submit", function(event){

        event.preventDefault();

        const inputs = formularioTarea.querySelectorAll("input, textarea, select");

        const nuevaTarea = {
            nombre: inputs[0].value,
            descripcion: inputs[1].value,
            materia: inputs[2].value,
            fecha: inputs[3].value,
            estado: inputs[4].value
        };

        console.log("Nueva tarea:");
        console.log(nuevaTarea);

        alert("Tarea guardada correctamente");

        formularioTarea.reset();

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