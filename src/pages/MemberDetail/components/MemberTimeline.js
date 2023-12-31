import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { AdminMemberContext } from "../../../context/AdminMemberContext"
import LoadingAnimation from "../../../components/loading-animation"
import { RegistrantStatus } from "../../../components/statuses"

const TimelineItem = ({ status, beginDate, name }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <span className="tag">
        <RegistrantStatus status={status.toLowerCase()} />
      </span>
      <time>{new Date(beginDate).toLocaleDateString()}</time>
      <p>{name}</p>
      {/* {data.activity_id && (
        <Link to={"/activity/" + data.activity_id}>
          {data.category_name}
        </Link>
      )} */}
      <span className="circle" />
    </div>
  </div>
)

TimelineItem.propTypes = {
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  beginDate: PropTypes.instanceOf(Date).isRequired,
}

const MemberTimeline = () => {
  const { id } = useParams()
  const { memberActivities, functions } = useContext(AdminMemberContext)
  const { getMemberActivities } = functions
  useEffect(() => {
    if (!memberActivities) {
      getMemberActivities(id)
    }
  }, [])

  return memberActivities?.status === "SUCCESS" ? (
    <div>
      <h3>Timeline Member</h3>
      <div className="member-timeline-container">
        <div className="timeline-container">
          {memberActivities?.data?.activities?.map((data) => (
            <TimelineItem
              status={data.status}
              beginDate={new Date(data.begin_date)}
              name={data.name}
              key={`${data.name}_${data.begin_date}`}
            />
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
