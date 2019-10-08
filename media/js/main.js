const form = document.getElementById("form")
const buttonContainer = document.getElementById("buttonContainer")

let typeSelector;
let brandSelector;
let ModelSelector;

let data = [
	'datos.json',
	'tipo_producto.json'
]

let request = data.map(file => fetch(file))
let formInfo = []

Promise.all(request)
	.then(responses => responses)
	.then(responses => Promise.all(responses.map(r => r.json())))
	.then(users => {

		formInfo.push(users)

		let tipo_producto = users[1]

		basicForm(users[0].datos_basicos)
		basicForm(users[0].datos_almacen)
		basicForm(users[0].fotos)
		selectTypeProducts(tipo_producto)

		brandSelector = document.getElementById("Marca")
		ModelSelector = document.getElementById("Modelo")

		showTab(currentTab)
	})

const basicForm = arr => {

	// let formContainer = document.getElementById("formsContainer")
	let div = document.createElement("div")
	div.classList.add("tab")
	// let form = document.createElement("form")
	// // form.setAttribute('novalidate', true)
	// form.classList.add("needs-validation")
	// div.appendChild(form)
	form.insertBefore(div, buttonContainer)

	for (let e of arr) {

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
				if (e.required == true) {
					input.classList.add("required")
				}
				// input.addEventListener("input", validateForm)
				input.classList.add("form-control")
				div.appendChild(input)
				div.appendChild(br2)
				break;
			case "select":
				let select = document.createElement("select")
				let option = document.createElement("option")
				if (e.required == true) {
					select.classList.add("required")
				}
				// select.setAttribute("required", `${e.required}`)
				option.innerHTML = "Seleccione un item"
				option.value = "";
				select.setAttribute("id", `${e.name}`)
				select.setAttribute("data-live-search", "true")
				select.classList.add("selectpicker")
				select.appendChild(option)
				div.appendChild(select)
				div.appendChild(br2)
				break;
			case "textarea":
				let textarea = document.createElement("textarea")
				textarea.setAttribute("maxLength", `${e.maxlength}`)
				textarea.classList.add("form-control")
				div.appendChild(textarea)
				div.appendChild(br2)
				break;
			case "date":
				input.setAttribute("type", `${e.type}`)
				if (e.required == true) {
					input.classList.add("required")
				}
				// input.setAttribute("required", `${e.required}`)
				input.classList.add("form-control")
				div.appendChild(input)
				div.appendChild(br2)
				break;
			case "number":
				input.setAttribute("type", `${e.type}`)
				input.setAttribute("maxLength", `${e.maxlength}`)
				if (e.required == true) {
					input.classList.add("required")
				}
				// input.setAttribute("required", `${e.required}`)
				input.classList.add("form-control")
				div.appendChild(input)
				div.appendChild(br2)
		}
	}
	// let input = document.createElement("input")
	// input.setAttribute("type", "submit")
	// input.classList.add("btn", "btn-primary")
	// form.appendChild(input)
	// form.appendChild(document.createElement("br"))
	$('.selectpicker').selectpicker('refresh');
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

function clear() {
	if (brandSelector.length > 1) {
		for (let x = brandSelector.length; x >= 1; x--) {
			brandSelector.remove(x)
		}
	}
	if (ModelSelector.length > 1) {
		for (let x = ModelSelector.length; x >= 1; x--) {
			ModelSelector.remove(x)
		}
	}
	brand()
	model()
}

function fieldValidating() {
	if (typeSelector != 0 && ModelSelector.length <= 1) {
		ModelSelector.classList.remove("required")
	} else {
		ModelSelector.classList.add("required")
	}
	if (typeSelector != 0 && brandSelector.length <= 1) {
		brandSelector.classList.remove("required")
	} else {
		brandSelector.classList.add("required")
	}
}

let currentTab = 0

function nextPrev(n) {
	// This function will figure out which tab to display
	let x = document.getElementsByClassName("tab");
	// Exit the function if any field in the current tab is invalid:
	if (n == 1 && !validateForm()) return false;
	// Hide the current tab:
	x[currentTab].style.display = "none";
	// Increase or decrease the current tab by 1:
	currentTab += n;
	// if you have reached the end of the form... :
	if (currentTab >= x.length) {
		//...the form gets submitted:
		form.submit();
		return false;
	}
	// Otherwise, display the correct tab:
	showTab(currentTab);
}

function showTab(n) {
	// This function will display the specified tab of the form ...
	let x = document.getElementsByClassName("tab");
	x[n].style.display = "block";
	// ... and fix the Previous/Next buttons:
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
	// ... and run a function that displays the correct step indicator:
	fixStepIndicator(n)
}

// Validate this, it is like a breadcrumb
function fixStepIndicator(n) {
	// This function removes the "active" class of all steps...
	let x = document.getElementsByClassName("step");
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(" active", "");
	}
	//... and adds the "active" class to the current step:
	x[n].className += " active";
}

	// Validate the form, I have to study this:

function validateForm() {
	// This function deals with validation of the form fields
	let valid = true;
	let x = document.getElementsByClassName("tab");
	let y = x[currentTab].querySelectorAll(".required");

	// A loop that checks every input field in the current tab:
	for (i = 0; i < y.length; i++) {
		// If a field is empty...
		if (y[i].value == "") {
			// create a conditional to validate the bootstrap select
			if (y[i].classList.contains("selectpicker")) {
				$('.selectpicker').selectpicker('setStyle', 'btn-danger');
			} else {
				// add an "invalid" class to the field:
				y[i].classList.add("invalid")
			}
			// and set the current valid status to false:
			valid = false;
		} else {
			y[i].classList.add("valid")

		}
	}
	// If the valid status is true, mark the step as finished and valid:
	if (valid) {
		document.getElementsByClassName("step")[currentTab].className += " finish";
	}
	return valid; // return the valid status
}