import { Table, Divider } from 'antd';
import dayjs from 'dayjs';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

const columns = [
  {
    title: 'Sarlavha',
    dataIndex: 'title',
    key: 'title',
    render: (text: string  ) => <span className="text-[22px] font-bold">{text}</span>,
  },
  {
    title: 'Holati',
    dataIndex: 'status',
    key: 'status',
    render: (text: string ) => <span className="text-[22px] font-bold">{text}</span>,
  },
  {
    title: 'Kategoriyasi',
    dataIndex: 'category',
    key: 'category',
    render: (category: { name: string  }) => <span className="text-[22px] font-bold">{category?.name}</span>,
  },
  {
    title: 'Yaratilgan vaqt',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => <span className="text-[22px] font-bold">{dayjs(date).format("YYYY-MM-DD HH:mm")}</span>,
  },
  {
    title: 'O‘qishlar soni',
    dataIndex: 'viewsCount',
    key: 'viewsCount',
    render: (count: string ) => <span className="text-[22px] font-bold">{count}</span>,
  },
];

const ArticlesTable = ({ posts }) => {
  const data = posts.data.Articles.map((article: { title: any; status: any; category: any; createdAt: any; viewsCount: any; }, index: any) => ({
    key: index,
    title: article.title,
    status: article.status,
    category: article.category,
    createdAt: article.createdAt,
    viewsCount: article.viewsCount,
  }));

  return (
    <div className="bg-white p-4">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }} // Jadvaldagi sahifa hajmini boshqarish
        bordered
      />
    </div>
  );
};

export default ArticlesTable;
