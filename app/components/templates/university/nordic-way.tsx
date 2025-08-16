import Image from "next/image";

const NordicWay = () => {
  return (
    <div className="w-full mt-6">
      <section className="w-full">
        <Image
          src="/images/Prospect_uz4.png"
          alt="Nordic Way Prospect Section 4"
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
        />
      </section>
      <section className="w-full">
        <Image
          src="/images/Prospect_uz3.png"
          alt="Nordic Way Prospect Section 3"
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
        />
      </section>
      <section className="w-full">
        <Image
          src="/images/Prospect_uz2.png"
          alt="Nordic Way Prospect Section 2"
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
        />
      </section>
      {/* Section 1 */}
      <section className="w-full">
        <Image
          src="/images/Prospect_uz.png"
          alt="Nordic Way Prospect Main Section"
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
          priority
        />
      </section>

      {/* Section 2 */}
      <section className="w-full">
        <Image
          src="/images/Prospect_uz1.png"
          alt="Nordic Way Prospect Section 1"
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Section 3 */}

      {/* Section 4 */}

      {/* Section 5 */}
    </div>
  );
};

export default NordicWay;
