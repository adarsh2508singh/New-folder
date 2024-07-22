import React from 'react';
import { Table } from '@mantine/core';

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

const AgroTables: React.FC<{ yearlyData: YearlyData[]; cropStats: CropStats[] }> = ({ yearlyData, cropStats }) => {
  return (
    <div>
      <h2>Yearly Crop Production Data</h2>
      <Table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production</th>
            <th>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody style={{textAlign:"center"}}>
          {yearlyData.map((data) => (
            <tr key={data.year}>
              <td>{data.year}</td>
              <td>{data.maxCrop}</td>
              <td>{data.minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Crop Statistics (1950-2020)</h2>
      <Table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield (Kg/Ha)</th>
            <th>Average Cultivation Area (Ha)</th>
          </tr>
        </thead>
        <tbody style={{textAlign:"center"}}>
          {cropStats.map((crop) => (
            <tr key={crop.crop}>
              <td>{crop.crop}</td>
              <td>{crop.avgYield}</td>
              <td>{crop.avgArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AgroTables;
