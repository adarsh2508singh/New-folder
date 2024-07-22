import rawData from '../../public/Manufac _ India Agro Dataset.json';

type CropData = {
  Country: string;
  Year: string;
  'Crop Name': string;
  'Crop Production (UOM:t(Tonnes))': number | string;
  'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': number | string;
  'Area Under Cultivation (UOM:Ha(Hectares))': number | string;
};

type YearlyData = {
  year: number;
  maxCrop: string;
  minCrop: string;
};

type CropStats = {
  crop: string;
  avgYield: number;
  avgArea: number;
};

function processAgroData(data: CropData[]): { yearlyData: YearlyData[]; cropStats: CropStats[] } {
  const yearlyDataMap: { [year: number]: { maxCrop: string; maxProduction: number; minCrop: string; minProduction: number } } = {};
  const cropDataMap: { [crop: string]: { totalYield: number; totalArea: number; count: number } } = {};

  data.forEach((item) => {
    const yearMatch = item.Year.match(/\d+/);
    const year = yearMatch ? parseInt(yearMatch[0]) : 0;
    const crop = item['Crop Name'];
    const production = item['Crop Production (UOM:t(Tonnes))'] ? parseFloat(item['Crop Production (UOM:t(Tonnes))'] as string) : 0;
    const yieldValue = item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] ? parseFloat(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] as string) : 0;
    const area = item['Area Under Cultivation (UOM:Ha(Hectares))'] ? parseFloat(item['Area Under Cultivation (UOM:Ha(Hectares))'] as string) : 0;

    if (!yearlyDataMap[year]) {
      yearlyDataMap[year] = { maxCrop: crop, maxProduction: production, minCrop: crop, minProduction: production };
    } else {
      if (production > yearlyDataMap[year].maxProduction) {
        yearlyDataMap[year].maxCrop = crop;
        yearlyDataMap[year].maxProduction = production;
      }
      if (production < yearlyDataMap[year].minProduction) {
        yearlyDataMap[year].minCrop = crop;
        yearlyDataMap[year].minProduction = production;
      }
    }

    if (!cropDataMap[crop]) {
      cropDataMap[crop] = { totalYield: 0, totalArea: 0, count: 0 };
    }

    cropDataMap[crop].totalYield += yieldValue;
    cropDataMap[crop].totalArea += area;
    cropDataMap[crop].count += 1;
  });

  const yearlyData: YearlyData[] = Object.entries(yearlyDataMap).map(([year, data]) => ({
    year: parseInt(year),
    maxCrop: data.maxCrop,
    minCrop: data.minCrop,
  }));

  const cropStats = Object.keys(cropDataMap).map((crop) => ({
    crop,
    avgYield: parseFloat((cropDataMap[crop].totalYield / cropDataMap[crop].count).toFixed(3)),
    avgArea: parseFloat((cropDataMap[crop].totalArea / cropDataMap[crop].count).toFixed(3)),
  }));

  return { yearlyData, cropStats };
}

const { yearlyData, cropStats } = processAgroData(rawData);

export { yearlyData, cropStats, processAgroData };
