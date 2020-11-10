import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateUserForm = ({
  updateUser,
  toggleUpdateUserForm,
  user
}) => {
  const [ input, setInput ] = useState({
    name: user.name,
    bio: user.bio,
    image: user.image
  });
  let { name, bio, image } = input;

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmit = event => {
    event.preventDefault();
    let updatedUser = {...input};
    updatedUser.id = user.id;
    updateUser(updatedUser);
    toggleUpdateUserForm(false);
  }

  return (
    <form className="post-form" onSubmit={event => handleSubmit(event)}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            placeholder="Name"
            type="text"
            value={name}
            name="name"
            onChange={event => handleChange(event)}
            disabled
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Bio"
            type="text"
            value={bio}
            name="bio"
            onChange={event => handleChange(event)}
          >
          </textarea>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            placeholder="Image"
            type="text"
            value={image}
            name="image"
            onChange={event => handleChange(event)}
            disabled
          />
        </div>
      </div>
      <div className="control">
        <button className="button is-primary">Update User</button>
      </div>
    </form>
  )
}

UpdateUserForm.propTypes = {
  updateUser: PropTypes.func.isRequired,
  toggleUpdateUserForm: PropTypes.func.isRequired,
  user: PropTypes.object,
}

export default UpdateUserForm;