import { CircularGaugeComponent, AxesDirective, AxisDirective,RangesDirective, RangeDirective } from '@syncfusion/ej2-react-circulargauge';
import { useState,useMemo,useEffect} from 'react'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { Display } from "react-7-segment-display";
import UseCallApi from '../Hooks/UseCallApi';
import PopUp from './PopUp';

const Main = () =>{
    const [dataButton,setDataButton] = useState([{name:''}])
    const param = { action: '',stopAction:''}
    
    const handleClickAction = async(args:any)=>{
        const actions = args.target.textContent
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

    const handleClickReason = (args:any) =>{
        const variable = dataButton.find(v=>v.name==args.target.textContent)
        var containerBtn = document.getElementById("containerBtn");
        containerBtn?.classList.toggle("containerBtnStop",false);
        containerBtn?.classList.toggle("containerBtnStop1",true);
    }

    return(
        <div className='mainContainer'>
            <div className='mainHeader'>
                <h1>Touffeteur</h1>
            </div>
            <div className='mainContainer1'>                
                    <CircularGaugeComponent className='grid1Speed' title='Vitesse' background= 'white' border= {{
                        color: "#000", width: 1}}>
                        <AxesDirective>
                            <AxisDirective minimum = {0} maximum = {1250}>
                                <RangesDirective>
                                    <RangeDirective start = {800} end = {900}></RangeDirective>
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>    
                    </CircularGaugeComponent>

                    <div className='item2'>
                        {/* div bidon pour séparer les items */}
                    </div>
                
                    <div className='item3'>
                        <label style={{fontSize:'25px', textDecoration:'underline', margin:'5px 0px'}}>Compteur (Mètres)</label>
                        <Display value="789" count={3} color='red' backgroundColor='black' height={75} skew={false}/>
                    </div>                
            </div>

            <div className='mainContainer2'>
                <div className='item'>
                    <label>Placé chariots : </label>
                    <input/>
                </div>
                <div className='item'>
                    <label>Enlevé chariots : </label>
                    <input/>
                </div>
                <div className='item'>
                    <label>Retour de bobine : </label>
                    <input/>
                </div>
                <div className='item'>
                    <label>Nbr coller a l'air : </label>
                    <input/>
                </div>
                <div className='item'>
                    <label>Nbr coller a la colleuse : </label>
                    <input/>
                </div>
                <div className='item'>
                    <label>Passer les noeuds : </label>
                    <input/>
                </div>
                <div className='item'>
                    <label>28 pouces : </label>
                    <input/>
                </div>
                <div className='item'>
                    <ButtonComponent>Enregistré</ButtonComponent>
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

                </div>
            </div>
        </div>    
    )}

export default Main