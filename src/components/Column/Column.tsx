import React from "react";
import {
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import { IColumn, IMovie, IMovieKeyType } from "../../types/movies";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./Column.module.css";
import TextInput from "../TextInput/TextInput";

interface IColumnProps {
  title: string;
  movies: Array<IMovie>;
  column: IColumn;
}

const Column: React.FC<IColumnProps> = ({ title, movies, column }) => {
  const [filter, setFilter] = React.useState<string>("");

  const filterMovieArray = (array: Array<IMovie>, key: IMovieKeyType, filterText: string): Array<IMovie> => {
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

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h4>{title}</h4>
        <TextInput placeholder='Type to search...' onInput={setFilter} />
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
