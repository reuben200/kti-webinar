import Topbar from './components/Topbar'
import Hero from './components/Hero'
import Reframe from './components/Reframe'
import WhatToExpect from './components/WhatToExpect'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-ink text-text-light font-body overflow-x-hidden min-h-screen">
      <Topbar />
      <Hero />
      <Reframe />
      <WhatToExpect />
      <RegistrationForm />
      <Footer />
    </div>
  )
}

export default App
