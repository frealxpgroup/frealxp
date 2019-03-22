import React, { Component } from 'react'

class Submit extends Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
            <div>
                <h2>FRealXP</h2>
                Challenge Submit Page
                <button>select your challenge</button>
                <input>completion date mm/dd/yyy</input>
                <input>description</input>
                <button>upload image</button>
                <button>submit challenge</button>
            </div>
        )
    }
}

export default Submit
