import axios, { AxiosResponse } from 'axios';
const querystring = require('querystring');

//const url = 'https://localhost:7091'
const url = 'http://129.11.186.20:5005'


const UseCallApi=async(param:any) =>{


    if(param.action=='GetHumainStopReason') {

        const params ={
			stopAction : param.stopAction
		}

        try {
			const listHumainStopReason = await axios.get(url+'/api/StopReason/Action?'+querystring.stringify(params));		
			return listHumainStopReason.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

	if(param.action=='GetAllMachine') {

        const params ={
			stopAction : param.stopAction
		}

        try {
			const listMachines = await axios.get(url+'/api/Machine/GetAllMachine');		
			return listMachines.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

}

export default UseCallApi;