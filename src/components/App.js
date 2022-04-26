import '../styles/App.scss';
import quoteList from "../data/quotes.json";
import { useState } from 'react';

function App() {
  console.log(quoteList);

  // ---------- STATE VARIABLES ----------
  const [data, setData] = useState(quoteList);
  const [search, setSearch] = useState("");
  const [searchByCharacter, setSearchByCharacter] = useState("");

  // Quote I'm adding
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: "",
  });

  // ---------- FUNCTIONS ----------
  // 1. Function to modify search button state variable
  const handleSearch = (ev) => {
    setSearch(ev.target.value);
  }

  // 2. Function to modify search button state variable
  const handleSearchByCharacter = (ev) => {
    setSearchByCharacter(ev.target.value);
  };

  // 3. Function to add new quote - SPREAD changes a single property of an object
  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newQuote, // Keep what you already have
      [ev.target.id]: ev.target.value, // Corchetes porque es una propiedad de un objeto que está guardada en una variable
      // ID coge nombre de la propiedad del objeto
    });
  };

  // 4. Function to paint new element - PUSH
  const handleClickAdd = (ev) => {
    ev.preventDefault();
    setData([ // Square brackets because "setData" is an array. I'm using "setData" because I want to modify "data" 
      ...data, // Keep what you already have
      newQuote // Add a new element
    ]);
    setNewQuote({
      quote: "",
      character: "",
    });
  };

  // PAINT IN HTML - Filter first and then MAP (concatenate)
  const htmlData = data

  .filter(
    (oneQuote) =>
      oneQuote.quote.toLowerCase().includes(search.toLowerCase()) ||
      oneQuote.character.toLowerCase().includes(search.toLowerCase())
  )
  .filter(
    (oneQuote) =>
      oneQuote.quote.toLowerCase().includes(searchByCharacter.toLowerCase()) ||
      oneQuote.character.toLowerCase().includes(searchByCharacter.toLowerCase())
  )

  .map((quote, i)=> {
    return (
      <li className="quote__item" key={i}>
        <p className="quote__name">
          {quote.quote} - {quote.character}
        </p>
      </li>
    );
  });

  return (
    <div className="page">

      {/* ---------- HEADER ---------- */}
      <header className="header">
        <a target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=Xs-HbHCcK58">  <h1 className="header__title">Frases de Friends 🦞</h1></a>
      
        <form>
          <label htmlFor="">Filtrar por frase</label>
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

        <form>
          <label htmlFor="characters">Filtrar por personaje</label>
          <select
            name="characters"
            id="characters"
            className="header__search"
            onChange={handleSearchByCharacter}
            value={searchByCharacter}
          >
            <option value="Todos">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
          </select>
      
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
            placeholder="F · r · a · s · e"
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