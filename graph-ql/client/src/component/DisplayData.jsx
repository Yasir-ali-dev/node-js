import React, { useState } from 'react';
import {useQuery, gql ,useLazyQuery  } from "@apollo/client";

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      nationality
      age
    }
  }

  

`;
const GET_ALL_MOVIES = gql`
  query getAllMovies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
   }
  }
`;
const GET_MOVIE_BY_NAME=gql`
  query getMovie($name: String!) {
    movie(name: $name) {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;


const DisplayData = () => {
    const {data , loading, error}=   useQuery(GET_ALL_USERS);
    const {data : movies }= useQuery(GET_ALL_MOVIES);
    const [selectedQuery,setSelectedQuery]=useState("");
    const [fetchData,{data: movieData, error: movieError}]=useLazyQuery(GET_MOVIE_BY_NAME);


  //   if(data){
  //       console.log(data);
  //   }
  //   if(movies){
  //     console.log(movies);
  // }
  if(movieData){
    console.log(movieData);
  }


  
    
  return (
    <>
    
    <div style={{display:"flex",}}>
        {data &&
            data.users.map((_,index)=>{
                return (
                    <div 
                      key={index}
                      style={{width:"300px",backgroundColor:"blue",textAlign: "center",margin: "1em",padding: "0.2em",color:" aqua",border:"1px solid grey"}}
                    >
                        <h3>{_.id}</h3>
                        <h1>{_.name}</h1>
                        <h1>{_.age}</h1>
                        <h1>{_.nationality}</h1>
                    </div>
                )
            })
        }
        </div>
        <div style={{display:"flex"}}>
         {movies &&
            movies.movies.map((_,index)=>{
                return (
                    <div 
                      key={index}
                      style={{width:"300px",backgroundColor:"yellow",textAlign: "center",margin: "1em",padding: "0.2em",color:" aqua",border:"1px solid grey"}}
                    >
                        <h3>{_.id}</h3>
                        <h1>{_.name}</h1>
                        <h1>{_.yearOfPublication}</h1>
                        <h2>{_.isInTheaters}</h2>  
                    </div>
                )
            })
        }
        </div>
        <div>
          <input 
            type="text"
            placeholder='intersteller'  
            onChange={e=> setSelectedQuery(e.target.value)}
          />
          <button onClick={()=>fetchData({variables:{name: selectedQuery}})}>Submit</button>
          <div>
            {
              movieData && 
                <div>
                  <h3>{movieData.movie.id}</h3>
                  <h3>{movieData.movie.name}</h3>
                  <h3>{movieData.movie.yearOfPublication}</h3>
      
                </div>
            }
            {
              movieError && <h3>Error occured fetching data</h3>
            }
            </div>

          
        </div>
       
    </>
  )
}

export default DisplayData
