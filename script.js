const $ = (sel) => document.querySelector(sel);

document.addEventListener("DOMContentLoaded", () => {
  $("#btnCrearPagina").addEventListener("click", crearPagina);
  $("#btnListarPaginas").addEventListener("click", listarPaginas);
  listarPaginas();
});

function colorAleatorio() {
  const random = Math.floor(Math.random() * 16777215).toString(16);
  return `#${random.padStart(6, "0")}`;
}

function cargarPaginas() {
  return JSON.parse(localStorage.getItem("paginas") || "[]");
}

function guardarPaginas(paginas) {
  localStorage.setItem("paginas", JSON.stringify(paginas));
}

function crearPagina() {
  const titulo = $("#titulo").value.trim() || "Página sin título";
  const mensaje = $("#mensaje").value.trim() || "Sin mensaje";
  const color = $("#colorFondo").value.trim() === "#ffffff" ? colorAleatorio() : $("#colorFondo").value.trim();

  const nombre = `page${Date.now()}`;
  const nueva = { nombre, titulo, mensaje, colorFondo: color };

  const paginas = cargarPaginas();
  paginas.push(nueva);
  guardarPaginas(paginas);

  $("#resultado").textContent = `✅ Página "${titulo}" creada con éxito.`;
  listarPaginas();
}

function listarPaginas() {
  const paginas = cargarPaginas();
  const ul = $("#listaPaginas");
  ul.innerHTML = "";

  paginas.forEach((page) => {
    const li = document.createElement("li");
    li.style.background = page.colorFondo + "20";

    const a = document.createElement("a");
    a.textContent = page.titulo;
    a.href = `page.html?nombre=${page.nombre}`;

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "❌";
    btnDelete.addEventListener("click", () => eliminarPagina(page.nombre));

    li.appendChild(a);
    li.appendChild(btnDelete);
    ul.appendChild(li);
  });
}

function eliminarPagina(nombre) {
  const paginas = cargarPaginas().filter((p) => p.nombre !== nombre);
  guardarPaginas(paginas);
  listarPaginas();
}
