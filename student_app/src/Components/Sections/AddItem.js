import { useState } from "react";

const AddItem = () => {


  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const submitItem = () => {
    console.log(inputValue);

    setIsEditing(false);
    setInputValue('');
  }


  return (
    <div className="">


      {isEditing ? (
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            autoFocus
            className="border border-gray-300 p-2"
          />
          <button className=" bg-sky-300 p-2 rounded-md m-2 " onClick={submitItem} >ADD</button>
        </div>
      ) : (
        <button onClick={handleButtonClick} className=" rounded-md p-2 bg-sky-300 w-44 m-4 ">
          ADD Items
        </button>
      )
      }
    </div >
  )
}

export default AddItem;
