import React, { useState, useEffect } from 'react';
import './App.css';
import { People, Films } from 'swapi-ts';
import { Person } from './Person';

const App = () => {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [people, setPeople] = useState<Person[]>([]);
	const [films, setFilms] = useState<Map<string, string>>(new Map());

	useEffect(() => {
		Films.findBySearch([""])
			.then(response => {
				const urlsToTitles = new Map<string, string>();
				response.resources.forEach(film => urlsToTitles.set(film.value.url, film.value.title));
				setFilms(urlsToTitles);
			});
	}, []);

	useEffect(() => {
		People.findBySearch([searchTerm])
			.then(response => {
				const people = response.resources.map(person => ({
					name: person.value.name,
					films: person.value.films.map(film => films.get(film.toString()) || ""),
					height: person.value.height,
					mass: person.value.mass,
					hairColor: person.value.hair_color,
					skinColor: person.value.skin_color,
					eyeColor: person.value.eye_color,
					birthYear: person.value.birth_year,
					gender: person.value.gender
				}));
				setPeople(people);
			});
	}, [searchTerm, films]);

  return (
    <div className="App">
    	<input
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      {people.map((person, i) => (<div key={i}>{person.name}</div>))}
    </div>
  );
}

export default App;
