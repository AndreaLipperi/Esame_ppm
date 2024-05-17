function showHideGrid(id) {
    var gridContainer = document.getElementById(id);
    var tipoDisplay = window.getComputedStyle(gridContainer, null).getPropertyValue('display');
    if(tipoDisplay === "none"){
        gridContainer.style.display = "grid";
    } else{
        CloseGrid(id);
    }
}
function ControllerDoubleGrid(id_to_open, id_to_close) {
    var grid_to_open = document.getElementById(id_to_open);
    CloseGrid(id_to_close);
    rotateArrow(id_to_close, 0);
    var tipoDisplay_open = window.getComputedStyle(grid_to_open, null).getPropertyValue('display');
    if(tipoDisplay_open === "none"){
        grid_to_open.style.display = "grid";
        rotateArrow(id_to_open, 180);
    } else {
        CloseGrid(id_to_open);
        rotateArrow(id_to_open, 360);
    }
}
function rotateArrow(id, rotation) {
    var id_arrow = id + '_arrow';
    var arrow = document.getElementById(id_arrow);
    arrow.style.transform = 'rotate('+rotation+'deg)';
    arrow.style.transition = 'transform 0.4s ease';

}
function CloseGrid(id){
    var gridContainer = document.getElementById(id);
    gridContainer.style.display = "none";
}
function Ricerca() {
    var input = document.querySelector('.search-box').value.toLowerCase(); // Otteniamo il valore digitato nell'input e lo convertiamo in minuscolo
    var gridItems = document.querySelectorAll('.grid-item-city'); // Selezioniamo tutte le celle della grid-container city

    gridItems.forEach(function(item) { // Iteriamo su ogni cella
        var cityName = item.textContent.toLowerCase(); // Otteniamo il testo della cella e lo convertiamo in minuscolo
        if (cityName.includes(input)) { // Verifichiamo se il testo della cella include la parola digitata
            item.style.display = "block"; // Se sì, mostralo
        } else {
            item.style.display = "none"; // Altrimenti, nascondilo
        }
    });
}
// Funzione per cambiare il colore del testo
function cambiaOpacityDot() {
    // Ottieni l'elemento del testo dal DOM
    var dot = document.getElementById("ultimora_dot");
    var opacityValue = 0;
    var increasing = true;

    setInterval(function() {
        if (increasing) {
            opacityValue += 0.1;
            if (opacityValue >= 1) {
                increasing = false;
            }
        } else {
            opacityValue -= 0.1;
            if (opacityValue <= 0) { // Limita la sfocatura minima a 0px
                increasing = true;
            }
        }
        dot.style.opacity = opacityValue;
    }, 100);
}

document.addEventListener("DOMContentLoaded", function() {
    cambiaOpacityDot();
});
function openCloseSubsection(id) {
    var subsection = document.getElementById(id);
    var tipoDisplay = window.getComputedStyle(subsection, null).getPropertyValue('display');
    var menu = document.getElementById("menu_piepagina"); // Aggiungiamo il footer
    var form = document.getElementById("contenitore_pagina"); // Aggiungiamo il footer

    const screenWidth = window.innerWidth;

    if (tipoDisplay == "none") {
        subsection.style.display = "grid";
        var altezzaGrid = subsection.offsetHeight; // Altezza della grid

        var attuale_marginTop = parseInt(window.getComputedStyle(menu, null).getPropertyValue('margin-top'));

        var attuale_height = parseInt(window.getComputedStyle(menu, null).getPropertyValue('height'));

        var attuale_padding = parseInt(window.getComputedStyle(form, null).getPropertyValue('padding-bottom'));

        var nuovoMargin = attuale_marginTop + altezzaGrid; // Decremento del padding di 10px
        var nuovoHeight = attuale_height + altezzaGrid;
        var nuovoPadding= attuale_padding + altezzaGrid;
        // Aggiorniamo la posizione del footer
        menu.style.marginTop = nuovoMargin + "px";
        menu.style.height = nuovoHeight + "px";
        form.style.paddingBottom = nuovoPadding + "px";
        rotateArrow(id, 180);


    } else {
        var altezzaGrid = subsection.offsetHeight; // Altezza della grid

        var attuale_marginTop = parseInt(window.getComputedStyle(menu, null).getPropertyValue('margin-top'));

        var attuale_height = parseInt(window.getComputedStyle(menu, null).getPropertyValue('height'));

        var attuale_padding = parseInt(window.getComputedStyle(form, null).getPropertyValue('padding-bottom'));

        var nuovoMargin = attuale_marginTop - altezzaGrid; // Decremento del padding di 10px
        var nuovoHeight = attuale_height - altezzaGrid;
        var nuovoPadding= attuale_padding - altezzaGrid;

        menu.style.marginTop = nuovoMargin + "px";
        menu.style.height = nuovoHeight + "px";
        form.style.paddingBottom = nuovoPadding + "px";

        subsection.style.display = "none";
        rotateArrow(id, 360);
    }
}
function cambiaStilePie() {
    var larghezzaFinestra = window.innerWidth;
    var menu = document.getElementById("menu_piepagina"); // Aggiungiamo il footer
    var form = document.getElementById("contenitore_pagina"); // Aggiungiamo il footer

    // Cambia lo stile in base alla larghezza della finestra
    if (larghezzaFinestra > 1049) {
        CloseGrid("categorie");
        CloseGrid("abbonamenti");
        CloseGrid("pubblicita_pie");
        menu.style.marginTop = "2%";
        menu.style.height = "20%";
        form.style.paddingBottom = "40%";
    } else if(larghezzaFinestra<=1049 && larghezzaFinestra>=481){
        menu.style.marginTop = "1%";
        menu.style.height = "20%";
        form.style.paddingBottom = "80%";
    }
}
window.onload = cambiaStilePie;
window.onresize = cambiaStilePie;
document.addEventListener("DOMContentLoaded", function() {
    window.onscroll = function() { mostraDiv() };
    var nascostoDiv = document.getElementById("intestazione_nascosta");

    function mostraDiv() {
        if (window.scrollY > 15) {
            nascostoDiv.style.display = "flex";
        } else {
            nascostoDiv.style.display = "none";
        }
    }

});
var searchInput = document.querySelector('.search-box');

// Aggiungi un gestore degli eventi per l'evento di clic sull'input
searchInput.addEventListener('click', function(event) {
    // Impedisci la propagazione dell'evento per evitare che la griglia si nasconda
    event.stopPropagation();
});

function HideGrid(id) {
    var gridContainer = document.getElementById(id);
    var isHovered = false;
    gridContainer.addEventListener("mouseenter", function() {
        isHovered = true;
    });
    gridContainer.addEventListener("mouseleave", function() {
        isHovered = false;
    });
    // Aggiunta gestione eventi touch per dispositivi mobili
    gridContainer.addEventListener("touchstart", function() {
        isHovered = true;
    });

    gridContainer.addEventListener("touchend", function() {
        isHovered = false;
    });
    setTimeout(function() {
        if (!isHovered) {
            gridContainer.style.display = "none";
            rotateArrow(id, 360);
        }
    }, 500);
}

