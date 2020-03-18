import React from 'react';
import axios from 'axios';


export default class Addcategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showaddfield: false,
            newcategory: '',
            usermessage: ''
        };
    }
    onClickHandler = (e) => {
        this.setState({
            showaddfield: !this.state.showaddfield
        });
    }
    // onChangeHandler = (e) => {
    //     e.preventDefault();
    //     if (e.target.name !== 'thumbnail') {
    //         this.setState({
    //             [e.target.name]: e.target.value
    //         });
    //     }
    //     else {
    //         this.setState({
    //             [e.target.name]: e.target.files[0]
    //         })
    //     }
    // }
    onSubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(document.getElementById('myform'));
        // formData.append('newcategory', this.state.newcategory);
        // formData.append('thumbnail', this.state.thumbnail);
        // let form_config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        let cat = formData.get('newcategory');
        let add_flag = true;
        
        this.props.categoryList.forEach(element => {
            if (element.categoryname === cat) {
                add_flag = false;
            }
        });
        if (add_flag) {
            axios.post('http://localhost:3005/post/post_category', formData)
                .then((res) => {
                    console.log('axios result (in add category) - ', res)

                })
                .catch((err) => {
                    console.log('axios error (in add category) - ', err)
                })
        }
        else{
            this.setState({
                usermessage: 'Entered category already exists'
            })
            // console.error('category already exists ++++++++++++');
        }

    }

    render() {
        return (
            <div>
                <div className="rght_btn" onClick={this.onClickHandler} style={{ cursor: 'pointer' }}>
                    <span className="rght_btn_icon">
                        <img src="images/btn_icona.png" alt="up" /></span>
                    <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span>
                    <a alts="add category button" >Add Category</a>

                </div>
                <div className='list_item' style={{ display: this.state.showaddfield ? 'inline-block' : 'none', backgroundColor: 'white', width: '100%' }}>
                    <form onSubmit={this.onSubmitHandler} method='post' id='myform'>
                        <label htmlFor='newcategory'>Type new category name below</label>
                        &nbsp;<input type='text' id='newcategory' name='newcategory' required />
                        <div style={{color:'tomato'}}><h4>{this.state.usermessage}</h4></div>
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
}