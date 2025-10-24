import React from "react"
import Leaderboard from "./Leaderboard"

class GamePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cookies: 0,
            rate: 0,
            cost: 0
        }
        this.click = this.click.bind(this)
        this.upgrade = this.upgrade.bind(this)
    }
    componentDidMount() {
        let accountId = localStorage.getItem("_id")
        fetch("cookie-clicker-server-production-16b0.up.railway.app/getCookies", {
            method: "POST",
            headers: {
            'Content-Type': "application/json"
            },
            body: JSON.stringify({
                accountId: accountId
            })
        }).then(
            response => {
            return response.json()
        }).then( data => {
            this.setState({
                cookies: data.cookies,
                cost: data.cost,
                rate: data.rate
            })
        })
        
    }
    click() {
        let accountId = localStorage.getItem("_id")
        fetch("cookie-clicker-server-production-16b0.up.railway.app/click", {
            method: "POST",
            headers: {
            'Content-Type': "application/json"
            },
            body: JSON.stringify({
                accountId: accountId
            })
        }).then(
            response => {
            return response.json()
        }).then( data => {
            this.setState({
                cookies: data.cookies
            })
        })
    }
    upgrade() {
        let accountId = localStorage.getItem("_id")
        fetch("cookie-clicker-server-production-16b0.up.railway.app/buyUpgrade", {
            method: "POST",
            headers: {
            'Content-Type': "application/json"
            },
            body: JSON.stringify({
                accountId: accountId
            })
        }).then(
            response => {
            return response.json()
        }).then(data => {
            this.setState({
                cookies: data.cookies,
                cost: data.cost,
                rate: data.rate
            })
        })
    }
    
    render() {
        return(
            <div>
                <button onClick={this.props.logOut}>Log Out</button>
                <img alt="Cookie" src={require("./Cookie.jpeg")} onClick={this.click}/>
                <p>Cookies:{this.state.cookies}</p>
                <p>Cookies per click: {this.state.rate}</p>
                <button onClick={this.upgrade}>Upgrade Cost:{this.state.cost} cookies</button>
                <Leaderboard />
            </div>
        )
    }
}

export default GamePage