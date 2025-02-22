import React from "react";

const SearchBar =({
    value,
    isLoading,
    handleSubmit,
    onChange
})=>{
    return(
  <form   onSubmit={handleSubmit}>
   <input
       value={value}
       onChange={onChange}
       disabled={isLoading}
       placeholder="Search Recipes"
       className="form-control"   
   />
   
   <input 

 disabled={ isLoading ||  !value}
 type="submit"
 className="btn"
 value="search"


/>
  </form>
    )
};
export default SearchBar;