import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 100px;
  font-size: 20px;
`;

const Title = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  padding-right: 32px;
  padding-left: 32px;
  color: #7d8793;
`;

const ItemDesc = styled.span`
  margin-top: 20px;
`;

const ItemCount = styled.span`
`;

const CustomerName = styled.span`
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 18px;
  color: #5886c4;

`;

const ListItem = styled.div`
  display: grid;
  padding-right: 32px;
  padding-left: 32px;
  border-top: 1px solid #404b57;
  border-bottom: 1px solid #404b57;
`;


const InvoiceList = () => {
  return (
    <Container>
      <Title>INVOICES - 54</Title>
      <ListItem>
        <ItemDesc>Football</ItemDesc>
        <ItemDesc>Items - 03</ItemDesc>
        <CustomerName>Rowland Henshaw</CustomerName>
      </ListItem>
    </Container>
  )
};

export default InvoiceList;
