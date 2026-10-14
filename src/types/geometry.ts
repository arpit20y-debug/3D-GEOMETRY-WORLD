export type ShapeId = 'cube' | 'cuboid' | 'cylinder' | 'cone' | 'sphere' | 'hemisphere';

export interface ShapeVariable {
  symbol: string;
  name: string;
  description: string;
  unit?: string;
}

export interface ShapeProperties {
  faces: number;
  edges: number;
  vertices: number;
  curvedSurfaces: number;
  circularBases: number;
  faceDescription?: string;
  summaryPoints: string[];
}

export interface FormulaItem {
  id: 'lsa' | 'tsa' | 'volume';
  name: string; // e.g. "Lateral Surface Area" or "Curved Surface Area"
  shortFormula: string; // e.g. "4a²"
  derivation: string;
  meaning: string;
  unit: string;
}

export interface RealLifeExample {
  name: string;
  description: string;
  category: string;
  emoji: string;
}

export interface NumericalStep {
  label: string;
  formula: string;
  substitution: string;
  calculation: string;
  result: string;
}

export interface NumericalExampleData {
  title: string;
  scenario: string;
  given: { symbol: string; label: string; value: number; unit: string }[];
  steps: NumericalStep[];
  conclusion: string;
}

export interface CalculatorParam {
  symbol: string;
  label: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  unit: string;
}

export interface CalculationResult {
  lsa: { label: string; formula: string; value: number; unit: string };
  tsa: { label: string; formula: string; value: number; unit: string };
  volume: { label: string; formula: string; value: number; unit: string };
  secondary?: { label: string; value: number | string; unit?: string };
}

export interface ShapeData {
  id: ShapeId;
  name: string;
  category: string;
  tagline: string;
  definition: string;
  color: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
  };
  properties: ShapeProperties;
  formulas: {
    lsa: FormulaItem;
    tsa: FormulaItem;
    volume: FormulaItem;
    variables: ShapeVariable[];
    specialNotes?: string;
  };
  realLifeExamples: RealLifeExample[];
  numericalExample: NumericalExampleData;
  calculator: {
    params: CalculatorParam[];
    calculate: (values: Record<string, number>) => CalculationResult;
  };
}
