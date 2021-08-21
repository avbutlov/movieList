import React from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { IMovie } from "../../types/movies";
import styles from "./MovieItem.module.css";

interface IMovieItemProps {
  movie: IMovie,
  index: number,
  imageURL: string,
}

const MovieItem: React.FC<IMovieItemProps> = ({ movie, index, imageURL }) => {
  
  return movie.isVisible ? (
    <Draggable key={movie.id} draggableId={movie.id.toString()} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${styles.itemContainer} ${snapshot.isDragging ? styles.dragging : ''}`}
          >
            <img className={styles.movieAvatar} src={imageURL} alt={movie.title}></img>
            <div className={styles.contentContainer}>
            {movie.title}
            <div className={styles.subContent}>{movie.release_year}</div>
            </div>
          </div>
        );
      }}
    </Draggable>
  ) : null;
}

export default MovieItem;
