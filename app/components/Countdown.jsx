var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
  getInitialState: function(){
    return {
      count: 0,
      countdownStatus: 'stopped'
    };
  },
  componentDidUpdate: function(prevProps, prevState) {
    // console.log('componentDidUpdate. Runs when there is an update to the application. Either to its props or its state.');
    if(this.state.countdownStatus !== prevState.countdownStatus) {
      switch(this.state.countdownStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    // console.log('componentWillUpdate', nextProps, nextState.countdownStatus);
  },
  componentWillMount: function (){
    // console.log('componentWillMount. Runs before component gets shown on the screen.');
  },
  componentDidMount: function (){
    // console.log('componentDidMount. Runs after component gets rendered in the DOM.');
  },
  componentWillUnmount: function(){
    // console.log('componentDidUnmount. Runs when the component is removed from the DOM');
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer: function(){
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });
      if(newCount === 0) {
        this.setState({countdownStatus: 'stopped'});
      }
    }, 1000);
  },
  handleSetCountdown: function(seconds){
      this.setState({
        count: seconds,
        countdownStatus: 'started'
      });
  },
  handleStatusChange: function(newStatus) {
    this.setState({countdownStatus: newStatus});
  },
  render: function () {
    var {count, countdownStatus} = this.state;
    var renderControlArea = () => {
      if(countdownStatus !== 'stopped'){
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      }
    };
    return (
      <div>
        <h1 className="page-title">Countdown App</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    );
  }
});

module.exports = Countdown;
