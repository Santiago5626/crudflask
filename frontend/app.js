function consulta_general() {
    const url = "http://127.0.0.1:5000/";

    fetch(url)
        .then(response => response.json())
        .then(data => visualizar(data))
        .catch(error => console.error("Error fetching data:", error));

    const visualizar = (data) => {
        console.log("Fetched data:", data);

        let b = "";
        for (let i = 0; i < data.baul.length; i++) {
            console.log(i, data.baul[i].Plataforma);
            console.log(i, data.baul[i].usuario);
            console.log(i, data.baul[i].clave);

            b += `<tr>
                <td>${data.baul[i].id_baul}</td>
                <td>${data.baul[i].Plataforma}</td>
                <td>${data.baul[i].usuario}</td>
                <td>*****</td>  <!-- Se oculta la contraseña -->
                <td>
                    <button type="button" class="btn btn-info" onclick="location.href='edit.html?variable1=${data.baul[i].id_baul}'">
                        <i class="bi bi-pencil-square"></i> <!-- Ícono de edición -->
                    </button>
                    <button type="button" class="btn btn-warning" onclick="eliminar(${data.baul[i].id_baul})">
                        <i class="bi bi-trash"></i> <!-- Ícono de eliminación -->
                    </button>
                </td>
            </tr>`;
        }

        document.getElementById('data').innerHTML = b;
    };
}

function visualizar_general(data) {
    console.log("Fetched data:", data);
    let b = "";
    data.baul.forEach(item => {
        console.log(item.Plataforma, item.usuario, item.clave);
        b += `<tr>
                <td>${item.id_baul}</td>
                <td>${item.Plataforma}</td>
                <td>${item.usuario}</td>
                <td>*****</td>  
                <td>
                    <button type="button" class="btn btn-info" onclick="location.href='edit.html?variable1=${item.id_baul}'">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" class="btn btn-warning" onclick="eliminar(${item.id_baul})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>`;
    });
    document.getElementById("tabla_body").innerHTML = b;
}

function eliminar(id) {
    const url = `http://127.0.0.1:5000/eliminar/${id}`;
    
    fetch(url, { method: 'DELETE' })
        .then(response => response.json())
        .then(res => visualizar_eliminar(res))
        .catch(error => console.error("Error deleting:", error));
}

function visualizar_eliminar(res) {
    swal("Mensaje", `Registro ${res.mensaje} exitosamente`, "success")
        .then(() => window.location.reload());
}

function registrar() {
    const url = "http://127.0.0.1:5000/registro/";
    const data = {
        "plataforma": document.getElementById("plataforma").value,
        "usuario": document.getElementById("usuario").value,
        "clave": document.getElementById("clave").value
    };

    console.log("Data to send:", data);

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
        .then(res => res.json())
        .then(response => visualizar_registro(response))
        .catch(error => console.error("Error registering:", error));
}

function visualizar_registro(response) {
    if (response.mensaje === "Error") {
        swal("Mensaje", "Error en el registro", "error");
    } else {
        swal("Mensaje", "Registro agregado exitosamente", "success");
    }
}

function consulta_individual(id) {
    const url = `http://127.0.0.1:5000/consulta_individual/${id}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => visualizar_individual(data))
        .catch(error => console.error("Error fetching individual data:", error));
}

function visualizar_individual(data) {
    document.getElementById("plataforma").value = data.baul.Plataforma;
    document.getElementById("usuario").value = data.baul.usuario;
    document.getElementById("clave").value = data.baul.clave;
}

function modificar(id) {
    const url = `http://127.0.0.1:5000/actualizar/${id}`;
    const data = {
        "plataforma": document.getElementById("plataforma").value,
        "usuario": document.getElementById("usuario").value,
        "clave": document.getElementById("clave").value
    };

    console.log("Data to update:", data);

    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
        .then(res => res.json())
        .then(response => visualizar_modificacion(response))
        .catch(error => console.error("Error updating:", error));
}

function visualizar_modificacion(response) {
    if (response.mensaje === "Error") {
        swal("Mensaje", "Error en la actualización", "error");
    } else {
        swal("Mensaje", "Registro actualizado exitosamente", "success");
    }
}