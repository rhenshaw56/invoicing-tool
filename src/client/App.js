import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Dashboard from './components/Dashboard';

// import Loadable from 'react-loadable';

// const AsyncDashboard = Loadable({
//   loader: () => import("./components/Dashboard"),
//   loading: () => <div>loading...</div>,
// });

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 40px;
`;

const Nav = styled(AppBar)`
  height: 80px;
  background-color: #336399;
`;

const NavTitle = styled.span`
  font-size: 25px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  position: relative;
  left: 30px;
  top: 25px;
  letter-spacing: 0.5px;

`;

function App() {
  return (
    <Container>
      <Nav><NavTitle>Dashboard</NavTitle></Nav>
      <Dashboard />
    </Container>
  );
}

export default App;
