import { Component } from "react";
class Jobs extends Component {
  state = {
    jobs: [],
    bookmarks: [],
    isLoading: false,
    error: "",
    page: 1,
  };
  componentDidMount() {
    this.getJobDetails();
  }
  getJobDetails = async () => {
    const { page } = this.state;
    this.setState({
      isLoading: true,
    });
    const apiUrl = `https://testapi.getlokalapp.com/common/jobs?page=${page}`;  //fetching data 
    const response = await fetch(apiUrl);
    if (response.ok === true) {
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
        primary_details: eachResult.primary_details,
        whatsappNo: eachResult.whatsapp_no,
        title: eachResult.title,
        numApplications: eachResult.num_applications,
        isBookMark: false,
      }));
      let newpage;
      if (page === 3) {
        newpage = 1;
      } else {
        newpage = page + 1;
      }
      this.setState((prevState) => ({
        jobs: [...prevState.jobs, updatedData], //update state with fetched data
        isLoading: false,
        page: newpage,
      }));
    } else {
      this.setState({
        error: "Not Found", 
      });
    }
  };
  render() {
    return <h1>jobs</h1>;
  }
}
export default Jobs;
