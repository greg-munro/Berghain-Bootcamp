
function buildCardHTML(card){
  let prompt = card.question

  const htmlAnswer = card.answers.reduce(function (html, answer) {
    html += '<li>' + answer + '</li>';
    return html;
  }, '');

  return `${prompt}` + htmlAnswer;//why not have this in backtick string too?
}


// General function that will update the HTML content dynamically
const buildDom = (cardHTML) => {
    const main = document.querySelector("main");
    main.innerHTML = "<ol>" + cardHTML + "</ol>";
  };
  
  // First Screen => Splash Screen
  const buildSplashScreen = () => {
    buildDom(`
    <h1>In The Queue for Berghain</h1>
    <img src="./images/1200px-Berghain-Logo.svg.png" alt="berghain-logo" style="width: 45%;"/>

    </br>
    <button id="start-button">Start</button><br><br>

    <div class="rules">
    <div class="rules-title"><span>Rules</span></div>
    <div class="rules-list">
    <p>You must prove knowledge of dance music and earn the right to enter Berghain!</p>
        <ul>
            <li>You will have <span>10 seconds</span> to answer each question related to dance music</li>
            <li>You must answer all 6 questions correctly to enter Berghain</li>
            <li>You have 2 lives, use them all and you're not getting in</li>
        </ul>    
</div>	
    `);
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", buildGameScreen);
  };
    

   // Second Screen => Game Screen

  const buildGameScreen = () => {
    const card = game.getRandomCard();
    const cardHTML = buildCardHTML(card);
    
    buildDom (cardHTML); 


  let choices = document.querySelector("ol")
  choices.addEventListener('click',function(event) {
    let correct = false
    console.log(event.target.innerText, card.correctAnswer)
    console.log(event.target.innerText === card.correctAnswer)
    if(event.target.innerText === card.correctAnswer) console.log("WINNER!")
  })
  
   
    }

  // Third Screen => Game Over
  function buildGameOver() {
  buildDom(`
    <section class="game-over">
    <h1>Game Over</h1>
    <h3>Sorry, you'll have to settle for just a Döner tonight...</h3>
    <button id = "game">TRY AGAIN</button>
    <div class= "pointer"> </div>
    </section>
    `);

  const restartButton = document.querySelector("button");
  restartButton.addEventListener("click", buildGameScreen);
}

const game = new Game();
game.start();
buildGameScreen();



  // When the window loads, then we will run the "buildSplashScreen" function
  // "load" waits for the html and JS
  window.addEventListener("load", buildSplashScreen);
