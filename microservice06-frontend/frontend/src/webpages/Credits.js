import React, { useState, useEffect } from 'react';
import PricingCard from '../components/PricingCard';
import axios from 'axios';

const Credits = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
    };
    const [user, setUser] = useState();
    useEffect(() => {
        const getUser = () => {
            if (user) {
                return; // Skip the fetch if the user is already set or signed out
            }
            console.log("fetch");
            fetch("http://localhost:3000/userinfo", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((resObject) => {
                    console.log(resObject.user);
                    setUser(resObject.user);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
    }, [user]);


    return (
        <div className='layout'>
            {user ? (
                <div><b>You are logged in as </b> {user.name}! <br></br> Select an amount of credits to purchase.
                    <div>
                        <h1>Choose a Subscription Plan</h1>
                        <div className="pricing-cards">
                            <PricingCard
                                title="For"
                                price="4.99"
                                features={['5 credits', 'Simple Chart', 'Bar Plot']}
                                selected={selectedPlan === 'basic'}
                                onSelect={() => handleSelectPlan('basic')}
                            />
                            <PricingCard
                                title="For"
                                price="8.99"
                                features={['10 credits', 'All Charts']}
                                selected={selectedPlan === 'standard'}
                                onSelect={() => handleSelectPlan('standard')}
                            />
                            <PricingCard
                                title="For"
                                price="19.99"
                                features={['20 credits', 'All Charts']}
                                selected={selectedPlan === 'premium'}
                                onSelect={() => handleSelectPlan('premium')}
                            />
                            <PricingCard
                                title="For"
                                price="39.99"
                                features={['50 credits', 'All Chart Types', 'Share between accounts']}
                                selected={selectedPlan === 'xpremium'}
                                onSelect={() => handleSelectPlan('xpremium')}
                            />
                        </div>
                    </div>
                    <div className='center'>
                        <button className='button'>Confirm</button>
                        <button className='button'>Cancel</button>
                    </div>
                </div>


            ) : (
                <div> We apologize... Something went wrong fetching your account information.</div>
            )}
        </div>

    )
}

export default Credits;