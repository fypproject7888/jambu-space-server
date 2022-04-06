import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Avatar,
  Typography,
  Popconfirm,
} from "antd";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { AiFillDelete } from "react-icons/ai";
import {
  getAllSellers,
  deleteSeller,
  clearSellers,
} from "../redux/actions/sellerActions";
import { API_URL } from "../utils/constants";

const { Title } = Typography;

const columns = [
  {
    title: "SELLER",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "COMPANY",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "COUNTRY",
    key: "country",
    dataIndex: "country",
  },
  {
    title: "RATING",
    key: "rating",
    dataIndex: "rating",
  },
  {
    title: "EARNINGS",
    key: "earnings",
    dataIndex: "earnings",
  },
  {
    title: "JOBS",
    key: "jobs",
    dataIndex: "jobs",
  },
  {
    title: "ACTIONS",
    key: "actions",
    dataIndex: "actions",
  },
];

function Sellers() {
  const dispatch = useDispatch();
  const { sellers } = useSelector(state => state.seller);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(getAllSellers());
    return () => {
      dispatch(clearSellers());
    };
    // eslint-disable-next-line
  }, []);

  // Filter Data
  const filteredData =
    filter === "online"
      ? sellers.filter(item => item.status === "online")
      : sellers;

  // Map Data
  const data = filteredData.map((item, index) => ({
    key: index,
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={API_URL + item.image.url}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>{item.fullName}</Title>
            <p>{item.email}</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    company: (
      <>
        <div className="author-info">
          <Title level={5}>{item.company || "-"}</Title>
        </div>
      </>
    ),
    country: (
      <>
        <div className="author-info">
          <Title level={5}>{item.country || "-"}</Title>
        </div>
      </>
    ),
    rating: (
      <>
        <div className="author-info">
          <StarRatings
            rating={item.rating || 5}
            starRatedColor="orange"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
          />
        </div>
      </>
    ),
    earnings: (
      <>
        <div className="author-info">
          <p>${item.earnings || 0}</p>
        </div>
      </>
    ),
    jobs: (
      <>
        <div className="ant-employed">
          <span>{item.jobs.length}</span>
        </div>
      </>
    ),
    actions: (
      <>
        <div className="ant-employed">
          <Popconfirm
            title="Are you sure to remove this seller?"
            onConfirm={() => dispatch(deleteSeller(item._id))}
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
              title="Sellers"
              extra={
                <>
                  <Radio.Group
                    onChange={e => setFilter(e.target.value)}
                    defaultValue={filter}
                  >
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="online">ONLINE</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
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

export default Sellers;
