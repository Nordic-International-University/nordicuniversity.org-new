"use client";
import React, { lazy } from "react";
import { Container, Table } from "react-bootstrap";
import { Button, Collapse } from "antd";
import dayjs from "dayjs";
import { BiDownload } from "react-icons/bi";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import Link from "next/link";
import Image from "next/image";


const Worker = lazy(() =>
  import("@react-pdf-viewer/core").then((mod) => ({ default: mod.Worker })),
);
const Viewer = lazy(() =>
  import("@react-pdf-viewer/core").then((mod) => ({ default: mod.Viewer })),
);


const Articles = ({ data }: { data: any }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const downloadFile = async (filePath: any, isFullLink: any) => {
    try {
      const response = await fetch(
        isFullLink ? filePath : `https://journal2.nordicun.uz${filePath}`,
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const fileName = filePath.split("/").pop();
      a.download = fileName;

      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Fayl yuklab olishda xato yuz berdi:", error);
    }
  };

  const genExtra = (
    text:
      | string
      | number
      | bigint
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | Promise<React.AwaitedReactNode>
      | null
      | undefined,
    link: string | URL | Request | Uint8Array | undefined,
    isFullLink: boolean,
  ) => (
    <Button
      onClick={(event) => {
        event.stopPropagation();
        downloadFile(link, isFullLink);
      }}
      className="w-48 max-sm:w-auto"
      icon={<BiDownload />}
      type="primary"
    >
      <p className="max-sm:hidden block">{text}</p>
    </Button>
  );

  const items = [
    {
      key: "1",
      label: "Maqolani o‘qish",
      children: (
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <div style={{ height: "750px" }}>
            <Viewer
              fileUrl={`https://journal2.nordicun.uz${data?.file?.file_path}`}
              plugins={[defaultLayoutPluginInstance]}
            />
          </div>
        </Worker>
      ),
      extra: genExtra("Maqolani yuklash", data?.file?.file_path, false),
    },
    {
      key: "2",
      label: "Antiplagiatni ko‘rish",
      children: (
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <div style={{ height: "750px" }}>
            <Viewer
              fileUrl={`https://journal2.nordicun.uz${data?.plagiarist_file?.file_path}`}
              plugins={[defaultLayoutPluginInstance]}
            />
          </div>
        </Worker>
      ),
      extra: genExtra(
        "Antiplagiatni yuklash",
        data?.plagiarist_file?.file_path,
        false,
      ),
    },
  ];

  const certificates = data?.certificates?.map(
    (
      item: {
        author: { full_name: any };
        certificate_link: any;
      },
      index: any,
    ) => {
      return {
        key: index,
        label: `${item?.author?.full_name} muallifning sertifikati`,
        children: (
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <div className="max-sm:h-[400px]" style={{ height: "750px" }}>
              <Viewer
                fileUrl={item?.certificate_link}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
        ),
        extra: genExtra("Sertifikatni yuklash", item?.certificate_link, true),
      };
    },
  );

  return (
    <>
      <div className="w-full bg-white py-6"></div>
      <Container className="mt-10 max-sm:mb-20">
        <div className="flex items-start gap-4 max-xl:flex-col justify-between">
          <div className="w-3/4 max-xl:w-full">
            <div className="bg-white w-full max-sm:mt-4 py-4 px-3 rounded-md">
              <h2 className="inline text-sm font-bold pb-7">
                Maqola sarlavhasi:
              </h2>
              <p className="inline text-sm pl-2">{data?.title}</p>
            </div>
            <div className="bg-white w-full py-4 px-3 mt-4 rounded-md">
              <h2 className="inline text-sm font-bold pb-7">Tavsif:</h2>
              <p className="inline text-sm pl-2">{data?.description}</p>
            </div>
            <div className="bg-white w-full py-4 px-3 mt-4 rounded-md">
              <h2 className="inline text-sm font-bold pb-7">Abstrakt:</h2>
              <p className="inline text-sm pl-2">{data?.abstract}</p>
            </div>
            <div className="w-full">
              <div className="flex items-center max-sm:flex-col gap-3 rounded-md bg-white py-3 mt-4 px-3">
                <h1 className="font-bold text-sm text-nowrap">
                  Kalit so‘zlar:
                </h1>
                <div className="flex items-center max-sm:justify-center  gap-3 flex-wrap">
                  {data?.keyword
                    ?.split(",")
                    ?.map((item: any, index: number) => (
                      <Button
                        className="px-3  text-sm text-white h-7"
                        type="primary"
                        key={index}
                      >
                        {item}
                      </Button>
                    ))}
                </div>
              </div>
            </div>
            <div className="bg-white w-full py-4 px-3 mt-4 rounded-md">
              <h2 className="inline text-sm font-bold pb-7"> Yo‘nalish:</h2>
              <Button className="inline text-[12px] ml-3.5 " type="primary">
                {data?.category?.name}
              </Button>
            </div>
            <div className="bg-white w-full py-4 px-3 mt-4 rounded-md">
              <h2 className="inline text-sm font-bold pb-7">
                Yo‘nalish sohasi:
              </h2>
              <p
                className="inline text-sm uppercase
               pl-2"
              >
                {" "}
                {data?.SubCategory?.name}
              </p>
            </div>
            <div className="w-full mt-4">
              <Collapse className="bg-white" items={[items[0]]} />
            </div>
            {data?.certificates?.length > 0 && (
              <div className="w-full mt-4 ">
                <Collapse className="bg-white" items={certificates} />
              </div>
            )}

            {data?.coAuthors?.length !== 0 && (
              <div className="mt-4 w-full bg-white pt-4 px-4">
                <h1 className="font-bold text-lg pb-4">Hammualliflar</h1>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr
                      className="text-nowrap
                    "
                    >
                      <th>Muallif</th>
                      <th>Ilmiy daraja</th>
                      <th>Telefon raqami</th>
                      <th>Ish joyi</th>
                      <th>Lavozim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.coAuthors?.map((author: any) => (
                      <tr key={author.id}>
                        <td>{author.full_name}</td>
                        <td>{author.science_degree}</td>
                        <td>{author.phone_number}</td>
                        <td>{author.place_position}</td>
                        <td>{author.job}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
          <div className="w-3/12 max-xl:w-full">
            {data?.image && (
              <div
                className="bg-white
               relative w-full h-60 rounded-md overflow-hidden"
              >
                <div
                  className="absolute z-10 bg-gradient_2 -bottom-12 left-0
                 w-full
                  h-full"
                ></div>
                <div
                  className="absolute text-white text-lg font-semibold -tracking-tighter  z-20 bottom-5 left-5
                 w-full
                  "
                >
                  Maqola muqovasi
                </div>

                <div className="flex justify-center items-center w-full h-full">
                  <Image
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                      alt="Maqola muqovasi"
                      layout="responsive"
                      priority={true}
                      src={`https://journal2.nordicun.uz${data?.image?.file_path}`}
                      placeholder="empty"
                  />
                </div>
              </div>
            )}
            {data?.doi && (
              <Link href={data?.doi} target="_blank">
                <div className="w-full mt-4">
                  <div className="flex text-white items-center">
                    <span className="bg-blue-500 rounded-bl-md text-sm rounded-tl-md py-2 px-2">
                      DOI
                    </span>
                    <div className="w-full rounded-br-md text-sm rounded-tr-md py-2 px-2 bg-orange-500">
                      {data?.doi}
                    </div>
                  </div>
                </div>
              </Link>
            )}
            {data?.publish_date && (
              <div className="w-full mt-4">
                <div className="flex text-white items-center">
                  <span className="bg-blue-500 text-nowrap rounded-bl-md text-sm rounded-tl-md py-2 px-2">
                    Nashr etilgan sana:
                  </span>
                  <div className="w-full rounded-br-md text-sm rounded-tr-md py-2 px-2 bg-orange-500">
                    {dayjs(data?.publish_date).format("DD-MMMM, YYYY")}
                  </div>
                </div>
              </div>
            )}
            <div className="w-full bg-white mt-4 px-3 py-4 rounded-md">
              <h2 className="text-xl pb-6">Maqolaning muallifi</h2>
              <div className="flex flex-col gap-3">
                <p>
                  <strong>Muallif:</strong> {""} {data?.author?.full_name}
                </p>
                <p>
                  <strong>Ish joyi:</strong> {""} {data?.author?.place_position}
                </p>
                <p>
                  <strong>Lavozim:</strong> {""} {data?.author?.job}
                </p>
                <p>
                  <strong>Ilmiy daraja:</strong> {""}{" "}
                  {data?.author?.science_degree}
                </p>
                <p>
                  <strong>Telefon raqami:</strong> {""}{" "}
                  {data?.author?.phone_number}
                </p>
              </div>
            </div>
            {data?.volume && (
              <div className="w-full mt-4">
                <div className="bg-white rounded-md">
                  <div className="px-4 pt-4">
                    <h2 className="text-xl">Nashr: {data?.volume?.title}</h2>
                    <div>
                      <Image
                        width={400}
                        height={300}
                        alt="nashr"
                        className="py-2"
                        src={`https://journal2.nordicun.uz${data?.volume?.image?.file_path}`}
                      />
                    </div>
                  </div>
                  <Link
                    target="_blank"
                    href={`https://journal2.nordicun.uz${data?.volume?.source?.file_path}`}
                  >
                    <Button
                      className="w-full rounded-none py-5 font-bold uppercase rounded-bl-md rounded-br-md"
                      type="primary"
                    >
                      Nashrni yuklab olish
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Articles;
