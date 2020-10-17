import React, {useState} from 'react';
import axios from 'axios';

const CreatePetition  = ({history, headers, petitions, setPetitions}) => {
  const [topic, setTopic] = useState('');
  const [shortText, setShortText] = useState('');
  const [longText, setLongText] = useState('');
  const [current, setCurrent] = useState(false);
  const [createSuccessful, setCreateSuccessful] = useState(false);

  const submitPetition = async () => {
    const url = 'http://localhost:3000';
    const petition = await axios.post(url + '/petition',
      { topic, shortText, longText, current },
      headers());
    setPetitions([...petitions, petition.data]);
    if (petition.data.topic === topic) {
      setCreateSuccessful(true);
    }
  }

  return (
    <form id="create-petition-form">
      {createSuccessful && <h3>Successfully created petition {topic}</h3>}
      <input
        type="text" id="admin-topic-input"
        placeholder="Topic"
        value={topic} onChange={ev => setTopic(ev.target.value)}
      />
      <textarea
        id="create-input-shorttext"
        spellCheck="true"
        placeholder="Short Text"
        defaultValue={topic.shortText}
        onChange={ev => setShortText(ev.target.value)}
        rows="3"
      />
      <textarea
        id="create-input-longtext"
        spellCheck="true"
        placeholder="Long Text"
        defaultValue={topic.longText}
        onChange={ev => { setLongText(ev.target.value)}}
        rows="10"
      />
      <label>
        <input
          type="checkbox"
          className="iscurrent"
          id="admin-current-checkbox"
          checked={current}
          onChange={ev => setCurrent(ev.target.value)}
        />Make this a current petition
      </label>
      <button
        type="button"
        id="admin-create-button"
        onClick={() => submitPetition()} >
        Create Petition
      </button>
    </form>
  )
}

export default CreatePetition;

