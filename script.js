
function searchMeme() {
    const query = document.getElementById("meme_query").value;

    fetch("/search_meme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .then(data => {
        const templateSelect = document.getElementById("template_id");
        templateSelect.innerHTML = ""; 

        if (data.error) {
            alert("No matching memes found!");
        } else {
            data.forEach(meme => {
                let option = document.createElement("option");
                option.value = meme.id;
                option.text = meme.name;
                templateSelect.appendChild(option);
            });
        }
    });
}

function generateMeme() {
    const templateId = document.getElementById("template_id").value;
    const topText = document.getElementById("top_text").value;
    const bottomText = document.getElementById("bottom_text").value;

    console.log("Sending Request with Data:", { template_id: templateId, top_text: topText, bottom_text: bottomText });

    if (!templateId) {
        alert("Please search and select a meme template first!");
        return;
    }

    fetch("/generate_meme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_id: templateId, top_text: topText, bottom_text: bottomText })
    })
    .then(response => response.json())
    .then(data => {
        if (data.meme_url) {
            document.getElementById("meme-result").innerHTML = `<img src="${data.meme_url}" alt="Meme">`;
        } else {
            document.getElementById("meme-result").innerText = "Error generating meme";
        }
    })
    .catch(error => console.log("Error:", error));
}


function toggleChatbot() {
    const container = document.getElementById("chatbot-container");
    container.style.display = container.style.display === "none" ? "flex" : "none";
}

function sendChatbotMessage() {
    let input = document.getElementById("chatbot-input");
    let message = input.value.trim();
    if (!message) return;

    const messagesDiv = document.getElementById("chatbot-messages");
    messagesDiv.innerHTML += `<div style="text-align:left; margin: 0.5rem; "><strong>You:</strong> ${message}</div>`;

    const lower = message.toLowerCase();
    let botReply;

    if(lower.includes("hello") || lower.includes("hi"))
    {
        botReply ="Hello, I am here to assist you to handle meme generator";
    }
    else if ((lower.includes("how") || lower.includes("help") || lower.includes("assist")) && (lower.includes("use") || lower.includes("generate") || lower.includes("meme"))) 
    {
        botReply = "To generate a meme:\n1. Type a meme name like 'Drake'\n2. Select a template\n3. Add top/bottom text\n4. Click 'Generate Meme'";
    } 
    else if ((lower.includes("what") || lower.includes("which")) && (lower.includes("search") || lower.includes("name"))) 
    {
        botReply = "To search a meme template, enter a keyword like 'spongebob' in the input box and click 'Search Meme'.";
    } 
    else if ((lower.includes("what") || lower.includes("which")) && (lower.includes("select") || lower.includes("template"))) {
        botReply = "After searching, select a template from the dropdown list to proceed.";
    }
    else if (lower.includes("what") && (lower.includes("top") || lower.includes("bottom") || lower.includes("text"))) {
        botReply = "You can write any funny text which will appear on the image";
    }
    else
    {
        botReply="Sorry, I can only help with using the meme generator.";
    }

    messagesDiv.innerHTML += `<div style="text-align:left; margin: 0.5rem; "><strong>Bot:</strong> ${botReply}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    input.value = "";
}









// function generateMeme() 
// {
//     const query = document.getElementById("meme_query").value;

//     fetch("/generate_meme", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: query })
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.json().then(err => { throw new Error(err.error); });
//         }
//         return response.json();
//     })
//     .then(data => {
//         document.getElementById("meme-result").innerHTML = `<img src="${data.meme_url}" alt="Generated Meme">`;
//     })
//     .catch(error => {
//         console.log("");  // Prevents unnecessary console error messages
//         document.getElementById("meme-result").innerText = "Meme Not Found";
//     });
//     // .then(response => response.json())
//     // .then(data => {
//     //     if (data.meme_url) {
//     //         document.getElementById("meme-result").innerHTML = `<img src="${data.meme_url}" alt="Generated Meme">`;
//     //     } else {
//     //         document.getElementById("meme-result").innerText = "Meme Not Found";
//     //     }
//     // })
//     // .catch(error => {
//     //     document.getElementById("meme-result").innerText = "Meme Not Found";
//     // });

// }

