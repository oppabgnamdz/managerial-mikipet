export const COLUMNS = [
	{
		Header: 'Id',
		accessor: '_id',
	},
	{
		Header: 'Account',
		accessor: 'account',
	},
	{
		Header: 'Create at',
		accessor: 'created_date',
	},
	{
		Header: 'Email',
		accessor: 'email',
	},
	{
		Header: 'Reported',
		accessor: (d) => (d.reported ? d.reported.length : 'undefined'),
	},
	{
		Header: 'Birth day',
		accessor: 'birthDay',
	},
	{
		Header: 'Display Name',
		accessor: 'displayName',
	},
	{
		Header: 'Active',
		accessor: (d) => (d.active ? 'active' : 'locked'),
	},
];
