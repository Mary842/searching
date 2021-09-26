import React, { useState, useEffect } from 'react';
import './App.css';
import { People, Films } from 'swapi-ts';
import { Person } from './Person';
import Table from 'react-bootstrap/Table';

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
					films: person.value.films.map(film => films.get(film.toString()) || "").join(", "),
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
    <div className="app">
			<div className="searchContainer">
				<input
					value={searchTerm}
					onChange={event => setSearchTerm(event.target.value)}
					className="form-control"
					placeholder="Search for character"
				/>
      </div>
      <div className="tableContainer">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Name</th>
							<th>Height</th>
							<th>Mass</th>
							<th>Hair color</th>
							<th>Skin color</th>
							<th>Eye color</th>
							<th>Year of birth</th>
							<th>Gender</th>
							<th>Films</th>
						</tr>
					</thead>
					<tbody>
						{people.map((person, i) => (
							<tr key={i}>
								<td>{person.name}</td>
								<td>{person.height}</td>
								<td>{person.mass}</td>
								<td>{person.hairColor}</td>
								<td>{person.skinColor}</td>
								<td>{person.eyeColor}</td>
								<td>{person.birthYear}</td>
								<td>{person.gender}</td>
								<td>{person.films}</td>
							</tr>))
						}
					</tbody>
				</Table>
			</div>
    </div>
  );
}

export default App;
