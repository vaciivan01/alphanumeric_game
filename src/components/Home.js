import React from 'react';
import '../App.css';
import Letter from './Letter';
import DifficultyButton from './DifficultyButton';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomLetterNumber: '',
      started: false,
      inputedLetter : '',
      difficulty:{
        easy: {
          time: 5000,
          selected: false
        },
        medium: {
          time: 3500,
          selected: true
        },
        hard: {
          time: 2000,
          selected: false
        }
      },
      startText: 'Start',
      letters:{
        a: 'gray',
        b: 'gray',
        c: 'gray',
        d: 'gray',
        e: 'gray',
        f: 'gray',
        g: 'gray',
        h: 'gray',
        i: 'gray',
        j: 'gray',
        k: 'gray',
        l: 'gray',
        m: 'gray',
        n: 'gray',
        o: 'gray',
        p: 'gray',
        q: 'gray',
        r: 'gray',
        s: 'gray',
        t: 'gray',
        u: 'gray',
        v: 'gray',
        w: 'gray',
        x: 'gray',
        y: 'gray',
        z: 'gray',
      },
      letterKeys: [],
      score:{
        hit: 0,
        miss: 0,
        left: 0
      }
    };
    this.changeDifficulty = this.changeDifficulty.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.triggerStartBtn = this.triggerStartBtn.bind(this);
  }

  componentDidMount() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let user = url.searchParams.get("user")
    if(user !== null)
    {
        axios.get(`http://127.0.0.1:8000/api/gameOption/`+user) // if there is a user id, get info from the api
        .then(res => {
            if(res.status === 200 && res.data.data)
            {
                let dif_state = this.state.difficulty;
                let new_dif = JSON.parse(res.data.data.game_option)
                Object.keys(new_dif).map((dif_name)=>{
                    return dif_state[dif_name].time = new_dif[dif_name] // update the time for the game
                })
                this.setState({ // update the state
                    difficulty: dif_state
                })
            }
        })
    }
    let letterKeys = Object.keys(this.state.letters) // quick way to set the keys of the letters
    this.setState({
      letterKeys: letterKeys // update the status
    })
  }

  restartLetters() // restarting all the letter to gray
  {
    let stateLetters = this.state.letters; // get current letter state
    this.state.letterKeys.map((letter) => {
      return stateLetters[letter] = 'gray'; // updating to gray
    })
    this.setState({
      letters: stateLetters // updating the status
    })
  }

  triggerStartBtn()
  {
    let btnText = this.state.started ? 'Start' : 'Stop'; // switching start / stop button
    let newStarted = !this.state.started
    this.setState({ // updating state
      started: newStarted,
      startText: btnText,
      randomLetterNumber: ''
    });
    this.setScore() // updating score
    this.restartLetters() // restarting 
    if(newStarted)
    {
      this.handleStart(newStarted)
    }
  }

  handleStart(newStarted)
  {
    let time = 3500; // the default time
    this.getRandomNewNumber()
    Object.keys(this.state.difficulty).map((dif) => {
      if(this.state.difficulty[dif].selected) // mapping through the status -> difficulty options to find the selected one
      {
        return time = this.state.difficulty[dif].time // overriding the time
      }
      return false // deafult return for the map function
    })
    this.startInterval(time, newStarted) // init the interval
  }

  startInterval(time, newStarted)
  {
    clearInterval(this.interval); // clear any interval that was made before this
    if(newStarted || this.state.started)
    {
      this.interval = setInterval(() => {
        this.handleInput('', true); // trigger the input with an empty value
      }, time); // selected time
    }
  }

  setScore()
  {
    let score = { // default values
      'hit': 0,
      'miss': 0,
      'left': 0
    }
    this.state.letterKeys.map((letter)=>{ // map through the letters to find the 'left', 'hit' and 'miss'
      let color = this.state.letters[letter]; // getting the color
      if(color === 'gray')
      {
        return score['left'] += 1;
      }else if(color === 'red'){
        return score['miss'] += 1;
      }else{
        return score['hit'] += 1;
      }
    })
    this.setState({
      score: score // updating the score
    })
  }

  handleInput(event='', timeOut=false)
  {
    let letter = 1; // defult letter if nothing is inputed
    if(!timeOut && event !== '' && event.target.value !== '') // check if user really did put in a value
    {
      letter = event.target.value.toLowerCase(); // setting the value in a let
      this.setState({inputedLetter: letter}) // updating state so we can see what we typed in
    }
    let stateLetters = this.state.letters; // getting the current state of letters
    let index = this.state.letterKeys.indexOf(letter); // getting the index of the inputed letter
    let targetLetter = this.state.letterKeys[this.state.randomLetterNumber-1] // getting the letter of the asked number
    stateLetters[targetLetter] = 'red' // by default setting the color to red
    if(index !== -1){ // checking if the letter actually exists in the array
      index += 1 // since arrays start with 0, just adding +1
      if(index === this.state.randomLetterNumber) // making sure the target and input indexes match
      {
        stateLetters[targetLetter] = 'green' // if they do match we set the color to green
      }
    }
    this.setState({
      letters: stateLetters, // updating the state with the color
      inputedLetter: '' // erase the users letter, for better UX
    })
    this.setScore() // Update the score
    this.handleStart(false) // start the interval again
  }

  getRandomNewNumber()
  {
    let availableIndexes = []; // container to set all the indexes
    this.state.letterKeys.map((e) => { // map through the letters
      if(this.state.letters[e] === 'gray') // if the letter has still not been used (gray color) it is added to availableIndexes 
      {
        return availableIndexes.push(this.state.letterKeys.indexOf(e) + 1)
      }
      return false
    })
    let randIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)] // getting the random index
    this.setState({
      randomLetterNumber: randIndex // updating the index
    })
  }

  changeDifficulty(dif) 
  {
    let sel = dif.toLowerCase()
    let curState = this.state.difficulty;
    Object.keys(this.state.difficulty).map((keyName, i) => {
      return curState[keyName].selected = false
    })
    curState[sel].selected = true
    this.setState({
      difficulty: curState
    });
  }

  render() {
    return (
      <div className="App">
        <div className="">
          {Object.keys(this.state.difficulty).map((dif, key) =>
              <DifficultyButton name={dif} key={key} selected={this.state.difficulty[dif].selected} onClick={() => this.changeDifficulty(dif)}/>
          )}
        </div>
        <div className="">
          <button onClick={this.triggerStartBtn} className="btn">{this.state.startText}</button>
        </div>
        <p>{this.state.randomLetterNumber}</p>
        <input 
          placeholder="input letter" 
          onChange={this.handleInput} 

          value={this.state.inputedLetter}>

          </input>
          <div className="">
            {Object.keys(this.state.score).map((sc, key) =>
                <p key={key}>{sc}: {this.state.score[sc]} </p>
            )}
          </div>
          <div className="LettersDiv row">
            {this.state.letterKeys.map((letter, key) =>
                <Letter key={key} name={letter.toUpperCase() + " (" + (key+1) + ")"} color={this.state.letters[letter]}/>
            )}
          </div>
      </div>
    );
  }
}

export default Home;