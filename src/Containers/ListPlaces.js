import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaces, addPlace, deletePlace } from '../Actions/PlaceActions';
import { Field, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import PlaceCard from '../Components/PlaceCard';
import { getUser, logout } from '../Actions/UserActions';
import Link from 'react-router-dom/es/Link';

class App extends Component {
  getRating(place) {
    const count = _.size(place.comments);

    return count ?
      Math.round(_.reduce(place.comments, (acc, value) => acc + +value.rating, 0) / count) :
      '-';
  }

  renderPlaces() {
    return _.map(this.props.places, (place, key) => (
      <PlaceCard key={key}>
        <h3 className="card-title">
          {place.name}
        </h3>
        <p className="card-text">
          {place.address}
        </p>
        <p className="card-text">
          <strong>Rating: {this.getRating(place)} </strong>
        </p>
        {/* {place.uid === this.props.user.uid && */}
        <button className="btn btn-danger float-right" onClick={() => this.props.deletePlace(key)}>Delete</button>
        <Link to={`/${key}`}>
          <button className="btn btn-info float-right">Show More</button>
        </Link>
      </PlaceCard>
    ));
  }

  renderField(field) {
    return (
      <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} className={field.class} />
    );
  }

  onSubmit(values) {
    this.props.addPlace(values, this.props.user.uid).then(this.props.dispatch(reset('NewPlace')));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="navbar">
          <button className="btn btn-danger" onClick={() => { this.props.logout(); }}>Sign out</button>
        </div>

        <div className="container">
          <div className="main">
            {this.renderPlaces()}
          </div>
          <div className="navbar fixed-bottom">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="footerForm">
              <Field
                name="name"
                component={this.renderField}
                label="Name"
                class="footer-title"
              />
              <Field
                name="address"
                component={this.renderField}
                label="Address"
                class="footer-body"
              />
              <button type="submit" className="btn footer-button">Add New</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const form = reduxForm({
  form: 'NewPlace',
})(App);

export default connect((state, ownProps) => ({
  places: state.places,
  user: state.user,
}), {
  addPlace, getPlaces, deletePlace, getUser, logout,
})(form);
