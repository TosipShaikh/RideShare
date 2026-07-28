import React, { useState } from 'react';

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Popup</button>
      
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Popup Title</h2>
            <p>This is popup content</p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;