import React from 'react';
import CsvToJsonConverter from '~/components/ProductImport/productimport';
//import Papa from 'papaparse';
const CsvToJsonPage = () => {
  return (
    <div>
      <h2 className='my-3'>Select A Excel File</h2>
      <CsvToJsonConverter />
    </div>
  );
};


CsvToJsonPage.requireAuthAdmin = true;
CsvToJsonPage.dashboard = true;
export default CsvToJsonPage;
