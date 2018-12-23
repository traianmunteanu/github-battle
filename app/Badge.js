var React = require('react')
var PropTypes = require('prop-types')

function Badge(props) {
  return (
    <div>
      <img src={props.img} alt="Avatar" style={{ width: 200, height: 200 }} />
      <h1>Name: {props.name}</h1>
      <h3>Username: {props.username}</h3>
    </div>
  )
}

Badge.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

export default Badge