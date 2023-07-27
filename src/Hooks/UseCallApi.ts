import axios, { AxiosResponse } from 'axios';
const querystring = require('querystring');

const UseCallApi=async(param:any) =>{


    if(param.action=='GetHumainStopReason') {

        const params ={
			stopAction : param.stopAction
		}

        try {
			const listHumainStopReason = await axios.get('https://localhost:7091/api/StopReason/Action?'+querystring.stringify(params));		
			return listHumainStopReason.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

}

export default UseCallApi;