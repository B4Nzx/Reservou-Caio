document.getElementById("cadastroForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
  
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
  
    const user = { email, password };
  
    // 1. Salva no localStorage
    localStorage.setItem("user_" + email, JSON.stringify(user));
  
    // 2. Salva no db.json (JSON Server)
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao cadastrar no JSON Server");
        return res.json();
      })
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao cadastrar. Verifique o servidor JSON.");
      });
  });
  