import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';
import url from '../config/url';

export default (
    (props) => {
        const history = useHistory();
        const [showaddfield, setShowaddfield] = useState(false);
        // const [newcategory, setNewcategory] = useState('');
        const [usermessage, setUsermessage] = useState('');

        const onClickHandler = (e) => {
            setShowaddfield(!showaddfield);
        }
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
                        history.push('/postupload');
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
                    <div className="rght_btn" onClick={onClickHandler} style={{ cursor: 'pointer' }}>
                        <span className="rght_btn_icon">
                            <img src="images/btn_icona.png" alt="up" /></span>
                        <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span>
                        <Link alts="add category button" >Add Category</Link>

                    </div>
                    <div className='list_item' style={{ display: showaddfield ? 'inline-block' : 'none', backgroundColor: 'white', width: '100%' }}>
                        <form onSubmit={onSubmitHandler} method='post' id='myform'>
                            <label htmlFor='newcategory'>Type new category name below</label>
                        &nbsp;<input type='text' id='newcategory' name='newcategory' required />
                            <div style={{ color: 'tomato' }}><h4>{usermessage}</h4></div>
                        &nbsp;
                            <label htmlFor='newcategory'>Choose a file to uplaod - </label>
                            <input type='file' name='thumbnail' required />
                            <br /><br />
                            <input type='submit' value='Click to add' style={{ backgroundColor: 'orange', padding: '3px' }} />
                        </form>
                    </div>
                </div>
            );
        }

)