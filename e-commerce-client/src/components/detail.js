import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

class detail extends Component {
    render() {

        return (
            <div className="container">


                <h1 className="my-4">Detail
                    <small></small>
                </h1>


                <div className="row">
                    <div classNameName="col-md-12">
                        <div className="imageFloat">
                            <img id="item-display" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyvGbj3ioyE-yrlrwHGY39F83hBtbdyiuW4Z1YMUGj0cwAGEWu&s" alt=""
                                className="img-thumbnail" width="400" height="600" />
                        </div>
                    </div>

                    <div className="col-md-7">
                        <h3 className="my-3"><b>Samsung Galaxy S4 I337 16GB 4 LTE Unlocked GSM Android Cell Phone PROMO</b>
                            <br />
                            <h6 style={{ color: 'blue', textAlign: 'left' }}>
                                Brand Samsung . (12000 votes)
                            </h6>
                        </h3>
                        <div>
                            PRICE
                            <h4>
                                Rp. 12.000
                            </h4>
                        </div>
                        <br />
                        <div className="card" style={{ backgroundColor: "#bfe1e3" }}>
                            <h4>
                                Colour
                            </h4>
                            <span className="fas fa-home"></span>
                            <div class="form-check">
                                <label class="btn btn-info active">
                                    <input type="radio" name="optradio" id="option1" autocomplete="off" chacked={true} />
                                </label>
                                <label class="btn btn-info active">
                                    <input type="radio" name="optradio" id="option2" autocomplete="off" />
                                </label>
                            </div>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="optradio" />Option 2
                                </label>
                            </div>
                            <div class="form-check ">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="optradio" />Option 3
                                </label>
                            </div>
                        </div>

                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
                        <h3 className="my-3">Project Details</h3>
                        <div className="col-md-4">
                            <ul>
                                <li>Lorem Ipsum</li>
                                <li>Dolor Sit Amet</li>
                                <li>Consectetur</li>
                                <li>Adipiscing Elit</li>
                            </ul>
                        </div>
                    </div>

                </div>
                <br />
                <br />

                <div className="container-fluid">
                    <div className="col-md-12 product-info">


                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="Product Detail">
                                <br />
                                <br />
                                <div className="container">
                                    <div id="uncontrolled-tab-example-tabpane-home" aria-labelledby="uncontrolled-tab-example-tab-home" role="tabpanel" aria-hidden="false" className="fade tab-pane active show"><p>I never saw that you did painting need, And therefore to your fair no painting set; I found, or thought I found, you did exceed That barren tender of a poet's debt: And therefore have I slept in your report, That you yourself, being extant, well might show How far a modern quill doth come too short, Speaking of worth, what worth in you doth grow.  This silence for my sin you did impute, Which shall be most my glory being dumb;</p></div>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="Testimonial">
                                <br />
                                <br />
                                <div className="container product-info">
                                    <div id="uncontrolled-tab-example-tabpane-profile" aria-labelledby="uncontrolled-tab-example-tab-profile" role="tabpanel" aria-hidden="false" className="fade tab-pane active show"><p>How can my muse want subject to invent, While thou dost breathe, that pour'st into my verse Thine own sweet argument, too excellent For every vulgar paper to rehearse? O! give thy self the thanks, if aught in me Worthy perusal stand against thy sight; For who's so dumb that cannot write to thee, When thou thy self dost give invention light?  Be thou the tenth Muse, ten times more in worth Than those old nine which rhymers invocate;</p></div>
                                </div>
                            </Tab>

                        </Tabs>

                        <hr />
                    </div>
                </div>

                <div className="row">


                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="/#">
                            <img className="img-fluid" src="http://placehold.it/500x300" alt="" />
                        </a>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="/#">
                            <img className="img-fluid" src="http://placehold.it/500x300" alt="" />
                        </a>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="/#">
                            <img className="img-fluid" src="http://placehold.it/500x300" alt="" />
                        </a>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="/#">
                            <img className="img-fluid" src="http://placehold.it/500x300" alt="" />
                        </a>
                    </div>

                </div>


            </div >
        )

    }
}

export default detail;