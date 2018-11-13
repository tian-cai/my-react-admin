import React, { Component } from 'react';

class RoleGuest extends Component {
  render() {
    return (
      <div className="center" style={{ marginTop: 60, fontSize: 30 }}>
        <p>游客超管均可以看见该页面</p>
      </div>
    );
  }
}

export default RoleGuest;