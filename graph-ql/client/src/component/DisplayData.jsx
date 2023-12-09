import React, { useState } from 'react';
import {useQuery, gql ,useLazyQuery ,useMutation, } from "@apollo/client";

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      nationality
      age
      username
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

const CREATE_USER =gql`
  mutation createUser($input: CreateUserInput!){
    createUser(input: $input) {
      name
      nationality
      age
      username
    }
  }
`;

const UPDATE_USERNAME =gql`
  mutation updateUser($input: UpdateUsernameInput!){
    updateUsername(input: $input) {
      id
      username
    }
  }
`;

const DisplayData = () => {
    const {data , loading, error, refetch }= useQuery(GET_ALL_USERS);
    const {data : movies }= useQuery(GET_ALL_MOVIES);
    const [selectedQuery,setSelectedQuery]=useState("");
    const [fetchData,{data: movieData, error: movieError}]=
    useLazyQuery(GET_MOVIE_BY_NAME);
    const [createUser, setCreateUser]=useState({
      name:"",
      age: Number,
      nationality:"",
      username :"" 
    });
    const [userCreated] = useMutation(CREATE_USER);
    
    const [updateUsername,setUpdateUsername]=useState({id:Number, newUsername:""})
    const [NewUsername] = useMutation(UPDATE_USERNAME);

  if(movieData){
    console.log(movieData);
  }

  const handleChange=(e)=>{
    const {name, value}=e.target;
    if(name === "nationality"){
      setCreateUser((prevState)=>{
        return{
          ...prevState,
          [name]: value.toUpperCase()
        }
      })  
    }
    else{
      setCreateUser((prevState)=>{
        return{
          ...prevState,
          [name]: value
        }
      })
    }
  }

  const handleChangeForUpdateUser=(e)=>{
    const {name, value}=e.target;
      setUpdateUsername((prevState)=>{
        return{
          ...prevState,
          [name]: value
        }
      })  
    
  }

  return (
    <>
    
     <div>
        <h1>Create New User</h1>
        <input 
          type="text" 
          placeholder='Name ..' 
          name='name' 
          onChange={handleChange}
          required
        />
        <input 
          type="text" 
          placeholder='Username ..' 
          name='username' 
          onChange={handleChange}
          required
        />
        <input 
          type="number" 
          placeholder='Age ..'  
          name='age'  
          onChange={handleChange}
          required
        />
        <input 
          type="text" 
          placeholder='Nationality..' 
          name='nationality'  
          onChange={handleChange} 
          required
        />
        <button onClick={()=>{
          userCreated({variables:
            {
              input:
              {
                name: createUser.name , 
                username: createUser.username,
                age: Number(createUser.age),
                nationality: createUser.nationality
              }
              
            }})
            refetch()
        } }>Submit</button>
      </div> 


      <div>
        <h1>Update User</h1>
        <input 
          type="number" 
          placeholder='Id ..' 
          name='id' 
          onChange={handleChangeForUpdateUser}
          required
        />
        <input 
          type="text" 
          placeholder='New Username ..' 
          name='newUsername' 
          onChange={handleChangeForUpdateUser}
          required
        />
        <button onClick={
              ()=> {
                NewUsername({variables:
                {input:{id: Number(updateUsername.id), newUsername: updateUsername.newUsername}}})
                refetch()
              }
            }>Update Username</button>
      </div>
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
                        <h1>{_.username}</h1>
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
