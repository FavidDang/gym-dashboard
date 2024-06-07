import React, {useState} from 'react';
import './App.css';
import { METHODS } from 'http';

function Result() {
  return <></>;
}

function Form() {

  const [formData, setFormData] = useState({
    frequency: '0',
    experience: 'beginner',
    equipment: 'com-gym',
    focus: 'hypertrophy'
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append('frequency', formData.frequency);
    postData.append('experience', formData.experience);
    postData.append('equipment', formData.equipment);
    postData.append('focus', formData.focus);

    console.log(formData);
    fetch('http://127.0.0.1:5000/generate')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <label className="px-2" htmlFor="frequency">Days per Week:</label>
        <input className="rounded text-black" name="frequency" id="frequency" type="number" min="1" max="7" value={formData.frequency} onChange={handleChange} required />
      </div>
      <div>
        <label className="px-2" htmlFor="experience">Experience Level:</label>
        <select className="rounded text-black" id="experience" name="experience" value={formData.experience} onChange={handleChange}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label className="px-2" htmlFor="equipment">Equipment:</label>
        <select className="rounded text-black" id="equipment" name="equipment">
          <option value="com-gym">Commercial Gym</option>
          <option value="home-gym">Home Gym</option>
          <option value="dumbbells">Dumbbells</option>
          <option value="none">None</option>
        </select>
      </div>

      <div>
        <label className="px-2" htmlFor="focus">Focus:</label>
        <select className="rounded text-black" id="focus" name="focus">
          <option value="hypertrophy">Hypertrophy</option>
          <option value="strength">Strength</option>
          <option value="plyometrics">Plyometrics</option>
          <option value="health">Health</option>
        </select>
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
