// Accedo al botón de agregar fila y le asigno el evento de ejecutar la función
const agregar_fila = document.getElementById("agregar_fila");
agregar_fila.addEventListener("click", agregarFila);

// FUNCIÓN PARA AGREGAR FILAS A LA TABLA
function agregarFila() {
	//Creo una nueva fila
	let nueva_fila = document.createElement("tr");

	// Creo las columnas de esa fila
	let nueva_columna = document.createElement("td");
	let nueva_columna2 = document.createElement("td");

	// Inserto todas las columnas dentro de la fila que creé
	nueva_fila.appendChild(nueva_columna);
	nueva_fila.appendChild(nueva_columna2);

	// Creo 1 input
	let nuevo_input = document.createElement("input");

	// Creo 1 span
	let nuevo_span = document.createElement("span");

	// Creo e inserto el número que corresponde al span
	const cuerpo_tabla = document.getElementById("cuerpo_tabla");
	let filas_cuerpotabla = cuerpo_tabla.getElementsByTagName("tr").length;
	let indice = filas_cuerpotabla + 1;
	console.log(indice);
	nuevo_span.innerText = indice;

	// Inserto el input en la columna (celda) correspondiente
	nueva_columna2.appendChild(nuevo_input);

	// Inserto el span en la columna (celda) correspondiente
	nueva_columna.appendChild(nuevo_span);

	// Inserto la fila, sus columnas, inputs y spans en el body de la tabla
	cuerpo_tabla.appendChild(nueva_fila);
}

// Accedo al botón de eliminar fila y le asigno el evento de actilet la función
const eliminar_fila = document.getElementById("eliminar_fila");
eliminar_fila.addEventListener("click", eliminarFila);

// FUNCIÓN PARA ELIMINAR FILAS DE LA TABLA
function eliminarFila() {
	// Cuento las filas de la tabla
	const cuerpo_tabla = document.getElementById("cuerpo_tabla");
	let filas_cuerpotabla = cuerpo_tabla.getElementsByTagName("tr").length;

	if(filas_cuerpotabla > 2) // Para que el botón eliminar no funcione cuando solo quedan las 2 filas originales
	{
		let ultima_fila = cuerpo_tabla.lastElementChild;
		cuerpo_tabla.removeChild(ultima_fila);
		console.log(filas_cuerpotabla - 1);
	} else {
		alert("El mínimo de participantes en el sorteo es 2.");
	}
}