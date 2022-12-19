import React from 'react';

const Header = ({name}) => (
  <div>Header: {name}</div>
)

export default React.memo(Header);