import React, { Component } from "react";
import "./dashboard.css";
import ImgArt from "./Images/art.png";
import ImgMusic from "./Images/music.png";
import ImgTradingCards from "./Images/trading-cards.png";
import ImgCollectibles from "./Images/collectibles.png";
import ImgPhotograpghy from "./Images/photography-category.png";
import ImgDomainNames from "./Images/domain-names.png";
import ImgSports from "./Images/sports.png";
import ImgVirtual from "./Images/virtual-worlds.png";
import Imgultilty from "./Images/utility.png";

import Card from "react-bootstrap/Card";

export default class DashBoard extends Component {
  render() {
    return (
      <div
        className=""
        style={{
          align: "center",
          padding: "2em",
          backgroundColor: "#000",
        }}
      >
        <div className="container p-0  ">
          <div
            style={{
              align: "center",
              padding: "2em",
            }}
          >
            <h2>Stake Tokens & collect Rewards, Mint NFTs and much more</h2>
            <h4>Browse by category</h4>
          </div>
          <div className="row" style={{ color: "black" }}>
            <div className="col-lg-4 p-1">
              <Card>
                <Card.Img variant="top" src={ImgArt} />
                <Card.Body>
                  <Card.Title>Art</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-4 p-1">
              <Card>
                <Card.Img variant="top" src={ImgMusic} />
                <Card.Body>
                  <Card.Title>Music</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-4 p-1">
              <Card>
                <Card.Img variant="top" src={ImgTradingCards} />
                <Card.Body>
                  <Card.Title>Trading Cards</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </div>
          {/*  */}
          <div className="row" style={{ color: "black" }}>
            <div className="col-lg-4 p-1">
              <Card>
                <Card.Img variant="top" src={ImgCollectibles} />
                <Card.Body>
                  <Card.Title>Collectibles</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-4 p-1">
              <Card>
                <Card.Img variant="top" src={ImgPhotograpghy} />
                <Card.Body>
                  <Card.Title>Photograpghy</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-4 p-1">
              <Card>
                <Card.Img variant="top" src={Imgultilty} />
                <Card.Body>
                  <Card.Title>Utility</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </div>
          {/*  */}
          <div className="row" style={{ color: "black" }}>
            <div className="col-lg-4 p-1">
              <Card>
                <Card.Img variant="top" src={ImgDomainNames} />
                <Card.Body>
                  <Card.Title>Domain Names</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-4 p-1">
              <Card>
                <Card.Img variant="top" src={ImgSports} />
                <Card.Body>
                  <Card.Title>Sports</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-4 p-1">
              <Card>
                <Card.Img variant="top" src={ImgVirtual} />
                <Card.Body>
                  <Card.Title>Virtual Worlds</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
