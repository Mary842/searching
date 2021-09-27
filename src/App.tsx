import React, { useState, useEffect } from 'react';
import './App.css';
import { Person } from './Person';
import Table from 'react-bootstrap/Table';
import axios from "axios";

const App = () => {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [people, setPeople] = useState<Person[]>([]);
	const [films, setFilms] = useState<Map<string, string>>(new Map());
  const [debouncedSearch, setDebouncedValue] = useState(searchTerm);
  const delay = 500;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

	useEffect(() => {
		axios.get("https://swapi.dev/api/films")
			.then(response => {
				const urlsToTitles = new Map<string, string>();
				response.data.results.forEach((film: any) => urlsToTitles.set(film.url, film.title));
				setFilms(urlsToTitles);
			});
	}, []);

	useEffect(() => {
		axios.get(`https://swapi.dev/api/people/?search=${debouncedSearch}`)
			.then(response => {
				const people = response.data.results.map((person: any) => ({
					name: person.name,
					films: person.films.map((film: string) => films.get(film || "")).join(", "),
					height: person.height,
					mass: person.mass,
					hairColor: person.hair_color,
					skinColor: person.skin_color,
					eyeColor: person.eye_color,
					birthYear: person.birth_year,
					gender: person.gender
				}));
				setPeople(people);
			});
	}, [debouncedSearch, films]);

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
