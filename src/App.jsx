import { useState, useEffect } from 'react'
import ProgressBar from './components/ProgressBar'
import Tabs from './components/Tabs'
import Dropdown from './components/Dropdown'
import Pagination from './components/Pagination'
import { useToast } from './context/ToastContext'
import './App.css'

const abasProduto = [
  {
    titulo: 'Descrição',
    conteudo: <p>Fone de ouvido sem fio com cancelamento de ruído e bateria de 30 horas.</p>,
  },
  {
    titulo: 'Especificações',
    conteudo: (
      <ul>
        <li>Bluetooth 5.3</li>
        <li>Peso: 250g</li>
        <li>Cor: Preto</li>
      </ul>
    ),
  },
  {
    titulo: 'Avaliações',
    conteudo: <p>★★★★☆ 4,5 de 5 — 128 avaliações.</p>,
  },
]

const categorias = ['Todas', 'Eletrônicos', 'Roupas', 'Livros', 'Casa']

const produtos = [
  { id: 1, nome: 'Fone Bluetooth', preco: 199.9, categoria: 'Eletrônicos' },
  { id: 2, nome: 'Camiseta Básica', preco: 49.9, categoria: 'Roupas' },
  { id: 3, nome: 'Dom Casmurro', preco: 29.9, categoria: 'Livros' },
  { id: 4, nome: 'Luminária LED', preco: 89.9, categoria: 'Casa' },
  { id: 5, nome: 'Smartwatch', preco: 349.9, categoria: 'Eletrônicos' },
  { id: 6, nome: 'Calça Jeans', preco: 129.9, categoria: 'Roupas' },
  { id: 7, nome: 'O Pequeno Príncipe', preco: 24.9, categoria: 'Livros' },
  { id: 8, nome: 'Jogo de Panelas', preco: 249.9, categoria: 'Casa' },
  { id: 9, nome: 'Teclado Mecânico', preco: 279.9, categoria: 'Eletrônicos' },
  { id: 10, nome: 'Moletom', preco: 159.9, categoria: 'Roupas' },
  { id: 11, nome: '1984', preco: 39.9, categoria: 'Livros' },
  { id: 12, nome: 'Almofada', preco: 39.9, categoria: 'Casa' },
]

const POR_PAGINA = 4

function App() {
  const { showToast } = useToast()
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [categoria, setCategoria] = useState('Todas')
  const [pagina, setPagina] = useState(1)

  useEffect(() => {
    if (!uploading) return

    const timer = setInterval(() => {
      setProgress((atual) => {
        if (atual >= 100) {
          setUploading(false)
          return 100
        }
        return atual + 10
      })
    }, 300)

    return () => clearInterval(timer)
  }, [uploading])

  function iniciarUpload() {
    setProgress(0)
    setUploading(true)
  }

  function trocarCategoria(cat) {
    setCategoria(cat)
    setPagina(1)
  }

  const filtrados =
    categoria === 'Todas' ? produtos : produtos.filter((p) => p.categoria === categoria)

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA)
  const inicio = (pagina - 1) * POR_PAGINA
  const produtosDaPagina = filtrados.slice(inicio, inicio + POR_PAGINA)

  return (
    <main>
      <h1>Loja Virtual</h1>

      <section>
        <h2>Produtos</h2>
        <Dropdown label="Categoria" options={categorias} onSelect={trocarCategoria} />

        <ul className="produtos">
          {produtosDaPagina.map((produto) => (
            <li key={produto.id} className="produto">
              <h3>{produto.nome}</h3>
              <p>{produto.categoria}</p>
              <p>R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
              <button onClick={() => showToast(`${produto.nome} adicionado ao carrinho!`, 'sucesso')}>
                Adicionar ao carrinho
              </button>
            </li>
          ))}
        </ul>

        {totalPaginas > 1 && (
          <Pagination
            totalPages={totalPaginas}
            currentPage={pagina}
            onPageChange={setPagina}
          />
        )}
      </section>

      <section>
        <h2>Detalhes do produto</h2>
        <Tabs tabs={abasProduto} />
      </section>

      <section>
        <h2>Enviar foto do produto</h2>
        <ProgressBar value={progress} label="Upload da imagem" />
        <button onClick={iniciarUpload} disabled={uploading}>
          {uploading ? 'Enviando...' : 'Simular upload'}
        </button>
      </section>

      <section>
        <h2>Testar notificações</h2>
        <button onClick={() => showToast('Produto salvo!', 'sucesso')}>Sucesso</button>
        <button onClick={() => showToast('Erro ao salvar.', 'erro')}>Erro</button>
        <button onClick={() => showToast('Frete grátis hoje.', 'info')}>Info</button>
      </section>
    </main>
  )
}

export default App