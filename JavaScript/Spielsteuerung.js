
import { levelManager } from "./EbenenModul.js";
import { riddleManager} from "./RätselManager.js";

let start = false 

let Handy = false 

let isClicked = false 

class GameController {
    constructor(levelManager, riddleManager) {
        this.levelManager = levelManager;
        this.riddleManager = riddleManager;
        this.state = "menu"; // Mögliche Zustände: 'menu', 'running', 'paused'
        this.StartbildschirmAnimationId = null; 
        this.HandyMode = false;
        this.startLevel = 'schulhof';
        this.Anleitung = false 
        
    }

    createButton(text, callback) {
        const button = document.createElement("button");
        button.textContent = text;
        Object.assign(button.style, {
            cursor: "pointer",
            width: "100%",
            height: "200%",
            border: "black, solid 0.3vw",
            backgroundColor: "lightgrey",
            textAlign: "1vw"
        });
        button.addEventListener("click", callback);
        return button;
    }

    createImage(src) {
        const img = document.createElement("img");
        img.src = src;
        img.style.maxWidth = "100%";
        return img;
    }

    transitionGuide(elements) {
        gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
                const guide = document.getElementById("guide");
                guide.innerHTML = "";
                guide.scrollTop = 0;
                elements.forEach(el => guide.appendChild(el));
                gsap.to("#overlappingDiv", { opacity: 0 });
                isClicked = false 
            }
        });
    }

   

    setupStartScreenButtons() {

        

        const guide = document.getElementById("guide");
        guide.innerHTML = "";
        Object.assign(guide.style, {
            width: `${canvas.width}px`,
            height: `${canvas.height}px`,
            overflowY: "auto",
            backgroundColor: "grey"
        });

        const images = {
            pc: "./img/Anleitung/SteuerungPC.png",
            handy: "./img/Anleitung/SteuerungHandy.png",
            raetsel: "./img/Anleitung/AnleitungRätsel.png",
            urkunde: "./img/Anleitung/Einleitung Urkunde.png"
        };

        const scrollHint = document.createElement("div");
        scrollHint.innerHTML = "⬇ Nach unten scrollen ⬇";
        Object.assign(scrollHint.style, {
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translate(-50%)",
            fontSize: "1.2em",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            backgroundColor: "red",
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            opacity: "0.8",
            animation: 'bounce 2s infinite ease-in-out',

        });

        const weiterButton = this.createButton("Weiter", () => {
            if(!isClicked){
            isClicked = true 
            audio.ButtonKlick.play();
            this.transitionGuide([this.createImage(images.raetsel), scrollHint, schließenButton]);
            }
        });

        const schließenButton = this.createButton("Weiter", () => {
            if(!isClicked){
                isClicked = true
                audio.ButtonKlick.play();
                this.transitionGuide([this.createImage(images.urkunde), scrollHint, endButton]);
            }
           
        });

        const endButton = this.createButton("Schließen", () => {
            if(!isClicked){
                isClicked = true 
                audio.ButtonKlick.play();
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    onComplete: () => {
                
                        this.startGame(this.startLevel); // Spiel starten
                        guide.style.display = "none"               
                        document.querySelector('#ErklärBox').style.display = 'none';
                        if(!this.HandyMode) document.querySelector('#moving').style.display = 'none';;
                         
                        gsap.to('#overlappingDiv', { opacity: 0 });
                    }
                });

            }
           
            
    
        });

        guide.addEventListener('scroll', () => {
            if (guide.scrollTop > 20) {
                scrollHint.style.opacity = '0';
                } else {
                scrollHint.style.opacity = '0.8';
                }
        });

        this.setupDeviceSelection(guide, images, weiterButton, scrollHint);

    }

    setupDeviceSelection(guide, images, weiterButton, scrollHint) {
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const mode = e.currentTarget.innerHTML;

                if (mode === "Handy/Tablet" && !isClicked) {
                    isClicked = true
                    this.activateMode(guide, images.handy, weiterButton, scrollHint, true);
                } else if (mode === "PC" && !isClicked) {
                    isClicked = true
                    this.activateMode(guide, images.pc, weiterButton, scrollHint, false);
                }
            });
        });
    }

    activateMode(guide, imageSrc, weiterButton, scrollHint, isHandy) {
        audio.ButtonKlick.play();
        this.HandyMode = isHandy;
        console.log(`${isHandy ? "Handy" : "PC"}-Modus aktiviert.`);

        gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
                guide.style.display = "grid";
                guide.appendChild(this.createImage(imageSrc));
                guide.appendChild(weiterButton);
                guide.appendChild(scrollHint);
                gsap.to('#overlappingDiv', { opacity: 0 });
                isClicked = false 
            }
        });
    }

    
    
    animateStartbildschirm(){
        
        document.querySelector('#Anleitung').style.display = 'none'
        document.querySelector('#IDtimer').style.display = 'none'
        document.querySelector('#movingInterface').style.display ='none'
        document.querySelector('#Interface').style.display ='none'
        this.StartbildschirmAnimationId = window.requestAnimationFrame(() => this.animateStartbildschirm())
        
        this.drawBackground()
        
        
    }

    
    drawBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const startImage = new Image();
        startImage.src = './img/Startbildschirm/ArnoldiCode.png';
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    }


    
    // Startbildschirm initialisieren
    initializeMenu() {
        console.log("Startbildschirm wird initialisiert.");
         // Initiale Orientierung prüfen
        this.checkAndAnimateStartScreen();

        // Buttons einrichten
        this.setupStartScreenButtons();
        window.addEventListener("orientationchange", () => {
            this.checkAndAnimateStartScreen();
        });
    }


    // Neue Methode: Startbildschirm-Animation prüfen und starten/stoppen
    checkAndAnimateStartScreen() {
        
        const orientation = screen.msOrientation || screen.orientation || screen.mozOrientation;
        const isLandscape = orientation ? orientation.type.startsWith("landscape") : (window.innerWidth > window.innerHeight);

        if (isLandscape && !start) {
            console.log("Landscape-Modus erkannt. Animation wird gestartet.");
            if (!this.StartbildschirmAnimationId) {
                
                this.animateStartbildschirm();
                start = false 

                
                 // Animation nur starten, wenn sie nicht bereits läuft
                
            }
        } else {
            console.log("Portrait-Modus erkannt. Animation wird gestoppt.");
            
            
        }
    }

    

    startGame(startLevel, startRiddle) {
        start = true
        console.log(Handy)
        this.state = "running";
        console.log(`Spiel startet mit Ebene: ${startLevel}`);
        
        // Animation des Startbildschirms beenden
        cancelAnimationFrame(this.StartbildschirmAnimationId);

        // Verstecke Startbildschirm-Elemente
        document.querySelector('#Geräte').style.display = 'none';
        document.querySelector('#Titel').style.display = 'none';
        document.querySelector('#Interface').style.display = 'block'
        this.levelManager.startLevel(startLevel, player); // Ebene starten
        //this.levelManager.startLevel('Aula', player)
        console.log(`Spiel ist jetzt im Zustand: ${this.state}`);
    }

    togglePause() {
        console.log(this.state)
        if (this.state === "running") {
            console.log("pausieren")
            this.pauseGame();
        } else if (this.state === "paused") {
            console.log("weiter")
            this.resumeGame();
        }
    }

    pauseGame() {
        
        if(riddle) {
            this.riddleManager.pauseRiddle();
        }
        else {
            this.levelManager.pauseLevel();
            
        }
        this.state = "paused";
        
        
        console.log("Spiel pausiert");
    }

    resumeGame() {
        
        if(riddle) {
            this.riddleManager.resumeRiddle();
        } else {
            this.levelManager.resumeLevel();

        }
        this.state = "running";
        
       
        console.log("Spiel fortgesetzt");
    }
}



function checkOrientation() {
    const orientation = screen.msOrientation || screen.orientation || screen.mozOrientation;

    if (orientation && orientation.type.startsWith("portrait")) {
        console.log("Portrait-Modus erkannt. Spiel pausieren.");
        console.log(start)
        if(start) {
            gameController.pauseGame(); // Spiel pausieren
        }
        PleaseRotate.start()
        
    } else if (orientation && orientation.type.startsWith("landscape")) {
        console.log("Landscape-Modus erkannt. Spiel fortsetzen.");
        console.log(start)
        if(start) {
            gameController.resumeGame(); // Spiel fortsetzen
        }
        
        PleaseRotate.stop()

       
    }
}

window.addEventListener("orientationchange", checkOrientation);



// Beispiel für Initialisierung des GameControllers
export const gameController = new GameController(levelManager, riddleManager);
console.log("GameController initialisiert:", gameController);
gameController.initializeMenu();

