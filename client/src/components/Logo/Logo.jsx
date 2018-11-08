import React from 'react';
import MyLogo from "../../assets/img/logo.svg";

const Logo = (props) => {
	const {title, width, height} = props.config;

	return (
		<img alt={title} title={title} width={width || 'auto'} height={height || 'auto'} src={MyLogo}/>
	);
}

export default Logo;
