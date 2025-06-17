document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    // Verifica localStorage
    const localUser = JSON.parse(localStorage.getItem("user_" + email));
    if (localUser && localUser.password === password) {
      alert("Login via localStorage bem-sucedido!");
      window.location.href = "home.html";
      return;
    }
  
    // Verifica JSON Server
    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
      const users = await res.json();
  
      if (users.length > 0) {
        alert("Login via JSON Server bem-sucedido!");
        window.location.href = "FB e Duvidas.html";
      } else {
        alert("Credenciais inválidas!");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao verificar no servidor.");
    }
  });
  