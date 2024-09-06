"use client";

import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Col,
  Input,
  Row,
  Tag,
  Select,
  message,
  UploadProps,
  Button,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  CloseOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import type { InputRef } from "antd";
import { useGetAllAuthorQuery } from "@/lib/query/search.query";
import { useGetAllCategoryQuery } from "@/lib/query/category.query";
import { useGetSubcategoriesByCategoryQuery } from "@/lib/query/article.query";
import { UploadChangeParam } from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import { CiCircleCheck } from "react-icons/ci";
import Cookies from "js-cookie";
import * as Yup from "yup";
import axios from "axios";
import {useRouter} from "next/navigation";

const { Option } = Select;

interface props {
  authorId: string;
}

const CreateArticle = ({ authorId }: props) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const router = useRouter();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const [selectedCoAuthors, setSelectedCoAuthors] = useState([]);
  const [file, setFile] = useState<any | null>(null);
  // @ts-ignore
  const { data: authors = [] } = useGetAllAuthorQuery();
  const { data: categories = [] } = useGetAllCategoryQuery();
  const [selectedCategory, setSelectedCategory] = useState<
      string | number | null
  >(null);
  const { data: subcategories = [] } = useGetSubcategoriesByCategoryQuery(
      selectedCategory!,
      {
        skip: !selectedCategory,
      },
  );

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedKeyword: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== removedKeyword));
  };

  const handleInputConfirm = (setField: any) => {
    if (inputValue && !keywords.includes(inputValue)) {
      setKeywords([...keywords, inputValue]);
      setField("keyword", `${keywords.join(",")},${inputValue}`);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const UploadPropsPdf: (
      field: (key: string, value: any) => void,
  ) => UploadProps = (field) => {
    const allowedFormats = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const props: UploadProps = {
      name: "file",
      multiple: false,
      action: "https://journal2.nordicun.uz/file/upload",
      headers: {
        Authorization: localStorage.getItem("accessToken") || "",
      },
      beforeUpload(file: any) {
        const isAllowedFormat = allowedFormats.includes(file.type);
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isAllowedFormat) {
          message.warning(
              "Faqat PDF, DOC, yoki DOCX formatdagi fayllarni yuklash mumkin!",
          );
        }
        if (!isLt5M) {
          message.error("Fayl hajmi 5 MB dan oshmasligi kerak!");
        }
        return isAllowedFormat && isLt5M;
      },
      onChange(info: UploadChangeParam<any>) {
        if (info.file.status === "done") {
          message.success(`${info.file.name} muvaffaqiyatli yuklandi!`);
          field("source_id", info.file.response.link.id);
          setFile(info.file);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} yuklashda xatolik!`);
        }
      },
    };

    return props;
  };

  const initialValues = {
    title: "",
    description: "",
    abstract: "",
    keyword: "",
    author_id: authorId,
    categoryId: "",
    SubCategoryId: "",
    source_id: "",
    coAuthorIds: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Sarlavha majburiy."),
    description: Yup.string().required("Tavsif majburiy."),
    abstract: Yup.string().required("Qisqa maqola majburiy."),
    keyword: Yup.string().required("Kalit so‘zlar majburiy."),
    categoryId: Yup.string().required("Kategoriya tanlash majburiy."),
    SubCategoryId: Yup.string().required("Sub-kategoriya tanlash majburiy."),
    source_id: Yup.string().required("Fayl yuklanishi majburiy."),
  });

  return (
      <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              await axios.post(
                  `https://journal2.nordicun.uz/article/user/create`,
                  {
                    ...values,
                  },
                  {
                    headers: {
                      Authorization: Cookies.get("access_token"),
                    },
                  },
              );
              message.success("Maqola muvaffaqiyatli yaratildi!");
              router.push('/profile');
              resetForm();
            } catch (e:any) {
              if (e.response?.status === 409) {
                message.error("Bunday maqola allaqachon mavjud!");
              }
              setSubmitting(false);
            }
          }}
      >
        {({ handleSubmit, isSubmitting, setFieldValue }) => (
            <Form className="placeholder:text-[10px]" onSubmit={handleSubmit}>
              <div>
                <h1 className="text-xl font-semibold mb-5">Maqola yozing</h1>
              </div>
              <Row className="flex flex-col gap-3">
                <Col span={24}>
                  <Field
                      name="title"
                      as={Input}
                      placeholder="Sarlavha"
                      size="large"
                      required
                  />
                  <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-700 text-[13px]"
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
                  <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-700 text-[13px]"
                  />
                </Col>
                <Col span={24}>
                  <Field
                      name="abstract"
                      as={TextArea}
                      placeholder="abstract"
                      size="large"
                      required
                  />
                  <ErrorMessage
                      name="abstract"
                      component="div"
                      className="text-red-700 text-[13px]"
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
                            setInputValue(e.target.value);
                          }}
                          onBlur={() => handleInputConfirm(setFieldValue)}
                          onPressEnter={() => handleInputConfirm(setFieldValue)}
                      />
                  ) : (
                      <Tag
                          onClick={() => setInputVisible(true)}
                          className="site-tag-plus w-full py-2"
                      >
                        + Kalit so'z qo'shish
                      </Tag>
                  )}
                  <ErrorMessage
                      name="keyword"
                      component="div"
                      className="text-red-700 mt-2 text-[13px]"
                  />
                </Col>
                <Col span={24} className="flex items-center gap-3">
                  <Select
                      className="w-1/2"
                      placeholder="Kategoriya tanlang"
                      size="large"
                      onChange={(value) => {
                        setSelectedCategory(value);
                        setFieldValue("categoryId", value);
                      }}
                  >
                    {categories.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.name}
                        </Option>
                    ))}
                  </Select>
                  <Select
                      onChange={(e) => {
                        setFieldValue("SubCategoryId", e);
                      }}
                      className="w-1/2"
                      options={subcategories?.map((a: any) => ({
                        label: a.name,
                        value: a.id,
                      }))}
                      filterOption={(input: any, option: any) =>
                          option?.label.toLowerCase().includes(input.toLowerCase())
                      }
                      disabled={selectedCategory === null ? true : false}
                      placeholder="Sub-kategoriya tanlang"
                      size="large"
                  ></Select>
                </Col>
                <ErrorMessage
                    name="categoryId"
                    component="div"
                    className="text-red-700 text-[13px]"
                />
                <Col span={24}>
                  <Select
                      size="large"
                      mode="multiple"
                      placeholder="Hammualliflarni tanlang"
                      style={{ width: "100%" }}
                      value={selectedCoAuthors}
                      onChange={(e) => {
                        setSelectedCoAuthors(e);
                        setFieldValue("coAuthorIds", e);
                      }}
                      options={authors?.map((a: any) => ({
                        label: a.full_name,
                        value: a.id,
                      }))}
                      filterOption={(input: any, option: any) =>
                          option?.label.toLowerCase().includes(input.toLowerCase())
                      }
                      getPopupContainer={(trigger) => trigger.parentNode}
                  />
                </Col>
                <Col span={24}>
                  <Dragger
                      showUploadList={false}
                      {...UploadPropsPdf(setFieldValue)}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Maqola faylini yuklang.</p>
                    <p className="ant-upload-hint">
                      Faqat PDF, DOC, yoki DOCX formatidagi fayllarni yuklash
                      mumkin.
                      <br />
                      Maksimal fayl hajmi: 5 MB.
                    </p>
                  </Dragger>
                  {file && (
                      <div className="mt-3 flex items-center justify-between">
                        <div className="uploaded-file-info gap-3">
                          {file.type === "application/pdf" && (
                              <FilePdfOutlined style={{ fontSize: "21px" }} />
                          )}
                          {file.type === "application/msword" && (
                              <FileWordOutlined style={{ fontSize: "20px" }} />
                          )}
                          {file.type ===
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                                  <FileWordOutlined style={{ fontSize: "20px" }} />
                              )}
                          <span>{file.name}</span>
                        </div>
                        <CiCircleCheck className="text-xl text-green-600" />
                      </div>
                  )}
                  {
                    !initialValues.source_id && (
                          <ErrorMessage
                              className="text-red-700 text-[13px]"
                              name="source_id"
                              component="div"
                          />
                      )
                  }
                </Col>
              </Row>
              <div className="flex items-center justify-end">
                <Button
                    htmlType="submit"
                    type="primary"
                    className="mt-3 px-10"
                    disabled={isSubmitting}
                >
                  yuborish
                </Button>
              </div>
            </Form>
        )}
      </Formik>
  );
};

export default CreateArticle;
