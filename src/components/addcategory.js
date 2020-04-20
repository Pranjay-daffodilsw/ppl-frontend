import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';
import { toggle_add_category } from '../redux';
import url from '../config/url';

export default (
    (props) => {
        const history = useHistory();
        const [usermessage, setUsermessage] = useState('');
        const toggleAddCategory = useSelector(state => state.toggle.addCategory);
        const dispatch = useDispatch();

        const onSubmitHandler = (e) => {
            e.preventDefault();
            let formData = new FormData(document.getElementById('myform'));
            let cat = formData.get('newcategory');
            let add_flag = true;
            props.categoryList.forEach(element => {
                if (element.categoryname.toLowerCase() === cat.toLowerCase()) {
                    add_flag = false;
                }
            });
            if (add_flag) {
                axios.post(url.backendURL + url.paths.addCategory, formData)
                    .then((res) => {
                        console.log('axios result (in add category) - ', res)
                        // history.push('/postupload');
                    })
                    .catch((err) => {
                        console.error('axios error (in add category) - ', err)
                    })
            }
            else {
                setUsermessage('Entered category already exists');
            }
        }

        return (
            <div>
                <div className="rght_btn" onClick={() => dispatch(toggle_add_category(toggleAddCategory.show))} style={{ cursor: 'pointer' }}>
                    <span className="rght_btn_icon">
                        <img src="images/btn_icona.png" alt="up" /></span>
                    <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span>
                    <Link alts="add category button" >Add Category</Link>

                </div>

                <div className='list_item' style={{ display: toggleAddCategory.show ? 'inline-block' : 'none', backgroundColor: 'white', width: '100%' }}>
                    <div className="popup_sec" id="pop_forgt">
                        <div className="contnt_1">
                            <div className="timeline_div1">
                                <div className="upload_post_box">
                                    <div className="profile_form">
                                        <form onSubmit={onSubmitHandler} method='post' id='myform'>
                                            <ul>
                                                <li key={"addcategory1"}>
                                                    <div className="clos_btn" onClick={() => dispatch(toggle_add_category(true))} ><img src="images/clos.png" alt="" id="clos_pop" /></div>
                                                    <div className="pop_hdr">You can add a new category here</div>
                                                </li>
                                                <li key={"addcategory2"}>
                                                    <div className="man_contnt">
                                                        <span>Add Category</span>
                                                    </div>
                                                </li>
                                                <li key={"addcategory3"}>
                                                    <div className='div_name1'><label htmlFor='newcategory'>Type new category name below -</label></div>
                                                    <input type='text' id='newcategory' name='newcategory' required />
                                                    <div style={{ color: 'tomato' }}><h4>{usermessage}</h4></div>
                                                </li>
                                                <li key={"addcategory4"}>
                                                    <div className='div_name1'><label htmlFor='thumbnail'>Choose an image file to uplaod - </label></div>
                                                    <input type='file' name='thumbnail' required />
                                                </li>
                                                <li key={"addcategory6"}>
                                                    <div className="div_name2 man_contnt">
                                                        <input type='submit' value='Click to add' style={{ backgroundColor: 'orange', padding: '3px' }} />
                                                    </div>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

)