import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminActivityContext } from "../../../context/AdminActivityContext";
import LoadingAnimation from "../../../components/loading-animation";
import { RegistrantStatus } from "../../../components/Statuses";

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <span className="tag">
        <RegistrantStatus status={data.status.toLowerCase()} />
      </span>
      <time>
        {data.createdAt ? data.createdAt : new Date().toLocaleDateString()}
      </time>
      <p>{data.activity_id}</p>
      {data.activity_id && (
        <Link to={"/detail-kegiatan/" + data.activity_id}>
          {data.activity_id}
        </Link>
      )}
      <span className="circle" />
    </div>
  </div>
);

const KaderTimeline = () => {
  const { memberForm } = useContext(AdminActivityContext);
  return memberForm?.member?.length > 0 ? (
    <div>
      <h3>Timeline Aktivis</h3>
      <div className="kader-timeline-container">
        {memberForm.member[0].activities.length > 0 && (
          <div className="timeline-container">
            {memberForm.member[0].activities.map((data, idx) => (
              <TimelineItem data={data} key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="loading-table">
      <LoadingAnimation />
    </div>
  );
};

export default KaderTimeline;
