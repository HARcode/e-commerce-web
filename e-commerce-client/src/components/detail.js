import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { convertPrice } from "../helpers/convertPrice";
import "../stylesheets/customStyles.css";


export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = { color: null, capacity: null, clicks: 0, show: true, vote: 0, addition: 0 };

    }


    componentDidMount() {
        this.props.loadDetail(this.props.itemId);

    }

    handleColorChange = color => {
        this.setState({ color });
    };

    handleCapacityChange = capacity => {
        this.setState({ capacity });
    };

    DecreaseItem = () => {
        this.setState((state, props) => {

            return {
                clicks: state.clicks + 1
            };


        })
    }

    IncrementItem = () => {

        this.setState({ clicks: this.state.clicks - 1 });
    }

    ToggleClick = () => {
        this.setState({ show: !this.state.show })
    }

    handleInputChange = (event) => {
        let { itemId, clicks } = event.target.value;
        this.setState({ itemId, clicks })

    }

    handleButtonBuy = (e) => {
        e.preventDefault()

        let itemId = this.props.detail.itemId
        let dataClicks = this.state.clicks
        let dataStock = this.props.detail.stock

        let stock = dataStock - dataClicks;

        if (itemId && stock) {
            this.props.buyItem(itemId, stock)
        }

    }

    ButtonLike = (e) => {
        e.preventDefault()
        let getVote = this.props.detail.vote
        let likePlus = this.state.vote
        this.setState((state, props) => {

            console.log('stateVote', this.state.vote);
            console.log('thisProps > ', getVote);


            if (this.state.vote > 0) {
                this.setState({ vote: 0 })
                console.log('true');

            } else {
                let addition = likePlus + getVote;
                this.setState({ addition: addition })

                console.log('false >', addition);

            }


            return {
                vote: state.vote + 1
            };


        })

    }


    render() {
        let { detail } = this.props;
        let colors = detail.colors || [];
        let capacities = detail.capacities || []
        console.log({ props: this.props });


        return (
            <div
                className="container"
                style={{
                    maxHeight: "95vh",
                    overflowY: "auto",
                    marginTop: "2.5vh",
                    marginBottom: "2.5vh"
                }}
            >
                <div className="card">
                    <div className="card-header" style={{ backgroundColor: "#bfe1e3" }}>
                        <h1 className="mb-4"
                            style={{
                                WebkitTextFillColor: "white",
                                WebkitTextStrokeWidth: "1px",
                                WebkitTextStrokeColor: "black"
                            }}>
                            <b>
                                Detail
                            </b>
                            {this.state.vote}
                            {this.state.addition}
                        </h1>
                    </div>

                    {/* in header */}
                    <div className="row my-3" style={{ maxHeight: "70vh", overflowY: "auto" }} >
                        <div className="col-12 col-sm-5">
                            <div className="imageFloat">
                                <img
                                    id="item-display"
                                    src={require(`../stylesheets/xiaomi-mi-9-2.jpg`)}
                                    alt=""
                                    className="img-thumbnail"
                                    height="2rem"
                                    width="auto"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-sm-7">
                            <h3 className="my-1">
                                <b>{detail.title}</b>
                                <br />
                            </h3>
                            <h6 style={{ color: "blue", textAlign: "left" }}>
                                {`Brand: ${detail.brand}. (${detail.vote} votes)`}
                            </h6>

                            <input type="hidden" value={detail.itemId} onChange={this.handleInputChange.bind(this)} />

                            <div className="my-3">
                                <h4>{convertPrice(detail.price)}</h4>
                            </div>
                            <div className="card my-4" style={{ backgroundColor: "#bfe1e3" }}>
                                <h5 className="mx-3 my-1">Color</h5>
                                <div className="btn-group btn-group-toggle col-sm-6" data-toggle="buttons">
                                    {colors.map((color, index) => (
                                        <label
                                            key={index}
                                            className={`btn mx-1 btn-sm  ${
                                                color === this.state.color ? "active" : ""
                                                }`}
                                            style={{ backgroundColor: color }}
                                        >
                                            <input
                                                type="radio"
                                                name="options"
                                                id={`color${index}`}
                                                checked={color === this.state.color}
                                                onChange={() => this.handleColorChange(color)}
                                                className="col-2"
                                            />
                                            <i className="fa fa-check text-white"></i>
                                        </label>
                                    ))}
                                </div>
                                <div className="my-1 form">
                                    <h5 className="my-1 mx-3">Capacity</h5>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        {capacities.map((capacity, index) => (
                                            <label
                                                key={index}
                                                className={`btn mx-3 btn-secondary btn-sm ${capacity === this.state.capacity ? "active" : ""}`}
                                                style={{ backgroudColor: 'white' }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="options"
                                                    checked={capacity === this.state.capacity}
                                                />
                                                {detail.capacities}
                                                <i className="fa fa-check text-white"></i>

                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="form">
                                    <h5 className="mx-3 my-1"> Quantity</h5>

                                    <span className=" mx-4 my-1">
                                        <button className="btn btn-primary btn-sm my-1" onClick={this.ToggleClick}>
                                            {this.state.show ? 'Show' : 'Hide'}
                                        </button>
                                    </span>

                                    <span className="my-1" >
                                        {this.state.show ?
                                            ''
                                            :
                                            <span className=" my-1">
                                                {this.state.clicks > 0 && (

                                                    <span className="col-sm-">
                                                        <button onClick={this.IncrementItem} type="button" className="btn btn-danger btn-sm" data-type="minus" data-field="quant[2]">
                                                            <div className="fa fa-minus" />
                                                        </button>
                                                    </span>

                                                )}
                                                <input
                                                    type="text"
                                                    className="col-2"
                                                    style={{ textAlign: "center" }}
                                                    value={this.state.clicks}
                                                    readOnly={true}
                                                    onChange={this.handleInputChange.bind(this)}

                                                />
                                                {this.state.clicks < detail.stock && (

                                                    <span className="col-">
                                                        <button onClick={this.DecreaseItem} type="button" className="btn btn-success btn-number btn-sm" data-type="plus" data-field="quant[2]">
                                                            <div className="fa fa-plus" />
                                                        </button>
                                                    </span >

                                                )}
                                                <span className="col-md-2"> stock : </span>
                                                <span> {detail.stock} </span>
                                            </span>}
                                    </span>
                                </div>

                            </div>
                            <hr />
                            <div>
                                <button type="button" className="btn btn-block btn-success" onClick={this.handleButtonBuy}>
                                    <div className="fa fa-cart-arrow-down fa-lg mx-2" aria-hidden="true" />
                                    <b>Buy</b>
                                </button>
                                <br />
                                <button type="button" className=" btn btn-default fa fa-heart" aria-hidden="true" style={{ WebkitTextFillColor: "blue" }} onClick={this.ButtonLike}> Like</button>
                            </div>

                        </div>

                        <div className="container-fluid">
                            <div className="col-md-12 product-info">
                                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                                    <Tab eventKey="home" title="Product Detail">
                                        <div
                                            className="container mt-3"
                                            style={{ maxHeight: "25vh", overflowY: "auto" }}
                                        >
                                            <div
                                                id="uncontrolled-tab-example-tabpane-home"
                                                aria-labelledby="uncontrolled-tab-example-tab-home"
                                                role="tabpanel"
                                                aria-hidden="false"
                                                className="fade tab-pane active show"
                                            >
                                                <ReactMarkdown source={detail.detail} />
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="profile" title="Testimonial">
                                        <div
                                            className="container product-info mt-3"
                                            style={{ maxHeight: "25vh", overflowY: "auto" }}
                                        >
                                            <div
                                                id="uncontrolled-tab-example-tabpane-profile"
                                                aria-labelledby="uncontrolled-tab-example-tab-profile"
                                                role="tabpanel"
                                                aria-hidden="false"
                                                className="fade tab-pane active show"
                                            >
                                                <p>
                                                    {detail.testimonials}
                                                </p>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>

                                <hr />
                            </div>
                        </div>


                    </div>


                    {/* <div className="row">
                        <div className="col-md-3 col-sm-6 mb-4">
                            <a href="/#">
                                <img
                                    className="img-fluid"
                                    src="http://placehold.it/500x300"
                                    alt=""
                                />
                            </a>
                        </div>

                        <div className="col-md-3 col-sm-6 mb-4">
                            <a href="/#">
                                <img
                                    className="img-fluid"
                                    src="http://placehold.it/500x300"
                                    alt=""
                                />
                            </a>
                        </div>

                        <div className="col-md-3 col-sm-6 mb-4">
                            <a href="/#">
                                <img
                                    className="img-fluid"
                                    src="http://placehold.it/500x300"
                                    alt=""
                                />
                            </a>
                        </div>

                        <div className="col-md-3 col-sm-6 mb-4">
                            <a href="/#">
                                <img
                                    className="img-fluid"
                                    src="http://placehold.it/500x300"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}
