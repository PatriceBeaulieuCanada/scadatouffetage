import axios, { AxiosResponse } from 'axios';
const querystring = require('querystring');

const url = 'https://localhost:7091'
//const url = 'http://129.11.186.20:5005'


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

	if(param.action=='GetInfoTuffting') {

        try {
			const listInfoTufter = await axios.get(url+'/api/TufftingStandard/GetInfoTuffting');		
			return listInfoTufter.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

	if(param.action=='GetTufterCheckList1') {

		const params = {
			idStart:1,
			idStop:12
		}

        try {
			const listTufterCheckList1 = await axios.get(url+'/api/TufftingStandard/GetCheckTuffting?'+querystring.stringify(params));		
			return listTufterCheckList1.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

	if(param.action=='GetTufterCheckList2') {

		const params = {
			idStart:13,
			idStop:20
		}

        try {
			const listTufterCheckList2 = await axios.get(url+'/api/TufftingStandard/GetCheckTuffting?'+querystring.stringify(params));		
			return listTufterCheckList2.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

}

export default UseCallApi;