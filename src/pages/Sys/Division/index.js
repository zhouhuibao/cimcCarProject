import React, { Component } from 'react';

class Division extends Component {
  constructor(props) {
    super(props);
    this.toggleContainer = React.createRef();
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  state = {
    isOpen: false,
  };

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler = () => {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen,
    }));
  };

  onClickOutsideHandler(event) {
    const { isOpen } = this.state;
    console.log(!this.toggleContainer.current.contains(event.target));
    if (isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div ref={this.toggleContainer} style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={e => {
            this.onClickHandler(e);
          }}
        >
          Select an option
        </button>

        {isOpen ? (
          <ul style={{ width: 100, background: '#ccc', position: 'absolute', top: 27 }}>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
export default Division;
