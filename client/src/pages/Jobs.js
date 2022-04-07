import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Progress,
  Avatar,
  Typography,
  Popconfirm,
} from "antd";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { getAllJobs, deleteJob, clearJobs } from "../redux/actions/jobActions";
import { API_URL } from "../utils/constants";

const { Title } = Typography;

const project = [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "BUDGET",
    dataIndex: "budget",
  },
  {
    title: "DUE DATE",
    dataIndex: "dueDate",
  },
  {
    title: "STATUS",
    dataIndex: "status",
  },
  {
    title: "COMPLETION",
    dataIndex: "completion",
  },
  {
    title: "ACTIONS",
    dataIndex: "actions",
  },
];

// const dataproject = [
//   {
//     key: "1",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}>Spotify Version</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">$14,000</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">working</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress percent={30} size="small" />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "2",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava2} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}>Progress Track</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">$3,000</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">working</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress percent={10} size="small" />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "3",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava3} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}> Jira Platform Errors</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">Not Set</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">done</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress percent={100} size="small" format={() => "done"} />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "4",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}> Launch new Mobile App</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">$20,600</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">canceled</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress
//             percent={50}
//             size="small"
//             status="exception"
//             format={() => "50%"}
//           />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "5",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}>Web Dev</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">$4,000</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">working</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress percent={80} size="small" />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "6",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava6} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}>Redesign Online Store</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">$2,000</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">canceled</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress percent={0} size="small" />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },
// ];

function Jobs() {
  const dispatch = useDispatch();
  const { jobs } = useSelector(state => state.job);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(getAllJobs());
    return () => {
      dispatch(clearJobs());
    };
    // eslint-disable-next-line
  }, []);

  // Filter Data
  const filteredData =
    filter === "pending"
      ? jobs.filter(item => item.status === "pending")
      : filter === "completed"
      ? jobs.filter(item => item.status === "completed")
      : jobs;

  // Map Data
  const data = filteredData.map((item, index) => ({
    key: index,
    title: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            src={API_URL + item?.image.url}
            size={25}
            alt=""
          />
          <div className="avatar-info">
            <Title level={5}>{item.title}</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    budget: (
      <>
        <div className="semibold">${item.budget}</div>
      </>
    ),
    dueDate: (
      <>
        <div className="text-sm">{item.dueDate}</div>
      </>
    ),
    status: (
      <>
        <div className="semibold">{item.status}</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={30} size="small" />
        </div>
      </>
    ),
    actions: (
      <>
        <div className="ant-employed">
          <Popconfirm
            title="Are you sure to remove this job?"
            onConfirm={() => dispatch(deleteJob(item._id))}
            okText="Yes"
            cancelText="No"
          >
            <AiFillDelete
              size="20px"
              color="red"
              style={{ cursor: "pointer" }}
            />
          </Popconfirm>
        </div>
      </>
    ),
  }));

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Jobs"
              extra={
                <>
                  <Radio.Group
                    onChange={e => setFilter(e.target.value)}
                    defaultValue={filter}
                  >
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="pending">PENDING</Radio.Button>
                    <Radio.Button value="completed">COMPLETED</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Jobs;
