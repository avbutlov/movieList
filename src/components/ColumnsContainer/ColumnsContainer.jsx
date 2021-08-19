import React from "react";
import Column from "../Column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import "./ColumnsContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setColumns } from "../../redux/actions/movies";

function ColumnsContainer() {
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state);

  React.useEffect(() => {
    if (!movieData.movies.length) {
      dispatch(fetchMovies());
    }
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = movieData.columns[source.droppableId];
    const finishColumn = movieData.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTasksIds = [...startColumn.moviesIds];
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        moviesIds: newTasksIds,
      };

      dispatch(
        setColumns({
          ...movieData.columns,
          [newColumn.id]: newColumn,
        })
      );
    } else {
      const startTasksIds = [...startColumn.moviesIds];
      startTasksIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        moviesIds: startTasksIds,
      };

      const finishTasksIds = [...finishColumn.moviesIds];
      finishTasksIds.splice(destination.index, 0, draggableId);

      const newFinishColumn = {
        ...finishColumn,
        moviesIds: finishTasksIds,
      };

      dispatch(
        setColumns({
          ...movieData.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        })
      );
    }
  };

  const groupDataByValue = (array, value) => {
   return array.reduce((result, item) => {
      result[item[value]] = item;
      return result;
    }, {});
  };

  return (
    <div className="columns-wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
        {movieData.columnsIds.map((columnId) => {
          const column = movieData.columns[columnId];
          const groupedMovies = groupDataByValue(movieData.movies, "id");
          const movies = column.moviesIds.map(
            (movieId) => groupedMovies[movieId]
          );
          return (
            <Column
              movies={movies}
              column={column}
              title={column.title}
              key={column.id}
            ></Column>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default ColumnsContainer;
