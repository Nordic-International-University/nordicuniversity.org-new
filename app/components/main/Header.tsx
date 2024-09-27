import React, {ReactNode} from "react";
import {Breadcrumb} from "antd";
import {useRouter} from "next/navigation";

interface HeaderProps {
    item: Array<{
        href: string;
        title: string | ReactNode;
    }>;
}

const Header = ({item}: HeaderProps) => {
    const router = useRouter();

    const handleNavigate = (href: string) => {
        router?.push(href);
    };

    return (
        <header className="w-full flex flex-col justify-center h-24 bg-emerald-50">
            <div className="container">
                <Breadcrumb
                    className="text-lg text-black"
                    items={item?.map(({href, title}) => ({
                        title: (
                            <span
                                onClick={() => handleNavigate(href)}
                                className="cursor-pointer"
                            >
                {title}
              </span>
                        ),
                    }))}
                />
            </div>
        </header>
    );
};

export default Header;
