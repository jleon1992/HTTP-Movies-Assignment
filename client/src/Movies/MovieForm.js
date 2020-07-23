import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const initialState = {
    id: 5,
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
  }
export const MovieForm = props => {
    const [formValues, setFormvalues] = useState(initialState)
    const {push} = useHistory()
    const fetchMovie = (id) => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) =>{
              console.log(res)
                setFormvalues(res.data)
               
          })
          .catch((err) => console.log(err.response));
      };
    

      const changeHandler = e => {
          const {name, value} = e.target
          setFormvalues({
              ...formValues,
                [name]: value,
               
          })
          console.log(formValues)
      }

  

      const onSubmit = e => {
          e.preventDefault()
          props.putMovie(params.id, formValues)
          push('/')
      }
    const params = useParams();
    useEffect(() => {
        fetchMovie(params.id);
      }, [params.id]);

    return (
        <div>
            
            
            <form onSubmit={onSubmit}>
            <label>
                director: 
          
                <input
                type='text'
                name='director'
                value={formValues.director}
                onChange={changeHandler}
                />
            
            </label>
            <label>
                title: 
                <input
                type='text'
                name='title'
                value={formValues.title}
                onChange={changeHandler}
                />
            </label>
            
            <button>Update</button>

               
            </form>
        
            
        </div>
    )
}

export default MovieForm