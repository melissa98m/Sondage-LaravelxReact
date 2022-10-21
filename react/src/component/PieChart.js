import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

const Chartdata = [
  { sexe: 'femme', val: 4119626293 },
  { sexe: 'homme', val: 1012956064 },

];

 class PieChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField= "femme"
            argumentField="sexe"
            innerRadius={0.7}
          />
           <PieSeries
           valueField= "homme"
            argumentField="sexe"
             innerRadius={0.7}
                    />
          <Title
            text="Sexe"
          />
        </Chart>
      </Paper>
    );
  }
}
export default PieChart;