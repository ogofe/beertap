// PDFDocument.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PDFDocument = ({ orderedItems }) => (
  <PDFViewer width="1000" height="600">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Ordered Items</Text>
          <table>
            <thead>
              <tr>
                <th>Beer Name</th>
                <th>Beer Type</th>
                <th>Brewery</th>
                <th>Supplier</th>
                <th>Description</th>
                <th>Flavor</th>
                <th>Price Per Keg $</th>
                <th>Arrival Date</th>
                <th>Keg Size</th>
                <th>Serving Size</th>
                <th>Price Per Serving $</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.breweryName}</td>
                  <td>{item.supplierName}</td>
                  <td>{item.description}</td>
                  <td>{item.flavor_details}</td>
                  <td>{item.price_per_keg}</td>
                  <td>{item.arrival_date}</td>
                  <td>{item.keg_size}</td>
                  <td>{item.serving_sizes}</td>
                  <td>{item.price_per_serving_size}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default PDFDocument;
