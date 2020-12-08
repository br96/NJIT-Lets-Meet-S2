import React from 'react'

export default function Landing() {
    return (
        <div className="landing-container">
            <div className="page-container">
                <div className="app-description">
                    <h2>Why Let's Meet?</h2>
                    We hope to the <span className="color-crimson">connect the users of NJIT</span> through mutual meet-ups, be it grabbing food, finding a study partner, or just finding new friends <span className="color-crimson">without the hassle</span> of obtaining a username / phone number, etc, by creating a <span className="color-crimson">convenient environment</span> for everyone to display what they're looking for to make their campus experience more enjoyable.
                </div>
                <div className="team">
                    <h2>Meet the Team</h2>
                    <div className="brian">
                        <p className="name-brian">Brian <span className="color-crimson">Radon</span></p>
                    </div>
                    <div className="luis">
                        <p className="name-luis">Luis Alfredo <span className="color-crimson">Chiang</span></p>
                    </div>
                    <div className="chris">
                        <p className="name-chris">Chris <span className="color-crimson">Villamayor</span></p>
                    </div>
                    <div className="chang">
                        <p className="name-chang">Chang Jun <span className="color-crimson">Lee</span></p>
                    </div>
                </div>
                <div className="stack-used">
                    We developed the app through the use of <span className="color-crimson">React.js</span> on the front end, with the Python <span className="color-crimson">Flask</span> framework on the backend.  We persist data through the use of a database via <span className="color-crimson">PostgreSQL</span>.  The transmission of data is handled through the use of sockets, made possible with <span className="color-crimson">socketio</span>.

                    Additional technologies were used in terms of components such as <span className="color-crimson">Google Authentication</span> and the use of the <span className="color-crimson">Google Maps API</span> in order to display events on our campus map.
                </div>
                <div className="find-us">
                    Find us on the web using the link: <a className="link-to-page" href="http://njitletsmeet2.herokuapp.com">http://njitletsmeet2.herokuapp.com</a>
                </div>
            </div>
        </div>
    )
}
