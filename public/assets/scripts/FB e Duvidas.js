document.getElementById("feedbackForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const data = new Date().toLocaleString("pt-BR");
  
    const feedback = { nome, email, mensagem, data };
  
    // Salvar no localStorage
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  
    // Enviar para db.json
    try {
      await fetch("http://localhost:3000/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      });
      alert("Feedback enviado com sucesso!");
      document.getElementById("feedbackForm").reset();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar feedback para o servidor.");
    }
  });
  