// const form = document.getElementById("form")

let typeSelector;
let brandSelector;
let ModelSelector;

let data = [
	'datos.json',
	'tipo_producto.json'
]

let request = data.map(file => fetch(file))

Promise.all(request)
.then(responses => responses)
.then(responses => Promise.all(responses.map(r => r.json())))
.then(users => {
	
	let datos_basicos = users[0].datos_basicos
	let datos_almacen = users[0].datos_almacen
	let fotos = users[0].fotos

	let tipo_producto = users[1]
	
	basicForm(datos_basicos)
	basicForm(datos_almacen)
	basicForm(fotos)

	selectTypeProducts(tipo_producto)
	
	brandSelector = document.getElementById("Marca")
	ModelSelector = document.getElementById("Modelo")
})

const basicForm = arr => {
	
	let formContainer = document.getElementById("formsContainer")
	let form = document.createElement("form")
	form.setAttribute('novalidate', true)
	form.classList.add("needs-validation")
	formContainer.appendChild(form)

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
				input.setAttribute("maxLength", `${e.maxlength}`)
				input.setAttribute("required", `${e.required}`)
				input.classList.add("form-control")
				form.appendChild(input)
				form.appendChild(br2)
				break;
			case "select":
				let select = document.createElement("select")
				let option = document.createElement("option")
				select.setAttribute("required", `${e.required}`)
				option.innerHTML = "Seleccione un item"
				option.value = "";
				select.setAttribute("id", `${e.name}`)
				select.setAttribute("data-live-search", "true")
				select.classList.add("selectpicker")
				select.appendChild(option)
				form.appendChild(select)
				form.appendChild(br2)
				break;
			case "textarea":
				let textarea = document.createElement("textarea")
				textarea.setAttribute("maxLength", `${e.maxlength}`)
				textarea.classList.add("form-control")
				form.appendChild(textarea)
				form.appendChild(br2)
				break;
			case "date":
				input.setAttribute("type", `${e.type}`)
				input.setAttribute("required", `${e.required}`)
				input.classList.add("form-control")
				form.appendChild(input)
				form.appendChild(br2)
				break;
			case "number":
				input.setAttribute("type", `${e.type}`)
				input.setAttribute("maxLength", `${e.maxlength}`)
				input.setAttribute("required", `${e.required}`)
				input.classList.add("form-control")
				form.appendChild(input)
				form.appendChild(br2)
		}
	}

	let input = document.createElement("input")
	input.setAttribute("type", "submit")
	input.classList.add("btn", "btn-primary")
	form.appendChild(input)
	form.appendChild(document.createElement("br"))
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
		ModelSelector.removeAttribute("required")
	} else {
		ModelSelector.setAttribute("required", "true")
	}
	if (typeSelector != 0 && brandSelector.length <= 1) {
		brandSelector.removeAttribute("required")
	} else {
		brandSelector.setAttribute("required", "true")
	}
}

// form validation bootstrap
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

