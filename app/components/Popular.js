var React = require('react')
var PropTypes = require('prop-types')

function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python']
  return (
    <ul className="languages">
    {languages.map(function(lang) {
     return (
      <li 
        style={lang === props.selectedLanguage ? { color: '#d00b1e' } : null}
        key={lang}
        onClick={props.onSelect.bind(null, lang)}>
          {lang}
      </li>
      )
    })}
  </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All'
    }
  this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang
      }
    })
  }

  render() {
    return (
      <SelectLanguage
        selectedLanguage={this.state.selectedLanguage} 
        onSelect={this.updateLanguage}/>
    )
  }
}

module.exports = Popular