document.getElementById('feedbackForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Captura os valores dos campos
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  // Cria o objeto com os dados
  const dados = {
    nome: nome,
    email: email,
    mensagem: mensagem,
    data: new Date().toISOString() // Opcional: adiciona data/hora do envio
  };

  // Recupera os dados antigos do localStorage (se houver)
  const historico = JSON.parse(localStorage.getItem('feedbacks')) || [];

  // Adiciona o novo feedback
  historico.push(dados);

  // Salva de volta no localStorage
  localStorage.setItem('feedbacks', JSON.stringify(historico));

  // Mensagem de confirmação
  document.getElementById('mensagem-confirmacao').textContent = "Mensagem enviada com sucesso!";

  // Limpa o formulário
  this.reset();
});
