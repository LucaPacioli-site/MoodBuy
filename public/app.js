const sendBtn = document.getElementById("sendBtn");
const userMessage = document.getElementById("userMessage");
const chat = document.getElementById("chat");

sendBtn.addEventListener("click", async () => {
    const message = userMessage.value.trim();
    if (!message) return;

    chat.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    userMessage.value = "";

    try {
        const res = await fetch("/api/moodbuy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await res.json();
        const aiResponse = data.completion || "No response from Claude";

        chat.innerHTML += `<p><strong>MoodBuy:</strong> ${aiResponse}</p>`;
        chat.scrollTop = chat.scrollHeight;
    } catch (err) {
        chat.innerHTML += `<p><strong>Error:</strong> Failed to send message.</p>`;
        console.error(err);
    }
});
