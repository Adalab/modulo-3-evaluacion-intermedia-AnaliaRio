const getQuotes = () => {
    return fetch("https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

export default getQuotes;