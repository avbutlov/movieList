import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Filter from "../Filter/Filter";
import MovieItem from "../MovieItem/MovieItem";
import "./Column.css";

function Column({ title, movies, column }) {
  const [filter, setFilter] = React.useState(null);

  const filterList = (array, option, filterText) => {
    if (!filterText) return array;
    return array.map((item) => {
      let itemOption = item[option];
      if (itemOption.toUpperCase().includes(filterText.toUpperCase())) {
        return {
          ...item,
          isVisible: true,
        };
      } else {
        return {
          ...item,
          isVisible: false,
        };
      }
    });
  };

  return (
    <div className="column">
      <div className="column-header">
        <h4>{title}</h4>
        <Filter onInput={setFilter} />
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={
              snapshot.isDraggingOver ? "movie-list dragged-over" : "movie-list"
            }
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filterList(movies, "title", filter).map((movie, index) => {
              return (
                <MovieItem
                  image={movie.image}
                  index={index}
                  movie={movie}
                  key={movie.id}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
