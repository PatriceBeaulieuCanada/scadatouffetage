import { CircularGaugeComponent, AxesDirective, AxisDirective,RangesDirective, RangeDirective, 
    Annotations, AnnotationsDirective, AnnotationDirective,Inject} from '@syncfusion/ej2-react-circulargauge';
import { useState,useMemo,useEffect} from 'react'
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { Display } from "react-7-segment-display";
import UseCallApi from '../Hooks/UseCallApi';
import PopUp from './PopUp';
import PopUpSetup from './PopUpSetup';
import { w3cwebsocket as W3CWebSocket } from 'websocket'

let socketRead = new W3CWebSocket('ws://129.11.185.127:1796/GetVariables')

const Main = () =>{
    const [dataButton,setDataButton] = useState([{name:''}])
    const[enablePopup,setEnablePopup] = useState(false);
    const[enablePopupSetup,setEnablePopupSetup] = useState(false);
    const[textPopup,setTextPopup] = useState("");
    const [commentTxt,setCommentTxt] = useState('')
    const [serialData,getSerialData] = useState("")
    const [tufterName, setTufterName] = useState('')
    const [tufterInfo, setTufterInfo] = useState([{name:""}])
    const [tufterCheckList1, setTufterCheckList1] = useState([{name:""}])
    const [tufterCheckList2, setTufterCheckList2] = useState([{name:""}])
    const [tufterAction, setTufterAction] = useState("")
    const[employee,SetEmployee] = useState("")
    const param = { action: '',stopAction:'',humainstopreason:{},guid:'',comment:'',tuffter:"",actionTuffter:"",employee:""}
    const [data, setData] = useState([{Name:"erreur",Value:""}]) 

    useMemo(() =>{
        let name = "tufterName" + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            //console.log(c.substring(name.length, c.length))
            setTufterName(c.substring(name.length, c.length))
            }
        }
        
        UseCallApi({action:'GetInfoTuffting'}).then((tufterInfo)=>setTufterInfo(tufterInfo))
        UseCallApi({action:'GetTufterCheckList1'}).then((tufterCheckList1)=>setTufterCheckList1(tufterCheckList1))
        UseCallApi({action:'GetTufterCheckList2'}).then((tufterCheckList2)=>setTufterCheckList2(tufterCheckList2))
      },[])

      useEffect(() => {
        const interval = setInterval(() => {
  
          var state = socketRead.readyState
        
        if(state == 1){
          console.log("connecter et fonctionnelle")
          try{
          socketRead.send("ready");
        }catch(e)
        {
          console.log("erreur",e)
        }
  
        try{
            socketRead.onmessage = function(e){
            setData(JSON.parse(e.data.toString()))}
          }catch(e){
            console.log("probleme",e)
          }
  
        }
  
        if(state == 3){
          console.log("non connecter ou en erreur",state)
          socketRead = new W3CWebSocket('ws://129.11.185.127:1796/GetVariables')
          
        }
  
        if(state == 0){
          console.log("esaie de connection",state)
        }
  
        }, 2000);
        return () => clearInterval(interval);
    }, []); 
    
    const handleClickAction = async(args:any)=>{
        const actions = args.target.textContent
        setTufterAction(actions)
        var btnProd = document.getElementById("btnProd");
        var btnAttache = document.getElementById("btnAttache");
        var btnDomper = document.getElementById("btnDomper");

        if(btnProd != null && btnAttache !=null && btnDomper!= null){
            if(actions==="Production"){
                btnProd.style.backgroundColor='green'
                btnAttache.style.backgroundColor='red'
                btnDomper.style.backgroundColor='red'
            }
            if(actions==="Attache"){
                btnProd.style.backgroundColor='red'
                btnAttache.style.backgroundColor='green'
                btnDomper.style.backgroundColor='red'
            }
            if(actions==="Domper balle"){
                btnProd.style.backgroundColor='red'
                btnAttache.style.backgroundColor='red'
                btnDomper.style.backgroundColor='green'
            }
        }

        param.action = 'GetHumainStopReason'
        param.stopAction = actions
        setDataButton(await UseCallApi(param))
    }

    const handleClickReason =async (args:any) =>{
        const variable = dataButton.find(v=>v.name==args.target.textContent)
        setTextPopup(args.target.textContent)

        param.action = 'AddStopReason'
        param.humainstopreason = variable as any
        param.tuffter = tufterName
        param.actionTuffter = tufterAction
        param.employee = employee
        getSerialData(await UseCallApi(param))

        setCommentTxt('')

        var containerBtn = document.getElementById("containerBtn");
        containerBtn?.classList.toggle("containerBtnStop",false);
        containerBtn?.classList.toggle("containerBtnStop1",true);

        if(enablePopup){
            setEnablePopup(false);
        }
        else
        {
            setEnablePopup(true);
        }
    }

    const handleReturnBtn = async (args:any) =>{

        var containerBtn = document.getElementById("containerBtn");
        containerBtn?.classList.toggle("containerBtnStop1",false);
        containerBtn?.classList.toggle("containerBtnStop",true);        

        if(enablePopup){
            setEnablePopup(false);
        }
        else
        {
            setEnablePopup(true);
        }
        param.action = 'ModifStopReason'

        if (serialData==null)
        
        param.guid = serialData
        param.comment = commentTxt;
        await UseCallApi(param)
    }

    const handleClickInput = () =>{
        if(enablePopupSetup){
            setEnablePopupSetup(false);
        }
        else
        {
            setEnablePopupSetup(true);
        }
    }

    const handleEnrReturnBtn = () =>{
        var now = new Date();
        now.setTime(now.getTime() + 365000 * 3600 * 1000);

        document.cookie = "tufterName="+tufterName+"; expires=" + now.toUTCString() + ";path=/";

        if(enablePopupSetup){
            setEnablePopupSetup(false);
        }
        else
        {
            setEnablePopupSetup(true);
        }
    }

    const handleInputChange = (args:any) =>{
        SetEmployee(args.target.value)
    }

    return(
        <div className='mainContainer'>
            <div className='mainHeader'>
                <input className='headerInput' onClick={handleClickInput} value={tufterName}/>
                <h1>Touffeteur</h1>
                <div>
                    <label className='headerLabel'>Opérateur : </label>
                    <input className='headerInputName' value={employee} onChange={handleInputChange}/>
                </div>
            </div>
            <div className='mainContainer1'>                
                    <CircularGaugeComponent className='grid1Speed' title='Vitesse' background= 'white' border= {{
                        color: "#000", width: 1}}>
                        <AxesDirective>
                            <AxisDirective minimum = {0} maximum = {1250}
                            majorTicks = {{
                                interval: 100,
                                color:'red',
                                height: 15,
                                width: 3
                            }} minorTicks = {{
                                interval: 50,
                                color:'green',
                                height: 5,
                                width: 2
                            }}>
                                <RangesDirective>
                                    <RangeDirective start = {800} end = {900}></RangeDirective>
                                </RangesDirective>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div><div><span>50</span></div></div>' 
                                    angle= {180} radius = '100%' zIndex='1'/>
                                </AnnotationsDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <Inject services={[ Annotations ]}/>    
                    </CircularGaugeComponent>

                    <div className='item2'>
                        {/* div bidon pour séparer les items */}
                    </div>

                    <div className='item3'>
                            <div>
                                <label className='lblItem3'>A chaques fin de quart</label>
                            </div>
                            {tufterCheckList2.map((v,i)=>{
                            return(
                                <div className='item'>
                                <label>{v.name}  :</label>
                                <CheckBoxComponent/>
                                </div>
                            )
                            })}
                            <div className='btnItem3'>
                                <ButtonComponent>Validez</ButtonComponent>
                            </div>
                    </div>
                
                    {/* <div className='item3'>
                        <label style={{fontSize:'25px', textDecoration:'underline', margin:'5px 0px'}}>Compteur (Mètres)</label>
                        <Display value="789" count={3} color='red' backgroundColor='black' height={75} skew={false}/>
                    </div>  */}
                    <PopUpSetup trigger={enablePopupSetup} setTrigger={setEnablePopupSetup} setHandleReturn={handleEnrReturnBtn}
                    setTufterName={setTufterName}/>               
            </div>

            <div className='mainContainer2'>
                <div className='container2Div1'>
                    <div className='subDiv'>
                        {tufterInfo.map((v,i)=>{
                        return(
                            <div className='item'>
                            <label>{v.name}  :</label>
                            <input/>
                            </div>
                        )
                        })}
                    <div className='container2Div1Btn'>
                        <ButtonComponent>Validez</ButtonComponent>                            
                    </div>
                </div>                                        
                </div>
                <div className='container2Div2'>
                    <div className='subDiv'>
                            {tufterCheckList1.map((v,i)=>{
                            return(
                                <div className='item'>
                                    <label className='item1'>{v.name}  :</label>
                                    <div className='checkItem'>
                                        <CheckBoxComponent/>
                                    </div>
                                </div>
                            )
                            })}
                    <div className='container2Div3'>
                        <ButtonComponent>Validez</ButtonComponent>                            
                    </div>
                    </div>
                </div>
            </div>

            <div className='mainContainer3'>
                <div>
                    <p>Action</p>
                </div>
                <div>
                    <ButtonComponent id='btnProd' className='grid2Btn' onClick={handleClickAction}>Production</ButtonComponent>
                    <ButtonComponent id='btnAttache' className='grid2Btn' onClick={handleClickAction}>Attache</ButtonComponent>
                    <ButtonComponent id='btnDomper' className='grid2Btn' onClick={handleClickAction}>Domper balle</ButtonComponent>
                </div>
                <div className='containerBtnStop' id='containerBtn'>
                    {dataButton.map((v,i)=>{
                    return(
                        <ButtonComponent className='grid2Btn' onClick={handleClickReason}>{v.name}</ButtonComponent>
                    )
                    })}
                    <PopUp trigger={enablePopup} setTrigger={setEnablePopup} setText={textPopup} setHandleReturn={handleReturnBtn}
                    setComment={setCommentTxt}/>
                </div>
            </div>
        </div>    
    )}

export default Main