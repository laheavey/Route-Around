import React from 'react';

function AboutPage() {
  return (
    <div className="about-section">
      <section className='about-header'>
      <h2 className='about-h2'>Route Around</h2>
      <h4 className='about-h3'> // About This App</h4>
      </section>
      <section>
      {/* <h2 className='login-h1'>{`About this App →`}</h2> */}
        <p className='about-desc'>Route Around is a web app that showcases modern & historic points of interest located along MN Metro Transit routes.</p>
        {/* <p>Its primary purpose is to increase transit ridership, promote tourism in the Twin Cities area, and encourage learning more about the world around us.</p> */}
      </section>
      <section>
      <h2 className='login-h1'>{`Technologies Used →`}</h2>
      </section>
      <section className='about-list-section'>
        <ul className='about-list three-column'>
          <li>HTML</li>
          <li>CSS</li>
          <li>Javascript</li>
          <li>React</li>
          <li>Redux</li>
          <li>Redux-Saga</li>
          <li>Axios</li>
          <li>Express</li>
          <li>Passport</li>
          <li>MapBox</li>
          <li>MUI</li>
          <li>PostgresQL</li>
          {/* <li>Postico</li>
          <li>Postman</li> */}
        </ul>
      </section>
      <section>
      <h2 className='login-h1'>{`Special Thanks →`}</h2>
      <p className='about-thanks'>
        Shoutout to the following folks, who I cannot thank enough:
      </p>
      <ul className='one-column'>
        <li>🤖 Vonnegut Cohort</li>
        <li>🧑‍🏫 Instructors Matt, Kris, Key, Dane, & Vada</li>
        <li>😻 My partner Kat!!!</li>
        <li>👾 Prime Digital Academy</li>
      </ul>
      </section>
      <section className='about-footer'>
          <img className='about-img' src={'https://media.licdn.com/dms/image/D5603AQGhkH9j5o_vNg/profile-displayphoto-shrink_800_800/0/1675281081665?e=1682553600&v=beta&t=m8wBSRVIRQOMbd4wgxAgcuIW4qILhvXg2dVFBYnGo_U'}/>
          <ul className='info-list'>
            <h2  className='login-h1'>Lauren Heavey</h2>
            <h3 className='about-small-text'>Full Stack Software Engineer</h3>
            <a href='https://www.linkedin.com/in/laheavey/'>LinkedIn</a>{` // `}
            <a href='https://github.com/laheavey'>Github</a>
          </ul>
      </section>
    </div>
  );
}

export default AboutPage;
