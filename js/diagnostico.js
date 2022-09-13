function loadData() {
  let request = sendRequest("diagnostico/list", "GET", "");
  let table = document.getElementById("tabla-diagnosticos");
  table.innerHTML = "";
  request.onload = function () {
    let data = request.response;
    data.forEach((element) => {
      table.innerHTML += `
           <tr>
                <th scope="row">${element.idDiagnostico}</th>
                <td>${element.cita.idCita}</td>
                <td>${
                  element.paciente.nombre + " " + element.paciente.apellido
                }</td>
                <td>${element.paciente.documento}</td>
                <td>${
                  element.medico.nombre + " " + element.medico.apellido
                }</td>
                <td>${element.titulo}</td>
                <td>${element.observacion}</td>
                <td>
                    <button type="button" class="btn btn-primary" onclick="window.location = './form-diagnostico.html?idDiagnostico=${
                      element.idDiagnostico
                    }'">Editar</button>
                    <button type="button" class="btn btn-danger" onclick="deleteDiagnostico(${
                      element.idDiagnostico
                    })">Eliminar</button>
                    <button type="button" class="btn btn-secondary" onclick="window.location = './form-citas.html?idCita=${
                      element.cita.idCita
                    }'">Cita</button>
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
function deleteDiagnostico(idDiagnostico) {
  let request = sendRequest("diagnostico/" + idDiagnostico, "DELETE", "");
  request.onload = () => loadData();
}

function loadNewDiagnostico(id) {
  let request = sendRequest("cita/list/" + id, "GET", "");
  let idCita = document.getElementById("cita");
  let idPaciente = document.getElementById("documento");

  request.onload = function () {
    let data = request.response;
    idCita.value = data.idCita;
    idPaciente.value = data.paciente.documento;
  };
  request.onerror = function () {
    alert("Error al cargar la cita");
  };
}
function loadDiagnostico(id) {
  let request = sendRequest("diagnostico/list/" + id, "GET", "");
  let idDiagnostico = document.getElementById("diagnostico");
  let idCita = document.getElementById("cita");
  let idPaciente = document.getElementById("documento");
  let idMedico = document.getElementById("idMedico");
  let titulo = document.getElementById("titulo");
  let observacion = document.getElementById("observacion");

  request.onload = function () {
    let data = request.response;
    idDiagnostico.value = data.idDiagnostico;
    idCita.value = data.cita.idCita;
    idPaciente.value = data.paciente.documento;
    idMedico.value = data.medico.idUsuario;
    titulo.value = data.titulo;
    observacion.value = data.observacion;
  };
  request.onerror = function () {
    alert("Error al cargar la cita");
  };
}

function saveDiagnostico() {
  let idDiagnostico = document.getElementById("diagnostico").value;
  let idCita = document.getElementById("cita").value;
  let idPaciente = document.getElementById("documento").value;
  let idMedico = document.getElementById("idMedico").value;
  let titulo = document.getElementById("titulo").value;
  let observacion = document.getElementById("observacion").value;

  let data = {
    idDiagnostico: idDiagnostico,
    cita: { idCita: idCita },
    paciente: {
      documento: idPaciente,
    },
    medico: {
      idUsuario: idMedico,
    },
    titulo: titulo,
    observacion: observacion,
  };

  let request = sendRequest(
    "diagnostico/",
    idDiagnostico ? "PUT" : "POST",
    data
  );

  request.onload = () => {
    window.location = "./vista-diagnostico.html";
  };
  request.onerror = () => {
    alert("Error al guardar los datos");
  };
}
