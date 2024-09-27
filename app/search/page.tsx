"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Collapse,
  DatePicker,
  Input,
  Select,
  Row,
  Col,
  Skeleton,
} from "antd";
import { initialState } from "./search.states";
import { volumeToValueAndLabel } from "./search.queryies";
import dayjs from "dayjs";
import { BiTrash } from "react-icons/bi";
import { useGetAllCategoryQuery } from "@/lib/query/category.query";
import { useGetVolumesQuery } from "@/lib/query/volume.query";
import {
  useGetAllFilteredArticlesMutation,
  useGetSubCategoriesByCategoryIdQuery,
  useGetAllAuthorQuery,
} from "@/lib/query/search.query";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";

const Page = () => {
  const [filterState, setFilterState] = useState(initialState);
  const checkBoxDoi = useRef(null);

  const updateFilter = (section: any, key: any, value: any) => {
    setFilterState((prevState: any) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      },
    }));
  };

  const { data: categories } = useGetAllCategoryQuery();
  const { data: volume } = useGetVolumesQuery();
  // @ts-ignore
  const { data: author } = useGetAllAuthorQuery();
  const { data: subCategories } = useGetSubCategoriesByCategoryIdQuery(
    filterState.mainFilter.Category,
  );

  const [getAllFilteredArticles, { data, isLoading }] =
    useGetAllFilteredArticlesMutation();

  console.log(data);
  const handleSortChange = (value: string) => {
    setFilterState((prevState: any) => {
      const newSort = {
        createdAt: value === "createdAt" ? "DESC" : null,
        viewsCount: value === "viewsCount" ? "DESC" : null,
      };
      return {
        ...prevState,
        sort: newSort,
      };
    });
    getAllFilteredArticles({ data: filterState, page: 1, limit: 40 });
  };

  const handleSearch = () => {
    getAllFilteredArticles({ data: filterState, page: 1, limit: 40 });
  };

  useEffect(() => {
    getAllFilteredArticles({ data: filterState, page: 1, limit: 40 });
  }, [filterState.sort.viewsCount, filterState.sort.createdAt]);

  const items = [
    {
      key: "1",
      label: "Maqola sarlavhasi bo'yicha",
      children: (
        <Input
          variant="outlined"
          size="middle"
          value={filterState.mainFilter.title}
          onChange={(e) => updateFilter("mainFilter", "title", e.target.value)}
          placeholder="Maqola sarlavhasini kiriting"
        />
      ),
    },
    {
      key: "2",
      label: "Nashrlar bo'yicha",
      children: (
        <Select
          allowClear={true}
          mode="multiple"
          variant="outlined"
          className="w-full"
          size="middle"
          value={filterState.mainFilter.volume}
          onChange={(values) => updateFilter("mainFilter", "volume", values)}
          options={volumeToValueAndLabel(volume, "id", "title")}
          placeholder="Nashrni tanlang!"
        />
      ),
    },
    {
      key: "3",
      label: "Yo'nalishlar bo'yicha",
      children: (
        <Select
          allowClear={true}
          mode="multiple"
          variant="outlined"
          className="w-full"
          size="middle"
          value={filterState.mainFilter.Category}
          onChange={(values) => updateFilter("mainFilter", "Category", values)}
          options={volumeToValueAndLabel(categories, "id", "name")}
          placeholder="Yo'nalishni tanlang!"
        />
      ),
    },
    {
      key: "4",
      label: "Yo'nalish sohalari bo'yicha",
      children: (
        <Select
          allowClear={true}
          mode="multiple"
          variant="outlined"
          className="w-full"
          size="middle"
          value={filterState.mainFilter.subCategory}
          onChange={(values) =>
            updateFilter("mainFilter", "subCategory", values)
          }
          options={volumeToValueAndLabel(subCategories, "id", "name")}
          placeholder="Yo'nalish sohasini tanlang!"
        />
      ),
    },
    {
      key: "5",
      label: "Mualliflar bo'yicha",
      children: (
        <Select
          allowClear={true}
          mode="multiple"
          variant="outlined"
          className="w-full"
          size="middle"
          value={filterState.mainFilter.author}
          onChange={(values) => updateFilter("mainFilter", "author", values)}
          filterOption={(input: any, option: any) =>
            option?.label.toLowerCase().includes(input.toLowerCase())
          }
          options={volumeToValueAndLabel(author, "id", "full_name")}
          placeholder="Mualliflar tanlang!"
        />
      ),
    },
  ];

  const items2 = [
    {
      key: "5",
      label: "Vaqt oralig'i bo'yicha",
      children: (
        <div className="w-full flex justify-center items-center gap-2">
          <DatePicker
            value={
              filterState.dateFilter.start
                ? dayjs(filterState.dateFilter.start)
                : null
            }
            onChange={(e) =>
              updateFilter("dateFilter", "start", dayjs(e).format("YYYY-MM-DD"))
            }
            rootClassName=""
            format={{
              format: "YYYY-MM-DD",
              type: "mask",
            }}
            placeholder="dan"
          />
          <DatePicker
            placeholder="gacha"
            value={
              filterState.dateFilter.end
                ? dayjs(filterState.dateFilter.end)
                : null
            }
            rootClassName=""
            onChange={(e) =>
              updateFilter("dateFilter", "end", dayjs(e).format("YYYY-MM-DD"))
            }
            format={{
              format: "YYYY-MM-DD",
              type: "mask",
            }}
          />
        </div>
      ),
    },
    {
      key: "5",
      label: "Qo'shimcha saralash",
      children: (
        <div>
          <Checkbox
            value={filterState.extraFilter.existDoi}
            ref={checkBoxDoi}
            onChange={(e) =>
              updateFilter("extraFilter", "existDoi", e.target.checked)
            }
          >
            DOI mavjudlari
          </Checkbox>
        </div>
      ),
    },
  ];

  return (
    <>
      <Container className="user-select-none">
        <div className="flex items-start max-md:flex-col justify-between gap-3">
          <div className="w-1/4 pt-10 sticky max-md:static top-0 max-md:w-full max-lg:w-1/2">
            <div className="flex items-center mb-5 justify-between">
              <h2 className="font-semibold text-lg">Saralash</h2>
              <Button
                onClick={() => {
                  setFilterState(initialState);
                  getAllFilteredArticles({
                    data: initialState,
                    page: 1,
                    limit: 40,
                  });
                }}
                size="small"
                type="default"
                className="bg-transparent border-0 shadow-none"
                icon={<BiTrash />}
              >
                Tozalash
              </Button>
            </div>
            <Collapse
              expandIcon={({ isActive }) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.3s",
                    transform: !isActive ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                >
                  {isActive ? <MinusOutlined /> : <PlusOutlined />}
                </div>
              )}
              className="text-black font-semibold -tracking-tighter bg-white"
              accordion
              size="middle"
              defaultActiveKey={"1"}
              items={items}
            />
            <span className="w-full h-1 border-dashed border-1 bg-white block my-2"></span>
            <Collapse
              defaultActiveKey={"5"}
              expandIcon={({ isActive }) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.4s",
                    transform: !isActive ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                >
                  {isActive ? <MinusOutlined /> : <PlusOutlined />}
                </div>
              )}
              className="text-black font-semibold -tracking-tighter bg-white"
              accordion
              size="middle"
              items={items2}
            />
            <Button
              onClick={handleSearch}
              type="primary"
              size="large"
              className="bg-sky-500 w-full mt-3"
            >
              Izlash
            </Button>
          </div>
          <div className="w-[72%] max-md:w-full">
            <div className="flex pt-10 justify-between items-center max-md:static sticky-top z-10 w-full">
              <div className="flex flex-col">
                <span className="flex items-center gap-2">
                  <span className="block max-sm:hidden">Topilgan</span>{" "}
                  maqolalar soni: <strong>{data?.filterItems}</strong> ta
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Select
                  defaultValue="createdAt"
                  onChange={handleSortChange}
                  className="w-40"
                  placeholder="Saralash"
                >
                  <Select.Option value="createdAt">Sana</Select.Option>
                  <Select.Option value="viewsCount">
                    Ko'rishlar soni
                  </Select.Option>
                </Select>
              </div>
            </div>
            <div className="mt-[18px]">
              <Row gutter={[16, 16]}>
                {isLoading
                  ? Array.from({
                      length: data?.filterItems ? data?.filterItems : 10,
                    }).map((_, index) => (
                      <Col key={index} xl={12}>
                        <div className="flex items-start gap-3 w-full">
                          <Skeleton.Image
                            style={{ width: 176, height: 144 }}
                            className="h-36 w-44"
                          />
                          <div>
                            <Skeleton paragraph={{ rows: 1 }} active />
                            <div className="pt-3 w-full">
                              <Skeleton.Input
                                style={{ width: "100%" }}
                                active
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))
                  : data?.data &&
                    data?.data?.map((item: any) => (
                      <Col key={item.id} xl={12}>
                        <BigArticlesCard
                          title={item.title}
                          date={item.publishedDate}
                          category={item.category.name}
                          description={item.description}
                          slug={item.slug}
                          author={item.author.full_name}
                          imageUrl={
                            item?.image?.file_path ? item.image.file_path : ""
                          }
                        />
                      </Col>
                    ))}
              </Row>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Page;
