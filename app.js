let classmates = [
    "Nicole","Yayi","Aleah","Jerick","Brix","Jona","Dirk","Grant",
    "Lawrence","Kelvin","Stephen","Nelvin","Cristian","Gian",
    "Christian","Jewel","Armando","Fitz","Jomari","Lhimber",
    "Edrian","Ashton","Kent","Lovely","Tintin","Riezen","Johnrey",
    "LLoyd","Ren","Jaimer","Japjap","Jeanger"
];

let randomName = "";
let attempts = 0;
const maxAttempts = 5;
let log = ""; // Para sa file download
let playerName = "";
let playerSection = "";
let playerAge = 0;

function startGame() {
    playerName = document.getElementById("name").value;
    playerSection = document.getElementById("section").value;
    playerAge = parseInt(document.getElementById("age").value);

    if (!playerName || !playerSection || !playerAge) {
        alert("Punan lahat ng fields bago magsimula!");
        return;
    }

    if (playerAge > 25) {
        alert("Wow! Too old HAHA");
    } else {
        alert("Ay pak! Bata pa 😎");
    }

    document.getElementById("user-info").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("instruction").innerText = 
        `Hi ${playerName}, Welcome sa larong ito!\nHulaan ang pangalan ng ating kaklase na napili ni Gandara.`;

    randomName = classmates[Math.floor(Math.random() * classmates.length)];
    attempts = 0;

    // Initialize log
    log = `Player Info:\nName: ${playerName}\nProgram/Year: ${playerSection}\nAge: ${playerAge}\n\nGuesses Log:\n`;
}

function submitGuess() {
    const guessInput = document.getElementById("guess");
    const guess = guessInput.value.trim();
    const feedback = document.getElementById("feedback");

    if (!guess) {
        feedback.innerText = "Paki-type ang pangalan bago mag-submit!";
        return;
    }

    attempts++;
    log += `Attempt ${attempts}: ${guess}\n`; // Save sa log

    if (guess.toLowerCase() === randomName.toLowerCase()) {
        feedback.innerText = `Bongga ka teh! Tama, si ${randomName} nga! 🎉`;
        guessInput.disabled = true;
        downloadLog(); // Auto-download kapag tama
    } else if (attempts >= maxAttempts) {
        feedback.innerText = `Tama na! Si ${randomName} ito. Magquit kana chararat ka! 😎`;
        guessInput.disabled = true;
        downloadLog(); // Auto-download kapag naubos ang attempts
    } else {
        feedback.innerText = `Mali! Ulitin mo. May ${maxAttempts - attempts} attempts ka pa.`;
    }

    guessInput.value = "";
}

// Function para i-download ang log
function downloadLog() {
    const blob = new Blob([log], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${playerName.replace(/\s+/g, "_")}_game_log.txt`;
    a.click();
}
