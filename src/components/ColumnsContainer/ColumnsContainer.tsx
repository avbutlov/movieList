import React from "react";
import Column from "../Column/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styles from './ColumnsContainer.module.css';
import { useDispatch } from "react-redux";
import { fetchMovies, setColumns } from "../../redux/actions/movies";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IMovie } from "../../types/movies";
import Notification from "../Notification/Notification";

const ColumnsContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { stateMovies, stateColumns, columnsIds, fetchError } = useTypedSelector((state) => ({
    stateMovies: state.moviesReducer.movies,
    stateColumns: state.moviesReducer.columns,
    columnsIds: state.moviesReducer.columnsIds,
    fetchError: state.moviesReducer.error
  }));

  React.useEffect(() => {
    if (!stateMovies.length) {
      dispatch(fetchMovies());
    }
  }, [dispatch, stateMovies.length]);

  const onDragEnd = (result: DropResult): void => {
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

    const startColumn = stateColumns[source.droppableId];
    const finishColumn = stateColumns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTasksIds = [...startColumn.moviesIds];
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, +draggableId);

      const newColumn = {
        ...startColumn,
        moviesIds: newTasksIds,
      };

      dispatch(
        setColumns({
          ...stateColumns,
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
      finishTasksIds.splice(destination.index, 0, +draggableId);

      const newFinishColumn = {
        ...finishColumn,
        moviesIds: finishTasksIds,
      };

      dispatch(
        setColumns({
          ...stateColumns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        })
      );
    }
  };

  const groupMoviesById = (array: Array<any>, key: string): Record<string, IMovie> => {
    return array.reduce((result, item) => {
      result[item[key]] = item;
      return result;
    }, {});
  };

  if (fetchError) {
    return <Notification text='Ooops... something goes really wrong'/>
  }

  return (
    <div className={styles.columnsWrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columnsIds.map((columnId) => {
          const column = stateColumns[columnId];
          const groupedMovies = groupMoviesById(stateMovies, "id");
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
