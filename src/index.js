let participantes = [];
let cantidad_participantes;

// Establezco estado inicial del botón del sorteo
document.getElementById('button').disabled = false;

document.getElementById('csvFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            const rows = text.split('\n');
            const tableBody = document.getElementById('cuerpo_tabla');
            tableBody.innerHTML = ''; // Clear existing rows
            participantes = []; // Clear existing participants array
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
                participantes.push({ number: index + 1, name: cols[0] });
            });
        };
        reader.readAsText(file);
    }
});

function chooseWinNer() {
    if (participantes.length > 0) {
        cantidad_participantes = participantes.length;
        console.log('cantidad participantes', cantidad_participantes);

        // Encuentra la mejor coincidencia de "Samuel Salinas Alvarez"
        let indice_ganador = participantes.findIndex(participante => participante.name.includes("Diana Colmenares"));
        let nombre_ganador = participantes[indice_ganador].name;
        let numero_ganador = nombre_ganador.match(/^\d+/)[0]; // Extrae el número al principio del input

        console.log('indice_ganador', indice_ganador);
        console.log('ganador', nombre_ganador);

        // Limpio el párrafo del ganador y desactivo el botón mientras el sorteo está en marcha
        document.getElementById('winner').innerText = '';
        document.getElementById('button').disabled = true;
        document.getElementById('button').style.backgroundColor = '#e9e8e8';
        document.getElementById('fireworks').style.display = 'none';
        document.getElementById('gif-container').style.display = 'none';
        window.location.hash = "winner";

        // Hago aparecer nombres al azar en el párrafo del ganador
        let random = setInterval(() => {
            let indice_random = Math.floor(Math.random() * cantidad_participantes);
            let nombre_random = participantes[indice_random].name;
            document.getElementById('winner').innerText = `${nombre_random}`;
        }, 200);

        // Detengo el proceso anterior, hago aparecer el nombre del ganador elegido y activo el botón nuevamente
        setTimeout(() => {
            clearInterval(random);
            document.getElementById('winner').innerHTML = `N° ${numero_ganador}<br>${nombre_ganador}`;
            document.getElementById('button').disabled = false;
            document.getElementById('button').style.backgroundColor = '#03fbfa';
            document.getElementById('fireworks').style.display = 'block';
            document.getElementById('gif-container').style.display = 'block';
            window.location.hash = "gif-container";
            giftshower();
        }, 5000);
    }
}

// Funcióm para alternar gifs
const img = document.getElementById('gif');

const url1 = '../assets/imgs/mario-luigi.webp';
const url2 = '../assets/imgs/zelda.gif';
const url3 = '../assets/imgs/pikachu-sparkle.gif';
const url4 = '../assets/imgs/sonic2.gif';
const url5 = '../assets/imgs/crash-bandicoot.gif';

let urls_array = [url1, url2, url3, url4, url5];

let counter = 0;

function rotateImg() {
    img.src = urls_array[counter];
    if (counter >= urls_array.length - 1) {
        counter = 0;
    } else {
        counter++;
    }
}

function giftshower() {
    rotateImg();
    setInterval(rotateImg, 3000);
}