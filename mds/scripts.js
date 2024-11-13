// Simulação de dados dinâmicos
let livros = [
    { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", categoria: "ficcao", preco: 59.90 },
    { id: 2, titulo: "Clean Code", autor: "Robert C. Martin", categoria: "tecnologia", preco: 89.90 },
    { id: 3, titulo: "Pai Rico, Pai Pobre", autor: "Robert Kiyosaki", categoria: "negocios", preco: 39.90 },
];

let carrinho = []; // Armazena itens do carrinho

// --- Catálogo ---
function renderizarCatalogo() {
    const grid = document.getElementById("livros-grid");
    grid.innerHTML = ""; // Limpa o grid
    livros.forEach(livro => {
        const div = document.createElement("div");
        div.className = "livro";
        div.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <p>Categoria: ${livro.categoria}</p>
            <p>Preço: R$ ${livro.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${livro.id})">Adicionar ao Carrinho</button>
        `;
        grid.appendChild(div);
    });
}

function filtrarLivros() {
    const busca = document.getElementById("busca").value.toLowerCase();
    const categoria = document.getElementById("categoria").value;
    const grid = document.getElementById("livros-grid");
    grid.innerHTML = ""; // Limpa o grid

    const livrosFiltrados = livros.filter(livro =>
        (livro.titulo.toLowerCase().includes(busca) || livro.autor.toLowerCase().includes(busca)) &&
        (categoria === "tudo" || livro.categoria === categoria)
    );

    livrosFiltrados.forEach(livro => {
        const div = document.createElement("div");
        div.className = "livro";
        div.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <p>Categoria: ${livro.categoria}</p>
            <p>Preço: R$ ${livro.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${livro.id})">Adicionar ao Carrinho</button>
        `;
        grid.appendChild(div);
    });
}

// --- Carrinho ---
function adicionarAoCarrinho(id) {
    const livro = livros.find(l => l.id === id);
    carrinho.push(livro);
    alert(`${livro.titulo} foi adicionado ao carrinho!`);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById("itens-carrinho");
    const totalPreco = document.getElementById("total-preco");
    carrinhoDiv.innerHTML = ""; // Limpa o carrinho

    let total = 0;
    carrinho.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item-carrinho";
        div.innerHTML = `
            <p>${item.titulo} - R$ ${item.preco.toFixed(2)}</p>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        carrinhoDiv.appendChild(div);
        total += item.preco;
    });

    totalPreco.textContent = total.toFixed(2);
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("O carrinho está vazio!");
    } else {
        alert("Compra finalizada com sucesso!");
        carrinho = []; // Limpa o carrinho
        atualizarCarrinho();
    }
}

// --- Admin (CRUD) ---
function renderizarAdmin() {
    const adminDiv = document.getElementById("admin-livros");
    adminDiv.innerHTML = ""; // Limpa o painel

    livros.forEach((livro, index) => {
        const div = document.createElement("div");
        div.className = "admin-livro";
        div.innerHTML = `
            <p><strong>${livro.titulo}</strong> - ${livro.autor} | ${livro.categoria} | R$ ${livro.preco.toFixed(2)}</p>
            <button onclick="removerLivro(${index})">Remover</button>
        `;
        adminDiv.appendChild(div);
    });
}

function adicionarLivro() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const categoria = document.getElementById("categoria-admin").value;
    const preco = parseFloat(prompt("Digite o preço do livro:"));

    if (!titulo || !autor || isNaN(preco)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const novoLivro = { id: Date.now(), titulo, autor, categoria, preco };
    livros.push(novoLivro);
    alert("Livro adicionado com sucesso!");
    renderizarAdmin();
    renderizarCatalogo(); // Atualiza o catálogo
}

function removerLivro(index) {
    livros.splice(index, 1);
    alert("Livro removido com sucesso!");
    renderizarAdmin();
    renderizarCatalogo(); // Atualiza o catálogo
}

// --- Inicialização ---
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("livros-grid")) renderizarCatalogo();
    if (document.getElementById("itens-carrinho")) atualizarCarrinho();
    if (document.getElementById("admin-livros")) renderizarAdmin();
});
