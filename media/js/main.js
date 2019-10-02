// $(function () {
// 	//-- function que va por ajax hacia el archivo datos.json y trae su contenido . y lo imprime por consola
// 	function carga_de_datos() {
// 		var datos = "";
// 		$.ajax({
// 			type: "GET",
// 			url: "datos.json",
// 			statusCode: {
// 				404: function () {
// 					console.log("Ups! ha ocurrido un inconveniente, function ");
// 				}
// 			}
// 		}).done(function (resp) {
// 			// console.log(resp);

// 			for (var i = 0; i < resp.length; i++) {
// 				$("#table").append(`<tr>
// 				    										<td>${resp[i].nombres}</td>
// 				    										<td>${resp[i].apellidos}</td>
// 				    										<td>${resp[i].fecha_nacimiento}</td>
// 	    												</tr>`);
// 			}
// 		});
// 	}
// 	carga_de_datos();
// });	

const form = document.getElementById("form")

fetch('datos.json')
	.then((resp) => resp.json())
	.then((data) => {
		// console.log(data);
		for (let e of data.datos_basicos) {
			let label = document.createElement("label")
			let br = document.createElement("br")
			let input = document.createElement("input")
			input.setAttribute("type", "text")
			label.innerHTML = `${e.name}`
			form.appendChild(label)
			form.appendChild(br)
			form.appendChild(input)
			form.appendChild(br)
			console.log(e.name);
		}
	})
