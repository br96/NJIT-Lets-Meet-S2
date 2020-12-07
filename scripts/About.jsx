import React from 'react'
import Landing from "./Landing";
import NavBar from "./NavBar"

export default function About() {
    return (
        <div>
            <div className="fixed-position">
                <NavBar />
            </div>
             <div className="google-login-page">
                <div className="login-page-upper">
                    <div className="login-container">
                    <img className="highlander" src="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fncaa%2F500%2F2885.png" alt="" />
                </div>
            </div>
        </div>
            <Landing />
        </div>
    )
}
