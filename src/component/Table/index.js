import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from 'react-table';
import {
	urlChangeStatusAccount,
	urlDeletePost,
	urlPassPost,
	urlPosts,
	urlPostsReported,
	urlUsers,
} from '../../constant';
import { Paging } from '../../utils';
import Loading from '../Loading';
import Search from '../Search';
import { COLUMNS } from './columnsUsers';
import { COLUMNSPOSTS } from './columsPosts';
import './table.scss';
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement(document.getElementById('root'));
export default function Index() {
	const [data, setData] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [active, setActive] = useState('undefined');
	const [account, setAccount] = useState();
	const [idPostDelete, setIdPostDelete] = useState('');
	const [idShow, setIdShow] = useState('');

	const dispatch = useDispatch();
	const urlFetch = useSelector((state) => state.goTable);
	const loading = useSelector((state) => state.loading);
	const reRender = useSelector((state) => state.reRender);
	const columns = useMemo(() => COLUMNS, []);
	const columnsPosts = useMemo(() => COLUMNSPOSTS, []);
	const compare = urlFetch === urlUsers ? columns : columnsPosts;
	const position = localStorage.getItem('position');
	useEffect(() => {
		const fetchDataUser = async () => {
			const response = await axios.get(urlFetch);
			if (!response) return;
			setData(response.data);
			dispatch({ type: 'FINISH' });
		};
		fetchDataUser();
	}, [reRender]);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		nextPage,
		previousPage,
		page,
		canNextPage,
		canPreviousPage,
		setGlobalFilter,
		pageOptions,
	} = useTable(
		{
			columns: compare,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);
	function openModal(value) {
		if (urlFetch === urlUsers) {
			setIsOpen(true);
			setActive(value[6].value);
			setAccount(value[1].value);
			setIdShow(value[0].value);

			console.log(value);
			return;
		}
		if (urlFetch === urlPostsReported) {
			setIsOpen(true);
			setIdPostDelete(value[0].value);
			return;
		}
		if (urlFetch === urlPosts) {
			setIsOpen(true);
			setIdPostDelete(value[0].value);
		}
	}
	function afterOpenModal(e) {
		// references are now sync'd and can be accessed.
	}
	const deletePostReport = async () => {
		const response = await axios.post(urlDeletePost, { id: idPostDelete });
		if (response.status === 200) {
			dispatch({ type: 'RE_RENDER' });
			dispatch({ type: 'LOADING' });
		}
		closeModal();
	};
	const passPostReport = async () => {
		const response = await axios.post(urlPassPost, {
			id: idPostDelete,
			refresh: true,
		});
		console.log({ idPostDelete });
		if (response.status === 200) {
			dispatch({ type: 'RE_RENDER' });
			dispatch({ type: 'LOADING' });
		}
		closeModal();
	};
	const updateStatusUser = async () => {
		const response = await axios.post(urlChangeStatusAccount, { account });
		if (response.status === 200) {
			dispatch({ type: 'RE_RENDER' });
			dispatch({ type: 'LOADING' });
		}
		closeModal();
	};
	async function closeModal() {
		setIsOpen(false);
	}
	const rowClick = (row) => {
		if (urlFetch === urlUsers) {
			openModal(row.cells);
		} else if (urlFetch === urlPosts) {
			openModal(row.cells);
		} else {
			openModal(row.cells);
		}
	};

	const { globalFilter, pageIndex } = state;
	return (
		<div>
			<Search filter={globalFilter} setFilter={setGlobalFilter} />
			<div
				style={{
					overflowY: 'scroll',
					height: '60vh',
					position: 'relative',
				}}
			>
				{!loading ? (
					<div className="content-table">
						<table {...getTableProps()}>
							<thead>
								{headerGroups.map((headerGroup) => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column) => (
											<th
												{...column.getHeaderProps(
													column.getSortByToggleProps()
												)}
											>
												{column.render('Header')}
												<span>
													{column.isSorted
														? column.isSortedDesc
															? ' 🔽'
															: ' 🔼'
														: ''}
												</span>
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()}>
								{page.map((row) => {
									prepareRow(row);
									return (
										<tr
											style={{ cursor: 'pointer' }}
											onClick={() => {
												if (
													urlFetch === urlPostsReported &&
													position === 'admin-report'
												) {
													console.log('qwe');
													rowClick(row);
													return;
												}
												if (urlFetch === urlPosts && position === 'admin') {
													rowClick(row);
													return;
												}
												if (
													urlFetch === urlPostsReported &&
													position === 'admin'
												) {
													rowClick(row);
													return;
												}
												if (
													urlFetch === urlPosts &&
													position === 'admin-post'
												) {
													console.log('abc');
													rowClick(row);
													return;
												}
											}}
											{...row.getRowProps()}
										>
											{row.cells.map((cell) => {
												if (cell.column.Header === 'Active') {
													return (
														<td
															onClick={(event) => {
																if (
																	position === 'admin-user' ||
																	position === 'admin'
																) {
																	event.stopPropagation();
																	rowClick(row);
																}
															}}
														>
															{cell.value.toString() === 'active' ? (
																<span>{cell.render('Cell')}</span>
															) : (
																<span style={{ color: 'red' }}>
																	{cell.render('Cell')}
																</span>
															)}
														</td>
													);
												}
												if (cell.column.Header === 'Id') {
													return (
														<td
															onClick={(event) => {
																event.stopPropagation();
															}}
														>
															{cell.render('Cell')}
														</td>
													);
												}
												if (cell.value.toString().indexOf('http') !== -1) {
													return (
														<td
															onClick={(event) => {
																event.stopPropagation();
																setIsOpen(false);
															}}
															className="table-cell"
															{...cell.getCellProps()}
														>
															<a target="_blank" href={cell.value}>
																{cell.render('Cell')}
															</a>
														</td>
													);
												}

												return (
													<td className="table-cell" {...cell.getCellProps()}>
														{cell.render('Cell')}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : (
					<Loading />
				)}
			</div>
			<div>
				<span style={{ paddingRight: 10 }}>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>
				</span>
				<button
					onClick={async () => {
						dispatch({ type: 'LOADING' });
						Paging(pageIndex - 1, urlFetch);
						setTimeout(() => {
							previousPage();
							dispatch({ type: 'FINISH' });
							console.log('b');
						}, 1000);
					}}
					disabled={!canPreviousPage}
				>
					Previous
				</button>
				<button
					onClick={() => {
						dispatch({ type: 'LOADING' });
						Paging(pageIndex + 1, urlFetch);
						setTimeout(() => {
							nextPage(pageIndex, urlFetch);
							dispatch({ type: 'FINISH' });
						}, 1000);
					}}
					disabled={!canNextPage}
				>
					Next
				</button>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				{urlFetch === urlUsers && (
					<div>
						<h2>{idShow}</h2>
						<h2>
							Account is <strong style={{ color: 'red' }}>{active}</strong>
						</h2>
						<p>Do you want to change the status of this account ? </p>
						<div className="change-status">
							<button onClick={updateStatusUser}>Update</button>
						</div>
					</div>
				)}
				{urlFetch === urlPostsReported && (
					<div>
						<h2>{idPostDelete}</h2>
						<p>What would you want ? </p>
						<div className="change-status">
							<button onClick={deletePostReport}>Delete Post</button>
							<button
								style={{ backgroundColor: '#4caf50' }}
								onClick={passPostReport}
							>
								Pass Post
							</button>
						</div>
					</div>
				)}
				{urlFetch === urlPosts && (
					<div>
						<h2>{idPostDelete}</h2>
						<p>What would you want ? </p>
						<div className="change-status">
							<button onClick={deletePostReport}>Delete Post</button>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}
