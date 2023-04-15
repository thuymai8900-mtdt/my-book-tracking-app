/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import github from "../icons/icons8-github-48.png";
import linkedIn from "../icons/icons8-linkedin-64.png";
import facebook from "../icons/icons8-facebook-64.png";

function Footer() {
  return (
    <div className="footer">
      <a href="https://github.com/thuymai8900-mtdt/my-book-tracking-app">
        <img
          className="github"
          src={github}
          alt="github"
          style={{
            width: 100,
            height: 100,
            padding: 20
          }}
        />
      </a>      
      
      <a href="https://github.com/thuymai8900-mtdt/my-book-tracking-app">
        <img
          className="facebook"
          src={facebook}
          alt="facebook"
          style={{
            width: 100,
            height: 100,
            padding: 20
          }}
        />
      </a>

      <a href="#">
        <img
          className="linkedIn"
          src={linkedIn}
          alt="linkedIn"
          style={{
            width: 100,
            height: 100,
            padding: 20
          }}
        />
      </a>      
      <p>ThuyMTD@fsoft.com.vn</p>
    </div>
  );
}

export default Footer;
