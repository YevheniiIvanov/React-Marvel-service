import { useHttp } from '../hooks/http.hook';


const useMarvelService  = () => {
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // const _apiKey = 'apikey=3b869ca87cd8b80a2ba1c14e113d5221';
    const _apiKey = 'apikey=b0204f8b8affae8261f32011e5d29ba1';
    const _baseOffset = 210;

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return{
            name: char.name,
            description: char.description || 'No description. Visite HOMEPAGE to know more.',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return{
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic };
}

export default useMarvelService;