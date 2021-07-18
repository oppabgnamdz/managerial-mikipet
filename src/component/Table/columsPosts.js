export const COLUMNSPOSTS = [
  {
    Header: 'Id',
    accessor: '_id',
  },
  {
    Header: 'Tags',
    accessor: (d) => (d.tags ? d.tags.toString() : 'undefined'),
  },
  {
    Header: 'Liked',
    accessor: (d) => (d.liked ? d.liked.length : 'undefined'),
  },
  {
    Header: 'Reported',
    accessor: (d) => (d.reported ? d.reported.length : 'undefined'),
  },
  {
    Header: 'Comments',
    accessor: (d) => (d.comments ? d.comments.length : 'undefined'),
  },
  {
    Header: 'Create At',
    accessor: 'created_date',
  },
  // {
  //   Header: 'Image Url',
  //   accessor: 'imgUrl',
  // },
  {
    Header: 'Content',
    accessor: 'textDescription',
  },
  {
    Header: 'Owner Post',
    accessor: (d) => (d.ownerId ? d.ownerId.account : 'undefined'),
  },
];
