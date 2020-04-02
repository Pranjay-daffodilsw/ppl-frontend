import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <div className="clear" />
            <div className="footr">
                <div className="footr_lft">
                    <div className="footer_div1">Copyright © Pet-Socail 2014 All Rights Reserved</div>
                    <div className="footer_div2"><Link>Privacy Policy </Link>| <Link> Terms &amp; Conditions</Link></div>
                </div>
                <div className="footr_rgt">
                    <ul>
                        <li key='social_1'><Link><img src="images/social_1.png" alt='' /></Link></li>
                        <li key='social_2'><Link><img src="images/social_2.png" alt='' /></Link></li>
                        <li key='social_3'><Link><img src="images/social_3.png" alt='' /></Link></li>
                        <li key='social_4'><Link><img src="images/social_4.png" alt='' /></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}