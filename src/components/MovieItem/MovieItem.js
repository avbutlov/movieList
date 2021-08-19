import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./MovieItem.css";

function MovieItem({ movie, index, image }) {
  
  const movieReleaseYear = movie.release_date.split('-')[0];

  return movie.isVisible ? (
    <Draggable draggableId={movie.id.toString()} index={index}>
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
            <div className='subcontent'>{movieReleaseYear}</div>
            </div>
          </div>
        );
      }}
    </Draggable>
  ) : null;
}

export default MovieItem;
