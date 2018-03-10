import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/es/Link';
import PlaceCard from '../Components/PlaceCard';
import SubmitComment from './SubmitComment';
import _ from 'lodash';
import Comment from '../Components/Comment';
import { deleteComment, updatePlace } from '../Actions/PlaceActions';
import { storage } from '../Firebase';

class PlaceDetail extends Component {
  constructor(props) {
    super(props);

    const { place } = this.props;
    this.state = {
      imageUrl: null,
      nameEditorValue: place.name,
      showNameEditor: false,
      showAddressEditor: false,
      showInfoEditor: false
    };
  }

  setImageUrl() {
    const { match } = this.props;
    const placeId = match.params.id;
    
    storage.ref(placeId).getDownloadURL()
      .then(url => this.setState({
        imageUrl: url
      }));
  }

  componentDidMount() {
    this.setImageUrl();
  }

  renderComments() {
    const { place, match } = this.props;
    const placeId = match.params.id;
    return _.map(place.comments, (comment, key) => (
      <Comment key={key} id={key}>
        <h3>{comment.name}</h3>
        <p>{comment.comment}</p>
        <strong>Rating: {comment.rating}</strong>
        <button className="btn btn-danger float-right" onClick={() => this.props.deleteComment(placeId, key)}>Delete</button>
      </Comment>
    ));
  }

  uploadImage(event) {
    const { match } = this.props;
    const placeId = match.params.id;
    const file = event.target.files[0];

    storage.ref(placeId).put(file).then(() => this.setImageUrl());
  }

  render() {
    const { place, match } = this.props;
    const imgStyle = {
      width: '350px',
      height: '350px',
    };
    return (
      <div>
        <div className="navbar">
          <Link to="/" className="btn btn-primary">
            Go home
          </Link>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-7">
              <PlaceCard>
                {(
                  this.state.showNameEditor ?
                    <div>
                      <input
                        className="form-control" 
                        type="text" 
                        value={this.state.nameEditorValue} 
                        onChange={(event) => this.setState({ nameEditorValue: event.target.value })} />
                      <button className="btn btn-success" onClick={() => {
                        this.props.updatePlace(match.params.id, { name: this.state.nameEditorValue });
                        this.setState({
                          showNameEditor: false
                        })
                      }}>Save</button>
                      <button className="btn btn-danger" onClick={() => this.setState({ showNameEditor: false })}>Cancel</button>
                    </div> :
                    <h1 className="post-title" onClick={() => this.setState({ showNameEditor: true })}>{place.name}</h1>
                )}
                <p className="post-body">{place.address}</p>
                <div className="row">
                  <div className="col-sm-6">
                    <img alt="" src={this.state.imageUrl} id="image" style={imgStyle} />
                    <div className="form-group row">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(event) => { this.uploadImage(event); }}
                      />
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
                <SubmitComment id={match.params.id} />
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
  return { place: state.places[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { deleteComment, updatePlace })(PlaceDetail);
