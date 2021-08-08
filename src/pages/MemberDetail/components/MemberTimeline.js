import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { AdminActivityContext } from "../../../context/AdminActivityContext"
import LoadingAnimation from "../../../components/loading-animation"
import { RegistrantStatus } from "../../../components/Statuses/RegistrantStatus"
/* eslint-disable */
const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <span className="tag">
        <RegistrantStatus status={data.status.toLowerCase()} />
      </span>
      <time>{new Date(data.begin_date).toLocaleDateString()}</time>
      <p>{data.name}</p>
      {/* {data.activity_id && (
        <Link to={"/detail-kegiatan/" + data.activity_id}>
          {data.category_name}
        </Link>
      )} */}
      <span className="circle" />
    </div>
  </div>
)

const MemberTimeline = () => {
  const { id } = useParams()
  const { memberActivities, functions } = useContext(AdminActivityContext)
  const { getMemberActivities } = functions
  useEffect(() => {
    if (!memberActivities) {
      getMemberActivities(id)
    }
  }, [])

  return memberActivities?.length > 0 ? (
    <div>
      <h3>Timeline Aktivis</h3>
      <div className="member-timeline-container">
        <div className="timeline-container">
          {memberActivities.map((data, idx) => (
            <TimelineItem data={data} key={idx} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="loading-table">
      <LoadingAnimation />
    </div>
  )
}

export default MemberTimeline
