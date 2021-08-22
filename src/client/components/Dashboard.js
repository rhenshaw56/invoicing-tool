import React, { useEffect, useRef }  from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import client from '../utils/client';
import InvoiceList from './InvoiceList';

const Container = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 40% auto;
  @media only screen and (min-width: 768px) {
    grid-template-columns: 25% auto;
  }
`;

const ListContainer = styled.div`
  background-color: #2f3740;
  color: #ffffff;
`;

const ActiveItemContainer = styled.div`
  background-color: #f2f3f5;
`;

const GET_INVOICE_LIST = gql`
query getInvoiceList {
  invoices {
    customer {
      email
    }
    products {
      name
      price
    }
  }
}
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_INVOICE_LIST);

  const hasMounted = useRef(false);


  console.log('data', data);
  const getData = async () => {
    // const data = await client.query(GET_INVOICE_LIST);
    console.log('YOOY');
    // console.log('data', data);
  }
  useEffect(() => {
    console.log('RRR');

    getData();
    // const res =
    // console.log('data', data);
  }, [])


  return (
    <Container>
      <ListContainer>
        <InvoiceList />
      </ListContainer>
      <ActiveItemContainer><p>Hello</p></ActiveItemContainer>
    </Container>
  )
};

// class Dashboard extends React.Component {
//   constructor() {
//     super();
//     if (typeof window !== 'undefined') { this.fetchData() }
//   }

//   fetchData() {
//     console.log('YOYO');
//   }

//   render() {
//     console.log('THISS', this);
//      return (
//       <Container>
//         <ListContainer>
//           <InvoiceList />
//         </ListContainer>
//         <ActiveItemContainer><p>Hello</p></ActiveItemContainer>
//       </Container>
//      )
//   }
// }


export default Dashboard;
