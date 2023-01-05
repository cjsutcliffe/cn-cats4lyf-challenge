import { useState, useEffect } from 'react';
import ShoppingBasket from './components/basket';
import { faker } from '@faker-js/faker';
import styled from "styled-components";
import basketIcon from "./images/basket.png"
import catIcon from "./images/cat.png"
import './App.css';

function App() {
  const [allCats, setAllCats] = useState([]);
  const [showBasket, setShowBasket] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=20");
        if(!response.ok){
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const catData = data.map((cat, index) => {
          return {
            inbasket: false,
            catId: index,
            catImage: cat.url,
            name: faker.name.findName(),
            breed: faker.animal.cat(),
            price: faker.finance.amount(200, 800),
          }
        })
        setAllCats(catData);
      } catch (err){
        setErrorMessage("No cats today...");
        console.log(err.message)
      }
    }
    fetchCatData()
  }, []);

  const handleAddToBasket = (index, catData) => {
    if(!catData.inBasket){
      let updatedCats = [...allCats];
      updatedCats[index].inBasket = true;
      setAllCats(updatedCats);

      let updatedBasket = [...basket];
      updatedBasket.push(catData);
      setBasket(updatedBasket)
    } else {
      for (let i = 0; i < basket.length; i++) {
        if(basket[i].catId === index){
          let removeCatFromBasket = [...basket];
          removeCatFromBasket.splice(i, 1)
          setBasket(removeCatFromBasket)

          let updatedAllCats = [...allCats];
          updatedAllCats[index].inBasket = false;
          setAllCats(updatedAllCats);
        }
      }
    }
  }

  return (
    <Wrapper>
      <NavBar>
        <Header>
          <img src={catIcon} alt="cat" />
          <h1>Cats4Lyf</h1>
        </Header>
        <BasketButton value={basket.length} onClick={() => setShowBasket(!showBasket)}></BasketButton>
      </NavBar>
      <h2>{errorMessage}</h2>
      <AllCats isBasketVisible={showBasket}>
        {allCats.map((cat, index) => {
          return (
            <CatCard key={index} isCatInBasket={cat.inBasket} onClick={()=> handleAddToBasket(index, cat)}>
              {cat.inBasket ? <h3>Remove from basket</h3> : <h3>Add to basket</h3>}
              <img src={cat.catImage} alt={cat.name}/>
              <h4>{cat.name}</h4>
              <p>£{cat.price}</p>
            </CatCard>
          )
        })}
      </AllCats>
      <ShoppingBasket isBasketVisible={showBasket} itemsInBasket={basket} />
      <Footer>
      <a onclick href="https://github.com/cjsutcliffe/cn-cats4lyf-challenge">GitHub</a>
      </Footer>
    </Wrapper>
  );

}


export default App;

const Wrapper = styled.div`
  background-color: rgb(252, 242, 162);
`

const Footer = styled.div`
  background-color: rgb(71, 165, 237);
  height: 50px;
  width: 100%;
  text-align: center;
  padding: 10px;
`

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgb(217, 125, 245);
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: white;
    font-size: 75px;
    margin: 0 10px;
  }
  img {
    margin: 0 0 0 50px;
    height: 40px;
  }
`;

const BasketButton = styled.button`
  height: 40px;
  width: 40px;
  padding: 0;
  margin: 0 50px 0 0;
  cursor: pointer;
  background-image: url(${basketIcon});
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
  filter: invert(100%);
  background-color: rgba(0,0,0,0);

  &:hover {
    transform: scale(1.1);
  }

  &:after{
    content: attr(value);
    font-family: Arial, Helvetica, sans-serif;
    background-color: rgb(0, 255, 255);
    border-radius: 50%;
    position: relative;
    padding: 0px 5px;
    box-sizing: border-box;
    left: 15px;
    top: 13px;
    opacity: 0.9;
}
`;

const AllCats = styled.div`
  margin: ${props => (props.isBasketVisible ? '130px 400px 50px 50px' : '130px 50px 50px 50px')};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: margin 0.2s;
`;

const CatCard = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    background-color: rgb(222, 245, 47);
  }

  h3 {
    position: absolute;
    background-color: orange;
    border-radius: 10px;
    width: 250px;
    height: 50px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.isCatInBasket ? '0.8' : '0'};
  }

  &:hover h3 {
    opacity: 0.9;
  }

  img {
    height: 250px;
    width: 250px;
    border-radius: 10px;
    object-fit: cover;
  }

  h4 {
    margin: 10px 0;;
  }

  p {
    margin: 0;
  }
`;