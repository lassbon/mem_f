import React from 'react'
import { Image } from 'semantic-ui-react'

const RegLayout = ({ children }) => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <Image
        style={{ marginBottom: 20, marginTop: 30 }}
        verticalAlign="middle"
        src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
      />
    </div>
    {children}
  </div>
)

export default RegLayout
