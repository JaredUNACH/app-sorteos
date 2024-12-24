// Función para crear el array de participantes
let crearArray = () => {
	const cuerpo_tabla = document.getElementById("cuerpo_tabla");
	let filas_cuerpotabla = cuerpo_tabla.getElementsByTagName("tr").length;
	console.log(filas_cuerpotabla);
	
	let participantes = []; // limpio el array cada vez que ejecuto la función

	for(let i=0; i<filas_cuerpotabla; i++)
	{
		let fila1_cuerpo_tabla = cuerpo_tabla.children[i];
		let celda1_number = fila1_cuerpo_tabla.firstElementChild;
		
		let celda1_name = celda1_number.nextElementSibling;
		let input_name = celda1_name.firstElementChild;
		let name = (input_name.value);

		if(name !== "") {
			participantes.push(name);
		} else {
			alert("Por favor, no deje ninguna celda de nombre vacía.");
			return;
		}
	}
	console.log(participantes);
	return participantes;
}