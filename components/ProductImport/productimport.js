import React, { useState } from 'react';
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
const CSVToJsonConverter = () => {

  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedFileTypes = ['xlsx', 'XLSX', 'xls', "XLS"];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      toast.error("Select A Valid Excel File!", toastConfig);
    } else {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {

    if (!file) {
      toast.error("Select A Valid Excel File!", toastConfig);
      return false;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      // Assuming the first sheet is the one you want to convert
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      // console.log(sheetData);
      // setJsonData(sheetData);
      sendData(sheetData);
    };

    reader.readAsBinaryString(file);
  };


  const sendData = async (data) => {
    var axios = require("axios").default;

    var options = {
      method: 'POST',
      url: process.env.NEXT_PUBLIC_URL + '/api/product/bulkupload',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      data: data,
    };
    const id = toast.loading("Please wait...")
    try {
      setLoading(true);
      const response = await axios.request(options);
      toast.update(id, { render: response.data.message, type: "success", isLoading: false, ...toastConfig });
      setLoading(false);
    } catch (error) {
      console.log("Import Error ====> ", error.response);
      toast.update(id, { render: error.response?.data.message || "Something went wrong", type: "error", isLoading: false, closeOnClick: true, });
      setLoading(false);
    }
  }



  return (
    <>
      <div style={{ maxWidth: 400 }} className='mt-3 mb-5' >
        <input type="file" className='form-control' onChange={handleFileChange} />
        <br />
        <button class="btn btn-primary" type="submit" onClick={handleUpload} disabled={loading} >Upload Products</button>
      </div>
    </>
  );
};

export default CSVToJsonConverter;
