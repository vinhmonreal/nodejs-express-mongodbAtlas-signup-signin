

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import NavBar from './NavBar';

interface BodyProps {
  navbar: boolean;  
  children: JSX.Element | JSX.Element[];
}

export default function Body({ navbar,children }: BodyProps) {
  return (
    <Container>
        <Stack direction="horizontal">
            {navbar && <NavBar />}
        </Stack>
        <Stack direction="vertical">
            {children}
        </Stack>
 
    </Container>
  );
}

