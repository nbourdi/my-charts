import React, { useState, useContext } from 'react';
import PricingCard from '../components/PricingCard';
import UserContext from '../UserContext';
import axios from 'axios';

const Credits = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { user } = useContext(UserContext);
    const [bought, setBought] = React.useState(false);

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const confirm = () => {
        if(selectedPlan) {
            fetch(`http://localhost:3000/purchase/${selectedPlan}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })

            const feedback = new Text("You just successfully bought " + selectedPlan + " credits.");
            const container = document.getElementById("feedback-container");
            container.innerHTML = ""; // Clear existing content

            container.appendChild(feedback);
            setBought(true);
            }    
        else {

        }
        
    }

    const cancel = () => {
        window.location.href = "http://localhost:3030/";
    }

    return (
        <div className='layout'>
            {user ? (
                <div><b>You are logged in as </b> {user.googleaccount.displayName}! <br></br> Select an amount of credits to purchase.
                    <div>
                        <h1>Choose a Subscription Plan</h1>
                        <div className="pricing-cards">
                            <PricingCard
                                title="For"
                                price="4.99"
                                features={['5 credits', 'Simple Chart', 'Bar Plot']}
                                selected={selectedPlan === 5}
                                onSelect={() => handleSelectPlan(5)}
                            />
                            <PricingCard
                                title="For"
                                price="8.99"
                                features={['10 credits', 'All Charts']}
                                selected={selectedPlan === 10}
                                onSelect={() => handleSelectPlan(10)}
                            />
                            <PricingCard
                                title="For"
                                price="19.99"
                                features={['20 credits', 'All Charts']}
                                selected={selectedPlan === 20}
                                onSelect={() => handleSelectPlan(20)}
                            />
                            <PricingCard
                                title="For"
                                price="39.99"
                                features={['50 credits', 'All Chart Types', 'Share between accounts']}
                                selected={selectedPlan === 50}
                                onSelect={() => handleSelectPlan(50)}
                            />
                        </div>
                    </div>
                    <div className='center'>
                        <button className='button' onClick={confirm}>Confirm</button>
                        <button className='button' onClick={cancel}>Cancel</button>
                        
                    </div>
                    <div id='feedback-container' className='center'></div>
                </div>


            ) : (
                <div> We apologize... Something went wrong fetching your account information.</div>
            )}
        </div>

    )
}

export default Credits;