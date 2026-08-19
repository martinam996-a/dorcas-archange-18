/* =========================================================
   NAVIGAZIONE SCHERMATE
   ========================================================= */

function showScreen(screenId) {

  const screens = document.querySelectorAll('.screen');

  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  const nextScreen = document.getElementById(screenId);

  if (nextScreen) {
    nextScreen.classList.add('active');
  }
}


/* =========================================================
   ACCESSO PRIVATO
   ========================================================= */

const ACCESS_CODE = "181909";


function checkAccess() {

  const input = document.getElementById("accessCode");
  const error = document.getElementById("accessError");

  const code = input.value.trim();

  if (code === ACCESS_CODE) {

    error.textContent = "";

    input.classList.remove("wrong");

    // Piccola pausa per rendere il passaggio più elegante
    setTimeout(() => {
      showScreen("intro");
    }, 300);

  } else {

    error.textContent = "Codice non corretto. Riprova.";

    input.classList.remove("wrong");

    // Forza il riavvio dell'animazione
    void input.offsetWidth;

    input.classList.add("wrong");

    input.value = "";

    input.focus();
  }
}


/* =========================================================
   INVIO CON TASTO ENTER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("accessCode");

  if (input) {

    input.addEventListener("keydown", function(event) {

      if (event.key === "Enter") {
        checkAccess();
      }

    });

  }

});


/* =========================================================
   COUNTDOWN
   ========================================================= */

/*
   DATA DELLA FESTA

   19 settembre 2026
   ore 20:30

   NOTA:
   La data viene costruita usando l'ora locale del dispositivo.
*/

const eventDate = new Date(2026, 8, 19, 20, 30, 0);


function updateCountdown() {

  const now = new Date();

  const difference = eventDate.getTime() - now.getTime();


  /* -------------------------------------------------------
     Se la festa non è ancora iniziata
     ------------------------------------------------------- */

  if (difference > 0) {

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (difference / 1000) % 60
    );


    updateCountdownNumber("days", days);
    updateCountdownNumber("hours", hours);
    updateCountdownNumber("minutes", minutes);
    updateCountdownNumber("seconds", seconds);


    const countdown = document.getElementById("countdown");

    if (countdown) {
      countdown.classList.remove("event-today");
    }

  }


  /* -------------------------------------------------------
     Se la festa è iniziata
     ------------------------------------------------------- */

  else {

    const countdown = document.getElementById("countdown");

    if (countdown) {

      countdown.innerHTML = `
        <div class="event-today">
          LA FESTA È INIZIATA ✦
        </div>
      `;

    }

  }

}


/* =========================================================
   AGGIORNAMENTO NUMERI COUNTDOWN
   ========================================================= */

function updateCountdownNumber(id, value) {

  const element = document.getElementById(id);

  if (!element) return;

  const formattedValue = String(value).padStart(2, "0");


  /*
     Aggiungiamo una piccola animazione
     quando cambia il numero.
  */

  if (element.textContent !== formattedValue) {

    element.textContent = formattedValue;

    element.classList.remove("tick");

    void element.offsetWidth;

    element.classList.add("tick");

  }

}


/* Avvio countdown */

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   RSVP
   ========================================================= */

function rsvpResponse(type) {

  const buttons = document.getElementById("rsvpButtons");
  const response = document.getElementById("rsvpResponse");

  const symbol = document.getElementById("responseSymbol");
  const title = document.getElementById("responseTitle");
  const message = document.getElementById("responseMessage");

  const flash = document.getElementById("rsvpFlash");


  if (!buttons || !response) return;


  /* Nascondiamo i pulsanti */

  buttons.style.display = "none";


  /* -------------------------------------------------------
     RISPOSTA POSITIVA
     ------------------------------------------------------- */

  if (type === "yes") {

    symbol.innerHTML = "✦";

    title.textContent = "TI ASPETTIAMO!";

    message.innerHTML =
      "Non vediamo l'ora di festeggiare<br>" +
      "insieme a te questa notte speciale. ✨";


    response.classList.remove("show");

    void response.offsetWidth;

    response.classList.add("show");


    /*
       Flash luminoso
    */

    if (flash) {

      flash.classList.remove("active");

      void flash.offsetWidth;

      flash.classList.add("active");

    }


    /*
       Esplosione di particelle
    */

    createCelebrationParticles(35);

  }


  /* -------------------------------------------------------
     RISPOSTA NEGATIVA
     ------------------------------------------------------- */

  else {

    symbol.innerHTML = "♡";

    title.textContent = "CI DISPIACE...";

    message.innerHTML =
      "Ci sarebbe piaciuto averti con noi.<br>" +
      "Sarà per la prossima occasione. 🤍";


    response.classList.remove("show");

    void response.offsetWidth;

    response.classList.add("show");


    /*
       Piccola animazione malinconica
    */

    response.classList.add("sad-response");

  }

}


/* =========================================================
   PARTICELLE FESTA
   ========================================================= */

function createCelebrationParticles(number) {

  const container =
    document.getElementById("celebrationParticles");

  if (!container) return;


  container.innerHTML = "";


  for (let i = 0; i < number; i++) {

    const particle =
      document.createElement("span");

    particle.classList.add("particle");


    /*
       Direzione casuale
    */

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      120 + Math.random() * 300;


    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;


    particle.style.setProperty(
      "--x",
      `${x}px`
    );

    particle.style.setProperty(
      "--y",
      `${y}px`
    );


    /*
       Dimensione casuale
    */

    const size =
      3 + Math.random() * 5;

    particle.style.width =
      `${size}px`;

    particle.style.height =
      `${size}px`;


    /*
       Durata leggermente diversa
    */

    particle.style.animationDuration =
      `${1.2 + Math.random() * 1.2}s`;


    container.appendChild(particle);

  }


  /*
     Pulizia dopo l'animazione
  */

  setTimeout(() => {

    container.innerHTML = "";

  }, 3000);

}


/* =========================================================
   ACCESSO AUTOMATICO ALL'INPUT
   ========================================================= */

window.addEventListener("load", () => {

  const input =
    document.getElementById("accessCode");

  if (input) {
    input.focus();
  }

});