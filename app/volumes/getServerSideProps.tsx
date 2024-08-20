import React from 'react';

const GetServerSideProps = async () => {
    const res = await fetch('https://journal2.nordicun.uz');
    const data = await res.json();

    return {
        props: {data: data.message}, // Bu props komponentga uzatiladi
    };
};

export default GetServerSideProps; 