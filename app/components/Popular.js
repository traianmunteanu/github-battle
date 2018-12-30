var React = require("react");
var PropTypes = require("prop-types");
var Loading = require("react-loading").default;
var api = require("../utils/api");

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map(function(repo, index) {
        return (
          <li key={index} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <a href={repo.html_url}>
                  <img
                    className="avatar"
                    src={repo.owner.avatar_url}
                    alt={"Avatar for " + repo.owner.login}
                  />
                </a>
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count}</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

function SelectLanguage(props) {
  var languages = ["All", "JavaScript", "Ruby", "CSS", "Python"];
  return (
    <ul className="languages">
      {languages.map(function(lang) {
        return (
          <li
            style={
              lang === props.selectedLanguage ? { color: "#d00b1e" } : null
            }
            key={lang}
            onClick={props.onSelect.bind(null, lang)}
          >
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      };
    });
    api.fetchPopularRepos(lang).then(
      function(repos) {
        this.setState(function() {
          return {
            repos: repos
          };
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? (
          <Loading
            type="bars"
            color="#d00b1e"
            className="loader-icon"
            width={100}
            height={100}
          />
        ) : (
          <RepoGrid repos={this.state.repos} />
        )}
      </div>
    );
  }
}

module.exports = Popular;
