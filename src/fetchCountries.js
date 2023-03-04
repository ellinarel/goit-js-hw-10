export  {fetchCountries}

function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/{name}`;
    fetch(url)
        .then(r => {
            if (!r.ok) { throw new Error(r.status) }
            return r.json()
         
        })}