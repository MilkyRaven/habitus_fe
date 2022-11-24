import React from 'react'
import Navbar from '../components/navigation/Navbar'
import './Home.css'

export default function Home() {
   return (
      <div>
         <Navbar/>
         <main className="main-with-nav">
            <h1>Home</h1>
{/*  For Scroll Test: NavigationBar:
            <section className="test-section">test</section>
            <section className="test-section">test</section>
            <section className="test-section">test</section>
            <section className="test-section">test</section>
            <section className="test-section">test</section>
 */}         </main>
      </div>
   )
}
