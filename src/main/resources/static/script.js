const statusElement = document.getElementById("status");
const moveInput = document.getElementById("moveInput");
const convertButton = document.getElementById("convertButton");
const jsonOutput = document.getElementById("jsonOutput");

// Verifica se o servidor Java está funcionando.
async function verificarServidor() {
    try {
        const resposta = await fetch("/api/status");

        if (!resposta.ok) {
            throw new Error("O servidor retornou um erro.");
        }

        const dados = await resposta.json();
        statusElement.textContent = dados.mensagem;
    } catch (erro) {
        statusElement.textContent =
            "Não foi possível conectar ao servidor Java.";
        console.error(erro);
    }
}

// Envia o texto para o backend.
async function testarConversao() {
    const movimento = moveInput.value.trim();

    if (!movimento) {
        statusElement.textContent =
            "Cole a descrição de um movimento primeiro.";
        return;
    }

    convertButton.disabled = true;
    statusElement.textContent = "Enviando texto para o Java...";

    try {
        const resposta = await fetch("/api/test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                movimento: movimento
            })
        });

        if (!resposta.ok) {
            throw new Error("Falha ao processar a requisição.");
        }

        const dados = await resposta.json();

        jsonOutput.textContent = JSON.stringify(dados, null, 2);
        statusElement.textContent = dados.mensagem;
    } catch (erro) {
        statusElement.textContent =
            "Ocorreu um erro ao enviar o movimento.";
        console.error(erro);
    } finally {
        convertButton.disabled = false;
    }
}

convertButton.addEventListener("click", testarConversao);

verificarServidor();
