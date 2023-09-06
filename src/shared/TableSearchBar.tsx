import React, { useState } from 'react';

export default function TableSearchBar(handleChange) {
  const [searchInput, setSearchInput] = useState('');
  return (
    <div>
      <input
        type='text'
        placeholder='Search here'
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
}
