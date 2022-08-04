import { AutoComplete } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import "./SearchBar.css";
const SearchBar = () => {
  const [inputVal, setInputVal] = useState("");
  const [options, setOptions] = useState([]);
  const [debouncedVal] = useDebounce(inputVal, 500);

  const getApiData = async () => {
    const { data } = await axios.get(
      `https://api.locationiq.com/v1/autocomplete?key=pk.b0b41f45741bd21f131ed3a32e297180&q=${debouncedVal}`
    );
    console.log(data);
    const newOptions = data.map((currItem) => {
      return { value: currItem.display_name, key: currItem.place_id };
    });
    setOptions(newOptions);
  };
  const handleChange = (value) => {
    setInputVal(value);
  };

  useEffect(() => {
    if (debouncedVal === "") {
      return;
    }
    getApiData();
  }, [debouncedVal]);

  return (
    <div className="search-bar">
      <h1>Travel Advisor</h1>
      <div>
        <span>Explore New Places</span>
        <AutoComplete
          placeholder="Search"
          value={inputVal}
          options={options}
          onChange={handleChange}
          style={{
            width: 200,
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
