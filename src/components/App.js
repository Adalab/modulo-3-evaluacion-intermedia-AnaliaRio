import { useEffect, useState } from 'react';
import '../styles/App.scss';
import getQuotes from '../services/fetch';
import ls from '../services/localStorage';

function App() {

  // ---------- STATE VARIABLES ----------
  
  const [data, setData] = useState(ls.get("quotes", [])); // Local storage

  // Filters / Search
  const [filterQuote, setFilterQuote] = useState(""); // Filter 1
  const [filterCharacter, setFilterCharacter] = useState("all"); // Filter 2
  
  // Add quote
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: "",
  });

  // ---------- FETCH & LOCAL STORAGE ----------
  useEffect(() => {
    if (data.length === 0) {
      getQuotes().then(dataFromAPI => {
        ls.set("quotes", dataFromAPI);
        setData(dataFromAPI);
      });
    }
  }, []);

  // ---------- FUNCTIONS ----------
  // 1. Function to modify search button state variable - Detects what you write
  const handleSearch = (ev) => {
    setFilterQuote(ev.target.value);
  }

  // 2. Function to modify search button state variable - Detects what you select
  const handleSearchCharacter = (ev) => {
    setFilterCharacter(ev.target.value);
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

  // ---------- PAINT IN HTML - 1st FILTER & 2nd MAP (concatenate)

  const htmlData = data

  // ---------- FILTER ----------
  .filter(oneQuote =>
    oneQuote.quote.toLowerCase().includes(filterQuote.toLowerCase())
  )

  // .filter(oneQuote =>
  //   oneQuote.character.toLowerCase().includes(filterCharacter.toLowerCase())
  // )

  .filter(oneQuote => {

      // return (filterCharacter === "all") ? true : (filterCharacter === oneQuote.character);

      //return (filterCharacter === "all") || (filterCharacter === oneQuote.character);
      
      if (filterCharacter === "all") {
        return true;
      }
      else if (filterCharacter === oneQuote.character) {
        return true;
      }
      // Los no seleccionados
      else {
        return false;
      }
    }
  )

  // ---------- MAP - Paint characters ----------
  .map((quote, i)=> {
    return (
      <li className="quote__item" key={i}>
        <p className="quote__name">
          {quote.quote} - {quote.character}
        </p>
      </li>
    );
  });

//   let diaSemana = 'lunes';

//   if( diaSemaqna ==== "l")
//  {
//    console.log("Atrabajar");
//  }
//  else if( disSemana === "M") {
//    console.log("Animo");
//  }
//  else if ( diaSemana === "Miércoles") {
//    console.log("Ya vamos por la mitad");
//  }

  return (
    <div className="page">

      {/* ---------- HEADER ---------- */}
      <header className="header">
        <a target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=Xs-HbHCcK58">  <h1 className="header__title">Frases de Friends 🦞</h1></a>
        <form>
          <label htmlFor="filterQuote">Filtrar por frase</label>
          <input
            className="header__search"
            autoComplete="off"
            name="search"
            type="search"
            placeholder="Escribe una frase"
            onChange={handleSearch}
            value={filterQuote}
          />
        </form>
        <form>
          <label htmlFor="characters">Filtrar por personaje</label>
          <select
            name="characters"
            id="characters"
            className="header__search"
            onChange={handleSearchCharacter}
            value={filterCharacter}
          >
            <option value="all">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
            <option value="Janice">Janice</option>
          </select>
        </form>
      </header>

      <main>

        {/* ---------- QUOTE LIST ---------- */}
        <ul className="quote__list">
          {/* {htmlData.length === 0 && "No hay resultados"} */}
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