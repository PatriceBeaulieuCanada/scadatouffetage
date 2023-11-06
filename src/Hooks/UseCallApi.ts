import axios from 'axios';
const querystring = require('querystring');

//const url = 'https://localhost:7091'
const url = 'http://129.11.85.2:5005'


const UseCallApi=async(param:any) =>{


    if(param.action==='GetHumainStopReason') {

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

	if(param.action==='GetAllMachine') {
        
        try {
			const listMachines = await axios.get(url+'/api/Machine/GetAllMachine');		
			return listMachines.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

	if(param.action==='GetInfoTuffting') {

        try {
			const listInfoTufter = await axios.get(url+'/api/TufftingStandard/GetInfoTuffting');		
			return listInfoTufter.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

	if(param.action==='GetTufterCheckList1') {

		const params = {
			moment:1			
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

	if(param.action==='GetTufterCheckList2') {

		const params = {
			moment:2
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

	if(param.action==='GetTufterCheckList3') {

		const params = {
			moment:3
		}

        try {
			const listTufterCheckList3 = await axios.get(url+'/api/TufftingStandard/GetCheckTuffting?'+querystring.stringify(params));		
			return listTufterCheckList3.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

	if(param.action==='AddStopReason') {
		
		const params ={
			id : param.humainstopreason.id,
			tuffter:param.tuffter,
			action:param.actionTuffter,
			employee:param.employee
		}
		//console.log(params)

        try {
			const serialReason =axios.post(url+'/api/StopReason/AddStopReason?'+querystring.stringify(params));		
			return (await serialReason).data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

	if(param.action==='ModifStopReason') {
		
		//console.log(param)
		
		const params ={
			guid : param.guid,
			comment : param.comment
		}

		//console.log(params)
        try {
			axios.post(url+'/api/StopReason/ModifStopReason?'+querystring.stringify(params));			
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }	

	if(param.action==='SetTufterInfo') {

		//console.log(param)
		const params ={
			tuffter:param.tuffter,
			employee:param.employee
		}

		//console.log(params)
        try {
			const tuffterData = await axios.post(url+'/api/TufftingStandard/SetTufterInfo?'+querystring.stringify(params),param.tufterInfos)
			return tuffterData.data			
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }	

	if(param.action==='SetTufterCheckList') {

		//console.log(param)
		const params ={
			tuffter:param.tuffter,
			nbrMtresRlx:param.nbrMtresRlx			
		}
		
        try {
			const checkList = await axios.post(url+'/api/TufftingStandard/SetTufterCheckBox?'+querystring.stringify(params),param.tufterCheckList)
			return checkList.data;			
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }	

	if(param.action==='AddTuffterAction') {

		//console.log(param)
		const params ={
			tuffter:param.tuffter,			
			action:param.stopAction
		}

		//console.log(params)
        try {
			await axios.post(url+'/api/StopReason/AddTuffterAction?'+querystring.stringify(params))
						
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
	}

	if(param.action==='setCommentOperator') {

		console.log(param)
		const params ={
			tuffter:param.tuffter,
			comment:param.comment
		}

		//console.log(params)
        try {
			await axios.post(url+'/api/Employees/AddOpComment?'+querystring.stringify(params))
						
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }
	
	if(param.action==='getCommentOperator') {

		
		const params = {
			tuffter:param.tufName
		}

        try {
			const tuffterComment = await axios.get(url+'/api/Employees/getCommentOp?'+querystring.stringify(params));
			return tuffterComment.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

}

export default UseCallApi;