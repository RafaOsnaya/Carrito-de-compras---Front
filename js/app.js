//Variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listarCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventsListener();

function cargarEventsListener() {
  //Cuando se agrega un curso presionando 'Agregar al carrito'
  listarCursos.addEventListener("click", agregarCurso);

  //elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //Reseteamos el arreglo de carrito

    limpiarHTML(); // Limpiamos el HTML
  });
}

//Funciones
function agregarCurso(event) {
  //Evita la accion por defecto
  event.preventDefault();

  const cursoSeleccionado = event.target.parentElement.parentElement;

  if (event.target.classList.contains("agregar-carrito")) {
    //console.log();
    leerDatosCurso(cursoSeleccionado);
  }
}

//Eliminar un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //Elimina del arreglo articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    //itera sobre el carrito y muestra el html (refresh)
    carritoHTML();
  }
}

//Lee el contenido de la card HTML seleccionada con el boton agregar al carrito y extrae la informacion
function leerDatosCurso(curso) {
  //console.log(curso);

  //Objeto creado con la informacion de elemento seleccionado
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un curso ya esta en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso; // retorna los objetos no duplicados
      }
    });

    articulosCarrito = [...cursos];
  } else {
    //Agregamos al carrito
    //Agregamos elementos al carrito
    //Se pasa una copia de articulo carrito para no perder la referencia al agregar mas articulos

    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
  }

  //Llamamos a la funcion carrito HTML
  carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
  //Limpiar Carrito HTML
  limpiarHTML();

  //Recorre el carrito y limpia el html
  articulosCarrito.forEach((curso) => {
    //Para no utilizar carrito.titulo etc
    const { imagen, titulo, precio, cantidad, id } = curso;

    //variable para crar el elemento tr
    const row = document.createElement("tr");

    //Insertar codigo html con la articulo seleccionado
    row.innerHTML = `

    <td> <img src="${imagen}" width="100"> </td>
    <td> ${titulo} </td>
    <td> ${precio} </td>
    <td> ${cantidad} </td>
    <td> <a href = "#" class="borrar-curso" data-id="${curso.id}"> X </a> </td>
    `;

    //Agrega el html del carrito en el tbody de la tabla lista carrito
    contenedorCarrito.appendChild(row);
  });
}

//Elimina los curos del tbody del html listacarrito
function limpiarHTML() {
  //Forma Lenta
  //contenedorCarrito.innerHTML = "";

  /*Mientras exista un hijo se eliminara por el primero, es mas rapido que con html*/
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
