import { useState, useEffect } from 'react'
import ProgressBar from './components/ProgressBar'
import Tabs from './components/Tabs'
import Dropdown from './components/Dropdown'
import Pagination from './components/Pagination'
import Accordion from './components/Accordion'
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

const perguntas = [
  {
    titulo: 'Qual o prazo de entrega?',
    conteudo: <p>De 3 a 7 dias úteis para capitais. Até 12 dias úteis para o interior.</p>,
  },
  {
    titulo: 'Como faço uma troca?',
    conteudo: <p>Você tem 7 dias após o recebimento. Acesse "Meus pedidos" e solicite a troca.</p>,
  },
  {
    titulo: 'Quais formas de pagamento?',
    conteudo: <p>Pix, boleto e cartão de crédito em até 10x sem juros.</p>,
  },
  {
    titulo: 'O frete é grátis?',
    conteudo: <p>Sim, para compras acima de R$ 199,00.</p>,
  },
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
    <>
      <a href="#conteudo" className="pular-link">
        Pular para o conteúdo
      </a>

      <header className="cabecalho">
        <div className="cabecalho-conteudo">
          <p className="logo">Loja Virtual</p>
          <nav className="menu" aria-label="Menu principal">
            <ul>
              <li><a href="#produtos">Produtos</a></li>
              <li><a href="#detalhes">Detalhes</a></li>
              <li><a href="#faq">Dúvidas</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="conteudo" className="conteudo">
        <h1 className="pular-link">Loja Virtual</h1>

        <section id="produtos" className="card card-largo" aria-labelledby="titulo-produtos">
          <h2 id="titulo-produtos">Produtos</h2>
          <Dropdown label="Categoria" options={categorias} onSelect={trocarCategoria} />

          <ul className="produtos">
            {produtosDaPagina.map((produto) => (
              <li key={produto.id} className="produto">
                <h3>{produto.nome}</h3>
                <p>{produto.categoria}</p>
                <p className="preco">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                <button
                  className="botao"
                  onClick={() => showToast(`${produto.nome} adicionado ao carrinho!`, 'sucesso')}
                >
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

        <section id="detalhes" className="card" aria-labelledby="titulo-detalhes">
          <h2 id="titulo-detalhes">Detalhes do produto</h2>
          <Tabs tabs={abasProduto} />
        </section>

        <section className="card" aria-labelledby="titulo-upload">
          <h2 id="titulo-upload">Enviar foto do produto</h2>
          <ProgressBar value={progress} label="Upload da imagem" />
          <div className="botoes">
            <button className="botao" onClick={iniciarUpload} disabled={uploading}>
              {uploading ? 'Enviando...' : 'Simular upload'}
            </button>
          </div>
        </section>

        <section id="faq" className="card" aria-labelledby="titulo-faq">
          <h2 id="titulo-faq">Perguntas frequentes</h2>
          <Accordion items={perguntas} />
        </section>

        <section className="card" aria-labelledby="titulo-notificacoes">
          <h2 id="titulo-notificacoes">Notificações</h2>
          <p>Veja os três tipos de aviso da loja.</p>
          <div className="botoes">
            <button className="botao botao-sucesso" onClick={() => showToast('Pedido confirmado!', 'sucesso')}>
              Sucesso
            </button>
            <button className="botao botao-erro" onClick={() => showToast('Pagamento recusado.', 'erro')}>
              Erro
            </button>
            <button className="botao" onClick={() => showToast('Frete grátis hoje.', 'info')}>
              Info
            </button>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <p>© 2026 Loja Virtual. Atividade de Tópicos Avançados em Programação.</p>
      </footer>
    </>
  )
}

export default App