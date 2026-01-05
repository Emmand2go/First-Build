import React from 'react'

const Footer = () => {
  return (
    <div className='footer' style={styles.footer}>
      <p>&copy; 2026 ND Gent. All rights reserved.</p>
    </div>
  )
}
const styles={
footer:{
    backgroundcolor: '#111',
  color: '#aaa',
  textalign: 'center',
  padding: '2rem 0',
  margintop: '4rem',
}
}

export default Footer
