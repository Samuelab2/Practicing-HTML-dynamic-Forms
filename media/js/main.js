const form = document.getElementById("form")

fetch('datos.json')
	.then(resp => resp.json())
	.then(data => {
		for (let e of data.datos_basicos) {

			let label = document.createElement("label")
			let br = document.createElement("br")
			let br2 = document.createElement("br")
			let input = document.createElement("input")

			label.innerHTML = `${e.name}`

			form.appendChild(label)
			form.appendChild(br)

			switch (e.type) {
				case "text":
					input.setAttribute("type", `${e.type}`)
					form.appendChild(input)
					form.appendChild(br2)
					break;
				case "select":
					let select = document.createElement("select")
					select.setAttribute("id", `${e.name}`)
					form.appendChild(select)
					form.appendChild(br2)
					break;
				case "textarea":
					let textarea = document.createElement("textarea")
					form.appendChild(textarea)
					form.appendChild(br2)
					break;
				case "date":
					input.setAttribute("type", `${e.type}`)
					form.appendChild(input)
					form.appendChild(br2)
					break;
			}
		}
	})

fetch('tipo_producto.json')
	.then(resp => resp.json())
	.then(data => {
		console.log(data);
		let option = document.createElement("option")
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				console.log(data.hasOwnProperty(key));
				const element = data[key];
				console.log(element[0].name);
			}
		}
		// for (const e of data.tipo_producto) {
		// 	console.log(e.id);
		// }
		
	})

// fetch('modelo.json')
// 	.then(resp => resp.json())
// 	.then(data => console.log(data))

// fetch('marca.json')
// 	.then(resp => resp.json())
// 	.then(data => console.log(data))