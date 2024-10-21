import { useState } from 'react';
import './addItems.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import {toast} from 'react-toastify';

function AddItems({url}) {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Beer',
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('image', image);

        try {
            const response = await axios.post(`${url}/api/drinks/add`, formData);
            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Beer',
                });
                setImage(false);
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="additems">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className="image-upload-area" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write description here" required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" >
                            <option value="Beer">Beer</option>
                            <option value="Wine">Wine</option>
                            <option value="Whisky">Whisky</option>
                            <option value="Ciders">Ciders</option>
                            <option value="Brandy">Brandy</option>
                            <option value="Spirits">Spirits</option>
                            <option value="Mixers">Mixers</option>
                            <option value="Juice">Juice</option>
                            <option value="Drinks">Drinks</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" />
                    </div>
                </div>
                <button className="add-btn" type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddItems;
