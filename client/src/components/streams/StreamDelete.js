import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import {fetchStream, deleteStream} from '../../actions';

class StreamDelete extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    renderAction(){
        const {id}=this.props.match.params;
        return (
            <React.Fragment>
                <button onClick={()=>this.props.deleteStream(id)} className="ui negative button">Delete</button>
                        <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent(){
        if(!this.props.stream){
            return "Are You sure you want to delete this Stream?"
        }
        return `Are you sure you want to Delete "${this.props.stream.title}" Stream?`
    }

    render(){
            return (
                    <Modal title="Delete Stream"
                        content={this.renderContent()}
                        action={this.renderAction()}
                        onDismiss={()=>history.push("/")}
                    />
            )
    }
}

const mapStateToprops=(state,ownProps)=>{
    return {stream:state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToprops,{fetchStream,deleteStream})(StreamDelete);