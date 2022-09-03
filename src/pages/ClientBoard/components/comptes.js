import React from 'react'
import "../../../static/css/cards.css"


const Comptes = ({data}) => {


  return (
   
        <div className="col-md-6 col-sm-12 mt-1">
            <div class="card-c bg-c-yellow order-card">
                <div class="card-block">
                    <h6 className="m-b-20 text-dark-c">N° : {data.ribCompte}</h6>
                    <h2 className="text-right justify-content-between d-flex mt-1"><img src="https://img.icons8.com/ios/50/FFFFFF/coins.png"/><span className=" text-green">{data.solde} MAD</span></h2>
                    <p className="m-b-0 mt-1 type-text-color">Type <span className="f-right">{data.intituleCompte}</span></p>
                    
                </div>
            </div>
        </div>
	
  )
}

export default Comptes;