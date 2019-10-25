'use strict'

import React, { Component } from "react";
import reactCSS from 'reactcss'
// import '../../mockup/style.css'
import { connect } from "react-redux";
import { SketchPicker } from 'react-color';
import { FormItem } from "../components/form";

export default class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            price: "",
            rate: "",
            description: "",
            detail: "",
            brand: "",
            colors: [{ r: "255", g: "26", b: "0", a: "1" }],
            red: "",
            blue: "",
            white: "",
            black: "",
            stock: "",
            capacities: [],
            GB16: "",
            GB32: "",
            GB64: "",
            GB128: "",
            filename: "",
            added: false,
            displayColorPicker: [false]
        };
        // 
        // this.handleCheckbook = this.handleCheckbook.bind(this)
    }
    handleClickColor = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleCloseColor = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChangeColor = (color) => {
        this.setState(state => ({
            colors: [color.rgb]
        }))
        // this.setState({ color: color.rgb })
    }

    handleCheckbook(event) {
        //Checkbox
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        let { colors } = this.state;
        const styles = reactCSS({
            'default': {
                colors: colors.map(color => ({
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                })),
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        let { title, brand, price, stock, detail, description } = this.state;
        let forms = [
            { name: "title", label: "Title", type: "text", value: title },
            { name: "brand", label: "Brand", type: "text", value: brand },
            { name: "price", label: "Price", type: "number", min: 0, value: price },
            { name: "stock", label: "Stock", type: "number", min: 0, value: stock },
            '',
            {
                name: "capacity", label: "Capacity", type: "checkbox",
                values: [16, 32, 64, 128],
                options: [16, 32, 64, 128].map(x => `${x} GB`),
                ids: [16, 32, 64, 128].map(x => `capacity${x}`)
            },
            { name: "detail", label: "Detail Product", type: "textarea", value: detail },
            '',
            { name: "description", label: "Description", type: "textarea", value: description }
        ];

        let formItems = forms.map((form, i) => {
            if (i === 4) return (
                <div className="form-row">
                    <div className="name">Color</div>
                    {colors.map((color, idx) => (
                        <div></div>
                    ))}
                    <div style={styles.swatch} onClick={this.handleClickColor}>
                        <div style={styles.colors[0]} />
                    </div>
                    {this.state.displayColorPicker[0] && <div style={styles.popover}>
                        <div style={styles.cover} onClick={this.handleCloseColor} />
                        <SketchPicker color={this.state.colors[0]} onChange={this.handleChangeColor} />
                    </div>}
                    <div className="align-center mx-3">
                        <button type="button" className="btn text-info bg-transparent" style={{ marginTop: "-0.35rem" }}>
                            <i class="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            ); // color picker
            if (i === 7) return (
                <div className="form-row">
                    <div className="name">Choose Image</div>
                    <div className="value">
                        <div className="input-group js-input-file">
                            <input
                                className="input-file"
                                type="file"
                                name="filename"
                                id="file"
                            />
                            <label className="label--file" htmlFor="file">Choose file</label>
                            <span className="input-file__info">No file chosen</span>
                        </div>
                        <div className="label--desc">
                            Upload your image or any other relevant file. Max file size
                            50 MB
                        </div>
                    </div>
                </div>
            ); // file
            return (
                <FormItem {...form} key={i} />
            )
        })

        return (
            <div className="page-wrapper bg-info p-t-45 p-b-50">
                <div className="wrapper wrapper--w900">
                    <div className="card card-6" style={{ maxHeight: "90vh", overflowY: "auto" }}>
                        <div className="card-heading">
                            <h2 className="btn btn-primary col-lg-12 col-sm-12 col-md-12">Add Ads</h2>
                        </div>
                        <div className="card-body">
                            <form method="POST">
                                {formItems}
                            </form>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" type="submit">
                                Add
                                </button>
                            <button className="btn btn-info mx-2" type="submit">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}