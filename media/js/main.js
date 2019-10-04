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
					let option = document.createElement("option")
					option.selected = true;
					option.innerHTML = "Seleccione un item"
					select.setAttribute("id", `${e.name}`)
					select.appendChild(option)
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

let product_type = [];
let product_brand = [];
let product_model = [];

fetch('tipo_producto.json')
	.then(resp => resp.json())
	.then(data => {
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				for (const i of data[key]) {
					product_type.push(i)
					let type_product_select = document.getElementById("Tipo Producto")
					let option = document.createElement("option")
					option.id = i.id
					option.innerHTML = i.name
					type_product_select.appendChild(option)
				}
			}
		}
	})

fetch('modelo.json')
	.then(resp => resp.json())
	.then(data => {
		for (const key in data) {
			console.log(data);
			if (data.hasOwnProperty(key)) {
				for (const i of data[key]) {
					product_brand.push(i)
					let brand = document.getElementById("Marca")
					let option = document.createElement("option")
					option.id = i.id_tipo
					option.innerHTML = i.name;
					brand.appendChild(option)			
				}
			}
		}
	})

fetch('marca.json')
	.then(resp => resp.json())
	.then(data => {
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				for (const i of data[key]) {
					product_model.push(i)
					let model = document.getElementById("Modelo")
					let option = document.createElement("option")
					option.id = i.id_tipo
					option.innerHTML = i.name;
					model.appendChild(option)	
				}
			}
		}
	})

