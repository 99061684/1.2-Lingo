//https://codepen.io/KSayrs/pen/KgObmK

//vaste variabelen (deze worden alleen veranderd door de code/functies).
var user_input = document.getElementById("user_input"); 
var submit_button = document.getElementById("submit_button"); 

var woord = words[Math.round(Math.random() * words.length) + 1];
console.log(woord);
var woord2 = "";
var rij_nummer = 0;

//de id en classes van sommige elementen in de html.
const id_rij = "rij"; //het id van elke rij (excl. de rijnummer).
const class_letter = "letter"; //de class van elke letter div.
const id_pagina_elementen = ["speelbord", "background_lingo", "woord_check", "gemaakt_door", "form", "user_input", "submit_button"];

//  game variabelen (deze kunnen worden aangepast om het spel onder andere een andere moeilijkheidsgraad te geven).
var aantal_letters = 5; //het aantal letters waaruit het woord dat geraden moet worden bestaat.
const aantal_rijen = 5; //het aantal rijen en pogingen die je hebt om te raden.
const letter_index = 0; //de index van het nummer dat je wil laten zien.

//de kleuren van de letters na het checken.
const color_correct = "green"; 
const color_wrong_place = "yellow";
const color_normal = "white";

start_game();

//start
function start_game() {
    create_pagina();

    get_aantal_letters();
    create_spelbord(aantal_rijen, aantal_letters, id_rij);
    toon_letter(aantal_rijen, id_rij, letter_index);
    user_input_enter_event();
}

//checken
function check_woord() {
    woord2 = user_input.value;
    woord = woord.toLowerCase();
    woord2 = woord2.toLocaleLowerCase();

    if (rij_nummer >= (aantal_rijen + 1)) {
        alert("het woord is niet goed geraden en alle pogingen zijn gedaan. Het woord was: " + woord);
    } else if (woord.length != aantal_letters) {
        alert("het woord dat geraden moet worden moet bestaan uit " + aantal_letters + " letters");
    } else if (woord2.length == 0) {
        alert("vul een woord in om het woord te raden");
    } else if (woord2.length != aantal_letters) {
        alert("het woord moet bestaan uit " + aantal_letters + " letters");
    } else {
        rij_nummer++;
        if (woord == woord2) {
            for (var e = 0; e < woord.length; e++) {
                var letter_woord = woord.charAt(e);
                var letter_woord2 = woord2.charAt(e);

                document.getElementById("letter" + (e + 1) + "rij" + rij_nummer).innerHTML = letter_woord2;
                document.getElementById("letter" + (e + 1) + "rij" + rij_nummer).style.backgroundColor = color_correct;
            }
            alert("het woord is goed geraden. Het woord was: " + woord);
        } else {

            var woord_kopie = woord.substring();
            for (var i = 0; i < woord.length; i++) {
                var letter_woord = woord.charAt(i);
                var letter_woord2 = woord2.charAt(i);

                document.getElementById("letter" + (i + 1) + "rij" + rij_nummer).innerHTML = letter_woord2;

                if (letter_woord == letter_woord2) {
                    document.getElementById("letter" + (i + 1) + "rij" + rij_nummer).style.backgroundColor = color_correct;
                    woord_kopie = woord_kopie.replace(letter_woord2, "");
                }
            }
            for (var i = 0; i < woord.length; i++) {
                var letter_woord2 = woord2.charAt(i);
                var include = woord_kopie.includes(letter_woord2);

                document.getElementById("letter" + (i + 1) + "rij" + rij_nummer).innerHTML = letter_woord2;

                if (include && document.getElementById("letter" + (i + 1) + "rij" + rij_nummer).style.backgroundColor != color_correct) {
                    document.getElementById("letter" + (i + 1) + "rij" + rij_nummer).style.backgroundColor = color_wrong_place;
                    woord_kopie = woord_kopie.replace(letter_woord2, "");
                }
            }

            if (rij_nummer >= aantal_rijen) {
                alert("het woord is niet goed geraden en alle pogingen zijn gedaan. Het woord was: " + woord);
            } 
        }
    }    
}

//creëren elementen
function create_spelbord(aantal_rijen, aantal_letters, id_rij) {
    for (var a = 1; a < (aantal_rijen + 1); a++) {
        create_element(id_rij + a, aantal_letters);
    }
}

function create_element(id_rij, aantal_letters) {
    var woord_check = document.getElementById("woord_check");
    var element = document.createElement("div");
    element.id = id_rij;    
    woord_check.appendChild(element);

    for (var a = 1; a < (aantal_letters + 1); a++) {
        var element_letter = document.createElement("div");
        element_letter.className = class_letter;
        element_letter.id = "letter" + a + id_rij;
        element_letter.innerHTML = a;  

        var element_div = document.getElementById(id_rij);   
        element_div.appendChild(element_letter);
    }
}

function create_element2(element_create, id_append, id_element, text) {
    var element = document.createElement(element_create);
    element.id = id_element;    
    if (text != null) {
        element.innerHTML = text; 
    } 
    
    if (id_append == "body") {
        document.body.appendChild(element);
    } else {
        var element_append = document.getElementById(id_append);
        element_append.appendChild(element);   
    }
}

function create_input(element_create, id_append, id_element, type, text, placeholder) {
    var element = document.createElement(element_create);
    element.id = id_element;    
    element.type = type; 
    if (text != "" && text != null) {
        element.innerHTML = text; 
    } 
    if (placeholder != "" && placeholder != null) {
        element.placeholder = placeholder;
    } 
    
    if (id_append == "body") {
        document.body.appendChild(element);
    } else {
        var element_append = document.getElementById(id_append);
        element_append.appendChild(element);   
    }
}

function create_pagina() {
    create_element2("div", "body", id_pagina_elementen[0]);
    create_element2("div", id_pagina_elementen[0], id_pagina_elementen[1]);
    create_element2("div", id_pagina_elementen[0], id_pagina_elementen[2]);
    create_element2("p", id_pagina_elementen[2], id_pagina_elementen[3], "gemaakt door: Bas Verdoorn");
    create_element2("div", id_pagina_elementen[1], id_pagina_elementen[4]);
    create_input("input", id_pagina_elementen[4], id_pagina_elementen[5], "text", "", "raad hier het woord...");
    create_input("button", id_pagina_elementen[4], id_pagina_elementen[6], "submit", "check");

    //vaste variabelen (deze kunnen alleen veranderden door de code/functies).
    user_input = document.getElementById(id_pagina_elementen[5]); 
    submit_button = document.getElementById(id_pagina_elementen[6]); 

    submit_button.onclick = function() {
        check_woord();        
    };
}


//speciale instellingen
function toon_letter(aantal_rijen, id_rij, letter_index) {
    for (let a = 1; a < (aantal_rijen + 1); a++) {
        var letter_woord = woord.charAt(letter_index);
        document.getElementById("letter" + (letter_index + 1) + id_rij + a).innerHTML = letter_woord;
    }
}

function get_aantal_letters() {
    aantal_letters = woord.length;
}

function user_input_enter_event() {
    // Execute a function when the user releases a key on the keyboard
    user_input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      submit_button.click();
    }
  });
}

//hulp functies 
// get all indexes of a given value in an array
var getAllIndexes = function(array, value) {
    var indexes = [], i;
    for(i = 0; i < array.length; i++) {
        if (array[i] === value) {
            indexes.push(i);
        } 
    }
    return indexes;
}











