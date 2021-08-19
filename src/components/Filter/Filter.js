import React from "react";
import './Filter.css'

function Filter({onInput}) {
  const [filterValue, setFilterValue] = React.useState("");

  return (
    <div>
      <input
      className='filter'
        type="text"
        value={filterValue}
        placeholder='Type to search...'
        onChange={(event) => {
          setFilterValue(event.target.value);
          onInput(event.target.value);
        }}
      ></input>
    </div>
  );
}

export default Filter;
