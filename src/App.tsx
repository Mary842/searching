import React, { useState, useEffect } from 'react';
import './App.css';
import { People } from 'swapi-ts';
import { Person } from './Person';

const App = () => {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [people, setPeople] = useState<Person[]>([]);

	useEffect(() => {
		People.findBySearch([searchTerm])
			.then(response => {
				const people = response.resources.map(person => ({
					name: person.value.name,
					films: person.value.films,
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
	}, [searchTerm]);

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
