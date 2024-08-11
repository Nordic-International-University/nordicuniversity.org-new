const ClientPage = ({ slug }: { slug: any }) => {
  return (
    <div className="container ">
      <p>{slug?.description}</p>
    </div>
  );
};

export default ClientPage;
