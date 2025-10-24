import React from "react"

class Leaderboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
        this.updateLeaderboard = this.updateLeaderboard.bind(this)
    }
    updateLeaderboard() {
        fetch("https://cookie-clicker-server-production-16b0.up.railway.app/getLeaderboard").then(
            response => {
            return response.json()
        }).then( data => {
            this.setState({
                users: data.topAccounts
            })
        })
    }
    componentDidMount() {
        setInterval(this.updateLeaderboard, 1000)
    }

    render() {
        let display = this.state.users.map((item) => {
            return <li>{item.username}: {item.upgrades + 1}</li>
        })
        return(
            <div>
                <h1>Leaderboard</h1>
                <ol>
                    {display}
                </ol>
            </div>
        )
    }
}

export default Leaderboard