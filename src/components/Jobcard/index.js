import "./index.css";

function Jobcard(props) {
  const { jobDetails, clickJobCard } = props;
  const { title, location, whatsappNo, primaryDetails, id } = jobDetails;
  const { Salary } = primaryDetails;

  const onClickJobCard = () => {
    clickJobCard(id);
  };

  return (
    <li className="jobcard" onClick={onClickJobCard}>
      <p className="job-title">{title}</p>
      <div className="watsapp-salary">
        <p className="whatsapp">{whatsappNo}</p>
        <p className="salary">{Salary}</p>
      </div>
      <p>{location}</p>
    </li>
  );
}
export default Jobcard;
