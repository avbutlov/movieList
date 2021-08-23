import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { IColumn, IItemIcons, IMovie, MovieKeyType } from "../../types/movies";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./Column.module.css";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface IColumnProps {
  title: string;
  movies: Array<IMovie>;
  column: IColumn;
  moveItemsToNextColumn: (startColumn: IColumn, finishColumn: IColumn) => void;
}

const Column: React.FC<IColumnProps> = ({
  title,
  movies,
  column,
  moveItemsToNextColumn,
}) => {
  const [filter, setFilter] = React.useState<string>("");

  const { stateColumns, stateColumnsIds } = useTypedSelector((state) => ({
    stateColumns: state.moviesReducer.columns,
    stateColumnsIds: state.moviesReducer.columnsIds,
  }));

  const columnIcons: IItemIcons = {
    firstColumn: <AiOutlineEye />,
    secondColumn: <AiOutlineEyeInvisible />,
  };

  const filterMovieArray = (
    array: Array<IMovie>,
    key: MovieKeyType,
    filterText: string
  ): Array<IMovie> => {
    if (!filterText) return array;
    return array.map((item) => {
      let itemOption = item[key];
      if (`${itemOption}`.toUpperCase().includes(filterText.toUpperCase())) {
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

  const swapItemsInColumns = (): void => {
    const finishColumnId = stateColumnsIds.filter(
      (columnId) => columnId !== column.id
    )[0];
    const finishColumn = stateColumns[finishColumnId];
    moveItemsToNextColumn(column, finishColumn);
  };


  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h4>{title}</h4>
        <TextInput placeholder="Type to search..." onInput={setFilter} />
        <div className={styles.btnWrapper}>
          <Button disabled={!column.moviesIds.length} onClick={swapItemsInColumns} text="Everything to">
            {columnIcons[column.id]}
          </Button>
        </div>
      </div>
      <Droppable droppableId={column.id}>
        {(provided: DroppableProvided) => (
          <div
            className={styles.movieList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filterMovieArray(movies, "title", filter).map(
              (movie: IMovie, index: number) => {
                return (
                  <MovieItem
                    imageURL={movie.imageURL}
                    index={index}
                    movie={movie}
                    key={movie.id}
                    column={column}
                    moveItemsToNextColumn={moveItemsToNextColumn}
                  />
                );
              }
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
