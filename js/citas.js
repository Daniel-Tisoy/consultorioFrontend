function loadData() {
  let request = sendRequest("cita/list", "GET", "");
  let table = document.getElementById("tabla-citas");
  table.innerHTML = "";
  request.onload = function () {
    let data = request.response;
    data.forEach((element) => {
      table.innerHTML += `
         <tr>
              <th scope="row">${element.idCita}</th>
              <td>${element.paciente.documento}</td>
              <td>${element.fecha}</td>
              <td>${element.lugar}</td>
              <td>${element.estado.nombre}</td>
              <td>
                  <button type="button" class="btn btn-primary" onclick="window.location = './form-citas.html?idCita=${element.idCita}'">Editar</button>
                  <button type="button" class="btn btn-danger" onclick="deleteCita(${element.idCita})">Eliminar</button>
                  <button type="button" class="btn btn-secondary" onclick="window.location = './form-diagnostico.html?idCita=${element.idCita}'">Nuevo Diagnostico</button>
              </td>
        </tr>
        `;
    });
  };
  request.onerror = function () {
    table.innerHTML = `
        <tr>
            <td colspan="6"> Error al recuperar los datos.</td>
        <tr>
        `;
  };
}

function deleteCita(idCita) {
  let request = sendRequest("cita/" + idCita, "DELETE", "");
  request.onload = () => loadData();
}

function loadCita(idCita) {
  let request = sendRequest("cita/list/" + idCita, "GET", "");
  let cita = document.getElementById("idCita");
  let paciente = document.getElementById("documento");
  let fechaHora = document.getElementById("fecha-hora");
  let lugar = document.getElementById("lugares");
  let estado = document.getElementById("estado");

  request.onload = function () {
    let data = request.response;
    cita.value = data.idCita;
    paciente.value = data.paciente.documento;
    fechaHora.value = data.fecha;
    lugar.value = data.lugar;
    estado.value = data.estado;
  };
  request.onerror = function () {
    alert("Error al cargar la cita");
  };
}

function loadNewCita(id) {
  let request = sendRequest("paciente/list/" + id, "GET", "");
  let paciente = document.getElementById("documento");
  

  request.onload = function () {
    let data = request.response;
    paciente.value = data.documento;
  };
  request.onerror = function () {
    alert("Error al cargar la cita");
  };
}

function saveCita() {
  let cita = document.getElementById("idCita").value;
  let paciente = document.getElementById("documento").value;
  let fechaHora = document.getElementById("fecha-hora").value;
  let lugar = document.getElementById("lugares").value;
  let estado = document.getElementById("estado").value;

  let data = {
    idCita: cita,
    paciente: { documento: paciente },
    fecha: fechaHora,
    lugar: lugar,
    estado: {
      idEstado: estado,
    },
  };

  let request = sendRequest("cita/", "POST", data);

  request.onload = () => {
    window.location = "./vista-cita.html";
  };
  request.onerror = () => {
    alert("Error al guardar los datos");
  };
}

function searchCitaPaciente() {
  let idPaciente= document.getElementById("idPaciente").value;
  let request = sendRequest("cita/list/paciente/"+idPaciente, "GET", "");
  let table = document.getElementById("tabla-citas");
  table.innerHTML = "";
  request.onload = function () {
    let data = request.response;
    data.forEach((element) => {
      table.innerHTML += `
         <tr>
              <th scope="row">${element.idCita}</th>
              <td>${element.paciente.documento}</td>
              <td>${element.fecha}</td>
              <td>${element.lugar}</td>
              <td>${element.estado.nombre}</td>
              <td>
                  <button type="button" class="btn btn-primary" onclick="window.location = './form-citas.html?idCita=${element.idCita}'">Editar</button>
                  <button type="button" class="btn btn-danger" onclick="deleteCita(${element.idCita})">Eliminar</button>
                  <button type="button" class="btn btn-secondary" onclick="window.location = './form-diagnostico.html?idCita=${element.idCita}'">Nuevo Diagnostico</button>
              </td>
        </tr>
        `;
    });
  };
  request.onerror = function () {
    table.innerHTML = `
        <tr>
            <td colspan="6"> Error al recuperar los datos.</td>
        <tr>
        `;
  };
}

