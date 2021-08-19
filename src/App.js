import React from "react";
import Column from "./components/Column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { initialData } from "./initialData";
import TmdapiService from "./services/tmdapiService";
import "./App.css";

function App() {
  const [movieData, setMovieData] = React.useState(initialData);
  const tmdapiService = new TmdapiService();

  const fetchMovieList = async () => {
    const fetchedList = await tmdapiService.getMovieList("top_rated");
    const moviesIds = fetchedList.map((movieItem) => movieItem.id);
    const groupedMovies = fetchedList.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
    const newMovieData = {
      ...movieData,
      movies: groupedMovies,
      columns: {
        ...movieData.columns,
        firstColumn: {
          ...movieData.columns["firstColumn"],
          moviesIds: moviesIds,
        },
      },
    };
    setMovieData(newMovieData);
  };

  React.useEffect(() => {
    fetchMovieList();
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

      setMovieData({
        ...movieData,
        columns: {
          ...movieData.columns,
          [newColumn.id]: newColumn,
        },
      });
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

      setMovieData({
        ...movieData,
        columns: {
          ...movieData.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      });
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        {movieData.columnsIds.map((columnId) => {
          const column = movieData.columns[columnId];
          const movies = column.moviesIds.map(
            (movieId) => movieData.movies[movieId]
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

export default App;
