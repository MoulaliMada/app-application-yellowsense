import "./index.css";

function JobDetails(props) {
  const { jobData, clickAddorRemoveBookMark } = props;
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
    isBookMark,
  } = jobData;
  const { Experience, Place, Qualification, Salary } = primaryDetails;
  const onClickAddorRemoveBookMark = () => {
    clickAddorRemoveBookMark(id);
  };
  return (
    <div className="job-detail-container">
      <h1 className="companeyName">{companeyName}</h1>
      <div>
        <p className="title">{title}</p>
        <p className="title">job Category : {jobCategory}</p>
      </div>
      <div>
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
        <button className="add-bookmark" onClick={onClickAddorRemoveBookMark}>
          {!isBookMark ? "Add Bookmark" : "Remove From Bookmark"}
        </button>
      </div>
    </div>
  );
}
export default JobDetails;
