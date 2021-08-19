import React from "react";
import { Droppable } from "react-beautiful-dnd";
import MovieItem from "../MovieItem/MovieItem";
import "./Column.css";

function Column({ title, movies, column }) {
  return (
    <div className="column">
      <h4>{title}</h4>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={
              snapshot.isDraggingOver ? "movie-list dragged-over" : "movie-list"
            }
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {movies.map((movie, index) => {
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
