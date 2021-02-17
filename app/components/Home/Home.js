import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';

// Redux

// Components
import Slideshow from '../Slideshow/Slideshow';

// CSS, Requires
require('./Home.scss');

class Home extends React.Component {
  static propTypes = {
  };

  state = {
    places: []
  }

  render() {
    const { places } = this.state;

    const cls = classNames(
      'home'
    );

    return (
      <div className={cls}>
        <div className="wrapper">
          <p>
            For my 26th birthday I went back to my hometown of Shrewsbury with people I met in London. As a joke I created everyone a little travel diary, like a boy scouts diary, but I wasn't expecting the results to be as great as they are. Thanks friends.
          </p>

          <div className="info">
            27th - 29th July<br/>
            London - Shrewsbury
          </div>
        </div>
        <div className="wrapper">
          <Slideshow />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
