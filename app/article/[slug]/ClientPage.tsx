import Image from "next/image";

const ClientPage = ({ data }: { data: any }) => {
  
  return (
    <section className="container">
      <div className="pt-10 flex flex-col justify-between" style={{ height: "100%" }}>
        <div className="flex gap-3 items-center">
          <div className="w-full overflow-hidden" style={{ height: "500px" }}>
            <Image
              src={`${process.env.BASE_URL}${data.image.file_path}`}
              alt=""
              width={700}
              height={500}
              className="float-left mr-4 rounded h-full"
            />
            <h1 className="text-3xl font-semibold pb-4 text-[#333333] indent-3 leading-10">
              {data.title}
            </h1>

            <div className="flex gap-6">
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left w-1/2 text-justify pb-3">
                {data?.description}
              </p>

              <p className="w-1/2 overflow-hidden text-justify">
                {data?.abstract}
              </p>
            </div>
            <hr className="border-t-2 border-black mt-4" />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="text-right rounded-full border-black border-x-2 px-3 ">Continue...</button>
          <h1>sdsd</h1>
        </div>
      </div>
    </section>
  );
};

export default ClientPage;
