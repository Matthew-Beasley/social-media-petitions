import React, {useState} from 'react';
import axios from 'axios';

const CreatePetition  = ({ history, headers, petitions, setPetitions }) => {
  const [topic, setTopic] = useState('');
  const [shortText, setShortText] = useState('');
  const [longText, setLongText] = useState('');
  const [current, setCurrent] = useState(false);
  const [createSuccessful, setCreateSuccessful] = useState(false);

  const submitPetition = async () => {
    const petition = await axios.post('/petition',
      { topic, shortText, longText, current },
      headers());
    setPetitions([...petitions, petition.data]);
    if (petition.data.topic === topic) {
      setCreateSuccessful(true);
    }
    setTopic('');
    setShortText('');
    setLongText('');
    setCurrent(false);
  }

  return (
    <form id="create-petition-form">
      {createSuccessful && <h3>Successfully created petition {topic}</h3>}
      <input
        type="text" id="admin-topic-input"
        placeholder="Topic"
        value={topic} onChange={ev => {setTopic(ev.target.value); setCreateSuccessful(false)}}
      />
      <textarea
        id="create-input-shorttext"
        spellCheck="true"
        placeholder="Short Text"
        defaultValue={topic.shortText}
        onChange={ev => { setShortText(ev.target.value); setCreateSuccessful(false)}}
        rows="3"
      />
      <textarea
        id="create-input-longtext"
        spellCheck="true"
        placeholder="Long Text"
        defaultValue={topic.longText}
        onChange={ev => { setLongText(ev.target.value); setCreateSuccessful(false) }}
        rows="10"
      />
      <label>
        <input
          type="checkbox"
          className="iscurrent"
          id="admin-current-checkbox"
          checked={current}
          onChange={ev => {setCurrent(ev.target.value); setCreateSuccessful(false)}}
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

