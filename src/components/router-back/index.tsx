import React from "react";
import { NavLink } from 'react-router-dom'

interface IProps {
    url?: string;
    name?: string;
    className?: string;
}

export const RouterBack: React.FC<IProps> = ({
    url = '/',
    name = '返回首页',
    className = "fixed bottom-0 right-20 bg-red-600 h-20"
}) => {

    return <div className={className}>
        <NavLink
            to={url}
            className="text-light-50"
        >
            {name}
        </NavLink>
    </div>
}