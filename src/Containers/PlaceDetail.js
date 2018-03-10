import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/es/Link';
import PlaceCard from '../Components/PlaceCard';
import SubmitComment from './SubmitComment';
import _ from 'lodash';
import Comment from '../Components/Comment';
import { deleteComment, storageUpload, storageDownload } from '../Actions/PlaceActions';

class PlaceDetail extends Component {
  componentDidMount(){
    const { match } = this.props;
    const placeId = match.params.id;
    this.props.storageDownload(placeId);
  }

  renderComments() {
    const { place, match } = this.props;
    const placeId = match.params.id;
    return _.map(place.comments, (comment, key) => {
      return (
        <Comment key={key} id={key}>
          <h3>{comment.name}</h3>
          <p>{comment.comment}</p>
          <strong>Rating: {comment.rating}</strong>
          <button className="btn btn-danger float-right" onClick={() => this.props.deleteComment(placeId,key)}>Delete</button>
        </Comment>
      );
    });
  }

  uploadImage(event){
    const { match } = this.props;
    const placeId = match.params.id;
    let file = event.target.files[0];
    this.props.storageUpload(placeId,file).then(() => {
      this.props.storageDownload(placeId);
    });
  }

  render() {
    const { place, match } = this.props;
    let imgStyle = {
      width: '350px',
      height: '350px'
    }
    return (
      <div>
        <div className="navbar">
          <Link to={'/'} className="btn btn-primary">
            Go home
          </Link>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-7">
              <PlaceCard>
                <h1 className="post-title">{place.name}</h1>
                <p className="post-body">{place.address}</p>
                <div className="row">
                  <div className="col-sm-6">
                    <img alt="" src="" id="image" style={imgStyle}/>
                    <div className="form-group row">
                        <input type="file" 
                              className="form-control"
                              onChange={(event) => {this.uploadImage(event)}} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="post-body">
                    <h4>Information about this place:</h4>
                    {place.info}
                    </div>
                  </div>
                </div>
              </PlaceCard>
            </div>
            <div className="col-sm-5">
              <PlaceCard>
                <SubmitComment id={match.params.id}/>
              </PlaceCard>
              <PlaceCard>
                {this.renderComments()}
              </PlaceCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { place: state.places[ownProps.match.params.id], uid: state.user.uid };
}

export default connect(mapStateToProps,{deleteComment,storageUpload,storageDownload})(PlaceDetail);