import React from 'react';
import Navigation from '../Navigation';
import Header from '../Header';
import Table from '../Table';
import { useSelector } from 'react-redux';
import { checkURL } from '../../hooks';
import './style.scss';
export default function Index() {
	const urlFetch = useSelector((state) => state.goTable);
	console.log('🚀 ~ file: index.js ~ line 10 ~ Index ~ urlFetch', urlFetch);
	return (
		<div className="App">
			<div className="main-flex">
				<Navigation className="navigation" />
				<div className="app-content">
					<Header />
					<h1>{checkURL(urlFetch)}</h1>
					<Table />
				</div>
			</div>
		</div>
	);
}
