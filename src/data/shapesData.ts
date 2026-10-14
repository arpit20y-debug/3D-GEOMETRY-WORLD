import { ShapeData, ShapeId } from '../types/geometry';

export const SHAPES_DATA: Record<ShapeId, ShapeData> = {
  cube: {
    id: 'cube',
    name: 'Cube',
    category: 'Platonic Solid / Regular Hexahedron',
    tagline: 'The perfect three-dimensional symmetry with 6 identical square faces.',
    definition: 'A cube is a three-dimensional regular solid bounded by six congruent square faces, with three faces meeting at each of its eight vertices. All twelve of its edges have the exact same length.',
    color: {
      primary: '#06b6d4', // cyan-500
      secondary: '#0284c7', // light blue
      accent: '#38bdf8',
      glow: 'rgba(6, 182, 212, 0.4)',
    },
    properties: {
      faces: 6,
      edges: 12,
      vertices: 8,
      curvedSurfaces: 0,
      circularBases: 0,
      faceDescription: '6 congruent square faces',
      summaryPoints: [
        'All 6 faces are congruent squares',
        'All 12 edges are of equal length (a)',
        'All adjacent faces meet at exact 90° right angles',
        'Euler\'s formula holds: Faces (6) + Vertices (8) - Edges (12) = 2',
      ],
    },
    formulas: {
      lsa: {
        id: 'lsa',
        name: 'Lateral Surface Area (LSA)',
        shortFormula: '4a²',
        derivation: 'Area of 4 vertical walls = 4 × (a × a)',
        meaning: 'The sum of areas of the four vertical side faces, excluding the top and bottom faces.',
        unit: 'units²',
      },
      tsa: {
        id: 'tsa',
        name: 'Total Surface Area (TSA)',
        shortFormula: '6a²',
        derivation: 'Total area of all 6 square faces = 6 × a²',
        meaning: 'The total surface area enclosing the entire solid including top, bottom, and all 4 sides.',
        unit: 'units²',
      },
      volume: {
        id: 'volume',
        name: 'Volume (V)',
        shortFormula: 'a³',
        derivation: 'Base area × height = (a × a) × a = a³',
        meaning: 'The amount of 3-dimensional space contained inside the cube.',
        unit: 'units³',
      },
      variables: [
        { symbol: 'a', name: 'Edge Length', description: 'The length of any side of the cube', unit: 'cm / m' },
      ],
      specialNotes: 'For a cube of side a, the space diagonal length is d = a√3 ≈ 1.732a.',
    },
    realLifeExamples: [
      { name: 'Playing Dice', description: 'Standard 6-sided game dice used worldwide.', category: 'Games & Toys', emoji: '🎲' },
      { name: 'Rubik’s Cube', description: 'Classic 3D mechanical combination puzzle made of sub-cubes.', category: 'Puzzles', emoji: '🧩' },
      { name: 'Sugar Cubes', description: 'Precisely pressed granulated sugar crystals.', category: 'Food & Culinary', emoji: '🧊' },
      { name: 'Square Gift Box', description: 'Equilateral gift packaging boxes with balanced volume.', category: 'Packaging', emoji: '🎁' },
    ],
    numericalExample: {
      title: 'Problem: Calculate LSA, TSA, and Volume of a Cube',
      scenario: 'A solid cubic wooden block has an edge length of a = 5 cm. Find its Lateral Surface Area, Total Surface Area, and Volume.',
      given: [
        { symbol: 'a', label: 'Side / Edge length', value: 5, unit: 'cm' },
      ],
      steps: [
        {
          label: 'Step 1: Calculate Lateral Surface Area (LSA)',
          formula: 'LSA = 4a²',
          substitution: 'LSA = 4 × (5 cm)²',
          calculation: '4 × 25 cm²',
          result: '100 cm²',
        },
        {
          label: 'Step 2: Calculate Total Surface Area (TSA)',
          formula: 'TSA = 6a²',
          substitution: 'TSA = 6 × (5 cm)²',
          calculation: '6 × 25 cm²',
          result: '150 cm²',
        },
        {
          label: 'Step 3: Calculate Volume (V)',
          formula: 'Volume = a³',
          substitution: 'Volume = (5 cm)³',
          calculation: '5 × 5 × 5 cm³',
          result: '125 cm³',
        },
      ],
      conclusion: 'For a side length of 5 cm, the cube has an LSA of 100 cm², a TSA of 150 cm², and holds a volume of 125 cm³.',
    },
    calculator: {
      params: [
        { symbol: 'a', label: 'Edge length (a)', defaultValue: 5, min: 1, max: 20, step: 0.5, unit: 'cm' },
      ],
      calculate: (vals) => {
        const a = vals.a || 1;
        const lsa = 4 * a * a;
        const tsa = 6 * a * a;
        const volume = a * a * a;
        return {
          lsa: { label: 'Lateral Surface Area', formula: '4a²', value: Number(lsa.toFixed(2)), unit: 'cm²' },
          tsa: { label: 'Total Surface Area', formula: '6a²', value: Number(tsa.toFixed(2)), unit: 'cm²' },
          volume: { label: 'Volume', formula: 'a³', value: Number(volume.toFixed(2)), unit: 'cm³' },
          secondary: { label: 'Space Diagonal (a√3)', value: Number((a * Math.sqrt(3)).toFixed(2)), unit: 'cm' },
        };
      },
    },
  },

  cuboid: {
    id: 'cuboid',
    name: 'Cuboid',
    category: 'Rectangular Prism / Polyhedron',
    tagline: 'The universal building block of architecture with 6 rectangular faces.',
    definition: 'A cuboid is a convex polyhedron bounded by six rectangular faces. Opposite faces are congruent and parallel, and all adjacent faces meet at 90° angles. Also known as a rectangular parallelepiped or rectangular prism.',
    color: {
      primary: '#3b82f6', // blue-500
      secondary: '#1d4ed8', // blue-700
      accent: '#60a5fa',
      glow: 'rgba(59, 130, 246, 0.4)',
    },
    properties: {
      faces: 6,
      edges: 12,
      vertices: 8,
      curvedSurfaces: 0,
      circularBases: 0,
      faceDescription: '6 rectangular faces (3 pairs of parallel rectangles)',
      summaryPoints: [
        'Opposite rectangular faces are identical in area',
        'Has 3 distinct dimensions: length (l), breadth (b), and height (h)',
        'Contains 4 length edges, 4 breadth edges, and 4 height edges',
        'Euler\'s formula: 6 (Faces) + 8 (Vertices) - 12 (Edges) = 2',
      ],
    },
    formulas: {
      lsa: {
        id: 'lsa',
        name: 'Lateral Surface Area (LSA)',
        shortFormula: '2h(l + b)',
        derivation: 'Area of 4 vertical walls = 2(l × h) + 2(b × h) = 2h(l + b)',
        meaning: 'The surface area of the four side walls, excluding the ceiling (top) and floor (bottom).',
        unit: 'units²',
      },
      tsa: {
        id: 'tsa',
        name: 'Total Surface Area (TSA)',
        shortFormula: '2(lb + bh + hl)',
        derivation: '2 × (top/bottom + front/back + left/right) = 2(lb + bh + hl)',
        meaning: 'The total surface area enclosing all 6 rectangular outer surfaces.',
        unit: 'units²',
      },
      volume: {
        id: 'volume',
        name: 'Volume (V)',
        shortFormula: 'l × b × h',
        derivation: 'Base Area × Height = (length × breadth) × height',
        meaning: 'The total capacity or 3D volume enclosed within the cuboid.',
        unit: 'units³',
      },
      variables: [
        { symbol: 'l', name: 'Length', description: 'The longest horizontal base edge', unit: 'cm / m' },
        { symbol: 'b', name: 'Breadth / Width', description: 'The shorter horizontal base edge', unit: 'cm / m' },
        { symbol: 'h', name: 'Height', description: 'The vertical elevation distance', unit: 'cm / m' },
      ],
      specialNotes: 'The internal diagonal length of a cuboid is given by d = √(l² + b² + h²).',
    },
    realLifeExamples: [
      { name: 'Hardcover Book', description: 'Standard educational textbooks and notebooks.', category: 'Stationery', emoji: '📚' },
      { name: 'Construction Brick', description: 'Standard red masonry building blocks.', category: 'Architecture', emoji: '🧱' },
      { name: 'Shoebox', description: 'Everyday footwear and storage packaging containers.', category: 'Everyday Objects', emoji: '📦' },
      { name: 'Shipping Container', description: 'Intermodal freight containers used across oceans.', category: 'Logistics', emoji: '🚢' },
    ],
    numericalExample: {
      title: 'Problem: Calculate LSA, TSA, and Volume of a Cuboid',
      scenario: 'A rectangular brick has length l = 8 cm, breadth b = 5 cm, and height h = 4 cm. Determine its Lateral Surface Area, Total Surface Area, and Volume.',
      given: [
        { symbol: 'l', label: 'Length', value: 8, unit: 'cm' },
        { symbol: 'b', label: 'Breadth', value: 5, unit: 'cm' },
        { symbol: 'h', label: 'Height', value: 4, unit: 'cm' },
      ],
      steps: [
        {
          label: 'Step 1: Calculate Lateral Surface Area (LSA)',
          formula: 'LSA = 2h(l + b)',
          substitution: 'LSA = 2 × 4 cm × (8 cm + 5 cm)',
          calculation: '8 × 13 cm²',
          result: '104 cm²',
        },
        {
          label: 'Step 2: Calculate Total Surface Area (TSA)',
          formula: 'TSA = 2(lb + bh + hl)',
          substitution: 'TSA = 2 × [(8 × 5) + (5 × 4) + (4 × 8)]',
          calculation: '2 × [40 + 20 + 32] = 2 × 92 cm²',
          result: '184 cm²',
        },
        {
          label: 'Step 3: Calculate Volume (V)',
          formula: 'Volume = l × b × h',
          substitution: 'Volume = 8 cm × 5 cm × 4 cm',
          calculation: '40 × 4 cm³',
          result: '160 cm³',
        },
      ],
      conclusion: 'The brick has a Lateral Surface Area of 104 cm², a Total Surface Area of 184 cm², and an internal Volume of 160 cm³.',
    },
    calculator: {
      params: [
        { symbol: 'l', label: 'Length (l)', defaultValue: 8, min: 1, max: 25, step: 0.5, unit: 'cm' },
        { symbol: 'b', label: 'Breadth (b)', defaultValue: 5, min: 1, max: 20, step: 0.5, unit: 'cm' },
        { symbol: 'h', label: 'Height (h)', defaultValue: 4, min: 1, max: 20, step: 0.5, unit: 'cm' },
      ],
      calculate: (vals) => {
        const l = vals.l || 1;
        const b = vals.b || 1;
        const h = vals.h || 1;
        const lsa = 2 * h * (l + b);
        const tsa = 2 * (l * b + b * h + h * l);
        const volume = l * b * h;
        const diag = Math.sqrt(l * l + b * b + h * h);
        return {
          lsa: { label: 'Lateral Surface Area', formula: '2h(l + b)', value: Number(lsa.toFixed(2)), unit: 'cm²' },
          tsa: { label: 'Total Surface Area', formula: '2(lb + bh + hl)', value: Number(tsa.toFixed(2)), unit: 'cm²' },
          volume: { label: 'Volume', formula: 'l × b × h', value: Number(volume.toFixed(2)), unit: 'cm³' },
          secondary: { label: 'Body Diagonal (√(l²+b²+h²))', value: Number(diag.toFixed(2)), unit: 'cm' },
        };
      },
    },
  },

  cylinder: {
    id: 'cylinder',
    name: 'Cylinder',
    category: 'Curved Solid of Revolution',
    tagline: 'Smooth curvature connecting two parallel, identical circular bases.',
    definition: 'A right circular cylinder is a three-dimensional curved geometric solid formed by rolling a rectangle around one of its sides. It is bounded by a curved lateral surface and two congruent parallel circular bases.',
    color: {
      primary: '#0ea5e9', // sky-500
      secondary: '#0369a1', // sky-700
      accent: '#38bdf8',
      glow: 'rgba(14, 165, 233, 0.4)',
    },
    properties: {
      faces: 3,
      edges: 2,
      vertices: 0,
      curvedSurfaces: 1,
      circularBases: 2,
      faceDescription: '2 flat circular bases + 1 curved lateral surface',
      summaryPoints: [
        'Two circular bases are parallel and congruent (radius r)',
        'One continuous curved surface connects both circles',
        'Has 2 curved circular edges and zero sharp corners/vertices',
        'When unwrapped, the curved surface forms a rectangle of length 2πr and height h',
      ],
    },
    formulas: {
      lsa: {
        id: 'lsa',
        name: 'Curved Surface Area (CSA)',
        shortFormula: '2πrh',
        derivation: 'Perimeter of circular base × height = (2πr) × h',
        meaning: 'The surface area of only the curved jacket around the cylinder, excluding top & bottom circular bases.',
        unit: 'units²',
      },
      tsa: {
        id: 'tsa',
        name: 'Total Surface Area (TSA)',
        shortFormula: '2πr(r + h)',
        derivation: 'CSA + 2 × (Area of circular base) = 2πrh + 2πr² = 2πr(r + h)',
        meaning: 'The complete exterior surface area of the cylinder (curved surface plus both flat circular ends).',
        unit: 'units²',
      },
      volume: {
        id: 'volume',
        name: 'Volume (V)',
        shortFormula: 'πr²h',
        derivation: 'Circular Base Area × Height = (πr²) × h',
        meaning: 'The internal liquid or solid holding capacity of the cylinder.',
        unit: 'units³',
      },
      variables: [
        { symbol: 'r', name: 'Radius of circular base', description: 'Distance from circle center to boundary', unit: 'cm / m' },
        { symbol: 'h', name: 'Height', description: 'Perpendicular distance between both circular bases', unit: 'cm / m' },
        { symbol: 'π', name: 'Pi (Constant)', description: 'Ratio of circumference to diameter (≈ 22/7 or 3.14159)' },
      ],
      specialNotes: 'Using π ≈ 22/7 gives exact integers when radius is a multiple of 7.',
    },
    realLifeExamples: [
      { name: 'Cold Drink Can', description: 'Aluminum beverage cans designed for maximum pressure retention.', category: 'Beverages', emoji: '🥫' },
      { name: 'Cylindrical Container', description: 'Kitchen food jars, tennis ball tubes, and thermos flasks.', category: 'Storage', emoji: '🫙' },
      { name: 'Water Pipe / Conduit', description: 'Plumbing conduits for steady hydrodynamic fluid flow.', category: 'Infrastructure', emoji: '🚰' },
      { name: 'Battery Cell (AA/AAA)', description: 'Everyday electrochemical dry cell batteries.', category: 'Electronics', emoji: '🔋' },
    ],
    numericalExample: {
      title: 'Problem: Calculate CSA, TSA, and Volume of a Cylinder',
      scenario: 'A cylindrical water storage tank has a base radius of r = 7 cm and a vertical height of h = 10 cm. Using π = 22/7, find its CSA, TSA, and Volume.',
      given: [
        { symbol: 'r', label: 'Radius (r)', value: 7, unit: 'cm' },
        { symbol: 'h', label: 'Height (h)', value: 10, unit: 'cm' },
        { symbol: 'π', label: 'Pi value', value: 22 / 7, unit: 'constant (22/7)' },
      ],
      steps: [
        {
          label: 'Step 1: Calculate Curved Surface Area (CSA)',
          formula: 'CSA = 2πrh',
          substitution: 'CSA = 2 × (22/7) × 7 cm × 10 cm',
          calculation: '2 × 22 × 10 cm²',
          result: '440 cm²',
        },
        {
          label: 'Step 2: Calculate Total Surface Area (TSA)',
          formula: 'TSA = 2πr(r + h)',
          substitution: 'TSA = 2 × (22/7) × 7 cm × (7 cm + 10 cm)',
          calculation: '44 × 17 cm²',
          result: '748 cm²',
        },
        {
          label: 'Step 3: Calculate Volume (V)',
          formula: 'Volume = πr²h',
          substitution: 'Volume = (22/7) × (7 cm)² × 10 cm',
          calculation: '(22/7) × 49 × 10 = 154 × 10 cm³',
          result: '1540 cm³',
        },
      ],
      conclusion: 'The cylinder has a Curved Surface Area of 440 cm², a Total Surface Area of 748 cm², and a holding Volume of 1540 cm³ (or 1.54 Liters).',
    },
    calculator: {
      params: [
        { symbol: 'r', label: 'Radius (r)', defaultValue: 7, min: 1, max: 25, step: 0.5, unit: 'cm' },
        { symbol: 'h', label: 'Height (h)', defaultValue: 10, min: 1, max: 30, step: 0.5, unit: 'cm' },
      ],
      calculate: (vals) => {
        const r = vals.r || 1;
        const h = vals.h || 1;
        const csa = 2 * Math.PI * r * h;
        const tsa = 2 * Math.PI * r * (r + h);
        const volume = Math.PI * r * r * h;
        return {
          lsa: { label: 'Curved Surface Area (CSA)', formula: '2πrh', value: Number(csa.toFixed(2)), unit: 'cm²' },
          tsa: { label: 'Total Surface Area (TSA)', formula: '2πr(r + h)', value: Number(tsa.toFixed(2)), unit: 'cm²' },
          volume: { label: 'Volume', formula: 'πr²h', value: Number(volume.toFixed(2)), unit: 'cm³' },
          secondary: { label: 'Base Area (πr²)', value: Number((Math.PI * r * r).toFixed(2)), unit: 'cm²' },
        };
      },
    },
  },

  cone: {
    id: 'cone',
    name: 'Cone',
    category: 'Conical Solid of Revolution',
    tagline: 'A sharp apex tapering gracefully down to a circular base.',
    definition: 'A right circular cone is a three-dimensional geometric shape that tapers smoothly from a flat circular base to a single sharp point called the apex or vertex. The line segment connecting the apex to the center of the base is perpendicular to the base.',
    color: {
      primary: '#6366f1', // indigo-500
      secondary: '#4338ca', // indigo-700
      accent: '#818cf8',
      glow: 'rgba(99, 102, 241, 0.4)',
    },
    properties: {
      faces: 2,
      edges: 1,
      vertices: 1,
      curvedSurfaces: 1,
      circularBases: 1,
      faceDescription: '1 flat circular base + 1 curved conical surface',
      summaryPoints: [
        'Has exactly 1 circular base at the bottom',
        'Has exactly 1 vertex (the apex point at top)',
        'Has 1 curved circular boundary edge',
        'Important distinction: h is vertical height; l is slant height along the side',
        'Pythagorean theorem links them: l = √(r² + h²)',
      ],
    },
    formulas: {
      lsa: {
        id: 'lsa',
        name: 'Curved Surface Area (CSA)',
        shortFormula: 'πrl',
        derivation: 'Sector of a circle unwrapped with radius l and arc length 2πr = ½ × 2πr × l = πrl',
        meaning: 'The outer curved slope area of the cone, excluding the bottom circular base.',
        unit: 'units²',
      },
      tsa: {
        id: 'tsa',
        name: 'Total Surface Area (TSA)',
        shortFormula: 'πr(l + r)',
        derivation: 'CSA + Base Area = πrl + πr² = πr(l + r)',
        meaning: 'The entire exterior surface area including both the curved conical slope and flat bottom base.',
        unit: 'units²',
      },
      volume: {
        id: 'volume',
        name: 'Volume (V)',
        shortFormula: '⅓πr²h',
        derivation: 'Exactly ⅓ of the volume of a cylinder with identical base radius and height: ⅓(πr²h)',
        meaning: 'The 3D space contained inside the cone.',
        unit: 'units³',
      },
      variables: [
        { symbol: 'r', name: 'Base Radius', description: 'Radius of the flat circular base', unit: 'cm / m' },
        { symbol: 'h', name: 'Vertical Height', description: 'Perpendicular height from apex to center of base', unit: 'cm / m' },
        { symbol: 'l', name: 'Slant Height', description: 'Distance along the curved slope from apex to base rim: l = √(r² + h²)', unit: 'cm / m' },
        { symbol: 'π', name: 'Pi (Constant)', description: 'Mathematical constant ≈ 22/7 or 3.14159' },
      ],
      specialNotes: 'Always verify whether a question gives the slant height (l) or vertical height (h). If h is given, calculate l = √(r² + h²).',
    },
    realLifeExamples: [
      { name: 'Ice Cream Cone', description: 'Waffle and wafer cones engineered to hold ice cream scoops.', category: 'Food & Culinary', emoji: '🍦' },
      { name: 'Traffic Safety Cone', description: 'Bright orange road-marker cones with stable weighted bases.', category: 'Safety', emoji: '🪧' },
      { name: 'Celebration Party Hat', description: 'Festive decorative headgear formed by rolling a sector of paper.', category: 'Celebration', emoji: '🎉' },
      { name: 'Laboratory Funnel', description: 'Conical tool for pouring liquids into narrow-necked flasks.', category: 'Science Lab', emoji: '🧪' },
    ],
    numericalExample: {
      title: 'Problem: Calculate Slant Height, CSA, TSA, and Volume of a Cone',
      scenario: 'A party hat in the shape of a cone has a base radius r = 3 cm and a vertical height h = 4 cm. Find its slant height (l), CSA, TSA, and Volume.',
      given: [
        { symbol: 'r', label: 'Base radius (r)', value: 3, unit: 'cm' },
        { symbol: 'h', label: 'Vertical height (h)', value: 4, unit: 'cm' },
      ],
      steps: [
        {
          label: 'Step 1: Find Slant Height (l) using Pythagoras theorem',
          formula: 'l = √(r² + h²)',
          substitution: 'l = √(3² + 4²) = √(9 + 16)',
          calculation: '√25',
          result: '5 cm',
        },
        {
          label: 'Step 2: Calculate Curved Surface Area (CSA)',
          formula: 'CSA = πrl',
          substitution: 'CSA = π × 3 cm × 5 cm',
          calculation: '15 × 3.1416 cm²',
          result: '47.12 cm²',
        },
        {
          label: 'Step 3: Calculate Total Surface Area (TSA)',
          formula: 'TSA = πr(l + r)',
          substitution: 'TSA = π × 3 cm × (5 cm + 3 cm)',
          calculation: '3π × 8 = 24 × 3.1416 cm²',
          result: '75.40 cm²',
        },
        {
          label: 'Step 4: Calculate Volume (V)',
          formula: 'Volume = ⅓πr²h',
          substitution: 'Volume = ⅓ × π × (3 cm)² × 4 cm',
          calculation: '⅓ × π × 9 × 4 = 12 × 3.1416 cm³',
          result: '37.70 cm³',
        },
      ],
      conclusion: 'With r = 3 cm and h = 4 cm, the slant height is 5 cm, CSA is 47.12 cm², TSA is 75.40 cm², and Volume is 37.70 cm³.',
    },
    calculator: {
      params: [
        { symbol: 'r', label: 'Base Radius (r)', defaultValue: 3, min: 1, max: 20, step: 0.5, unit: 'cm' },
        { symbol: 'h', label: 'Vertical Height (h)', defaultValue: 4, min: 1, max: 25, step: 0.5, unit: 'cm' },
      ],
      calculate: (vals) => {
        const r = vals.r || 1;
        const h = vals.h || 1;
        const l = Math.sqrt(r * r + h * h);
        const csa = Math.PI * r * l;
        const tsa = Math.PI * r * (l + r);
        const volume = (1 / 3) * Math.PI * r * r * h;
        return {
          lsa: { label: 'Curved Surface Area (CSA)', formula: 'πrl', value: Number(csa.toFixed(2)), unit: 'cm²' },
          tsa: { label: 'Total Surface Area (TSA)', formula: 'πr(l + r)', value: Number(tsa.toFixed(2)), unit: 'cm²' },
          volume: { label: 'Volume', formula: '⅓πr²h', value: Number(volume.toFixed(2)), unit: 'cm³' },
          secondary: { label: 'Slant Height (l = √(r²+h²))', value: Number(l.toFixed(2)), unit: 'cm' },
        };
      },
    },
  },

  sphere: {
    id: 'sphere',
    name: 'Sphere',
    category: 'Perfect Curved Solid',
    tagline: 'Flawless 360-degree roundness where every surface point is equidistant from the center.',
    definition: 'A sphere is a perfectly symmetrical three-dimensional round geometric object. Every point on its exterior surface lies at an exact fixed distance (radius r) from a single internal center point. It has zero edges and zero vertices.',
    color: {
      primary: '#06b6d4', // cyan-500
      secondary: '#0891b2', // cyan-600
      accent: '#22d3ee',
      glow: 'rgba(6, 182, 212, 0.45)',
    },
    properties: {
      faces: 1,
      edges: 0,
      vertices: 0,
      curvedSurfaces: 1,
      circularBases: 0,
      faceDescription: '1 continuous seamless curved surface',
      summaryPoints: [
        'Has exactly 1 continuous seamless curved surface',
        'Has 0 flat faces, 0 straight edges, and 0 vertices',
        'Has maximum volume for any given surface area (isoperimetric quotient = 1)',
        'Every cross-section slicing through a sphere produces a perfect circle',
      ],
    },
    formulas: {
      lsa: {
        id: 'lsa',
        name: 'Surface Area',
        shortFormula: '4πr²',
        derivation: 'Archimedes demonstrated that the surface area equals exactly 4 times the area of its great circle (4 × πr²)',
        meaning: 'The total outer skin surface area enclosing the sphere.',
        unit: 'units²',
      },
      tsa: {
        id: 'tsa',
        name: 'Total Surface Area',
        shortFormula: '4πr²',
        derivation: 'Because a sphere has only one continuous curved surface and no bases, TSA = Surface Area = 4πr²',
        meaning: 'Identical to the surface area for a full sphere.',
        unit: 'units²',
      },
      volume: {
        id: 'volume',
        name: 'Volume (V)',
        shortFormula: '⁴⁄₃πr³',
        derivation: 'Sum of infinite infinitesimal pyramids with vertex at center: ⅓ × Base (4πr²) × Height (r) = ⁴⁄₃πr³',
        meaning: 'The total 3D space occupied inside the sphere.',
        unit: 'units³',
      },
      variables: [
        { symbol: 'r', name: 'Radius (r)', description: 'Straight-line distance from sphere center to any surface point', unit: 'cm / m' },
        { symbol: 'd', name: 'Diameter (2r)', description: 'Total width passing through center point: d = 2r', unit: 'cm / m' },
        { symbol: 'π', name: 'Pi (Constant)', description: 'Mathematical constant ≈ 22/7 or 3.14159' },
      ],
      specialNotes: 'A sphere encloses the maximum possible volume for a fixed surface area, making it nature\'s choice for bubbles and planets.',
    },
    realLifeExamples: [
      { name: 'Football / Soccer Ball', description: 'Pressurized spherical sports balls for uniform aerodynamic bounce.', category: 'Sports', emoji: '⚽' },
      { name: 'Basketball', description: 'Spherical rubber ball with grip-enhancing pebble texturing.', category: 'Sports', emoji: '🏀' },
      { name: 'Globe / Planet Earth', description: 'Astronomical representation of our planetary celestial body.', category: 'Astronomy', emoji: '🌍' },
      { name: 'Glass Marble', description: 'Precision glass spheres with internal decorative swirls.', category: 'Everyday Physics', emoji: '🔮' },
    ],
    numericalExample: {
      title: 'Problem: Calculate Surface Area and Volume of a Sphere',
      scenario: 'A spherical metal ball bearing has a radius of r = 7 cm. Using π = 22/7, calculate its Surface Area and Volume.',
      given: [
        { symbol: 'r', label: 'Radius (r)', value: 7, unit: 'cm' },
        { symbol: 'π', label: 'Pi value', value: 22 / 7, unit: 'constant (22/7)' },
      ],
      steps: [
        {
          label: 'Step 1: Calculate Surface Area',
          formula: 'Surface Area = 4πr²',
          substitution: 'SA = 4 × (22/7) × (7 cm)²',
          calculation: '4 × (22/7) × 49 = 4 × 22 × 7 = 4 × 154 cm²',
          result: '616 cm²',
        },
        {
          label: 'Step 2: Calculate Volume (V)',
          formula: 'Volume = ⁴⁄₃πr³',
          substitution: 'Volume = ⁴⁄₃ × (22/7) × (7 cm)³',
          calculation: '⁴⁄₃ × (22/7) × 343 = ⁴⁄₃ × 1078 = 4312 / 3 cm³',
          result: '1437.33 cm³',
        },
      ],
      conclusion: 'For a radius of 7 cm, the sphere has an outer surface area of 616 cm² and an internal capacity/volume of 1437.33 cm³.',
    },
    calculator: {
      params: [
        { symbol: 'r', label: 'Radius (r)', defaultValue: 7, min: 1, max: 25, step: 0.5, unit: 'cm' },
      ],
      calculate: (vals) => {
        const r = vals.r || 1;
        const sa = 4 * Math.PI * r * r;
        const volume = (4 / 3) * Math.PI * r * r * r;
        return {
          lsa: { label: 'Surface Area', formula: '4πr²', value: Number(sa.toFixed(2)), unit: 'cm²' },
          tsa: { label: 'Total Surface Area', formula: '4πr²', value: Number(sa.toFixed(2)), unit: 'cm²' },
          volume: { label: 'Volume', formula: '⁴⁄₃πr³', value: Number(volume.toFixed(2)), unit: 'cm³' },
          secondary: { label: 'Great Circle Area (πr²)', value: Number((Math.PI * r * r).toFixed(2)), unit: 'cm²' },
        };
      },
    },
  },

  hemisphere: {
    id: 'hemisphere',
    name: 'Hemisphere',
    category: 'Halved Spherical Solid',
    tagline: 'Half of a sphere created by a cross-sectional plane through its center.',
    definition: 'A hemisphere is a 3-dimensional geometric shape formed by cutting a solid sphere directly in half along a plane passing through its center. It possesses one curved dome surface and one flat circular base.',
    color: {
      primary: '#38bdf8', // sky-400
      secondary: '#0284c7', // sky-600
      accent: '#7dd3fc',
      glow: 'rgba(56, 189, 248, 0.45)',
    },
    properties: {
      faces: 2,
      edges: 1,
      vertices: 0,
      curvedSurfaces: 1,
      circularBases: 1,
      faceDescription: '1 curved dome surface + 1 flat circular base',
      summaryPoints: [
        'Has 1 curved dome surface (area = 2πr²)',
        'Has 1 flat circular base (area = πr²)',
        'Has 1 circular perimeter boundary edge',
        'Has 0 vertices/corners',
        'Volume is exactly half of a full sphere: ½ × (⁴⁄₃πr³) = ⅔πr³',
      ],
    },
    formulas: {
      lsa: {
        id: 'lsa',
        name: 'Curved Surface Area (CSA)',
        shortFormula: '2πr²',
        derivation: 'Exactly half of the full sphere\'s surface area = ½ × (4πr²) = 2πr²',
        meaning: 'The area of the curved dome exterior, excluding the flat circular bottom.',
        unit: 'units²',
      },
      tsa: {
        id: 'tsa',
        name: 'Total Surface Area (TSA)',
        shortFormula: '3πr²',
        derivation: 'Curved dome area + Flat circular base area = 2πr² + πr² = 3πr²',
        meaning: 'The entire exterior surface area of a solid hemisphere including both the dome and bottom flat disc.',
        unit: 'units²',
      },
      volume: {
        id: 'volume',
        name: 'Volume (V)',
        shortFormula: '⅔πr³',
        derivation: 'Exactly half of a full sphere volume = ½ × (⁴⁄₃πr³) = ⅔πr³',
        meaning: 'The internal liquid or solid holding capacity inside the hemisphere.',
        unit: 'units³',
      },
      variables: [
        { symbol: 'r', name: 'Radius (r)', description: 'Radius of both the flat circular base and the curved dome', unit: 'cm / m' },
        { symbol: 'π', name: 'Pi (Constant)', description: 'Mathematical constant ≈ 22/7 or 3.14159' },
      ],
      specialNotes: 'Note the crucial difference: CSA is 2πr² (for a hollow hemisphere/bowl), while TSA is 3πr² (for a solid hemisphere with its flat circular lid).',
    },
    realLifeExamples: [
      { name: 'Hemispherical Bowl', description: 'Kitchen cereal and soup mixing bowls.', category: 'Kitchenware', emoji: '🥣' },
      { name: 'Architectural Dome', description: 'Hemispherical cupolas atop planetariums, observatories, and monument halls.', category: 'Architecture', emoji: '🏛️' },
      { name: 'Igloo Shelter', description: 'Traditional dome-shaped snow dwelling blocks.', category: 'Shelter', emoji: '🛖' },
      { name: 'Half an Orange', description: 'A freshly sliced citrus fruit showing circular cross section.', category: 'Nature & Food', emoji: '🍊' },
    ],
    numericalExample: {
      title: 'Problem: Calculate CSA, TSA, and Volume of a Solid Hemisphere',
      scenario: 'A decorative solid marble bowl is in the shape of a hemisphere with radius r = 7 cm. Using π = 22/7, find its CSA, TSA, and Volume.',
      given: [
        { symbol: 'r', label: 'Radius (r)', value: 7, unit: 'cm' },
        { symbol: 'π', label: 'Pi value', value: 22 / 7, unit: 'constant (22/7)' },
      ],
      steps: [
        {
          label: 'Step 1: Calculate Curved Surface Area (CSA)',
          formula: 'CSA = 2πr²',
          substitution: 'CSA = 2 × (22/7) × (7 cm)²',
          calculation: '2 × 22 × 7 = 2 × 154 cm²',
          result: '308 cm²',
        },
        {
          label: 'Step 2: Calculate Total Surface Area (TSA)',
          formula: 'TSA = 3πr²',
          substitution: 'TSA = 3 × (22/7) × (7 cm)²',
          calculation: '3 × 154 cm²',
          result: '462 cm²',
        },
        {
          label: 'Step 3: Calculate Volume (V)',
          formula: 'Volume = ⅔πr³',
          substitution: 'Volume = ⅔ × (22/7) × (7 cm)³',
          calculation: '⅔ × 1078 = 2156 / 3 cm³',
          result: '718.67 cm³',
        },
      ],
      conclusion: 'The solid hemisphere has a Curved Surface Area of 308 cm², a Total Surface Area of 462 cm², and holds a volume of 718.67 cm³.',
    },
    calculator: {
      params: [
        { symbol: 'r', label: 'Radius (r)', defaultValue: 7, min: 1, max: 25, step: 0.5, unit: 'cm' },
      ],
      calculate: (vals) => {
        const r = vals.r || 1;
        const csa = 2 * Math.PI * r * r;
        const tsa = 3 * Math.PI * r * r;
        const volume = (2 / 3) * Math.PI * r * r * r;
        return {
          lsa: { label: 'Curved Surface Area (CSA)', formula: '2πr²', value: Number(csa.toFixed(2)), unit: 'cm²' },
          tsa: { label: 'Total Surface Area (TSA)', formula: '3πr²', value: Number(tsa.toFixed(2)), unit: 'cm²' },
          volume: { label: 'Volume', formula: '⅔πr³', value: Number(volume.toFixed(2)), unit: 'cm³' },
          secondary: { label: 'Circular Base Area (πr²)', value: Number((Math.PI * r * r).toFixed(2)), unit: 'cm²' },
        };
      },
    },
  },
};

export const SHAPES_LIST: ShapeData[] = [
  SHAPES_DATA.cube,
  SHAPES_DATA.cuboid,
  SHAPES_DATA.cylinder,
  SHAPES_DATA.cone,
  SHAPES_DATA.sphere,
  SHAPES_DATA.hemisphere,
];
