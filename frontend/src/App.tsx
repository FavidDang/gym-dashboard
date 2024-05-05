import React from 'react';
import './App.css';

function Result() {
  return <></>;
}

function Form() {
  return (
    <form>
      <div>
        <label className="px-2" htmlFor="frequency">Days per Week:</label>
        <input className="rounded" id="frequency" type="number" min="1" max="7" required />
      </div>
      <div className="flex flex-row justify-center items-center p-2">
      Experience Level:

        <fieldset className="flex flex-col px-4">
          <div>
            <input id="beginner" name="experience" type="radio" value="beginner" />
            <label className="px-2" htmlFor="beginner">Beginner</label>
          </div>

          <div>
            <input id="intermediate" name="experience" type="radio" value="intermediate" />
            <label className="px-2" htmlFor="intermediate">Intermediate</label>
          </div>

          <div>
            <input id="advanced" name="experience" type="radio" value="advanced" />
            <label className="px-2" htmlFor="advanced">Advanced</label>
          </div>

        </fieldset>

      </div>
      <div className="flex flex-row justify-center items-center p-2">
        <span>Equipment:</span>
        <fieldset className="flex flex-col px-4">
          <div>
            <input id="weights" type="checkbox"></input>
            <label className="px-2" htmlFor="weights">Free Weights</label>
          </div>

          <div>
            <input id="machines" type="checkbox"></input>
            <label className="px-2" htmlFor="machines">Machines</label>
          </div>
        </fieldset>
      </div>

      <div className="flex flex-row justify-center items-center p-2">
        Focus:
        <fieldset className="flex flex-col px-4">
          <div>
            <input id="hypertrophy" name="focus" type="radio" value="hypertrophy" />
            <label className="px-2" htmlFor="hypertrophy">Hypertrophy</label>
          </div>

          <div>
            <input id="strength" name="focus" type="radio" value="strength" />
            <label className="px-2" htmlFor="strength">Strength</label>
          </div>

          <div>
            <input id="plyometrics" name="focus" type="radio" value="plyometrics" />
            <label className="px-2" htmlFor="plyometrics">Plyometrics</label>
          </div>

          <div>
            <input id="health" name="focus" type="radio" value="health" />
            <label className="px-2" htmlFor="health">Health</label>
          </div>

        </fieldset>
      </div>

      <button className="bg-slate-800 p-3 rounded-lg">Generate</button>
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Form />
          <Result />
        </div>
      </header>
    </div>
  );
}

export default App;
