// @ts-check

const customIdNew = require("custom-id-new");

const processCheckOutPayment = async (method, data) => {
  try {
  } catch (error) {
    throw error;
  }
};

const payYouMoney = async (data) => {
  try {
    const responseUrl = `${process.env.NEXT_PUBLIC_URL}/api/checkout/payuresponse`;
    const trnId = "T" + customIdNew({ randomLength: 4, upperCase: true });

    var formData = new FormData();

    const data = {
      key: "WPBubxd5",
      txnid: "",
      productinfo: "productinfo",
      amount: 1,
      email: "email",
      firstname: "",
      lastname: "",
      surl: "",
      furl: "",
      phone: "",
      hash: "",
    };

    formData.append("key", "WPBubxd5");
    for (var key in data) {
        formData.append(key, data[key]);
      }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "{{ route('quotation.details') }}", true);

    xhr.onload = function () {
      // Handle the response here if needed
      console.log(xhr.responseText);
    };

    // Send the FormData with the XMLHttpRequest
    xhr.send(formData);
  } catch (error) {
    throw error;
  }
};
