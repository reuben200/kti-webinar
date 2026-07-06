import React from 'react'
import Topbar from './components/Topbar'
import Audit from './components/KnowledgeAudit'
import Footer from './components/Footer'

const KtiAudit = () => {
  return (
    <div className='flex flex-col'>
      <Topbar />
      <Audit />
      <Footer />
    </div>
  )
}

export default KtiAudit
