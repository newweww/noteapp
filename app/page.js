'use client'

import React, { useEffect, useState } from "react";
import { Card } from "./components/card"
import axios from "axios";

export default function Home() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('red');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes");
      if (response.data) {
        setNotes(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log(title, content, color);
    try {
      const response = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, color }),
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        setColor('');
        console.log('Post submitted successfully!');
        window.location.reload();
      } else {
        console.error('Failed to submit post.');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'content':
        setContent(value);
        break;
      case 'color':
        setColor(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-row">
      <div className="w-60 bg-gray-200 min-h-screen h-auto p-5 fixed">
        <p className="text-3xl mb-5">Note</p>
        <form className="flex flex-col gap-5">
          <input className="input" type="text" placeholder="title" name="title" onChange={handleChange} />
          <textarea className="input" type="text" placeholder="content" name="content" onChange={handleChange} />
          <div onChange={handleChange} className="flex flex-row gap-2">
            <input type="radio" id="red" name="color" value="red" className="hidden" />
            <label htmlFor="red" className="rounded-full w-7 h-7 bg-red-400 inline-block"></label>
            <input type="radio" id="orange" name="color" value="orange" className="hidden" />
            <label htmlFor="orange" className="rounded-full w-7 h-7 bg-orange-400 inline-block"></label>
            <input type="radio" id="green" name="color" value="green" className="hidden" />
            <label htmlFor="green" className="rounded-full w-7 h-7 bg-green-400 inline-block"></label>
            <input type="radio" id="blue" name="color" value="blue" className="hidden" />
            <label htmlFor="blue" className="rounded-full w-7 h-7 bg-blue-400 inline-block"></label>
            <input type="radio" id="pink" name="color" value="pink" className="hidden" />
            <label htmlFor="pink" className="rounded-full w-7 h-7 bg-pink-400 inline-block"></label>
            <input type="radio" id="purple" name="color" value="purple" className="hidden" />
            <label htmlFor="purple" className="rounded-full w-7 h-7 bg-purple-400 inline-block"></label>
          </div>
          <button className={`bg-${color}-400 rounded-md h-8 add-btn`} onClick={handleConfirm}>Add</button>
        </form>
      </div>
      <div className="w-60" />
      <div className="w-5/6 h-screen p-10 gap-10 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid">
        {notes.slice().reverse().map((note, index) => (
          <Card key={index} item={note} />
        ))}
      </div>
    </div>
  );
}
