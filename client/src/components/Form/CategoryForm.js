import React from 'react'

const CategoryForm = (props) => {
  return (
    <>
    <form onSubmit={props.handleSubmit}>
        <div className="form-group mt-2">
            <input type="text" className="form-control" value={props.value} onChange={(e)=> props.setValue(e.target.value)} placeholder="Enter new category" />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Submit</button>
    </form>

    </>
  )
}

export default CategoryForm