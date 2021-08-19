export default class TmdapiService {
  _apiBase = "https://api.themoviedb.org/3";
  _imageBase = "https://image.tmdb.org/t/p/w500";

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    return await res.json();
  };

  getMovieList = async (option) => {
    const res = await this.getResource(
      `/movie/${option}?api_key=98ce310f9ed139324a95f4f16bcb5ff3&language=en-US&page=1`
    );
    const transformedMovieList = res.results.map((movieItem) =>
      this._transformMovieItem(movieItem)
    );
    return transformedMovieList;
  };

  _transformMovieItem = (list) => {
    return {
      id: list.id.toString(),
      title: list.title,
      image: `${this._imageBase}/${list.poster_path}`,
      release_year: list.release_date.split('-')[0],
      isVisible: true,
    };
  };
}
