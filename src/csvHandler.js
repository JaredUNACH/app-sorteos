document.getElementById('csvFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            const rows = text.split('\n');
            const tableBody = document.getElementById('cuerpo_tabla');
            tableBody.innerHTML = ''; // Clear existing rows
            rows.forEach((row, index) => {
                const cols = row.split(',');
                const tr = document.createElement('tr');
                const tdNumber = document.createElement('td');
                tdNumber.textContent = index + 1;
                const tdName = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = cols[0];
                tdName.appendChild(input);
                tr.appendChild(tdNumber);
                tr.appendChild(tdName);
                tableBody.appendChild(tr);
            });
        };
        reader.readAsText(file);
    }
});