import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import bcrypt from 'bcryptjs-react'

const ServerUrl = 'https://stand-by.onrender.com';

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [message, setMessage] = useState('')

    const USER = JSON.parse(sessionStorage.getItem('USER'));

    const navigate = useNavigate()

    const UpdateUser = async (pass) => {
        let newUser = USER
        newUser.password = pass
        await axios.put(`${ServerUrl}/users/${USER._id}`, newUser)
        sessionStorage.setItem('USER', '{}')
        navigate('/login')
    }

    const Change = async () => {
        if(oldPassword.length < 1 || newPassword.length < 1 || repeatNewPassword.length < 1){ setMessage('One or more fields are empty...'); return }
        if(oldPassword === newPassword && newPassword === repeatNewPassword){ setMessage('Old and new password are the same...'); return}
        try{
            bcrypt.compare(oldPassword, USER.password, function(err, res) {
                if(!res){
                    console.log('error...');
                    setMessage('Old password is wrong...')
                    return
                }else{
                    if(newPassword === repeatNewPassword){
                        bcrypt.genSalt(8, function(err, salt) {
                            bcrypt.hash(newPassword, salt, function(err, hashedPassword) {
                                UpdateUser(hashedPassword)
                             });
                        });
                    }else{
                        setMessage(`Passwords doesn't match...`)
                    }
                }
            });
        }catch(err){
            console.log('error...')
        }
    }

    return(
            <>
                <main>
                    <div id="title">
                        <h2>Change password</h2>
                    </div>
                    <div id="in-container">
                        <input id="oldPassword" onChange={(a) => setOldPassword(a.target.value)} placeholder="Old password"/>
                        <input id="newPassword" onChange={(a) => setNewPassword(a.target.value)} placeholder="New password"/>
                        <input id="repeatNewPassword" onChange={(a) => setRepeatNewPassword(a.target.value)} placeholder="Repeat new password"/>
                        <p style={{height: '20px'}}>{message}</p>
                    </div>
                    <div id="send-container">
                        <button onClick={() => Change()}>Change password</button>
                        <button className="or" onClick={() => navigate(-1)}>Or keep same password</button>
                    </div>
                </main>
            </>
    )

}

export default ChangePassword
