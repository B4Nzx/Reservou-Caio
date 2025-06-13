async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    // Verificar localStorage
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && localUser.email === email && localUser.password === password) {
      alert("Login realizado com sucesso (LocalStorage)!");
      window.location.href = "pagina.html"; // <-- Redireciona após login
      return;
    }
  
    // Verificar JSON externo
    try {
      const response = await fetch("usuarios.json");
      const users = await response.json();
  
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        alert("Login realizado com sucesso (JSON)!");
        window.location.href = "pagina.html"; // <-- Redireciona após login
      } else {
        alert("Email ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao carregar JSON:", error);
      alert("Erro ao acessar base de dados.");
    }
  }
  