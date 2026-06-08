# Tareas Escolares

Sistema web para la gestión y control de tareas.
El proyecto permite registrar materias, registrar tareas, consultar información, editar registros, eliminar tareas y visualizar un panel principal con el conteo de tareas totales, activas, atrasadas y próximas tareas.

## Descripción del proyecto

Este sistema fue desarrollado como proyecto académico para la materia de Metodologías de Desarrollo.
Su objetivo principal es ayudar a los estudiantes a organizar sus tareas escolares de forma sencilla, relacionando cada tarea con una materia específica.

El sistema cuenta con:

* Panel principal con resumen de tareas.
* Registro de materias.
* Listado de materias.
* Edición de materias.
* Eliminación de materias.
* Registro de tareas.
* Listado de tareas.
* Edición de tareas.
* Eliminación de tareas.
* Conexión con base de datos MySQL.

## Tecnologías utilizadas

* HTML
* CSS
* JavaScript
* PHP
* MySQL
* XAMPP
* MySQL Workbench / phpMyAdmin

## Estructura del proyecto

```text
proyecto/
│
├── index.html
├── materias.html
├── tareas.html
├── style.css
├── script.js
│
├── backend/
│   ├── conexion.php
│   ├── conexion.example.php
│   ├── registrar_materia.php
│   ├── listar_materias.php
│   ├── editar_materia.php
│   ├── eliminar_materia.php
│   ├── registrar_tarea.php
│   ├── listar_tareas.php
│   ├── editar_tarea.php
│   ├── eliminar_tarea.php
│   └── dashboard.php
│
└── database/
    └── gestion_tareas.sql
```

---

# Formas de usar el proyecto

El sistema puede utilizarse de dos maneras:

## Alternativa 1: Usar la página web publicada

Puedes acceder directamente al sistema desde el siguiente enlace:

```text
https://hilary.gt.tc/
```

Desde la página web puedes navegar entre las secciones:

* Inicio
* Tareas
* Materias

En la sección **Inicio** se muestra el panel principal con el conteo de tareas.
En la sección **Tareas** puedes registrar, editar y eliminar tareas.
En la sección **Materias** puedes registrar, editar y eliminar materias.

---

## Alternativa 2: Ejecutar el proyecto localmente con XAMPP

También puedes descargar el proyecto y ejecutarlo de manera local usando XAMPP.

## Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

* XAMPP
* MySQL Workbench o phpMyAdmin
* Navegador web
* Git, opcional si deseas clonar el repositorio

---

## Paso 1: Descargar o clonar el repositorio

Puedes descargar el proyecto como archivo ZIP desde GitHub o clonarlo con el siguiente comando:

```bash
git clone URL_DEL_REPOSITORIO
```

Después entra a la carpeta del proyecto:

```bash
cd NOMBRE_DEL_REPOSITORIO
```

---

## Paso 2: Copiar el proyecto a la carpeta `htdocs`

Copia la carpeta del proyecto dentro de la carpeta `htdocs` de XAMPP.

En Windows normalmente se encuentra en:

```text
C:\xampp\htdocs\
```

La ruta final puede quedar así:

```text
C:\xampp\htdocs\gestion-tareas\
```

---

## Paso 3: Iniciar Apache en XAMPP

Abre el panel de control de XAMPP y activa:

```text
Apache
```

Si también estás usando MySQL desde XAMPP, activa:

```text
MySQL
```

En caso de usar MySQL Workbench con una instalación diferente de MySQL, solo necesitas asegurarte de que tu servidor MySQL local esté activo.

---

## Paso 4: Crear o importar la base de datos

Dentro del proyecto se incluye un archivo SQL en la carpeta:

```text
database/gestion_tareas.sql
```

Debes importar ese archivo en tu gestor de base de datos local, ya sea MySQL Workbench o phpMyAdmin.

### Opción usando phpMyAdmin

1. Abre el navegador.
2. Entra a:

```text
http://localhost/phpmyadmin
```

o si Apache está configurado en el puerto 8080:

```text
http://localhost:8080/phpmyadmin
```

3. Crea una base de datos llamada:

```text
gestion_tareas
```

4. Selecciona la base de datos.
5. Entra a la pestaña **Importar**.
6. Selecciona el archivo:

```text
database/gestion_tareas.sql
```

7. Presiona **Continuar**.

### Opción usando MySQL Workbench

1. Abre MySQL Workbench.
2. Crea una base de datos llamada:

```sql
CREATE DATABASE gestion_tareas;
```

3. Selecciona la base de datos:

```sql
USE gestion_tareas;
```

4. Abre el archivo `gestion_tareas.sql`.
5. Ejecuta el script para crear las tablas.

---

## Paso 5: Configurar la conexión a la base de datos

Dentro de la carpeta `backend`, edita el archivo:

```text
backend/conexion.php
```

Ahí debes colocar los datos de tu gestor de base de datos local.

Ejemplo para XAMPP local:

```php
<?php
$host = "localhost";
$usuario = "root";
$password = "";
$base_datos = "gestion_tareas";

$conexion = new mysqli($host, $usuario, $password, $base_datos);

if ($conexion->connect_error) {
    die(json_encode([
        "status" => "error",
        "mensaje" => "Error de conexión: " . $conexion->connect_error
    ]));
}

$conexion->set_charset("utf8");
?>
```

Si tu MySQL tiene contraseña, cambia esta línea:

```php
$password = "";
```

por tu contraseña local:

```php
$password = "TU_CONTRASEÑA";
```

También asegúrate de que el nombre de la base de datos coincida con el que importaste:

```php
$base_datos = "gestion_tareas";
```

---

## Paso 6: Abrir el sistema en el navegador

Después de colocar el proyecto en `htdocs`, abre el navegador y entra a:

```text
http://localhost/gestion-tareas/
```

Si Apache está usando el puerto 8080, entra a:

```text
http://localhost:8080/gestion-tareas/
```

Desde ahí podrás usar el sistema localmente.

---

# Uso básico del sistema

## Registrar una materia

1. Entra al apartado **Materias**.
2. Llena los campos:

   * Nombre de la materia
   * Profesor
   * Grupo
3. Presiona **Guardar materia**.
4. La materia aparecerá en la lista.

## Registrar una tarea

1. Entra al apartado **Tareas**.
2. Llena los campos:

   * Nombre de la tarea
   * Descripción
   * Materia
   * Fecha de entrega
   * Estado
3. Presiona **Guardar tarea**.
4. La tarea aparecerá en la lista de tareas.

## Editar registros

Para editar una materia o tarea:

1. Presiona el botón **Editar**.
2. Modifica los datos solicitados.
3. Guarda los cambios.

## Eliminar registros

Para eliminar una tarea:

1. Presiona el botón **Eliminar**.
2. Confirma la acción.

Para eliminar una materia:

1. Presiona el botón **Eliminar**.
2. Confirma la acción.

Si la materia tiene tareas asignadas, el sistema no permitirá eliminarla y mostrará el mensaje:

```text
No se puede borrar la materia porque aún hay tareas en proceso
```

---

# Base de datos

El sistema utiliza una base de datos MySQL con dos tablas principales:

## Tabla `materia`

Almacena las materias registradas por el usuario.

Campos principales:

* `id_materia`
* `nombre_materia`
* `profesor`
* `grupo`

## Tabla `tarea`

Almacena las tareas académicas.

Campos principales:

* `id_tarea`
* `titulo`
* `descripcion`
* `fecha_entrega`
* `estado`
* `id_materia`

La tabla `tarea` se relaciona con la tabla `materia` mediante el campo `id_materia`.

Relación:

```text
Materia 1 : N Tarea
```

Es decir, una materia puede tener muchas tareas, pero cada tarea pertenece a una sola materia.

---

# Notas importantes

El archivo `backend/conexion.php` contiene datos privados de conexión a la base de datos.
Por seguridad, no se recomienda subir este archivo con contraseñas reales a GitHub.

Se recomienda usar un archivo de ejemplo como:

```text
backend/conexion.example.php
```

y agregar `conexion.php` al archivo `.gitignore`.

Ejemplo de `.gitignore`:

```gitignore
backend/conexion.php
.env
```

---

# Estado del proyecto

El sistema cuenta con los módulos principales funcionando:

* Registro de materias
* Consulta de materias
* Edición de materias
* Eliminación de materias
* Registro de tareas
* Consulta de tareas
* Edición de tareas
* Eliminación de tareas
* Panel principal con conteo de tareas

---

# Autor

Hilary Virginia Rodriguez Gonzalez, Camila Alejandra Peraza Zatarain y Jesus Alejandro Valdez Ruelas
