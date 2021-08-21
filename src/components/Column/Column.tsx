import React from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import { IColumn, IMovie } from "../../types/movies";
import Filter from "../Filter/Filter";
import MovieItem from "../MovieItem/MovieItem";
import "./Column.css";

interface IColumnProps {
  title: string,
  movies: Array<IMovie>,
  column: IColumn,
}

const Column: React.FC<IColumnProps> = ({ title, movies, column }) => {
  const [filter, setFilter] = React.useState<string>('');

  const filterMovieArray = (array: Array<any>, option: string, filterText: string): Array<IMovie> => {
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
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            className={
              snapshot.isDraggingOver ? "movie-list dragged-over" : "movie-list"
            }
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filterMovieArray(movies, "title", filter).map((movie: IMovie, index: number) => {
              return (
                <MovieItem
                  imageURL={movie.imageURL}
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
