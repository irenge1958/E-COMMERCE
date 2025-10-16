import {

  Instagram,
  MailOutline,
  Phone,

  Room,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";
import { useNavigate,Link } from 'react-router-dom';
import styled from "styled-components";
import { mobile } from "./responsive";
import EnquiryForm from "./EnquiryForm";
const Container = styled.div`
  display: flex;
  @media only screen and (max-width: 700px) {
    flex-direction:column
  }

`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  
  return (
    <Container style={{backgroundColor:'White',color:'black'}}>
      <Left>
        <Logo>At Zhejiang Endiang Import & Export Co.</Logo>
        <Desc>
        We specialize in providing reliable import and export services, ensuring high-quality products reach global markets with trust and efficiency. Beyond trade, we empower individuals and organizations through academic research guidance, including thesis writing and scientific publications. We also assist international students in applying for higher education in China, offering step-by-step support for admissions and visas. Additionally, our team delivers advanced web and software development solutions using modern technologies like MERN and Firebase, ensuring secure and scalable digital platforms. By combining trade, technology, and education, we create opportunities that foster global collaboration and sustainable growth.
        </Desc>
        <Logo>Terms && conditions</Logo>
        By using the services of Zhejiang Endiang Import & Export Co., you agree to adhere to all applicable terms and policies set forth by the company. We reserve the right to refuse service to any individual or entity at any time and for any reason.

Any content you provide (excluding payment information) may be transmitted over various networks and adapted as necessary to meet technical requirements. Payment information is always encrypted and handled securely.

You are not permitted to reproduce, duplicate, copy, sell, resell, or exploit any portion of our services, products, or website content without prior written consent from Zhejiang Endiang Import & Export Co.

All headings in this policy are for convenience only and do not limit or affect the interpretation of its terms.


        <Desc>
        </Desc>
       
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
         <ListItem><Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{textDecoration:'none',color:'black'}}>Home</Link></ListItem>
          <ListItem><Link to='/basket' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{textDecoration:'none',color:'black'}}>Cart</Link></ListItem>
          <ListItem><Link to='/productuserList/all'  style={{textDecoration:'none',color:'black'}}>Order Tracking</Link></ListItem>
        </List>
        <EnquiryForm />
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> CHINA,ZHENJIANG
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/>  +8618651923823
        </ContactItem>
        <ContactItem>
  <a 
    href="mailto:gracemuli@outlook.com" 
    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
  >
    <MailOutline style={{ marginRight: "10px" }} />
    gracemuli@outlook.com
  </a>
</ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        <br></br><br></br>
        <SocialContainer>
   <a href="https://www.instagram.com/fionke_global/profilecard/?igsh=Z2NrN2h3ZTVneGh5" target='blank'>
          <SocialIcon style={{cursor:'pointer'}} color="E4405F">
            
            <Instagram />
          </SocialIcon></a>
          <a href="https://www.linkedin.com/in/grace-mulindwa-bahizire-848ba0b9/?originalSubdomain=cn" target='blank'>
          <SocialIcon style={{cursor:'pointer'}} color="0A66C2">
          
            <LinkedIn />
            
          </SocialIcon></a>
        </SocialContainer>
      </Right>
    </Container>
  );
};

export default Footer;
