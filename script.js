let fila = []; // nossa fila FIFO


const btnAdd = document.getElementById("btnAdd");
const btnAtender = document.getElementById("btnAtender");
const listaFila = document.getElementById("lista-fila");
const personagemAtual = document.getElementById("personagem-atual");
const som = document.getElementById("somAtendimento");


// Função para pegar personagem aleatório da API
async function getPersonagemAleatorio() {
  const id = Math.floor(Math.random() * 826) + 1; // até 826 personagens
  const resposta = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  return await resposta.json();
}


// Adicionar personagem na fila
btnAdd.addEventListener("click", async () => {
  const personagem = await getPersonagemAleatorio();
  fila.push(personagem); // insere no final da fila
  atualizarFila();
});


// Atender personagem (FIFO: remove do início)
btnAtender.addEventListener("click", () => {
  if (fila.length === 0) {
    personagemAtual.innerHTML = "<p>Ninguém na fila!</p>";
    return;
  }
  const atendido = fila.shift(); // remove o primeiro
  mostrarAtendimento(atendido);
  som.play();
  atualizarFila();
});


// Mostrar quem está em atendimento
function mostrarAtendimento(p) {
  personagemAtual.innerHTML = `
    <div class="personagem">
      <img src="${p.image}" alt="${p.name}">
      <p><strong>${p.name}</strong></p>
      <p>Espécie: ${p.species}</p>
      <p>Status: ${p.status}</p>
    </div>
  `;
}


// Atualizar sala de espera
function atualizarFila() {
  listaFila.innerHTML = "";
  fila.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("personagem");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <p>${p.name}</p>
    `;
    listaFila.appendChild(div);
  });
}
const btnLimpar = document.getElementById("btnLimpar");

// Limpar toda a fila
btnLimpar.addEventListener("click", () => {
  fila = []; // esvazia o array
  atualizarFila();
  personagemAtual.innerHTML = "<p>Nenhum personagem em atendimento</p>";
});