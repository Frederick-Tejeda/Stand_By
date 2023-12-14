import { Link } from 'react-router-dom'
import '../styles/intro.css'

const Intro = () => {

    return(
        <>
            <header style={{background: 'none'}}>
            <nav>
                <h2>Stand By</h2>
                <ul>
                    <Link to='/signin' className="Link">Sign in</Link>
                    <Link to='/login' className="Link">Log in</Link>
                </ul>
            </nav>
            </header>
            <main id="intro-main">
            <section>
                <div>
                    <h2>Have you ever forgotten your username account or even worst, your password?</h2>
                    <img src={require('../img/1.jpg')} alt="img1"/>
                    <p>Stand by was developed in order to you be able to store as accounts as you want, so you are not going to be worrying about remembering all them. Because they are going to be accesible to you any place, any time, any device.</p>
                </div>
            </section>
            <section>
                <div>
                    <h2>All that is by being encripted end to end</h2>
                    <img src={require('../img/2.jpg')} alt="img2"/>
                    <p>By being encripted we ensure our accounts stored are not accesible to read them even for us, what makes it so secure.</p>
                </div>
            </section>
            <section>
                <div>
                    <h2>Let{"'"}s try it. It is free!</h2>
                    <img src={require('../img/App.png')} style={{height: '60vmin', width: 'auto', maxWidth: '100%'}} alt="App"/>
                </div>
            </section>
            </main>
        </>
    )

}

export default Intro
