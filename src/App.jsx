import Topbar from './components/Topbar'
import Hero from './components/Hero'
import Reframe from './components/Reframe'
import WhatToExpect from './components/WhatToExpect'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'
import Teachers from './components/Teachers'

function App() {
  return (
    <div className="bg-ink text-text-light font-body overflow-x-hidden min-h-screen">
      <Topbar />
      <Hero />
      <Teachers />
      <Reframe />
      <WhatToExpect />
      <RegistrationForm />
      <Footer />
    </div>
  )
}

export default App
