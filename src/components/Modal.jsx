import React from 'react';

export default function Modal({ children, onClose }) {
  return (
    <div className="modal show d-block" tabIndex="-1" onClick={onClose} style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <button type="button" className="btn-close ms-auto m-2" aria-label="Close" onClick={onClose}></button>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
