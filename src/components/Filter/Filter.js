import React from "react";

function Filter({filterList}) {
  const [filterValue, setFilterValue] = React.useState("");

  return (
    <div>
      <input
        type="text"
        value={filterValue}
        onChange={(event) => {
          setFilterValue(event.target.value);
          filterList(event.target.value);
        }}
      ></input>
    </div>
  );
}

export default Filter;
