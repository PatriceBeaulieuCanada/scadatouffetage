import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { useState,useMemo,useEffect} from 'react'
import UseCallApi from '../Hooks/UseCallApi';

const PopUpSetup = (props:any) =>{
    
    const [data, setData] = useState([{name:''}])
    

    useMemo(() =>{
        UseCallApi({action:'GetAllMachine'}).then((data)=>setData(data))
      },[])

    const handleEnrClick = () =>{
        props.setTrigger(false)
        props.setHandleReturn()   
    }
    
    const fields = { text: 'name', value: 'name' };

    const handleComboChange = (args:any) =>{
        props.setTufterName(args.value)
    }

    return (props.trigger)?(
        <div className="popupSetup">
            <div className="popupSetup-inner">
                <h3>Choisir le touffeteur</h3>
                    <div>
                        <ComboBoxComponent dataSource={data} fields={fields} placeholder="Choisir un touffeteur" onChange={handleComboChange}/>
                    </div>                
                    <div>
                        <ButtonComponent className="popupBtn" onClick={handleEnrClick}>Enregistrer</ButtonComponent>
                    </div>
                {props.children}   
            </div> 
        </div>
    ):"" as any;
}

export default PopUpSetup