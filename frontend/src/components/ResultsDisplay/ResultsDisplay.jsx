import React from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const ResultsContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
`;

const ChartContainer = styled.div`
  height: 300px;
`;

const StatisticsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const StatBox = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 15px;
  flex: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ResultsDisplay = ({ results }) => {
  if (!results || !results.counts) {
    return null;
  }

  const chartData = Object.entries(results.counts).map(([state, count]) => ({
    state,
    count,
    probability: count / results.shots
  }));

  const mostFrequentState = chartData.reduce(
    (max, current) => current.count > max.count ? current : max,
    chartData[0]
  );

  return (
    <ResultsContainer>
      <Title>Simulation Results</Title>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'probability') {
                  return [value.toFixed(4), 'Probability'];
                }
                return [value, 'Count'];
              }}
            />
            <Bar dataKey="count" fill="#2196F3" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <StatisticsContainer>
        <StatBox>
          <StatLabel>Total Shots</StatLabel>
          <StatValue>{results.shots}</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Most Frequent State</StatLabel>
          <StatValue>{mostFrequentState.state}</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Probability</StatLabel>
          <StatValue>
            {(mostFrequentState.probability * 100).toFixed(2)}%
          </StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Number of States</StatLabel>
          <StatValue>{chartData.length}</StatValue>
        </StatBox>
      </StatisticsContainer>
    </ResultsContainer>
  );
};

export default ResultsDisplay;