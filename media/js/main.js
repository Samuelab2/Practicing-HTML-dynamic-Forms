const form = document.getElementById("form")

const basicForm = arr => {

	for (let e of arr) {
		
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
}


const selectTypeProducts = arr => {
	
	for (const key in arr) {
		if (arr.hasOwnProperty(key)) {
			for (const i of arr[key]) {
				let type_product_select = document.getElementById("Tipo Producto")
				type_product_select.addEventListener("change", clear)
				let option = document.createElement("option")
				option.value = i.id
				option.text = i.name
				type_product_select.add(option)
			}
		}
	}
}

const selectModelProducts = arr => {
	for (const key in arr) {
		if (arr.hasOwnProperty(key)) {
			for (const i of arr[key]) {
				let brand = document.getElementById("Marca")
				let option = document.createElement("option")
				option.value = i.id_tipo
				option.innerHTML = i.name;
				brand.appendChild(option)
			}
		}
	}
}

const selectBrandProducts = arr => {
	for (const key in arr) {
		if (arr.hasOwnProperty(key)) {
			for (const i of arr[key]) {
				let model = document.getElementById("Modelo")
				let option = document.createElement("option")
				option.value = i.id_tipo
				option.innerHTML = i.name;
				model.appendChild(option)
			}
		}
	}
}

let typeSelector;
let brandSelector;
let ModelSelector;

let data = [
	'datos.json',
	'tipo_producto.json',
	'marca.json',
	'modelo.json'
]

let request = data.map(file => fetch(file))

Promise.all(request)
// all responses are resolved successfully
.then(responses => responses)
// map array of responses into array of response.json() to read their content
// here we use promise.all again to get the response of every data
.then(responses => Promise.all(responses.map(r => r.json())))
.then(users => {
	
	let datos_basicos = users[0].datos_basicos
	let tipo_producto = users[1]
	let marca = users[2]
	let modelo = users[3]
	
	// console.log(tipo_producto);
	
	basicForm(datos_basicos)
	selectTypeProducts(tipo_producto)
	// selectModelProducts(marca)
	// selectBrandProducts(modelo)
	typeSelector = document.getElementById("Tipo Producto")
	brandSelector = document.getElementById("Marca")
	ModelSelector = document.getElementById("Modelo")
})

function brand() {
	fetch('marca.json')
		.then(response => response.json())
		.then(data => {
			for (const key in data) {
				for (const i of data[key]) {
					let brand = document.getElementById("Marca")
					let option = document.createElement("option")
					if (i.id_tipo == typeSelector.value) {
						option.text = i.name;
						brand.add(option)
					}
				}
			}
		})
}

function clear() {
	if (brandSelector.length > 1) {
		for (let x = brandSelector.length; x >= 1; x--) {
			brandSelector.remove(x)
		}
	}
	brand()
}