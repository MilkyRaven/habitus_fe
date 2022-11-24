import React from 'react'
import NavMenue from '../../components/navigation/NavMenue'

export default function ProfilePage() {
   return (
    <div className="page-relative">
      <NavMenue></NavMenue>  
      <main className="main-with-nav">
         <h1>Profile</h1>
         <section className="test-section">test</section>
         <section className="test-section">test</section>
         <section className="test-section">test</section>
         <section className="test-section">test</section>
         <section className="test-section">test</section>
      </main>
    </div>
   )
}