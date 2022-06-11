Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  'gulOeGUaW63XjvQvuDvt6fgZ1nxf4sL172Wd5oXs', // This is your Application ID
  'XMx7wMTJdtXaRtLwmnZ2PM5bK7U6531zfIhX9M8F' // This is your Javascript key
);

let pessoas = [];
const lista = document.getElementById("lista");



function gerarLista() {
  lista.innerHTML = "";
  for (let i = 0; i < pessoas.length; ++i) {
    const li = document.createElement("li");
    const txt = document.createTextNode(
      `Nome: ${pessoas[i].nome} - Idade: ${pessoas[i].idade}`
    );
    li.appendChild(txt);
    lista.appendChild(li);
  }
}

const fetchPessoas = async () => {
  const Pessoa = Parse.Object.extend("Pessoa");
  const query = new Parse.Query(Pessoa);
  try {
    const results = await query.find();
    pessoas = [];
    for (const object of results) {
      const nome = object.get("Nome");
      const idade = object.get("Idade");
      pessoas.push({ nome, idade });
    }
    gerarLista();
  } catch (error) {
    console.error("Error while fetching Pessoa", error);
  }
};

function salvar(){
  const texto = document.getElementById("texto").value;
  return texto;
}

const fetchPessoas2 = () => {
  const Pessoa = Parse.Object.extend("Pessoa");
  const query = new Parse.Query(Pessoa);
  query
    .find()
    .then((results) => {
      pessoas = [];
      for (const object of results) {
        const nome = object.get("nome");
        const idade = object.get("idade");
        pessoas.pull({ nome, idade });
      }
      gerarLista();
    })
    .catch((error) => {
      console.error("Error while fetching Pessoa", error);
    });
};

fetchPessoas();
fetchPessoas2();