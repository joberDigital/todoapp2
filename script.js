// --- Utilidad para seleccionar elementos ---
const $ = (sel) => document.querySelector(sel);

document.addEventListener("DOMContentLoaded", () => {
  $("#btnCrearPagina").addEventListener("click", crearPagina);
  $("#btnListarPaginas").addEventListener("click", listarPaginas);
  $("#btnExportar").addEventListener("click", exportarPaginas);
  $("#btnImportar").addEventListener("click", importarPaginas);

  listarPaginas();
});

// --- Simulación de almacenamiento local (sin servidor) ---
function cargarPaginas() {
  const data = localStorage.getItem("paginas");
  return data ? JSON.parse(data) : [];
}

function guardarPaginas(paginas) {
  localStorage.setItem("paginas", JSON.stringify(paginas));
}

// --- Crear página ---
async function crearPagina() {
  const titulo = $("#titulo").value.trim() || "Página sin título";
  const mensaje = $("#mensaje").value.trim() || "Mensaje por defecto";
  let colorFondo = $("#colorFondo").value.trim();

  if (!colorFondo || colorFondo === "#ffffff") {
    colorFondo = colorAleatorio();
  }

  const paginas = cargarPaginas();

  const nombre = `page${Date.now()}`;
  const nuevaPagina = { nombre, titulo, mensaje, colorFondo, fecha: new Date().toISOString() };

  paginas.push(nuevaPagina);
  guardarPaginas(paginas);

  $("#resultado").textContent = `✅ Página "${titulo}" creada con color ${colorFondo}`;
  listarPaginas();
}

// --- Listar páginas ---
async function listarPaginas() {
  const paginas = cargarPaginas();
  const ul = $("#listaPaginas");
  ul.innerHTML = "";

  paginas.forEach((page) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${page.nombre}`;
    a.textContent = `${page.titulo} (${page.nombre})`;

    // Vista previa al hacer clic
    a.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarPagina(page);
    });

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "❌";
    btnDelete.style.marginLeft = "10px";
    btnDelete.addEventListener("click", () => {
      eliminarPagina(page.nombre);
    });

    li.appendChild(a);
    li.appendChild(btnDelete);
    ul.appendChild(li);
  });
}

// --- Mostrar página (simulada) ---
function mostrarPagina(page) {
  const vista = $("#vistaPagina");
  vista.innerHTML = `
    <div style="background:${page.colorFondo};padding:20px;border-radius:12px">
      <h2>${page.titulo}</h2>
      <p>${page.mensaje}</p>
      <small>${new Date(page.fecha).toLocaleString()}</small>
    </div>
  `;
}

// --- Eliminar página ---
function eliminarPagina(nombre) {
  let paginas = cargarPaginas();
  paginas = paginas.filter((p) => p.nombre !== nombre);
  guardarPaginas(paginas);
  listarPaginas();
  $("#resultado").textContent = `🗑️ Página ${nombre} eliminada`;
}

// --- Color aleatorio ---
function colorAleatorio() {
  const random = Math.floor(Math.random() * 16777215).toString(16);
  return `#${random.padStart(6, "0")}`;
}

// --- Exportar (backup) ---
function exportarPaginas() {
  const paginas = cargarPaginas();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(paginas, null, 2));
  const link = document.createElement("a");
  link.href = dataStr;
  link.download = "backup_paginas.json";
  link.click();
}

// --- Importar ---
function importarPaginas() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const nuevas = JSON.parse(e.target.result);
        if (!Array.isArray(nuevas)) throw new Error("Formato inválido");
        guardarPaginas(nuevas);
        listarPaginas();
        $("#resultado").textContent = `📦 ${nuevas.length} páginas importadas`;
      } catch (err) {
        $("#resultado").textContent = "❌ Error al importar archivo JSON";
        console.error(err);
      }
    };
    reader.readAsText(file);
  });

  input.click();
}







//_______________________
//_______________________
//file using with page html  // index inter commit


// const $ = (sel) => document.querySelector(sel);

// document.addEventListener("DOMContentLoaded", () => {
//   $("#btnCrearPagina").addEventListener("click", crearPagina);
//   $("#btnListarPaginas").addEventListener("click", listarPaginas);
//   listarPaginas();
// });

// function colorAleatorio() {
//   const random = Math.floor(Math.random() * 16777215).toString(16);
//   return `#${random.padStart(6, "0")}`;
// }

// function cargarPaginas() {
//   return JSON.parse(localStorage.getItem("paginas") || "[]");
// }

// function guardarPaginas(paginas) {
//   localStorage.setItem("paginas", JSON.stringify(paginas));
// }

// function crearPagina() {
//   const titulo = $("#titulo").value.trim() || "Página sin título";
//   const mensaje = $("#mensaje").value.trim() || "Sin mensaje";
//   const color = $("#colorFondo").value.trim() === "#ffffff" ? colorAleatorio() : $("#colorFondo").value.trim();

//   const nombre = `page${Date.now()}`;
//   const nueva = { nombre, titulo, mensaje, colorFondo: color };

//   const paginas = cargarPaginas();
//   paginas.push(nueva);
//   guardarPaginas(paginas);

//   $("#resultado").textContent = `✅ Página "${titulo}" creada con éxito.`;
//   listarPaginas();
// }

// function listarPaginas() {
//   const paginas = cargarPaginas();
//   const ul = $("#listaPaginas");
//   ul.innerHTML = "";

//   paginas.forEach((page) => {
//     const li = document.createElement("li");
//     li.style.background = page.colorFondo + "20";

//     const a = document.createElement("a");
//     a.textContent = page.titulo;
//     a.href = `page.html?nombre=${page.nombre}`;

//     const btnDelete = document.createElement("button");
//     btnDelete.textContent = "❌";
//     btnDelete.addEventListener("click", () => eliminarPagina(page.nombre));

//     li.appendChild(a);
//     li.appendChild(btnDelete);
//     ul.appendChild(li);
//   });
// }

// function eliminarPagina(nombre) {
//   const paginas = cargarPaginas().filter((p) => p.nombre !== nombre);
//   guardarPaginas(paginas);
//   listarPaginas();
// }
