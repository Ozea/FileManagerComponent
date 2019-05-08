import React, { Component } from 'react';
import classNames from 'classname';

const defaultPermissions = {
  owner: {
    read: 0,
    write: 0,
    execute: 0,
  },
  group: {
    read: 0,
    write: 0,
    execute: 0,
  },
  others: {
    read: 0,
    write: 0,
    execute: 0,
  },
}

class Permissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: this.decode(this.props.permissions) || defaultPermissions,
      inputInvalid: false,
    }
  }

  inArray(number, array) {
    return !!~array.indexOf(number);
  }

  decodeSingleNumber = (string) => {
    const number = parseInt(string, 0);

    return {
      read: this.inArray(number, [4, 5, 6, 7]) ? 4 : 0,
      write: this.inArray(number, [2, 3, 6, 7]) ? 2 : 0,
      execute: this.inArray(number, [1, 3, 5, 7]) ? 1 : 0
    };
  }

  isValid(numbers = '') {
    if (numbers.length !== 3 || numbers === '000' || numbers.match(/[A-Za-z]/)) {
      return false;
    }

    return numbers.split('').find((number) => parseInt(number, 0) < 0 || parseInt(number, 0) > 7) === undefined;
  }

  decode(numbers) {
    if (!this.isValid(numbers)) {
      return null;
    }

    const numbersArray = numbers.split('');
    const result = numbersArray.map(this.decodeSingleNumber);
    return { owner: result[0], group: result[1], others: result[2] };
  }

  encode() {
    function sumPermissions(permissionObject) {
      return Object.values(permissionObject).map((number) => parseInt(number, 0)).reduce((acc, n) => acc + n, 0);
    }
    return ['owner', 'group', 'others'].reduce((acc, role) => {
      const roleObject = this.state.permissions[role];
      return acc + sumPermissions(roleObject);
    }, '');
  }

  onChangeForm = (event) => {
    const checkbox = event.target;
    const [role, permissionName] = checkbox.name.split('_');
    this.setState({
      permissions: {
        ...this.state.permissions,
        [role]: {
          ...this.state.permissions[role],
          [permissionName]: checkbox.checked ? checkbox.value : 0,
        }
      }
    }, (state) => {
      this.inputRef.value = this.encode();
      this.props.changePermissions(this.inputRef.value);
    });
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    if (!this.isValid(value)) {
      return this.setState({ inputInvalid: true });
    }

    this.setState({
      permissions: this.decode(value),
      inputInvalid: false,
    });
    this.props.changePermissions(this.inputRef.value);
  }

  permissionBlock(type) {
    const { permissions } = this.state;
    return (
      <div>
        <label><input type="checkbox" name={type + '_read'} value="4" checked={!!permissions[type].read} id="read" /> Read by {type}</label>
        <label><input type="checkbox" name={type + '_write'} value="2" checked={!!permissions[type].write} /> Write by {type}</label>
        <label><input type="checkbox" name={type + '_execute'} value="1" checked={!!permissions[type].execute} /> Execute/search by {type}</label>
      </div>
    );
  }

  render() {
    const { inputInvalid } = this.state;
    const { closeModal, onClick, fName } = this.props;
    const inputClasses = classNames({
      'form-control total': true,
      'error': inputInvalid,
    });

    return (
      <div className="modal-content permissions">
        <div className="modal-header">
          <h3 className="modal-title perms">Change rights: <span className="quot">&quot;{fName}&quot;</span></h3>
          <button type="button" className="close" onClick={closeModal} >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form name="form" onChange={this.onChangeForm}>
          {this.permissionBlock('owner')}
          {this.permissionBlock('group')}
          {this.permissionBlock('others')}
        </form>
        <input type="text" className={inputClasses} defaultValue={this.encode()} ref={(ref) => this.inputRef = ref} onChange={this.handleInputChange} maxLength="3" />
        <div className="modal-footer">
          <button type="button" className="btn btn-danger mr-auto" onClick={closeModal}>Close</button>
          <button type="button" className="btn btn-primary" onClick={onClick} disabled={inputInvalid}>Save</button>
        </div>
      </div>
    );
  }
}

export default Permissions;