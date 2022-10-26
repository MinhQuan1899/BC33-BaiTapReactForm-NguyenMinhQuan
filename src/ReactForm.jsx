import React, { Component } from "react";
import Tables from "./Tables";

export default class ReactForm extends Component {
  state = {
    values: {
      maSV: "",
      hoTen: "",
      soDT: "",
      email: "",
    },
    errors: {
      maSV: "",
      hoTen: "",
      soDT: "",
      email: "",
    },
    isSubmit: true,
    arrSV: [
      {
        maSV: "",
        hoTen: "",
        soDT: "",
        email: "",
      },
      {
        maSV: "",
        hoTen: "",
        soDT: "",
        email: "",
      },
    ],
  };

  handleChangeInput = (e) => {
    let { value, id } = e.target; //id:price, value: '1000'
    let newValues = { ...this.state.values };
    newValues[id] = value;
    let newErrors = { ...this.state.errors };
    //Xử lý lỗi:
    let messError = "";
    if (value.trim() == "") {
      messError = id + " không được bỏ trống !";
    } else {
      let dataType = e.target.getAttribute("data-type");
      if (dataType === "number") {
        let regexNumber = /^\d+$/;
        if (!regexNumber.test(value)) {
          messError = "Số điện thoại" + " phải nhập số!";
        }
      }
      if (dataType == "email") {
        let regexEmail = /abc/;
        if (!regexEmail.test(value)) {
          messError = id + " không đúng định dạng!";
        }
      }
    }
    newErrors[id] = messError;

    let submit = false;
    for (let key in newValues) {
      //price = 1000 => price.toString() => '1000'.trim();
      if (newValues[key].toString().trim() === "") {
        submit = true;
      }
    }

    //setState
    this.setState(
      {
        values: newValues,
        errors: newErrors,
        isSubmit: submit,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault(); //Hàm này giúp chặn sự kiện reload của browser khi form submit
    console.log("submit", this.state);
    //Kiểm tra lỗi trước khi submit

    //Lấy ra object error từ state
    let { errors } = this.state;
    for (let key in errors) {
      if (errors[key] !== "") {
        alert("Dữ liệu không hợp lệ !");
        //Dừng lại
        return;
      }
    }
    //Thêm dữ liệu vào arrProduct
    let newSV = { ...this.state.values };
    this.state.arrSV.push(newSV);
    //Cập nhật lại state
    this.setState(
      {
        arrSV: this.state.arrSV,
      },
      () => {
        this.luuStorage();
      }
    );
  };
  luuStorage = () => {
    let stringArrSV = JSON.stringify(this.state.arrSV);
    localStorage.setItem("arrProduct", stringArrSV);
  };
  render() {
    let { maSV, hoTen, soDT, email } = this.state.values;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="card">
            <div className="card-header bg-dark text-warning">
              <h3>Thông tin sinh viên</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <p>Mã SV</p>
                    <input
                      className="form-control"
                      id="maSV"
                      name="maSV"
                      onInput={this.handleChangeInput}
                      value={maSV}
                    />
                    <p className="text text-danger">{this.state.errors.maSV}</p>
                  </div>
                  <div className="form-group">
                    <p>Số điện thoại</p>
                    <input
                      className="form-control"
                      id="soDT"
                      name="soDT"
                      onInput={this.handleChangeInput}
                      value={soDT}
                      data-type="number"
                    />

                    <p className="text text-danger">{this.state.errors.soDT}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <p>Họ tên</p>
                    <input
                      className="form-control"
                      id="hoTen"
                      name="hoTen"
                      onInput={this.handleChangeInput}
                      value={hoTen}
                    />
                    <p className="text text-danger">
                      {this.state.errors.hoTen}
                    </p>
                    <div className="form-group">
                      <p>Email</p>
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onInput={this.handleChangeInput}
                      />
                      <p className="text text-danger">
                        {this.state.errors.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-success" type="submit">
                Thêm sinh viên
              </button>
            </div>
          </div>
        </form>
        <Tables />
      </div>
    );
  }
}
