
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
          <button type="button" class="btn btn-primary" onclick="window.location = '/form-paciente.html?documento=${element.documento}'">Editar</button>
          <button type="button" class="btn btn-danger" onclick="deleteUser(${element.documento})">Eliminar</button>
        </td>
        </tr>
            `;
    });
  }
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
