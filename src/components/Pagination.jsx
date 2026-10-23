import './Pagination.css'

function Pagination({ totalPages, currentPage, onPageChange }) {
  const paginas = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="pagination" aria-label="Paginação de produtos">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹ Anterior
      </button>

      <ul className="pagination-list">
        {paginas.map((pagina) => (
          <li key={pagina}>
            <button
              className={`pagination-button ${pagina === currentPage ? 'atual' : ''}`}
              onClick={() => onPageChange(pagina)}
              aria-label={`Página ${pagina}`}
              aria-current={pagina === currentPage ? 'page' : undefined}
            >
              {pagina}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        Próxima ›
      </button>
    </nav>
  )
}

export default Pagination