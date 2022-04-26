import '../styles/App.scss';
import quoteList from "../data/quotes.json";
import { useState } from 'react';

function App() {
  console.log(quoteList);

  // VARIABLES DE ESTADO
  const [data, setData] = useState(quoteList);
  const [search, setSearch] = useState("");

  // Frase que estoy añadiendo en ese momento
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: "",
  });


  // Función encargada de modificar variable de estado botón búsqueda
  const handleSearch = (ev) => {
    setSearch(ev.target.value);
  }

  // Función encargada de modificar añadir nueva frase - SPREAD (más o menos un push) - Modifica solo una propiedad de un objeto, pero no todo
  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newQuote, // Quédate con todo lo que tengas
      [ev.target.id]: ev.target.value, // Corchetes porque es una propiedad de un objeto que está guardada en una variable
      // ID coge nombre de la propiedad del objeto
    });
  };

  // Función encargada de pintar (añadir) - PUSH
  const handleClickAdd = (ev) => {
    ev.preventDefault();
    setData([ // Corchetes porque setData es un array. SetData porque queremos modificar data
      ...data, // Quédate con lo que ya tienes
      newQuote //Añade un nuevo elemento
    ]);
    setNewQuote({
      quote: "",
      character: "",
    });
  };

  // Para pintar el HTML - Filtrar primero y luego MAP (se concatenan)
  const htmlData = data

  .filter(
    (oneQuote) =>
      oneQuote.quote.toLowerCase().includes(search.toLowerCase()) ||
      oneQuote.character.toLowerCase().includes(search.toLowerCase())
  )

  .map((quote, i)=> {
    return (
      <li className="quote__item" key={i}>
        <p className="quote__name">
          <label className="quote__label">Nombre:</label>{quote.quote} {quote.quote}
        </p>
        <p className="quote__phone">
          <label className="quote__label">Teléfono:</label>
        </p>
    </li>
    );
  });

  return (
    <div className="page">
      {/* ---------- HEADER ---------- */}
      <header className="header">
        <h1 className="header__title">Frases de Friends</h1>


        <form>
          <input
            className="header__search"
            autoComplete="off"
            name="search"
            type="search"
            placeholder="Filtrar por frase"
            onChange={handleSearch}
            value={search}
          />
        </form>
      </header>

      <main>

        {/* ---------- QUOTE LIST ---------- */}
        <ul className="quote__list">
          {htmlData}
        </ul>

        {/* ---------- ADD NEW QUOTE ---------- */}
        <form className="new-quote__form">
          <h2 className="new-quote__title">Añade una nueva frase</h2>
          <input
            className="new-quote__input"
            type="text"
            name="quote"
            id="quote"
            placeholder="Frase"
            onChange={handleNewQuote}
            value={newQuote.quote}
          />
          <input
            className="new-quote__input"
            type="text"
            name="character"
            id="character"
            placeholder="Personaje"
            onChange={handleNewQuote}
            value={newQuote.character}

          />
          <input
            className="new-quote__btn"
            type="submit"
            value="Añadir"
            onClick={handleClickAdd}
          />
        </form>
      </main>
    </div>
  );
}

export default App;