import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./MovieItem.css";

function MovieItem({ movie, index, image }) {
  
  return movie.isVisible ? (
    <Draggable key={movie.id} draggableId={movie.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`item-container ${snapshot.isDragging ? 'dragging' : ''}`}
          >
            <img className="movie-avatar" src={image} alt={movie.title}></img>
            <div className='content-container'>
            {movie.title}
            <div className='subcontent'>{movie.release_year}</div>
            </div>
          </div>
        );
      }}
    </Draggable>
  ) : null;
}

export default MovieItem;
