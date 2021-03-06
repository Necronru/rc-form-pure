import React from 'react';
import PropTypes from 'prop-types';

import parseRules from './parseRules';
import validateItem from './validateItem';

export default class FormItem extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    saveRefValidateItem: PropTypes.func,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string,
    ]),
    rules: PropTypes.array,
    onChange: PropTypes.func,
    onChangeError: PropTypes.func,
    validateOnBlur: PropTypes.bool,
  };

  static defaultProps = {
    rules: [],
    validateOnBlur: false,
  };

  state = {
    mirroredRules: [],
    rules: [],
    required: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.rules !== prevState.mirroredRules) {
      return {
        mirroredRules: nextProps.rules,
        rules: parseRules(nextProps.rules),
        required: nextProps.rules.find(({ required }) => !!required)
          ? true
          : false,
      };
    }

    return null;
  }

  componentDidMount() {
    this.props.saveRefValidateItem({
      type: this.props.type,
      onValidateItem: this.onValidateItem,
    });
  }

  validatorCallback = message => {
    Promise.resolve().then(() =>
      this.props.onChangeError({ type: this.props.type, error: message })
    );
  };

  onValidateItem = props => {
    const { rules } = this.state;
    const { error, type } = this.props;

    validateItem({
      type,
      rules,
      callback: this.validatorCallback,
      error,
      ...props,
    });
  };

  onChange = value => {
    const { type, validateOnBlur, error } = this.props;
    const updates = { [type]: value };

    this.props.onChange({ updates });

    if (!validateOnBlur) {
      this.onValidateItem({ value, onChangeError: this.props.onChangeError });
      // if validateOnBlur is true and it has error
    } else if (error) {
      this.validatorCallback(null);
    }
  };

  onBlur = () => {
    const { value } = this.props;
    this.onValidateItem({ value, onChangeError: this.props.onChangeError });
  };

  render() {
    const {
      children: Component = () => null,
      onChangeError,
      error: { message } = {},
      saveRefValidateItem,
      validateOnBlur,
      ...props
    } = this.props;

    return (
      <Component
        {...props}
        onChange={this.onChange}
        required={this.state.required}
        error={message || this.props.error} // user's errors (without right structure)
        validator={this.validatorCallback}
        onBlur={validateOnBlur ? this.onBlur : undefined}
      />
    );
  }
}
