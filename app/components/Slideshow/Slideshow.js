import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';

// Redux

// Components

// CSS, Requires
require('./Slideshow.scss');

const blurReq = require.context('../../images/diaries_small', false, /\.jpg/);
const originalReq = require.context('../../images/diaries', false, /\.jpg/);

class Slideshow extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  state = {
    index: 0,
    people: ['Lisa', 'Jack', 'Claire', 'Marco', 'Dom', 'Zack'],
    imageSetLength: 7,
    loaded: []
  }

  componentDidMount() {
    this.checkImage(this.state.index);

    document.addEventListener('keyup', (e) => {
      switch (e.keyCode) {
      case 37:
        this.prev();
        break;
      case 39:
        this.next();
        break;
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      this.checkImage(this.state.index);
    }
  }

  checkImage(index) {
    const name = this.getName(index);
    const mod = index % this.state.imageSetLength;
    const key = this.getImageKey(name, mod + 1);

    if (this.state.loaded.indexOf(key) < 0) {
      this.preloadImage(key);
    }
  }

  preloadImage(key) {
    const file = originalReq(key);

    const img = new Image();
    img.onload = () => {
      this.setState({
        loaded: this.state.loaded.concat([key])
      });
    };
    img.src = file;
  }

  getImageKey(name, index) {
    return `./${name.toLowerCase()}_00${index}.jpg`;
  }

  getImage(name, index, original = false) {
    const targ = this.getImageKey(name, index);
    const req = original ? originalReq : blurReq;

    if (req.keys().indexOf(targ) >= 0) {
      return req(targ);
    } else {
      return false;
    }
  }

  getName(index) {
    const targ = Math.floor(index / this.state.imageSetLength);
    return this.state.people[targ];
  }

  getCurrentImageKey(index) {
    const person = this.getName(index);
    const mod = index % this.state.imageSetLength;

    return this.getImageKey(person, mod + 1);
  }

  next = () => {
    this.setState({
      index: this.state.index + 1 < this.state.people.length * this.state.imageSetLength ? this.state.index + 1 : 0
    });
  }

  prev = () => {
    this.setState({
      index: this.state.index - 1 >= 0 ? this.state.index - 1 : this.state.people.length * this.state.imageSetLength - 1
    });
  }

  jumpTo = (name) => {
    const num = this.state.people.indexOf(name);

    this.setState({
      index: num * this.state.imageSetLength
    });
  }

  render() {
    const { className } = this.props;
    const { index, people, imageSetLength } = this.state;

    const cls = classNames(
      className,
      'slideshow'
    );

    const imageKey = this.getCurrentImageKey(index);

    const style = {
      backgroundImage: `url(${blurReq(imageKey)})`
    };

    return (
      <Fragment>
        <div className={cls}>
          <div className="slideshow__content" style={style}>
            {
              this.state.loaded.indexOf(imageKey) >= 0 ? <img onClick={this.next} src={originalReq(imageKey)}/> : null
            }
          </div>
        </div>
        <div className="slideshow-info">
          <div className="slideshow-info__info">
            <em>{ this.getName(index) }</em>
            <em>{ index + 1 } / { people.length * imageSetLength }</em>
            <button onClick={this.prev}>Previous</button><br/>
            <button onClick={this.next}>Next</button>
          </div>
          <div className="slideshow-info__quick">
            <ul>
              { people.map((p) => {
                return (
                  <li key={p}>
                    <button onClick={() => this.jumpTo(p)}>{p}</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Slideshow;
