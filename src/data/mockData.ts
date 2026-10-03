export interface GoldTickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface PairwiseData {
  pair: string;
  zScore: number;
  currentSpread: number;
  rollingMean: number;
  stdDev: number;
  upperBand: number;
  lowerBand: number;
  status: 'NORMAL' | 'DIVERGENT' | 'CONVERGENT';
  unit: string;
  chartData: {
    time: string;
    spread: number;
    mean: number;
    upperBand: number;
    lowerBand: number;
  }[];
}

export interface BacktestMetrics {
  totalTrades: number;
  winRate: number;
  grossPnl: number;
  maxDrawdown: number;
  profitFactor: number;
  sharpeRatio: number;
  annualizedReturn: number;
  alphaDecomposition: {
    underlyingGoldDrift: number;
    netRelativeValueReturn: number;
    marketBeta: number;
  };
}

export interface ContractLifecycleItem {
  symbol: string;
  expiry: string;
  dte: number;
  volume: number;
  openInterest: number;
  closePrice: number;
  status: 'ACTIVE' | 'EXPIRING_SOON';
}

export interface EquityCurvePoint {
  month: string;
  equity: number;
  benchmark: number;
}

// 1. Gold Ticker Data (GOLDM, GOLDTEN, GOLDGUINEA, GOLDPETAL)
export const goldTickerData: GoldTickerItem[] = [
  {
    symbol: 'GOLDM',
    name: 'Gold Mini (100g)',
    price: 72480,
    change: 305,
    changePercent: 0.42,
  },
  {
    symbol: 'GOLDTEN',
    name: 'Gold Ten (10g)',
    price: 72510,
    change: 312,
    changePercent: 0.43,
  },
  {
    symbol: 'GOLDGUINEA',
    name: 'Gold Guinea (8g)',
    price: 58120,
    change: 240,
    changePercent: 0.41,
  },
  {
    symbol: 'GOLDPETAL',
    name: 'Gold Petal (1g)',
    price: 7295,
    change: 32,
    changePercent: 0.44,
  },
];

// 2. Pairwise Intelligence Data
export const pairwiseData: PairwiseData = {
  pair: 'GOLDM - GOLDTEN (MCX)',
  zScore: 1.42,
  currentSpread: 30.0,
  rollingMean: 18.5,
  stdDev: 8.1,
  upperBand: 34.7,
  lowerBand: 2.3,
  status: 'NORMAL',
  unit: 'INR / 10g',
  chartData: [
    { time: '09:15', spread: 18.2, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '09:45', spread: 19.8, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '10:15', spread: 22.4, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '10:45', spread: 21.1, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '11:15', spread: 25.6, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '11:45', spread: 28.3, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '12:15', spread: 31.9, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '12:45', spread: 33.2, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '13:15', spread: 29.5, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '13:45', spread: 26.8, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '14:15', spread: 24.2, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '14:45', spread: 27.5, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '15:15', spread: 29.1, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '15:45', spread: 30.0, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '16:15', spread: 28.7, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '16:45', spread: 30.0, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
  ],
};

// 3. Backtest Metrics
export const backtestMetrics: BacktestMetrics = {
  totalTrades: 342,
  winRate: 68.4,
  grossPnl: 1485200,
  maxDrawdown: -3.82,
  profitFactor: 2.18,
  sharpeRatio: 2.41,
  annualizedReturn: 24.6,
  alphaDecomposition: {
    underlyingGoldDrift: 14.2,
    netRelativeValueReturn: 28.4,
    marketBeta: 0.12,
  },
};

// 4. Contract Lifecycle Data (10 contracts)
export const contractLifecycleData: ContractLifecycleItem[] = [
  {
    symbol: 'GOLDM 26OCT',
    expiry: '2026-10-25',
    dte: 28,
    volume: 14250,
    openInterest: 45200,
    closePrice: 72480,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDM 26NOV',
    expiry: '2026-11-25',
    dte: 59,
    volume: 8420,
    openInterest: 28100,
    closePrice: 72890,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDM 26DEC',
    expiry: '2026-12-24',
    dte: 88,
    volume: 3850,
    openInterest: 14900,
    closePrice: 73320,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDTEN 26OCT',
    expiry: '2026-10-01',
    dte: 4,
    volume: 22800,
    openInterest: 62400,
    closePrice: 72510,
    status: 'EXPIRING_SOON',
  },
  {
    symbol: 'GOLDTEN 26NOV',
    expiry: '2026-11-01',
    dte: 35,
    volume: 16100,
    openInterest: 38900,
    closePrice: 72940,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDGUINEA 26OCT',
    expiry: '2026-10-02',
    dte: 5,
    volume: 5200,
    openInterest: 11400,
    closePrice: 58120,
    status: 'EXPIRING_SOON',
  },
  {
    symbol: 'GOLDGUINEA 26NOV',
    expiry: '2026-11-02',
    dte: 36,
    volume: 3140,
    openInterest: 7850,
    closePrice: 58480,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDPETAL 26OCT',
    expiry: '2026-09-30',
    dte: 3,
    volume: 31500,
    openInterest: 89200,
    closePrice: 7295,
    status: 'EXPIRING_SOON',
  },
  {
    symbol: 'GOLDPETAL 26NOV',
    expiry: '2026-10-31',
    dte: 34,
    volume: 19800,
    openInterest: 54600,
    closePrice: 7340,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDM 27FEB',
    expiry: '2027-02-25',
    dte: 151,
    volume: 1420,
    openInterest: 6800,
    closePrice: 74150,
    status: 'ACTIVE',
  },
];

// 5. Equity Curve Data (12 points)
export const equityCurveData: EquityCurvePoint[] = [
  { month: 'Jan', equity: 1000000, benchmark: 1000000 },
  { month: 'Feb', equity: 1042000, benchmark: 1018000 },
  { month: 'Mar', equity: 1085000, benchmark: 1032000 },
  { month: 'Apr', equity: 1069000, benchmark: 1024000 },
  { month: 'May', equity: 1124000, benchmark: 1056000 },
  { month: 'Jun', equity: 1178000, benchmark: 1072000 },
  { month: 'Jul', equity: 1235000, benchmark: 1089000 },
  { month: 'Aug', equity: 1291000, benchmark: 1104000 },
  { month: 'Sep', equity: 1324000, benchmark: 1098000 },
  { month: 'Oct', equity: 1398000, benchmark: 1121000 },
  { month: 'Nov', equity: 1442000, benchmark: 1134000 },
  { month: 'Dec', equity: 1485200, benchmark: 1142000 },
];
