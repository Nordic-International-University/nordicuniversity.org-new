"use client";

import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Col, Input, Row, Tag, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import {useGetAllAuthorQuery, useGetSubCategoriesByCategoryIdQuery} from "@/lib/query/search.query";
import {useGetAllCategoryQuery} from "@/lib/query/category.query";
import {useGetAuthorProfileQuery} from "@/lib/query/myarticle.query";
import Cookies from "js-cookie";
import {useGetSubcategoriesByCategoryQuery} from "@/lib/query/article.query";

const { Option } = Select;

const CreateArticle = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const [selectedCoAuthors, setSelectedCoAuthors] = useState([]);

  // @ts-ignore
  const { data: authors = [] } = useGetAllAuthorQuery();
  const { data: categories = [] } = useGetAllCategoryQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
  const { data: subcategories = [] } = useGetSubcategoriesByCategoryQuery(selectedCategory!, {
    skip: !selectedCategory,
  });
  const author = useGetAuthorProfileQuery({token:Cookies.get("access_token")});

  console.log(author)
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedKeyword: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== removedKeyword));
  };

  const handleInputConfirm = () => {
    if (inputValue && !keywords.includes(inputValue)) {
      setKeywords([...keywords, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const initialValues = {
    title: "",
    description: "",
    abstract: "",
    keyword: "",
    author_id: "",
    categoryId: "",
    SubCategoryId: "",
    source_id: "",
    coAuthorIds: [],
  };

  return (
      <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
          }}
      >
        {({ handleSubmit, isSubmitting, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="flex flex-col gap-3">
                <Col span={24}>
                  <Field
                      name="title"
                      as={Input}
                      placeholder="Sarlavha"
                      size="large"
                      required
                  />
                </Col>
                <Col span={24}>
                  <Field
                      name="description"
                      as={Input}
                      placeholder="Tavsif"
                      size="large"
                      required
                  />
                </Col>
                <Col span={24}>
                  <Field
                      name="abstract"
                      as={TextArea}
                      placeholder="Qisqa Maqola"
                      size="large"
                      required
                  />
                </Col>
                <Col span={24}>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {keywords.map((keyword) => (
                        <Tag
                            key={keyword}
                            closable
                            onClose={() => handleClose(keyword)}
                            closeIcon={<CloseOutlined />}
                        >
                          {keyword}
                        </Tag>
                    ))}
                  </div>
                  {inputVisible ? (
                      <Input
                          ref={inputRef}
                          type="text"
                          className="w-full py-2"
                          size="small"
                          value={inputValue}
                          onChange={(e) => {
                            setInputValue(e.target.value)
                            setFieldValue('keyword',selectedCoAuthors.join(''))
                          }}
                          onBlur={handleInputConfirm}
                          onPressEnter={handleInputConfirm}
                      />
                  ) : (
                      <Tag
                          onClick={() => setInputVisible(true)}
                          className="site-tag-plus w-full py-2"
                      >
                        + Kalit so'z qo'shish
                      </Tag>
                  )}
                </Col>
                <Col span={24} className="flex items-center gap-3">
                  <Select
                      className="w-1/2"
                      placeholder="Kategoriya tanlang"
                      size="large"
                      onChange={(value) => {
                        console.log(value)
                        setSelectedCategory(value);
                        setFieldValue("categoryId", value);
                        setFieldValue("SubCategoryId", "");
                      }}
                  >
                    {categories.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.name}
                        </Option>
                    ))}
                  </Select>
                  <Select
                      className="w-1/2"
                      options={subcategories?.map((a:any) => ({
                        label: a.name,
                        value: a.id,
                      }))}
                      filterOption={(input:any, option:any) =>
                          option?.label.toLowerCase().includes(input.toLowerCase())
                      }
                      disabled={selectedCategory === null ? true : false}
                      placeholder="Sub-kategoriya tanlang"
                      size="large"
                  >
                  </Select>
                </Col>


                <Col span={24}>
                  <Field name="source_id" as={Input} placeholder="Manba ID" size="large" required />
                </Col>
                <Col span={24}>
                  <Select
                      size="large"
                      mode="multiple"
                      placeholder="Hammualliflarni tanlang"
                      style={{ width: "100%" }}
                      value={selectedCoAuthors}
                      onChange={(e) => {
                        setSelectedCoAuthors(e)
                        setFieldValue('coAuthorIds',e)
                      }}
                      options={authors?.map((a:any) => ({
                        label: a.full_name,
                        value: a.id,
                      }))}
                      filterOption={(input:any, option:any) =>
                          option?.label.toLowerCase().includes(input.toLowerCase())
                      }
                      getPopupContainer={(trigger) => trigger.parentNode}
                  />
                </Col>
              </Row>
              <button type="submit" disabled={isSubmitting} className="mt-4">
                Yaratish
              </button>
            </Form>
        )}
      </Formik>
  );
};

export default CreateArticle;
