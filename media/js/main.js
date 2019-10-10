const form = document.getElementById("form")
const stepContainer = document.getElementById("stepContainer")

let typeSelector;
let brandSelector;
let modelSelector;
let colorSelector;
let sizeelector;

let data = [
	'datos.json',
	'tipo_producto.json'
]

let request = data.map(file => fetch(file))

Promise.all(request)
	.then(responses => responses)
	.then(responses => Promise.all(responses.map(r => r.json())))
	.then(users => {
		// console.log(users[0].fotos[0]);
		
		let tipo_producto = users[1]

		basicForm(users[0].datos_basicos)
		basicForm(users[0].datos_almacen)
		basicForm(users[0].fotos)
		selectTypeProducts(tipo_producto)

		brandSelector = document.getElementById("Marca")
		modelSelector = document.getElementById("Modelo")
		colorSelector = document.getElementById("Color")
		sizeSelector = document.getElementById("Size")

		showTab(currentTab)
	})

const basicForm = arr => {

	let div = document.createElement("div")
	div.classList.add("tab")
	form.insertBefore(div, stepContainer)

	for (let e of arr) {
		if (e.hasOwnProperty("name")) {
			let label = document.createElement("label")
			let br = document.createElement("br")
			let br2 = document.createElement("br")
			let input = document.createElement("input")

			label.innerHTML = `${e.name}`

			div.appendChild(label)
			div.appendChild(br)

			switch (e.type) {
				case "text":
					input.setAttribute("type", `${e.type}`)
					input.setAttribute("maxLength", `${e.maxlength}`)
					input.setAttribute("name", `${e.name}`)
					if (e.required == true) {
						input.classList.add("validate")
					}
					input.classList.add("form-control")
					div.appendChild(input)
					div.appendChild(br2)
					break;
				case "select":
					let select = document.createElement("select")
					let option = document.createElement("option")
					if (e.required == true) {
						select.classList.add("validate")
					}
					select.setAttribute("id", `${e.name}`)
					select.setAttribute("name", `${e.name}`)
					select.appendChild(option)
					select.classList.add("selectpicker")
					$(function () {
						$('.selectpicker').selectpicker({
							style: '',
							liveSearch: true,
							liveSearchPlaceholder: 'Buscar...',
							styleBase: 'form-control',
							width: '100%'
						});
					});
					option.innerHTML = "Seleccione un item"
					option.value = "";
					div.appendChild(select)
					div.appendChild(br2)
					break;
				case "textarea":
					let textarea = document.createElement("textarea")
					textarea.setAttribute("maxLength", `${e.maxlength}`)
					textarea.setAttribute("name", `${e.name}`)
					textarea.classList.add("form-control")
					div.appendChild(textarea)
					div.appendChild(br2)
					break;
				case "date":
					input.setAttribute("type", `${e.type}`)
					input.setAttribute("name", `${e.name}`)
					if (e.required == true) {
						input.classList.add("validate")
					}
					input.classList.add("form-control")
					div.appendChild(input)
					div.appendChild(br2)
					break;
				case "number":
					input.setAttribute("type", `${e.type}`)
					input.setAttribute("maxLength", `${e.maxlength}`)
					input.setAttribute("name", `${e.name}`)
					if (e.required == true) {
						input.classList.add("validate")
					}
					input.classList.add("form-control")
					div.appendChild(input)
					div.appendChild(br2)
					break;
				case "file":
					let imageContainer = document.createElement("div")
					imageContainer.classList.add("imageContainer")
					let preview = document.createElement("img")
					preview.setAttribute("id", "image")

					input.setAttribute("type", `${e.type}`)
					input.setAttribute("maxLength", `${e.maxlength}`)
					input.setAttribute("name", `${e.name}`)
					if (e.required == true) {
						input.classList.add("validate")
					}
					div.appendChild(input)
					div.appendChild(br2)
					div.appendChild(imageContainer)
					imageContainer.appendChild(preview)
					break;
			}
		}
	}
}
		

const selectTypeProducts = arr => {
	for (const key in arr) {
		for (const i of arr[key]) {
			typeSelector = document.getElementById("Tipo Producto")
			typeSelector.addEventListener("change", clear)
			let option = document.createElement("option")
			option.value = i.id
			option.text = i.name
			typeSelector.add(option)
		}
	}
}

function clear() {
	if (brandSelector.length > 1) {
		for (let x = brandSelector.length; x >= 1; x--) {
			brandSelector.remove(x)
		}
	}
	if (modelSelector.length > 1) {
		for (let x = modelSelector.length; x >= 1; x--) {
			modelSelector.remove(x)
		}
	}
	if (colorSelector.length > 1) {
		for (let x = colorSelector.length; x >= 1; x--) {
			colorSelector.remove(x)
		}
	}
	if (sizeSelector.length > 1) {
		for (let x = sizeSelector.length; x >= 1; x--) {
			sizeSelector.remove(x)
		}
	}
	brand()
	model()
	color()
	size()
}

function brand() {
	fetch('marca.json')
		.then(response => response.json())
		.then(data => {
			for (const key in data) {
				for (const i of data[key]) {
					let brand = document.getElementById("Marca")
					let option = document.createElement("option")
					if (i.id_tipo == typeSelector.value) {
						option.value = i.id_tipo
						option.text = i.name;
						brand.add(option)
						$('.selectpicker').selectpicker('refresh');
					}
				}
			}
		})
}

function model() {
	fetch('modelo.json')
		.then(response => response.json())
		.then(data => {
			for (const key in data) {
				for (const i of data[key]) {
					let model = document.getElementById("Modelo")
					let option = document.createElement("option")
					if (i.id_tipo == typeSelector.value) {
						option.value = i.id_tipo
						option.text = i.name;
						model.add(option)
						$('.selectpicker').selectpicker('refresh');
					}
				}
				fieldValidating()
			}
		})
}

function color() {
	fetch('color.json')
		.then(response => response.json())
		.then(data => {
			for (const key in data) {
				for (const i of data[key]) {
					let color = document.getElementById("Color")
					let option = document.createElement("option")
					if (i.id_tipo == typeSelector.value) {
						option.value = i.id_tipo
						option.text = i.name;
						color.add(option)
						$('.selectpicker').selectpicker('refresh');
					}
				}
				fieldValidating()
			}
		})
}

function size() {
	fetch('size.json')
		.then(response => response.json())
		.then(data => {
			for (const key in data) {
				for (const i of data[key]) {
					let size = document.getElementById("Size")
					let option = document.createElement("option")
					if (i.id_tipo == typeSelector.value) {
						option.value = i.id_tipo
						option.text = i.name;
						size.add(option)
						$('.selectpicker').selectpicker('refresh');
					}
				}
				fieldValidating()
			}
		})
}

function fieldValidating() {
	if (typeSelector != 0 && modelSelector.length <= 1) {
		modelSelector.classList.remove("required")
	} else {
		modelSelector.classList.add("required")
	}
	if (typeSelector != 0 && brandSelector.length <= 1) {
		brandSelector.classList.remove("required")
	} else {
		brandSelector.classList.add("required")
	}
	if (typeSelector != 0 && colorSelector.length <= 1) {
		colorSelector.classList.remove("required")
	} else {
		colorSelector.classList.add("required")
	}
	if (typeSelector != 0 && sizeSelector.length <= 1) {
		sizeSelector.classList.remove("required")
	} else {
		sizeSelector.classList.add("required")
	}
}

let currentTab = 0

function nextPrev(n) {
	let x = document.getElementsByClassName("tab");
	if (n == 1 && !validateForm()) return false;
	x[currentTab].style.display = "none";
	currentTab += n;
	if (currentTab >= x.length) {
		form.addEventListener('submit', (event) => {
			console.log("hola");
			debugger
			// event.preventDefault()
		})
		form.submit();
		// return false;
	}
	showTab(currentTab);
}


function showTab(n) {
	let x = document.getElementsByClassName("tab");
	x[n].style.display = "block";
	if (n == 0) {
		document.getElementById("prevBtn").style.display = "none";
	} else {
		document.getElementById("prevBtn").style.display = "inline";
	}
	if (n == (x.length - 1)) {
		document.getElementById("nextBtn").innerHTML = "Enviar";
	} else {
		document.getElementById("nextBtn").innerHTML = "Siguiente";
	}
	switch (n) {
		case 0:
			let y = document.getElementById("formTitle")
			y.innerText = "Datos Basicos"
			break;
		case 1:
			let z = document.getElementById("formTitle")
			z.innerText = "Datos Almacen"
			break;
		case 2:
			let u = document.getElementById("formTitle")
			u.innerText = "Fotografia"
			break;
	}
	StepIndicator(n)
}

function StepIndicator(n) {
	let x = document.getElementsByClassName("step");
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(" active", "");
	}
	x[n].classList.add("active")
}

function validateForm() {
	let valid = true;
	let x = document.getElementsByClassName("tab");
	let y = x[currentTab].querySelectorAll(".validate");
	console.log(y);
	
	for (i = 0; i < y.length; i++) {
		if (y[i].value == "") {
			if (y[i].classList.contains("selectpicker")) {
					$(y[i]).selectpicker('setStyle', 'btn-danger')
			} else {
				y[i].classList.add("invalid")
				valid = false;
			}
		}
	}
	if (valid) {
		document.getElementsByClassName("step")[currentTab].classList.add("finish")
	}
	return valid;
}

// function validateFormGood() {
// 	let x = document.getElementsByClassName("tab");
// 	let y = x[currentTab].querySelectorAll(".validate");
// 	for (i = 0; i < y.length; i++) {
// 		if (y[i].value != "") {
// 			y[i].classList.replace("invalid", "valid")
// 			$(function() {
// 				$('.selectpicker').selectpicker('setStyle', 'btn-info')
// 				$('.selectpicker').selectpicker('refresh');
// 			});
// 		}
// 	}
// }