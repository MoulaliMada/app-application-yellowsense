import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import Jobcard from "../Jobcard";
import JobDetails from "../JobDetails";
import "./index.css";
class Jobs extends Component {
  state = {
    jobs: [],
    bookmarks: [],
    isLoading: false,
    error: "",
    page: 1,
    hasmoreJobs: true,
    jobDetailsId: "",
  };
  componentDidMount() {
    this.getJobDetails();
    const localstorageBookmarks = localStorage.getItem("bookmarks");
    const localStoragedata = JSON.parse(localstorageBookmarks);
    if (localStoragedata !== null) {
      this.setState({ bookmarks: localStoragedata });
    }
    window.addEventListener("scroll", this.handleScroll);
  }

  getJobDetails = async () => {
    const { page, jobs } = this.state;
    this.setState({ isLoading: true });
    try {
      const apiUrl = `https://testapi.getlokalapp.com/common/jobs?page=${page}`; //fetching data
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        const result = data.results;
        const updatedData = result.map((eachResult) => ({
          id: eachResult.id,
          companeyName: eachResult.company_name,
          jobCategory: eachResult.job_category,
          jobHours: eachResult.job_hours,
          location: eachResult.job_location_slug,
          jobRole: eachResult.job_role,
          openings: eachResult.openings_count,
          otherDetails: eachResult.other_details,
          primaryDetails: eachResult.primary_details,
          whatsappNo: eachResult.whatsapp_no,
          title: eachResult.title,
          numApplications: eachResult.num_applications,
          isBookMark: false,
        }));

        const validJobs = updatedData.filter((job) => job.id !== undefined);

        if (validJobs.length > 0) {
          this.setState((prevState) => ({
            jobs: [...jobs, ...validJobs], //update state with fetched data
            isLoading: false,
            page: page + 1,
          }));
          this.updatedIsBookmard([...jobs, ...validJobs]);
        } else {
          this.setState({ jobs, isLoading: false, hasmoreJobs: false });
        }
      }
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };

  updatedIsBookmard = (jobs) => {
    const localstorageBookmarks = localStorage.getItem("bookmarks");
    const localStoragedata = JSON.parse(localstorageBookmarks);
    const jobsIds = localStoragedata.map((job) => job.id);
    const updatedJobs = jobs.map((job) => {
      const isSavedInlocalstorage = jobsIds.some((eachId) => eachId === job.id);
      if (isSavedInlocalstorage) {
        return {...job,isBookMark: true,};
      } else {
        return job;
      }
    });
    console.log(jobs)
    this.setState({ jobs: updatedJobs });
  };

  handleScroll = () => {
    const { isLoading, hasmoreJobs } = this.state;

    if (isLoading || !hasmoreJobs) return;

    // Check if the user has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      this.getJobDetails(); // Fetch more data when near the bottom
    }
  };

  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <ThreeDots color="black" height="70" width="70" />
    </div>
  );

  renderFailureView = () => {
    return (
      <div>
        <h1>failye</h1>
      </div>
    );
  };

  onclickJobCard = (id) => {
    this.setState({ jobDetailsId: id });
  };

  renderJobsView = () => {
    const { jobs } = this.state;
    return (
      <div className="jobs-view">
        <h1 className="all-jobs-heading">All Jobs</h1>
        <ul className="jobs-ul-container">
          {jobs.map((eachjob) => (
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

  onClickBack = () => {
    this.setState({ jobDetailsId: "" });
  };

  updateJobs = (id) => {
    const { jobs } = this.state;
    const clickedJob = jobs.find((each) => each.id === id);
    const updateJobBookmark = {
      ...clickedJob,
      isBookMark: !clickedJob.isBookMark,
    };
    const remainingJobs = jobs.filter((eachJob) => eachJob.id !== id);
    this.setState({ jobs: [...remainingJobs, updateJobBookmark] });
  };

  onClickRemoveBookMark = (id) => {
    const { bookmarks } = this.state;
    const removeBookMark = bookmarks.filter((eachJob) => eachJob.id !== id);
    localStorage.setItem("bookmarks", JSON.stringify(removeBookMark));
    this.setState({ bookmarks: removeBookMark });
    this.updateJobs(id);
  };

  onClickAddBookMark = (id) => {
    const { jobs, bookmarks } = this.state;
    const bookMarkJob = jobs.find((eachJob) => eachJob.id === id);
    const bookMarks = [...bookmarks, bookMarkJob];
    localStorage.setItem("bookmarks", JSON.stringify(bookMarks));
    this.setState({ bookmarks: [...bookmarks, bookMarkJob] });
    this.updateJobs(id);
  };

  renderJobDetailsView = () => {
    const { jobs, jobDetailsId } = this.state;
    const jobData = jobs.find((eachjob) => eachjob.id === jobDetailsId);
    return (
      <JobDetails
        jobData={jobData}
        clickBack={this.onClickBack}
        clickRemoveBookMark={this.onClickRemoveBookMark}
        clickAddBookMark={this.onClickAddBookMark}
      />
    );
  };

  render() {
    const { isLoading, jobs, error, jobDetailsId } = this.state;
    if (isLoading) {
      return this.renderLoadingView();
    } else if (jobDetailsId !== "") {
      return this.renderJobDetailsView();
    } else if (jobs.length === 0 && error !== "") {
      return this.renderFailureView();
    } else {
      return this.renderJobsView();
    }
  }
}
export default Jobs;
