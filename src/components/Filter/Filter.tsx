import React from "react";
import './Filter.css'

interface IFilterProps {
  onInput: (filter: string) => void,
}

const Filter: React.FC<IFilterProps> = ({onInput}) => {
  const [filterValue, setFilterValue] = React.useState<string>("");

  return (
    <div>
      <input
      className='filter'
        type="text"
        value={filterValue}
        placeholder='Type to search...'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFilterValue(event.target.value);
          onInput(event.target.value);
        }}
      ></input>
    </div>
  );
}

export default Filter;
