async function translateText() {
    const text = document.getElementById("inputText").value.trim();
    const from = document.getElementById("fromLang").value;
    const to = document.getElementById("toLang").value;
    const output = document.getElementById("outputText");

    if (!text) {
        output.value = "Bitte gib einen Text ein.";
        return;
    }

    output.value = "Übersetze...";

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        output.value = data.responseData.translatedText || "Keine Übersetzung erhalten.";
    } catch (err) {
        output.value = "Fehler bei der Übersetzung.";
        console.error(err);
    }
}