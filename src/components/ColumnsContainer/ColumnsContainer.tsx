import React from "react";
import Column from "../Column/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styles from "./ColumnsContainer.module.css";
import { useDispatch } from "react-redux";
import {
  fetchMovies,
  setColumns,
  setMoviesState,
} from "../../redux/actions/movies";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  IColumn,
  IMovie,
  MovieKeyType,
  IMoviesState,
} from "../../types/movies";
import Notification from "../Notification/Notification";

const ColumnsContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { moviesState, stateMovies, stateColumns, columnsIds, fetchError } =
    useTypedSelector((state) => ({
      moviesState: state.moviesReducer,
      stateMovies: state.moviesReducer.movies,
      stateColumns: state.moviesReducer.columns,
      columnsIds: state.moviesReducer.columnsIds,
      fetchError: state.moviesReducer.error,
    }));

  const getStorageMoviesState = (): IMoviesState => {
    const storageState = JSON.parse(`${localStorage.getItem("appState")}`);
    if (storageState && storageState.moviesReducer) {
      return storageState.moviesReducer;
    } else {
      return moviesState;
    }
  };

  React.useEffect(() => {
    if (!stateMovies.length && getStorageMoviesState().movies.length) {
      dispatch(setMoviesState(getStorageMoviesState()));
    } else if (!stateMovies.length) {
      dispatch(fetchMovies());
    }
  });

  const moveItemsToNextColumn = (
    startColumn: IColumn,
    finishColumn: IColumn,
    itemId?: number,
    startIndex?: number,
    finishIndex?: number
  ): void => {
    const startMoviesIds = [...startColumn.moviesIds];

    const finishMoviesIds = [...finishColumn.moviesIds];

    if (itemId) {
      startMoviesIds.splice(Number(startIndex), 1);
      finishMoviesIds.splice(Number(finishIndex), 0, +itemId);
    } else {
      finishMoviesIds.push(...startMoviesIds);
      startMoviesIds.splice(0, startMoviesIds.length);
    }
     
    const newStartColumn = {
      ...startColumn,
      moviesIds: startMoviesIds,
    };

    const newFinishColumn = {
      ...finishColumn,
      moviesIds: finishMoviesIds,
    };

    dispatch(
      setColumns({
        ...stateColumns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      })
    );
  };

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
      const newMoviesIds = [...startColumn.moviesIds];
      newMoviesIds.splice(source.index, 1);
      newMoviesIds.splice(destination.index, 0, +draggableId);

      const newColumn = {
        ...startColumn,
        moviesIds: newMoviesIds,
      };

      dispatch(
        setColumns({
          ...stateColumns,
          [newColumn.id]: newColumn,
        })
      );
    } else {
      moveItemsToNextColumn(
        startColumn,
        finishColumn,
        +draggableId,
        source.index,
        destination.index
      );
    }
  };

  const groupMoviesById = (array: Array<IMovie>, key: MovieKeyType): Record<string, IMovie> => {
    return array.reduce((result: Record<string, IMovie>, item: IMovie) => {
      const resultKey = `${item[key]}`;
      result[resultKey] = item;
      return result;
    }, {});
  };

  if (fetchError) {
    return <Notification text="Ooops... something goes really wrong" />;
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
              moveItemsToNextColumn={moveItemsToNextColumn}
            ></Column>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default ColumnsContainer;
