import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { errStyle, required } from '../Helpers/ReduxFormValidation';
import { saveComment } from '../Actions/PlaceActions';

class SubmitComment extends Component {

  commentName(field) {
    const { meta: touched, error } = field;
    return (
      <div>
        <h3>Name:</h3>
        <input type="text" placeholder="Enter your name:" className="form-control" style={touched && error ? errStyle : null } {...field.input} />
      </div>
    );
  }
  commentArea(field) {
    const { meta: touched, error } = field;
    return (
      <div>
        <h3>Comment:</h3>
        <textarea className="form-control" placeholder="Enter your comment about this place:" style={touched && error ? errStyle : null } {...field.input} />
      </div>
    );
  }
  commentRating(field) {
    const { meta: touched, error } = field;
    return (
      <div>
        <h3>Rating:</h3>
        <input type="text" className="form-control" style={touched && error ? errStyle : null } {...field.input} />
      </div>
    );
  }

  onSubmit(values) {
    const { saveComment, id, uid, dispatch } = this.props;
    saveComment(id, values, uid).then(() => {
      dispatch(reset('SubmitCommentForm'));
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="name"
          component={this.commentName}
          validate={required}
        />
        <Field
          name="comment"
          component={this.commentArea}
          validate={required}
        />
        <Field
          name="rating"
          component={this.commentRating}
          validate={required}
        />
        <button type="submit" className="btn btn-success btn-small mt-1">Send</button>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { uid: state.user.uid };
}

export default reduxForm({
  form: 'SubmitCommentForm'
})(
  connect(mapStateToProps, { saveComment })(SubmitComment)
);
