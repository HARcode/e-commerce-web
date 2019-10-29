import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import '../stylesheets/detailProduct/detail.css';

class detail extends Component {
    render() {

        return (
            <div className="container-fluid">
                <div className="content-wrapper">
                    <div className="item-container">
                        <div className="container">

                            <div classNameName="col-md-12">
                                <div className="imageFloat">
                                    <img id="item-display" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyvGbj3ioyE-yrlrwHGY39F83hBtbdyiuW4Z1YMUGj0cwAGEWu&s" alt=""
                                        className="img-thumbnail" width="400" height="600" />
                                </div>
                            </div>

                            <div className="col-md-7">
                                <div className="product-title">Samsung Galacy Gacor I660</div>
                                <div className="product-desc">LTE, Ram 1200GB </div>
                                <div className="product-desc">
                                    <div>
                                        <h6 style={{ color: 'blue', textAlign: 'left' }}>
                                            Brand Samsung . (12000 votes)
                                        </h6>
                                    </div>
                                </div>
                                <hr />
                                <div className="product-desc">Price</div>
                                <div className="product-price">Rp 1234.00</div>
                                <h4>Color</h4>

                                <div className="btn-group" data-toggle="buttons">


                                    <label className="btn btn-info active" style={{ backgroundColor: 'chartreuse' }}>
                                        <input type="radio" name="options" id="option2" autocomplete="off" chacked />
                                        <span className="glyphicon glyphicon-ok"></span>
                                    </label>
                                    <label className="btn btn btn-info" style={{ backgroundColor: 'crimson' }}>
                                        <input type="radio" name="options" id="option1" autocomplete="off" />
                                        <span class="glyphicon glyphicon-ok"></span>
                                    </label>

                                    <label className="btn btn-info" style={{ backgroundColor: 'black' }}>
                                        <input type="radio" name="options" id="option2" autocomplete="off" />
                                        <span class="glyphicon glyphicon-ok"></span>
                                    </label>


                                </div>
                                <br />
                                <div className="form">
                                    <h4>Capacity</h4>
                                    <div className="form-group col-md-2">
                                        <input type="text" className="form-control" id="inputZip" placeholder="16 GB" readOnly={true} />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="container">
                                    <h4>Quantity</h4>
                                    <span className="col-md-">
                                        <button type="button" className="btn btn-danger btn-number btn-sm" data-type="minus" data-field="quant[2]">
                                            <div className="glyphicon glyphicon-minus" /> 
                                        </button>
                                    </span>
                                    <span className="col-1">
                                            <input type="text" className="col-2" style={{ textAlign: "center" }} name="quant[2]" value="10" min="1" max="100" />
                                    </span>
                                    <span className="col-">
                                        <button type="button" className="btn btn-success btn-number btn-sm" data-type="plus" data-field="quant[2]">
                                            <div className="glyphicon glyphicon-plus" />
                                        </button>
                                    </span >
                                </div>

                                <br />
                                <br />
                                <hr />
                                <div>
                                    <h6 href="#" className="btn btn-block btn-success">
                                        <p className="glyphicon glyphicon-shopping-cart"></p>
                                        <b>Buy</b>
                                    </h6>
                                    <br />
                                    <Link to="/" className="glyphicon glyphicon-heart"> Like</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="col-md-12 product-info">


                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                                <Tab eventKey="home" title="Product Detail">
                                <section class="container product-info">
                                    <div id="uncontrolled-tab-example-tabpane-home" aria-labelledby="uncontrolled-tab-example-tab-home" role="tabpanel" aria-hidden="false" class="fade tab-pane active show"><p>I never saw that you did painting need, And therefore to your fair no painting set; I found, or thought I found, you did exceed That barren tender of a poet's debt: And therefore have I slept in your report, That you yourself, being extant, well might show How far a modern quill doth come too short, Speaking of worth, what worth in you doth grow.  This silence for my sin you did impute, Which shall be most my glory being dumb;</p></div>
                                </section>
                                </Tab>
                                <Tab eventKey="profile" title="Testimonial">
                                <section class="container product-info">
                                    <div id="uncontrolled-tab-example-tabpane-profile" aria-labelledby="uncontrolled-tab-example-tab-profile" role="tabpanel" aria-hidden="false" class="fade tab-pane active show"><p>How can my muse want subject to invent, While thou dost breathe, that pour'st into my verse Thine own sweet argument, too excellent For every vulgar paper to rehearse? O! give thy self the thanks, if aught in me Worthy perusal stand against thy sight; For who's so dumb that cannot write to thee, When thou thy self dost give invention light?  Be thou the tenth Muse, ten times more in worth Than those old nine which rhymers invocate;</p></div>
                                </section>
                                </Tab>

                            </Tabs>

                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default detail;