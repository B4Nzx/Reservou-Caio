document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("feedback-container");
  
    fetch("http://localhost:3000/feedbacks")
      .then(res => res.json())
      .then(data => {
        container.innerHTML = "";
        data.forEach(f => {
          const card = document.createElement("div");
          card.className = "card mb-3 p-2";
          card.innerHTML = `
            <strong>Nome:</strong> ${f.nome}<br>
            <strong>Email:</strong> ${f.email}<br>
            <strong>Mensagem:</strong> ${f.mensagem}<br>
            <button class="btn btn-danger btn-sm excluir-feedback" data-id="${f.id}">Excluir</button>
          `;
          container.appendChild(card);
        });
  
        // Adiciona o evento nos botões após renderizar os cards
        document.querySelectorAll(".excluir-feedback").forEach(botao => {
          botao.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
  
            // Excluir do db.json (JSON Server)
            fetch(`http://localhost:3000/feedbacks/${id}`, {
              method: "DELETE"
            })
              .then(res => {
                if (res.ok) {
                  // Remove do localStorage também, se necessário
                  const feedbacksLocal = JSON.parse(localStorage.getItem("feedbacks")) || [];
                  const novosFeedbacks = feedbacksLocal.filter(fb => fb.id != id);
                  localStorage.setItem("feedbacks", JSON.stringify(novosFeedbacks));
  
                  // Atualiza a lista na tela
                  this.parentElement.remove();
                } else {
                  alert("Erro ao excluir do servidor.");
                }
              });
          });
        });
      });
  });
  