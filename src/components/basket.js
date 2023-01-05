import { useState, useEffect } from 'react';
import styled from "styled-components";

const ShoppingBasket = (props) => {
    const [basketTotal, setBasketTotal] = useState(0);

    useEffect(() => {
        let totalCost = 0
        for (let i = 0; i < props.itemsInBasket.length; i++) {
            totalCost += Number(props.itemsInBasket[i].price)
        }
        setBasketTotal(totalCost)
    }, [props.itemsInBasket])

    return (
        <BasketWrapper isBasketVisible={props.isBasketVisible}>
            <h1>Your Shopping Basket:</h1>
            {props.itemsInBasket.map((cat, index) => {
                return (
                    <BasketItem key={index}>
                        <img src={cat.catImage} alt={cat.name} />
                        <BasketItemText>
                            <h4>{cat.name}</h4>
                            <p>£{cat.price}</p>
                        </BasketItemText>
                    </BasketItem>
                )
            })}
            <TotalWrap isBasketVisible={props.isBasketVisible}>
                <p>Total:</p>
                <h4>£{basketTotal.toFixed(2)}</h4>
            </TotalWrap>
        </BasketWrapper>
    )
}

export default ShoppingBasket;

const BasketWrapper = styled.div`
    position: fixed;
    overflow: scroll;
    top: 130px;
    right: ${props => (props.isBasketVisible ? '0px' : '-350px')};
    width: 350px;
    height: calc(100vh - 127px);
    background-color: rgb(175, 255, 200);
    transition: right 0.2s;

    h1 {
        font-size: 18px;
        margin: 10px;
    }
`;

const BasketItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0 20px 0;
    margin: 10px;
    border-bottom: 1px solid black;

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
`;

const BasketItemText = styled.div`
    margin: 0 0 0 15px;

    h4 {
        letter-spacing: 2px;
        margin: 5px;
    }
    
    p {
        margin: 5px;
        letter-spacing: 4px;
        font-size: 12px;
    }
`;

const TotalWrap = styled.div`
    background-color: rgb(235, 99, 105);
    position: fixed;
    width: 350px;
    height: 65px;
    bottom: 0; 
    right: ${props => (props.isBasketVisible ? '0px' : '-350px')};
    transition: right 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
    box-sizing: border-box;

    h4 {
        font-size: 18px;
        margin: 5px;
    }
    
    p {
        margin: 5px;
        font-size: 18px;
    }`