import React, { Component, PropTypes } from 'react';
import { ControlLabel } from 'react-bootstrap';
import {
  ResponsiveContainer,
  AreaChart,
  defs,
  linearGradient,
  XAxis,
  YAxis,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { scaleTime, timeDay } from 'd3';
import moment from 'moment';

const getTicks = (data) => {
  if (!data || !data.length) {
    return [];
  }
  const domain = [
    new Date(data[0].time),
    new Date(data[data.length - 1].time)
  ];
  const scale = scaleTime().domain(domain).range([0, 1]);
  const ticks = scale.ticks(timeDay, 1);
  return ticks.map(entry => +entry);
};

const getTicksData = (data, ticks) => {
  if (!data || !data.length) {
    return [];
  }
  const dataMap = new Map(data.map(i => [i.time, i]));
  ticks.forEach((item) => {
    if (!dataMap.has(item)) {
      data.push({ time: item });
    }
  });
  return data;
};

const dateFormat = time => moment(time).format('MM/DD');

class Charts extends Component {
  static propTypes = {
    danger: PropTypes.object,
    safe: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      weekData: null,
      timelineData: null,
    };
  }

  componentWillMount() {
    this.init();
  }

  init = () => {
    const timeline = {};
    const week = {
      Mon: { day: 'Mon', safe: 0, danger: 0 },
      Tue: { day: 'Tue', safe: 0, danger: 0 },
      Wed: { day: 'Wed', safe: 0, danger: 0 },
      Thu: { day: 'Thu', safe: 0, danger: 0 },
      Fri: { day: 'Fri', safe: 0, danger: 0 },
      Sat: { day: 'Sat', safe: 0, danger: 0 },
      Sun: { day: 'Sun', safe: 0, danger: 0 },
    };
    let timelineData = [];
    let weekData = [];
    if (this.props.safe || this.props.danger) {
      if (this.props.safe) {
        this.props.safe.map((entry) => {
          const timestamp = new Date(entry.node.timestamp);
          const day = timestamp.toString().substring(0, 3);
          timestamp.setHours(0, 0, 0, 0);
          const time = timestamp.getTime();
          if (timeline[time]) {
            timeline[time].safe += 1;
          } else {
            timeline[time] = { safe: 1, danger: 0, time };
          }
          week[day].safe += 1;
          return null;
        });
      }
      if (this.props.danger) {
        this.props.danger.map((entry) => {
          const timestamp = new Date(entry.node.timestamp);
          const day = timestamp.toString().substring(0, 3);
          timestamp.setHours(0, 0, 0, 0);
          const time = timestamp.getTime();
          if (timeline[time]) {
            if (timeline[time].danger) {
              timeline[time].danger += 1;
            } else {
              timeline[time].danger = 0;
            }
          } else {
            timeline[time] = { safe: 0, danger: 1, time };
          }
          week[day].danger += 1;
          return null;
        });
      }
      timelineData = Object.values(timeline);
      weekData = Object.values(week);
    }
    const sortedData = timelineData.sort((a, b) => a.time - b.time);
    const timelineTicks = getTicks(sortedData);
    const completeData = getTicksData(sortedData, timelineTicks);
    const completeSortedData = completeData.sort((a, b) => a.time - b.time);
    this.setState({ timelineTicks, completeSortedData, weekData });
  }

  render() {
    return (
      <div>
        <ControlLabel>Timeline</ControlLabel>
        <ResponsiveContainer width="90%" height={200}>
          <AreaChart data={this.state.completeSortedData}>
            <defs>
              <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#337ab7" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#337ab7" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorDanger" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d9534f" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#d9534f" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              ticks={this.state.timelineTicks}
              tickCount={this.state.timelineTicks.length}
              tickFormatter={dateFormat}
            />
            <YAxis allowDecimals={false} />
            <Area
              type="monotone"
              dataKey="safe"
              stroke="#337ab7"
              fillOpacity={1}
              fill="url(#colorSafe)"
              connectNulls
            />
            <Area
              type="monotone"
              dataKey="danger"
              stroke="#d9534f"
              fillOpacity={1}
              fill="url(#colorDanger)"
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>
        <ControlLabel>Week</ControlLabel>
        <ResponsiveContainer width="90%" height={200}>
          <BarChart data={this.state.weekData}>
            <defs>
              <linearGradient id="weekSafe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#337ab7" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#337ab7" stopOpacity={0.5} />
              </linearGradient>
              <linearGradient id="weekDanger" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d9534f" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#d9534f" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Bar dataKey="safe" fill="url(#weekSafe)" />
            <Bar dataKey="danger" fill="url(#weekDanger)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Charts;
