import React from 'react';
import './App.css';
import { TiSocialYoutube, TiSocialGithub,TiSocialLinkedin, TiSocialFacebook  } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
function Foot() {
  return (
    <div className="Foot">
<TiSocialYoutube /><TiSocialTwitter /><TiSocialInstagram /><TiSocialFacebook /><TiSocialLinkedin /><TiSocialGithub />
      
    </div>
  );
}

export default Foot;
