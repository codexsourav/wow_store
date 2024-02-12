import axios from 'axios'

const createNewCourierToken = async () => {

    // This Function Create New ShipRocket Api Token ONLY
    // in .env file Add SHIPROCKETEMAIL  || SHIPROCKETPASSWORD

    var data = JSON.stringify({
        "email": process.env.SHIPROCKETEMAIL,
        "password": process.env.SHIPROCKETPASSWORD,
    });

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const requestToken = await axios(config);
        return requestToken.data.token;
    } catch (error) {
        throw error;
    }
}

export default createNewCourierToken;