import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/home.css'
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";

const secretPass = "XkhZG4fW2t2W";
const ServerUrl = 'https://stand-by.onrender.com';

const Home = () => {

    const USER = JSON.parse(sessionStorage.getItem('USER'));

    const [websiteName, setWebsiteName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userAccounts, setUserAccounts] = useState(USER.accounts || [])
    const [opened, setOpened] = useState(null)
    const [isShortScreen, setIsShortScreen] = useState(null)
    const [isSeePanel, setIsSeePanel] = useState(false)
    const [panelRight, setPanelRight] = useState('')
    const [isExpanding, setIsExpanding] = useState(false)
    const [containerHeight, setContainerHeight] = useState(0)
    const [userAccountsDisHashed, setUserAccountsDisHashed] = useState([])

    const navigate = useNavigate()

    const Encrypt = (text) => CryptoJS.AES.encrypt(text, secretPass).toString();

    const Decrypt = (text) => CryptoJS.AES.decrypt(text, secretPass).toString(CryptoJS.enc.Utf8);

    const FetchAccounts = async () => {
        const data = await axios.get(`${ServerUrl}/users/${USER._id}`)
        sessionStorage.setItem('USER', JSON.stringify(data.data))
        setUserAccounts(data.data.accounts)
    }

    const Validate = async () => {
        let newAccount = { websiteName };

        const UpdateUser = async (newA) => {
            USER.accounts.push(newA)
            sessionStorage.setItem('USER', JSON.stringify(USER))
            await axios.put(`${ServerUrl}/users/${USER._id}`, USER)
            FetchAccounts()
            document.getElementById('website').value = ''
            document.getElementById('username').value = ''
            document.getElementById('password').value = ''
        }

        try{
            newAccount.username = Encrypt(username);
            newAccount.password = Encrypt(password);
            if(USER.accounts.find((a) => JSON.stringify(a) === JSON.stringify(newAccount))){ return }
            else{ UpdateUser(newAccount) }
        }catch(err){
            console.log('error...')
        }
    }

    useEffect(() => {
        setContainerHeight(window.screen.availHeight)
        if(window.screen.availWidth < 480){ setIsShortScreen(true) }
        else{ setIsShortScreen(false) }

        let newUserAccountsDisHashed = [], Account = {};
        for(let i = 0; i < userAccounts.length; i++){
            try{
                Account = { websiteName: userAccounts[i].websiteName, username: Decrypt(userAccounts[i].username), password: Decrypt(userAccounts[i].password) }
                newUserAccountsDisHashed.push(Account)
            }catch(err){
                console.log('error...')
            }
        }
        setUserAccountsDisHashed(newUserAccountsDisHashed)
    }, [userAccounts]);

    if(USER.name === undefined){
        return(
            <>
                {<span></span>}
            </>
        )
    }

    const OpenOrClose = (key) => {
        if(opened === key){ setOpened(null) }
        else{ setOpened(key) }
    }

    const ChangePassword = () => navigate('/change');

    const LogOut = () => {
        sessionStorage.setItem('USER', '{}')
        navigate('/login')
    }

    const ShowPanel = () => {
        setIsSeePanel(!isSeePanel);
        if(isSeePanel){ setPanelRight('-100%') }
        else{ setPanelRight('0') }
    }

    const DeleteAccount = async (key) => {
        let newAccounts = [], newUser = USER;
        for(let i = 0; i < userAccounts.length; i++){
            if(i === key) continue;
            newAccounts.push(USER.accounts[i])
        }
        newUser.accounts = newAccounts
        await axios.put(`${ServerUrl}/users/${USER._id}`, newUser)
        FetchAccounts()
    }

    const Copy = (text) => navigator.clipboard.writeText(text);

    const Expand = () => setIsExpanding(!isExpanding)

    return(
        <>
            <main id="main-home">
            <nav>
                <h2>Welcome, {USER.name}!</h2>
                <span>
                { (isShortScreen) ? <img onClick={() => ShowPanel()} src={require("../icons/menu.png")} alt="menu" /> : <><p onClick={() => ChangePassword()}>Change password</p><p onClick={() => LogOut()}>Log out</p></> }
                </span>
                <ul id="panel" style={{right: panelRight}}>
                    <li onClick={() => ChangePassword()}>Change password</li>
                    <li onClick={() => LogOut()}>Log out</li>
                </ul>
            </nav>
            <section id="add-container" style={(isExpanding) ? {display: 'none'} : {}}>
                <h2>New account</h2>
                <input type="text" id="website" onChange={(a) => setWebsiteName(a.target.value)} placeholder="Website name" />
                <input type="text" id="username" onChange={(a) => setUsername(a.target.value)} placeholder="Username" />
                <input type="text" id="password" onChange={(a) => setPassword(a.target.value)} placeholder="Password" />
                <button onClick={() => Validate()}>Save</button>
            </section>
            <section id="see-container" style={(isExpanding) ? {height: `${Math.floor(containerHeight * 0.7)}px`} : {height: `${Math.floor(containerHeight * 0.3)}px`}}>
                    {userAccountsDisHashed.map((account, key) => (
                        <article key={key}><ul onClick={() => OpenOrClose(key)} id={(key === opened) ? 'open': 'close'}>
                            <img onClick={() => DeleteAccount(key)} src={require('../icons/delete.png')} title="Delete account" alt={`Img #${key}`}/>
                            <li>{account.websiteName} account</li>
                            <li>Username: {account.username} <span title="Copy username to clipboard" onClick={() => Copy(account.username)}>Copy</span></li>
                            <li>Password: {account.password} <span title="Copy password to clipboard" onClick={() => Copy(account.password)}>Copy</span></li>
                            </ul>
                        </article>
                    ))}
            </section>
            <button style={{position: 'relative'}} onClick={() => Expand()} >{(!isExpanding) ? 'Expand' : 'Minimize'}</button>
            </main>
        </>
    )
}

export default Home
