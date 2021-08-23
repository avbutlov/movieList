import React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IColumn, IMovie, IItemIcons } from "../../types/movies";
import Button from "../Button/Button";
import styles from "./MovieItem.module.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface IMovieItemProps {
  movie: IMovie;
  index: number;
  imageURL: string;
  column: IColumn;
  moveItemsToNextColumn: (
    startColumn: IColumn,
    finishColumn: IColumn,
    itemId: number,
    startIndex: number,
    finishIndex: number
  ) => void;
}

const MovieItem: React.FC<IMovieItemProps> = ({movie, index, imageURL, column, moveItemsToNextColumn}) => {
  const { stateColumns, stateColumnsIds } = useTypedSelector((state) => ({
    stateColumns: state.moviesReducer.columns,
    stateColumnsIds: state.moviesReducer.columnsIds,
  }));

  const itemIcons: IItemIcons = {
    firstColumn: <AiOutlineEye/>,
    secondColumn: <AiOutlineEyeInvisible/>
  }

  const moveMovieItem = (): void => {
    const finishColumnId = stateColumnsIds.filter(
      (columnId) => columnId !== column.id
    )[0];
    const finishColumn = stateColumns[finishColumnId];
    const itemIndex = column.moviesIds.indexOf(movie.id);
    moveItemsToNextColumn(column, finishColumn, movie.id, itemIndex, 0);
  };

  return movie.isVisible ? (
    <Draggable key={movie.id} draggableId={movie.id.toString()} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${styles.itemContainer} ${
              snapshot.isDragging ? styles.dragging : ""
            }`}
          >
            <div className={styles.contentContainer}>
            <img
              className={styles.movieAvatar}
              src={imageURL}
              alt={movie.title}
            ></img>
            <div className={styles.mainContent}>
              {movie.title}
              <div className={styles.subContent}>{movie.release_year}</div>
            </div>
            </div>
            <div className={styles.btnWrapper}>
            <Button onClick={moveMovieItem} text="">
              {itemIcons[column.id]}
            </Button>
            </div>
          </div>
        );
      }}
    </Draggable>
  ) : null;
};

export default MovieItem;
