import {useEffect,useState} from 'react'
import './listItems.css'
import axios from 'axios'
import {toast} from 'react-toastify'

function listItems({url}) {
  const[listItems, setListItems] = useState([]);

  const fetchListItems = async () => {
    const response = await axios.get(`${url}/api/drinks/1`);
    if(response.data.success) {
      setListItems(response.data.data);
    }
    else {
      toast.error(response.data.message);
    }
  }

  const removeDrinks = async (drinksId)=>{
    const response = await axios.post(`${url}/api/drinks/remove`,{id:drinksId});
    await fetchListItems();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error("Error deleting drinks");
    }
  }

  useEffect(()=>{
    fetchListItems();
  },[])


  return (
    <div className="listItems add flex-col">
      <p>All drinks List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {listItems.map((item,index) => {
          return(
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/`+item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <button onClick={()=> removeDrinks(item._id)} className="delete-btn" type='button'>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default listItems