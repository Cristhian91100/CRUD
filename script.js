document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('addBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const dataForm = document.getElementById('dataForm');
    const dataTable = document.getElementById('dataTable');
    const dataBody = document.getElementById('dataBody');

    let data = [];

    // Mostrar modal al hacer clic en Nuevo
    addBtn.addEventListener('click', function () {
        modal.style.display = 'block';
        dataForm.reset();
    });

    // Ocultar modal al hacer clic en la X
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Ocultar modal al hacer clic fuera de él
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Mostrar datos en la tabla
    function displayData() {
        dataBody.innerHTML = '';
        data.forEach(function (item, index) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>
                    <button class="editBtn" data-index="${index}">Editar</button>
                    <button class="deleteBtn" data-index="${index}">Eliminar</button>
                </td>
            `;
            dataBody.appendChild(row);
        });

        // Agregar eventos a los botones de editar y eliminar
        const editButtons = document.querySelectorAll('.editBtn');
        const deleteButtons = document.querySelectorAll('.deleteBtn');

        editButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                editData(index);
            });
        });

        deleteButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                deleteData(index);
            });
        });
    }

    // Agregar o editar datos
    dataForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(dataForm);
        const name = formData.get('name');

        if (name.trim() === '') {
            alert('Por favor, ingrese un nombre válido.');
            return;
        }

        const dataIndex = dataForm.getAttribute('data-index');

        if (dataIndex !== null) {
            // Editar datos existentes
            data[dataIndex].name = name;
        } else {
            // Agregar nuevos datos
            data.push({ name });
        }

        modal.style.display = 'none';
        dataForm.reset();
        displayData();
    });

    // Editar datos existentes
    function editData(index) {
        const item = data[index];
        dataForm.setAttribute('data-index', index);
        document.getElementById('name').value = item.name;
        modal.style.display = 'block';
    }

    // Eliminar datos
    function deleteData(index) {
        if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
            data.splice(index, 1);
            displayData();
        }
    }

    // Mostrar datos iniciales
    displayData();
});
