import React,{useRef} from 'react';
import classes from './AddMovieForm.module.css';

const AddMovieForm = (props) =>{
    const titleref= useRef();
const openingref= useRef();
const releaseref= useRef();
    const submitHandler = (event) =>{
    event.preventDefault();
    const movie = {
        title:titleref.current.value,
        openingText:openingref.current.value,
        releaseDate:releaseref.current.value
    }
    props.onAddMovie(movie);
    titleref.current.value='';
    openingref.current.value ='';
    releaseref.current.value ='';
    }
return (
    <form  onSubmit={submitHandler}className={classes.input}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleref} required></input>
        <label htmlFor='openingtext'>Opening Text</label>
        <textarea rows='5' id='openingtext'  ref={openingref} required></textarea>
        <label htmlFor='releasedate'>Release Date</label>
        <input type='date' id='releasedate' ref={releaseref} required></input>
        <button type='submit'>Add Movies</button>
    </form>
)

}
export default AddMovieForm;