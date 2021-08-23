import { IInitialMovieItem, IMovie } from "../types/movies";

export default class TmdapiService {
  private _apiBase = "https://api.themoviedb.org/3";
  private _imageBase = "https://image.tmdb.org/t/p/w500";

  private _transformMovieItem = (movieItem: IInitialMovieItem): IMovie => {
    return {
      id: movieItem.id,
      title: movieItem.title,
      imageURL: `${this._imageBase}/${movieItem.poster_path}`,
      release_year: movieItem.release_date.split("-")[0],
      isVisible: true,
    };
  };

  getResource = async (url: string): Promise<{results: Array<IInitialMovieItem>}> => {
    const res = await fetch(`${this._apiBase}${url}`);
    return await res.json();
  };

  getMovieList = async (option: string): Promise<IMovie[]> => {
    const res = await this.getResource(
      `/movie/${option}?api_key=98ce310f9ed139324a95f4f16bcb5ff3&language=en-US&page=2`
    );
    const transformedMovieList = res.results.map(this._transformMovieItem);
    return transformedMovieList;
  };
}
