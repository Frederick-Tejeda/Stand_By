import '../styles/in.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs-react'

const Signin = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const Validate = async () => {
        let usersRightNow = await axios.get("http://localhost:8000/users")
        if(name.length < 1 || username.length < 1 || password.length < 1 || repeatedPassword.length < 1){
            setMessage('Field or fileds empty...')
            return
        }else if(password !== repeatedPassword){
            setMessage(`Passwords doesn't match...`)
            return
        }else if(usersRightNow.data.find((u) => u.username === username)){
            setMessage(`Username allready in use...`)
            return
        }else{
            const PostIt = async () => {
                await axios.post("http://localhost:8000/users", newUser)
                navigate('/login')
            }
            let newUser = { name, username }
            try{
                bcrypt.genSalt(8, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hashedPassword) {
                        newUser.password = hashedPassword;
                        sessionStorage.setItem('USER', JSON.stringify(newUser))
                        PostIt()
                     });
                });
            }catch(err){
                console.log('error...')
            }
        }
    }

    return(
        <>
            <main>
                <div id="title">
                    <h2>Sign in</h2>
                </div>
                <div id="in-container">
                    <input type="text" onChange={(a) => setName(a.target.value)} placeholder="Name" />
                    <input type="text" onChange={(a) => setUsername(a.target.value)} placeholder="Username" />
                    <input type="text" onChange={(a) => setPassword(a.target.value)} placeholder="Password" />
                    <input type="text" onChange={(a) => setRepeatedPassword(a.target.value)} placeholder="Repeat password" />
                    <p style={{height: '20px'}}>{ message }</p>
                </div>
                <div id="send-container">
                    <button onClick={() => Validate()}>Sign in</button>
                    <button className="or" onClick={() => navigate('/login')}>or log in</button>
                </div>
            </main>
        </>
    )
}

export default Signin
