import React, { Component, PropTypes } from 'react';
import {
  ControlLabel,
} from 'react-bootstrap';
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
          const time = new Date(entry.node.timestamp);
          const day = time.toString().substring(0, 3);
          const date = time.getDate();
          const month = time.getMonth();
          const formattedTime = `${month + 1}/${date}`;
          if (timeline[formattedTime]) {
            timeline[formattedTime].safe += 1;
          } else {
            timeline[formattedTime] = { safe: 1, danger: 0, formattedTime };
          }
          week[day].safe += 1;
          return null;
        });
      }
      if (this.props.danger) {
        this.props.danger.map((entry) => {
          const time = new Date(entry.node.timestamp);
          const day = time.toString().substring(0, 3);
          const date = time.getDate();
          const month = time.getMonth();
          const formattedTime = `${month + 1}/${date}`;
          if (timeline[formattedTime]) {
            if (timeline[formattedTime].danger) {
              timeline[formattedTime].danger += 1;
            } else {
              timeline[formattedTime].danger = 0;
            }
          } else {
            timeline[formattedTime] = { safe: 0, danger: 1, formattedTime };
          }
          week[day].danger += 1;
          return null;
        });
      }
      timelineData = Object.values(timeline);
      weekData = Object.values(week);
    }
    this.setState({ weekData, timelineData });
  }

  render() {
    return (
      <div>
        <ControlLabel>Timeline</ControlLabel>
        <ResponsiveContainer width="90%" height={200}>
          <AreaChart data={this.state.timelineData}>
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
            <XAxis dataKey="formattedTime" />
            <YAxis allowDecimals={false} />
            <Area
              type="monotone"
              dataKey="safe"
              stroke="#337ab7"
              fillOpacity={1}
              fill="url(#colorSafe)"
            />
            <Area
              type="monotone"
              dataKey="danger"
              stroke="#d9534f"
              fillOpacity={1}
              fill="url(#colorDanger)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <ControlLabel>Charts</ControlLabel>
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
