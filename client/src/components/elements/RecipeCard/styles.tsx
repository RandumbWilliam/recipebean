import styled from "styled-components";

export const Card = styled.div`
  width: 278px;
  height: 198px;
  border-radius: 20px;
  background-color: #eab676;
  cursor: pointer;
  padding: 15px;
  margin-bottom: 10px;
`;

export const RecipeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FavouriteButton = styled.button`
  width: 47px;
  height: 47px;
  border-radius: 17px;
  background-color: #292929;

  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TimeBanner = styled.div`
  background-color: #292929;
  border-radius: 50vh;
  height: 30px;
  padding: 12px;
  display: flex;
  align-items: center;
`;

export const TimeText = styled.span`
  font-size: 12px;
  color: #fff;
  margin-left: 10px;
`;

export const RecipeName = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
`;
