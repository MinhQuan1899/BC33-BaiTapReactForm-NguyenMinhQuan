import React, { Component } from "react";

export default class Tables extends Component {
  render() {
    const { arrSV, delProduct, editProduct } = this.props;
    return (
      <table className="table mt-2">
        <thead className="bg-dark text-white">
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    );
  }
}
