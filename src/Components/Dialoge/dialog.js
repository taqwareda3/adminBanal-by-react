const Dialog = ({message,onDialog}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          backgroundColor:"white",
          padding:"80px"
        }}
           >
<h3 style={{color:"#111"}}>{message}</h3>
<div style={{display:"flex",alignItems:"center"}}>
<button onClick={()=>onDialog(true)} style={{background:"red",color:"white",padding:"10px",marginRight:"4px",border:"none",cursor:"pointer"}}>Yes</button>
<button onClick={()=>onDialog(false)} style={{background:"green",color:"white",padding:"10px",marginLeft:"4px",border:"none",cursor:"pointer"}}>No</button>
</div>
      </div>
    </div>
  );
};

export default Dialog;
