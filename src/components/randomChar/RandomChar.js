import { useState, useEffect} from 'react';


import useMarvelService from '../../services/MarveService';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMassage/errorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = (props) => {
    
    const [char, setChar] = useState({});

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId =setInterval(updateChar, 10000);
        
        return () => {
            clearInterval(timerId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    
        getCharacter(id)
            .then(onCharLoaded)
    }

    const View = ({char}) => {
        const {name, description, thumbnail, homepage, wiki, id} = char;
        let imgStyle = {'objectFit' : 'cover'};
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
        
        return(
            <div className="randomchar__block">
                <img 
                    src={thumbnail} 
                    alt="Random character" 
                    className="randomchar__img" 
                    style={imgStyle}
                    onClick={() => props.onCharSelected(id)}
                />
                <div className="randomchar__info">
                    <p className="randomchar__name" onClick={() => props.onCharSelected(id)}>{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    const errorMassage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {errorMassage}
            {spinner}
            {content }
            
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                    onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

// const View = ({char}) => {
//     const {name, description, thumbnail, homepage, wiki} = char;
//     let imgStyle = {'objectFit' : 'cover'};
//         if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//             imgStyle = {'objectFit' : 'unset'};
//         }
    
//     return(
//         <div className="randomchar__block">
//             <img 
//                 src={thumbnail} 
//                 alt="Random character" 
//                 className="randomchar__img" 
//                 style={imgStyle}
//             />
//             <div className="randomchar__info">
//                 <p className="randomchar__name">{name}</p>
//                 <p className="randomchar__descr">
//                     {description}
//                 </p>
//                 <div className="randomchar__btns">
//                     <a href={homepage} className="button button__main">
//                         <div className="inner">homepage</div>
//                     </a>
//                     <a href={wiki} className="button button__secondary">
//                         <div className="inner">Wiki</div>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default RandomChar;