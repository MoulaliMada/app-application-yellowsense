import { Component } from "react";
import Jobcard from "../Jobcard";
import "./index.css"
class Bookmarks extends Component {
  state = { bookmarks: [], jobDetailsId: "" };

  componentDidMount() {
    this.getJobDetailsFromLocalstorage();
  }

  onclickJobCard = (id) => {
    this.setState({ jobDetailsId: id });
  };

  getJobDetailsFromLocalstorage = () => {
    const localstorageBookmarks = localStorage.getItem("bookmarks");
    const localStoragedata = JSON.parse(localstorageBookmarks);
    if (localStoragedata !== null) {
      this.setState({ bookmarks: localStoragedata });
    }
  };

  renderbookmarksview = () => {
    const { bookmarks } = this.state;
    return (
      <div>
        <h1 className="all-jobs-heading">All Jobs</h1>
        <ul className="jobs-ul-container">
          {bookmarks.map((eachjob) => (
            <Jobcard
              key={eachjob.id}
              jobDetails={eachjob}
              clickJobCard={this.onclickJobCard}
            />
          ))}
        </ul>
      </div>
    );
  };
  renderEmptyview = () => {
    return (
      <div className="empty">
        <h1>Bookmarks is empty </h1>
      </div>
    );
  };

  render() {
    const { bookmarks } = this.state;
    return (
      <div className="containe">
        <h1 className="heading">Bookmarks</h1>
        {bookmarks.length !== 0
          ? this.renderbookmarksview()
          : this.renderEmptyview()}
      </div>
    );
  }
}
export default Bookmarks;
