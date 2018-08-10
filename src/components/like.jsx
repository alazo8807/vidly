import React, { Component } from "react";

class Like extends Component {
  getClasses() {
    let classes = "fa fa-heart";
    return !this.props.liked ? (classes += "-o") : classes;
  }

  render() {
    return <i className={this.getClasses()} onClick={this.props.onLike} />;
  }
  //   onClick={this.props.onLike}
}

export default Like;
