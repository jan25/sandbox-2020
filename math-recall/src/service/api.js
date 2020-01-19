import { create, all } from "mathjs";

const mathConfig = {};
const math = create(all, mathConfig);

let data = [
  {
    id: 1,
    name: "addition",
    formula: "a+b"
  },
  {
    id: 2,
    name: "subtraction",
    formula: "a-b"
  },
  {
    id: 3,
    name: "Lil complex formula",
    formula: "a + (b / c) ^ d"
  }
];

export const GetFormulaList = () => {
  return data;
};

export const CreateNewFormula = ({ name, formula }) => {
  // TODO use validations
  const validations = validateFormula(formula);

  // Save formula
  let newFormula = {
    id: generateID(),
    name: name,
    formula: formula
  };
  data.push(newFormula);

  return newFormula;
};

const validateFormula = formula => {
  // TODO
};

export const GetFormula = id => {
  const formula = data.find(f => f.id == id);
  if (!formula) return null;

  return {
    ...formula,
    variables: getVariableNames(formula.formula)
  };
};

const getVariableNames = formula => {
  const parsed = math.parse(formula);
  let vars = [];

  parsed.traverse((node, jsonPath, parent) => {
    switch (node.type) {
      case "SymbolNode":
        vars.push({
          name: node.name
          // TODO add other fields
        });
      default:
      // do nothing
    }
  });

  return vars;
};

export const Calculate = (formula, scope) => {
  let result = math.evaluate(formula, scope);
  return transformResult(result);
};

const transformResult = result => {
  if (isNaN(result)) {
    return "Invalid Number";
  } else if (!isFinite(result)) {
    return "Infinite Number";
  }

  return result;
};

export const GetNextID = () => {
  return generateID();
};

const generateID = () => {
  let maxID = -1;
  for (let i in data) {
    maxID = Math.max(maxID, data[i].id);
  }
  return maxID + 1;
};
