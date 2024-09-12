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
    window.addEventListener("scroll", this.handleScroll);
    const localstorageBookmarks = localStorage.getItem("bookmarks");
    this.setState({ bookmarks: [localstorageBookmarks] });
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
        } else {
          this.setState({ jobs, isLoading: false, hasmoreJobs: false });
        }
      }
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
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

  onClickAddorRemoveBookMark = (id) => {
    const { jobs, bookmarks } = this.state;
    const jobData = jobs.find((eachjob) => eachjob.id === id);
    const isBookMarkd = jobData.isBookMark;
    if (!isBookMarkd) {
      const updatedJobData = { ...jobData, isBookMark: true };
      const filterRemainingJobs = jobs.filter((eachjob) => eachjob.id !== id);
      this.setState({
        bookmarks: [...bookmarks, updatedJobData],
        jobs: [...filterRemainingJobs, updatedJobData],
      });
      const jobBookMarks = [...bookmarks, updatedJobData];
      console.log(jobBookMarks);
      localStorage.setItem("bookmarks", JSON.stringify(jobBookMarks));
    } else {
      const afterRemoveJobData = bookmarks.filter(
        (eachJob) => eachJob.id !== id
      );
      localStorage.setItem("bookmarks", JSON.stringify(afterRemoveJobData));
      const updatedJobData = { ...jobData, isBookMark: false };
      const filterRemainingJobs = jobs.filter((eachjob) => eachjob.id !== id);
      this.setState({
        jobs: [...filterRemainingJobs, updatedJobData],
        bookmarks: afterRemoveJobData,
      });
    }
    console.log(jobData);
  };

  renderJobDetailsView = () => {
    const { jobs, jobDetailsId } = this.state;
    const jobData = jobs.find((eachjob) => eachjob.id === jobDetailsId);
    return (
      <JobDetails
        jobData={jobData}
        clickAddorRemoveBookMark={this.onClickAddorRemoveBookMark}
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
