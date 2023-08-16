import {SidebarComponent} from '@syncfusion/ej2-react-navigations';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {useRef} from 'react';
import './App.css';
import Main from './Views/Main';

export default function App() {
  const dockBar:any=useRef() ;
   
    const toggleClickMenu=(event:any)=>{
     //console.log(event)
     dockBar.current.toggle()         
    }
      const toggleClickPrincipale=()=>{
        window.location.pathname = "/"
      }

      const toggleClickInfo=()=>{
        window.location.pathname = "/historique"    
      }
      
      const toggleClickGraph=()=>{
        window.location.pathname = "/graphview"    
      }     
  return (
    <div className="app">
      <SidebarComponent id="dockSidebar" ref={dockBar} enableDock={true} dockSize="60px" width="220px" position='Left'>
                         <div className="dock">
                            <ul>
                                <li className="sidebar-item" id="toggle" onClick={toggleClickMenu}>
                                    <span className="e-icons expand"/>
                                    <span className="e-text" title="menu">Menu</span>
                                </li>
                                <li className="sidebar-item" onClick={toggleClickPrincipale}>
                                    <span className="e-icons product"/>
                                    <span className="e-text" title="principale">Principale</span>
                                </li>
                                {/* <li className="sidebar-item" onClick={toggleClickInfo}>
                                    <span className="e-icons info"/>
                                    <span className="e-text" title="info">Maintenance</span>
                                </li>
                                <li className="sidebar-item" onClick={toggleClickGraph}>
                                    <span className="e-icons comment"/>
                                    <span className="e-text" title="info">Commentaire</span> 
                                </li>    */}                              
                            </ul>
                        </div>
                    </SidebarComponent>
        
        <Router>
          <Routes>
            <Route path="/" element={<Main/>}/>
            
          </Routes>      
        </Router>                    
         
    </div>
  );
}


