import React from 'react';
import { Link } from 'react-router-dom';

function HeaderComponent(props) {
    const {
        username,
        navigationLinks
    } = props;

    return (
        <div>
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-inner">
                    <div className="container">
                        <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                        <Link className="brand"
                            to={{ pathname: '/timeline' }}
                        >PPL</Link>
                        <div className="pro_info pull-right">
                            <div className="pro_icn"><img src="images/pic_small.png" alt='' /></div>
                            <div className="pro_txt">{username}<b className="caret" /></div>
                            <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                <li key='profile' ><Link tabIndex={-1} >My Profile</Link></li>
                                <li key='messagebox'><Link tabIndex={-1} >Message Box</Link></li>
                                <li key='language'><Link tabIndex={-1} >Change Language</Link></li>
                                <li key='divider' className="divider" />
                                <li key='search' ><Link tabIndex={-1} >
                                    <input type="text" placeholder="search" />
                                </Link></li>
                            </ul>
                        </div>
                        <div className="nav-collapse collapse">
                            <ul className="nav">
                                <li key='home' className="active"> <Link>Home</Link> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header">
                <div className="header_lft">
                    <div className="logo"><Link to="/"><img src="images/logo.png" alt='' /></Link></div>
                    <div className="navigatn">
                        <ul>
                            <li key='home'><Link to={{ pathname: '/timeline' }} className='active' style={{ marginLeft: 13 }}>Home</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="header_rgt">
                    <div className="flag_div"><img src="images/flag.png" alt='' /></div>
                    <input type="text" placeholder="Search" className="txt_box" />
                    <div className="msg_box"><Link><span className="msg_count">100</span></Link></div>
                    <div className="info_div">
                        <div className="image_div"> <img src="images/pic.png" alt='' /> </div>
                        <div style={{ color: "white", marginTop: 12, marginLeft: "56%" }}>
                            {username}
                        </div>
                        <div style={{ color: "white", marginLeft: "50%" }}>
                            {navigationLinks}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;