import React from 'react';
import { Link } from 'react-router-dom';
import AddCategory from './addcategory';
import Axios from 'axios';

export default class contentright extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:3005/post/get_category')
            .then(
                (res) => {
                    this.setState({
                        categoryList: res.data
                    })
                    // console.log(res.data);
                }
            )
            .catch(
                (err) => {
                    console.log('content right axios error - ', err);
                }
            )
    }
    render() {
        return (
            <div className="content_rgt">
                <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <Link to='/postupload'>Upload Post</Link> </div>
                <AddCategory categoryList={this.state.categoryList} />
                <div className="rght_cate">
                    <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                    <div className="rght_list">
                        <ul>
                            {
                                this.state.categoryList.map(
                                    (value, index) => {
                                        //console.log(value);
                                        return (
                                            <li key={value._id}>
                                                <Link onClick={this.props.Updater} to={{
                                                    pathname: '/timeline',
                                                    hash: value.categoryname,
                                                    state: {
                                                        filter: true,
                                                        filterByCategory: true
                                                    }
                                                }} >
                                                    <span className="list_icon" >
                                                        <img style={{ maxWidth: '39px', maxHeight: '39px' }} src={"images/category/" + value.thumbnail} alt="up" />
                                                    </span> {value.categoryname}
                                                </Link>
                                            </li>
                                        )
                                    }
                                )
                            }
                            <li>
                                <Link onClick={this.props.Updater} to={{
                                    pathname: '/timeline',
                                    hash: 'others',
                                    state: {
                                        filter: true,
                                        filterByCategory: true
                                    }
                                }}>
                                    <span className="list_icon" >
                                        <img src="images/icon_05.png" alt="up" />
                                    </span> Others
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="rght_cate">
                    <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                    <div className="sub_dwn">
                        <div className="feat_sec">
                            <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                            <div className="feat_txt">Lorem Ipusum Text</div>
                        </div>
                        <div className="feat_sec">
                            <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                            <div className="feat_txt">Lorem Ipusum Text</div>
                            <div className="btm_rgt">
                                <div className="btm_arc">Dogs</div>
                            </div>
                        </div>
                        <div className="feat_sec">
                            <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                            <div className="feat_txt">Lorem Ipusum Text</div>
                            <div className="btm_rgt">
                                <div className="btm_arc">Rabbits</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}