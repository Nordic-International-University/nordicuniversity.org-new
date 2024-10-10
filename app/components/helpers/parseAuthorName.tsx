import React from "react";
import { Table } from "antd";

interface ReferencesTableProps {
  references: string;
}

const parseAuthorName = (reference: string): string => {
  const nameMatch = reference.match(/^[^,]+,\s*([A-Z])/);
  return nameMatch ? nameMatch[0] : reference;
};

const ReferencesTable: React.FC<ReferencesTableProps> = ({ references }) => {
  const dataSource = references
    .split("\n")
    .filter(Boolean)
    .map((reference, index) => ({
      key: index.toString(),
      full_name: parseAuthorName(reference),
      reference,
    }));

  const columns = [
    {
      title: "",
      dataIndex: "reference",
      key: "reference",
    },
  ];

  return (
    <Table
      className="text-nowrap pb-4 overflow-auto"
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      bordered
      pagination={false}
    />
  );
};

export default ReferencesTable;
