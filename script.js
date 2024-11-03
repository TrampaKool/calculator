const { useState, useRef, useEffect } = React;
const ROWS = 5;
const COLS = 4;
const buttonsArr = [
{
  text: "AC",
  value: "clear",
  id: "clear",
  spanX: 2,
  spanY: 1,
  class: "calc-button clear-button" },

{
  text: "/",
  value: "/",
  id: "divide",
  spanX: 1,
  spanY: 1,
  class: "calc-button operation-button" },

{
  text: "x",
  value: "·",
  id: "multiply",
  spanX: 1,
  spanY: 1,
  class: "calc-button operation-button" },

{
  text: "7",
  value: "7",
  id: "seven",
  spanX: 1,
  spanY: 1,
  class: "calc-button num-button" },

{
  text: "8",
  value: "8",
  id: "eight",
  spanX: 1,
  spanY: 1,
  class: "calc-button num-button" },

{
  text: "9",
  value: "9",
  id: "nine",
  spanX: 1,
  spanY: 1,
  class: "calc-button num-button" },

{
  text: "-",
  value: "-",
  id: "subtract",
  spanX: 1,
  spanY: 1,
  class: "calc-button operation-button" },

{
  text: "4",
  value: "4",
  id: "four",
  spanX: 1,
  spanY: 1,
  class: "calc-button num-button" },

{
  text: "5",
  value: "5",
  id: "five",
  spanX: 1,
  spanY: 1,
  class: "calc-button num-button" },

{
  text: "6",
  value: "6",
  id: "six",
  spanX: 1,
  spanY: 1,
  class: "calc-button num-button" },

{
  text: "+",
  value: "+",
  id: "add",
  spanX: 1,
  spanY: 1,
  class: "calc-button operation-button" },

{
  text: "1",
  value: "1",
  id: "one",
  spanX: 1,
  spanY: 1,
  class: "calc-button num-button" },

{
  text: "2",
  value: "2",
  id: "two",
  spanX: 1,
  spanY: 1,
  class: "calc-button num-button" },

{
  text: "3",
  value: "3",
  id: "three",
  spanX: 1,
  spanY: 1,
  class: "calc-button num-button" },

{
  text: "=",
  value: "=",
  id: "equals",
  spanX: 1,
  spanY: 2,
  class: "calc-button equals-button" },

{
  text: "0",
  value: "0",
  id: "zero",
  spanX: 2,
  spanY: 1,
  class: "calc-button num-button zero" },

{
  text: ".",
  value: ".",
  id: "decimal",
  spanX: 1,
  spanY: 1,
  class: "calc-button num-button" }];



const Calculator = () => {
  const [currExp, setCurrExp] = useState("");
  const [lastPressed, setLastPressed] = useState("0");
  const [result, setResult] = useState("");
  const [firstPress, setFirstPress] = useState(false);

  const isLastCharOp = str => /^[/·+-]$/.test(str.at(-1));

  const resetCalculator = () => {
    setCurrExp("");
    setResult("");
    setLastPressed("0");
    setFirstPress(false);
  };

  const handleEqualsButton = () => {
    setCurrExp(prev => {
      let newExp;
      if (isLastCharOp(lastPressed)) {
        newExp = prev.slice(0, -1);
      } else if (lastPressed.at(-1) == ".") {
        newExp = prev + lastPressed.slice(0, -1);
      } else {
        newExp = prev + lastPressed;
      }
      newExp = newExp.replace(/·/g, "*");
      setResult(prev => "= " + eval(newExp));
      setLastPressed("");
      setFirstPress(true);
      return newExp.replace(/\*/g, "·");
    });
  };

  const handleOpButton = value => {
    setCurrExp(prev => {
      if (
      value === "-" && (
      lastPressed === "·" || lastPressed === "/" || lastPressed === "0"))
      {
        return prev + value;
      }
      if (isLastCharOp(lastPressed)) {
        return prev.slice(0, -1) + value;
      }
      if (lastPressed.at(-1) === ".") {
        return prev + lastPressed.slice(0, -1) + value;
      }
      return prev + lastPressed + value;
    });
    setLastPressed(value);
  };

  const handleNumButton = value => {
    setLastPressed(prev => {
      if (isLastCharOp(lastPressed) || lastPressed === "0") {
        return value === "." ? "0." : value;
      }

      if (lastPressed.includes(".") && value === ".") {
        return prev;
      }
      return prev + value;
    });
  };

  const handleButtonPress = (id, value, classes) => {
    if (id === "clear") {
      resetCalculator();
      return;
    }

    if (firstPress) {
      if (isLastCharOp(value)) {
        setCurrExp(result.slice(2));
        setResult("");
        setFirstPress(false);
      } else {
        return;
      }
    }
    setResult("");

    if (id === "equals") {
      handleEqualsButton();
      return;
    }

    if (lastPressed === "0" && value === "0") {
      return;
    }
    if (classes.includes("operation-button")) {
      handleOpButton(value);
    } else if (classes.includes("num-button")) {
      handleNumButton(value);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "calculator-div p-1" }, /*#__PURE__*/
    React.createElement(Display, { currExp: currExp, lastPressed: lastPressed, result: result }), /*#__PURE__*/
    React.createElement(Buttons, { handleButtonPress: handleButtonPress })));


};

const Display = ({ currExp, lastPressed, result }) => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "display", className: "m-2" }, /*#__PURE__*/
    React.createElement("div", {
      style: {
        minHeight: "35px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px" },

      className: "text-end fs-4 px-4 pt-2" },

    currExp), /*#__PURE__*/

    React.createElement("div", {
      style: {
        minHeight: "45px",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px" },

      className: "text-end fs-1 px-2" },

    result !== "" ? result : lastPressed)));



};

const Buttons = ({ handleButtonPress }) => {
  return /*#__PURE__*/(
    React.createElement("div", {
      style: {
        gridTemplateColumns: `repeat(${COLS}, 1fr`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)` },

      id: "buttons",
      className: "p-1" },

    buttonsArr.map((el, index) => /*#__PURE__*/
    React.createElement("button", {
      key: `btn-${index}`,
      style: {
        gridColumn: `span ${el.spanX}`,
        gridRow: `span ${el.spanY}` },

      className: el.class,
      id: el.id,
      onClick: () => handleButtonPress(el.id, el.value, el.class),
      value: el.value },

    el.id === "decimal" ? /*#__PURE__*/
    React.createElement("span", { className: "point" }, el.text) :

    el.text))));





};

ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById("react-container"));