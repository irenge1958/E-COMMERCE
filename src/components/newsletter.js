import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "./responsive";
import { useMediaQuery } from 'react-responsive';
const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  margin-top:20px;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}

`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  const isMobilex = useMediaQuery({ maxWidth: 700 });
  return (
    <Container>
      <Title>Newsletter</Title>
      <div style={isMobilex?{display:'block',paddingtop:'10px'}:{display:'flex',gap:'150px'}}>
        <div>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
      </div><br/>
      <div>
      <Desc>Use your receipt id to track your product.</Desc>
      <InputContainer>
        <Input placeholder="Input your reciept Id" />
        <Button>
          <Send />
        </Button>
      </InputContainer></div>
      </div>
    </Container>
  );
};

export default Newsletter;
