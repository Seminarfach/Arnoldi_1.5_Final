const createImage = (src) => {
    const img = new Image();
    img.src = src;
    return img;
};

const createRiddle = ({ name, folder, level,stage, rewardText, endText, correctAnswer, answers, hints, targetLevel, extraImages = {} }) => ({
    backgroundImage: createImage(`./img/Rätsel/${folder}/${level}/Hintergrund.png`),
    solutionImage: createImage(`./img/Rätsel/${folder}/${level}/Lösung.png`),
    guideImage: createImage(`./img/Anleitung/${folder}/Anleitung${name}.png`),
    explanationImage: createImage(`./img/Anleitung/${folder}/Erklärung${name}.png`),
    rewardImage: createImage(`./img/Urkunde/Urkunde Teil${stage}.png`),
    rewardAnswer: rewardText,
    endAnswer: endText,
    answers,
    correctAnswer,
    hints: hints.map((hint, index) => createImage(`./img/Rätsel/${folder}/${level}/Hinweis${index + 1}.png`)),
    hintTimes: [5, 10, 15],
    targetLevel,
    ...extraImages // Falls spezielle Bilder benötigt werden (z. B. für KI-Rätsel)
});

export const riddleConfig = {
    roboter: createRiddle({
        name: "Roboter",
        folder: "Roboter",
        level: "Leicht",
        stage: "1",
        rewardText: "Super, du hast den ersten Teil der Datei gefunden!",
        endText: "Klasse, das erste Rätsel ist gelöst. <br> Das nächste wartet schon im Raum 102!",
        correctAnswer: "A2",
        answers: ["A2", "B5", "D3", "C1"],
        hints: ["Leicht Hinweis 1", "Leicht Hinweis 2", "Leicht Hinweis 3"],
        targetLevel: "InformatikRaum",
        extraImages: {
            InformatikerinImage: createImage('./img/Anleitung/Roboter/Informatikerin.png'),
            
        }
    }),

    scratch: createRiddle({
        name: "Scratch",
        folder: "Scratch",
        level: "Leicht",
        stage: "2",
        rewardText: "Klasse, nun ist auch der zweite Teil vorhanden!",
        endText: "Wow, schon zwei Rätsel erledigt! <br> Die 206 hat eine Herausforderung parat!",
        correctAnswer: "DBAC",
        answers: ["DBAC", "DEBA", "BCEA", "EABD"],
        hints: ["Leicht Hinweis 1", "Leicht Hinweis 2", "Leicht Lösung"],
        targetLevel: "EnglischRaum"
    }),

    krypto: createRiddle({
        name: "Krypto",
        folder: "AlanTouring",
        level: "Leicht",
        stage: "3",
        rewardText: "Nun sind es schon drei!<br> Nicht mehr lange und du hast alle Teile gefunden!",
        endText: "Du bist echt gut, aber schaffst du auch das Rätsel in der 305?",
        correctAnswer: "BYGK",
        answers: ["BYIP", "BYGK", "XAGK", "XAIP"],
        hints: ["Hinweis1", "Hinweis2", "LösungHinweis"],
        targetLevel: "GeschichtsRaum"
    }),

    sudoku: createRiddle({
        name: "Sudoku",
        folder: "Sudoku",
        level: "Leicht",
        stage: "4",
        rewardText: "Klasse nun ist sie vollständig.<br> Begib dich nun in die Aula um zu sehen, was sie enthält.",
        endText: "Super, du ein weiteres Rätsel geschafft! <br> Nun bist du bereit für die Prüfung!",
        correctAnswer: 'x:1 | y:2',
        answers: [
            'x:1 | y:2',
            'x:3 | y:2',
            'x:1 | y:3',
            'x:2 | y:1',
        ],
        hints: ["Hinweis1", "Hinweis2", "LösungHinweis"],
        targetLevel: "MatheRaum"
    }),

    ki: createRiddle({
        name: "KI Teil 1",
        folder: "Ki",
        level: "Teil 1",
        correctAnswer: "A",
        endText: "Super, du hast den ersten Teil der Prüfung geschafft",
        answers: ["A", "B", "C", "D"],
        hints: ["Teil 1 - Hinweis 1", "Teil 1 - Hinweis 2", "Teil 1 - Lösung"],
        targetRiddle: "Ki2",
        extraImages: {
            Chat1Image: createImage("./img/Chat/Chatbild0.png"),
            Chat2Image: createImage("./img/Chat/Chatbild1.png"),
            Chat3Image: createImage("./img/Chat/Chatbild2.png"),
            Chat4Image: createImage("./img/Chat/Chatbild3.png")
        }
    }),

    ki2: createRiddle({
        name: "KI Teil 2",
        folder: "Ki",
        level: "Teil 2",
        endText: "Die Datei funktioniert wieder! Mission erfüllt! <br> Du kannst dir nun deine Urkunde abholen!",
        correctAnswer: "Die 2. Stelle muss eine 1 sein",
        answers: [
            "Die 2. Stelle muss eine 1 sein",
            "Die Binärzahl muss 4 Stellen lang sein",
            "Die letzte Stelle muss eine 0 sein",
            "Die 3. Stelle muss eine 0 sein"
        ],
        hints: ["Teil 2 - Hinweis 1", "Teil 2 - Hinweis 2", "Teil 2 - Lösung"],
        targetLevel: "Aula"
    })
};
