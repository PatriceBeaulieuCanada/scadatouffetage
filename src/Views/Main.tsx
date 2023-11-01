/* eslint-disable no-template-curly-in-string */
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  RangesDirective,
  RangeDirective,
  Annotations,
  AnnotationsDirective,
  AnnotationDirective,
  Inject,
} from "@syncfusion/ej2-react-circulargauge";
import { useState, useMemo } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import UseCallApi from "../Hooks/UseCallApi";
import PopUp from "./PopUp";
import PopUpSetup from "./PopUpSetup";
import {
  AxisModel,
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  TooltipSettingsModel,
  ParetoSeries,
  ColumnSeries,
  LineSeries,
  Legend,
  Category,
  Tooltip,
  Highlight,
  DataLabel,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";

const Main = () => {
  const [dataButton, setDataButton] = useState([{ name: "" }]);
  const [enablePopup, setEnablePopup] = useState(false);
  const [enablePopupSetup, setEnablePopupSetup] = useState(false);
  const [textPopup, setTextPopup] = useState("");
  const [commentTxt, setCommentTxt] = useState("");
  const [serialData, getSerialData] = useState("");
  const [tufterName, setTufterName] = useState("");
  const [tufterInfo, setTufterInfo] = useState([
    { name: "", value: "" },
    { name: "", value: "" },
    { name: "", value: "" },
    { name: "", value: "" },
  ]);
  const [tufterCheckList1, setTufterCheckList1] = useState([
    { name: "", values: "" },
  ]);
  const [tufterCheckList2, setTufterCheckList2] = useState([
    { name: "", values: "" },
  ]);
  const [tufterCheckList3, setTufterCheckList3] = useState([
    { name: "", values: "" },
  ]);
  const [tufterAction, setTufterAction] = useState("");
  const param = {
    action: "",
    stopAction: "",
    humainstopreason: {},
    guid: "",
    comment: "",
    tuffter: "",
    actionTuffter: "",
    employee: "",
    tufterInfos: [],
    tufterCheckList: [],
  };
  

  useMemo(() => {
    let name = "tufterName=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        //console.log(c.substring(name.length, c.length))
        setTufterName(c.substring(name.length, c.length));
      }
    }

    UseCallApi({ action: "GetInfoTuffting" }).then((tufterInfo) =>
      setTufterInfo(tufterInfo)
    );
    UseCallApi({ action: "GetTufterCheckList1" }).then((tufterCheckList1) =>
      setTufterCheckList1(tufterCheckList1)
    );
    UseCallApi({ action: "GetTufterCheckList2" }).then((tufterCheckList2) =>
      setTufterCheckList2(tufterCheckList2)
    );
    UseCallApi({ action: "GetTufterCheckList3" }).then((tufterCheckList3) =>
      setTufterCheckList3(tufterCheckList3)
    );
    //tufterCheckList1.forEach

    // setTimeout( async () => {
    //   const setTuffCheck: any = [];
    //   tufterCheckList1.forEach((v,i)=>{
    //       v.values = "X"
    //       setTuffCheck.push(v)
    //   })
    //   setTufterCheckList1(setTuffCheck)
    // }, 2000);

    
  }, []);

  //   useEffect(() => {
  //     const interval = setInterval(() => {

  //       var state = socketRead.readyState

  //     if(state == 1){
  //       //console.log("connecter et fonctionnelle")
  //       try{
  //       socketRead.send("ready");
  //     }catch(e)
  //     {
  //       console.log("erreur",e)
  //     }

  //     try{
  //         socketRead.onmessage = function(e){
  //         setData(JSON.parse(e.data.toString()))}
  //       }catch(e){
  //         console.log("probleme",e)
  //       }
  //     }

  //     if(state == 3){
  //       //console.log("non connecter ou en erreur",state)
  //       socketRead = new W3CWebSocket('ws://localhost:1796/GetVariables')
  //     }

  //     if(state == 0){
  //       //console.log("esaie de connection",state)
  //     }

  //     }, 6000000);
  //     return () => clearInterval(interval);
  // }, []);

  const handleClickAction = async (args: any) => {
    const actions = args.target.textContent;
    setTufterAction(actions);
    var btnProd = document.getElementById("btnProd");
    var btnAttache = document.getElementById("btnAttache");
    var btnDomper = document.getElementById("btnDomper");
    var btnEnfilage = document.getElementById("btnEnfilage");
    var btnCouperBeam = document.getElementById("btnCouperBeam");

    if (
      btnProd != null &&
      btnAttache != null &&
      btnDomper != null &&
      btnEnfilage != null &&
      btnCouperBeam != null
    ) {
      if (actions === "Production") {
        btnProd.style.backgroundColor = "green";
        btnAttache.style.backgroundColor = "red";
        btnDomper.style.backgroundColor = "red";
        btnEnfilage.style.backgroundColor = "red";
        btnCouperBeam.style.backgroundColor = "red";
      }
      if (actions === "Attache") {
        btnProd.style.backgroundColor = "red";
        btnAttache.style.backgroundColor = "green";
        btnDomper.style.backgroundColor = "red";
        btnEnfilage.style.backgroundColor = "red";
        btnCouperBeam.style.backgroundColor = "red";
      }
      if (actions === "Domper balle") {
        btnProd.style.backgroundColor = "red";
        btnAttache.style.backgroundColor = "red";
        btnDomper.style.backgroundColor = "green";
        btnEnfilage.style.backgroundColor = "red";
        btnCouperBeam.style.backgroundColor = "red";
      }
      if (actions === "Enfilage initial") {
        btnProd.style.backgroundColor = "red";
        btnAttache.style.backgroundColor = "red";
        btnDomper.style.backgroundColor = "red";
        btnEnfilage.style.backgroundColor = "green";
        btnCouperBeam.style.backgroundColor = "red";
      }
      if (actions === "Couper set de beams") {
        btnProd.style.backgroundColor = "red";
        btnAttache.style.backgroundColor = "red";
        btnDomper.style.backgroundColor = "red";
        btnEnfilage.style.backgroundColor = "red";
        btnCouperBeam.style.backgroundColor = "green";
      }
    }

    param.action = 'GetHumainStopReason'
    param.stopAction = actions
    setDataButton(await UseCallApi(param))

    // param.action = 'AddTuffterAction'
    // param.stopAction = actions
    // param.tuffter = tufterName
    // param.employee = tufterName
    // await UseCallApi(param)
  };

  const handleClickReason = async (args: any) => {
    const variable = dataButton.find((v) => v.name === args.target.textContent);
    setTextPopup(args.target.textContent);

    param.action = "AddStopReason";
    param.humainstopreason = variable as any;
    param.tuffter = tufterName;
    param.actionTuffter = tufterAction;
    param.employee = tufterName;
    getSerialData(await UseCallApi(param));

    setCommentTxt("");

    var containerBtn = document.getElementById("containerBtn");
    containerBtn?.classList.toggle("containerBtnStop", false);
    containerBtn?.classList.toggle("containerBtnStop1", true);

    if (enablePopup) {
      setEnablePopup(false);
    } else {
      setEnablePopup(true);
    }
  };

  const handleReturnBtn = async (args: any) => {
    var containerBtn = document.getElementById("containerBtn");
    containerBtn?.classList.toggle("containerBtnStop1", false);
    containerBtn?.classList.toggle("containerBtnStop", true);

    if (enablePopup) {
      setEnablePopup(false);
    } else {
      setEnablePopup(true);
    }
    param.action = "ModifStopReason";

    //console.log("serial : ", serialData)

    param.guid = serialData;
    param.comment = commentTxt;

    //console.log("param : ", param)
    await UseCallApi(param);
  };

  const handleClickInput = () => {
    if (enablePopupSetup) {
      setEnablePopupSetup(false);
    } else {
      setEnablePopupSetup(true);
    }
  };

  const handleEnrReturnBtn = () => {
    var now = new Date();
    now.setTime(now.getTime() + 365000 * 3600 * 1000);

    document.cookie =
      "tufterName=" + tufterName + "; expires=" + now.toUTCString() + ";path=/";

    if (enablePopupSetup) {
      setEnablePopupSetup(false);
    } else {
      setEnablePopupSetup(true);
    }
  };

  // const handleInputChange = (args:any) =>{

  //     SetEmployee(args.target.value)
  //     var now = new Date();
  //     now.setTime(now.getTime() + 365000 * 3600 * 1000);

  //     document.cookie = "employeeName="+employee+"; expires=" + now.toUTCString() + ";path=/";
  // }

  // const handleInputBlur = (args:any) =>{

  //     SetEmployee(args.target.value)
  //     var now = new Date();
  //     now.setTime(now.getTime() + 365000 * 3600 * 1000);

  //     document.cookie = "employeeName="+employee+"; expires=" + now.toUTCString() + ";path=/";
  // }

  const handleClickBtnProd = async () => {
    param.action = "SetTufterInfo";
    param.tufterInfos = tufterInfo as any;
    param.tuffter = tufterName;
    param.employee = tufterName;

    setTufterInfo(await UseCallApi(param));
  };

  const handleInputTufChange = (args: any) => {
    const setTuff: any = [];

    tufterInfo.forEach((v, i) => {
      if (v.name === args.target.id) {
        v.value = args.target.value;
        setTufterInfo(tufterInfo);
      }
      setTuff.push(v);
    });

    setTufterInfo(setTuff as any);
  };

  const handleClickBtnCheck1 = async () => {
    param.action = "SetTufterCheckList";
    param.tufterCheckList = tufterCheckList1 as any;
    param.tuffter = tufterName;
    param.employee = tufterName;

    setTufterCheckList1(await UseCallApi(param));

    param.action = "SetTufterCheckList";
    param.tufterCheckList = tufterCheckList3 as any;
    param.tuffter = tufterName;
    param.employee = tufterName;

    setTufterCheckList3(await UseCallApi(param));
  };

  const handleClickBtnCheck2 = async () => {
    param.action = "SetTufterCheckList";
    param.tufterCheckList = tufterCheckList2 as any;
    param.tuffter = tufterName;
    param.employee = tufterName;

    //setTufterCheckList2(await UseCallApi(param));
    
  };

  const chartData: any[] = [
    { x: "Reparer tapis", y: 10 },
    { x: "Pause", y: 16 },
    { x: "balle plancher", y: 30 },
    { x: "échatillion", y: 8 },
  ];
  const primaryxAxis: AxisModel = {
    interval: 1,
    valueType: "Category",
    majorGridLines: { width: 0 },
    labelIntersectAction: "Rotate45",
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    lineStyle: { width: 0 },
  };
  const primaryyAxis: AxisModel = {
    title: "Frequence",
    minimum: 0,
    maximum: 100,
    interval: 20,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
  };
  const tooltipsettings: TooltipSettingsModel = {
    enable: true,
    shared: true,
    format: "${series.name} : <b>${point.y}</b>",
  };

  const handleClickBtn2 = (args: any) => {
    const setTuffCheck2: any = [];

    tufterCheckList2.forEach((v, i) => {
      if (v.name === args.target.id){

        if (v.values === "X") {
        v.values = "OUI";
      
    }else if(v.values === "OUI"){
        v.values = "NON";
      
    }else if (v.values === "NON"){
        v.values = "X";
    }else{
        v.values = "X"
    }
  } 
      setTuffCheck2.push(v);
    });
    setTufterCheckList2(setTuffCheck2);
  };

  const handleClickBtn1 = (args: any) => {

    const setTuffCheck1: any = [];

    tufterCheckList1.forEach((v, i) => {
      if (v.name === args.target.id){

        if (v.values === "X") {
        v.values = "OUI";
      
    }else if(v.values === "OUI"){
        v.values = "NON";
      
    }else if (v.values === "NON"){
        v.values = "X";
    }else{
        v.values = "X"
    }
  } 
      setTuffCheck1.push(v);
    });
    setTufterCheckList1(setTuffCheck1);
    
  };

  const handleClickBtn3 = (args: any) => {
    const setTuffCheck3: any = [];

    tufterCheckList3.forEach((v, i) => {
      if (v.name === args.target.id){

        if (v.values === "X") {
        v.values = "OUI";
      
    }else if(v.values === "OUI"){
        v.values = "NON";
      
    }else if (v.values === "NON"){
        v.values = "X";
    }else{
        v.values = "X"
    }
  } 
      setTuffCheck3.push(v);
    });
    setTufterCheckList3(setTuffCheck3);
  };

  return (
    <div className="mainContainer">
      <div className="mainHeader">
        <input
          className="headerInput"
          onClick={handleClickInput}
          value={tufterName}
        />
        <h1>Touffeteur</h1>
        {/* <div>
                    <label className='headerLabel'>Opérateur : </label>
                    <input className='headerInputName' value={employee} onChange={handleInputChange} onBlur={handleInputBlur}/>
                </div> */}
      </div>
      <div className="mainContainer1">
        <CircularGaugeComponent
          className="grid1Speed"
          title="Vitesse"
          background="white"
          border={{
            color: "#000",
            width: 1,
          }}
        >
          <AxesDirective>
            <AxisDirective
              minimum={0}
              maximum={1250}
              majorTicks={{
                interval: 100,
                color: "red",
                height: 15,
                width: 3,
              }}
              minorTicks={{
                interval: 50,
                color: "green",
                height: 5,
                width: 2,
              }}
            >
              <RangesDirective>
                <RangeDirective start={800} end={900}></RangeDirective>
              </RangesDirective>
              <AnnotationsDirective>
                <AnnotationDirective
                  content="<div><div><span>50</span></div></div>"
                  angle={180}
                  radius="100%"
                  zIndex="1"
                />
              </AnnotationsDirective>
            </AxisDirective>
          </AxesDirective>
          <Inject services={[Annotations]} />
        </CircularGaugeComponent>

        <div className="item2">
          <ChartComponent
            id="charts"
            height="60%"
            primaryXAxis={primaryxAxis}
            primaryYAxis={primaryyAxis}
            tooltip={tooltipsettings}
            title="Raison d'arrêts"
            legendSettings={{ visible: true, enableHighlight: true }}
          >
            <Inject
              services={[
                ColumnSeries,
                LineSeries,
                ParetoSeries,
                Legend,
                Tooltip,
                Category,
                DataLabel,
                Highlight,
              ]}
            />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={chartData}
                xName="x"
                yName="y"
                name="Defect"
                type="Pareto"
                width={2}
                opacity={0.75}
                columnWidth={0.4}
                cornerRadius={{
                  topLeft: Browser.isDevice ? 4 : 6,
                  topRight: Browser.isDevice ? 4 : 6,
                }}
                paretoOptions={{
                  marker: {
                    visible: true,
                    isFilled: true,
                    width: 7,
                    height: 7,
                  },
                  dashArray: "3,2",
                  width: 2,
                  fill: "#F7523F",
                }}
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>

        <div className="item3">
          <div>
            <label className="lblItem3">A chaques fin de quart</label>
          </div>
          {tufterCheckList2.map((v, i) => {
            return (
              <div className="item">
                <label className="item1">{v.name} :</label>
                {/* <input
                  type="checkbox"
                  id={v.name}
                  name={v.name}
                  value={v.name}
                  checked={v.value}
                  onChange={handleCheck2Click}
                /> */}
                <ButtonComponent
                  className="btnChoiceCss"
                  id={v.name}
                  onClick={handleClickBtn2}
                >
                  {v.values}
                </ButtonComponent>
              </div>
            );
          })}
          <div>
            <label style={{ marginLeft: "5px" }}>
              Nombre de mètres produits sur rouleau :
            </label>
            <input style={{ marginLeft: "10px", width: "70px" }} />
          </div>
          <div className="btnItem3">
            <ButtonComponent onClick={handleClickBtnCheck2}>
              Validez
            </ButtonComponent>
          </div>
        </div>
        {/* <div className='item3'>
                        <label style={{fontSize:'25px', textDecoration:'underline', margin:'5px 0px'}}>Compteur (Mètres)</label>
                        <Display value="789" count={3} color='red' backgroundColor='black' height={75} skew={false}/>
                    </div>  */}
        <PopUpSetup
          trigger={enablePopupSetup}
          setTrigger={setEnablePopupSetup}
          setHandleReturn={handleEnrReturnBtn}
          setTufterName={setTufterName}
        />
      </div>

      <div className="mainContainer2">
        <div className="container2Div1">
          <div className="subDiv">
            {tufterInfo.map((v, i) => {
              return (
                <div className="item">
                  <label>{v.name} :</label>
                  <input
                    id={v.name}
                    onChange={handleInputTufChange}
                    value={v.value}
                    type="text"
                  />
                </div>
              );
            })}
            <div className="container2Div1Btn">
              <ButtonComponent onClick={handleClickBtnProd}>
                Validez
              </ButtonComponent>
            </div>
          </div>
        </div>
        <div className="container2Div2">
          <div className="subDiv">
          <div className="item3">
            <label>
              Nombre de mètres produits sur rouleau :
            </label>
            <input style={{ marginLeft: "10px", width: "70px" }} />
          </div>
            {tufterCheckList1.map((v, i) => {
              return (
                <div className="item">
                  <label className="item1">{v.name} :</label>
                  <div className="checkItem">
                    {/* <input
                      type="checkbox"
                      id={v.name}
                      name={v.name}
                      value={v.name}
                      checked={v.value}
                      onChange={handleCheck1Click}
                    /> */}
                    <ButtonComponent
                      className="btnChoiceCss"
                      id={v.name}
                      onClick={handleClickBtn1}
                    >
                      {v.values}
                    </ButtonComponent>
                  </div>
                </div>
              );
            })}

            {tufterCheckList3.map((v, i) => {
              return (
                <div className="item">
                  <label className="item2">{v.name} :</label>
                  <div className="checkItem">
                    {/* <input
                      type="checkbox"
                      id={v.name}
                      name={v.name}
                      value={v.name}
                      checked={v.value}
                      onChange={handleCheck3Click}
                    /> */}
                    <ButtonComponent
                      className="btnChoiceCss"
                      id={v.name}
                      onClick={handleClickBtn3}
                    >
                      {v.values}
                    </ButtonComponent>
                  </div>
                </div>
              );
            })}
            
            <div className="container2Div3">
              <ButtonComponent onClick={handleClickBtnCheck1}>
                Validez
              </ButtonComponent>
            </div>
          </div>
          
        </div>        
      </div>

      <div className="mainContainer3">
        {/* <div>
          <p>Action</p>
        </div> */}
        <div className="btnActionCSS">
        <p>Action : </p>
          <ButtonComponent
            id="btnProd"
            className="grid2Btn"
            onClick={handleClickAction}
          >
            Production
          </ButtonComponent>
          <ButtonComponent
            id="btnAttache"
            className="grid2Btn"
            onClick={handleClickAction}
          >
            Attache
          </ButtonComponent>
          <ButtonComponent
            id="btnDomper"
            className="grid2Btn"
            onClick={handleClickAction}
          >
            Domper balle
          </ButtonComponent>
          <ButtonComponent
            id="btnEnfilage"
            className="grid2Btn"
            onClick={handleClickAction}
          >
            Enfilage initial
          </ButtonComponent>
          <ButtonComponent
            id="btnCouperBeam"
            className="grid2Btn"
            onClick={handleClickAction}
          >
            Couper set de beams
          </ButtonComponent>
        </div>
        <div className="containerBtnStop" id="containerBtn">
          {dataButton.map((v, i) => {
            return (
              <ButtonComponent className="grid2Btn" onClick={handleClickReason}>
                {v.name}
              </ButtonComponent>
            );
          })}
          <PopUp
            trigger={enablePopup}
            setTrigger={setEnablePopup}
            setText={textPopup}
            setHandleReturn={handleReturnBtn}
            setComment={setCommentTxt}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
