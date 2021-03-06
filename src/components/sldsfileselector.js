/*
 *  DXGUI - GUI Client for the sfdx cli
 *  Copyright (C) 2019 George Doenlen
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Salesforce Lightning Design System file upload component
 * https://lightningdesignsystem.com/components/file-selector/
 */
export default class SLDSFileSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  /**
   * Handles what happens when a file is selected. First sets the display value
   * of the path and then fires the supplied onChange event
   * 
   * @param {event} event - the event that triggered this to fire 
   */
  handleFileSelectorChange(event) {
    //sometimes when you click cancel there won't be a file value
    if (event && event.currentTarget && event.currentTarget.files && event.currentTarget.files[0]) {
      const path = event.currentTarget.files[0].path;
      this.setState({
        path: path
      });

      this.props.onChange(event);
    }
  }

  render() {
    return (
      <div className={'slds-form-element' + this.props.error ? ' slds-has-error' : ''}>
        <span className="slds-form-element__label" id="fileSelectorLabel">{this.props.label}</span>
        <div className="slds-form-element__control">
          <div className="slds-file-selector slds-file-selector_files">
            <div className="slds-file-selector__dropzone">
              <input 
                id="fileSelector"
                name={this.props.name}
                className="slds-file-selector__input slds-assistive-text" 
                accept={this.props.accept} 
                type="file"
                aria-describedby="fileSelectorError"
                aria-labelledby="fileSelectorLabel"
                onChange={e => this.handleFileSelectorChange(e)}
                webkitdirectory={this.props.webkitdirectory}
              />
              <label className="slds-file-selector__body" htmlFor="fileSelector">
                <span className="slds-file-selector__button slds-button slds-button_neutral">
                  Browse
                </span>
                <span className="slds-file-selector__text slds-text-body_small">{this.state.path}</span>
              </label>
            </div>
          </div>
        </div>
        <div className="slds-form-element__help slds-text-color_error">{this.props.error}</div>
      </div>
    );
  }
}

SLDSFileSelector.propTypes = {
  /** Any error message that needs to be displayed */
  error: PropTypes.string,

  /** webkitdirectory prop for the input */
  webkitdirectory: PropTypes.bool,

  /** name prop of the input */
  name: PropTypes.string,

  /** accept prop of the input */
  accept: PropTypes.string,

  /** label for the form element */
  label: PropTypes.string.isRequired  
};

SLDSFileSelector.defaultProps = {
  webkitdirectory: false
};