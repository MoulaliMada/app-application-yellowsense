import React, { useState, useEffect } from "react";
import "./index.css";

function JobDetails(props) {
  const {
    jobData,
    clickAddBookMark,
    clickBack,
    clickRemoveBookMark,
  } = props;
  const {
    id,
    companeyName,
    jobCategory,
    jobHours,
    location,
    jobRole,
    openings,
    primaryDetails,
    whatsappNo,
    numApplications,
    title,
  } = jobData;
  let{isBookMark}=jobData
  const { Experience, Place, Qualification, Salary } = primaryDetails;

  const [isJobpresent, setisJobPresent] = useState(false);

  console.log(isJobpresent);

  const onClickAddBookMark = () => {
    clickAddBookMark(id);
  };

  const onClickBack = () => {
    clickBack();
  };
  const onClickRemoveBookMark = () => {
    clickRemoveBookMark(id);
  };

  useEffect(() => {
    // Get the jobs list from localStorage when component mounts
    const savedJobs = localStorage.getItem("bookmarks");
    const jobs = JSON.parse(savedJobs);
    if (jobs !== null) {
      const jobExists = jobs.some((job) => job.id === id);
      setisJobPresent(jobExists);
    }
  }, [id]);

  return (
    <div className="job-detail-container">
      <h1 className="companeyName">{companeyName}</h1>
      <div className="containe1">
        <p className="title">{title}</p>
        <p className="title">job Category : {jobCategory}</p>
      </div>
      <div className="containe1">
        <p className="title">job Role : {jobRole}</p>
        <p className="title">Salary : {Salary}</p>
      </div>
      <div>
        <p className="title">job Hours : {jobHours}</p>
        <p className="title">openings : {openings}</p>
      </div>
      <div>
        <p className="title">numApplications : {numApplications}</p>
        <p className="title">Experience : {Experience}</p>
      </div>
      <div>
        <p className="title">Place : {Place}</p>
        <p className="title">Qualification : {Qualification}</p>
      </div>
      <div>
        <p className="title">location : {location}</p>
        <p className="title">whatsappNo : {whatsappNo}</p>
      </div>
      <div>
        <button className="add-bookmark apply-now">Apply Now</button>
        {isBookMark ? (
          <button className="add-bookmark" onClick={onClickRemoveBookMark}>
            Remove From Bookmark
          </button>
        ) : (
          <button className="add-bookmark" onClick={onClickAddBookMark}>
            Add Bookmark
          </button>
        )}
      </div>
      <button className="back-btn" onClick={onClickBack}>
        Back
      </button>
    </div>
  );
}
export default JobDetails;
