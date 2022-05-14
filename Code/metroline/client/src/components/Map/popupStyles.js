const popupContent = {
    textAlign: "center",
    height: "200px",
    marginTop: "30px",
    fontFamily: "Verdana, Arial, Helvetica, sans-serif",
    fontWeight: "bold",
};
const popupHead = {
    fontWeight: "bold",
    fontSize: "22px",
};

const popupText = {
    fontSize: "15px",
    marginBottom: "20px",
    position: "relative",
};

const lineText = {
    fontSize: "15px",
};

const lineColor = {
    m1: "#2896CC",
    m2: "#F0952D",
    m3: "#FFD400",
};

const getLineColor = (line) => {
    return lineColor[line];
};

export { popupContent, popupHead, popupText, lineText, lineColor, getLineColor};