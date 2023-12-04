
import React from 'react'
import Nav from "../../components/NavBar/Nav";
import './Store.css'


const Store = () => {
  return (
    <>
      <Nav />

      <div className="row d-flex flex-row justify-content-center pt-5 mt-5">
        <div className="card col mx-4"> Grocery</div>
        <div className="card col mx-4"> Stationary</div>
        <div className="">
        </div>
      </div>
      <div>
        <div className="card" style={{width: "14rem"}}>
          <img src="https://picsum.photos/200" className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      </div>


    </>

  )
}

export default Store