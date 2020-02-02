import React from "react";

const Footer = props => {
  return (
    <div className={`ui secondary pointing menu ${props.className}`}>
      <a href="http://marvel.com">Data provided by Marvel. © 2020 MARVEL</a>
    </div>
  );
};

export default Footer;
