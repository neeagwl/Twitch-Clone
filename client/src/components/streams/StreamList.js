import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.getStreams();
    }

    renderUser(userId,id){
        if(this.props.currentUserId===userId){
            return (
                <div className="right floated content">
                    <Link to={`streams/edit/${id}`} className="small ui inverted primary button">EDIT</Link>
                    <button className="small ui inverted red button">DELETE</button>
                </div>
            )
        }
    }

    renderCreateButton(){
        if(this.props.isSignedIn){
            return(
                <div style={{textAlign:'right'}}>
                    <Link to="/streams/new" className="ui positive basic button">
                        Create a New Stream
                    </Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(({ id, title, description ,userId}) => {
            return (
                <div className="item" key={id}>
                    
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {title}
                        <div className="description">
                            {description}
                        </div>
                    </div>
                    {this.renderUser(userId,id)}
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreateButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
         streams: Object.values(state.streams) ,
         currentUserId: state.auth.userId,
         isSignedIn: state.auth.isSignedIn,
    };
}

export default connect(mapStateToProps, { getStreams })(StreamList);