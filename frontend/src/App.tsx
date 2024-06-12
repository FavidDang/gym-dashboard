import React, { useState } from 'react';
import './App.css';

function Result({ schedule }: { schedule: any }) {
  if (!schedule) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Object.keys(schedule).map(day => (
        <div key={day} style={{ marginBottom: '20px' }}>
          <h2>{day}</h2>
          <h3>Muscle Group Focus: {schedule[day]['Muscle Group Focus']}</h3>
          {schedule[day].Exercises && (
            <div>
              <h4>Exercises:</h4>
              <ul>
                {schedule[day].Exercises.map((exercise: any, index: number) => (
                  <li key={index}>
                    <strong>{exercise['Exercise']}</strong>: {exercise.Sets} sets of {exercise.Reps} reps
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Form({ setSchedule }: { setSchedule: (data: any) => void }) {
  const [formData, setFormData] = useState({
    frequency: '0',
    experience: 'beginner',
    equipment: 'commercial gym',
    focus: 'hypertrophy'
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append('frequency', formData.frequency);
    postData.append('experience', formData.experience);
    postData.append('equipment', formData.equipment);
    postData.append('focus', formData.focus);

    console.log(formData);
    const response = await fetch('http://127.0.0.1:5000/generate', {
      method: 'POST',
      body: postData
    });
    const data = await response.json();
    console.log(data);
    setSchedule(data);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <label className="px-2" htmlFor="frequency">Days per Week:</label>
        <input
          className="rounded text-black"
          name="frequency"
          id="frequency"
          type="number"
          min="1"
          max="7"
          value={formData.frequency}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="px-2" htmlFor="experience">Experience Level:</label>
        <select
          className="rounded text-black"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label className="px-2" htmlFor="equipment">Equipment:</label>
        <select
          className="rounded text-black"
          id="equipment"
          name="equipment"
          value={formData.equipment}
          onChange={handleChange}
        >
          <option value="commercial gym">Commercial Gym</option>
          <option value="home gym">Home Gym</option>
          <option value="dumbbells">Dumbbells</option>
          <option value="none">None</option>
        </select>
      </div>
      <div>
        <label className="px-2" htmlFor="focus">Focus:</label>
        <select
          className="rounded text-black"
          id="focus"
          name="focus"
          value={formData.focus}
          onChange={handleChange}
        >
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
  const [schedule, setSchedule] = useState<any>(null);

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex">
          <Form setSchedule={setSchedule} />
          <Result schedule={schedule} />
        </div>
      </header>
    </div>
  );
}

export default App;