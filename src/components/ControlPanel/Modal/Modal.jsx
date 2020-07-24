import React from 'react';
import './Modal.scss';

const { i18n } = window.GLOBAL.App;

const Modal = ({ show, text, onSave, onCancel }) => (
  <div>
    <div class={`modal fade ${show ? 'show' : ''}`} id="c-panel-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: show ? 'block' : 'none' }}>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{i18n.Confirmation}</h5>
            <button type="button" onClick={() => onCancel()} class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {text}
          </div>
          <div class="modal-footer">
            <button onClick={() => onCancel()} type="button" class="btn btn-secondary" data-dismiss="modal">{i18n.Cancel}</button>
            <button onClick={() => onSave()} type="button" class="btn btn-primary">{i18n.OK}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;