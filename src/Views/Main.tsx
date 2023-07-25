import { CircularGaugeComponent, AxesDirective, AxisDirective,RangesDirective, RangeDirective } from '@syncfusion/ej2-react-circulargauge';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { Display } from "react-7-segment-display";

const Main = () =>{

    
    const handleClickAction = (args:any)=>{
        const action = args.target.textContent
        var btnProd = document.getElementById("btnProd");
        var btnAttache = document.getElementById("btnAttache");
        var btnDomper = document.getElementById("btnDomper");

        if(btnProd != null && btnAttache !=null && btnDomper!= null){
            if(action==="Production"){
                btnProd.style.backgroundColor='green'
                btnAttache.style.backgroundColor='red'
                btnDomper.style.backgroundColor='red'
            }
            if(action==="Attache"){
                btnProd.style.backgroundColor='red'
                btnAttache.style.backgroundColor='green'
                btnDomper.style.backgroundColor='red'
            }
            if(action==="Domper balle"){
                btnProd.style.backgroundColor='red'
                btnAttache.style.backgroundColor='red'
                btnDomper.style.backgroundColor='green'
            }
        }

    }

    return(
        <div>
            <div className="principalePage">
                <div className="grid-item1">
                    <img className='grid1Img' src="/tuffter.png" alt="tuffter" />
                    <CircularGaugeComponent className='grid1Speed' title='Vitesse' background= 'white' border= {{
                    color: "#000", width: 4}}>
                        <AxesDirective>
                            <AxisDirective minimum = {0} maximum = {1250}>
                                <RangesDirective>
                                    <RangeDirective start = {800} end = {900}></RangeDirective>
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>    
                        </CircularGaugeComponent>
                    <div className='grid1Count'>
                        <label style={{fontSize:'25px', textDecoration:'underline', margin:'5px 0px'}}>Compteur (Mètres)</label>
                        <Display value="789" count={3} color='red' backgroundColor='black' height={75} skew={false}/>
                    </div>
                </div>
                <div className="grid-item2">
                    <div style={{textAlign:"center", margin:'0px 0px 40px 0px'}}>
                        <div style={{textAlign:"center", margin:'15px 0px'}}>
                            <label style={{fontSize:'25px', textDecoration:'underline'}}>Action</label>
                        </div>
                        <div>
                            <ButtonComponent id='btnProd' className='grid2Btn' onClick={handleClickAction}>Production</ButtonComponent>
                            <ButtonComponent id='btnAttache' className='grid2Btn' onClick={handleClickAction}>Attache</ButtonComponent>
                            <ButtonComponent id='btnDomper' className='grid2Btn' onClick={handleClickAction}>Domper balle</ButtonComponent>
                        </div>                        
                    </div>
                    <div style={{textAlign:"center"}}>
                        <div style={{textAlign:"center", margin:'15px 0px'}}>
                            <label style={{fontSize:'25px', textDecoration:'underline'}}>Raison d'arrêt</label>
                        </div>
                        <div>
                            <ButtonComponent className='grid2Btn'>Raison 1</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 2</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 3</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 4</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 5</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 6</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 7</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 8</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 9</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 10</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 11</ButtonComponent>
                            <ButtonComponent className='grid2Btn'>Raison 12</ButtonComponent>
                        </div>
                    </div>           
                </div>
            </div>
            
        </div>
    )}

export default Main