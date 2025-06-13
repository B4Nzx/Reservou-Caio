document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('password').value;
    const confirmarSenha = document.getElementById('confirmPassword').value;
  
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
  

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  

    const existe = usuarios.find(user => user.email === email);
    if (existe) {
      alert('Este email já está cadastrado!');
      return;
    }
  
    const novoUsuario = { email, senha };
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
    alert('Cadastro realizado com sucesso!');
    this.reset();
  });
  