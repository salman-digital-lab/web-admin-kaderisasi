import React from "react";
import timelineData from "../timeline.json";

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <span className="tag" style={{ background: data.category.color }}>
        {data.category.tag}
      </span>
      <time>{data.date}</time>
      <p>{data.text}</p>
      {data.link && (
        <a href={data.link.url} target="_blank" rel="noopener noreferrer">
          {data.link.text}
        </a>
      )}
      <span className="circle" />
    </div>
  </div>
);

const KaderTimeline = () => {
  return (
    <div>
      <h3>Timeline Aktivis</h3>
      <div className="kader-timeline-container">
        {timelineData.length > 0 && (
          <div className="timeline-container">
            {timelineData.map((data, idx) => (
              <TimelineItem data={data} key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KaderTimeline;
