import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>CoverLetter generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Provide the role you're going for and mention a few qualities/qualifications of yours, we'll do the rest</h2>
          </div>
          <p>A few pointers</p>
          <li>Start out by mentioning the Job role and the company you're applying to. Eg. Developer Relations at Chainlink, which is a company in the Web3 space</li>
          <li>If you are disatisfied by the result of the generator it is probably your fault. Be more descriptive you dickhead.</li>
          <li>Mention a few qualities about yourself that you would like to be included in a separate paragraph. Eg. "include in the cover letter my previous experience as a DevRel at Filecoin and how it will help me handle the role and responsibilties better."</li>
        </div>
        <div className="prompt-container">
        <p >Enter Job Role and name of the company</p>
        <textarea
          className="prompt-box"
          placeholder="Developer Relations at Chainlink Labs, which is a web3 company dealing with decentralised oracles"
          value={userInput}
          onChange={onUserChangedText}
        />;
        <textarea
          className="prompt-box"
          placeholder="Developer Relations at Chainlink Labs, which is a web3 company dealing with decentralised oracles"
          value={userInput}
          onChange={onUserChangedText}
        />;
        <textarea
          className="prompt-box"
          placeholder="Developer Relations at Chainlink Labs, which is a web3 company dealing with decentralised oracles"
          value={userInput}
          onChange={onUserChangedText}
        />;
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
