function loadData() {
  let request = sendRequest("paciente/list", "GET", "");
  let table = document.getElementById("tabla-pacientes");
  table.innerHTML = "";
  request.onload = function () {
    let data = request.response;
    data.forEach((element) => {
      table.innerHTML += `
            <tr>
          <th scope="row">${element.documento}</th>
          <td>${element.nombre}</td>
          <td>${element.apellido}</td>
          <td>${element.sexo}</td>
          <td>${element.fechaNacimiento}</td>
          <td>${element.eps}</td>
          <td>
          <button type="button" class="btn btn-primary" onclick="window.location = './form-paciente.html?documento=${element.documento}&update=true'">Editar</button>
          <button type="button" class="btn btn-danger" onclick="deleteUser(${element.documento})">Eliminar</button>
          <button type="button" class="btn btn-secondary" onclick="window.location = './form-citas.html?paciente=${element.documento}'">Crear cita</button>
        </td>
        </tr>
            `;
    });
  };
  request.onerror = function () {
    table.innerHTML = `
        <tr>
            <td colspan="7"> Error al recuperar los datos.</td>
        <tr>
        `;
  };
}
function deleteUser(documento) {
  let request = sendRequest("paciente/" + documento, "DELETE", "");
  request.onload = function () {
    loadData();
  };
}
function loadUser(idPaciente) {
  let request = sendRequest("paciente/list/" + idPaciente, "GET", "");
  let documento = document.getElementById("documento");
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let fechaNacimiento = document.getElementById("fecha-hora");
  let sexo = document.getElementById("sexo");
  let eps = document.getElementById("eps");

  request.onload = function () {
    let data = request.response;
    documento.value = data.documento;
    nombre.value = data.nombre;
    apellido.value = data.apellido;
    fechaNacimiento.value = data.fechaNacimiento;
    sexo.value = data.sexo;
    eps.value = data.eps;
  };

  request.onerror = function () {
    alert("Error al recuperar los datos");
  };
}
//save user recibe "POST o PUT"
function saveUser() {
  let documento = parseInt(document.getElementById("documento").value);
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let fechaNacimiento = document.getElementById("fecha-hora").value;
  let sexo = document.getElementById("sexo").value;
  let eps = document.getElementById("eps").value;
  let data = {
    documento: documento,
    nombre: nombre,
    apellido: apellido,
    historia: null,
    sexo: sexo,
    fechaNacimiento: fechaNacimiento,
    eps: eps,
  };

  const urlParams = new URLSearchParams(window.location.search);
  let userExist = ()=> urlParams.get("uptate")!=null;
  let request = sendRequest(
    "paciente/",
    userExist() ? "PUT" : "POST",
    data
  );
  request.onload = function () {
    window.location = "./vista-paciente.html";
  };
  request.onerror = function () {
    alert("Error al guardar los cambios");
  };
}
