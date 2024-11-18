import React, { useEffect, useState } from "react";
import { Statistic, Row, Col, Button } from "antd";
import { useFetchDashboardInfo } from "../../state/store";
import CountUp from "react-countup";

export const FormCards = () => {
  const { dashboardInfo, loading, error } = useFetchDashboardInfo();
  const { allEquipment, allFormAnswers, allForms, allUsers } = dashboardInfo;
  const [uniqueFormTemplates, setUniqueFormTemplates] = useState(0);

  useEffect(() => {
    if (allForms) {
      const uniqueTemplates = new Set(
        allForms.map((form) => form.form_template_id)
      );
      setUniqueFormTemplates(uniqueTemplates.size);
    }
  }, [allForms]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <>
      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : (
        <div
          className="form-cards"
          style={{
            border: "1px solid #d9d9d9",
            padding: "16px",
            borderRadius: "4px",
            margin: "1px",
          }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title="Total Forms Submitted"
                value={allForms ? allForms.length : 0}
                loading={loading}
                // formatter={formatter}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Total Machines"
                value={allEquipment ? allEquipment.length : 0}
                loading={loading}
                // formatter={formatter}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Total Form Types"
                value={
                  uniqueFormTemplates !== null &&
                  uniqueFormTemplates !== undefined
                    ? uniqueFormTemplates
                    : 0
                }
                loading={loading}
                // formatter={formatter}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Total Active Operators"
                value={allUsers ? allUsers.length : 0}
                loading={loading}
                // formatter={formatter}
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
