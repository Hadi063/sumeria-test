import logo from './logo.svg';
import './App.css';

import {useEffect, useState, } from 'react'

const api = 'http://localhost:3000'

function App() {

  const [token, setToken ]= useState(null)
  const [isBookPage, setBookPage] = useState(false)



  useEffect(() => {

    if(!token) return

    setBookPage(true)


  },[token])



    

  return (
    <div className="App">
      <header className="App-header">
        
        
        {

          isBookPage ? <Books token={token}/> : <Login setToken= {setToken}/>



        }

        




      </header>
    </div>
  );
}


function Login({setToken}){

    const [user,setUser] = useState('')
    const [pass, setPass] = useState('')


    const login = async () => {

      await fetch(`${api}/api/login`, {
        mode: 'cors',
        method : 'POST',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({username : user, password: pass}),
      }).then(async (res) => {
        let x  = await res.json()
          console.log(x)
          setToken(x.token)
      })

    }

  const userChange = (e) => {
    setUser(e.nativeEvent.target.value)
  }
  const passChange = (e) => {
    setPass(e.nativeEvent.target.value)
  }

  return(
        <div className="login">
          
          <input placeholder="user" id="_user" className="_input"  onChange={userChange} />
          <input placeholder="pass" id="_pass"  className="_input" onChange={passChange}/>

          <button  className="btn" onClick={login}>login</button>
        </div>
  )
}


function Books({token}){

  const [books, setBooks] = useState([])

  useEffect(()=> {

    const getBooks = async () => {

      await fetch(`${api}/api/books`, {
        method : 'GET',
        headers : {
          'authorization' : token
        }
      }).then(async (res) => {

        let x = await res.json()

        setBooks(x)
        
      })

    }

    getBooks()
  },[])

  return(

    <div className='_books'>

        {
          books.map((x,i) => (

              <div  key={x.id}>
                <h4>Book title : {x.title}</h4>
                <p>Book Author : {x.author}</p>
                <p>Book Id : {x.id}</p>
              </div>

          ))
        }

        

    </div>

  )
}

export default App;
