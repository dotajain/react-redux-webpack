import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
// custom Component
import SynBankLogo from './partial/SynBankLogo';
import MyAccount from './MyAccount';
import FundTransfer from './FundTransfer';
import ConfirmTransfer from './ConfirmTransfer';
import ThankYou from './ThankYou';
import ChatBotCard from './partial/ChatBotCard';
import { wtts } from "../../redux/actions/watsonAction";

import SpeechToText from './partial/SpeechToText';

import { connect } from "react-redux";

import watson from 'watson-developer-cloud';

@connect((store) => {
  return {
    data: store.retailReducer.data,
    err: store.retailReducer.err.error,
    fetching: store.retailReducer.fetching,
    confirmTransfer: store.retailReducer.confirmTransfer,
    thankYou: store.retailReducer.thankYou,
    
    ttsAudio: store.wtts.data,
    ttsFetching: store.wtts.fetching,
    ttsFetched: store.wtts.fetched
  };
})

class Retail extends Component {
  constructor() {
    super();
    this._onSpeek = this._onSpeek.bind(this);
    this._onAudioStart = this._onAudioStart.bind(this);
    this.fetchToken = this.fetchToken.bind(this);

    this.state = {
      showChatbot: true,
      isSpeek: false,
      speechText: 'Hello, I am your financial advisor How can i help you?',
      audioUrl: '',
      audioType: 'audio/ogg;codecs=opus',
    }
  }

  _onSpeek() {
    const text = encodeURIComponent(this.state.speechText);
    const ttsUrl = "https://text-to-speech-demo.mybluemix.net/api/synthesize?voice=en-US_AllisonVoice&text=" + text;
    this.props.dispatch(wtts(ttsUrl));
  }

  _onAudioStart(response) {
    const audio = document.getElementById('audio');
    // audio.setAttribute('src', '');
    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      this.setState({ audioUrl: url })
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ttsAudio.ok) {
      this._onAudioStart(nextProps.ttsAudio);
    }
  }

  fetchToken() {
    let conversation =  watson.conversation({
      username: '40c909d6-97c9-4818-9f8b-f87d4b05bd19',
      password: 'qe3EyyEav6mQ',
      version: 'v1',
      version_date: '2017-04-21'
    });    
    
    var context = {};
    conversation.message({
      workspace_id: 'a3c8a706-3be9-4eaf-99c6-9f48dcf827b6',
      input: {'text': 'Welcome'},
      context: context
    }, (err, response) => {
      if (err)
        console.log('error:', err);
      else
        console.log(response);
    });
  }

  render() {
    const { match, dispatch, confirmTransfer, data, thankYou } = this.props;
    let page;
    if (match.params.id === '1') {
      if (confirmTransfer) {
        page = <ConfirmTransfer data={data} dispatch={dispatch}/>;
      } else if (thankYou){
        page = <ThankYou data={data} dispatch={dispatch} />;
      } else {
        page = <FundTransfer accounts={accountDetail} dispatch={dispatch} />;
      }
    } else {
      page = <MyAccount accounts={accountDetail} dispatch={dispatch} />;
    }

    let chatBotCard;
    let playAudio;
    if (this.state.audioUrl) {
      chatBotCard = <ChatBotCard speechText={this.state.speechText}/>
      playAudio = (<audio className="chatbot-audio" autoPlay="true" id="audio" controls="controls" src={this.state.audioUrl}>
                      Your browser does not support the audio element.
                    </audio>);
    }

    return (
      <div className="retail">
        <header className="retail-header">
          <SynBankLogo />
          <div className="retail-header-nav">
             <nav className="navbar navbar-toggleable-md navbar-primary ">  
              <div className="navbar-main">
                <ul className="navbar-nav justify-content-between">
                  <li className="nav-item"><NavLink exact to="/my-account" className="nav-link" activeClassName="selected">My Account</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/1" className="nav-link" activeClassName="selected">Fund Transfer</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/2" className="nav-link" activeClassName="selected">Detail Statement</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/3" className="nav-link" activeClassName="selected">Bill Payment</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/4" className="nav-link" activeClassName="selected">Offers</NavLink></li>
                  <li className="nav-item"><NavLink to="/retail-digital-banking" className="nav-link" activeClassName="selected">Logout</NavLink></li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <div className="retail-wrapper">
          <aside className="retail-side-nav">
            <nav className="navbar navbar-primary ">  
              <div className="navbar-main">
                <ul className="navbar-nav">
                  <li className="nav-item"><NavLink exact to="/my-account" className="nav-link" activeClassName="selected">My Account</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/1" className="nav-link" activeClassName="selected">Fund Transfer</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/2" className="nav-link" activeClassName="selected">Detail Statement</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/3" className="nav-link" activeClassName="selected">Bill Payment</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/4" className="nav-link" activeClassName="selected">Offers</NavLink></li>
                  <li className="nav-item"><NavLink to="/retail-digital-banking" className="nav-link" activeClassName="selected">Logout</NavLink></li>
                </ul>
              </div>
            </nav>
          </aside>
          <div className="retail-container">
            <SpeechToText />
            {page}
          </div>
        </div>
        <button onClick={this.fetchToken}>conversation</button>
        <div className="chatbot">
          {chatBotCard}
          <button className="chatbot-button" onClick={this._onSpeek}>
            <svg id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve">
<g><path className="st0" d="M103.8,77.2c2.5-2,5.2-3.9,7.8-5.7 M134.5,58.1c1.6-0.8,3.2-1.6,4.9-2.3c22.3-10.2,45.7-16.1,70.2-17.3   c1,0,1.9-0.4,2.9-0.6c6,0,11.9,0,17.9,0c4.1,0.6,8.1,1.1,12.2,1.7c2.9,0.4,5.7,0.9,8.6,1.5 M271.9,46.4c16.1,5.3,31.1,13,44.9,22.9    M338.8,87.8c0.6,0.6,1.2,1.2,1.8,1.7 M362.9,117.3c8.3,13.2,14.6,27.5,18.7,43.2c4.9,19,5,38.2,2,57.5   c-4.3,27.1-14.3,51.1-30.2,71.7 M335.7,308.8c-1.9,1.7-3.8,3.5-5.8,5.2c-20,16.9-43.1,27.6-68.6,33.3c-21.2,4.8-42.5,4.8-64,3   c-6.2-0.5-12.4-1.5-18.6-1.9c-1.9-0.1-4.2,0.6-5.9,1.6c-23,13.2-46,26.5-68.9,39.8c-1.3,0.8-2.7,1.5-4.5,2.5   c-0.1-1.9-0.2-3.4-0.2-4.8c0-22.7-0.1-45.5,0.1-68.2c0-3-0.9-4.9-3.1-6.9c-31.1-27.9-47.3-63-50.9-104.5   c-3.3-37.6,6.7-71.2,29.3-101c3.3-4.4,6.8-8.5,10.5-12.5"/><path className="st0" d="M438.7,293.9"/><path className="st0" d="M424.4,173.8c13.8,14.3,24.8,30,32.2,47.4"/><path className="st0" d="M463.4,241.9c0.4,1.6,0.8,3.3,1.1,4.9"/><path className="st0" d="M467.4,272c0.6,26-6,50.5-19.5,73.5c-11.5,19.7-26.8,35.9-45.4,49.1c-2.5,1.8-3.4,3.6-3.4,6.6   c0.1,22.6,0.1,45.2,0.1,67.8c0,1.5,0,3.1,0,5.2c-1.8-1-3.2-1.7-4.4-2.4c-22.7-14-45.5-27.9-68.1-42c-2.8-1.8-5.5-2.2-8.8-1.8   c-26.3,3.7-52.3,3-77.6-5.2"/><path className="st0" d="M217.6,413c-16.7-8.9-31.4-20.8-45.4-34.5"/></g></svg>
          <i className="fa fa-microphone"></i>
          </button>
          {playAudio}
        </div>
      </div>
    );
  }
}

const accountDetail = [
  {
    "accountName" : "Savings Account",
    "accountNumber": "367670070029169",
    "balance": "17,000.00",
    "transaction": [
      {
        "date": "18 Feb 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$1,410"
      },
      {
        "date": "21 Mar 2017",
        "title": "Purchase Apples, Store for Daily item, Store Address, ATM withdrawl",
        "amount": "-$2,270"
      },
      {
        "date": "27 Mar 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$3,500"
      },
      {
        "date": "18 Feb 2017",
        "title": "Transfer from Some user, user type, Bank Detais from 9281948819",
        "amount": "+$6,170"
      }
    ],
    "payee": [
      {
        "name": "Kees Kluskens",
        "accountNumber": "22446699",
        "bank": "Bank of America"
      },
      {
        "name": "Matt palmer",
        "accountNumber": "1728736217",
        "bank": "Citigroup"
      },
      {
        "name": "Evan Scott",
        "accountNumber": "898281727",
        "bank": "Santander Bank"
      },
      {
        "name": "Alexander Kaiser",
        "accountNumber": "882688817",
        "bank": "Deutsche Bank"
      }
    ]
  },
  {
    "accountName" : "Current Account",
    "accountNumber": "367670070029169",
    "balance": "18,350.40",
    "transaction": [
      {
        "date": "21 Mar 2017",
        "title": "Purchase Apples, Store for Daily item, Store Address, ATM withdrawl",
        "amount": "-$2,270"
      },
      {
        "date": "27 Mar 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$3,500"
      },
      {
        "date": "18 Feb 2017",
        "title": "Transfer from Some user, user type, Bank Detais from 9281948819",
        "amount": "+$6,170"
      },
      {
        "date": "21 Mar 2017",
        "title": "Purchase Apples, Store for Daily item, Store Address, ATM withdrawl",
        "amount": "-$2,270"
      },
      {
        "date": "27 Mar 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$3,500"
      },
    ],
    "payee": [
      {
        "name": "Evan Scott",
        "accountNumber": "898281727",
        "bank": "Santander Bank"
      },
      {
        "name": "Alexander Kaiser",
        "accountNumber": "882688817",
        "bank": "Deutsche Bank"
      }
    ]
  },
  {
    "accountName" : "Credit Card Account",
    "accountNumber": "367670070029169",
    "balance": "53,299.10",
    "transaction": [
      {
        "date": "18 Feb 2017",
        "title": "Gold MasterCard credit card",
        "amount": "-$410"
      },
      {
        "date": "21 Mar 2017",
        "title": "2 year fixed rate mortgage",
        "amount": "-$8,170"
      },
      {
        "date": "27 Mar 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$12,40"
      },
      {
        "date": "18 Feb 2017",
        "title": "Card 01, The Sports Shop",
        "amount": "-$1,170"
      },
      {
        "date": "21 Mar 2017",
        "title": "2 year fixed rate mortgage",
        "amount": "-$8,170"
      },
      {
        "date": "27 Mar 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$12,40"
      },
    ],
    "payee": [
      {
        "name": "Kees Kluskens",
        "accountNumber": "22446699",
        "bank": "Bank of America"
      },
      {
        "name": "Matt palmer",
        "accountNumber": "1728736217",
        "bank": "Citigroup"
      },
      {
        "name": "Evan Scott",
        "accountNumber": "898281727",
        "bank": "Santander Bank"
      }
    ]
  }
]

export default Retail;