import React from 'react'
import PropTypes from 'prop-types'

class Feed extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        const feedView = this.props.feeds.map(feed=>{
            return (
                <div>
                    
                </div>
            )
        })
        return (
            <div>

            </div>
        )
    }
}

Feed.propTypes = {
    feeds: PropTypes.array.isRequired
}

export default Feed;
